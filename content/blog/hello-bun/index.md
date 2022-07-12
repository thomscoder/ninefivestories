---
title: "the new kid on the block, Bun!"
date: "2022-07-11"
description: "Bun is here!"
---

There's a new kid on the block and he's really dope.

<img src="./bun.png" alt="bun logo" style="width:100%">

<h4 style="padding: 20px; font-weight: normal;">Bun is a modern JavaScript runtime</h4>

<h4>Why is it so hyped up?</h4>

- Bun is fast. Really fast.
- Bun also has a built-in <a href="#bundler" style="color:inherit">bundler</a> and <a href="#transpiler" style="color:inherit">transpiler</a>. 
- Bun is and aims to be more and more compatible with NodeJS.
- Bun supports Typescript and JSX out of the box.

and much more (unit tests, env variables...)...

<a href="https://github.com/oven-sh/bun/issues/159" target="_blank">Check the full Bun Roadmap to see where its headed</a>

As of today, citing the docs
<h4 style="padding: 20px; font-weight: normal;">Bun natively implements hundreds of Node.js and Web APIs, including ~90% of Node-API functions (native modules), fs, path, Buffer and more.</h4>


<h5>Why is Bun so fast?</h5>
While Node and Deno embed the most famous and "more traditional" engine <a href="/hello-v8" target="_blank">Google's V8</a>, Bun embeds the Webkit based browsers' engine: JavascriptCore.

Generally JavascriptCore tends to start faster than V8, but it is considered harder to work with. 

<a href="/hello-v8" target="_blank">I'm writing a series about the Google's V8</a>

Bun is also mainly written in <a href="https://ziglang.org/" target="_blank">Zig</a>, a low level programming language with manual memory management.

All these factors and a really thoughtful and extensive code optimization make Bun blazingly fast.

---
<br/>
<details style="cursor:pointer" id="transpiler">
    <summary><span class="stop-the-world" style="display:inline; font-weight:bold;">Transpiler</span></summary>
    Transpiling is the act of converting a source code file into another source code file.
    This conversion, or also called source to source compilation, can happen from a programming language to another programming language (i.e. Emscripten transpiles C/C++ to Javascript) or from one version of a programming language to another version (i.e. Babel can be used to transpile ES6 Javascript to ES5 Javascript).
</details>
<br/>
<details>
    <summary style="cursor:pointer" id="bundler"><span class="stop-the-world" style="display:inline; font-weight:bold;">Bundler</span></summary>
    Bundling (in Javascript context) is the act of combining together multiple Javascript files and their dependencies into a single file, usually for the usage in the browser.
    <a href="https://www.freecodecamp.org/news/lets-learn-how-module-bundlers-work-and-then-write-one-ourselves-b2e3fe6c88ae/" target="_blank">How bundlers work</a>.
</details>

<h4>References</h4>
<a href="https://bun.sh" target="_blank">Bun Website</a><br/>
<a href="https://github.com/oven-sh/bun" target="_blank">Contribute to Bun</a><br/>
<a href="https://github.com/oven-sh/bun#Reference" target="_blank">Bun docs</a><br/>


