define(['./misc.js', 'js-graph'], function (U/*, JsGraph*/) {
	'use strict';


	/** {@class DeltaJs}
	 * This class offers every functionality you need from delta modeling.
	 * Each instance offers its own operation types and variation points.
	 * You will usually need only one instance per application.
	 */
	var DeltaJs = U.newClass(function DeltaJs() {


		/* alias for 'this' */
		var thisDeltaJs = this;


		/* the things instances of 'DeltaJs' keeps track of */
		this.operations = {};   // property -> Delta
		this.compositions = []; // [{predicate, composeFn}]


		/* define the base 'Delta' class *///--------------------------------------------------------------------(Delta)
		this.operations.Delta = U.newClass(function (arg, meta) {
			this.arg = arg;
			this.meta = meta || {};
		}, {
			/** {@public}{@abstract}{@method}{@nosideeffects}
			 * This method should be overwritten by subclasses to make a clone of 'this' delta.
			 * @return {DeltaJs#operations.Delta} - a clone of this delta
			 */
			clone() {
				return new this.constructor(this.arg, this.meta);
			},

			/** {@public}{@method}{@nosideeffects}
			 * @param  value {*} - any given value
			 * @return the value resulting in this delta being applied to the given `value`
			 */
			appliedTo(value) {
				if (U.isDefined(value.clone)) { value = value.clone() }
				var obj = {value};
				this.applyTo(wf(obj, 'value'));
				return obj.value;
			},

			/** {@public}{@method}{@nosideeffects}
			 * @param otherDelta {DeltaJs#operations.Delta}
			 */
			compose(otherDelta) {
				var composeFn;
				thisDeltaJs.compositions.some(({predicate, compose: fn}) => {
					if (predicate(this, otherDelta)) {
						composeFn = fn;
						return true;
					}
				});
				if (!!composeFn) {
					return composeFn(this, otherDelta);
				} else {
					U.assert(!!composeFn,
							`A '${this.type}' operation cannot be followed by a '${otherDelta.type}' operation.`);
				}
			},

			/** {@public}{@method}
			 * @param indentLvl {Number?}
			 * @param prop      {String?}
			 */
			toString(indentLvl = 0, prop = '(root)') {
				var indent = U.repeat(0 + indentLvl, '    ');
				var str = `${indent}${this.type} '${prop}'`;
				if (U.isDefined(this.arg)) {
					str += `: ${JSON.stringify(this.arg).slice(1, -1)}`;
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


		// TODO: implement delta method overloads
		//this.overloads = {}; // method -> [delta-classes]
		//
		///* define the 'OverloadedDelta' class, which invokes deltas based on target predicates *///----(OverloadedDelta)
		//this.operations.OverloadedDelta = U.newSubclass(this.operations.Delta, (superFn) => function (arg, meta) {
		//	superFn.call(this, arg, meta);
		//	this.overloads = [];
		//}, {
		//	get type() { return thisDeltaJs.overloads[this.meta.method].map((cls) => cls.type) },
		//
		//	/** {@public}{@abstract}{@method}{@nosideeffects}
		//	 * @return {DeltaJs#operations.OverloadedDelta} - a clone of this delta
		//	 */
		//	clone() {
		//		var result = thisDeltaJs.operations.Delta.prototype.clone.call(this, this.arg, this.meta); // super()
		//		result.overloads = this.overloads.map(({predicate, delta}) => ({predicate, delta: delta.clone()}));
		//		return result;
		//	},
		//
		//	/** {@public}{@method}
		//	 * @param field {WritableField}
		//	 */
		//	applyTo(field) {
		//		/* apply the first overload that applies to the field */
		//		var success = this.overloads.some(({predicate, delta}) => {
		//			if (predicate(field.value)) {
		//				delta.applyTo(field);
		//				return true;
		//			}
		//		});
		//
		//		/* if none apply, throw an appropriate error */
		//		if (!success) {
		//			if (this.type.length === 0) {
		//				throw new Error(`This overloaded delta has no overloads, so cannot apply to the value: ${field.value}`);
		//			} else if (this.type.length === 1) {
		//				throw new Error(`Delta type ${this.type[0]} does not apply to the value: ${field.value}`);
		//			} else {
		//				throw new Error(`None of the delta types ${this.type.join(',')} apply to the value: ${field.value}`);
		//			}
		//		}
		//	}
		//});
		////--------------------------------------------------------------------------------------------(/OverloadedDelta)



		// TODO: composition function for OverloadedDelta



		/* define the fundamental 'Modify' delta *///-----------------------------------------------------------(Modify)
		this.operations.Modify = U.newSubclass(this.operations.Delta, (superFn) => function (arg, meta) {
			superFn.call(this, arg, meta);
			this.deltas = {};
			// TODO: allow operations to be added through an optional argument
		}, {
			get type() { return 'Modify' },

			/** {@public}{@abstract}{@method}{@nosideeffects}
			 * @return {DeltaJs#operations.Modify} - a clone of this delta
			 */
			clone() {
				var result = thisDeltaJs.operations.Delta.prototype.clone.call(this, this.arg, this.meta); // super()
				Object.keys(this.deltas).forEach((prop) => {
					result.deltas[prop] = this.deltas[prop].clone();
				});
				return result;
			},

			/** {@public}{@method}
			 * @param field {DeltaJs.WritableField}
			 */
			applyTo(field) {
				U.assert(U.isDefined(field.value),
						`The 'Modify' operation expects the property to be defined.`);
				U.assert(field.value instanceof Object,
						`The 'Modify' operation expects the property to be an Object.`);
				Object.keys(this.deltas).forEach((prop) => {
					this.deltas[prop].applyTo(wf(field.value, prop));
				});
			},

			/** {@public}{@method}
			 * @param obj  {Object}
			 */
			applyToPropertiesOf(obj) {
				U.assert(U.isDefined(obj),
						`The 'Modify' operation expects the property to be defined.`);
				U.assert(obj instanceof Object,
						`The 'Modify' operation expects the property to be an Object.`);
				Object.keys(this.deltas).forEach((prop) => {
					this.deltas[prop].applyTo(wf(obj, prop));
				});
			},

			/** {@public}{@method}
			 * @param path {String}
			 */
			modify(path) {
				return this._addOperation('Modify', path);
			},

			/** {@private}{@method}
			 * @param opType {String}
			 * @param path   {String}
			 * @param arg    {*}
			 * @param meta   {Object} - meta information about the operation
			 * @return {{prop: String, result: DeltaJs#operations.modify}} - the deepest 'Modify' delta involved in this method-call
			 */
			_preProcessNewOperation(opType, path, arg, meta) {

				/* dissect the 'path' string */
				////////////////////////  11111  22222222222  33  //
				var match = path.match(/^([.#]?)(\w+|\(\w+\))(.*)$/);
				U.assert(match, `The path string '${path}' is not well formed.`);
				var [, lead, prop, rest] = match;
				var result = null;

				if (lead === '#') {
					/* if 'path' has a leading '#' character, transform it and recall this method */
					// the # separator expects the current object to be a constructor function,
					// and yields a delta to modify new instances of the corresponding class
					result = this._addOperation(opType, `.(instance).${prop}${rest}`, arg, meta);
				} else if (rest.length > 0) {
					/* if there is a longer chain, call this method recursively */
					// recurse....indirectly...directly
					result = this.modify(prop)._addOperation(opType, rest, arg, meta);
				}

				return {prop, result};
			},

			/** {@private}{@method}
			 * @param opType {String}
			 * @param path   {String}
			 * @param arg    {*}
			 * @param meta   {Object} - meta information about the operation
			 * @return {DeltaJs#operations.modify} - the deepest 'Modify' delta involved in this method-call
			 */
			_addOperation(opType, path, arg, meta) {

				/* pre-process the arguments, possibly already get the result by delegation */
				var {prop, result} = this._preProcessNewOperation(opType, path, arg, meta);
				if (result) { return result }

				/* at this point, we construct the new delta */
				var newDelta = new thisDeltaJs.operations[opType](arg, meta);

				/* do we need to compose the new delta with an existing one? */
				if (this.deltas[prop]) {
					var composition = this.deltas[prop] = this.deltas[prop].compose(newDelta);

					/*  if the result should be a 'Modify' to accommodate further operations,           */
					/*  but the composition isn't, return a 'Modify' targeted at the composition value  */
					if (opType === 'Modify' && composition.type !== 'Modify') {
						return new thisDeltaJs.operations.TargetedModify(composition.arg, meta);
					}

					return composition.type === 'Modify' ? composition : this;
				}

				/* there was no operation on that property yet; add it */
				this.deltas[prop] = newDelta;
				return newDelta.type === 'Modify' ? newDelta : this;

			}
		});
		//-----------------------------------------------------------------------------------------------------(/Modify)


		// In order to process delta compositions like
		//     delta.add('obj', {});
		//     delta.modify('obj');
		// and still return 'Modify' deltas to the user for further operations,
		// we need temporary 'Modify' deltas that remember their target, which
		// we will call 'targeted deltas'.

		/* define the 'TargetedModify' delta subclass *///----------------------------------------------(targetedModify)
		// TODO: MAYBE? create generic TargetedDelta class that HAS a delta to apply to its target?
		this.operations.TargetedModify = U.newSubclass(this.operations.Modify, (superFn) => function (target, arg, meta) {
			superFn.call(this, arg, meta);
			this.target = target;
		}, {

			/** {@public}{@abstract}{@method}{@nosideeffects}
			 * @return {DeltaJs#operations.TargetedModify} - a clone of this delta
			 */
			clone() {
				var result = this.operations.Modify.prototype.clone.call(this, this.arg, this.meta); // super()
				result.target = this.target;
				return result;
			},

			/** {@public}{@method}
			 * Targeted deltas can't be applied TO anything.
			 * This method is overwritten to avoid mistakes.
			 */
			applyTo() { throw new Error(`TargetedModify deltas cannot be applied TO anything.`) },

			/** {@private}{@method}
			 *
			 * @param opType {String}
			 * @param path   {String}
			 * @param arg    {*}
			 * @param meta   {Object} - meta information about the operation
			 * @return {DeltaJs#operations.modify} - the deepest 'Modify' delta involved in this method-call
			 */
			_addOperation(opType, path, arg, meta) {
				/* pre-process the arguments, possibly already get the result by delegation */
				var {prop, result} = this._preProcessNewOperation(opType, path, arg, meta);
				if (result) { return result }

				/* if the new delta should be a 'Modify' delta, it is a targeted delta */
				if (opType === 'Modify') {
					var newDelta = new thisDeltaJs.operations.TargetedModify(arg, meta);
					newDelta.target = this.target[prop];
					return newDelta;
				}

				/* apply the new delta to its target, discard it and return 'this' delta */
				(new thisDeltaJs.operations[opType](arg, meta)).applyTo(wf(this.target, prop));
				return this;
			}

		});
		//---------------------------------------------------------------------------------------------(/targetedModify)


		/* set the foundation of the compositions array */
		this.compositions['Modify'] = { 'Modify': [] };


		/* define standard operations */
		this._defineStandardOperationTypes();


	}, /** @lends DeltaJs.prototype */  {

		/** {@public}{@property}
		 * quick access to the 'Modify' delta constructor
		 */
		get Delta() { return this.operations.Modify },

		///** {@public}{@method}
		// *
		// */
		//vp(vpName, val) {
		//	// TODO
		//},

		/** {@public}{@method}
		 *
		 * @param name    {String}
		 * @param applyTo {(DeltaJs.WritableField) => undefined}
		 */
		newOperationType(name, {construct, applyTo, methods, clone}) {

			/* sanity checks */
			U.assert(!this.operations[name],
					`The '${name}' operation type already exists.`);

			/* create the corresponding method(s) in the 'Modify' class */
			// if no methods are provided, use the operation name starting with a lowercase letter
			methods = methods || [ name[0].toLowerCase()+name.slice(1) ];
			methods.forEach((method) => {
				this.operations.Modify.prototype[method] = function (prop, arg) {
					return this._addOperation(name, prop, arg, { method });
				};
			});

			/* put the right foundation in 'this.composition' */
			this.compositions[name] = {};
			Object.keys(this.compositions).forEach((type) => {
				U.assert(!this.compositions[type][name]);
				U.assert(!this.compositions[name][type]);
				this.compositions[type][name] = [];
				this.compositions[name][type] = [];
			});

			/* create the Delta subclass representing this operation type *///-----------------------------------(other)
			this.operations[name] = U.newSubclass(this.operations.Delta, (superFn) => function (arg, meta) {
				superFn.call(this, arg, meta);
				if (construct) { construct.call(this) }
			}, U.extend({
				type: name,
				applyTo: applyTo
			}));
			if (U.isDefined(clone)) { this.operations[name].prototype.clone = clone }
			//--------------------------------------------------------------------------------------------------(/other)

		},

		/** {@public}{@method}
		 *
		 * @param predicate {(DeltaJs#operations.Delta, DeltaJs#operations.Delta) => Boolean} - can these deltas be composed this way?
		 * @param compose   {(DeltaJs#operations.Delta, DeltaJs#operations.Delta) => DeltaJs#operations.Delta} - should be side-effect free
		 */
		newComposition(predicate, compose) {
			this.compositions.push({predicate, compose});
		},

		/** {@private}{@method}
		 *
		 */
		_defineStandardOperationTypes() {

			var thisDeltaJs = this;

			/* convenience definitions for the application and composition functions below */
			function t(type1, type2) { return (d1, d2) => (d1.type === type1 && d2.type === type2) }
			function d(type, fn = null) {
				if (typeof fn === 'string') { fn = ((v) => (o) => o[v])(fn) }
				if (fn) {
					return (d1, d2) => new (thisDeltaJs.operations[type])(fn({d1, d2, p1: d1.arg, p2: d2.arg}));
				} else {
					return (d1, d2) => new (thisDeltaJs.operations[type])();
				}
			}
			//function d1({d1: v}) { return v }
			//function d2({d2: v}) { return v }
			//function p1({p1: v}) { return v }
			function p2({p2: v}) { return v }
			function assertDefined(val, opType) {
				U.assert(U.isDefined(val),
						`The operation '${opType}' expects the property to be defined.`);
			}
			function assertUndefined(val, opType) {
				U.assert(U.isUndefined(val),
						`The operation '${opType}' expects the property to be undefined.`);
			}
			function assertArray(val, opType) {
				U.assert(Array.isArray(val),
						`The operation '${opType}' expects the property to be an array.`);
			}

			// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /

			/* declaring the basic operation types **********************************************/
			// 'Modify' is the most fundamental operation,
			//  and is defined above rather than here
			this.newOperationType('Add', {
				applyTo(field) {
					assertUndefined(field.value, 'Add');
					field.value = this.arg;
				}
			});
			this.newOperationType('Remove', {
				applyTo(field) {
					assertDefined(field.value, 'Remove');
					field.delete();
				}
			});
			this.newOperationType('Forbid', {
				applyTo(field) {
					assertUndefined(field.value, 'Forbid');
				}
			});
			this.newOperationType('Replace', {
				applyTo(field) {
					assertDefined(field.value, 'Replace');
					field.value = this.arg;
				}
			});

			/* composition - introducing 'Modify' ***********************************************/
			this.newComposition( t('Modify', 'Modify'), (d1, d2) => {
				var result = d1.clone();
				Object.keys(d2.deltas).forEach((prop) => {
					result.deltas[prop].compose(d2.deltas[prop]);
				});
				return result;
			});

			/* composition - introducing 'Add' **************************************************/
			//this.newComposition( t('Add', 'Modify'), applyD2ToP1 );
			this.newComposition( t('Add', 'Modify'), d('Add', ({d2, p1}) => d2.appliedTo(p1)) );

			/* composition - introducing 'Remove' ***********************************************/
			this.newComposition( t('Modify', 'Remove'), d('Remove')      );
			this.newComposition( t('Add'   , 'Remove'), d('Forbid')      );
			this.newComposition( t('Remove', 'Add'   ), d('Replace', p2) );

			/* composition - introducing 'Forbid' ***********************************************/
			this.newComposition( t('Remove', 'Forbid'), d('Remove')  );
			this.newComposition( t('Forbid', 'Add'   ), d('Add', p2) );
			this.newComposition( t('Forbid', 'Forbid'), d('Forbid')  );

			/* composition - introducing 'Replace' **********************************************/
			this.newComposition( t('Modify' , 'Replace'), d('Replace', p2)                             );
			this.newComposition( t('Add'    , 'Replace'), d('Add', p2)                                 );
			this.newComposition( t('Replace', 'Modify' ), d('Replace', ({d2, p1}) => d2.appliedTo(p1)) );
			this.newComposition( t('Replace', 'Remove' ), d('Remove')                                  );
			this.newComposition( t('Replace', 'Replace'), d('Replace', p2)                             );

			/* declaring the array operation type ***********************************************/
			this.newOperationType('Put', {
				construct() {
					if (this.meta.method) {
						this.values = [{
							method: this.meta.method,
							value: this.arg
						}];
					} else {
						this.values = [];
					}
				},
				clone() {
					var result = thisDeltaJs.operations.Delta.prototype.clone.call(this, this.arg, this.meta); // super()
					result.values = [];
					this.values.forEach((v) => { result.values.push(v) });
					return result;
				},
				applyTo(field) {
					assertDefined(field.value, 'Put');
					assertArray(field.value, 'Put');
					var arr = field.value;
					this.values.forEach(({method, value}) => {
						switch (method) {
							case 'prepend': {
								arr.unshift(value);
							} break;
							case 'insert': {
								// 'insert' doesn't *have* to use a random position. Any position will do.
								//  E.g., its implementation could just be the same as for 'append'.
								//  Nonetheless, we use a random position to force the tests to be permissive.
								var position = Math.floor(Math.random() * (arr.length + 1));
								arr.splice(position, 0, value);
							} break;
							case 'append': {
								arr.push(value);
							} break;
						}
					});
				},
				methods: ['prepend', 'insert', 'append']
			});

			/* composition - introducing 'Replace' **********************************************/
			this.newComposition( t('Add'    , 'Put'    ), d('Add',     ({d2, p1}) => d2.appliedTo(p1)) );
			this.newComposition( t('Replace', 'Put'    ), d('Replace', ({d2, p1}) => d2.appliedTo(p1)) );
			this.newComposition( t('Put'    , 'Remove' ), d('Remove')                                  );
			this.newComposition( t('Put'    , 'Replace'), d('Replace', p2)                             );
			this.newComposition( t('Put'    , 'Put'    ), (d1, d2) => {
				var result = new thisDeltaJs.operations.Put();
				result.values = (d1.values).concat(d2.values);
				return result;
			});

			//this.newOperationType('DeltaModel', function applyTo(field) {
			//	this.arg.topologically((subDelta) => {
			//		// the graph is allowed to contain 'null' vertices for ordering purposes
			//		if (subDelta) { subDelta.applyTo(field) }
			//	});
			//}, {
			//
			//});
			//
			//
			///* composition - introducing 'DeltaModel' *******************************************/
			//// to compose delta models, we simply have one apply after the other
			//// without any composability checks; in the future, this may become more clever
			//var orderedBySimpleDeltaModel = (d1, d2) => {
			//	var graph = new JsGraph();
			//	graph.addNewVertex(1, d1);
			//	graph.addNewVertex(2, d2);
			//	graph.addNewEdge(1, 2);
			//	return new deltaJs.operations.DeltaModel(graph);
			//};
			//this.newComposition(d('Modify',      'DeltaModel'), orderedBySimpleDeltaModel);
			//this.newComposition(d('Add',         'DeltaModel'), orderedBySimpleDeltaModel);
			//this.newComposition(d('Remove',      'DeltaModel'), orderedBySimpleDeltaModel);
			//this.newComposition(d('Forbid',      'DeltaModel'), orderedBySimpleDeltaModel);
			//this.newComposition(d('Replace',     'DeltaModel'), orderedBySimpleDeltaModel);
			//this.newComposition(d('DeltaModel',  'Modify'),     orderedBySimpleDeltaModel);
			//this.newComposition(d('DeltaModel',  'Add'),        orderedBySimpleDeltaModel);
			//this.newComposition(d('DeltaModel',  'Remove'),     orderedBySimpleDeltaModel);
			//this.newComposition(d('DeltaModel',  'Forbid'),     orderedBySimpleDeltaModel);
			//this.newComposition(d('DeltaModel',  'Replace'),    orderedBySimpleDeltaModel);
			//this.newComposition(d('DeltaModel',  'DeltaModel'), orderedBySimpleDeltaModel);

		}

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	});


	/* the WritableField class */
	DeltaJs.WritableField = U.newClass(function (obj, prop) {
		this.obj  = obj;
		this.prop = prop;
	}, {
		get value()  { return this.obj[this.prop] },
		set value(v) { this.obj[this.prop] = v },
		delete() { delete this.obj[this.prop] }
	});
	function wf(obj, prop) { return new DeltaJs.WritableField(obj, prop) }


	/* export the main class */
	return DeltaJs;


});
