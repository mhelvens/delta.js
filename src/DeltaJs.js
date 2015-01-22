/* import external libraries */
import JsGraph from 'js-graph';


/* import internal stuff */
import U      from './misc.js';
import Path   from './Path.js';
import {ReadableTarget, WritableTarget, rt, wt} from './Target.js';
import {ApplicationError, MultipleOverloadsApplicationError,
		NoOverloadsApplicationError, DeltaArgApplicationError,
		CompositionError, MultipleOverloadsCompositionError} from './Error.js';
import defineDelta           from './operations/Delta.js';
import defineComposite       from './operations/Composite.js';
import defineOverloaded      from './operations/Overloaded.js';
import defineModify          from './operations/Modify.js';
import defineBasicOperations from './operations/basicOperations.js';
import definePutIntoArray    from './operations/PutIntoArray.js';
import definePutIntoFunction from './operations/PutIntoFunction.js';
import defineDeltaModel      from './operations/DeltaModel.js';
import defineFeatures        from './features.js';


/** {@class}
 * This class offers every functionality you need from delta modeling.
 * Each instance offers its own operation types and variation points.
 * You will usually need only one instance per application.
 */
export default U.newClass(function DeltaJs() {

	this.compositions = []; // [{precondition, composeFn}]
	this.overloads = {}; // method -> [delta-classes]
	this._onNewOperationTypeListeners = [];

	defineDelta          (this);
	defineComposite      (this);
	defineOverloaded     (this);
	defineModify         (this);
	defineBasicOperations(this);
	definePutIntoArray   (this);
	definePutIntoFunction(this);
	defineDeltaModel     (this);
	defineFeatures       (this);

}, /** @lends DeltaJs.prototype */ { /********************************************************* DeltaJs.prototype */

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
		U.assert(name[0] === name[0].toUpperCase(),
			`Delta operations must have a name starting with a capital letter -- '${name}' does not.`);
		U.assert(!this.Delta[name],
			`The '${name}' operation type already exists.`);

		/* Delta subclass */
		var cls = this.Delta[name] = U.newSubclass(Superclass || this.Delta, (superFn) => function (arg, meta) {
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
		Object.keys(this.Delta).forEach((name) => {
			if (name[0] === name[0].toUpperCase()) {
				fn(this.Delta[name]);
			}
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
		if (U.isUndefined(d1)) { d1 = new this.Delta.NoOp() }
		if (U.isUndefined(d2)) { d2 = new this.Delta.NoOp() }

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
	}

});