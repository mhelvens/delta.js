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
    * <ins><b>instance classes </b></ins>
    * [.ContainerProxyProxy](#DeltaJs#ContainerProxyProxy) ⇐ <code>[Proxy](#DeltaJs#Proxy)</code>
    * [.Delta](#DeltaJs#Delta)
        * <ins><b>instance properties </b></ins>
        * [.applicationCondition](#DeltaJs#Delta#applicationCondition) : <code>[Feature](#DeltaJs#Feature)</code>
        * [.selected](#DeltaJs#Delta#selected) : <code>boolean</code>
        * <ins><b>instance methods </b></ins>
        * [.do(...args)](#DeltaJs#Delta#do) ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>
        * [.composedWith(other, [options])](#DeltaJs#Delta#composedWith) ⇒ <code>[Delta](#DeltaJs#Delta)</code>
        * [.refines(other, [options])](#DeltaJs#Delta#refines) ⇒ <code>boolean</code>
        * [.equals(other, [options])](#DeltaJs#Delta#equals) ⇒ <code>boolean</code>
        * [.commutesWith(other, [options])](#DeltaJs#Delta#commutesWith) ⇒ <code>boolean</code>
        * [.resolves(cDelta1, cDelta2, [options])](#DeltaJs#Delta#resolves) ⇒ <code>boolean</code>
        * <ins><b>static classes </b></ins>
        * [.Composed](#DeltaJs#Delta.Composed) ⇐ <code>[Delta](#DeltaJs#Delta)</code>
        * [.DeltaModel](#DeltaJs#Delta.DeltaModel) ⇐ <code>[Delta](#DeltaJs#Delta)</code>
            * <ins><b>static classes </b></ins>
            * [.Proxy](#DeltaJs#Delta.DeltaModel.Proxy) ⇐ <code>DeltaJs#ContainerProxy</code>
        * [.Modify](#DeltaJs#Delta.Modify) ⇐ <code>[Delta](#DeltaJs#Delta)</code>
            * <ins><b>static classes </b></ins>
            * [.Proxy](#DeltaJs#Delta.Modify.Proxy) ⇐ <code>DeltaJs#ContainerProxy</code>
        * [.Overloaded](#DeltaJs#Delta.Overloaded) ⇐ <code>[Delta](#DeltaJs#Delta)</code>
        * [.PutIntoArray](#DeltaJs#Delta.PutIntoArray) ⇐ <code>[Delta](#DeltaJs#Delta)</code>
        * [.PutIntoFunction](#DeltaJs#Delta.PutIntoFunction) ⇐ <code>[Delta](#DeltaJs#Delta)</code>
        * [.NoOp](#DeltaJs#Delta.NoOp) ⇐ <code>[Delta](#DeltaJs#Delta)</code>
        * [.Add](#DeltaJs#Delta.Add) ⇐ <code>[Delta](#DeltaJs#Delta)</code>
        * [.Remove](#DeltaJs#Delta.Remove) ⇐ <code>[Delta](#DeltaJs#Delta)</code>
        * [.Forbid](#DeltaJs#Delta.Forbid) ⇐ <code>[Delta](#DeltaJs#Delta)</code>
        * [.Replace](#DeltaJs#Delta.Replace) ⇐ <code>[Delta](#DeltaJs#Delta)</code>
        * [.Update](#DeltaJs#Delta.Update) ⇐ <code>[Delta](#DeltaJs#Delta)</code>
        * <ins><b>static methods </b></ins>
        * [.composed(...deltas, [options])](#DeltaJs#Delta.composed) ⇒ <code>[Delta](#DeltaJs#Delta)</code>
        * [.refines(delta1, delta2, [options])](#DeltaJs#Delta.refines) ⇒ <code>boolean</code>
        * [.equal(delta1, delta2, [options])](#DeltaJs#Delta.equal) ⇒ <code>boolean</code>
        * [.commute(delta1, delta2, [options])](#DeltaJs#Delta.commute) ⇒ <code>boolean</code>
        * [.resolves(crDelta, cDelta1, cDelta2, [options])](#DeltaJs#Delta.resolves) ⇒ <code>boolean</code>
    * [.Proxy](#DeltaJs#Proxy)
    * [.Feature](#DeltaJs#Feature)
        * [.addOption(optionName, value)](#DeltaJs#Feature#addOption)
    * <ins><b>instance methods </b></ins>
    * [.newProxyMethod(method, handler)](#DeltaJs#newProxyMethod)
    * [.select(...features)](#DeltaJs#select)
    * [.newFeature(name, options)](#DeltaJs#newFeature) ⇒ <code>[Feature](#DeltaJs#Feature)</code>
    * [.newOperationType(name, DeltaSubclass, [ProxySubclass])](#DeltaJs#newOperationType)
    * [.vp(name, val)](#DeltaJs#vp) ⇒ <code>\*</code>
    * [.do()](#DeltaJs#do) ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>
    * <ins><b>static classes </b></ins>
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
##### *delta*.applicationCondition : <code>[Feature](#DeltaJs#Feature)</code>
**Properties**

| Name |
| --- |
| applicationCondition | 


-----

<a name="DeltaJs#Delta#selected"></a>
##### *delta*.selected : <code>boolean</code>
**Read only**: true  
**Properties**

| Name |
| --- |
| selected | 


-----

<a name="DeltaJs#Delta#do"></a>
##### *delta*.do(...args) ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>

| Param | Type |
| --- | --- |
| ...args | <code>Array.&lt;\*&gt;</code> | 


-----

<a name="DeltaJs#Delta#composedWith"></a>
##### *delta*.composedWith(other, [options]) ⇒ <code>[Delta](#DeltaJs#Delta)</code>
Generate the <i>composition</i> of `this` delta with the given `other` delta. Applying the resulting
delta to a value should have the same effect as sequentially applying first `this` delta, and then the
`other` delta.


| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | the other delta to compose this one with |
| [options] | <code>object</code> | any options for the composition process |

**Returns**: <code>[Delta](#DeltaJs#Delta)</code> - the result of composing this delta with the `other` delta  
**See**: [composed](#DeltaJs#Delta.composed)

-----

<a name="DeltaJs#Delta#refines"></a>
##### *delta*.refines(other, [options]) ⇒ <code>boolean</code>
Test whether `this` delta <i>refines</i> a given `other` delta. This is the case if `this` can always
be used instead of `other` to get a result within the specifications of `other`.

This is a useful concept only for deltas that have a 'non-deterministic' effect, like those
that insert values at an arbitrary position in an array.


| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | the delta that is possibly less refined |
| [options] | <code>object</code> | any options for the refinement test |

**Returns**: <code>boolean</code> - whether or not the refinement relation between the given deltas holds  
**See**: [refines](#DeltaJs#Delta.refines)

-----

<a name="DeltaJs#Delta#equals"></a>
##### *delta*.equals(other, [options]) ⇒ <code>boolean</code>
Test whether `this` delta is <i>equal</i> to a given `other` delta. This is the case if both deltas
would have the same effect when applied to any value.


| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | the delta to compare to |
| [options] | <code>object</code> | any options for the equality test |

**Returns**: <code>boolean</code> - whether both given deltas are equal  
**See**: [equal](#DeltaJs#Delta.equal)

-----

<a name="DeltaJs#Delta#commutesWith"></a>
##### *delta*.commutesWith(other, [options]) ⇒ <code>boolean</code>
Test whether `this` delta <i>commutes</i> with a given `other` delta. This is the case if the order
in which both deltas are applied to any value does not matter, i.e., that `this.composedWith(other)`
is equal to `other.composedWith(this)`.


| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Delta](#DeltaJs#Delta)</code> | the other delta with which this one possibly commutes |
| [options] | <code>object</code> | any options for the commutation test |

**Returns**: <code>boolean</code> - whether the given two deltas commute  
**See**: [commute](#DeltaJs#Delta.commute)

-----

<a name="DeltaJs#Delta#resolves"></a>
##### *delta*.resolves(cDelta1, cDelta2, [options]) ⇒ <code>boolean</code>
Test whether any conflict between given deltas `cDelta1` and `cDelta2` is <i>resolved</i> by
`this` delta. This is the case if the ostensibly non-commuting `cDelta1` and `cDelta2`
'become commuting' if subsequently composed with `this`.


| Param | Type | Description |
| --- | --- | --- |
| cDelta1 | <code>[Delta](#DeltaJs#Delta)</code> | the first delta of a possibly non-commuting pair |
| cDelta2 | <code>[Delta](#DeltaJs#Delta)</code> | the second delta of a possibly non-commuting pair |
| [options] | <code>object</code> | any options for the resolution test |

**Returns**: <code>boolean</code> - whether `this` delta resolves any conflict between `cDelta1` and `cDelta2`  
**See**: [resolves](#DeltaJs#Delta.resolves)

-----

<a name="DeltaJs#Delta.Composed"></a>
##### *Delta*.Composed ⇐ <code>[Delta](#DeltaJs#Delta)</code>
**Extends:** <code>[Delta](#DeltaJs#Delta)</code>  

-----

<a name="DeltaJs#Delta.DeltaModel"></a>
##### *Delta*.DeltaModel ⇐ <code>[Delta](#DeltaJs#Delta)</code>
**Extends:** <code>[Delta](#DeltaJs#Delta)</code>  

-----

<a name="DeltaJs#Delta.DeltaModel.Proxy"></a>
###### *DeltaModel*.Proxy ⇐ <code>DeltaJs#ContainerProxy</code>
**Extends:** <code>DeltaJs#ContainerProxy</code>  

-----

<a name="DeltaJs#Delta.Modify"></a>
##### *Delta*.Modify ⇐ <code>[Delta](#DeltaJs#Delta)</code>
**Extends:** <code>[Delta](#DeltaJs#Delta)</code>  

-----

<a name="DeltaJs#Delta.Modify.Proxy"></a>
###### *Modify*.Proxy ⇐ <code>DeltaJs#ContainerProxy</code>
**Extends:** <code>DeltaJs#ContainerProxy</code>  

-----

<a name="DeltaJs#Delta.Overloaded"></a>
##### *Delta*.Overloaded ⇐ <code>[Delta](#DeltaJs#Delta)</code>
**Extends:** <code>[Delta](#DeltaJs#Delta)</code>  

-----

<a name="DeltaJs#Delta.PutIntoArray"></a>
##### *Delta*.PutIntoArray ⇐ <code>[Delta](#DeltaJs#Delta)</code>
**Extends:** <code>[Delta](#DeltaJs#Delta)</code>  

-----

<a name="DeltaJs#Delta.PutIntoFunction"></a>
##### *Delta*.PutIntoFunction ⇐ <code>[Delta](#DeltaJs#Delta)</code>
**Extends:** <code>[Delta](#DeltaJs#Delta)</code>  

-----

<a name="DeltaJs#Delta.NoOp"></a>
##### *Delta*.NoOp ⇐ <code>[Delta](#DeltaJs#Delta)</code>
an operation type that changes nothing

**Extends:** <code>[Delta](#DeltaJs#Delta)</code>  

-----

<a name="DeltaJs#Delta.Add"></a>
##### *Delta*.Add ⇐ <code>[Delta](#DeltaJs#Delta)</code>
an operation type for adding a new value

**Extends:** <code>[Delta](#DeltaJs#Delta)</code>  

-----

<a name="DeltaJs#Delta.Remove"></a>
##### *Delta*.Remove ⇐ <code>[Delta](#DeltaJs#Delta)</code>
an operation type for removing an existing value, i.e., making it `undefined`

**Extends:** <code>[Delta](#DeltaJs#Delta)</code>  

-----

<a name="DeltaJs#Delta.Forbid"></a>
##### *Delta*.Forbid ⇐ <code>[Delta](#DeltaJs#Delta)</code>
an operation type that merely forbids a value from existing, i.e., asserts that it is `undefined`

**Extends:** <code>[Delta](#DeltaJs#Delta)</code>  

-----

<a name="DeltaJs#Delta.Replace"></a>
##### *Delta*.Replace ⇐ <code>[Delta](#DeltaJs#Delta)</code>
an operation type for replacing a value with another

**Extends:** <code>[Delta](#DeltaJs#Delta)</code>  

-----

<a name="DeltaJs#Delta.Update"></a>
##### *Delta*.Update ⇐ <code>[Delta](#DeltaJs#Delta)</code>
an operation type for arbitrarily transforming a value using a transformation function

**Extends:** <code>[Delta](#DeltaJs#Delta)</code>  

-----

<a name="DeltaJs#Delta.composed"></a>
##### *Delta*.composed(...deltas, [options]) ⇒ <code>[Delta](#DeltaJs#Delta)</code>
Take any number of `deltas` and generate their <i>composition</i>. Applying the resulting delta to
a value should have the same effect as sequentially applying the original deltas from left to right.
The composition of 0 deltas is a [DeltaJs.NoOp](DeltaJs.NoOp) delta. The composition of 1 delta is itself.
The composition of more than 1 delta depends on the operation type(s) of that delta.


| Param | Type | Description |
| --- | --- | --- |
| ...deltas | <code>[Delta](#DeltaJs#Delta)</code> | any number of deltas as separate arguments |
| [options] | <code>object</code> | any options for the composition process |

**Returns**: <code>[Delta](#DeltaJs#Delta)</code> - the result of composing all given deltas  
**See**: [composedWith](#DeltaJs#Delta#composedWith)

-----

<a name="DeltaJs#Delta.refines"></a>
##### *Delta*.refines(delta1, delta2, [options]) ⇒ <code>boolean</code>
Test whether a given `delta1` <i>refines</i> a given `delta2`. This is the case if `delta1` can always
be used instead of `delta2` to get a result within the specifications of `delta2`.

This is a useful concept only for deltas that have a 'non-deterministic' effect, like those
that insert values at an arbitrary position in an array.


| Param | Type | Description |
| --- | --- | --- |
| delta1 | <code>[Delta](#DeltaJs#Delta)</code> | the delta that is possibly more refined |
| delta2 | <code>[Delta](#DeltaJs#Delta)</code> | the delta that is possibly less refined |
| [options] | <code>object</code> | any options for the refinement test |

**Returns**: <code>boolean</code> - whether or not the refinement relation between the given deltas holds  
**See**: [refines](#DeltaJs#Delta#refines)

-----

<a name="DeltaJs#Delta.equal"></a>
##### *Delta*.equal(delta1, delta2, [options]) ⇒ <code>boolean</code>
Test whether a given `delta1` is <i>equal</i> to a given `delta2`. This is the case if both deltas
would have the same effect when applied to any value.


| Param | Type | Description |
| --- | --- | --- |
| delta1 | <code>[Delta](#DeltaJs#Delta)</code> | the first delta to compare |
| delta2 | <code>[Delta](#DeltaJs#Delta)</code> | the second delta to compare |
| [options] | <code>object</code> | any options for the equality test |

**Returns**: <code>boolean</code> - whether both given deltas are equal  
**See**: [equals](#DeltaJs#Delta#equals)

-----

<a name="DeltaJs#Delta.commute"></a>
##### *Delta*.commute(delta1, delta2, [options]) ⇒ <code>boolean</code>
Test whether a given `delta1` <i>commutes</i> with a given `delta2`. This is the case if the order
in which both deltas are applied to any value does not matter, i.e., that `delta1.composedWith(delta2)`
is equal to `delta2.composedWith(delta1)`.


| Param | Type | Description |
| --- | --- | --- |
| delta1 | <code>[Delta](#DeltaJs#Delta)</code> | the first delta in the possibly commuting pair |
| delta2 | <code>[Delta](#DeltaJs#Delta)</code> | the second delta in the possibly commuting pair |
| [options] | <code>object</code> | any options for the commutation test |

**Returns**: <code>boolean</code> - whether the given two deltas commute  
**See**: [commutesWith](#DeltaJs#Delta#commutesWith)

-----

<a name="DeltaJs#Delta.resolves"></a>
##### *Delta*.resolves(crDelta, cDelta1, cDelta2, [options]) ⇒ <code>boolean</code>
Test whether any conflict between given deltas `cDelta1` and `cDelta2` is <i>resolved</i> by
the given delta `crDelta`. This is the case if the ostensibly non-commuting `cDelta1` and `cDelta2`
'become commuting' if subsequently composed with `crDelta`.


| Param | Type | Description |
| --- | --- | --- |
| crDelta | <code>[Delta](#DeltaJs#Delta)</code> | a possibly conflict resolving delta |
| cDelta1 | <code>[Delta](#DeltaJs#Delta)</code> | the first delta of a possibly non-commuting pair |
| cDelta2 | <code>[Delta](#DeltaJs#Delta)</code> | the second delta of a possibly non-commuting pair |
| [options] | <code>object</code> | any options for the resolution test |

**Returns**: <code>boolean</code> - whether `crDelta` resolves any conflict between `cDelta1` and `cDelta2`  
**See**: [resolves](#DeltaJs#Delta#resolves)

-----

<a name="DeltaJs#Proxy"></a>
#### *deltaJs*.Proxy

-----

<a name="DeltaJs#Feature"></a>
#### *deltaJs*.Feature

-----

<a name="DeltaJs#Feature#addOption"></a>
##### *feature*.addOption(optionName, value)

| Param | Type |
| --- | --- |
| optionName | <code>string</code> | 
| value |  | 


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

| Param | Type |
| --- | --- |
| ...features | <code>Array.&lt;string&gt;</code> | 


-----

<a name="DeltaJs#newFeature"></a>
#### *deltaJs*.newFeature(name, options) ⇒ <code>[Feature](#DeltaJs#Feature)</code>

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | the name of the new feature |
| options | <code>object</code> | the (optional) options for the new feature |

**Returns**: <code>[Feature](#DeltaJs#Feature)</code> - the object representing the new feature  

-----

<a name="DeltaJs#newOperationType"></a>
#### *deltaJs*.newOperationType(name, DeltaSubclass, [ProxySubclass])
This method allows you to tell delta.js about a new kind of delta operation.
This was also done for existing operations like `modify`, `add`, `remove`, and so on.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name of the new operation type |
| DeltaSubclass | <code>function</code> | the new operation class |
| [ProxySubclass] | <code>function</code> | the optional custom `Proxy` subclass for this operation-type |


-----

<a name="DeltaJs#vp"></a>
#### *deltaJs*.vp(name, val) ⇒ <code>\*</code>
This method indicates a variation point.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | a hook by which operations from the core delta model can be applied |
| val | <code>\*</code> | the initial value of this variation point |

**Returns**: <code>\*</code> - the value of this variation point after applying the appropriate deltas  

-----

<a name="DeltaJs#do"></a>
#### *deltaJs*.do() ⇒ <code>[Proxy](#DeltaJs#Proxy)</code>
A {DeltaJs} instance has one fundamental {DeltaJs#DeltaModel} instance, which is applied
to any variation points that are encountered. This method is an alias to the eponymous
method on that 'root' delta model. It returns the proxy that allows new delta operations
to be added more easily. It presets the 'feature' option to 'true', but this can be
overwritten manually.

**Returns**: <code>[Proxy](#DeltaJs#Proxy)</code> - the proxy to this delta, for easily adding operations  

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
