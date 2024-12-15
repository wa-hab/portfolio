---
title: Making a rate limiter - Part 1 - What is a worker?
description: Learn what Cloudflare Workers are, how they execute, and how to write your first worker
date: 2024-12-01
category: web
tags:
 - cloudflare
 - workers
 - serverless
 - javascript
published: true
---
This initially started as a single blog post for creating a rate limiter with Cloudflare workers. It got a bit long, so I split it into 3 parts. Part 1 explains what a worker is, Part 2 explains what a Durable Object is, and in Part 3 we create an IP-based rate limiter.
### What is a worker?

What a worker is, can be looked at in two ways. The first is how it is executed, how is it different from a regular server? The second is how you write a worker, the syntax, the quirks. Let's look at them in order.

#### Execution of a worker:
We'll assume a baseline of knowing how a server works. A machine, running a persistent process, to which requests are made and responses are returned.

A worker is a server in a similar fashion, but instead of it being a single, big machine that serves all users, a worker is deployed on the Cloudflare platform in hundreds of small servers. The cloudflare servers themselves are quite enormous of course, but our worker instances are small, isolated instances on those beefy servers. If there are no requests, there are no active workers. In this manner, a worker is deployed is part of the **serverless** paradigm - there is no single persistent server. When a request comes in, a worker **instance** is created, the worker handles that request and shuts down. If another request comes in before the worker is shut down, the same worker could be reused to serve that request.

A traditional server, either a single beefy server or a finite, controlled cluster of servers:

![trad servers](/trad-servers.png)

A Cloudflare Worker, scales to workload, geographically distributed:

![workers](/workers.png)

*(the image caption says: 'Lots of Cloudflare servers, your worker instances are created on any of them, or all of them')*

Cloudflare makes these calculations for us - whether to reuse an existing (warm) worker, or to spin up a new one to serve a new request. As for *when* it creates a new instance, vs reuses an older instance of a worker, it is a bit of a black box. In that, we trust the platform to make the efficient decision for us. Of course we can assume some sensible defaults, like if a user is making a request from Pakistan, Cloudflare would not be routing that request to an active worker instance in Canada, instead a new instance would be spun up in a location closest to the user. Or if 1 million requests are being made to a worker in New York, all of those would not be served by a single instance, but by multiple worker instances in the closest region.

*It is not the same as a standard server*

What's important for us as developers is to understand that a worker instance is not persistent. So it does not have any long term storage, and cannot perform very long running tasks.

Further, we can imagine that since worker instances is spun up and wound down plenty of times, they need to be lightweight, and as such cannot use the (heavy) node runtime. Cloudflare has its own JavaScript runtime, which aims to be compliant with the NodeJS runtime. At the time of me writing this, it is [90 percent compatible with NodeJS](https://workers-NodeJS-compat-matrix.pages.dev/), what this means for you is that most of the libraries that you use in your NodeJS projects should be usable in Cloudflare workers.

And since many of these small instances can be spawned, the workers themselves need to have a very small memory footprint. There is also an upper limit on the amount of memory a worker can consume. You give some you get some, there is no silver bullet.

You can explore worker limits [here](https://developers.cloudflare.com/workers/platform/limits/).

#### How to write a worker:

Now that we are familiar with what a worker is, and how they are executed, let's write a worker. This section in particular takes a lot of material from Cloudflare's own "Getting Started" section on workers. I'm mostly satisfied with their the getting started part of it, but it does not give an adequate explanation about what **wrangler** is.

Earlier I talked about Cloudflare having its own JavaScript environment, in which your worker code runs. For local development, wrangler gives you that environment. Other than that, wrangler is a complete tool for local development with other Cloudflare products, i might write about that in the future. But for now it should be enough to know that wrangler is a tool that a) allows us to run our worker locally b) helps us deploy it from our local machine.

If you follow through with the "Getting Started" guide in the Cloudflare docs, you should see this:

```javascript
export default {
	async fetch(request, env, ctx) {
		return new Response('Hello World!');
	},
};
```

A worker, with a fetch handler, which returns a `Hello World` response if any request is sent to it, regardless of HTTP method.

Sidebar: Developing on the Worker's platform has certain implications for your code as well. For one, if enforces dependency injection and you might end up having a codebase with only pure functions. Which itself is not a bad thing, it is just different from how I am used to writing JavaScript code. How does it enforce this? You see the `env` being passed to the fetch handler? The `env` contains your environment variables and **bindings**. Bindings are used to connect to other Cloudflare services. So if you use `D1`, their database product, you need to access the connection to that database through the `env`.  You can see then how any helper functions you will end up implementing will require the `env` passed to them as an argument.


You can read [part 2 here](https://wahab.vercel.app/blog/a-serverless-server)
