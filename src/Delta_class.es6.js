/* import internal stuff */
import {extend, oncePer, isDefined, isUndefined, arraysEqual, swapLastTwo} from './util.es6.js';
import {ReadableTarget, wt}                                                from './Target.es6.js';
import {PreconditionFailure, CompositionError}                             from './Error.es6.js';
import define_Composed                                                     from './Composed.es6.js';


export default oncePer('Delta', (deltaJs) => {






	/**
	 * @class DeltaJs#Delta
	 */
	deltaJs.Delta = class Delta {

		constructor(...args) {
			this.id = ++deltaJs.Delta._nextID;
			this.args = args;
		}

		get arg()  { return this.args[0] }
		set arg(v) { this.args[0] = v }

		/**
		 * This method should be overwritten by subclasses to make a clone of 'this' delta.
		 * @abstract
		 * @nosideeffects
		 * @return {DeltaJs#Delta} - a clone of this delta
		 */
		clone() { return new this.constructor(this.arg) }

		/**
		 * @protected
		 * @param target                        {DeltaJs.ReadableTarget}
		 * @param options                       {object}
		 * @param options.skipWeakPreconditions {boolean}
		 * @return {Boolean|PreconditionFailure} - `true` if the precondition is satisfied, otherwise
		 *                                        `false` or an instance of `DeltaJs.PreconditionFailure`
		 */
		evaluatePrecondition(target, options = {}) {
			let {weak} = options;
			if (this.precondition) {
				let judgment = this.precondition(target, options);
				if (judgment instanceof PreconditionFailure) {
					return judgment;
				} else if (!judgment) {
					return new PreconditionFailure(this, target.value);
				}
			}
			return true;
		}

		/**
		 * @nosideeffects
		 * @param value   {*}       - any given value
		 * @param options {?object} - the (optional) options for this delta application
		 * @return {*} - the value resulting in this delta being applied to the given `value`
		 */
		appliedTo(value, options = {}) {
			if (value instanceof ReadableTarget)   { value = value.value   }
			if (typeof value.clone === 'function') { value = value.clone() }
			var obj = { value };
			this.applyTo(wt(obj, 'value'), options);
			return obj.value;
		}

		/**
		 * @param options {object?}
		 * @return {string}
		 */
		toString(options = {}) {
			var str = this.type;
			if (options.targetProp)   { str += ` ‹${options.targetProp}›`                               }
			if (this.args.length > 0) { str += `: ${this.args.map((a) => JSON.stringify(a)).join(',')}` }
			if (options.debug)        { str += ` (${this.id})`                                          }
			return str;
		}

	};
	deltaJs.Delta._nextID = 0;


	let _multiDispatchOptions = new Map();

	/**
	 * To create new 'multiple dispatch' functions for mixed types of deltas.
	 * Any number of candidate functions can be created,
	 * which are then selected based on their precondition predicates.
	 * @private
	 * @param name                        {string}
	 * @param staticMethodName            {string}
	 * @param methodName                  {string}
	 * @param options                     {object}
	 * @param [options.onTrue=undefined]  {function}
	 * @param [options.onFalse=undefined] {function}
	 * @param [options.onDefault=false]   {function|boolean}
	 * @param [options.commutative=false] {boolean}
	 * @param [options.arity=2]           {number}
	 */
	function newMultiDispatch(name, staticMethodName, methodName, options = {}) {

		/* set option defaults */
		if (isUndefined(options.commutative)) { options.commutative = false                                                  }
		if (isUndefined(options.arity))       { options.arity = 2                                                            }
		if (isUndefined(options.onTrue))      { options.onTrue  = (...args) => args.slice(0, options.arity)                  }
		if (isUndefined(options.onFalse))     { options.onFalse = () => { throw new Error(`Failure in finding a ${name}!`) } }
		if      (options.onDefault === 'onTrue')                                    { options.onDefault = options.onTrue  }
		else if (options.onDefault === 'onFalse' || isUndefined(options.onDefault)) { options.onDefault = options.onFalse }

		/* augment the options and store them */
		extend(options, {
			name, staticMethodName, methodName,
			creationMethodName: `new${name[0].toUpperCase()}${name.slice(1)}`,
			storageSymbol:      Symbol(`multiDispatch:${name}`)
		});
		_multiDispatchOptions.set(name, options);

		/* short names for all relevant options */
		let {creationMethodName, storageSymbol, onTrue, onFalse, onDefault, commutative, arity} = options;

		/* set static Delta members */
		extend(deltaJs.Delta, {
			[storageSymbol]: [],
			[creationMethodName](precondition, value, options = {}) {
				if (isUndefined(options.weak)) { options.weak = false }
				if (isUndefined(deltaJs.Delta[storageSymbol])) {
					deltaJs.Delta[storageSymbol] = [];
				} // TODO: investigate why this is sometimes necessary
				deltaJs.Delta[storageSymbol].push({ precondition, value, options });
			},
			[staticMethodName](...args) {
				let deltas      = args.slice(0, arity),
				    callOptions = args[arity] || {};

				/* defaults */
				if (isUndefined(callOptions.weak)) { callOptions.weak = false }

				/* use the first composition function for which these deltas satisfy the precondition */
				let fn        = ()=>{},
				    found     = false,
				    commuting = false;
				if (isUndefined(deltaJs.Delta[storageSymbol])) {
					deltaJs.Delta[storageSymbol] = [];
				} // TODO: investigate why this is sometimes necessary
				for (let {precondition, value, options} of deltaJs.Delta[storageSymbol]) {
					if (options.weak && !callOptions.weak) { continue } // only test weak rules when doing weak invocation
					if (precondition(...deltas)) {
						fn = value;
						found = true;
						break;
					} else if (commutative && precondition(...swapLastTwo(deltas))) {
						fn = value;
						found = true;
						commuting = true;
						break;
					}
				}

				/* if no function was found, set the proper function */
				if      (!found)       { fn = onDefault }
				else if (fn === false) { fn = onFalse   }
				else if (fn === true)  { fn = onTrue    }

				/* return the result */
				if (commuting) { return fn(...swapLastTwo(deltas), callOptions) }
				else           { return fn(...deltas,              callOptions) }
			}
		});

		/* set instance Delta members */
		extend(deltaJs.Delta.prototype, {
			[methodName](...args) {
				return deltaJs.Delta[staticMethodName](this, ...args);
			}
		});

		/* set static DeltaJs members */
		oncePer(deltaJs.constructor, `multiDispatch:${name}`, () => {
			extend(deltaJs.constructor.prototype, {
				[creationMethodName](precondition, value, options = {}) {
					return this.Delta[creationMethodName](precondition, value, options);
				}
			});
		});
	}

	function customMultiDispatchGiven(name, ...deltas) {
		let {storageSymbol, commutative} = _multiDispatchOptions.get(name);
		for (let {precondition, value} of deltaJs.Delta[storageSymbol]) {
			if (precondition(...deltas) || commutative && precondition(...swapLastTwo(deltas))) {
				return typeof value === 'function';
			}
		}
		return false;
	}

	////////////////////////////////////////////////////////////////////////////////
	newMultiDispatch('composition', '_binaryComposed', 'composedWith', {
		onTrue:    (d1, d2, opt) => new deltaJs.Delta.Composed([d1, d2], opt),
		onFalse:   (d1, d2) => { throw new CompositionError(d1, d2) },
		onDefault: 'onFalse'
	});
	deltaJs.Delta.composed = function composed(...args) {
		/* separate arguments */
		let options, deltas;
		if (!(args[args.length-1] instanceof deltaJs.Delta) && (typeof args[args.length-1] !== 'undefined')) {
			deltas  = args.slice(0, args.length-1);
			options = args[args.length-1];
		} else {
			deltas  = args;
			options = {};
		}
		/* compose the list of deltas, and pass the options to each binary composition */
		return deltas.map((d) => d || new deltaJs.Delta.NoOp())
			         .reduce((d1, d2) => deltaJs.Delta._binaryComposed(d1, d2, options), new deltaJs.Delta.NoOp());
	};
	////////////////////////////////////////////////////////////////////////////////
	newMultiDispatch('refinement', 'refines', 'refines', {
		onTrue:    (d1, d2) => true,
		onFalse:   (d1, d2) => false,
		onDefault: (d1, d2, opt) => d1.equals(d2, opt)
	});
	////////////////////////////////////////////////////////////////////////////////
	newMultiDispatch('equality', 'equal', 'equals', {
		onTrue:    (d1, d2) => true,
		onFalse:   (d1, d2) => false,
		onDefault: (d1, d2, opt) => {
			if (customMultiDispatchGiven('refinement', d1, d2)) {
				return d1.refines(d2, opt) && d2.refines(d1, opt);
			} else {
				return d1.type === d2.type && arraysEqual(d1.args, d2.args);
			}
		},
		commutative: true
	});
	////////////////////////////////////////////////////////////////////////////////
	newMultiDispatch('commutation', 'commute', 'commutesWith', {
		onTrue:    (d1, d2) => true,
		onFalse:   (d1, d2) => false,
		onDefault: (d1, d2, opt) => d1.composedWith(d2, opt).equals(d2.composedWith(d1, opt), opt),
		commutative: true
	});
	////////////////////////////////////////////////////////////////////////////////
	newMultiDispatch('resolution', 'resolves', 'resolves', {
		onTrue:    (d1, d2, d3) => true,
		onFalse:   (d1, d2, d3) => false,
		onDefault: (d1, d2, d3, opt) => deltaJs.Delta.composed(d2, d3, d1, opt)
		                        .equals(deltaJs.Delta.composed(d3, d2, d1, opt), opt),
		arity:       3,
		commutative: true
	});
	////////////////////////////////////////////////////////////////////////////////


	/* define deltaJs.Delta.Composed for use in compositions */
	define_Composed(deltaJs);


});
