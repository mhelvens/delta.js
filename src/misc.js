define(() => {
	'use strict';

	var U = {

		// create a new class, given a constructor and possible prototype
		newClass(constructor, prototype) {
			prototype = prototype || {};
			var cls = function (...args) {
				constructor.apply(this, args);
			};
			cls.prototype = prototype;
			cls.prototype.constructor = cls;
			return cls;
		},

		// create a new subclass, given a superclass, constructor and possible prototype
		newSubclass(superClass, constructor, prototype) {
			prototype = prototype || {};
			var cls = function (...args) {
				constructor.apply(this, [superClass.prototype.constructor].concat(args));
			};
			cls.prototype = Object.create(superClass.prototype, prototype);
			cls.prototype.constructor = cls;
			return cls;
		},

		// extend the first passed object with the properties
		// of the other objects, from left to right, and returns
		// the first passed object
		extend(obj1, ...rest) {
			rest.forEach((obj) => {
				for (var key in obj) {
					if (obj.hasOwnProperty(key)) {
						obj1[key] = obj[key];
					}
				}
			});
			return obj1;
		},

		// get the array `obj[name]`; if `obj[name]` is not
		// an array, make it an empty array first
		array(obj, name) {
			if (U.isUndefined(obj[name])) { obj[name] = [] }
			return obj[name];
		},

		// `Function.bind`, but taking an array like `Function.apply` does
		bindA(fn, ctx, args) { return fn.bind.apply(fn, [ctx].concat(args)) },

		// `Function.bind`, but only having to specify the context-object once
		bind(obj, m, ...args) { return U.bindA(obj[m], obj, args) },

		// allows the Function constructor to be used
		// with an array of formal parameters
		applyConstructor(ConstructorFn, args) {
			var NewConstructorFn = ConstructorFn.bind.apply(ConstructorFn, [null].concat(args));
			return new NewConstructorFn();
		},

		// a simple `assert` function, to express a
		// condition that is expected to be true
		assert(condition, message) {
			if (!condition) { throw new Error(message || "Assertion failed") }
		},

		// test if a value is `undefined`
		isUndefined(val) { return typeof val === 'undefined' },

		// test if a value is defined (not `undefined`)
		isDefined(val) { return typeof val !== 'undefined' }
	};

	return U;
});
