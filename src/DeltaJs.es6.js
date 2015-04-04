/* import external libraries */
import JsGraph from 'js-graph';


/* import internal stuff */
import {extend, assert, isUndefined, isDefined, arraysEqual} from './util.es6.js';
import Path                                     from './Path.es6.js';
import {ReadableTarget, WritableTarget, rt, wt} from './Target.es6.js';
import define_Delta                             from './Delta_class.es6.js';
import define_Overloaded                        from './Overloaded.es6.js';
import define_Modify                            from './Modify.es6.js';
import define_basicOperations                   from './basicOperations.es6.js';
import define_PutIntoArray                      from './PutIntoArray.es6.js';
import define_PutIntoFunction                   from './PutIntoFunction.es6.js';
import define_DeltaModel                        from './DeltaModel.es6.js';
import define_features                          from './features.es6.js';
import define_variationPoints                   from './variationPoints.es6.js';
import define_applicationConditions             from './applicationConditions.es6.js';
import define_ContainerProxy                    from './ContainerProxy.es6.js';


/** {@public}{@class}
 * This class offers every functionality you need from delta modeling.
 * Each instance offers its own operation types and variation points
 * and acts as a facade (as in design pattern) to the more specific
 * subsystems of delta.js.
 *
 * You will usually need only one DeltaJs instance per application.
 */
export default class DeltaJs {


	constructor() {
		define_ContainerProxy       (this);
		define_Delta                (this);
		define_Overloaded           (this);
		define_Modify               (this);
		define_basicOperations      (this);
		define_PutIntoArray         (this);
		define_PutIntoFunction      (this);
		define_DeltaModel           (this);
		define_features             (this);
		define_variationPoints      (this);
		define_applicationConditions(this);
	}


	/** {@public}{@method}
	 * @param name       {string}   - name of the new operation type
	 * @param DeltaClass {Function} - the new operation class
	 * @param ProxyClass {?Function} - the optional custom Proxy subclass for this operation-type
	 */
	newOperationType(name, DeltaClass, ProxyClass) {
		/* sanity checks */
		assert(name[0] === name[0].toUpperCase(),
			`Delta operation classes must have a name starting with a capital letter - '${name}' does not.`);
		assert(isUndefined(this.Delta[name]),
			`The '${name}' operation type already exists.`);

		/* store the operation class */
		this.Delta[name] = DeltaClass;

		/* set the (optional) Proxy class */
		DeltaClass.Proxy = ProxyClass;

		/* fetch certain given methods (if they exist) that need to be slightly augmented */
		var givenApplyTo       = DeltaClass.prototype.applyTo || (()=>{});
		var givenRefines       = DeltaClass.prototype.refines;
		var givenEquals        = DeltaClass.prototype.equals;
		var givenCommutesWith  = DeltaClass.prototype.commutesWith;
		var givenResolves      = DeltaClass.prototype.resolves;

		/* augment the class prototype */
		extend(DeltaClass.prototype, {
			applyTo(target, options = {}) {
				/* should this delta only be applied for a specific feature selection? */
				if (!this.selected) { return }

				/* if the target is not already in Target form, make it so now */
				if (!(target instanceof DeltaJs.ReadableTarget)) {
					target = new DeltaJs.ReadableTarget(target);
				}

				/* does the target satisfy the precondition of the delta? */
				var judgment = this.evaluatePrecondition(target);
				if (judgment !== true) { throw judgment }

				/* OK, then apply it if a method to do so was included in the operation */
				givenApplyTo.call(this, target, options);
			},
			refines(other) {
				if (this.type !== other.type) { return false }
				if (isDefined(givenRefines)) {
					return givenRefines.call(this, other);
				} else {
					return this.equals(other);
				}
			},
			equals(other) {
				if (this.type !== other.type) { return false }
				if (isDefined(givenEquals)) {
					return givenEquals.call(this, other);
				} else if (isDefined(givenRefines)) {
					return this.refines(other) && other.refines(this);
				} else {
					return arraysEqual(this.args, other.args);
				}
			},
			commutesWith(other) {
				if (isDefined(givenCommutesWith)) {
					return givenCommutesWith.call(this, other);
				} else {
					return this.composedWith(other)
						.equals(other.composedWith(this));
				}
			},
			resolves(d1, d2) {
				if (isDefined(givenResolves)) {
					return givenResolves.call(this, d1, d2);
				} else {
					return d1.composedWith(d2).composedWith(this)
						.equals(d2.composedWith(d1).composedWith(this));
				}
			},
			type: name
		});

		/* create any given methods with default handler */
		var lowercaseName = name[0].toLowerCase()+name.slice(1);
		for (let method of DeltaClass.prototype.methods || [lowercaseName]) {
			this.ContainerProxy.newProxyMethod(method, (...args) => new DeltaClass(...args));
		}

		/* return the new class */
		return DeltaClass;
	}


	/** {@public}{@method}
	 * @param method  {string}   - method name
	 * @param handler {Function} - a function that takes method arguments, and returns a new `DeltaJs#Delta` instance
	 */
	newProxyMethod(method, handler) {
		this.ContainerProxy.newProxyMethod(method, handler);
	}


}
