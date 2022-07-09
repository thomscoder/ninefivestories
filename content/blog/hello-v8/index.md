---
title: inside javascript's core - part 1
date: "2022-07-08"
description: "An introduction to Google's V8 and memory management. It's me trying to understand those concepts"
---

<img src="https://c.tenor.com/a6OiNnAdh0gAAAAC/dark-gloomy.gif" style="width:100%"/><br/>

In my <a href="/hello-js">previous article</a> we talked about what Javascript is.
In this article I want to go deeper and start exploring how Javascript works focusing on the most famous Javascript engine: <b><em>Google's V8</em></b>.


<h4 style="padding: 20px; font-weight:normal;">An "engine" is a self-contained, but externally-controllable, piece of code that encapsulates powerful logic designed to perform a specific type of work.</h4>

Every major browser comes with one already built-in... 

- <b>Firefox</b> uses <a href="https://en.wikipedia.org/wiki/SpiderMonkey" target="_blank">SpiderMonkey</a> (the first ever Javascript engine)
- <b>Safari</b> uses <a href="https://developer.apple.com/documentation/javascriptcore" target="_blank">JavascriptCore</a>
- <b>Edge</b> used to use Chakra (now it uses the <a href="https://en.wikipedia.org/wiki/Blink_(browser_engine)" target="_blank">Blink</a> and <a href="https://v8.dev/docs" target="_blank">V8</a>)

and so on...

In this series I am going to talk about the V8 and today I will talk about Garbage Collection.

But, first a quick introduction.


<h4>What is this V8 thing?</h4>
Citing the official docs:
<h4 style="padding: 20px; font-weight: normal;">V8 is Google’s open source high-performance JavaScript and WebAssembly engine</h4>

It is written in C++ and it is embedded in Open Source projects like <a href="https://nodejs.org/en/" target="_blank">NodeJs</a> and <a href="https://deno.land/" target="_blank">Deno</a>.

It is what provides all the data types, operators, objects and functions.<br/>
It is what manages the memory of a Javascript program. <br/>
It is what optimizes the code to run faster.<br/>
It is what makes the thing you write, happen. <br/>

> 💡 - Did you know you can access V8 native syntax in NodeJs by passing the <b>--allow-natives-syntax-flag?</b>

<h4>Open Source</h4>
The V8 source code can be downloaded, studied and improved by everyone. 
The docs has also a section for everyone who would like to contribute to the development.<br/><br/>
<a href="https://v8.dev/docs/source-code" target="_blank">Build from Source<a/><br/>
<a href="https://github.com/v8/v8" target="_blank">Mirror Repo</a><br/>
<a href="https://v8.dev/docs/contribute" target="_blank">Contribute</a>

<h4>Implements ECMAScript</h4>
What does it even mean?<br/> What is ECMAScript?<br/>
In <a href="/hello-js" target="_blank">the article</a> where I explained what Javascript is, I mentioned that Javascript conforms to the <a href="https://www.ecma-international.org/publications-and-standards/standards/" target="_blank">ECMAScript specification</a>.

<b>ECMA (European Computer Manufacturer's Association)</b> is an association that develops standards for technologies. <b><a href="https://www.ecma-international.org/publications-and-standards/standards/ecma-262/" target="_blank">ECMA-262</a></b> is a standard that contains the specification for a general purpose scripting language. This specification is called <b><em>ECMAScript</em></b>.
<h4 style="padding: 20px; font-weight: normal;">A standard is a document that provides rules, guidelines or characteristics for activities or their results, for common and repeated use. Standards are created by bringing together all interested parties including manufacturers, users, consumers and regulators of a particular material, product, process or service.</h4>

> 💡 - <a href="https://yesfordev.com/why-javascript-is-scripting-language/" style="color:inherit;">Scripting vs Programming</a>

<h4>Manages Javascript Memory</h4>
The memory lifecycle for all programming languages can be summarized in:

<a style="pointer-events: none; text-decoration: none; padding:20px; margin-top:20px; display:block; text-align:center;">Allocation --> Usage --> Release</a>

Some languages require a manual allocation and release of memory

```cpp
int* ptr;
ptr = new int; // Dynamically allocating memory for an int variable
*ptr = 12;

cout << *ptr << endl;
delete ptr; // Deallocate memory

```
Javascript does not.

So, how in the hell does Javascript handle memory?

<h5>Heap and Stack</h5>

Javascript engines have two places where they store data: <b><em>the heap</em></b> and <b><em>the stack</em></b>

We can simply define the stack as the place where static data, including method and function frames<a href="/hello-js#primitives" target="_blank" style="color:inherit;"> primitives data types</a> and pointers to objects get stored, while the memory heap is the place where the <a href="/hello-js#primitives" target="_blank" style="color:inherit;">non primitves data types</a> are stored.
The Heap is where Garbage Collection takes place.

> All variables first point to the stack. If it is not a primitive value, the stack contains a references that points to the Object in the heap.<br/><br/>
> 💡 - Why can I push elements in <a href="https://levelup.gitconnected.com/understanding-call-stack-and-heap-memory-in-js-e34bf8d3c3a4" target="_blank" style="color:inherit"><b>const Arrays</b></a> ?


<h4>Garbage Collector</h4>

When we write our code and create primives, objects, functions we just learned that it takes memory. So when is the cleaning performed?<br/> In Javascript the engine does all the hard work for us.

The way V8 achieves that is through the implementation of some advanced concepts. 

<h5>Reachability</h5> 
<h4 style="padding: 20px; font-weight: normal;">If an object is currently reachable within the runtime must be kept, and any unreachable objects may be collected.</h4>


<h5>Marking</h5>
<h4 style="padding: 20px; font-weight: normal;">Marking is the process by which reachable objects are found</h4>
Starting from a set of known objects pointers, it follows each pointer to a Javascript object and marks that object as reachable. It then proceeds recursively to follow every pointer in all found objects until every object has been found and marked.

<h5>Sweeping</h5>
<h4 style="padding: 20px; font-weight: normal;">Sweeping is a process where gaps in memory left by dead objects are added to a data structure called a free-list.</h4>

A free list is a data structure generally used for <b><em>dynamic memory allocation</em></b> that connects unallocated regions of memory together in a <a href="https://en.wikipedia.org/wiki/Linked_list#:~:text=In%20computer%20science%2C%20a%20linked,which%20together%20represent%20a%20sequence." target="_blank" style="color:inherit;">linked list</a>.<br/>
When new data has to be allocated, V8 looks at the free list to find an appropriate chunk of memory.

<h5>Compaction</h5>
<h4 style="padding: 20px; font-weight: normal;">Compaction is the process of copying surviving objects into other pages that are not currently being compacted (using the free-list for that page)</h4>

---
> Although you do not need to worry about freeing memory everytime, this doesn't exempt you from carefully reviewing your code.<br/>Things such as badly implemented recursion or infinite loop can extinguish your available memory pretty quick and/or worse lead to memory leaks.
---
<br/>
<h5>Generations</h5>

V8 splits the heap into different regions called <a href="https://v8.dev/blog/orinoco-parallel-scavenger">Generations</a>.

- <b>Young Generation</b> - split further in <b>Nursery</b> and <b>Intermediate</b>
- <b>Old Generation</b>

Starting from the <b><em>nursery</em></b>, if an object survive a Garbage Collection it is moved into <b><em>Intermediate</em></b> generation at first and then <b><em>Old Generation</em></b> after another survival.

But why is that?
<h4 style="padding: 20px; font-weight: normal;">Most objects die young</h4>
V8's generational heap is designed to exploit just that assumption about objects' lifetime, the <b><em>Generational Hypothesis</em></b>.<br/><br/>

Rememebering the concept of <b><em>Compaction</em></b> and assuming that objects are more likely to die in initial generations, then by moving only the objects that survive, V8 only pays a cost for copying that is proportional to the number of the surviving objects... and not the number of their allocations.

---

<h4 style="padding: 20px; font-weight: normal;">Orinoco is the codename of the Garbage Collector project to make use of the latest and greatest parallel, incremental and concurrent techniques for garbage collection, in order to free the main thread</h4>

Geez, what does that even mean?<br/>
Well, one metric in measuring the Garbage Collection is the time that the main thread spends paused while GC is performed.<br/><br/>
In traditional <span class="stop-the-world" style="display:inline; font-weight:bold;">Stop The World</span> garbage collectors this time can add up and become a burden on user experience (latency or poor rendering), this is why Orinoco introdcued 3 techniques to make the collection more powerful.

1. <b>Parallel</b>: is where the main thread and the helper threads divide, almost equally, the work. This is still <b><em>stop the world</em></b> approach but the pause time is now divided for the number of threads participating. There is no Javascript running.
2. <b>Incremental</b>: the main thread doesn't do an entire Garbage Collection, but just a small amount of work intermittently. This is more difficult because Javascript executes between each segment meaning that heap changes and thus giving birth to the risk of invalidating all the previous work done by GC.
3. <b>Concurrent</b>: is where the main thread executes Javascript with no interruptions while the helper thread does Garbage Collection in the background. This has a similar risk to the Incremental GC techinque, plus constant races between the main and the helper thread to read/write objects.
<h4 style="padding: 20px; font-weight: normal;">V8’s stop-the-world, generational, accurate garbage collector is one of the keys to V8’s performance.</h4>

<h4>Conclusion</h4>
Phew...<br/>
I won't go deeper on how the Garbage Collection is implemented in V8 because such is a huge and complex topic and one article wouldn't be really enough. I introduced the main concepts behind V8 and how it allows us to write code without thinking too much about memory management (always keeping the best practices in mind though).
V8 is an insanely huge piece of technologies that implements a lot of clever concepts and I cannot wait to unveil them one by one.<br/>
See ya in next article.




<h4>References</h4>
<a href="https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf" style="color: inherit" target="_blank">How Javascript works</a><br>
<a href="https://v8.dev" target="_blank" style="color: inherit">V8 Docs</a><br/>
<a href="https://levelup.gitconnected.com/understanding-call-stack-and-heap-memory-in-js-e34bf8d3c3a4" target="_blank" style="color:inherit">Javascript memory</a><br/>
<a href="https://deepu.tech/memory-management-in-v8/" target="_blank" style="color:inherit">Memory Management</a>