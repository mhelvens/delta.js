/* import external libraries */
import JsGraph from 'js-graph';


/* import internal stuff */
import U      from './misc.js';
import Path   from './Path.js';
import {ReadableTarget, WritableTarget, rt, wt} from './Target.js';
import {ApplicationError, CompositionError} from './Error.js';
import defineDelta                 from './operations/Delta.js';
import defineComposite             from './operations/Composite.js';
import defineOverloaded            from './operations/Overloaded.js';
import defineModify                from './operations/Modify.js';
import defineBasicOperations       from './operations/basicOperations.js';
import definePutIntoArray          from './operations/PutIntoArray.js';
import definePutIntoFunction       from './operations/PutIntoFunction.js';
import defineDeltaModel            from './operations/DeltaModel.js';
import defineFeatures              from './features.js';
import defineVariationPoints       from './variationPoints.js';
import defineApplicationConditions from './applicationConditions.js';


/** {@public}{@class DeltaJs}
 * This class offers every functionality you need from delta modeling.
 * Each instance offers its own operation types and variation points.
 * You will usually need only one instance per application.
 */
export default U.newClass(function DeltaJs() {

	this._compositions  = []; // [{precondition, composeFn}]
	this._facadeMethods = []; // method -> (args => Delta)
	this._onNewFacadeMethodListeners  = [];

	defineDelta                (this);
	defineComposite            (this);
	defineOverloaded           (this);
	defineModify               (this);
	defineBasicOperations      (this);
	definePutIntoArray         (this);
	definePutIntoFunction      (this);
	defineDeltaModel           (this);
	defineFeatures             (this);
	defineVariationPoints      (this);
	defineApplicationConditions(this);

}, /** @lends DeltaJs.prototype */ {

	/** {@private}{@method}
	 * @param delta        {DeltaJs#Delta}
	 * @param target       {DeltaJs.ReadableTarget}
	 * @return {Boolean|ApplicationError} - `true` if the precondition is satisfied, otherwise
	 *                                      `false` or an instance of `DeltaJs.ApplicationError`
	 */
	_evaluatePrecondition(delta, target) {
		if (delta.precondition) {
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
	 * @param Superclass {Function?} - optional superclass
	 * @param name       {string}    - name of the new operation type
	 * @param prototype  {object}    - prototype of the new operation class
	 */
	newOperationType(Superclass, name, prototype) {
		if (typeof Superclass === 'string') { [Superclass, name, prototype] = [this.Delta, Superclass, name] }
		if (!prototype)  { prototype  = {} }

		/* 'this' alias */
		var thisDeltaJs = this;

		/* sanity checks */
		U.assert(name[0] === name[0].toUpperCase(),
			`Delta operations must have a name starting with a capital letter -- '${name}' does not.`);
		U.assert(!this.Delta[name],
			`The '${name}' operation type already exists.`);

		/* Delta subclass */
		class Cls extends Superclass {
			constructor(arg, options = {}) {
				super(options, arg);
				if (this.construct) { this.construct() }
			}
		}
		this.Delta[name] = Cls;
		U.extend(Cls.prototype, prototype, {
			applyTo(target, options = {}) {

				/* should this delta only be applied for a specific property on the target object? */
				if (options.restrictToProperty &&  this.options.targetProp &&
					options.restrictToProperty !== this.options.targetProp) { return } // TODO: remove options

				/* should this delta only be applied for a specific feature selection? */
				if (!this.selected) { return }

				/* does the target satisfy the precondition of the delta? */
				var judgment = thisDeltaJs._evaluatePrecondition(this, target);
				if (judgment !== true) { throw judgment }

				/* OK, then apply it if a method to do so was included in the operation */
				if (U.isDefined(prototype.applyTo)) {
					var newOptions = (
						!!this.options.targetProp ? // TODO: remove options
							U.extend({}, options, { restrictToProperty: null }) :
							options
					);
					prototype.applyTo.call(this, target, newOptions);
				}

			},
			type: name
		});

		/* create the given methods with default handler */
		(prototype.methods || [ name[0].toLowerCase()+name.slice(1) ]).forEach((method) => {
			this.newFacadeMethod(method, (...args) => new Cls(...args));
		});

		/* return the new class */
		return Cls;

	},

	/** {@public}{@method}
	 * @param method  {string}    - method name
	 * @param handler {Function}  - a function that takes method arguments, and returns a new `DeltaJs#Delta` instance
	 */
	newFacadeMethod(method, handler) {

		/* register  */
		this._facadeMethods.push([method, handler]);

		/* notify listeners */
		this._onNewFacadeMethodListeners.forEach((fn) => { fn(method, handler) });

	},

	/** {@public}{@method}
	 * @param fn {(String, Function) => undefined} -
	 *           a function that takes a name and a function that creates a `DeltaJs#Delta` instance
	 */
	onNewFacadeMethod(fn) {
		this._onNewFacadeMethodListeners.push(fn);
		this._facadeMethods.forEach(([method, handler]) => {
			fn(method, handler);
		});
	},

	/** {@public}{@method}
	 * @param precondition {(DeltaJs#Delta, DeltaJs#Delta) => Boolean} - can these deltas be composed this way?
	 * @param compose      {(DeltaJs#Delta, DeltaJs#Delta) => DeltaJs#Delta} - should be side-effect free
	 */
	newComposition(precondition, compose) {
		this._compositions.push({precondition, compose});
	},

	/** {@public}{@method}
	 * @param d1 {DeltaJs#Delta} - the first delta
	 * @param d2 {DeltaJs#Delta} - the second delta
	 * @return {DeltaJs#Delta} - the composed delta
	 */
	composed(d1, d2) {
		/* handle the cases where one or both arguments are undefined */
		if (U.isUndefined(d1)) { d1 = new this.Delta.NoOp() }
		if (U.isUndefined(d2)) { d2 = new this.Delta.NoOp() }

		/* use the first composition function for which these deltas satisfy the precondition */
		var composeFn = ()=>{};
		var success = this._compositions.some(({precondition, compose: fn}) => {
			if (precondition(d1, d2)) {
				composeFn = fn;
				return true; // success; break the loop
			}
		});

		/* throw an error on failure */
		if (!success) { throw new CompositionError(d1, d2) }

		/* return the result on success */
		return composeFn(d1, d2);
	}

});
