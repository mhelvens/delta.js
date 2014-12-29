define(['./misc.js', 'js-graph'], function (U, JsGraph) {
	'use strict';


	/** {@class DeltaJs}
	 *
	 */
	var DeltaJs = U.newClass(function DeltaJs() {

		var thisDeltaJs = this;

		/* the things instances of 'DeltaJs' keeps track of */
		this.operations = {};   // property -> Delta
		this.compositions = {}; // type1 -> type2 -> [composeFn]

		/* define the base 'Delta' class *///--------------------------------------------------------------------(Delta)
		this.operations.Delta = U.newClass(function () {}, {
			/** {@public}{@method}
			 *
			 * @param indentLvl {Number?}
			 * @param property  {String?}
			 */
			toString(indentLvl = 0, prop = '(root)') {
				var indent = U.repeat(0 + indentLvl, '    ');
				var str = `${indent}${this.type} '${prop}'`;
				if (this.a && this.a.length > 0) {
					str += `: ${JSON.stringify(this.a).slice(1, -1)}`;
				}
				if (this.deltas && Object.keys(this.deltas).length > 0) {
					str += '\n' + Object.keys(this.deltas)
							.map((p) => this.deltas[p].toString(indentLvl + 1, p))
							.join('\n');
				}
				return str;
			}
		});
		//------------------------------------------------------------------------------------------------------(/Delta)


		/* define the fundamental 'modify' delta *///-----------------------------------------------------------(modify)
		this.operations['modify'] = U.newSubclass(this.operations.Delta, (superFn) => function (...args) {
			superFn.apply(this, args);
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
			 * @param prop       {String}
			 * @param otherDelta {DeltaJs#operations.Delta}
			 */
			compose(prop, otherDelta) {
				var firstDelta = this.deltas[prop];
				var arr = thisDeltaJs.compositions[firstDelta.type][otherDelta.type];
				U.assert(arr.length > 0,
						`No composition is defined between '${firstDelta.type}' and '${otherDelta.type}'.`);
				return arr[0](this, prop, otherDelta);
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
			 * @return {DeltaJs#operations.modify} - the deepest 'modify' delta involved in this method-call
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

				/* if there is a longer chain, call this method recursively */
				if (match[3].length > 0) {
					// recurse..[indirectly].....[directly]
					return this.modify(match[2])._addOperation(opType, match[3], args);
				}

				/* at this point, we construct the new delta */
				var newDelta = U.applyConstructor(thisDeltaJs.operations[opType], args);

				/* OK, no targeted deltas; do we need to compose the new delta with an existing one? */
				var result;
				if (this.deltas[match[2]]) {
					result = this.compose(match[2], newDelta);
				} else {
					result = this.deltas[match[2]] = newDelta;
				}
				return result.type === 'modify' ? result : this;

			}
		});
		//-----------------------------------------------------------------------------------------------------(/modify)

		// In order to process delta compositions like
		//     delta.add('obj', {});
		//     delta.modify('obj');
		// and still return 'modify' deltas to the user for further operations,
		// we need temporary 'modify' deltas that remember their target, which
		// we will call 'targeted deltas'.

		/* define the 'targetedModify' delta subclass *///----------------------------------------------(targetedModify)
		this.operations['targetedModify'] = U.newSubclass(this.operations['modify'], (superFn) => function (target, ...args) {
			superFn.apply(this, [target].concat(args));
			this._target = target;
		}, {
			/** {@private}{@method}
			 *
			 * @param opType {String}
			 * @param prop   {String}
			 * @param args   {[*]}
			 * @return {DeltaJs#operations.modify} - the deepest 'modify' delta involved in this method-call
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

				/* if there is a longer chain, call this method recursively */
				if (match[3].length > 0) {
					// recurse..[indirectly].....[directly]
					return this.modify(match[2])._addOperation(opType, match[3], args);
				}

				/* if the new delta should be a 'modify' delta, it is a targeted delta */
				if (opType === 'modify') {
					var newDelta = U.applyConstructor(thisDeltaJs.operations['targetedModify'], args);
					newDelta._target = this._target[match[2]];
					return newDelta;
				}

				/* apply the new delta to its target, discard it and return 'this' delta */
				U.applyConstructor(thisDeltaJs.operations[opType], args).applyTo(this._target, match[2]);
				return this;

			}
		});
		//---------------------------------------------------------------------------------------------(/targetedModify)


		/* set the foundation of the compositions array */
		this.compositions['modify'] = { 'modify': [] };


		/* define standard operations */
		this._defineStandardOperationTypes();


	}, /** @lends DeltaJs.prototype */  {

		/** {@public}{@property}
		 * quick access to the 'modify' delta constructor
		 */
		get Delta() { return this.operations['modify'] },

		///** {@public}{@method}
		// *
		// */
		//vp(vpName, val) {
		//	// TODO
		//},

		/** {@public}{@method}
		 *
		 * @param name    {String}
		 * @param applyTo {(DeltaJs#operations.Delta, Object, String) => undefined}
		 */
		newOperationType(name, applyTo, prototype = {}) {

			/* sanity checks */
			U.assert(!this.operations[name],
					`The '${name}' operation type already exists.`);

			/* create the corresponding method in the 'modify' delta */
			this.operations.Delta.prototype[name] = function (prop, ...args) {
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

			/* create the Delta subclass representing this operation type *///-----------------------------------(other)
			this.operations[name] = U.newSubclass(this.operations.Delta, (superFn) => function (...args) {
				superFn.apply(this, args);
				this.a = args;
			}, U.extend({
				type: name,
				applyTo: applyTo
			}, prototype));
			//--------------------------------------------------------------------------------------------------(/other)

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
			var error = (d1, p, d2) => { throw new Error(`You cannot follow '${d1[p].type}' with '${d2.type}'.`) };

			function d(type,  fn = (()=>null)) {
				if (typeof fn === 'string') { fn = ((v) => (o) => o[v])(fn) }
				return (d1, p, d2) => {
					var args = {
						d1: d1.deltas && d1.deltas[p],
						d2: d2,
						p1: d1.deltas && d1.deltas[p] && d1.deltas[p].a && d1.deltas[p].a[0],
						p2: d2.a && d2.a[0]
					};
					return d1.deltas[p] = new (deltaJs.operations[type])(fn(args));
				};
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
			// DeltaModel
			//
			// modify       -  (object, [Delta])   => (object)             -  { deltas: {String->Delta} }
			//
			// add          -  (undefined, T)      => (T)                  -  { newValue: T }
			// remove       -  (T)                 => (undefined)          -  { }
			// replace      -  (T, U)              => (U)                  -  { newValue: U }
			// replaceWith  -  (T, T => U)         => (U)                  -  { newValueFn: T => U }
			//
			// alter        -  ([*], [Delta])      => ([*])                -  { alterations: [AlterArrayDelta] }
			// prepend      -  ([*], T)            => ([*])                -  { newValue: T }
			// insert       -  ([*], T)            => ([*])                -  { newValue: T }
			// append       -  ([*], T)            => ([*])                -  { newValue: T }
			//
			// alter        -  (T => U, [Delta])   => (T => *)             -  { alterations: [AlterFnDelta] }
			// prepend      -  (T => U, T => void) => (T => U)             -  { newCode: T => void }
			// insert       -  (T => U, T => void) => (T => U)             -  { newCode: T => void }
			// append       -  (T => U, T => V)    => (T => V)             -  { newCode: T => V }
			//
			// after        -  (T => P<U>, P<U> => T => V) => (T => P<V>)  -  { newCode: P<U> => T => V }
			//  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //

			/* declaring the basic operation types */
			// 'modify' is the most fundamental operation,
			//  and is defined above rather than here
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

			/* composition - introducing 'modify' ***********************************************/
			this.newComposition('modify', 'modify', (d1, p, d2) => {
				Object.keys(d2.deltas).forEach((prop) => {
					d1.compose(p, d2.deltas[prop]);
				});
				return d1.deltas[p];
			});

			/* composition - introducing 'add' **************************************************/
			this.newComposition('modify', 'add'   , error);
			this.newComposition('add'   , 'add'   , error);
			this.newComposition('add'   , 'modify', (d1, p) => new (deltaJs.operations['targetedModify'])(d1.deltas[p].a[0]));

			/* composition - introducing 'remove' ***********************************************/
			this.newComposition('modify', 'remove', d('remove'));
			this.newComposition('add'   , 'remove', d('forbid'));
			this.newComposition('remove', 'modify', error);
			this.newComposition('remove', 'add'   , d('replace', 'p2'));
			this.newComposition('remove', 'remove', error);

			/* composition - introducing 'forbid' ***********************************************/
			this.newComposition('modify', 'forbid', error);
			this.newComposition('add'   , 'forbid', error);
			this.newComposition('remove', 'forbid', d('remove'));
			this.newComposition('forbid', 'modify', error);
			this.newComposition('forbid', 'add'   , d('add', 'p2'));
			this.newComposition('forbid', 'remove', error);
			this.newComposition('forbid', 'forbid', d('forbid'));

			/* composition - introducing 'replace' **********************************************/
			this.newComposition('modify' , 'replace', d('replace', 'p2'));
			this.newComposition('add'    , 'replace', d('add', 'p2'));
			this.newComposition('remove' , 'replace', error);
			this.newComposition('forbid' , 'replace', error);
			this.newComposition('replace', 'modify', (d1, p) => new (deltaJs.operations['targetedModify'])(d1.deltas[p].a[0]));
			this.newComposition('replace', 'add'    , error);
			this.newComposition('replace', 'remove' , d('remove'));
			this.newComposition('replace', 'forbid' , error);
			this.newComposition('replace', 'replace', d('replace', 'p2'));

			//  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //

			///* declaring the 'deltaModel' operation */
			//this.newOperationType('deltaModel', function applyTo(obj, p) {
			//	this.a[0].topologically((subDelta) => {
			//		// the graph is allowed to contain 'null' vertices for ordering purposes
			//		if (subDelta) { subDelta.applyTo(obj, p) }
			//	});
			//}, {
			//
			//});
			//
			//
			///* composition - introducing 'deltaModel' *******************************************/
			//// to compose delta models, we simply have one apply after the other
			//// without any composability checks; in the future, this may become more clever
			//var orderedBySimpleDeltaModel = (d1, p, d2) => {
			//	var graph = new JsGraph();
			//	graph.addNewVertex(1, d1.deltas[p]);
			//	graph.addNewVertex(2, d2);
			//	graph.addNewEdge(1, 2);
			//	return d1.deltas[p] = new (deltaJs.operations['deltaModel'])(graph);
			//};
			//this.newComposition('modify',     'deltaModel', orderedBySimpleDeltaModel);
			//this.newComposition('add',        'deltaModel', orderedBySimpleDeltaModel);
			//this.newComposition('remove',     'deltaModel', orderedBySimpleDeltaModel);
			//this.newComposition('forbid',     'deltaModel', orderedBySimpleDeltaModel);
			//this.newComposition('replace',    'deltaModel', orderedBySimpleDeltaModel);
			//this.newComposition('deltaModel', 'modify',     orderedBySimpleDeltaModel);
			//this.newComposition('deltaModel', 'add',        orderedBySimpleDeltaModel);
			//this.newComposition('deltaModel', 'remove',     orderedBySimpleDeltaModel);
			//this.newComposition('deltaModel', 'forbid',     orderedBySimpleDeltaModel);
			//this.newComposition('deltaModel', 'replace',    orderedBySimpleDeltaModel);
			//this.newComposition('deltaModel', 'deltaModel', orderedBySimpleDeltaModel);

		}

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	});


	return DeltaJs;


});
