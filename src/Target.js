import U from './util.js';


export class ReadableTarget {
	constructor(value) { this._val = value }
	getValue() { return this._val }
	get value() { return this.getValue() }
	set value(v) { this.setValue(v) }
}


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


export function wt(obj, prop) { return new WritableTarget(obj, prop) }
export function rt(obj, prop) { return new ReadableTarget(obj, prop) }
