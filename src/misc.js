var U = {

	/* create a new class, given a constructor and possible prototype */
	newClass(constructor = {}, prototype = {}) {

		/* allow for no constructor function to be passed */
		if (typeof constructor !== 'function') {
			prototype = constructor;
			constructor = function () {};
		}

		/* define the class */
		var cls = constructor;
		cls.prototype = prototype;
		cls.prototype.constructor = cls;
		return cls;

	},

	/* create a new subclass, given a superclass, constructor and possible prototype */
	newSubclass(superClass, constructorMaker = {}, prototype = {}) {

		/* allow for no constructor function to be passed */
		if (typeof constructorMaker !== 'function') {
			prototype = constructorMaker;
			constructorMaker = (superFn) => function (...args) { superFn.apply(this, args) };
		}

		/* define the subclass */
		var cls = constructorMaker(superClass.prototype.constructor);
		cls.prototype = Object.create(superClass.prototype);
		U.extend(cls.prototype, prototype);
		cls.prototype.constructor = cls;
		return cls;

	},

	/*  extend the first passed object with the properties     */
	/*  of the other objects, from left to right, and returns  */
	/*  the first passed object                                */
	extend(obj1, ...rest) {
		rest.forEach((obj) => {
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					Object.defineProperty(obj1, key, Object.getOwnPropertyDescriptor(obj, key));
				}
			}
		});
		return obj1;
	},

	default(object, ...rest) {
		var keys = rest.slice(0, -1);
		var def = rest[rest.length-1];
		if (keys.length === 0) { return object }
		var last = U.o(object, ...keys.slice(0, -1));
		if (U.isUndefined(last[keys[keys.length-1]])) {
			last[keys[keys.length-1]] = def;
		}
		return last[keys[keys.length-1]];
	},

	o(object, ...keys) { return U.default(object, ...keys, {}) },

	a(object, ...keys) { return U.default(object, ...keys, []) },

	/* a simple `assert` function, to express a condition that is expected to be true */
	assert(condition, message) {
		if (!condition) { throw new Error(message || "Assertion failed") }
	},

	/* test if a value is `undefined` */
	isUndefined(val) { return typeof val === 'undefined' },

	/* test if a value is defined (not `undefined`) */
	isDefined(val) { return typeof val !== 'undefined' },

	/* repeat a string a given number of times */
	repeat(nr, str) { return new Array(nr+1).join(str) },

	/* shift every line in a string right by a given number of spaces */
	indent(str, amount, char = ' ') {
		return str.replace(/^(?!\s*$)/mg, U.repeat(amount, char));
	}
};

export default U;
