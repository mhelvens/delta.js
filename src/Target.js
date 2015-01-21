import U from './misc.js';

export var ReadableTarget = U.newClass(function (value) {
	this._val = value;
}, {
	getValue() { return this._val },
	get value() { return this.getValue() },
	set value(v) { this.setValue(v) }
});

export var WritableTarget = U.newSubclass(ReadableTarget, (superFn) => function (obj, prop) {
	this._obj  = obj;
	this._prop = prop;
}, {
	getValue() { return this._obj[this._prop] },
	setValue(v) { this._obj[this._prop] = v },
	delete() { delete this._obj[this._prop] }
});

ReadableTarget.prototype.chain = function chain(prop) {
	U.assert(this.value instanceof Object,
		`The ReadableTarget.prototype.chain method expects the target value to be an Object.`);
	return new WritableTarget(this.value, prop);
};

export function wt(obj, prop) { return new WritableTarget(obj, prop) }
export function rt(obj, prop) { return new ReadableTarget(obj, prop) }
