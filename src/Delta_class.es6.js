/* import internal stuff */
import {extend, oncePer, isDefined, isUndefined, arraysEqual} from './util.es6.js';
import {ReadableTarget, wt}                                   from './Target.es6.js';
import {PreconditionFailure, CompositionError}                from './Error.es6.js';
import define_Composed                                        from './Composed.es6.js';


export default oncePer('Delta', (deltaJs) => {

	//
	//oncePer(deltaJs.constructor, 'Delta', () => {
	//
	//	extend(deltaJs.constructor.prototype, {
	//		newCommutation(precondition, predicate) {
	//			this.Delta.newCommutation(precondition, predicate);
	//		}
	//	});
	//
	//});


	deltaJs.Delta = class Delta {

		constructor(...args) {
			this.id = ++deltaJs.Delta._nextID;
			this.args = args;
		}

		get arg()  { return this.args[0] }
		set arg(v) { this.args[0] = v }

		/** {@public}{@abstract}{@method}{@nosideeffects}
		 * This method should be overwritten by subclasses to make a clone of 'this' delta.
		 * @return {DeltaJs#Delta} - a clone of this delta
		 */
		clone() { return new this.constructor(this.arg) }

		/** {@private}{@method}
		 * @param target {DeltaJs.ReadableTarget}
		 * @return {Boolean|PreconditionFailure} - `true` if the precondition is satisfied, otherwise
		 *                                        `false` or an instance of `DeltaJs.PreconditionFailure`
		 */
		evaluatePrecondition(target) {
			if (this.precondition) {
				var judgment = this.precondition(target);
				if (judgment instanceof PreconditionFailure) {
					return judgment;
				} else if (!judgment) {
					return new PreconditionFailure(this, target.value);
				}
			}
			return true;
		}

		/** {@public}{@method}{@nosideeffects}
		 * @param value   {*}       - any given value
		 * @param options {object?} - the (optional) options for this delta application
		 * @return {*} - the value resulting in this delta being applied to the given `value`
		 */
		appliedTo(value, options = {}) {
			if (value instanceof ReadableTarget)   { value = value.value   }
			if (typeof value.clone === 'function') { value = value.clone() }
			var obj = { value };
			this.applyTo(wt(obj, 'value'), options);
			return obj.value;
		}

		///**
		// * @public
		// * @method
		// * @nosideeffects
		// */
		//commutesWith(other) { return deltaJs.Delta.commute(this, other) }

		/** {@public}{@method}
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

		///**
		// * @public
		// * @static
		// * @method
		// *
		// */
		//static newCommutation(precondition, predicate) {
		//	deltaJs.Delta._commutations.push({precondition, predicate});
		//}

		///**
		// *
		// */
		//static commute(d1, d2, {weak} = {}) {
		//	for (let {precondition, predicate} of deltaJs.Delta._commutations) {
		//		if (precondition(d1, d2)) {
		//			return predicate(d1, d2);
		//		} else if (precondition(d2, d1)) {
		//			return predicate(d2, d1);
		//		}
		//	}
		//	return d1.composedWith(d2).equals(d2.composedWith(d1));
		//}

	};
	deltaJs.Delta._nextID = 0;
	//deltaJs.Delta._commutations = []; // [{precondition, predicate}]


	let _multiDispatchOptions = new Map();

	/**
	 * To create new 'multiple dispatch' functions for mixed types of deltas.
	 * Any number of candidate functions can be created,
	 * which are then selected based on their precondition predicates.
	 * @private
	 * @param name             {String}
	 * @param staticMethodName {String}
	 * @param methodName       {String}
	 * @param onTrue           {Function=undefined}
	 * @param onFalse          {Function=undefined}
	 * @param onDefault        {Function|Boolean=false}
	 * @param commutative      {Boolean}
	 */
	function newMultiDispatch(name, staticMethodName, methodName, {onTrue, onFalse, onDefault, commutative} = {}) {

		/* convenience variables */
		let creationMethodName = `new${name[0].toUpperCase()}${name.slice(1)}`;
		let storageSymbol = Symbol(`multiDispatch:${name}`);

		/* store the options */
		_multiDispatchOptions.set(name, { commutative, storageSymbol });

		/* set defaults */
		if (!onTrue)  { onTrue = (...args) => args }
		if (!onFalse) { onFalse = () => { throw new Error(`Failure in finding a ${name}!`) } }
		if (onDefault === 'onTrue')                { onDefault = onTrue  }
		if (onDefault === 'onFalse' || !onDefault) { onDefault = onFalse }

		/* set static Delta members */
		extend(deltaJs.Delta, {
			[storageSymbol]: [],
			[creationMethodName](precondition, value) {
				deltaJs.Delta[storageSymbol].push({ precondition, value });
			},
			[staticMethodName](d1, d2, d3) {
				/* use the first composition function for which these deltas satisfy the precondition */
				let fn = ()=>{};
				let found = false;
				let commuting = false;
				for (let {precondition, value} of deltaJs.Delta[storageSymbol]) {
					if (precondition(d1, d2, d3)) {
						fn = value;
						found = true;
						break;
					} else if (commutative && ( isDefined(d3)   && precondition(d1, d3, d2) ||
						                        isUndefined(d3) && precondition(d2, d1)     )) {
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
				if (commuting) {
					if (isDefined(d3)) { return fn(d1, d3, d2) }
					else               { return fn(d2, d1)     }
				} else                 { return fn(d1, d2, d3) }
			}
		});

		extend(deltaJs.Delta.prototype, {
			[methodName](...others) {
				return deltaJs.Delta[staticMethodName](this, ...others);
			}
		});

		oncePer(deltaJs.constructor, `multiDispatch:${name}`, () => {
			extend(deltaJs.constructor.prototype, {
				[creationMethodName](precondition, fn) {
					return this.Delta[creationMethodName](precondition, fn);
				}
			});
		});
	}

	function customMultiDispatchGiven(name, d1, d2, d3) {
		let storageSymbol = _multiDispatchOptions.get(name).storageSymbol;
		for (let {precondition, value} of deltaJs.Delta[storageSymbol]) {
			if (precondition(d1, d2, d3) || _multiDispatchOptions.get(name).commutative &&
			                                (isDefined(d3) && precondition(d1, d3, d2) ||
				                             isUndefined(d3) && precondition(d2, d1)   )) {
				return typeof value === 'function';
			}
		}
	}

	////////////////////////////////////////////////////////////////////////////////
	newMultiDispatch('composition', '_binaryComposed', 'composedWith', {
		onTrue:    (d1, d2) => new deltaJs.Delta.Composed([d1, d2]),
		onFalse:   (d1, d2) => { throw new CompositionError(d1, d2) },
		onDefault: 'onFalse'
	});
	deltaJs.Delta.composed = function composed(...deltas) {
		return deltas.map((d) => d || new deltaJs.Delta.NoOp())
			         .reduce(deltaJs.Delta._binaryComposed, new deltaJs.Delta.NoOp());
	};
	////////////////////////////////////////////////////////////////////////////////
	newMultiDispatch('commutation', 'commute', 'commutesWith', {
		onTrue:    (d1, d2) => true,
		onFalse:   (d1, d2) => false,
		onDefault: (d1, d2) => d1.composedWith(d2).equals(d2.composedWith(d1)),
		commutative: true
	});
	////////////////////////////////////////////////////////////////////////////////
	newMultiDispatch('refinement', 'refines', 'refines', {
		onTrue:    (d1, d2) => true,
		onFalse:   (d1, d2) => false,
		onDefault: (d1, d2) => d1.equals(d2)
	});
	////////////////////////////////////////////////////////////////////////////////
	newMultiDispatch('equality', 'equal', 'equals', {
		onTrue:    (d1, d2) => true,
		onFalse:   (d1, d2) => false,
		onDefault: (d1, d2) => {
			if (customMultiDispatchGiven('refinement', d1, d2)) {
				return d1.refines(d2) && d2.refines(d1);
			} else {
				return d1.type === d2.type && arraysEqual(d1.args, d2.args);
			}
		},
		commutative: true
	});
	////////////////////////////////////////////////////////////////////////////////
	newMultiDispatch('resolution', 'resolves', 'resolves', {
		onTrue:    (d1, d2, d3) => true,
		onFalse:   (d1, d2, d3) => false,
		onDefault: (d1, d2, d3) => deltaJs.Delta.composed(d2, d3, d1).equals(deltaJs.Delta.composed(d3, d2, d1)),
		commutative: true
	});
	////////////////////////////////////////////////////////////////////////////////


	/* define deltaJs.Delta.Composed for use in compositions */
	define_Composed(deltaJs);


});
