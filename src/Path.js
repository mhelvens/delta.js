import U from './misc.js';


export default class Path {

	constructor(str = "") {
		///////////////////////  11111  22222222222  33  //
		var match = str.match(/^([.#]?)(\w*|\(\w+\))(.*)$/);
		U.assert(match, `The path string '${str}' is not well formed.`);
		var [, lead, prop, rest] = match;
		if (lead === '#') {
			// The # separator is used in the JsDoc sense, and is translated to '.(instance).'
			this.set(new Path(`.(instance).${prop}${rest}`));
		} else if (prop !== '') {
			this._prop = prop;
			if (rest !== '') {
				this._rest = new Path(rest);
			}
		}
	}

	set(other) {
		this._prop = other._prop;
		this._rest = other._rest;
	}

	get prop() { return this._prop }

	get rest() { return this._rest }

	toString() {
		var result = "";
		if (U.isDefined(this.prop)) {
			result += this.prop;
			if (U.isDefined(this.rest)) {
				result += "." + this.rest.toString();
			}
		}
		return result;
	}

}

// TODO: implement that the `.(instance).` members are actually included in instances
