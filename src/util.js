/*  extend the first passed object with the properties     */
/*  of the other objects, from left to right, and returns  */
/*  the first passed object                                */
export function extend(obj1, ...rest) {
	rest.forEach((obj) => {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				Object.defineProperty(obj1, key, Object.getOwnPropertyDescriptor(obj, key));
			}
		}
	});
	return obj1;
}


export function dfault(object, ...rest) {
	var keys = rest.slice(0, -1);
	var def = rest[rest.length-1];
	if (keys.length === 0) { return object }
	var last = o(object, ...keys.slice(0, -1));
	if (isUndefined(last[keys[keys.length-1]])) {
		last[keys[keys.length-1]] = def;
	}
	return last[keys[keys.length-1]];
}


export function o(object, ...keys) { return dfault(object, ...keys, {}) }


export function a(object, ...keys) { return dfault(object, ...keys, []) }


/* a simple `assert` function, to express a condition that is expected to be true */
export function assert(condition, message) {
	if (!condition) { throw new Error(message || "Assertion failed") }
}


/* test if a value is `undefined` */
export function isUndefined(val) {
	return typeof val === 'undefined';
}


/* test if a value is defined (not `undefined`) */
export function isDefined(val) {
	return typeof val !== 'undefined';
}


/* repeat a string a given number of times */
export function repeat(nr, str) {
	return new Array(nr+1).join(str);
}


/* shift every line in a string right by a given number of spaces */
export function indent(str, amount, char = ' ') {
	return str.replace(/^(?!\s*$)/mg, repeat(amount, char));
}


/* run a function only once per obj+string combo */
export function oncePer(obj, key, fn) {
	var opfn = (obj) => {
		var p = `_once per: ${key}`;
		if (obj[p]) { return }
		obj[p] = true; // TODO: make non-enumeratable, or use ES6 Symbol
		return fn.call(obj, obj);
	};
	if (typeof obj === 'string') {
		[key, fn] = [obj, key];
		return opfn;
	} else {
		return opfn(obj);
	}
}


/* shorthand specifier for composition preconditions */
export var t = (type1, type2) => {
	return (d1, d2) => (d1.type === type1 && d2.type === type2);
};


/* shorthand specifier for composition implementations */
export var define_d = (deltaJs) => (type, fn) => {
	if (typeof fn === 'string') { fn = ((v) => (o) => o[v])(fn) }
	return (d1, d2) => new deltaJs.Delta[type](fn && fn({d1, d2, p1: d1.arg, p2: d2.arg}));
};






