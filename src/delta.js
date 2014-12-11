define(['./misc.js'], function (U) {
	'use strict';


	/** {@class DeltaJs}
	 *
	 */
	var DeltaJs = U.newClass(function DeltaJs() {

		var thisDeltaJs = this;

		/* the things instances of 'DeltaJs' keeps track of */
		this.operations = {};   // property -> Delta
		this.compositions = {}; // type1 -> type2 -> [composeFn]

		/* define the base 'Delta' class */
		this.operations.Delta = U.newClass(function () {});

		/* put the right foundation in 'this.composition' */
		this.compositions['modify'] = { 'modify': [] };

		//  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
		/* define the fundamental 'modify' delta */
		this.operations['modify'] = U.newSubclass(this.operations.Delta, (superFn) => function () {
			superFn();
			this.deltas = {};
		}, {

			type: 'modify',

			/** {@public}{@method}
			 *
			 * @param obj  {Object}
			 * @param prop {String}
			 */
			applyTo(obj, prop) {
				if (U.isDefined(prop)) { obj = obj[prop] }
				U.assert(obj instanceof Object,
						`The 'modify' operation expects the property to be an already defined Object.`);
				Object.keys(this.deltas).forEach((subProp) => {
					this.deltas[subProp].applyTo(obj, subProp);
				});
			},

			appliedTo(obj, prop) {
				if (U.isDefined(prop)) { obj = obj[prop] }
				var result = U.extend({}, obj);
				this.applyTo(result);
				return result;
			},

			/** {@public}{@method}
			 *
			 * @param prop  {String}
			 * @param other {DeltaJs#operations.Delta}
			 */
			compose(prop, other) {

				if (other) {
					var thisDelta = this.deltas[prop];
					var success = thisDeltaJs.compositions[thisDelta.type][other.type].some((comp) => {
						try {
							comp(this, prop, other);
							return true;
						} catch (__) {}
						return false;
					});
					U.assert(success,
							`No composition is defined between '${thisDelta.type}' and '${other.type}'.`);
				}

				return this;
			},

			/** {@public}{@method}
			 *
			 * @param prop {String}
			 */
			modify(prop) {
				return this._addOperation('modify', prop, []);
			},

			/** {@private}{@method}
			 *
			 * @param opType {String}
			 * @param prop   {String}
			 * @param args   {[*]}
			 */
			_addOperation(opType, prop, args) {

				/* dissect the 'prop' string */
				////////////////////////  11111  22222222222  33  //
				var match = prop.match(/^([.#]?)(\w+|\(\w+\))(.*)$/);
				U.assert(match, `The path string '${prop}' is not well formed.`);

				/* if 'prop' has a leading '#' character, transform it and recall this method */
				if (match[1] === '#') {
					// the # separator expects the current object to be a constructor function,
					// and yields a delta to modify new instances of the corresponding class
					return this._addOperation(opType, `.(instance).${match[2]}${match[3]}`, args);
				}

				/* create the resulting delta, possibly calling this method recursively for a longer chain */
				var resultDelta;
				if (match[3] === '') {
					((newDelta) => {
						if (this.deltas[match[2]]) {
							this.compose(match[2], newDelta);
						} else {
							this.deltas[match[2]] = newDelta;
						}
					})(U.applyConstructor(thisDeltaJs.operations[opType], args));
					resultDelta = this.deltas[match[2]];
				} else {
					resultDelta = this.modify(match[2])._addOperation(opType, match[3], args);
				}

				/* if this operation was a modification, return the new delta; otherwise, return this delta */
				return opType === 'modify' ? resultDelta : this;

			},

			/** {@public}{@method}
			 *
			 * @param indentLvl {Number?}
			 * @param property  {String?}
			 */
			toString(indentLvl = 0, prop = '(root)') {
				var indent = U.repeat(0 + indentLvl, '    ');
				return `${indent}modify '${prop}'\n` +
						Object.keys(this.deltas).map((p) => this.deltas[p].toString(indentLvl + 1, p)).join('\n');
			}

		});
		//  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //


		/* define standard operations */
		this._defineStandardOperationTypes();


	}, /** @lends DeltaJs.prototype */  {

		/** {@public}{@property}
		 * quick access to the 'modify' delta constructor
		 */
		get Delta() { return this.operations['modify'] },

		/** {@public}{@method}
		 *
		 */
		vp(vpName, val) {
			// TODO
		},

		/** {@public}{@method}
		 *
		 * @param name    {String}
		 * @param applyTo {(DeltaJs#operations.Delta, Object, String) => undefined}
		 */
		newOperationType(name, applyTo) {

			/* sanity checks */
			U.assert(!this.operations[name],
					`The '${name}' operation type already exists.`);

			/* create the corresponding method in the 'modify' delta */
			this.operations.modify.prototype[name] = function (prop, ...args) {
				return this._addOperation(name, prop, args);
			};

			/* put the right foundation in 'this.composition' */
			this.compositions[name] = {};
			Object.keys(this.compositions).forEach((type) => {
				U.assert(!this.compositions[type][name]);
				U.assert(!this.compositions[name][type]);
				this.compositions[type][name] = [];
				this.compositions[name][type] = [];
			});


			//  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
			/* create the Delta superclass representing this operation type */
			this.operations[name] = U.newSubclass(this.operations.Delta, (superFn) => function (...args) {
				superFn();
				this.a = args;
			}, {
				type: name,
				applyTo: applyTo,

				/** {@public}{@method}
				 * @param indentLvl {Number?}
				 * @param property  {String?}
				 */
				toString(indentLvl = 0, prop = '(root)') {
					var indent = U.repeat(0 + indentLvl, '    ');
					return `${indent}${name} '${prop}': ${JSON.stringify(this.a).slice(1, -1)}`;
				}
			});
			//  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //


		},

		/** {@public}{@method}
		 *
		 * @param type1   {String}
		 * @param type2   {String}
		 * @param compose {(DeltaJs#operations.modify, String, DeltaJs#operations.Delta) => undefined}
		 */
		newComposition(type1, type2, compose) {
			this.compositions[type1][type2].push(compose);
		},

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		/** {@private}{@method}
		 *
		 */
		_defineStandardOperationTypes() {

			var deltaJs = this;

			//  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //

			/* convenience definitions for the application and composition functions below */
			var keepFirst = () => {};
			var keepSecond = (d1, p, d2) => { d1.deltas[p] = d2 };
			var applySecondToFirst = (d1, p, d2) => { d2.applyTo(d1.deltas[p].a, 0) };
			var error = (d1, p, d2) => { throw new Error(`You cannot follow '${d1[p].type}' with '${d2.type}'.`) };

			function d(type,  fn = ()=>null) {
				if (typeof fn === 'string') { fn = ((v) => (o) => o[v])(fn) }
				return (d1, p, d2) => {
					d1.deltas[p] = U.applyConstructor(deltaJs.operations[type],
							[fn({ d1: d1.deltas[p], d2: d2, p1: d1.deltas[p].a[0], p2: d2.a[0] })]);
				};
			}
			function v(thing) { return (o) => o[thing] }

			function assertFunction(val, opType) {
				U.assert(typeof val === 'function',
						`The operation '${opType}' expects the property it acts on to be a function.`);
			}
			function assertObject(val, opType) {
				U.assert(val instanceof Object,
						`The operation '${opType}' expects the property it acts on to be an Object.`);
			}
			function assertDefined(val, opType) {
				U.assert(U.isDefined(val),
						`The operation '${opType}' expects the property to be defined.`);
			}
			function assertUndefined(val, opType) {
				U.assert(U.isUndefined(val),
						`The operation '${opType}' expects the property to be undefined.`);
			}

			//  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //

			// 'modify' is more fundamental, and defined above
			this.newOperationType('add', function applyTo(obj, p) {
				assertUndefined(obj[p], 'add');
				obj[p] = this.a[0];
			});
			this.newOperationType('remove', function applyTo(obj, p) {
				assertDefined(obj[p], 'remove');
				delete obj[p];
			});
			this.newOperationType('forbid', function applyTo(obj, p) {
				assertUndefined(obj[p], 'forbid');
			});
			this.newOperationType('replace', function applyTo(obj, p) {
				assertDefined(obj[p], 'replace');
				obj[p] = this.a[0];
			});

			//  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //

			// modify
			this.newComposition('modify', 'modify', (d1, p, d2) => {
				Object.keys(d2.deltas).forEach((prop) => {
					d1.compose(p, d2.deltas[prop]);
				});
			});

			// add
			this.newComposition('modify', 'add'   , error);
			this.newComposition('add'   , 'add'   , error);
			this.newComposition('add'   , 'modify', d('add', ({d2, p1}) => d2.appliedTo(p1)));

			// remove
			this.newComposition('modify', 'remove', d('remove'));
			this.newComposition('add'   , 'remove', d('forbid'));
			this.newComposition('remove', 'modify', error);
			this.newComposition('remove', 'add'   , d('replace', 'p2'));
			this.newComposition('remove', 'remove', error);

			// forbid
			this.newComposition('modify', 'forbid', error);
			this.newComposition('add'   , 'forbid', error);
			this.newComposition('remove', 'forbid', d('remove'));
			this.newComposition('forbid', 'modify', error);
			this.newComposition('forbid', 'add'   , d('add', 'p2'));
			this.newComposition('forbid', 'remove', error);
			this.newComposition('forbid', 'forbid', d('forbid'));

			// replace
			this.newComposition('modify' , 'replace', d('replace', 'p2'));
			this.newComposition('add'    , 'replace', d('add', 'p2'));
			this.newComposition('remove' , 'replace', error);
			this.newComposition('forbid' , 'replace', error);
			this.newComposition('replace', 'add'    , error);
			this.newComposition('replace', 'remove' , d('remove'));
			this.newComposition('replace', 'forbid' , error);
			this.newComposition('replace', 'modify' , d('replace', ({d2, p1}) => d2.appliedTo(p1)));
			this.newComposition('replace', 'replace', d('replace', 'p2'));

		}

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	});


	return DeltaJs;


});
