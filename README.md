# delta.js

[![Build Status](http://img.shields.io/travis/mhelvens/delta.js.svg)](https://travis-ci.org/mhelvens/delta.js?branch=master)
[![Coverage Status](http://img.shields.io/coveralls/mhelvens/delta.js.svg)](https://coveralls.io/r/mhelvens/delta.js?branch=master)
[![npm](https://img.shields.io/npm/v/delta.js.svg)](https://www.npmjs.com/package/delta.js)
[![Bower](https://img.shields.io/bower/v/delta.js.svg)](http://bower.io/search/?q=delta.js)

achieve modularity and separation of concerns through *feature-oriented programming*


## Description

<img align="right" width="300px" margin="15px" src="./docs/images/sculptor.jpg" />

Programming is an activity very prone to human error, especially if you have
multiple developers changing the same code-base at the same time.
As more and more features are implemented by different programmers, progress will
often slow to a crawl. Programmers can easily lose overview and step on each others
toes when their code is spread across the code base surrounded by
the code of others.

*delta.js* helps you organize your JavaScript code in terms of *features*.
As it turns out, files, modules, objects, functions (and so on), are not
the right abstractions for describing a feature. But they are very good at
other stuff! This library introduces the notion of a *delta*, which complements
those other constructs.

A delta is the place to gather all the code belonging to a specific feature.
Basically, for each piece of code, you instruct the delta to put that code in
the file, module, object or function where it belongs. That way, the code
can *physically* be gathered in one place, and therefore be easy to maintain.

This has other benefits as well. By having some deltas be explicitly applied
*after* others, you give them permission to overwrite things.
If two deltas that are *unordered* try to overwrite each others code,
you will get a friendly error message. Moreover, by separating your features
so explicitly, you will be able to turn them on or off with a switch, for
either debugging or production.

This might all seem overly complicated at first. But once you get started,
you'll soon fall in love with this approach.

At this time, delta.js is a runtime library. But in concept, deltas could be
applied by a preprocessor. This will be supported by a future version.


## Installation

<img align="right" width="300px" margin="15px" src="./docs/images/foundation.jpg" />

This library depends only on the [Babel ES6 polyfill](https://babeljs.io/docs/usage/polyfill/). For your convenience, a delta.js version is provided with this polyfill already baked in, but you also have the option of providing it yourself.


### Install using Bower

`delta.js` is available as a [Bower](http://bower.io/) package:

```shell
bower install delta.js
```

Unfortunately, the Babel polyfill is [not distributed through Bower](https://github.com/babel/babel/issues/315). So you'll have to either use the version of delta.js with the polyfill baked in, or you'll have to get the polyfill from someplace else, like NPM.


### Install using NPM

`delta.js` is available as an [NPM](https://www.npmjs.org) package:

```shell
npm install delta.js
```

## Importing `DeltaJs`

The delta.js package offers a [UMD](https://github.com/umdjs/umd) API, so it supports
AMD ([RequireJS](http://requirejs.org/)), CommonJS and script-tags:

```javascript
requirejs(['lib/delta.js/dist/delta.js'], function (DeltaJs) {
// use DeltaJs
});
```

```javascript
var DeltaJs = require('lib/delta.js/dist/delta.js')
// use DeltaJs
```

```html
<script src="lib/delta.js/dist/delta.js"></script>
<!-- use DeltaJs -->
```

###Files

The `dist` directory offers different files for use in different circumstances.
Use the following table to determine which file to use in your situation.

| File                          | Description                                                                      |
| ----------------------------- | -------------------------------------------------------------------------------- |
| `delta.js`,<br>`delta.min.js` | requires you to load the [Babel polyfill](https://babeljs.io/docs/usage/polyfill/) yourself |
| `delta.full.js`,<br>`delta.full.min.js` | already includes the Babel polyfill |

If you don't know which you need, you probably want `delta.full.min.js`, because it will work out-of-the-box. But it is generally more elegant to load the polyfill yourself, especially if you use other libraries that depend on it.


## API Documentation


* [DeltaJs](#DeltaJs)
    * [.Delta](#DeltaJs#Delta)
    * [.newProxyMethod(method, handler)](#DeltaJs#newProxyMethod)
    * [.newOperationType(name, DeltaClass, ProxyClass)](#DeltaJs#newOperationType)
    * [.newFeature(name, options)](#DeltaJs#newFeature) ⇒ <code>DeltaJs#Feature</code>


-----

### Classes
<dl>
<dt><a href="#DeltaJs">DeltaJs</a></dt>
<dd><p>This class offers every functionality you need from delta modeling.
Each instance offers its own operation types and variation points
and acts as a facade (as in design pattern) to the more specific
subsystems of delta.js.</p>
<p>Using multiple <code>DeltaJs</code> instances allows you to use different sets
of deltas and rules in the same project that work independently
from each other. But you will usually need only one DeltaJs
instance per application.</p>
</dd>
</dl>
### Functions
<dl>
<dt><a href="#do">do(args)</a> ⇒ <code>DeltaJs#Proxy</code></dt>
<dd><p>{@public}{@method}</p>
</dd>
<dt><a href="#vp">vp(name, val)</a> ⇒ <code>*</code></dt>
<dd><p>{@public}{@method}
This method indicates a variation point.</p>
</dd>
<dt><a href="#do">do()</a> ⇒ <code>DeltaJs#Proxy</code></dt>
<dd><p>{@public}{@method}
A {DeltaJs} instance has one fundamental {DeltaJs#DeltaModel} instance, which is applied
to any variation points that are encountered. This method is an alias to the eponymous
method on that &#39;root&#39; delta model. It returns the proxy that allows new delta operations
to be added more easily. It presets the &#39;feature&#39; option to &#39;true&#39;, but this can be
overwritten manually.</p>
</dd>
</dl>
<a name="DeltaJs"></a>
### DeltaJs
This class offers every functionality you need from delta modeling.
Each instance offers its own operation types and variation points
and acts as a facade (as in design pattern) to the more specific
subsystems of delta.js.

Using multiple `DeltaJs` instances allows you to use different sets
of deltas and rules in the same project that work independently
from each other. But you will usually need only one DeltaJs
instance per application.


-----

<a name="DeltaJs#Delta"></a>
#### *deltaJs*.Delta

-----

<a name="DeltaJs#newProxyMethod"></a>
#### *deltaJs*.newProxyMethod(method, handler)

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | method name |
| handler | <code>function</code> | a function that takes method arguments, and returns a new `DeltaJs#Delta` instance |


-----

<a name="DeltaJs#newOperationType"></a>
#### *deltaJs*.newOperationType(name, DeltaClass, ProxyClass)
This method allows you to tell delta.js about a new kind of delta operation.
This was also done for existing operations like `modify`, `add`, `remove`, and so on.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name of the new operation type |
| DeltaClass | <code>function</code> | the new operation class |
| ProxyClass | <code>function</code> | the optional custom `Proxy` subclass for this operation-type |


-----

<a name="DeltaJs#newFeature"></a>
#### *deltaJs*.newFeature(name, options) ⇒ <code>DeltaJs#Feature</code>

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | the name of the new feature |
| options | <code>object</code> | the (optional) options for the new feature |

**Returns**: <code>DeltaJs#Feature</code> - - the object representing the new feature  

-----

<a name="do"></a>
### do(args) ⇒ <code>DeltaJs#Proxy</code>
{@public}{@method}


| Param | Type |
| --- | --- |
| args | <code>Array.&lt;\*&gt;</code> | 


-----

<a name="vp"></a>
### vp(name, val) ⇒ <code>\*</code>
{@public}{@method}
This method indicates a variation point.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | a hook by which operations from the core delta model can be applied |
| val | <code>\*</code> | the initial value of this variation point |

**Returns**: <code>\*</code> - - the value of this variation point after applying the appropriate deltas  

-----

<a name="do"></a>
### do() ⇒ <code>DeltaJs#Proxy</code>
{@public}{@method}
A {DeltaJs} instance has one fundamental {DeltaJs#DeltaModel} instance, which is applied
to any variation points that are encountered. This method is an alias to the eponymous
method on that 'root' delta model. It returns the proxy that allows new delta operations
to be added more easily. It presets the 'feature' option to 'true', but this can be
overwritten manually.

**Returns**: <code>DeltaJs#Proxy</code> - - the proxy to this delta, for easily adding operations  

-----



## License

`delta.js` is released under the terms of the [MIT license](http://en.wikipedia.org/wiki/MIT_License).
It permits reuse within both open and proprietary software, provided
all copies of the licensed software include a copy of the MIT License
terms and the copyright notice.


## Future Plans

<img align="right" width="300px" margin="15px" src="./docs/images/factory.jpg" />

Here is an incomplete list of future plans for this library:

* support for changing HTML and CSS with deltas
* transpiler to resolve deltas at build-time

<div style="clear: both">&nbsp;</div>
