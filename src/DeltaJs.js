/* import external libraries */
import JsGraph from 'js-graph';


/* import internal stuff */
import U                                          from './misc.js';
import { ReadableTarget, WritableTarget, rt, wt } from './Target.js';
import Path                                       from './Path.js';
import {
	ApplicationError,
	MultipleOverloadsApplicationError,
	NoOverloadsApplicationError,
	DeltaArgApplicationError,
	CompositionError,
	MultipleOverloadsCompositionError
} from './Error.js';


/** {@class}
 * This class offers every functionality you need from delta modeling.
 * Each instance offers its own operation types and variation points.
 * You will usually need only one instance per application.
 */
export default U.newClass(function DeltaJs() {

	/* 'this' alias */
	var thisDeltaJs = this;

	/* the things instances of 'DeltaJs' keeps track of */
	this.operations = {};   // property -> Delta-subclass
	this.compositions = []; // [{precondition, composeFn}]
	this._onNewOperationTypeListeners = [];

	/* Delta ********************************************************************************************** Delta */
	var nextUUID = 1;
	var Delta = this.Delta = U.newClass(function (arg, meta) {
		this.arg = arg;
		this.meta = U.extend({}, meta || {}, { uuid: nextUUID++ });
	}, {
		/** {@public}{@abstract}{@method}{@nosideeffects}
		 * This method should be overwritten by subclasses to make a clone of 'this' delta.
		 * @return {DeltaJs#Delta} - a clone of this delta
		 */
		clone() { return new this.constructor(this.arg, this.meta) },

		/** {@public}{@method}{@nosideeffects}
		 * @param  value {*} - any given value
		 * @return the value resulting in this delta being applied to the given `value`
		 */
		appliedTo(value) {
			if (value instanceof ReadableTarget) { value = value.value }
			if (typeof value.clone === 'function') { value = value.clone() }
			var obj = { value };
			this.applyTo(wt(obj, 'value'));
			return obj.value;
		},

		/** {@public}{@method}{@nosideeffects}
		 * @param other {DeltaJs#Delta} - the other delta to compose with
		 * @return {DeltaJs#Delta} - the composed delta
		 */
		composedWith(other) { return thisDeltaJs.composed(this, other) },

		/** {@public}{@method}
		 * @param prop {String?}
		 */
		toString(options = {}) {
			var str = this.type;
			if (this.meta.targetProp)  { str += ` ‹${this.meta.targetProp}›` }
			if (U.isDefined(this.arg)) { str += `: ${JSON.stringify(this.arg)}` }
			if (options.debug)         { str += ` (${this.meta.uuid})` }
			return str;
		},
	});


	/* CompositeDelta **************************************************************************** CompositeDelta */
	var CompositeDelta = this.operations.CompositeDelta = U.newSubclass(Delta, {
		/** {@public}{@abstract}{@method}
		 * Implement this in subclasses to prepare a specific delta operation with this delta as the base.
		 * @return {DeltaJs#Delta} - the delta resulting from the operation
		 */
		operation() {
			throw new Error(`A CompositeDelta subclass needs to implement the 'operation' method.`);
		}
	});
	(() => {
		var operationMethods = {};
		this.onNewOperationType((cls) => {
			(cls.meta && cls.meta.methods || []).forEach((method) => {
				if (U.isUndefined(operationMethods[method])) {
					operationMethods[method] = function (...args) {
						var newDelta = this._applyOperationMethod.apply(this, [method].concat(args));
						return thisDeltaJs.facade(
							(newDelta instanceof CompositeDelta) ? newDelta : this.delta
						);
					};
				}
			});
		});

		/** {@public}{@method DeltaJs#facade}{@nosideeffects}
		 * @param delta {DeltaJs#operations.CompositeDelta} - the other delta to compose with
		 * @return {DeltaJs#Delta} - the composed delta
		 */
		this.facade = function facade(delta) {
			/* the facade itself */
			// The facade object exposes operations methods directly, but arguments to
			// those operations can partly be given through function-call notation.
			// Therefore, a facade is a function, storing arguments that are already given.
			var fcd = function (...args) {
				var result = facade(delta);
				result._args = fcd._args.concat(args);
				return result;
			};
			fcd._args = [];
			U.extend(fcd, operationMethods, {
				_applyOperationMethod(method, ...finalArgs) {
					return delta.operation.apply(delta, [method].concat(fcd._args).concat(finalArgs));
				},
				delta: delta
			});
			return fcd;
		};

	})();

	/** {@public}{@method DeltaJs#facade}{@nosideeffects}
	 * @return {Function} - the facade to this delta, for easily adding operations
	 */
	CompositeDelta.prototype.facade = function () { return thisDeltaJs.facade(this) };


	/* OverloadedDelta ************************************************************************** OverloadedDelta */
	this.overloads = {}; // method -> [delta-classes]
	var OverloadedDelta = this.operations['OverloadedDelta'] = U.newSubclass(this.Delta, (superFn) => function (arg, meta) {
		superFn.call(this, arg, meta);
		this.overloads = [];
	}, {
		/** {@public}{@abstract}{@method}{@nosideeffects}
		 * @return {DeltaJs#operations.OverloadedDelta} - a clone of this delta
		 */
		clone() {
			var result = thisDeltaJs.Delta.prototype.clone.call(this, this.arg, this.meta); // super()
			result.overloads = this.overloads.map(delta => delta.clone());
			return result;
		},

		/** {@public}{@method}
		 * @param target {DeltaJs.WritableTarget}
		 */
		applyTo(target) {
			/* apply the first overload that applies to the target; gather any errors */
			var errors = [];
			var success = this.overloads.some((delta) => {
				var judgment = thisDeltaJs._evaluatePrecondition(delta, target);
				if (judgment !== true) {
					errors.push(judgment);
					return false;
				}
				delta.applyTo(target);
				return true;
			});
			/* if none apply, throw an appropriate error */
			if (!success) {
				if (errors.length === 0) {
					throw new NoOverloadsApplicationError(this, target.value);
				} else if (errors.length === 1) {
					throw errors[0];
				} else {
					throw new MultipleOverloadsApplicationError(this, target.value, errors);
				}
			}
		},

		/** {@public}{@method}
		 * @param prop {String?}
		 */
		toString(options) {
			var str = Delta.prototype.toString.call(this, options);
			var overloads = this.overloads.map((delta) => delta.toString(options)).join('\n');
			str += '\n' + U.indent(overloads, 4);
			return str;
		}
	});
	OverloadedDelta.type = OverloadedDelta.prototype.type = 'OverloadedDelta';
	OverloadedDelta.meta = OverloadedDelta.prototype.meta = {
		methods: []
	};
	this.newComposition((d1, d2) => (d1 instanceof OverloadedDelta || d2 instanceof OverloadedDelta), (d1, d2) => {
		var D1 = d1 instanceof OverloadedDelta ? d1.overloads : [d1];
		var D2 = d2 instanceof OverloadedDelta ? d2.overloads : [d2];
		var result = new OverloadedDelta();
		var errors = [];
		D1.forEach((delta1) => {
			D2.forEach((delta2) => {
				try { result.overloads.push(delta1.composedWith(delta2)) }
				catch (error) { errors.push(error) }
			});
		});
		if (result.overloads.length === 0) { throw new MultipleOverloadsCompositionError(d1, d2, errors) }
		return result;
	});


	/* Modify ******************************************************************************************** Modify */
	var Modify = this.operations['Modify'] = U.newSubclass(CompositeDelta, (superFn) => function (__, meta) {
		superFn.call(this, __, meta);
		this.deltas = {};
	}, {
		/** {@public}{@abstract}{@method}{@nosideeffects}
		 * @return {DeltaJs#operations.Modify} - a clone of this delta
		 */
		clone() {
			var result = thisDeltaJs.Delta.prototype.clone.call(this, this.arg, this.meta); // super()
			Object.keys(this.deltas).forEach((prop) => {
				result.deltas[prop] = this.deltas[prop].clone();
			});
			return result;
		},

		/** {@public}{@method}
		 * @param target {*}
		 */
		precondition(target) { return target.value instanceof Object },

		/** {@public}{@method}
		 * @param target {DeltaJs.WritableTarget}
		 */
		applyTo(target) {
			Object.keys(this.deltas).forEach((prop) => {
				this.deltas[prop].applyTo(wt(target.value, prop));
			});
		},

		/** {@public}{@method}
		 * @param prop {String?}
		 */
		toString(options) {
			var str = Delta.prototype.toString.call(this, options);
			if (Object.keys(this.deltas).length > 0) {
				var deltas = Object.keys(this.deltas).map((p) => this.deltas[p].toString(options)).join('\n');
				str += '\n' + U.indent(deltas, 4);
			}
			return str;
		},

		/** {@public}{@method}
		 * Prepare a specific delta operation with this Modify delta as the base.
		 * @param method {String}               - the type of operation (e.g., 'add', 'remove', etc.)
		 * @param pathOrOptions {Object|String} - the options for this operation, or just the path
		 * @param arg {*}                       - the argument to the operation
		 * @return {DeltaJs#Delta} - the delta resulting from the operation
		 */
		operation(method, options, path, arg) {
			if (typeof options === 'string') { [options, path, arg] = [{}, options, path] }
			var delta = thisDeltaJs._getDeltaByMethod(method, arg);
			return this._addOperation(options, new Path(path), delta);
		},

		/** {@private}{@method}
		 * @param options {Object}
		 * @param delta   {DeltaJs#Delta}
		 */
		_addOperation(options, path, delta) {
			/* if there is a 'rest' to the path, set a link in the chain */
			if (path.rest) {
				return this.operation('modify', path.prop)
					._addOperation(options, path.rest, delta);
			}

			/* store the new delta, possibly composed with an existing one */
			this.deltas[path.prop] = this.deltas[path.prop] ? this.deltas[path.prop].composedWith(delta) : delta;
			this.deltas[path.prop].meta.targetProp = path.prop;

			/* return the composed delta if it has an operations interface; otherwise, return the given delta */
			return (this.deltas[path.prop] instanceof CompositeDelta) ? this.deltas[path.prop] : delta;
		}
	});
	Modify.type = Modify.prototype.type = 'Modify';
	Modify.meta = Modify.prototype.meta = {
		methods: ['modify']
	};
	this._onNewOperationTypeListeners.forEach((fn) => { fn(Modify) });

	/* add this new type to the list of types associated with each method */
	if (!Array.isArray(this.overloads['modify'])) { this.overloads['modify'] = [] }
	this.overloads['modify'].push('Modify');


	/* standard operations ****************************************************************** standard operations */
	this._defineStandardOperationTypes();


}, /** @lends DeltaJs.prototype */ { /********************************************************* DeltaJs.prototype */

	///** {@public}{@method}
	// *
	// */
	//vp(vpName, val) {
	//	// TODO
	//},

	/** {@private}{@method}
	 * @param method {String}
	 * @param arg    {*}
	 * @return {DeltaJs#Delta}
	 */
	_getDeltaByMethod(method, arg) {
		var newDeltas = this.overloads[method]
			.map(type => new this.operations[type](arg, { method }));
		if (newDeltas.length === 1) {
			return newDeltas[0];
		} else { // newDeltas.length > 1
			var delta = new this.operations['OverloadedDelta'](arg, { method });
			delta.overloads = newDeltas;
			return delta;
		}
	},

	/** {@private}{@method}
	 * @param delta  {DeltaJs#Delta}
	 * @param target {DeltaJs.ReadableTarget}
	 * @return {Boolean|ApplicationError} - `true` if the precondition is satisfied, otherwise
	 *                                      `false` or an instance of `DeltaJs.ApplicationError`
	 */
	_evaluatePrecondition(delta, target) {
		if (typeof delta.precondition === 'function') {
			var judgment = delta.precondition(target);
			if (judgment instanceof ApplicationError) {
				return judgment;
			} else if (!judgment) {
				return new ApplicationError(delta, target.value);
			}
		}
		return true;
	},

	/** {@public}{@method}
	 * @param name      {String}
	 * @param prototype {Object}
	 */
	newOperationType(Superclass, name, prototype) {
		if (typeof Superclass === 'string') { [Superclass, name, prototype] = [undefined, Superclass, name] }
		prototype = prototype || {};

		/* 'this' alias */
		var thisDeltaJs = this;

		/* sanity checks */
		U.assert(!this.operations[name],
			`The '${name}' operation type already exists.`);

		/* Delta subclass */
		var cls = this.operations[name] = U.newSubclass(Superclass || this.Delta, (superFn) => function (arg, meta) {
			superFn.call(this, arg, meta);
			if (this.construct) { this.construct() }
		}, U.extend({}, prototype, {
			applyTo(target) {
				var judgment = thisDeltaJs._evaluatePrecondition(this, target);
				if (judgment !== true) { throw judgment }
				if (U.isDefined(prototype.applyTo)) { prototype.applyTo.call(this, target) }
			}
		}));
		cls.type = cls.prototype.type = name;
		cls.meta = cls.prototype.meta = {
			// if no methods are provided, use the operation name starting with a lowercase letter
			methods: prototype.methods || [ name[0].toLowerCase()+name.slice(1) ]
		};

		/* add this new type to the list of types associated with each method */
		cls.meta.methods.forEach((method) => {
			if (!Array.isArray(this.overloads[method])) { this.overloads[method] = [] }
			this.overloads[method].push(name);
		});

		/* notify listeners */
		this._onNewOperationTypeListeners.forEach((fn) => { fn(cls) });

		/* return the new class */
		return cls;

	},

	/** {@public}{@method}
	 * @param fn {(Function) => undefined} - a function that takes a subclass of `DeltaJs#Delta`
	 */
	onNewOperationType(fn) {
		this._onNewOperationTypeListeners.push(fn);
		Object.keys(this.operations).forEach((name) => {
			fn(this.operations[name]);
		});
	},

	/** {@public}{@method}
	 * @param precondition {(DeltaJs#Delta, DeltaJs#Delta) => Boolean} - can these deltas be composed this way?
	 * @param compose      {(DeltaJs#Delta, DeltaJs#Delta) => DeltaJs#Delta} - should be side-effect free
	 */
	newComposition(precondition, compose) {
		this.compositions.push({precondition, compose});
	},

	/** {@public}{@method}
	 * @param d1 {DeltaJs#Delta} - the first delta
	 * @param d2 {DeltaJs#Delta} - the second delta
	 * @return {DeltaJs#Delta} - the composed delta
	 */
	composed(d1, d2) {
		/* handle the cases where one or both arguments are undefined */
		if (U.isUndefined(d1)) { d1 = new this.operations['NoOp']() }
		if (U.isUndefined(d2)) { d2 = new this.operations['NoOp']() }

		/* use the first composition function for which these deltas satisfy the precondition */
		var composeFn = ()=>{};
		var success = this.compositions.some(({precondition, compose: fn}) => {
			if (precondition(d1, d2)) {
				composeFn = fn;
				return true; // success; break the loop
			}
		});

		/* throw an error on failure */
		if (!success) { throw new CompositionError(d1, d2) }

		/* return the result on success */
		return composeFn(d1, d2);
	},

	/** {@private}{@method}
	 *
	 */
	_defineStandardOperationTypes() {

		/* 'this' alias */
		var thisDeltaJs = this;

		/* convenience definitions for the application and composition functions below */
		function t(type1, type2) { return (d1, d2) => (d1.type === type1 && d2.type === type2) }
		function d(type, fn) {
			if (typeof fn === 'string') { fn = ((v) => (o) => o[v])(fn) }
			return (d1, d2) => new (thisDeltaJs.operations[type])(fn && fn({d1, d2, p1: d1.arg, p2: d2.arg}));
		}

		////////////////////////////////////////////////////////////////////////////////////////////////////////////
		/* declaring the basic operation types **********************************************/
		// 'Modify' is the most fundamental operation,
		//  and is defined above rather than here
		var NoOp = this.newOperationType('NoOp');
		this.newComposition( (d1, d2) => d1 instanceof NoOp, (d1, d2) => d2.clone() );
		this.newComposition( (d1, d2) => d2 instanceof NoOp, (d1, d2) => d1.clone() );

		////////////////////////////////////////////////////////////////////////////////////////////////////////////
		/* declaring the basic operation types **********************************************/
		// 'Modify' is the most fundamental operation, and is defined above rather than here.
		[
			['Add'    , 'add',     (target) => U.isUndefined(target.value)],
			['Replace', 'replace', (target) => U.isDefined  (target.value)]
		].forEach(([Type, type, pre]) => {
				// In the line directly below, 'this' cannot be used because of a bug in traceur:
				// https://github.com/google/traceur-compiler/issues/1631
				thisDeltaJs.newOperationType(Type, {
					construct()          { this.deltasToApplyToArg = []                                                      },
					precondition(target) {
						return target instanceof WritableTarget && pre(target);
					},
					applyTo(target)      { target.value = this.deltasToApplyToArg.reduce((v, d) => d.appliedTo(v), this.arg) },
					clone() {
						var result = thisDeltaJs.Delta.prototype.clone.call(this, this.arg, this.meta); // super()
						result.deltasToApplyToArg = this.deltasToApplyToArg.map(d => d);
						return result;
					},
					afterApplying(delta) {
						var result = this.clone();
						result.deltasToApplyToArg.push(delta);
						if (result.deltasToApplyToArg.reduce((d1, d2) => thisDeltaJs.composed(d1, d2))
								.precondition(wt(result, 'arg')) !== true) {
							throw new DeltaArgApplicationError(delta, this);
						}
						return result;
					},

					/** {@public}{@method}
					 * @param options {Object}
					 */
					toString(options) {
						var str = thisDeltaJs.Delta.prototype.toString.call(this, options);
						if (Object.keys(this.deltasToApplyToArg).length > 0) {
							var deltas = Object.keys(this.deltasToApplyToArg)
								.map((p) => this.deltasToApplyToArg[p].toString(options)).join('\n');
							str += '\n' + U.indent(deltas, 4);
						}
						return str;
					},
				});
			});
		this.newOperationType('Remove', {
			precondition(target) { return target instanceof WritableTarget && U.isDefined(target.value) },
			applyTo(target) { target.delete() }
		});
		this.newOperationType('Forbid', {
			precondition(target) { return U.isUndefined(target.value) }
		});

		/* composition - introducing 'Modify' ***********************************************/
		this.newComposition( t('Modify', 'Modify'), (d1, d2) => {
			var result = d1.clone();
			Object.keys(d2.deltas).forEach((prop) => {
				result.deltas[prop] = thisDeltaJs.composed(result.deltas[prop], d2.deltas[prop]);
			});
			return result;
		});

		/* composition - introducing 'Add' **************************************************/
		this.newComposition( t('Add', 'Modify'), (d1, d2) => d1.afterApplying(d2) );

		/* composition - introducing 'Remove' ***********************************************/
		this.newComposition( t('Modify', 'Remove'), d('Remove')                );
		this.newComposition( t('Add'   , 'Remove'), d('Forbid')                );
		this.newComposition( t('Remove', 'Add'   ), d('Replace', ({p2}) => p2) );

		/* composition - introducing 'Forbid' ***********************************************/
		this.newComposition( t('Remove', 'Forbid'), d('Remove')            );
		this.newComposition( t('Forbid', 'Add'   ), d('Add', ({p2}) => p2) );
		this.newComposition( t('Forbid', 'Forbid'), d('Forbid')            );

		/* composition - introducing 'Replace' **********************************************/
		this.newComposition( t('Modify' , 'Replace'), d('Replace', ({p2}) => p2)      );
		this.newComposition( t('Add'    , 'Replace'), d('Add',     ({p2}) => p2)      );
		this.newComposition( t('Replace', 'Modify'), (d1, d2) => d1.afterApplying(d2) );
		this.newComposition( t('Replace', 'Remove' ), d('Remove')                     );
		this.newComposition( t('Replace', 'Replace'), d('Replace', ({p2}) => p2)      );
		////////////////////////////////////////////////////////////////////////////////////////////////////////////


		////////////////////////////////////////////////////////////////////////////////////////////////////////////
		/* declaring the array operation type ***********************************************/
		this.newOperationType('PutIntoArray', {
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
				var result = thisDeltaJs.Delta.prototype.clone.call(this, this.arg, this.meta); // super()
				result.values = [];
				this.values.forEach((v) => { result.values.push(v) });
				return result;
			},
			precondition(target) { return U.isDefined(target.value) && Array.isArray(target.value) },
			applyTo(target) {
				var arr = target.value;
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

		/* composition - introducing 'PutIntoArray' **************************************************/
		this.newComposition( t('Add'    , 'PutIntoArray'    ), (d1, d2) => d1.afterApplying(d2) );
		this.newComposition( t('Replace', 'PutIntoArray'    ), (d1, d2) => d1.afterApplying(d2) );
		this.newComposition( t('PutIntoArray'    , 'Remove' ), d('Remove')                      );
		this.newComposition( t('PutIntoArray'    , 'Replace'), d('Replace', ({p2}) => p2)       );
		this.newComposition( t('PutIntoArray'    , 'PutIntoArray'    ), (d1, d2) => {
			var result = new thisDeltaJs.operations['PutIntoArray']();
			result.values = (d1.values).concat(d2.values);
			return result;
		});
		////////////////////////////////////////////////////////////////////////////////////////////////////////////


		////////////////////////////////////////////////////////////////////////////////////////////////////////////
		/* declaring the function operation type */
		this.newOperationType('PutIntoFunction', {
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
				var result = thisDeltaJs.Delta.prototype.clone.call(this, this.arg, this.meta); // super()
				result.values = [];
				this.values.forEach((v) => { result.values.push(v) });
				return result;
			},
			precondition(target) {
				return U.isDefined(target.value) && typeof target.value === 'function' &&
					(U.isDefined(target.value._DeltaJs_functions) || target instanceof WritableTarget);
			},
			applyTo(target) {
				if (U.isUndefined(target.value._DeltaJs_functions)) {
					var originalFn = target.value;
					var newFn = function (...args) {
						var result;
						newFn._DeltaJs_functions.forEach((fn) => {
							result = fn.apply(this, args);
						});
						//noinspection JSUnusedAssignment
						return result;
					};
					newFn._DeltaJs_functions = [function (...args) { originalFn.apply(this, args) }];
					target.value = newFn;
				}
				var arr = target.value._DeltaJs_functions;
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

		/* composition - introducing 'PutIntoFunction' **************************************************/
		this.newComposition( t('Add'            , 'PutIntoFunction'), (d1, d2) => d1.afterApplying(d2) );
		this.newComposition( t('Replace'        , 'PutIntoFunction'), (d1, d2) => d1.afterApplying(d2) );
		this.newComposition( t('PutIntoFunction', 'Remove'         ), d('Remove')                      );
		this.newComposition( t('PutIntoFunction', 'Replace'        ), d('Replace', ({p2}) => p2)       );
		this.newComposition( t('PutIntoFunction', 'PutIntoFunction'), (d1, d2) => {
			var result = new thisDeltaJs.operations['PutIntoFunction']();
			result.values = (d1.values).concat(d2.values);
			return result;
		});
		// TODO: Change 'append' and 'prepend' to follow any underlying partial order (delta model)
		////////////////////////////////////////////////////////////////////////////////////////////////////////////


		////////////////////////////////////////////////////////////////////////////////////////////////////////////
		///* declaring the 'DeltaModel' type */
		var DeltaModel = this.newOperationType(this.operations.CompositeDelta, 'DeltaModel', {
			construct() {
				this.graph = new JsGraph();
				//this._createOperationInterface((method, [name, pathOrOptions, arg]) => {
				//});
			},
			clone() {
				var result = new DeltaModel();
				result.graph = this.graph.clone();
				result.graph.eachVertex((id, delta) => {
					result.graph.setVertex(id, delta.clone());
				});
				return result;
			},
			applyTo(target) {
				this.graph.topologically((name, subDelta) => {
					subDelta.applyTo(target);
				});
			},

			/** {@public}{@method}
			 * Prepare a specific delta operation with this Modify delta as the base.
			 * @param method {String}  - the type of operation (e.g., 'add', 'remove', etc.)
			 * @param name {String}    - the name of the delta inside the delta model
			 * @param options {Object} - the (optional) options for this operation
			 * @param path {String}    - the path to perform this operation on
			 * @param arg {*}          - the argument to the operation
			 * @return {DeltaJs#Delta} - the delta resulting from the operation
			 */
			operation(method, name, options, path, arg) {
				if (typeof options === 'string') { [options, path, arg] = [{}, options, path] }
				var delta = thisDeltaJs._getDeltaByMethod(method, arg);
				return this._addOperation(name, options, new Path(path), delta);
			},

			/** {@public}{@method}
			 * @param prop {String?}
			 */
			toString(options) {
				var str = thisDeltaJs.Delta.prototype.toString.call(this, options);
				if (this.graph.vertexCount() > 0) {
					var deltas = '';
					this.graph.topologically((name, delta) => {
						deltas += `[${name}] ${delta.toString(options)}\n`;
					});
					str += '\n' + U.indent(deltas, 4);
				}
				return str;
			},

			_addOperation(name, options, path, delta) {
				var {before} = options;

				var deltaBase = delta;

				/* if there is a path, create the corresponding chain of deltas */
				if (path.prop) {
					deltaBase = new thisDeltaJs.operations['Modify']();
					deltaBase._addOperation(options, path, delta);
				}

				/* a delta by this name cannot already be in the graph */
				U.assert(!this.graph.vertexValue(name),
					`A delta by the name “${name}” is already in this delta model.`);

				/* add the new delta to the delta model */
				this.graph.addVertex(name, deltaBase);

				/* connect it to the partial order */
				// TODO: options, partial order, etc...
				(before || []).forEach((subordinateName) => {
					this.graph.createEdge(subordinateName, name);
				});

				return delta;
			}
			// TODO: add precondition method which checks 'source' deltas
		});

		/* composition - introducing 'DeltaModel' */
		// to compose delta models, we simply have one apply after the other
		// without any composability checks; in the future, this may become more clever
		this.newComposition((d1, d2) => (d1 instanceof DeltaModel || d2 instanceof DeltaModel), (d1, d2) => {
			var result = new DeltaModel();
			result.graph.addNewVertex(1, d1);
			result.graph.addNewVertex(2, d2);
			result.graph.addNewEdge(1, 2);
			return result;
		});
		////////////////////////////////////////////////////////////////////////////////////////////////////////////

	}

});
