/**
 * @class DeltaJs.ReadableTarget
 */
export class ReadableTarget {
	constructor(value) { this._val = value }
	getValue() { return this._val }
	get value() { return this.getValue() }
	set value(v) { this.setValue(v) }
}

/**
 * @class DeltaJs.WritableTarget
 * @extends DeltaJs.ReadableTarget
 */
export class WritableTarget extends ReadableTarget {
	constructor(obj, prop) {
		super();
		this._obj = obj;
		this._prop = prop;
	}
	getValue() { return this._obj[this._prop] }
	setValue(v) { this._obj[this._prop] = v }
	delete() { delete this._obj[this._prop] }
}

/**
 * Convenience function to create a readable target from a value.
 * @param value {*} - the value to target
 */
export function rt(value) { return new ReadableTarget(value) }

/**
 * Convenience function to create a writable target from an object and key.
 * @param obj  {object} - the object that contains the target
 * @param prop {string} - the key on the `obj` object that refers to the target
 */
export function wt(obj, prop) { return new WritableTarget(obj, prop) }
