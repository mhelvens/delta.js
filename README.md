# delta.js

achieve modularity and separation of concerns through feature-oriented programming

## Description

<img align="right" src="./docs/sculptor.png" />

Programming is an activity very prone to human error, especially if you have
multiple humans trying to do it at the same time.
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

<img align="right" src="./docs/foundation.png" />

This library depends only on
[js-graph](https://github.com/mhelvens/js-graph).
It has some features that can work with promises,
but you can choose your own ([Promises/A+ compliant](https://promisesaplus.com/))
promise library. The way to register
your promise library is documented with the features that need it.

### Install using Bower

`delta.js` is available as a [Bower](http://bower.io/) package, installed as follows:

```shell
bower install delta.js
```

### Install using NPM

`delta.js` is available as an [NPM](https://www.npmjs.org) package, installed as follows:

```shell
npm install delta.js
```

## Import `DeltaJs`

The delta.js package offers a [UMD](https://github.com/umdjs/umd) API, so it supports
AMD ([RequireJS](http://requirejs.org/)), CommonJS and script-tags:

```javascript
requirejs(['lib/delta.js/dist/delta.js'], function (DeltaJs) {
    // use DeltaJs
}
```

```javascript
var DeltaJs = require('lib/delta.js/dist/delta.js')
// use DeltaJs
```

```html
<script src="lib/delta.js/dist/delta.js"></script>
<!-- use DeltaJs -->
```

## Using `DeltaJs`

<img align="right" src="./docs/selection.png" />

`DeltaJs` is a class that can be instantiated:

```javascript
var dm = new DeltaJs();
```

`dm` is a *delta model*, which is basically a context for deltas to do their thing.
Using multiple delta models allows you to use different sets of deltas and rules in
the same project that work independently from each other.


## The `DeltaJs` (delta model) API

Given a delta model, the following methods are available:

### `.vp(name, initialValue)`

This method creates a *variation point*. It should be used in your code-base wherever
deltas may need to make changes. Every variation point needs a unique name for
deltas to refer to. The method modifies a value 'in place', and does not make
a copy. For example:

```javascript
function MyClass() {
    this.someMethod = function () {};
    this.someField  = 'some value';
};
dm.vp('MyClass', MyClass);
```

This allows the selected deltas to modify the `MyClass` class, as well as all of its
properties. The `.vp` method also returns the new value. So the following is equivalent
to the example above:

```javascript
var MyClass = dm.vp('MyClass', function () {
    this.someMethod = function () {};
    this.someField  = 'some value';
});
```


### `.Delta(name, [options])`

This constructor can be used to create a new *delta* and register it with the delta model:

```javascript
var delta = new dm.Delta('cool-feature', {
    // options
});
```

Like variation points, deltas need a unique name. But deltas and variation points have
separate namespaces. In other words: you may give a delta and a variation
point the same name. (Thought if you find yourself doing this often, you may not have
fully understood the point of delta.js.)


#### Predicates

Before listing the supported options, let's briefly describe the notion of 'predicate',
a type of data accepted by several of those options.
A predicate is a condition on the set of selected deltas, and can be
given as one of the following:

* the value `true`
* the value `false`
* an array of delta-names, interpreted as a conjunction. The condition is true exactly if *all* deltas in the list are selected.


#### Supported Options

The following options may be passed to the `Delta` constructor:

| options              | default   | meaning
| -------------------- | --------- | -------
| `manuallySelectable` | `true`    | a Boolean, specifying whether the delta can be selected through the delta model `.select` method
| `if`                 | `false`   | a predicate, specifying whether this delta will be automatically selected
| `onlyIf`             | `true`    | a predicate that is required to hold if this delta is ever selected. If this delta is ever selected without this predicate being met, an error will be thrown at the variation point where the delta is applied.
| `after`              | `[]`      | a list of delta names. This delta is guaranteed to be applied after the deltas in this list. If the registration of this delta creates an application order cycle, an error will be thrown.
| `selects`            | `[]`      | a list of delta names. If this delta is selected, all deltas in this list will also be selected.

Each of these options will be available as a field on the constructed delta.
For convenience, there are some options that combine multiple of the above:

| options     | combines
| ----------- | --------
| `iff`       | `if` and `onlyIf`
| `expects`   | `onlyIf` and `after`
| `requires`  | `after` and `selects`
| `resolves`  | `if`, `onlyIf` and `after`; and sets `manuallySelectable` to `false`

Specific changes to the variation points can be specified
through various operations. For more information on this, have a look at the `Delta` API below.


### `.select(...deltaNames)`

This method can be used to manually select specific deltas to be applied, by name.
It can only be used for deltas that have `manuallySelectable` set to `true` (the default).

```javascript
dm.select('cool-feature', 'silly-feature', 'debugging-patch-359');
```

Deltas mentioned in any of their `selects` properties are automatically pulled in as well.

Note that a delta needs to be registered before it can be selected. And it needs to be
selected before the appearance of any variation point to which it applies. It is probably
something you want to do very early in your application.


## The `Delta` API

Deltas can modify values in any number of ways, from completely
replacing them with other values, to making fine-grained modifications in a deeply nested
object. It does so through well-defined *operations*, which you can specify through the
various `Delta` methods.

Every delta *targets* a specific JavaScript object, which we'll denote as `target` in the
descriptions below. All operations of that delta act on one of the properties of `target`.
The deltas constructed directly from the delta model target an imaginary root object that
contains all variation points as properties. We'll denote this object as `root`.


### `.modify(key)`

This method returns a delta that targets `target[key]`, allowing us to *step into*
a sub-object to make fine-grained modifications inside:

```javascript
var d1 = new dm.Delta('my-delta');       // d1 targets 'root'
var d2 = d1.modify('vp1');               // d2 targets 'root.vp1'
var d3 = d2.modify('foo').modify('bar'); // d3 targets 'root.vp1.foo.bar'
```

For convenience, the `key` can also be given as a dot-separated list:

```javascript
var d4 = d1.modify('vp1.foo.bar');       // d4 === d3
```

This also works for the all the other operations below. It implicitly
constructs a `.modify` chain to reach the right-most key.

* **Note**: because of this shorthand notation, property names that actually
contain the `.` character are not supported (at least for now).*

When you've targeted the proper object, you can use the operations described
below to make specific changes to its properties.


### `.add(key, value)`

This makes the delta *add* a new property `key` to `target`, such that `target[key] === value`.
Before the operation, it is expected that `typeof target[key] === 'undefined'`. In other words,
it cannot already have a property named `key`.

**operation**
```javascript
delta.modify('my-vp.foo').add('bar', 'bas');
```
**before**
```javascript
vp('my-vp', { foo: {}, bar: [] })
```
**after**
```javascript
{ foo: { bar: 'bas' }, bar: [] }
```


### `.remove(key)`

This makes the delta *remove* the property named `key` from `target`, such that `typeof target[key] === 'undefined'`.
Before the operation, it is expected that `typeof target[key] !== 'undefined'`. In other words, it
must first *have* a property named `key`.

**operation**
```javascript
delta.modify('my-vp').remove('foo');
```
**before**
```javascript
vp('my-vp', { foo: { bar: 'bas' }, bar: [] })
```
**after**
```javascript
{ bar: [] }
```


### `.replace(key, newValue)`

This makes the delta *replace* the property named `key` in `target`, such that `target[key] === value`.
Before the operation, it is expected that `typeof target[key] !== 'undefined'`. In other words, it
must already *have* a property named `key`.

**operation**
```javascript
delta.modify('my-vp').replace('foo', 'bar');
```
**before**
```javascript
vp('my-vp', { foo: { bar: 'bas' }, bar: [] })
```
**after**
```javascript
{ foo: 'bar', bar: [] }
```


### `.prepend(key, value)`
### `.append(key, value)`
### `.insert(key, value)`

These methods work if `target[key]` is a *function*,
and respectively prepend, append or insert `value` into it,
which also needs to be a function. (In the future, these operations
will also be supported for arrays.)

The `.prepend` operation places the code in the beginning,
and `.append` places it at the end of the existing function.

The `.insert` operation is special, because it gives the delta the freedom to put
the code in an arbitrary position; you don't have
any control over the placement.
The advantage of `.insert` is that the order between multiple
insertions does not matter. As far as delta.js is concerned,
`d.insert('f', fn1).insert('f', fn2)` and `d.insert('f', fn2).insert('f', fn1)`
are equivalent. Moreover, two unordered deltas can insert things into the same
array or function without this being regarded as a conflict.

**operation**
```javascript
delta.modify('my-vp').append('f', function (a, b) {
    doOtherThings(a, b);
});
```
**before**
```javascript
vp('my-vp', {
    f: function (a, b, c) {
        doThings(b, c);
    }
})
```
**after**
```javascript
{
    f: function () {
        (function (a, b, c) {
            doThings(a, b);
        }).apply(this, arguments);
        (function (a, b) {
            doOtherThings(a, b);
        }).apply(this, arguments);
    }
}
```

delta.js cannot actually add statements to existing functions. Instead,
it defines a new one, which calls the original and the added function
in the proper order, properly passing the function arguments and `this`
to both of them. This has some consequences:

* Local variables are not shared among function 'parts'. 'Function-part local' is 'delta local'.
* All non-standard properties of a function are lost after a `.prepend`, `.append` or `.insert`.
  If this is undesirable, it is recommended that the original function is written to call
  an auxiliary function, so the delta operations to can apply to the auxiliary. For class
  constructors, it is recommended that you use a function `Class.prototype.construct` for
  this purpose:

```javascript
function MyClass() { this.construct.apply(this, arguments) }
MyClass.prototype.construct = function () {};
dm.vp('MyClass', MyClass)
```
```javascript
dm.delta('my-delta').modify('my-vp')
    .append('MyClass.prototype.construct', function (a, b, c) {
        this.doExtraThings(a, b, c);
    });
```


### `.after(key, fn)`

This operation is similar to `.append`,
but `fn` is attached to run *asynchronously*. If the original function returns a promise,
`fn` is run once that promise is resolved. There is currently no way to access the
value of that promise from within `fn` (but there will be).

If you ever want to use `.after`, you first need to make delta.js aware of the
promise library you are using. You can do this through the static function
`DeltaJs.registerPromiseResolver`. You need to pass it the function that is
used to generate a new promise from an arbitrary value:

```javascript
DeltaJs.registerPromiseResolver(Q)         // kriskowal's Q
DeltaJs.registerPromiseResolver(P.resolve) // Bluebird
DeltaJs.registerPromiseResolver($q.when)   // AngularJs
```

Do this as early in your application as possible. You can then use `.after`:

**operation**
```javascript
delta.modify('my-vp').after('f', function (a, b) {
    return doMoreThings(a, b);
});
```
**before**
```javascript
vp('my-vp', {
    f: function (a, b, c) {
        return doThings(b, c);
    }
})
```
**after**
```javascript
{
    f: function () {
        promiseResolver(
            function (a, b, c) {
                return doThings(a, b);
            }.apply(this, arguments)
        ).then(
            function (a, b) {
                doOtherThings(a, b);
            }.bind(this, arguments)
        );
    }
}
```

Note that this operation will still work if the original function does *not* return a promise.
In that case, `fn` is run immediately (though still asynchronously) after the original.


## Future Plans

<img align="right" src="./docs/factory.png" />

Here is an incomplete list of future plans for this library:

* full test coverage
* an API for creating your own operations
* more useful error messages based on delta model structure
* explicit support for changing HTML and CSS with deltas


## License

MIT
