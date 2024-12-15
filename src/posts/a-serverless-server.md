---
title: Making a rate limiter - Part 2 - Understanding Durable Objects
description: Learn what Durable Objects are, how they work, and when to use them
date: 2024-12-15
category: web
tags:
- cloudflare
- workers
- serverless
- durable objects
- databases
published: true
---
In this step on our journey of making a rate limiter on the Cloudflare platform, we will learn what a durable object is.

Durable objects, or DOs can be a bit confusing, largely because the mental model around them is not something you are exposed to very often. It took me a while to really make sense of what they exactly are.

Let's start with the problem, of course, if we are going to use a DO, we should know what problem it is solving for us.

### The problem: Shared State.

In the previous lesson, we learned that workers are essentially thousands of standalone servers that are spun up and down depending on the number of requests. If you missed that one, you can read it [here](https://wahab.vercel.app/blog/understanding-workers).

Being dynamic, any state a worker has is ephemeral. But what if we do want some persistent state? Let's say, you want to create a multiplayer card game. Multiple clients can make requests to our workers deployment, but it is not guaranteed that the requests will arrive at the same worker (defeats the point of serverless, really). The workers themselves are removed after some time, so it would be a very short card game.

So you see, shared state between workers is a task. We need *durable* storage, where we can store information about our card game for longer periods of time. Does that sounds familiar to you? We need a central point...a base, for our data...sounds to me like we need a database. Let's try not to use DOs for as long as we can, we'll begin by using a centralized DB.

#### Can we use a centralized database?

So let's say we use PostgreSQL on RDS to store our game state. This will work, but it is not ideal, why? Workers take requests globally and run them as close as possible to the user. If we connect to a globally centralized database using our worker, we give up the benefits of running code close to the user, since the round trip penalty for communication with the database needs to be paid in all cases. As an example, if all the players in the card game are in Australia, but your PostgreSQL database is in `us-east-1`, you will incur the round trip cost for all database actions, even if the worker code is running in some Australian server.

#### Can we use a serverless database?

Alright, we can't use a centralized database, but can we use a serverless database, like Aurora or Fauna? This solution is better. A serverless database can help us with locality, but there is an issue;

The database always exists in a different data center (not a Cloudflare data center), and an inter-datacenter HTTP cost is incurred for every query. If you have a worker performing multiple queries, these costs can add up. Even if it is a few milliseconds.

As an example, a few months ago at work, a coworker of mine pushed some code to staging that made a few hundred database queries per request (yeah, I know). This code worked (slow, but worked) on staging, because the database and server were in the same datacenter, and intra-datacenter requests are fast(er). But in production, the server and database were in different datacenters, and once we pushed to prod, the feature was not working (it technically was working, but the requests took so long, they timed out). We eventually refactored the initial code to not make so many database requests.

There is another problem, distributed databases take some time (a few milliseconds) to update read replicas. If we want stronger consistency models, we would need more time to propagate changes. So a writer in Australia and a reader in Pakistan will have some latency between seeing the same changes. We'll see how DOs tackle this soon.

For now, we see that a serverless database, while a suitable solution, is not the best we can do in this case.

### So what is a Durable Object?

According to Cloudflare, "*A DO is essentially a small server that can be addressed by a unique name and can keep state both in-memory and on-disk. Workers running anywhere on Cloudflare's network can send messages to a DO by its name, and all messages addressed to the same name — from anywhere in the world — will find their way to the same DO instance*". These behaviors — global singleton, persistent storage, long running instance, allow us to use DOs as a globally distributed database. Since they are local to the request, they can also help us address some of the above mentioned issues with coordination. But as we'll see, they're not silver bullets either. Let's learn more.

There's a few things we need to understand around durable objects, you know one already, it is essentially a small server. A reasonable expectation is that the server should be accessible via HTTP. That's possible, but not directly. If you follow [this walkthrough](https://developers.cloudflare.com/durable-objects/get-started/walkthrough/), you'll write the below DO. But this very simple DO cannot be accessed directly via the internet, **all DOs are accessed through workers**. So to access the below durable object, you would need a worker that has bindings for the below DO, and the worker would be calling the DO. This makes sense, DOs are considered coordination mechanisms for workers.

```javascript
import { DurableObject } from "cloudflare:workers";

export class MyDurableObject extends DurableObject {
	constructor(state, env) {}

	async sayHello() {
		return "Hello, World!";
	}
}

```

To call the `sayHello` method in this DO, we need to write a worker like so:

```javascript
export default {
	async fetch(request, env) {
	  // Every unique ID refers to an individual instance of the Durable Object class
		const id = env.MY_DURABLE_OBJECT.idFromName("foo");
		// A stub is a client used to invoke methods on the Durable Object
		const stub = env.MY_DURABLE_OBJECT.get(id);
		// Methods on the Durable Object are invoked via the stub
		const rpcResponse = await stub.sayHello();

		return new Response(rpcResponse);
	},
};
```

`MY_DURABLE_OBJECT` is a binding in the worker. We use this binding to get the durable object by using its unique ID, and then call the `sayHello` method as an `RPC (Remote Procedure Call)`. Ultimately, a `Hello World!` response is returned to the original client that called the worker.

This brings us to the second important detail - **DOs are global singletons**. Every DO has a unique ID, and there can only be one DO with a given ID. You can see that in the worker code above, this line gets us a unique ID for our DO from the name. The same ID will be generate for the same name for a given DO.

```javascript
const id = env.MY_DURABLE_OBJECT.idFromName("foo");
```

Then we use this code to get a reference to the DO from our worker.

```javascript
const stub = env.MY_DURABLE_OBJECT.get(id);
```

If a DO with that ID does not exist, it is created. You can have billions of DOs, but only one DO corresponds to one id, and by proxy, one name. This means that whether a worker running in Australia is calling the DO or a worker in Pakistan is calling it, all requests will arrive to the same DO instance. This gives us serial operations within the DO, but this global distribution forgoes the locality benefit of serverless - it is no different from using a central database. So why use DOs?

The primary benefit is that despite the "centralized" nature of a DO, there can be multiple DO instances distributed across the globe. This is helpful with localized requests. Consider our use case, a card game. If all the players in the game are in New York, the DO will be located in a location closest to New York. The requests to that particular room are local, so the DO can be local as well.

Consider another use case, geographical chat rooms. If a user is in Pakistan, we could connect to a `ChatRoom` DO like:

```javascript
const id = env.CHAT_ROOM_DO.idFromName(user.country);
```

All other users from Pakistan will connect to the *same* DO because the ID generated from the country name will be the same. This way, the DO can be localized to the region, minimizing round trip times.

Another benefit is the co-location of storage and application code. Earlier I mentioned that DOs are used to share persistent state, but how exactly is that state stored? This is done in one of two ways:

- **A KV Store** - Each DO has access to a persistent key-value, with some APIs exposed for standard get/set/list operations. You can explore the whole API [here](https://developers.cloudflare.com/durable-objects/api/storage-api/).
- **A SQLite Database** - This is the newest feature in DOs, an embedded SQLite inside each DO. The best part about this is that the database is in memory, in the **same OS thread** and operations on it are *synchronous*. This means zero latency when querying your database from a DO, with all the benefits of a familiar SQL database. You can read more about this in the blog post [here](https://blog.cloudflare.com/sqlite-in-durable-objects/). It is a very exciting technology, and I giggle just reading the blog post lol.

Since our durable object is not just for storage, but can execute JavaScript code, we can have our business logic in the same place as our storage. What does this mean? **No query latency**. Earlier, when we used a serverless database, the application code was located in a different place from the database, this means any communication with the database is done over the network, incurring latency. Now, all communication with the database is done in the same thread, no network, no latency. Combined with localized Durable Objects, you get insanely fast performance, and a new paradigm for code architecture.

I will not get into specific details regarding HOW to write durable objects, I believe the docs cover that quite well with plenty of code examples and starter code. But an explanation like the one above would have really helped when I was starting out.

#### DOs - A Silver Bullet?

Not exactly. There are a few edge cases, and a few considerations when developing with them:

- **Platform Lock-in:** You are locked into the Cloudflare platform, it is a unique paradigm and any code you write on this is likely not easily transferred without rethinking the architecture. This is a big concern when you are writing code professionally, you won't always be around, but your code might be. So whether DOs are the best possible solution for your use-case needs to be considered seriously, despite the fact that they're very cool.

- **Limited Global View:** With the stored data being localized to a specific DO, there is no global database view. Every DO only knows about the data it has, and to form a global view, you would need to query all of the data in every DO instance, not ideal. I hope Cloudflare manages to solve this some time in the future.

- **Vertical Scaling Limitations:** Durable Objects cannot scale vertically, only horizontally. They're singular servers after-all. So if you were developing an application that requires, let's say, a global vote counter, all the votes would need to go to a single DO, which is beyond its capacity. This use case would require a more complicated architecture, perhaps layers of DOs localized to cities, that populate DOs in countries, that populate DOs in regions and eventually a global DO to develop a global view. This is also talked about in the Cloudflare docs.

- **Global Singleton Bottleneck:** One feature of DOs can also become a bottleneck, global singleton. In the card game example, if all players are in New York, but one in is Tokyo, all the requests from the Tokyo player could be routed to a DO in New York, incurring unnecessary latency. This could have been avoided with a serverless database with distributed read replicas.

That's all that comes to mind for now, but you can see that DOs are not the answer to all our problems, they're simply another tool in our toolkit that we can use to solve problems. When to use what tool is the decision an engineer makes.

Once we know how workers and DOs work, creating a rate limiter with them is a trivial task, we'll do that in the next blog, I imagine it will be a short one.

### Links
- [Understanding Workers](https://wahab.vercel.app/blog/understanding-workers) - Previous article in the series explaining how Cloudflare Workers function
- [Durable Objects Walkthrough](https://developers.cloudflare.com/durable-objects/get-started/walkthrough/) - Official Cloudflare tutorial for getting started with Durable Objects
- [Storage API Documentation](https://developers.cloudflare.com/durable-objects/api/storage-api/) - API reference for Durable Objects' key-value storage capabilities
- [SQLite in Durable Objects](https://blog.cloudflare.com/sqlite-in-durable-objects/) - Cloudflare blog post about the SQLite database feature in Durable Objects
