/* import internal stuff */
import define_Delta from './Delta_class.es6.js';
import {CompositionError} from './Error.es6.js';
import {oncePer, assert, isDefined,
        isUndefined, arraysEqual, swapLastTwo} from './util.es6.js';


export default oncePer('operation types', (deltaJs) => {


	define_Delta(deltaJs);


	oncePer(deltaJs.constructor, 'operation types', (DeltaJs) => {
		Object.assign(DeltaJs.prototype, /** @lends DeltaJs.prototype */ {

			/**
			 * This method allows you to tell delta.js about a new kind of delta operation.
			 * This was also done for existing operations like `modify`, `add`, `remove`, and so on.
			 * @param  name           {string}   name of the new operation type
			 * @param  DeltaSubclass  {function} the new operation class
			 * @param [ProxySubclass] {function} the optional custom `Proxy` subclass for this operation-type
			 */
			newOperationType(name, DeltaSubclass, ProxySubclass) {
				/* sanity checks */
				assert(name[0] === name[0].toUpperCase(),
					`Names of delta operation classes must start with a capital letter - '${name}' does not.`);
				assert(isUndefined(this.Delta[name]),
					`The '${name}' operation type already exists.`);

				/* store the operation class */
				this.Delta[name] = DeltaSubclass;

				/* set the (optional) Proxy class */
				DeltaSubclass.Proxy = ProxySubclass;

				/* fetch certain given methods (if they exist) that need to be slightly augmented */
				var givenApplyTo  = DeltaSubclass.prototype.applyTo || (()=>{});

				/* augment the class prototype */
				Object.assign(DeltaSubclass.prototype, {
					applyTo(target, options = {}) {
						/* should this delta only be applied for a specific feature selection? */
						if (!this.selected) { return }

						/* if the target is not already in Target form, make it so now */
						if (!(target instanceof DeltaJs.ReadableTarget)) {
							target = new DeltaJs.ReadableTarget(target);
						}

						/* option defaults */
						if (isUndefined(options.weak)) { options.weak = false }

						/* does the target satisfy the precondition of the delta? */
						let judgment = this.evaluatePrecondition(target, options);
						if (judgment !== true) { throw judgment }

						/* OK, then apply it if a method to do so was included in the operation */
						givenApplyTo.call(this, target, options);
					},
					type: name
				});

				/* create any given methods with default handler */
				var lowercaseName = name[0].toLowerCase()+name.slice(1);
				for (let method of DeltaSubclass.prototype.methods || [lowercaseName]) {
					this.ContainerProxy.newProxyMethod(method, (...args) => new DeltaSubclass(...args));
				}
			}

		});
	});


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	/**
	 * Storing global properties for multi-dispatch types.
	 * @private
	 */
	let _multiDispatchOptions = new Map();

	/**
	 * To create new 'multiple dispatch' functions for mixed types of deltas.
	 * Any number of candidate functions can be created,
	 * which are then selected based on their precondition predicates.
	 * @private
	 * @param name                        {string}
	 * @param staticMethodName            {string}
	 * @param methodName                  {string}
	 * @param [options]                   {object}
	 * @param [options.onTrue]            {function}
	 * @param [options.onFalse]           {function}
	 * @param [options.onDefault=false]   {function|string}
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
		Object.assign(options, {
			name, staticMethodName, methodName,
			creationMethodName: `new${name[0].toUpperCase()}${name.slice(1)}`,
			storageSymbol:      Symbol(`_multiDispatch:${name}`)
		});
		_multiDispatchOptions.set(name, options);

		/* short names for all relevant options */
		let {creationMethodName, storageSymbol, onTrue, onFalse, onDefault, commutative, arity} = options;

		/* set static Delta members */
		// TODO: use Object.assign when [https://github.com/zloirock/core-js/issues/45] is fixed
		deltaJs.Delta[storageSymbol] = [];
		deltaJs.Delta[creationMethodName] = function (precondition, value, options = {}) {
			if (isUndefined(options.weak)) { options.weak = false }
			deltaJs.Delta[storageSymbol].push({ precondition, value, options });
		};
		deltaJs.Delta[staticMethodName] = function (...args) {
			let deltas      = args.slice(0, arity),
				callOptions = args[arity] || {};

			/* defaults */
			if (isUndefined(callOptions.weak)) { callOptions.weak = false }

			/* use the first composition function for which these deltas satisfy the precondition */
			let fn        = ()=>{},
				found     = false,
				commuting = false;
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
		};

		/* set instance Delta members */
		// TODO: use Object.assign when [https://github.com/zloirock/core-js/issues/45] is fixed
		deltaJs.Delta.prototype[methodName] = function (...args) {
			return deltaJs.Delta[staticMethodName](this, ...args);
		};

		/* set static DeltaJs members */
		oncePer(deltaJs.constructor, `multiDispatch:${name}`, () => {
			// TODO: use Object.assign when [https://github.com/zloirock/core-js/issues/45] is fixed
			deltaJs.constructor.prototype[creationMethodName] = function (precondition, value, options = {}) {
				return this.Delta[creationMethodName](precondition, value, options);
			};
		});
	}

	/**
	 * Ask if a custom multi-dispatch implementation was provided
	 * that fits the given `name` and `deltas`.
	 * @private
	 * @param name   {string}
	 * @param deltas {Array.<DeltaJs#Delta>}
	 */
	function customMultiDispatchGiven(name, ...deltas) {
		let {storageSymbol, commutative} = _multiDispatchOptions.get(name);
		for (let {precondition, value} of deltaJs.Delta[storageSymbol]) {
			if (precondition(...deltas) || commutative && precondition(...swapLastTwo(deltas))) {
				return typeof value === 'function';
			}
		}
		return false;
	}


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	// TODO: specify possible options


	/**
	 * Take any number of `deltas` and generate their <i>composition</i>. Applying the resulting delta to
	 * a value should have the same effect as sequentially applying the original deltas from left to right.
	 * The composition of 0 deltas is a {@link DeltaJs.NoOp} delta. The composition of 1 delta is itself.
	 * The composition of more than 1 delta depends on the operation type(s) of that delta.
	 * @method DeltaJs#Delta.composed
	 * @param ...deltas {DeltaJs#Delta} any number of deltas as separate arguments
	 * @param [options] {object}        any options for the composition process
	 * @returns         {DeltaJs#Delta} the result of composing all given deltas
	 * @see {@link DeltaJs#Delta#composedWith}
	 */
	/**
	 * Generate the <i>composition</i> of `this` delta with the given `other` delta. Applying the resulting
	 * delta to a value should have the same effect as sequentially applying first `this` delta, and then the
	 * `other` delta.
	 * @method DeltaJs#Delta#composedWith
	 * @param  other    {DeltaJs#Delta} the other delta to compose this one with
	 * @param [options] {object}        any options for the composition process
	 * @returns         {DeltaJs#Delta} the result of composing this delta with the `other` delta
	 * @see {@link DeltaJs#Delta.composed}
	 */
	let binaryComposedSymbol = Symbol('binaryComposed');
	newMultiDispatch('composition', binaryComposedSymbol, 'composedWith', {
		arity:     2,
		onTrue:    (d1, d2, opt) => new deltaJs.Delta.Composed([d1, d2], opt),
		onFalse:   (d1, d2) => { throw new CompositionError(d1, d2) },
		onDefault: 'onFalse'
	});
	deltaJs.Delta.composed = function composed(...args) {
		/* separate arguments */
		let optionsGiven = !(args[args.length-1] instanceof deltaJs.Delta || typeof args[args.length-1] === 'undefined');
		let [deltas, options] = optionsGiven ? [args.slice(0, -1), args[args.length-1]] : [args, {}];
		/* compose the list of deltas, and pass the options to each binary composition */
		return deltas.map((d) => d || new deltaJs.Delta.NoOp())
			.reduce((d1, d2) => deltaJs.Delta[binaryComposedSymbol](d1, d2, options), new deltaJs.Delta.NoOp());
	};


	/**
	 * Test whether a given `delta1` <i>refines</i> a given `delta2`. This is the case if `delta1` can always
	 * be used instead of `delta2` to get a result within the specifications of `delta2`.
	 *
	 * This is a useful concept only for deltas that have a 'non-deterministic' effect, like those
	 * that insert values at an arbitrary position in an array.
	 * @method DeltaJs#Delta.refines
	 * @param  delta1   {DeltaJs#Delta} the delta that is possibly more refined
	 * @param  delta2   {DeltaJs#Delta} the delta that is possibly less refined
	 * @param [options] {object}        any options for the refinement test
	 * @returns         {boolean}       whether or not the refinement relation between the given deltas holds
	 * @see {@link DeltaJs#Delta#refines}
	 */
	/**
	 * Test whether `this` delta <i>refines</i> a given `other` delta. This is the case if `this` can always
	 * be used instead of `other` to get a result within the specifications of `other`.
	 *
	 * This is a useful concept only for deltas that have a 'non-deterministic' effect, like those
	 * that insert values at an arbitrary position in an array.
	 * @method DeltaJs#Delta#refines
	 * @param  other    {DeltaJs#Delta} the delta that is possibly less refined
	 * @param [options] {object}        any options for the refinement test
	 * @returns         {boolean}       whether or not the refinement relation between the given deltas holds
	 * @see {@link DeltaJs#Delta.refines}
	 */
	newMultiDispatch('refinement', 'refines', 'refines', {
		arity:     2,
		onTrue:    (d1, d2) => true,
		onFalse:   (d1, d2) => false,
		onDefault: (d1, d2, opt) => d1.equals(d2, opt)
	});


	/**
	 * Test whether a given `delta1` is <i>equal</i> to a given `delta2`. This is the case if both deltas
	 * would have the same effect when applied to any value.
	 * @method DeltaJs#Delta.equal
	 * @param  delta1   {DeltaJs#Delta} the first delta to compare
	 * @param  delta2   {DeltaJs#Delta} the second delta to compare
	 * @param [options] {object}        any options for the equality test
	 * @returns         {boolean}       whether both given deltas are equal
	 * @see {@link DeltaJs#Delta#equals}
	 */
	/**
	 * Test whether `this` delta is <i>equal</i> to a given `other` delta. This is the case if both deltas
	 * would have the same effect when applied to any value.
	 * @method DeltaJs#Delta#equals
	 * @param  other    {DeltaJs#Delta} the delta to compare to
	 * @param [options] {object}        any options for the equality test
	 * @returns         {boolean}       whether both given deltas are equal
	 * @see {@link DeltaJs#Delta.equal}
	 */
	newMultiDispatch('equality', 'equal', 'equals', {
		arity:       2,
		commutative: true,
		onTrue:    (d1, d2) => true,
		onFalse:   (d1, d2) => false,
		onDefault: (d1, d2, opt) => {
			if (customMultiDispatchGiven('refinement', d1, d2)) {
				return d1.refines(d2, opt) && d2.refines(d1, opt);
			} else {
				return d1.type === d2.type && arraysEqual(d1.args, d2.args);
			}
		}
	});


	/**
	 * Test whether a given `delta1` <i>commutes</i> with a given `delta2`. This is the case if the order
	 * in which both deltas are applied to any value does not matter, i.e., that `delta1.composedWith(delta2)`
	 * is equal to `delta2.composedWith(delta1)`.
	 * @method DeltaJs#Delta.commute
	 * @param  delta1   {DeltaJs#Delta} the first delta in the possibly commuting pair
	 * @param  delta2   {DeltaJs#Delta} the second delta in the possibly commuting pair
	 * @param [options] {object}        any options for the commutation test
	 * @returns         {boolean}       whether the given two deltas commute
	 * @see {@link DeltaJs#Delta#commutesWith}
	 */
	/**
	 * Test whether `this` delta <i>commutes</i> with a given `other` delta. This is the case if the order
	 * in which both deltas are applied to any value does not matter, i.e., that `this.composedWith(other)`
	 * is equal to `other.composedWith(this)`.
	 * @method DeltaJs#Delta#commutesWith
	 * @param  other    {DeltaJs#Delta} the other delta with which this one possibly commutes
	 * @param [options] {object}        any options for the commutation test
	 * @returns         {boolean}       whether the given two deltas commute
	 * @see {@link DeltaJs#Delta.commute}
	 */
	newMultiDispatch('commutation', 'commute', 'commutesWith', {
		arity:       2,
		commutative: true,
		onTrue:    (d1, d2) => true,
		onFalse:   (d1, d2) => false,
		onDefault: (d1, d2, opt) => deltaJs.Delta.composed(d1, d2, opt)
		                    .equals(deltaJs.Delta.composed(d2, d1, opt), opt)
	});


	/**
	 * Test whether any conflict between given deltas `cDelta1` and `cDelta2` is <i>resolved</i> by
	 * the given delta `crDelta`. This is the case if the ostensibly non-commuting `cDelta1` and `cDelta2`
	 * 'become commuting' if subsequently composed with `crDelta`.
	 * @method DeltaJs#Delta.resolves
	 * @param  crDelta  {DeltaJs#Delta} a possibly conflict resolving delta
	 * @param  cDelta1  {DeltaJs#Delta} the first delta of a possibly non-commuting pair
	 * @param  cDelta2  {DeltaJs#Delta} the second delta of a possibly non-commuting pair
	 * @param [options] {object}        any options for the resolution test
	 * @returns         {boolean}       whether `crDelta` resolves any conflict between `cDelta1` and `cDelta2`
	 * @see {@link DeltaJs#Delta#resolves}
	 */
	/**
	 * Test whether any conflict between given deltas `cDelta1` and `cDelta2` is <i>resolved</i> by
	 * `this` delta. This is the case if the ostensibly non-commuting `cDelta1` and `cDelta2`
	 * 'become commuting' if subsequently composed with `this`.
	 * @method DeltaJs#Delta#resolves
	 * @param  cDelta1  {DeltaJs#Delta} the first delta of a possibly non-commuting pair
	 * @param  cDelta2  {DeltaJs#Delta} the second delta of a possibly non-commuting pair
	 * @param [options] {object}        any options for the resolution test
	 * @returns         {boolean}       whether `this` delta resolves any conflict between `cDelta1` and `cDelta2`
	 * @see {@link DeltaJs#Delta.resolves}
	 */
	newMultiDispatch('resolution', 'resolves', 'resolves', {
		arity:       3,
		commutative: true,
		onTrue:    (d1, d2, d3) => true,
		onFalse:   (d1, d2, d3) => false,
		onDefault: (d1, d2, d3, opt) => deltaJs.Delta.composed(d2, d3, d1, opt)
		                        .equals(deltaJs.Delta.composed(d3, d2, d1, opt), opt)
	});


});
