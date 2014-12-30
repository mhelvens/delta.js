define(['./misc.js', 'js-graph'], function (U/*, JsGraph*/) {
	'use strict';


	/** {@class DeltaJs}
	 *
	 */
	var DeltaJs = U.newClass(function DeltaJs() {


		/* alias for 'this' */
		var thisDeltaJs = this;


		/* the things instances of 'DeltaJs' keeps track of */
		this.operations = {};   // property -> Delta
		this.compositions = {}; // type1 -> type2 -> [composeFn]


		/* define the base 'Delta' class *///--------------------------------------------------------------------(Delta)
		this.operations.Delta = U.newClass(function (arg, meta) {
			this.arg = arg;
			this.meta = meta || {};
		}, {
			/** {@public}{@method}
			 *
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


		//this.overloads = {}; // method -> [delta-classes]
		//
		///* define the 'OverloadedDelta' class, which invokes deltas based on target predicates *///----(OverloadedDelta)
		//this.operations.OverloadedDelta = U.newSubclass(this.operations.Delta, (superFn) => function (arg, meta) {
		//	superFn.call(this, arg, meta);
		//}, {
		//	get type() { return this.overloads[this.meta.method].map((cls) => cls.type).join('|') },
		//
		//	/** {@public}{@method}
		//	 *
		//	 * @param field {WritableField}
		//	 */
		//	applyTo(field) {
		//		// TODO
		//	},
		//
		//	/** {@public}{@method}
		//	 *
		//	 * @param prop       {String}
		//	 * @param otherDelta {DeltaJs#operations.Delta}
		//	 */
		//	compose(prop, otherDelta) {
		//		// TODO
		//	},
		//
		//});
		////--------------------------------------------------------------------------------------------(/OverloadedDelta)


		/* define the fundamental 'Modify' delta *///-----------------------------------------------------------(Modify)
		this.operations.Modify = U.newSubclass(this.operations.Delta, (superFn) => function (arg, meta) {
			superFn.call(this, arg, meta);
			this.deltas = {};
			// TODO: allow operations to be added through an optional argument
		}, {
			get type() { return 'Modify' },

			/** {@public}{@method}
			 * @param field {DeltaJs.WritableField}
			 */
			applyTo(field) {
				U.assert(field.value instanceof Object,
						`The 'Modify' operation expects the property to be an already defined Object.`);
				Object.keys(this.deltas).forEach((prop) => {
					this.deltas[prop].applyTo(wf(field.value, prop));
				});
			},

			/** {@public}{@method}
			 * @param obj  {Object}
			 */
			applyToPropertiesOf(obj) {
				U.assert(obj instanceof Object,
						`The 'Modify' operation expects the property to be an already defined Object.`);
				Object.keys(this.deltas).forEach((prop) => {
					this.deltas[prop].applyTo(wf(obj, prop));
				});
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
			 * @param path {String}
			 */
			modify(path) {
				return this._addOperation('Modify', path);
			},

			/** {@private}{@method}
			 *
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

				/* at this point, we construct the new delta */
				var newDelta = new thisDeltaJs.operations[opType](arg, meta);

				/* do we need to compose the new delta with an existing one? */
				if (this.deltas[prop]) {
					var composition = this.deltas[prop] = this.compose(prop, newDelta);

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
		this.operations.TargetedModify = U.newSubclass(this.operations.Modify, (superFn) => function (target, arg, meta) {
			superFn.call(this, arg, meta);
			this.target = target;
		}, {

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
		this._defineObjectOperationTypes();
		this._defineArrayOperationTypes();
		this._defineDeltaModelOperationType();


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
		newOperationType(name, {construct, applyTo, methods}) {

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

		/** {@private}{@method}
		 *
		 */
		_defineObjectOperationTypes() {

			var deltaJs = this;

			// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /

			/* convenience definitions for the application and composition functions below */
			var error = (d1, p, d2) => { throw new Error(`You cannot follow '${d1[p].type}' with '${d2.type}'.`) };

			function d(type,  fn = (()=>null)) {
				if (typeof fn === 'string') { fn = ((v) => (o) => o[v])(fn) }
				return (d1, p, d2) => {
					var args = {
						d1: d1.deltas && d1.deltas[p],
						d2: d2,
						p1: d1.deltas && d1.deltas[p] && d1.deltas[p].arg && d1.deltas[p].arg,
						p2: d2.arg
					};
					return new (deltaJs.operations[type])(fn(args));
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

			// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /

			/* declaring the basic operation types */
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

			// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /

			/* composition - introducing 'Modify' ***********************************************/
			this.newComposition('Modify', 'Modify', (d1, p, d2) => {
				Object.keys(d2.deltas).forEach((prop) => {
					d1.compose(p, d2.deltas[prop]);
				});
				return d1.deltas[p];
			});

			/* composition - introducing 'Add' **************************************************/
			this.newComposition('Modify', 'Add'   , error);
			this.newComposition('Add'   , 'Add'   , error);
			this.newComposition('Add'   , 'Modify', d('Add', ({d1, d2}) => (d2.applyTo(wf(d1, 'arg')), d1.arg)));

			/* composition - introducing 'Remove' ***********************************************/
			this.newComposition('Modify', 'Remove', d('Remove'));
			this.newComposition('Add'   , 'Remove', d('Forbid'));
			this.newComposition('Remove', 'Modify', error);
			this.newComposition('Remove', 'Add'   , d('Replace', 'p2'));
			this.newComposition('Remove', 'Remove', error);

			/* composition - introducing 'Forbid' ***********************************************/
			this.newComposition('Modify', 'Forbid', error);
			this.newComposition('Add'   , 'Forbid', error);
			this.newComposition('Remove', 'Forbid', d('Remove'));
			this.newComposition('Forbid', 'Modify', error);
			this.newComposition('Forbid', 'Add'   , d('Add', 'p2'));
			this.newComposition('Forbid', 'Remove', error);
			this.newComposition('Forbid', 'Forbid', d('Forbid'));

			/* composition - introducing 'Replace' **********************************************/
			this.newComposition('Modify' , 'Replace', d('Replace', 'p2'));
			this.newComposition('Add'    , 'Replace', d('Add', 'p2'));
			this.newComposition('Remove' , 'Replace', error);
			this.newComposition('Forbid' , 'Replace', error);
			this.newComposition('Replace', 'Modify' , d('Replace', ({d1, d2}) => (d2.applyTo(wf(d1, 'arg')), d1.arg)));
			this.newComposition('Replace', 'Add'    , error);
			this.newComposition('Replace', 'Remove' , d('Remove'));
			this.newComposition('Replace', 'Forbid' , error);
			this.newComposition('Replace', 'Replace', d('Replace', 'p2'));

		},

		/** {@private}{@method}
		 *
		 */
		_defineArrayOperationTypes() {

			var deltaJs = this;

			// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /

			/* convenience definitions for the application and composition functions below */
			var error = (d1, p, d2) => { throw new Error(`You cannot follow '${d1[p].type}' with '${d2.type}'.`) };

			function d(type,  fn = (()=>null)) {
				if (typeof fn === 'string') { fn = ((v) => (o) => o[v])(fn) }
				return (d1, p, d2) => {
					var args = {
						d1: d1.deltas && d1.deltas[p],
						d2: d2,
						p1: d1.deltas && d1.deltas[p] && d1.deltas[p].arg,
						p2: d2.arg
					};
					return new (deltaJs.operations[type])(fn(args));
				};
			}

			function assertDefined(val, opType) {
				U.assert(U.isDefined(val),
						`The operation '${opType}' expects the property to be defined.`);
			}
			function assertArray(val, opType) {
				U.assert(Array.isArray(val),
						`The operation '${opType}' expects the property to be an array.`);
			}

			// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /

			/* declaring the array operation types */
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
								// 'Insert' doesn't *have* to use a random position. Any position will do.
								//  Nonetheless, we use a random position for testing purposes.
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
			this.newComposition('Modify' , 'Put'    , error);
			this.newComposition('Add'    , 'Put'    , d('Add', ({d1, d2}) => (d2.applyTo(wf(d1, 'arg')), d1.arg)));
			this.newComposition('Remove' , 'Put'    , error);
			this.newComposition('Forbid' , 'Put'    , error);
			this.newComposition('Replace', 'Put'    , d('Replace', ({d1, d2}) => (d2.applyTo(wf(d1, 'arg')), d1.arg)));
			this.newComposition('Put'    , 'Modify' , error);
			this.newComposition('Put'    , 'Add'    , error);
			this.newComposition('Put'    , 'Remove' , d('Remove'));
			this.newComposition('Put'    , 'Forbid' , error);
			this.newComposition('Put'    , 'Replace', d('Replace', 'p2'));
			this.newComposition('Put'    , 'Put'    , (d1, p, d2) => {
				var result = new deltaJs.operations.Put();
				result.values = (d1.deltas[p].values).concat(d2.values);
				return result;
			});




		},

		/** {@private}{@method}
		 *
		 */
		_defineDeltaModelOperationType() {

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
			//var orderedBySimpleDeltaModel = (d1, p, d2) => {
			//	var graph = new JsGraph();
			//	graph.addNewVertex(1, d1.deltas[p]);
			//	graph.addNewVertex(2, d2);
			//	graph.addNewEdge(1, 2);
			//	return d1.deltas[p] = new deltaJs.operations.DeltaModel(graph);
			//};
			//this.newComposition('Modify',     'DeltaModel', orderedBySimpleDeltaModel);
			//this.newComposition('Add',        'DeltaModel', orderedBySimpleDeltaModel);
			//this.newComposition('Remove',     'DeltaModel', orderedBySimpleDeltaModel);
			//this.newComposition('Forbid',     'DeltaModel', orderedBySimpleDeltaModel);
			//this.newComposition('Replace',    'DeltaModel', orderedBySimpleDeltaModel);
			//this.newComposition('DeltaModel', 'Modify',     orderedBySimpleDeltaModel);
			//this.newComposition('DeltaModel', 'Add',        orderedBySimpleDeltaModel);
			//this.newComposition('DeltaModel', 'Remove',     orderedBySimpleDeltaModel);
			//this.newComposition('DeltaModel', 'Forbid',     orderedBySimpleDeltaModel);
			//this.newComposition('DeltaModel', 'Replace',    orderedBySimpleDeltaModel);
			//this.newComposition('DeltaModel', 'DeltaModel', orderedBySimpleDeltaModel);

		}

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	});


	DeltaJs.WritableField = U.newClass(function (obj, prop) {
		this.obj  = obj;
		this.prop = prop;
	}, {
		get value()  { return this.obj[this.prop] },
		set value(v) { this.obj[this.prop] = v },
		delete() { delete this.obj[this.prop] }
	});
	function wf(obj, prop) { return new DeltaJs.WritableField(obj, prop) }



	return DeltaJs;


});
