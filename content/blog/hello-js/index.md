---
title: "hello world"
date: "2022-07-03"
description: "Let's start a journey inside Javascript. Let's explore its design, its internals and let's surpass the limits of this beautiful language. Shall we? Here it is the first article, an Introduction to the Reassess Your Javascript series. Enjoy!"
---

---

I code in Javascript daily. 
At the very least around 9 hours per day, but I started realizing that the more I code the more I feel that I don't really know what I'm doing lol. 
I feel like I'm running in circle.

<img src="https://media4.giphy.com/media/9jCK8MGZRBOSs/giphy.gif" style="text-align: center; width: 90%"/><br>

So I had the idea to start this series of articles to try reorganize my learning. 
The title idea came from How To Reassess Your Chess by Jeremy Silman in which at some point he suggests chess players to restart from the basics from a different point of view.

This will be just me documenting my studies.

From the Javascript language design to how it works under the hood, by peaking at the Google's V8 engine concepts and implementations.

Enough talk.

---

<h4>So…What is Javascript ?</h4>
In a random conversation at the pub we would probably define Javascript as a programming language mainly used in web development that allows the implementation of dynamic features on web pages.

Sounds good, but anyone with even a little experience in coding knows that Javascript is far more powerful than that. We should give it a cooler definition to show some respect to its name and power.

<h4 style="padding: 20px; font-weight: normal;">Javascript is a high-level, often Just-In-Time compiled language that conforms to the ECMAScript specification.</h4>
It doesn't end there.
<h4 style="padding: 20px; font-weight: normal;">Javascript has dynamic typing, first class functions and it is a prototype-based object oriented language and supports other paradigms as well.</h4>
A lot of fancy words.

It is a cool definition to learn by heart and parrot, but going a bit deeper into each of those words can be really beneficial for getting a better understanding of the language.

First we defined Javascript as <b><em>high-level programming language</em></b>.

An high level language is a programming language with strong abstraction from the low level workings of the computer it is running on.

Then we said <b><em>Just In Time compiled</em></b>.

Javascript is an interpreted language. What that means is that an interpreter runs a program line by line, analyzes and executes each command whereas a compiled language (such as C, C++, Rust, Go etc…) is converted directly into machine code during a "build" step. This overhead tends to make interpreted languages significantly slower than compiled ones.

Well, this before JIT compilation.

<h4>What the hell is JIT compilation?</h4>
This type of compilation attempts to use the benefits of both interpreters and compilers. We can define JIT compilation as compilation that is being done at run time. I will talk more about it when diving into the most famous Javascript engine Google's V8.<br><br>

Back to the fancy words…

<b>Dynamic typing </b> -  The interpreter assigns variables a type at runtime based on the variable's value at the time. So the type of the variable can be changed on the fly <small><a href="https://www.freecodecamp.org/news/js-type-coercion-explained-27ba3d9a2839/" style="color: inherit">(Learn more about Type Coercion).</a></small>

Whereas <b>statically typed</b> languages perform type checking at compile time.

```bash
error: assigning to 'char *' from incompatible type 'double'
```

> <p id="primitives">Remember: Javascript has 7 primitive types (string, number, BigInt, boolean, undefined, Symbol and null).<p>

<b>First-class functions </b> -  Javascript can treat functions as first-class citizens. This simply means it allows the passing of functions as arguments to other functions, or returning them as values from other functions or even storing them in data structures.

Alright, we almost done…

…almost…

---

<h4><b>Prototype-based Object Orientation and Multi-paradigm</b></h4>
First of all let's define what paradigms are.

<h4 style="padding: 20px; font-weight: normal;">Paradigms are just different ways or styles in which a program or a programming language can be organized</h4>

There are a lot of paradigms out there and new ones are being created and adopted with the progress of technologies and new standards, but in this article I will list only the concepts behind the most widely used ones.

The list goes as it follows:

- <b>Imperative</b> -  the programmer dictates exactly what the computer has to do in a very specific way.
- <b>Procedural </b> -  derivative of imperative programming, it encourages the programmer to improve code modularity with the usage of functions
- <b>Functional </b> -  improved version of the procedural paradigm with the concept of first-class functions (explained above)
- <b>Declarative </b> -  this paradigm aims to hide away complexity exposing a syntax closer to human language and thinking
- <b>Object Oriented </b> -  a paradigm that organizes software around the concepts of classes and objects

<a href="https://www.freecodecamp.org/news/an-introduction-to-programming-paradigms/#:~:text=What%20is%20a%20Programming%20Paradigm%3F,programming%20problems%20should%20be%20tackled." style="color: inherit">More on paradigms</a>

Javascript's flexibility allows the programmer to structure and write code in any of the aforementioned paradigms, this is why it is called a multi-paradigm language.

<a href="https://en.wikipedia.org/wiki/Comparison_of_multi-paradigm_programming_languages" style="color: inherit">A list of other multi-paradigm programming languages</a>

Cool, but what does <b id="prototypes"><em>prototype-based</em></b> means?

To answer this question we need to learn another couple of definitions first.

<h4>Classes and Objects</h4>
We learned that OOP (Object Oriented Programming) is a paradigm that organizes the code around the concepts of classes and objects.

<h4 style="padding: 20px; font-weight: normal;">A Class is a sort of blueprint that defines all of the properties and methods that characterize a certain set of objects.</h4>
<h4 style="padding: 20px; font-weight: normal;">An Object is an instance of a class.</h4>

```javascript
class Animal {} // class
return new Animal(); // object
```

Cool.

We are finally ready to start defining what prototype-based means.

<b>Prototype-based OOP</b> is just another style of the Object Oriented paradigm. The main difference between a prototype-based and a class-based language is that, in Prototype-based langauges, objects are the primary entities and the design focuses on what objects do rather than what they will be.
<h4 style="padding: 20px; font-weight: normal;">A class defines a type which can be instantiated, a prototype is itself an object instance.</h4>

Prototypes, in Javascript, are the mechanism that allows objects to inherit from one another.

Inheritance is one of the four principles the advent of OOP brought along to design better modular and reusable code.

- <b>Abstraction</b>  -  allows the usage of simple classes to represent complexity. A guitarist doesn't necessarily need to know how the engineering of an electric guitar work to play it.
- <b>Encapsulation </b> -  hides the internal implementation inside a class and hides internal data inside objects.
- <b>Polymorphism </b> -  allows the same method to execute different behaviors.
- <b>Inheritance </b> -  allows the passing of data from parent to child classes. Gives the programmer the flexibility to define general parent classes and then create child classes as needed.

<h4 style="padding: 20px; font-weight: normal;">Classes inherit from classes creating subclasses relationship</h4>
<h4 style="padding: 20px; font-weight: normal;">In prototypal-inheritance Objects inherit directly from other objects.</h4>

Javascript can achieve this prototypal-inheritance in fundamentally two ways: <b><em>Prototype Delegation</em></b> and <b><em>Concatenative Inheritance</em></b>.


- <b>Prototype delegation </b> -  every object in Javascript has a link to a prototype for delegation. If a property is not found on the object the lookup starts visiting each object in the prototype-chain until it gets back to the root delegate, the Object.prototype.
- <b>Concatenative Inheritance </b> -  It is the process of copying properties from one object to another without retaining a reference between the two objects. Source prototypes are commonly called mixins.

While the prototype-chain is probably the most known method, concatenative inheritance is the most used one.

How is that?

Javascript gives us the possibility to extend dynamically an object also known as <b>Dynamic Object Extension</b>.

<h4 style="padding: 20px; font-weight: normal;">Dynamic Object Extension is the idea that objects can be built by adding properties to existing instances</h4>
This concept was inspired by the <a href="https://selflanguage.org/" style="color: inherit;">Self programming language</a> and, since Dynamic Object Extension is ridiculously common in Javascript, it makes concatenative inheritance the most common form of inheritance in Javascript.

And people don't even realize it. (e.g. Object.assign() - sounds familiar?).

<h4>Conclusion</h4>
I hope this gave you a solid definition of what Javascript is. There is a lot more to say.
This is far from a full explanation. Each introduced topic could be expanded greatly, but hopefully I sparked your curiosity. 
I leave some really amazing articles you can learn a lot more from in the references section. 

<h4>References</h4>
1. <a href="https://medium.com/code-monkey/object-composition-in-javascript-2f9b9077b5e6" style="color: inherit;">Object Composition</a><br>
2. <a href="https://medium.com/javascript-scene/the-heart-soul-of-prototypal-oo-concatenative-inheritance-a3b64cb27819" style="color: inherit;">Concatenative Inheritance</a><br>
3. <a href="https://medium.com/javascript-scene/master-the-javascript-interview-what-s-the-difference-between-class-prototypal-inheritance-e4cd0a7562e9" style="color: inherit;">Master the Javascript Interview</a>