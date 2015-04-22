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
    * ___instance___
    * [.ContainerProxyProxy](#DeltaJs#ContainerProxyProxy) ⇐ <code>[Proxy](#DeltaJs#Proxy)</code>
    * [.Delta](#DeltaJs#Delta)
        * ___instance___
        * [.applicationCondition](#DeltaJs#Delta#applicationCondition) ⇒ <code>[Feature](#DeltaJs#Feature)</code>
        * [.applicationCondition](#DeltaJs#Delta#applicationCondition)
        * [.selected](#DeltaJs#Delta#selected) ⇒ <code>boolean</code>
        * [.do(...args)](#DeltaJs#Delta#do) ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>
        * [.composedWith(other, [options])](#DeltaJs#Delta#composedWith) ⇒ <code>[Delta](#DeltaJs#Delta)</code>
        * [.refines(other, [options])](#DeltaJs#Delta#refines) ⇒ <code>boolean</code>
        * [.equals(other, [options])](#DeltaJs#Delta#equals) ⇒ <code>boolean</code>
        * [.commutesWith(other, [options])](#DeltaJs#Delta#commutesWith) ⇒ <code>boolean</code>
        * [.resolves(conflictingDelta1, conflictingDelta2, [options])](#DeltaJs#Delta#resolves) ⇒ <code>boolean</code>
        * ___static___
        * [.Composed](#DeltaJs#Delta.Composed) ⇐ <code>[Delta](#DeltaJs#Delta)</code>
            * [.applicationCondition](#DeltaJs#Delta#applicationCondition) ⇒ <code>[Feature](#DeltaJs#Feature)</code>
            * [.selected](#DeltaJs#Delta#selected) ⇒ <code>boolean</code>
            * [.do(...args)](#DeltaJs#Delta#do) ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>
            * [.composedWith(other, [options])](#DeltaJs#Delta#composedWith) ⇒ <code>[Delta](#DeltaJs#Delta)</code>
            * [.refines(other, [options])](#DeltaJs#Delta#refines) ⇒ <code>boolean</code>
            * [.equals(other, [options])](#DeltaJs#Delta#equals) ⇒ <code>boolean</code>
            * [.commutesWith(other, [options])](#DeltaJs#Delta#commutesWith) ⇒ <code>boolean</code>
            * [.resolves(conflictingDelta1, conflictingDelta2, [options])](#DeltaJs#Delta#resolves) ⇒ <code>boolean</code>
        * [.DeltaModel](#DeltaJs#Delta.DeltaModel) ⇐ <code>[Delta](#DeltaJs#Delta)</code>
            * ___instance___
            * [.applicationCondition](#DeltaJs#Delta#applicationCondition) ⇒ <code>[Feature](#DeltaJs#Feature)</code>
            * [.selected](#DeltaJs#Delta#selected) ⇒ <code>boolean</code>
            * [.do(...args)](#DeltaJs#Delta#do) ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>
            * [.composedWith(other, [options])](#DeltaJs#Delta#composedWith) ⇒ <code>[Delta](#DeltaJs#Delta)</code>
            * [.refines(other, [options])](#DeltaJs#Delta#refines) ⇒ <code>boolean</code>
            * [.equals(other, [options])](#DeltaJs#Delta#equals) ⇒ <code>boolean</code>
            * [.commutesWith(other, [options])](#DeltaJs#Delta#commutesWith) ⇒ <code>boolean</code>
            * [.resolves(conflictingDelta1, conflictingDelta2, [options])](#DeltaJs#Delta#resolves) ⇒ <code>boolean</code>
            * ___static___
            * [.Proxy](#DeltaJs#Delta.DeltaModel.Proxy) ⇐ <code>DeltaJs#ContainerProxy</code>
        * [.Modify](#DeltaJs#Delta.Modify) ⇐ <code>[Delta](#DeltaJs#Delta)</code>
            * ___instance___
            * [.applicationCondition](#DeltaJs#Delta#applicationCondition) ⇒ <code>[Feature](#DeltaJs#Feature)</code>
            * [.selected](#DeltaJs#Delta#selected) ⇒ <code>boolean</code>
            * [.do(...args)](#DeltaJs#Delta#do) ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>
            * [.composedWith(other, [options])](#DeltaJs#Delta#composedWith) ⇒ <code>[Delta](#DeltaJs#Delta)</code>
            * [.refines(other, [options])](#DeltaJs#Delta#refines) ⇒ <code>boolean</code>
            * [.equals(other, [options])](#DeltaJs#Delta#equals) ⇒ <code>boolean</code>
            * [.commutesWith(other, [options])](#DeltaJs#Delta#commutesWith) ⇒ <code>boolean</code>
            * [.resolves(conflictingDelta1, conflictingDelta2, [options])](#DeltaJs#Delta#resolves) ⇒ <code>boolean</code>
            * ___static___
            * [.Proxy](#DeltaJs#Delta.Modify.Proxy) ⇐ <code>DeltaJs#ContainerProxy</code>
        * [.Overloaded](#DeltaJs#Delta.Overloaded) ⇐ <code>[Delta](#DeltaJs#Delta)</code>
            * [.applicationCondition](#DeltaJs#Delta#applicationCondition) ⇒ <code>[Feature](#DeltaJs#Feature)</code>
            * [.selected](#DeltaJs#Delta#selected) ⇒ <code>boolean</code>
            * [.do(...args)](#DeltaJs#Delta#do) ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>
            * [.composedWith(other, [options])](#DeltaJs#Delta#composedWith) ⇒ <code>[Delta](#DeltaJs#Delta)</code>
            * [.refines(other, [options])](#DeltaJs#Delta#refines) ⇒ <code>boolean</code>
            * [.equals(other, [options])](#DeltaJs#Delta#equals) ⇒ <code>boolean</code>
            * [.commutesWith(other, [options])](#DeltaJs#Delta#commutesWith) ⇒ <code>boolean</code>
            * [.resolves(conflictingDelta1, conflictingDelta2, [options])](#DeltaJs#Delta#resolves) ⇒ <code>boolean</code>
        * [.PutIntoArray](#DeltaJs#Delta.PutIntoArray) ⇐ <code>[Delta](#DeltaJs#Delta)</code>
            * [.applicationCondition](#DeltaJs#Delta#applicationCondition) ⇒ <code>[Feature](#DeltaJs#Feature)</code>
            * [.selected](#DeltaJs#Delta#selected) ⇒ <code>boolean</code>
            * [.do(...args)](#DeltaJs#Delta#do) ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>
            * [.composedWith(other, [options])](#DeltaJs#Delta#composedWith) ⇒ <code>[Delta](#DeltaJs#Delta)</code>
            * [.refines(other, [options])](#DeltaJs#Delta#refines) ⇒ <code>boolean</code>
            * [.equals(other, [options])](#DeltaJs#Delta#equals) ⇒ <code>boolean</code>
            * [.commutesWith(other, [options])](#DeltaJs#Delta#commutesWith) ⇒ <code>boolean</code>
            * [.resolves(conflictingDelta1, conflictingDelta2, [options])](#DeltaJs#Delta#resolves) ⇒ <code>boolean</code>
        * [.PutIntoFunction](#DeltaJs#Delta.PutIntoFunction) ⇐ <code>[Delta](#DeltaJs#Delta)</code>
            * [.applicationCondition](#DeltaJs#Delta#applicationCondition) ⇒ <code>[Feature](#DeltaJs#Feature)</code>
            * [.selected](#DeltaJs#Delta#selected) ⇒ <code>boolean</code>
            * [.do(...args)](#DeltaJs#Delta#do) ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>
            * [.composedWith(other, [options])](#DeltaJs#Delta#composedWith) ⇒ <code>[Delta](#DeltaJs#Delta)</code>
            * [.refines(other, [options])](#DeltaJs#Delta#refines) ⇒ <code>boolean</code>
            * [.equals(other, [options])](#DeltaJs#Delta#equals) ⇒ <code>boolean</code>
            * [.commutesWith(other, [options])](#DeltaJs#Delta#commutesWith) ⇒ <code>boolean</code>
            * [.resolves(conflictingDelta1, conflictingDelta2, [options])](#DeltaJs#Delta#resolves) ⇒ <code>boolean</code>
        * [.NoOp](#DeltaJs#Delta.NoOp) ⇐ <code>[Delta](#DeltaJs#Delta)</code>
            * [.applicationCondition](#DeltaJs#Delta#applicationCondition) ⇒ <code>[Feature](#DeltaJs#Feature)</code>
            * [.selected](#DeltaJs#Delta#selected) ⇒ <code>boolean</code>
            * [.do(...args)](#DeltaJs#Delta#do) ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>
            * [.composedWith(other, [options])](#DeltaJs#Delta#composedWith) ⇒ <code>[Delta](#DeltaJs#Delta)</code>
            * [.refines(other, [options])](#DeltaJs#Delta#refines) ⇒ <code>boolean</code>
            * [.equals(other, [options])](#DeltaJs#Delta#equals) ⇒ <code>boolean</code>
            * [.commutesWith(other, [options])](#DeltaJs#Delta#commutesWith) ⇒ <code>boolean</code>
            * [.resolves(conflictingDelta1, conflictingDelta2, [options])](#DeltaJs#Delta#resolves) ⇒ <code>boolean</code>
        * [.Add](#DeltaJs#Delta.Add) ⇐ <code>[Delta](#DeltaJs#Delta)</code>
            * [.applicationCondition](#DeltaJs#Delta#applicationCondition) ⇒ <code>[Feature](#DeltaJs#Feature)</code>
            * [.selected](#DeltaJs#Delta#selected) ⇒ <code>boolean</code>
            * [.do(...args)](#DeltaJs#Delta#do) ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>
            * [.composedWith(other, [options])](#DeltaJs#Delta#composedWith) ⇒ <code>[Delta](#DeltaJs#Delta)</code>
            * [.refines(other, [options])](#DeltaJs#Delta#refines) ⇒ <code>boolean</code>
            * [.equals(other, [options])](#DeltaJs#Delta#equals) ⇒ <code>boolean</code>
            * [.commutesWith(other, [options])](#DeltaJs#Delta#commutesWith) ⇒ <code>boolean</code>
            * [.resolves(conflictingDelta1, conflictingDelta2, [options])](#DeltaJs#Delta#resolves) ⇒ <code>boolean</code>
        * [.Remove](#DeltaJs#Delta.Remove) ⇐ <code>[Delta](#DeltaJs#Delta)</code>
            * [.applicationCondition](#DeltaJs#Delta#applicationCondition) ⇒ <code>[Feature](#DeltaJs#Feature)</code>
            * [.selected](#DeltaJs#Delta#selected) ⇒ <code>boolean</code>
            * [.do(...args)](#DeltaJs#Delta#do) ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>
            * [.composedWith(other, [options])](#DeltaJs#Delta#composedWith) ⇒ <code>[Delta](#DeltaJs#Delta)</code>
            * [.refines(other, [options])](#DeltaJs#Delta#refines) ⇒ <code>boolean</code>
            * [.equals(other, [options])](#DeltaJs#Delta#equals) ⇒ <code>boolean</code>
            * [.commutesWith(other, [options])](#DeltaJs#Delta#commutesWith) ⇒ <code>boolean</code>
            * [.resolves(conflictingDelta1, conflictingDelta2, [options])](#DeltaJs#Delta#resolves) ⇒ <code>boolean</code>
        * [.Forbid](#DeltaJs#Delta.Forbid) ⇐ <code>[Delta](#DeltaJs#Delta)</code>
            * [.applicationCondition](#DeltaJs#Delta#applicationCondition) ⇒ <code>[Feature](#DeltaJs#Feature)</code>
            * [.selected](#DeltaJs#Delta#selected) ⇒ <code>boolean</code>
            * [.do(...args)](#DeltaJs#Delta#do) ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>
            * [.composedWith(other, [options])](#DeltaJs#Delta#composedWith) ⇒ <code>[Delta](#DeltaJs#Delta)</code>
            * [.refines(other, [options])](#DeltaJs#Delta#refines) ⇒ <code>boolean</code>
            * [.equals(other, [options])](#DeltaJs#Delta#equals) ⇒ <code>boolean</code>
            * [.commutesWith(other, [options])](#DeltaJs#Delta#commutesWith) ⇒ <code>boolean</code>
            * [.resolves(conflictingDelta1, conflictingDelta2, [options])](#DeltaJs#Delta#resolves) ⇒ <code>boolean</code>
        * [.Replace](#DeltaJs#Delta.Replace) ⇐ <code>[Delta](#DeltaJs#Delta)</code>
            * [.applicationCondition](#DeltaJs#Delta#applicationCondition) ⇒ <code>[Feature](#DeltaJs#Feature)</code>
            * [.selected](#DeltaJs#Delta#selected) ⇒ <code>boolean</code>
            * [.do(...args)](#DeltaJs#Delta#do) ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>
            * [.composedWith(other, [options])](#DeltaJs#Delta#composedWith) ⇒ <code>[Delta](#DeltaJs#Delta)</code>
            * [.refines(other, [options])](#DeltaJs#Delta#refines) ⇒ <code>boolean</code>
            * [.equals(other, [options])](#DeltaJs#Delta#equals) ⇒ <code>boolean</code>
            * [.commutesWith(other, [options])](#DeltaJs#Delta#commutesWith) ⇒ <code>boolean</code>
            * [.resolves(conflictingDelta1, conflictingDelta2, [options])](#DeltaJs#Delta#resolves) ⇒ <code>boolean</code>
        * [.Update](#DeltaJs#Delta.Update) ⇐ <code>[Delta](#DeltaJs#Delta)</code>
            * [.applicationCondition](#DeltaJs#Delta#applicationCondition) ⇒ <code>[Feature](#DeltaJs#Feature)</code>
            * [.selected](#DeltaJs#Delta#selected) ⇒ <code>boolean</code>
            * [.do(...args)](#DeltaJs#Delta#do) ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>
            * [.composedWith(other, [options])](#DeltaJs#Delta#composedWith) ⇒ <code>[Delta](#DeltaJs#Delta)</code>
            * [.refines(other, [options])](#DeltaJs#Delta#refines) ⇒ <code>boolean</code>
            * [.equals(other, [options])](#DeltaJs#Delta#equals) ⇒ <code>boolean</code>
            * [.commutesWith(other, [options])](#DeltaJs#Delta#commutesWith) ⇒ <code>boolean</code>
            * [.resolves(conflictingDelta1, conflictingDelta2, [options])](#DeltaJs#Delta#resolves) ⇒ <code>boolean</code>
        * [.composed(...deltas, [options])](#DeltaJs#Delta.composed) ⇒ <code>[Delta](#DeltaJs#Delta)</code>
        * [.refines(delta1, delta2, [options])](#DeltaJs#Delta.refines) ⇒ <code>boolean</code>
        * [.equal(delta1, delta2, [options])](#DeltaJs#Delta.equal) ⇒ <code>boolean</code>
        * [.commute(delta1, delta2, [options])](#DeltaJs#Delta.commute) ⇒ <code>boolean</code>
        * [.resolves(conflictResolvingDelta, conflictingDelta1, conflictingDelta2, [options])](#DeltaJs#Delta.resolves) ⇒ <code>boolean</code>
    * [.Proxy](#DeltaJs#Proxy)
    * [.Feature](#DeltaJs#Feature)
        * [.addOption(optionName, value)](#DeltaJs#Feature#addOption)
    * [.newProxyMethod(method, handler)](#DeltaJs#newProxyMethod)
    * [.select(...features)](#DeltaJs#select)
    * [.newFeature(name, options)](#DeltaJs#newFeature) ⇒ <code>[Feature](#DeltaJs#Feature)</code>
    * [.newOperationType(name, DeltaSubclass, ProxySubclass)](#DeltaJs#newOperationType)
    * [.vp(name, val)](#DeltaJs#vp) ⇒ <code>\*</code>
    * [.do()](#DeltaJs#do) ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>
    * ___static___
    * [.ApplicationError](#DeltaJs.ApplicationError) ⇐ <code>Error</code>
    * [.PreconditionFailure](#DeltaJs.PreconditionFailure) ⇐ <code>[ApplicationError](#DeltaJs.ApplicationError)</code>
    * [.MultipleOverloadsApplicationError](#DeltaJs.MultipleOverloadsApplicationError) ⇐ <code>[PreconditionFailure](#DeltaJs.PreconditionFailure)</code>
    * [.NoOverloadsApplicationError](#DeltaJs.NoOverloadsApplicationError) ⇐ <code>[PreconditionFailure](#DeltaJs.PreconditionFailure)</code>
    * [.UnresolvedDeltaConflict](#DeltaJs.UnresolvedDeltaConflict) ⇐ <code>[ApplicationError](#DeltaJs.ApplicationError)</code>
    * [.CompositionError](#DeltaJs.CompositionError) ⇐ <code>Error</code>
    * [.MultipleOverloadsCompositionError](#DeltaJs.MultipleOverloadsCompositionError) ⇐ <code>[CompositionError](#DeltaJs.CompositionError)</code>
    * [.ConstraintFailure](#DeltaJs.ConstraintFailure) ⇐ <code>Error</code>
    * [.ApplicationOrderCycle](#DeltaJs.ApplicationOrderCycle) ⇐ <code>Error</code>
    * [.MultipleActiveProxiesError](#DeltaJs.MultipleActiveProxiesError) ⇐ <code>Error</code>
    * [.Path](#DeltaJs.Path)
    * [.ReadableTarget](#DeltaJs.ReadableTarget)
    * [.WritableTarget](#DeltaJs.WritableTarget) ⇐ <code>[ReadableTarget](#DeltaJs.ReadableTarget)</code>


-----

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

<a name="DeltaJs#ContainerProxyProxy"></a>
#### *deltaJs*.ContainerProxyProxy ⇐ <code>[Proxy](#DeltaJs#Proxy)</code>
**Extends:** <code>[Proxy](#DeltaJs#Proxy)</code>  

-----

<a name="DeltaJs#Delta"></a>
#### *deltaJs*.Delta

-----

<a name="DeltaJs#Delta#applicationCondition"></a>
##### *delta*.applicationCondition ⇒ <code>[Feature](#DeltaJs#Feature)</code>
**Returns**: <code>[Feature](#DeltaJs#Feature)</code> - -  

-----

<a name="DeltaJs#Delta#applicationCondition"></a>
##### *delta*.applicationCondition

| Param | Type | Description |
| --- | --- | --- |
| ac | <code>[Feature](#DeltaJs#Feature)</code> | - |


-----

<a name="DeltaJs#Delta#selected"></a>
##### *delta*.selected ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#do"></a>
##### *delta*.do(...args) ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Array.&lt;\*&gt;</code> | - |

**Returns**: <code>[Proxy](#DeltaJs#Proxy)</code> - -  

-----

<a name="DeltaJs#Delta#composedWith"></a>
##### *delta*.composedWith(other, [options]) ⇒ <code>[Delta](#DeltaJs#Delta)</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>[Delta](#DeltaJs#Delta)</code> - - the result of composing this delta with the `other` delta  

-----

<a name="DeltaJs#Delta#refines"></a>
##### *delta*.refines(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#equals"></a>
##### *delta*.equals(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#commutesWith"></a>
##### *delta*.commutesWith(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#resolves"></a>
##### *delta*.resolves(conflictingDelta1, conflictingDelta2, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| conflictingDelta1 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| conflictingDelta2 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta.Composed"></a>
##### *Delta*.Composed ⇐ <code>[Delta](#DeltaJs#Delta)</code>
**Extends:** <code>[Delta](#DeltaJs#Delta)</code>  

-----

<a name="DeltaJs#Delta#applicationCondition"></a>
###### *composed*.applicationCondition ⇒ <code>[Feature](#DeltaJs#Feature)</code>
**Overrides:** <code>[applicationCondition](#DeltaJs#Delta#applicationCondition)</code>  
**Returns**: <code>[Feature](#DeltaJs#Feature)</code> - -  

-----

<a name="DeltaJs#Delta#selected"></a>
###### *composed*.selected ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#do"></a>
###### *composed*.do(...args) ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Array.&lt;\*&gt;</code> | - |

**Returns**: <code>[Proxy](#DeltaJs#Proxy)</code> - -  

-----

<a name="DeltaJs#Delta#composedWith"></a>
###### *composed*.composedWith(other, [options]) ⇒ <code>[Delta](#DeltaJs#Delta)</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>[Delta](#DeltaJs#Delta)</code> - - the result of composing this delta with the `other` delta  

-----

<a name="DeltaJs#Delta#refines"></a>
###### *composed*.refines(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#equals"></a>
###### *composed*.equals(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#commutesWith"></a>
###### *composed*.commutesWith(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#resolves"></a>
###### *composed*.resolves(conflictingDelta1, conflictingDelta2, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| conflictingDelta1 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| conflictingDelta2 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta.DeltaModel"></a>
##### *Delta*.DeltaModel ⇐ <code>[Delta](#DeltaJs#Delta)</code>
**Extends:** <code>[Delta](#DeltaJs#Delta)</code>  

-----

<a name="DeltaJs#Delta#applicationCondition"></a>
###### *deltaModel*.applicationCondition ⇒ <code>[Feature](#DeltaJs#Feature)</code>
**Overrides:** <code>[applicationCondition](#DeltaJs#Delta#applicationCondition)</code>  
**Returns**: <code>[Feature](#DeltaJs#Feature)</code> - -  

-----

<a name="DeltaJs#Delta#selected"></a>
###### *deltaModel*.selected ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#do"></a>
###### *deltaModel*.do(...args) ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Array.&lt;\*&gt;</code> | - |

**Returns**: <code>[Proxy](#DeltaJs#Proxy)</code> - -  

-----

<a name="DeltaJs#Delta#composedWith"></a>
###### *deltaModel*.composedWith(other, [options]) ⇒ <code>[Delta](#DeltaJs#Delta)</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>[Delta](#DeltaJs#Delta)</code> - - the result of composing this delta with the `other` delta  

-----

<a name="DeltaJs#Delta#refines"></a>
###### *deltaModel*.refines(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#equals"></a>
###### *deltaModel*.equals(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#commutesWith"></a>
###### *deltaModel*.commutesWith(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#resolves"></a>
###### *deltaModel*.resolves(conflictingDelta1, conflictingDelta2, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| conflictingDelta1 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| conflictingDelta2 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta.DeltaModel.Proxy"></a>
###### *DeltaModel*.Proxy ⇐ <code>DeltaJs#ContainerProxy</code>
**Extends:** <code>DeltaJs#ContainerProxy</code>  

-----

<a name="DeltaJs#Delta.Modify"></a>
##### *Delta*.Modify ⇐ <code>[Delta](#DeltaJs#Delta)</code>
**Extends:** <code>[Delta](#DeltaJs#Delta)</code>  

-----

<a name="DeltaJs#Delta#applicationCondition"></a>
###### *modify*.applicationCondition ⇒ <code>[Feature](#DeltaJs#Feature)</code>
**Overrides:** <code>[applicationCondition](#DeltaJs#Delta#applicationCondition)</code>  
**Returns**: <code>[Feature](#DeltaJs#Feature)</code> - -  

-----

<a name="DeltaJs#Delta#selected"></a>
###### *modify*.selected ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#do"></a>
###### *modify*.do(...args) ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Array.&lt;\*&gt;</code> | - |

**Returns**: <code>[Proxy](#DeltaJs#Proxy)</code> - -  

-----

<a name="DeltaJs#Delta#composedWith"></a>
###### *modify*.composedWith(other, [options]) ⇒ <code>[Delta](#DeltaJs#Delta)</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>[Delta](#DeltaJs#Delta)</code> - - the result of composing this delta with the `other` delta  

-----

<a name="DeltaJs#Delta#refines"></a>
###### *modify*.refines(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#equals"></a>
###### *modify*.equals(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#commutesWith"></a>
###### *modify*.commutesWith(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#resolves"></a>
###### *modify*.resolves(conflictingDelta1, conflictingDelta2, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| conflictingDelta1 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| conflictingDelta2 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta.Modify.Proxy"></a>
###### *Modify*.Proxy ⇐ <code>DeltaJs#ContainerProxy</code>
**Extends:** <code>DeltaJs#ContainerProxy</code>  

-----

<a name="DeltaJs#Delta.Overloaded"></a>
##### *Delta*.Overloaded ⇐ <code>[Delta](#DeltaJs#Delta)</code>
**Extends:** <code>[Delta](#DeltaJs#Delta)</code>  

-----

<a name="DeltaJs#Delta#applicationCondition"></a>
###### *overloaded*.applicationCondition ⇒ <code>[Feature](#DeltaJs#Feature)</code>
**Overrides:** <code>[applicationCondition](#DeltaJs#Delta#applicationCondition)</code>  
**Returns**: <code>[Feature](#DeltaJs#Feature)</code> - -  

-----

<a name="DeltaJs#Delta#selected"></a>
###### *overloaded*.selected ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#do"></a>
###### *overloaded*.do(...args) ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Array.&lt;\*&gt;</code> | - |

**Returns**: <code>[Proxy](#DeltaJs#Proxy)</code> - -  

-----

<a name="DeltaJs#Delta#composedWith"></a>
###### *overloaded*.composedWith(other, [options]) ⇒ <code>[Delta](#DeltaJs#Delta)</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>[Delta](#DeltaJs#Delta)</code> - - the result of composing this delta with the `other` delta  

-----

<a name="DeltaJs#Delta#refines"></a>
###### *overloaded*.refines(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#equals"></a>
###### *overloaded*.equals(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#commutesWith"></a>
###### *overloaded*.commutesWith(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#resolves"></a>
###### *overloaded*.resolves(conflictingDelta1, conflictingDelta2, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| conflictingDelta1 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| conflictingDelta2 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta.PutIntoArray"></a>
##### *Delta*.PutIntoArray ⇐ <code>[Delta](#DeltaJs#Delta)</code>
**Extends:** <code>[Delta](#DeltaJs#Delta)</code>  

-----

<a name="DeltaJs#Delta#applicationCondition"></a>
###### *putIntoArray*.applicationCondition ⇒ <code>[Feature](#DeltaJs#Feature)</code>
**Overrides:** <code>[applicationCondition](#DeltaJs#Delta#applicationCondition)</code>  
**Returns**: <code>[Feature](#DeltaJs#Feature)</code> - -  

-----

<a name="DeltaJs#Delta#selected"></a>
###### *putIntoArray*.selected ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#do"></a>
###### *putIntoArray*.do(...args) ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Array.&lt;\*&gt;</code> | - |

**Returns**: <code>[Proxy](#DeltaJs#Proxy)</code> - -  

-----

<a name="DeltaJs#Delta#composedWith"></a>
###### *putIntoArray*.composedWith(other, [options]) ⇒ <code>[Delta](#DeltaJs#Delta)</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>[Delta](#DeltaJs#Delta)</code> - - the result of composing this delta with the `other` delta  

-----

<a name="DeltaJs#Delta#refines"></a>
###### *putIntoArray*.refines(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#equals"></a>
###### *putIntoArray*.equals(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#commutesWith"></a>
###### *putIntoArray*.commutesWith(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#resolves"></a>
###### *putIntoArray*.resolves(conflictingDelta1, conflictingDelta2, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| conflictingDelta1 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| conflictingDelta2 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta.PutIntoFunction"></a>
##### *Delta*.PutIntoFunction ⇐ <code>[Delta](#DeltaJs#Delta)</code>
**Extends:** <code>[Delta](#DeltaJs#Delta)</code>  

-----

<a name="DeltaJs#Delta#applicationCondition"></a>
###### *putIntoFunction*.applicationCondition ⇒ <code>[Feature](#DeltaJs#Feature)</code>
**Overrides:** <code>[applicationCondition](#DeltaJs#Delta#applicationCondition)</code>  
**Returns**: <code>[Feature](#DeltaJs#Feature)</code> - -  

-----

<a name="DeltaJs#Delta#selected"></a>
###### *putIntoFunction*.selected ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#do"></a>
###### *putIntoFunction*.do(...args) ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Array.&lt;\*&gt;</code> | - |

**Returns**: <code>[Proxy](#DeltaJs#Proxy)</code> - -  

-----

<a name="DeltaJs#Delta#composedWith"></a>
###### *putIntoFunction*.composedWith(other, [options]) ⇒ <code>[Delta](#DeltaJs#Delta)</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>[Delta](#DeltaJs#Delta)</code> - - the result of composing this delta with the `other` delta  

-----

<a name="DeltaJs#Delta#refines"></a>
###### *putIntoFunction*.refines(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#equals"></a>
###### *putIntoFunction*.equals(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#commutesWith"></a>
###### *putIntoFunction*.commutesWith(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#resolves"></a>
###### *putIntoFunction*.resolves(conflictingDelta1, conflictingDelta2, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| conflictingDelta1 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| conflictingDelta2 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta.NoOp"></a>
##### *Delta*.NoOp ⇐ <code>[Delta](#DeltaJs#Delta)</code>
an operation type that changes nothing

**Extends:** <code>[Delta](#DeltaJs#Delta)</code>  

-----

<a name="DeltaJs#Delta#applicationCondition"></a>
###### *noOp*.applicationCondition ⇒ <code>[Feature](#DeltaJs#Feature)</code>
**Overrides:** <code>[applicationCondition](#DeltaJs#Delta#applicationCondition)</code>  
**Returns**: <code>[Feature](#DeltaJs#Feature)</code> - -  

-----

<a name="DeltaJs#Delta#selected"></a>
###### *noOp*.selected ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#do"></a>
###### *noOp*.do(...args) ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Array.&lt;\*&gt;</code> | - |

**Returns**: <code>[Proxy](#DeltaJs#Proxy)</code> - -  

-----

<a name="DeltaJs#Delta#composedWith"></a>
###### *noOp*.composedWith(other, [options]) ⇒ <code>[Delta](#DeltaJs#Delta)</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>[Delta](#DeltaJs#Delta)</code> - - the result of composing this delta with the `other` delta  

-----

<a name="DeltaJs#Delta#refines"></a>
###### *noOp*.refines(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#equals"></a>
###### *noOp*.equals(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#commutesWith"></a>
###### *noOp*.commutesWith(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#resolves"></a>
###### *noOp*.resolves(conflictingDelta1, conflictingDelta2, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| conflictingDelta1 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| conflictingDelta2 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta.Add"></a>
##### *Delta*.Add ⇐ <code>[Delta](#DeltaJs#Delta)</code>
an operation type for adding a new value

**Extends:** <code>[Delta](#DeltaJs#Delta)</code>  

-----

<a name="DeltaJs#Delta#applicationCondition"></a>
###### *add*.applicationCondition ⇒ <code>[Feature](#DeltaJs#Feature)</code>
**Overrides:** <code>[applicationCondition](#DeltaJs#Delta#applicationCondition)</code>  
**Returns**: <code>[Feature](#DeltaJs#Feature)</code> - -  

-----

<a name="DeltaJs#Delta#selected"></a>
###### *add*.selected ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#do"></a>
###### *add*.do(...args) ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Array.&lt;\*&gt;</code> | - |

**Returns**: <code>[Proxy](#DeltaJs#Proxy)</code> - -  

-----

<a name="DeltaJs#Delta#composedWith"></a>
###### *add*.composedWith(other, [options]) ⇒ <code>[Delta](#DeltaJs#Delta)</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>[Delta](#DeltaJs#Delta)</code> - - the result of composing this delta with the `other` delta  

-----

<a name="DeltaJs#Delta#refines"></a>
###### *add*.refines(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#equals"></a>
###### *add*.equals(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#commutesWith"></a>
###### *add*.commutesWith(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#resolves"></a>
###### *add*.resolves(conflictingDelta1, conflictingDelta2, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| conflictingDelta1 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| conflictingDelta2 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta.Remove"></a>
##### *Delta*.Remove ⇐ <code>[Delta](#DeltaJs#Delta)</code>
an operation type for removing an existing value, i.e., making it `undefined`

**Extends:** <code>[Delta](#DeltaJs#Delta)</code>  

-----

<a name="DeltaJs#Delta#applicationCondition"></a>
###### *remove*.applicationCondition ⇒ <code>[Feature](#DeltaJs#Feature)</code>
**Overrides:** <code>[applicationCondition](#DeltaJs#Delta#applicationCondition)</code>  
**Returns**: <code>[Feature](#DeltaJs#Feature)</code> - -  

-----

<a name="DeltaJs#Delta#selected"></a>
###### *remove*.selected ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#do"></a>
###### *remove*.do(...args) ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Array.&lt;\*&gt;</code> | - |

**Returns**: <code>[Proxy](#DeltaJs#Proxy)</code> - -  

-----

<a name="DeltaJs#Delta#composedWith"></a>
###### *remove*.composedWith(other, [options]) ⇒ <code>[Delta](#DeltaJs#Delta)</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>[Delta](#DeltaJs#Delta)</code> - - the result of composing this delta with the `other` delta  

-----

<a name="DeltaJs#Delta#refines"></a>
###### *remove*.refines(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#equals"></a>
###### *remove*.equals(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#commutesWith"></a>
###### *remove*.commutesWith(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#resolves"></a>
###### *remove*.resolves(conflictingDelta1, conflictingDelta2, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| conflictingDelta1 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| conflictingDelta2 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta.Forbid"></a>
##### *Delta*.Forbid ⇐ <code>[Delta](#DeltaJs#Delta)</code>
an operation type that merely forbids a value from existing, i.e., asserts that it is `undefined`

**Extends:** <code>[Delta](#DeltaJs#Delta)</code>  

-----

<a name="DeltaJs#Delta#applicationCondition"></a>
###### *forbid*.applicationCondition ⇒ <code>[Feature](#DeltaJs#Feature)</code>
**Overrides:** <code>[applicationCondition](#DeltaJs#Delta#applicationCondition)</code>  
**Returns**: <code>[Feature](#DeltaJs#Feature)</code> - -  

-----

<a name="DeltaJs#Delta#selected"></a>
###### *forbid*.selected ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#do"></a>
###### *forbid*.do(...args) ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Array.&lt;\*&gt;</code> | - |

**Returns**: <code>[Proxy](#DeltaJs#Proxy)</code> - -  

-----

<a name="DeltaJs#Delta#composedWith"></a>
###### *forbid*.composedWith(other, [options]) ⇒ <code>[Delta](#DeltaJs#Delta)</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>[Delta](#DeltaJs#Delta)</code> - - the result of composing this delta with the `other` delta  

-----

<a name="DeltaJs#Delta#refines"></a>
###### *forbid*.refines(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#equals"></a>
###### *forbid*.equals(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#commutesWith"></a>
###### *forbid*.commutesWith(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#resolves"></a>
###### *forbid*.resolves(conflictingDelta1, conflictingDelta2, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| conflictingDelta1 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| conflictingDelta2 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta.Replace"></a>
##### *Delta*.Replace ⇐ <code>[Delta](#DeltaJs#Delta)</code>
an operation type for replacing a value with another

**Extends:** <code>[Delta](#DeltaJs#Delta)</code>  

-----

<a name="DeltaJs#Delta#applicationCondition"></a>
###### *replace*.applicationCondition ⇒ <code>[Feature](#DeltaJs#Feature)</code>
**Overrides:** <code>[applicationCondition](#DeltaJs#Delta#applicationCondition)</code>  
**Returns**: <code>[Feature](#DeltaJs#Feature)</code> - -  

-----

<a name="DeltaJs#Delta#selected"></a>
###### *replace*.selected ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#do"></a>
###### *replace*.do(...args) ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Array.&lt;\*&gt;</code> | - |

**Returns**: <code>[Proxy](#DeltaJs#Proxy)</code> - -  

-----

<a name="DeltaJs#Delta#composedWith"></a>
###### *replace*.composedWith(other, [options]) ⇒ <code>[Delta](#DeltaJs#Delta)</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>[Delta](#DeltaJs#Delta)</code> - - the result of composing this delta with the `other` delta  

-----

<a name="DeltaJs#Delta#refines"></a>
###### *replace*.refines(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#equals"></a>
###### *replace*.equals(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#commutesWith"></a>
###### *replace*.commutesWith(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#resolves"></a>
###### *replace*.resolves(conflictingDelta1, conflictingDelta2, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| conflictingDelta1 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| conflictingDelta2 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta.Update"></a>
##### *Delta*.Update ⇐ <code>[Delta](#DeltaJs#Delta)</code>
an operation type for arbitrarily transforming a value using a transformation function

**Extends:** <code>[Delta](#DeltaJs#Delta)</code>  

-----

<a name="DeltaJs#Delta#applicationCondition"></a>
###### *update*.applicationCondition ⇒ <code>[Feature](#DeltaJs#Feature)</code>
**Overrides:** <code>[applicationCondition](#DeltaJs#Delta#applicationCondition)</code>  
**Returns**: <code>[Feature](#DeltaJs#Feature)</code> - -  

-----

<a name="DeltaJs#Delta#selected"></a>
###### *update*.selected ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#do"></a>
###### *update*.do(...args) ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Array.&lt;\*&gt;</code> | - |

**Returns**: <code>[Proxy](#DeltaJs#Proxy)</code> - -  

-----

<a name="DeltaJs#Delta#composedWith"></a>
###### *update*.composedWith(other, [options]) ⇒ <code>[Delta](#DeltaJs#Delta)</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>[Delta](#DeltaJs#Delta)</code> - - the result of composing this delta with the `other` delta  

-----

<a name="DeltaJs#Delta#refines"></a>
###### *update*.refines(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#equals"></a>
###### *update*.equals(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#commutesWith"></a>
###### *update*.commutesWith(other, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta#resolves"></a>
###### *update*.resolves(conflictingDelta1, conflictingDelta2, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| conflictingDelta1 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| conflictingDelta2 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta.composed"></a>
##### *Delta*.composed(...deltas, [options]) ⇒ <code>[Delta](#DeltaJs#Delta)</code>

| Param | Type | Description |
| --- | --- | --- |
| ...deltas | <code>[Array.&lt;Delta&gt;](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>[Delta](#DeltaJs#Delta)</code> - - the result of composing this delta with the `other` delta  

-----

<a name="DeltaJs#Delta.refines"></a>
##### *Delta*.refines(delta1, delta2, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| delta1 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| delta2 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta.equal"></a>
##### *Delta*.equal(delta1, delta2, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| delta1 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| delta2 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta.commute"></a>
##### *Delta*.commute(delta1, delta2, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| delta1 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| delta2 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Delta.resolves"></a>
##### *Delta*.resolves(conflictResolvingDelta, conflictingDelta1, conflictingDelta2, [options]) ⇒ <code>boolean</code>

| Param | Type | Description |
| --- | --- | --- |
| conflictResolvingDelta | <code>[Delta](#DeltaJs#Delta)</code> | - |
| conflictingDelta1 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| conflictingDelta2 | <code>[Delta](#DeltaJs#Delta)</code> | - |
| [options] | <code>object</code> | - |

**Returns**: <code>boolean</code> - -  

-----

<a name="DeltaJs#Proxy"></a>
#### *deltaJs*.Proxy

-----

<a name="DeltaJs#Feature"></a>
#### *deltaJs*.Feature

-----

<a name="DeltaJs#Feature#addOption"></a>
##### *feature*.addOption(optionName, value)

| Param | Type | Description |
| --- | --- | --- |
| optionName | <code>string</code> | - |
| value |  | - |


-----

<a name="DeltaJs#newProxyMethod"></a>
#### *deltaJs*.newProxyMethod(method, handler)

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | method name |
| handler | <code>function</code> | a function that takes method arguments, and returns a new `DeltaJs#Delta` instance |


-----

<a name="DeltaJs#select"></a>
#### *deltaJs*.select(...features)

| Param | Type | Description |
| --- | --- | --- |
| ...features | <code>Array.&lt;string&gt;</code> | - |


-----

<a name="DeltaJs#newFeature"></a>
#### *deltaJs*.newFeature(name, options) ⇒ <code>[Feature](#DeltaJs#Feature)</code>

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | the name of the new feature |
| options | <code>object</code> | the (optional) options for the new feature |

**Returns**: <code>[Feature](#DeltaJs#Feature)</code> - - the object representing the new feature  

-----

<a name="DeltaJs#newOperationType"></a>
#### *deltaJs*.newOperationType(name, DeltaSubclass, ProxySubclass)
This method allows you to tell delta.js about a new kind of delta operation.
This was also done for existing operations like `modify`, `add`, `remove`, and so on.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name of the new operation type |
| DeltaSubclass | <code>function</code> | the new operation class |
| ProxySubclass | <code>function</code> | the optional custom `Proxy` subclass for this operation-type |


-----

<a name="DeltaJs#vp"></a>
#### *deltaJs*.vp(name, val) ⇒ <code>\*</code>
This method indicates a variation point.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | a hook by which operations from the core delta model can be applied |
| val | <code>\*</code> | the initial value of this variation point |

**Returns**: <code>\*</code> - - the value of this variation point after applying the appropriate deltas  

-----

<a name="DeltaJs#do"></a>
#### *deltaJs*.do() ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>
A {DeltaJs} instance has one fundamental {DeltaJs#DeltaModel} instance, which is applied
to any variation points that are encountered. This method is an alias to the eponymous
method on that 'root' delta model. It returns the proxy that allows new delta operations
to be added more easily. It presets the 'feature' option to 'true', but this can be
overwritten manually.

**Returns**: <code>[Proxy](#DeltaJs#Proxy)</code> - - the proxy to this delta, for easily adding operations  

-----

<a name="DeltaJs.ApplicationError"></a>
#### *DeltaJs*.ApplicationError ⇐ <code>Error</code>
**Extends:** <code>Error</code>  

-----

<a name="DeltaJs.PreconditionFailure"></a>
#### *DeltaJs*.PreconditionFailure ⇐ <code>[ApplicationError](#DeltaJs.ApplicationError)</code>
**Extends:** <code>[ApplicationError](#DeltaJs.ApplicationError)</code>  

-----

<a name="DeltaJs.MultipleOverloadsApplicationError"></a>
#### *DeltaJs*.MultipleOverloadsApplicationError ⇐ <code>[PreconditionFailure](#DeltaJs.PreconditionFailure)</code>
**Extends:** <code>[PreconditionFailure](#DeltaJs.PreconditionFailure)</code>  

-----

<a name="DeltaJs.NoOverloadsApplicationError"></a>
#### *DeltaJs*.NoOverloadsApplicationError ⇐ <code>[PreconditionFailure](#DeltaJs.PreconditionFailure)</code>
**Extends:** <code>[PreconditionFailure](#DeltaJs.PreconditionFailure)</code>  

-----

<a name="DeltaJs.UnresolvedDeltaConflict"></a>
#### *DeltaJs*.UnresolvedDeltaConflict ⇐ <code>[ApplicationError](#DeltaJs.ApplicationError)</code>
**Extends:** <code>[ApplicationError](#DeltaJs.ApplicationError)</code>  

-----

<a name="DeltaJs.CompositionError"></a>
#### *DeltaJs*.CompositionError ⇐ <code>Error</code>
**Extends:** <code>Error</code>  

-----

<a name="DeltaJs.MultipleOverloadsCompositionError"></a>
#### *DeltaJs*.MultipleOverloadsCompositionError ⇐ <code>[CompositionError](#DeltaJs.CompositionError)</code>
**Extends:** <code>[CompositionError](#DeltaJs.CompositionError)</code>  

-----

<a name="DeltaJs.ConstraintFailure"></a>
#### *DeltaJs*.ConstraintFailure ⇐ <code>Error</code>
**Extends:** <code>Error</code>  

-----

<a name="DeltaJs.ApplicationOrderCycle"></a>
#### *DeltaJs*.ApplicationOrderCycle ⇐ <code>Error</code>
**Extends:** <code>Error</code>  

-----

<a name="DeltaJs.MultipleActiveProxiesError"></a>
#### *DeltaJs*.MultipleActiveProxiesError ⇐ <code>Error</code>
**Extends:** <code>Error</code>  

-----

<a name="DeltaJs.Path"></a>
#### *DeltaJs*.Path

-----

<a name="DeltaJs.ReadableTarget"></a>
#### *DeltaJs*.ReadableTarget

-----

<a name="DeltaJs.WritableTarget"></a>
#### *DeltaJs*.WritableTarget ⇐ <code>[ReadableTarget](#DeltaJs.ReadableTarget)</code>
**Extends:** <code>[ReadableTarget](#DeltaJs.ReadableTarget)</code>  

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
