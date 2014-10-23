# delta-js [![Build Status](https://secure.travis-ci.org/mhelvens/delta-js.png?branch=master)](https://travis-ci.org/mhelvens/delta-js)

achieve modularity and separation of concerns through feature-oriented development

## Installation

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
```

## Using `DeltaJs`

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

This method creates a *variation point*. It should be used where deltas may need
to modify things in the code-base. Every variation point needs a unique name by
which deltas can refer to it. For example:

```javascript
var MyClass = dm.vp('MyClass', function () {
    someMethod: function () {},
    someField: 'some value'
});
```

This allows deltas to modify the `MyClass` class, as well as all of its properties.


### `.Delta(name, options)`

This constructor can be used to create a new *delta* and register it with the delta model:

```javascript
var delta = new dm.Delta('cool-feature', {
    // options
});
```

As with variation points, deltas need a unique name. But the variation point namespace
and the delta namespace are The following options are supported:

| options              | default   | meaning
| -------------------- | --------- | -------
| `manuallySelectable` | `true`    | specifies whether the delta can be selected through the delta model `.select` method
| `if`                 | `false`   | a condition under which this delta will be automatically selected. It can be `true` (always selected), `false` (not automatically selected) or an array of delta-names (selected if all of those are selected).
| `onlyIf`             | `true`    | a condition that is required for this delta to be selected. If, eventually, this delta is selected, but this condition is not met, an error will be thrown.
| `after`              | `[]`      | a list of delta names. This delta is guaranteed to be applied after the deltas in this list. If the registration of this delta creates an application order cycle, an error will be thrown.
| `selects`            | `[]`      | a list of delta names. If this delta is selected, all deltas in this list will also be selected.

Each of these options will be available as fields on the resulting delta.
Then there are some options that combine multiple of the above:

| options     | combines
| ----------- | --------
| `iff`       | `if` and `onlyIf`
| `expects`   | `onlyIf` and `after`
| `requires`  | `after` and `selects`
| `resolves`  | `if`, `onlyIf` and `after`; and sets `manuallySelectable` to `false`

A constructed `delta` can be used to specify modifications to any variation point.
For more information on this, have a look at the Delta API.


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

Deltas can modify values (marked with variation points) to a wide degree, from completely
replacing them with other values, to making fine-grained modifications in a deeply nested
object. It does so through well-defined *operations*, which you can specify through a
`Delta` object.


### `.modify(propertyOrVp)`

The `modify` operation is most important, as it allows us to 'navigate' through the
variation points and the properties of objects.












-------- Below here are snippets from the ApiNATOMY documentation, which can be reused for this file.


Plugins modify the main ApiNATOMY artefacts on a code level (by something called *invasive composition*).
At the top level, a plugin specifies one or more artefacts to modify. There are currently three
types of artefact: `Circuitboard`, `Tilemap` and `Tile`. These can be seen as 'JavaScript classes', and
are internally instantiated with `new`. A plugin can modify these artefact classes in any number of ways,
and to a granularity of any depth. For example, to add a new `refresh` method to `Circuitboard` instances,
you could do the following:

```javascript
var plugin = $.circuitboard.plugin({ /* meta-data (see above) */ });

plugin.modify('Circuitboard').modify('prototype').add('refresh', function () {
    this.doSomeRefreshingThing();
    /* ... */
});
```

Note the method-chaining syntax being used here. `plugin`, here, is
an object (called a 'delta') that can be used to specify modifications on any artefact and at
any level. `plugin.modify('Circuitboard')` is an object that can be used to modify the
`Circuitboard` class at that level, or any below. So:

> The `modify` operation descends one level in the artefact hierarchy to specify more fine-grained modifications.

The syntax above has a convenient shorthand:

```javascript
plugin.add('Circuitboard.prototype.refresh', function () { /* ... */ });
```

> The dot-notation is a shorthand for inserting a number of chained `modify` operations.

In those regards, `modify` is special. But there are a number of other available operations:

| operation | meaning
| -------   | ---
| `add`     | add a new key/value pair to an object. This assumes it is not already there.
| `remove`  | remove a key/value pair from an object. This assumes it is there to be removed.
| `replace` | the same as a `remove` followed by an `add`. So this assumes the key is present.
| `forbid`  | the same as an `add` followed by a `remove`. So this is only an assertion that the given key is not present.
| `insert`  | insert a a function to be run inside an existing method. This assumes the given key already has a function value. It keeps its function scope, so you can use plugin-local variables, and it receives the same arguments as the original function. It is guaranteed *not* to go 'inside' of another `insert`ed code-block, but no guarantees are made as to the order between such code-blocks.
| `prepend` | like `insert`, but it always inserts the new code at the beginning of the target function
| `append`  | like `insert`, but it always inserts the new code at the end of the target function
| `after`   | like `append`, except that it is aware of asynchronous operations by use of *promises*. If the original function returns a promise, the inserted code runs only after that promise has been fulfilled.

Here is a short example, which also shows an alternative syntax for specifying operations:

```javascript
$.circuitboard.plugin({
    name: 'click-to-maximize',
    after: ['tile-maximize'],
    
    'modify Tile.prototype': {
        'add ensureMaximization': function () {
            this.maximized = true;
        },
        'after construct': function () {
            this.on('click', function () {
                this.ensureMaximization();
            });
        }
    }
});
```

> Inside a 'modify context' (including the main plugin object configuration object),
> nested objects with `<operation> <propertyName>` may be used to specify operations
> instead of method-chaining. This is a matter of personal preference.

The `after` operation can be very useful for asynchronous code, but as you can see,
you can safely use `after` without having to know about promises.
Have a look at `p-tile-spacing.js` for another good example of this.

Every artefact prototype has a `construct` method, which is guaranteed to run for each
artefact instance. It is common practice
to `insert` or `after` initialization code directly into this method.

To get a better intuition behind plugins, you are encouraged to look at the files in `src/`.
All the ones that start with `p-` are plugins.

Plugins continue to be refined (see, for example, #7 and #8). As plugins change, I hope to
keep this documentation somewhat up to date. But things are still moving rather quickly.
Be aware that the plugin API may still change in incompatible ways.

## License

MIT
