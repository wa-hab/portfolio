---
title: Introduction to the Web
description: A brief introduction to the web and the client/server model.
date: 2021-08-29
category: web
tags:
 - web
 - frontend
 - backend
 - database
 - mern
published: false

---

# Traditional mental model:

So far, you likely have been operating on a fairly linear and centralized model of program execution, where the program to be run is situated on the same machine the output is to be viewed on. Like the following code

```cpp

#include <iostream>
using namespace std;

int main() {
    int num1, num2, sum;

    cout << "Enter the first number: ";
    cin >> num1;

    cout << "Enter the second number: ";
    cin >> num2;

    sum = num1 + num2;

    cout << "The sum of " << num1 << " and " << num2 << " is " << sum << endl;

    return 0;
}
````

The flow and mental model of this program is fairly straightforward, and would typically be as follows

- User runs the program (a compiled binary of it) on a machine.
- The program starts execution and prompts the user to enter the numbers.
- The user enters the numbers, which are added to some location in memory.
- The program adds the numbers and returns the result.

A detail that is mostly overlooked here, is that all of this computation is done on a *single machine*. Execution, calculation, and the display of result, all done on a single machine. The web does not work this way.

# Client-Server Model:

Don't tell anyone I told you this, but no one really knows how the web works. We just kept doing shit and it kept working.

But, if I had a gun to my head and had to explain how the web works, this is how I would do it:

1. Let's say you want to go to the YouTube website and watch some cat videos.
2. You open your browser, and enter `youtube.com.` Now, what is it that you think happens? Does the browser have all of YouTube stored on your computer, including the videos uploaded a few seconds ago? Not likely. This indicates that we need some way to "get" `youtube.com` when we want to watch cat videos.
3. What happens is that your browser (that is, google chrome, firefox, or some other), sends an *HTTP GET* request to the `youtube.com`  *server*. You may have a few questions at this point, here are the answers:

**What the fuck is a HTTP?**
  A protocol is a predecided format for communication. Like how you expect a Muslim to say Salam and Wasalam, which is a fairly simple protocol, network protocols are the same, just a bit more complicated. *HTTP* (Hypertext Transfer Protocol, for the nerds 🤓), is one of many web protocols that governs data exchange over the internet. It is the most common one for websites, and is always used when you access a website through a browser.

**What is HTTP GET?**
  The HTTP protocol has a set of keywords, like *GET*, as in go and get me this thing. There is also *POST*, as in, take this data, and send it to this location. Theres also *PUT* and *DELETE*, the former is a close relative to *POST*, except it is mostly used to update previous data and *DELETE* is used to, well, delete data.

**And what is a server?**
  Server? I hardly know er'. Ahaha...ha...ha. Sorry.
  Anyways, a server is typically a computer, which is running a special program that is continuously *listening* for HTTP requests and respond accordingly. What do they respond with? We'll find out in a while.
  But for now you should know that most computers can be turned into a server, even your laptop, it isn't recommended though servers typically need to be powerful machine that need to respond to thousands of requests. Think about it, does the YouTube server only cater to you at a given time? Probably not.

5. Now that a *HTTP GET* request has been sent to the YouTube  *server*, it needs to *respond* to that request. What does it respond with, you ask? Good question. The answer is; an HTML file. Now you ask, **what the fuck is a HTML?** Valid question, for the nerds, HTML means Hypertext Markup Language. Simply put, HTML is a way to write documents for the web. It provides you with some special keywords that you use to structure your website and display the content nicely. More on HTML in the next lecture. But for now, all you need to know is that an HTML file is returned in *response* to a *GET* request when you type `youtube.com` in the browser.
6. When the browser gets the *HTML* file in response to a request, it parses it, and displays it in your browser window.

I have omitted alot of details in the above explanation, but this is enough to develop a mental model. If visualizing it helps, here is how it looks;

![Client-Server](/client-server.png)

Something to note here is that in this model, the *server* and your machine (*the client*) are both located on different machines. The *client* communicates with the *server* using a *request*, to which the server *responds*. This the the request/response model in client-server model. And this is how websites work.
# Frontend/Backend/Database:

Now that you know how the web works, it's time to understand how we break it down into parts. It is immediately obvious that there must be at least two parts, one that is shown to you in the browser (also known as the *frontend*), and the other that is run on the *server* (also known as the *backend*) of the website.
What is not immediately obvious, and is sometimes mixed with the backend, is the database. So, *what the fuck is a database?* As the name indicates, the database is a collection of data that your app needs, we'll look at it in more detail when we get to the backend module.

From the example in the previous section, the *frontend* is the HTML file that is sent to the client.

The below illustration of the structure of a typical website should help:

![frontend-backend](/frontend-backend.png)


An important thing to note is that this is not the *only* way to structure a web application, there are plenty of new paradigms out there (like serverless and edge), but this is the *traditional* way of developing an application, and the one we will be studying in this course.

## Decomposition of the MERN stack into frontend/backend/database

You might have heard the word MERN stack alot, that's why you took this course after all, to learn the MERN stack (which is a poor goal, but more on that later). But what the fuck is it actually?

Firstly, *what the fuck is a stack?* A stack is a collection of tools used to make a software product, it is most commonly used in the context of web development, but may be used elsewhere. It does not contain ALL of the tools that were used, but it does contain the ones that largely define its structure.

Now, **MERN** is a collection of *tools*, namely **M**ongoDb **E**xpressJs **R**eactJS and **N**odejs. MongoDb here belongs to the database part of any web application, ExpressJS and NodeJS are the backend, and ReactJS is the frontend.

But...where are **HTML, CSS and JS**? Everyone's talking about them all the time. Valid question, the thing is, almost every web application would have these three in it, so we don't include them when we're defining what stack we are using. Because it does not give us alot of information about the structure of the site.

Now, something you may have noticed is the repeated use of the word *tool* in the above paragraphs. That is because new developers seem to marry themselves to a stack, not realizing that a software stack is just a means to an end, and not the end in itself. Don't go around calling yourself, or aspiring to be a *MERN Stack Developer*, no, just no. Would you find in electrical engineer calling themselves *Blue colored wire engineer* or a carpenter calling themselves *hammer-centric carpenter* or some bullshit like that. The goal should be to become a Software Engineer, even a Web Developer, and to achieve that goal we employ the MERN stack in this course because it is the easiest to wrap your head around. By no means are you expected or encouraged to stop when you've learnt it, continue to explore and learn newer technologies.

fin.
