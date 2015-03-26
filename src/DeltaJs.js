/* import external libraries */
import JsGraph from 'js-graph';


/* import internal stuff */
import {extend, assert, isUndefined, isDefined, arraysEqual} from './util.js';
import Path                                     from './Path.js';
import {ReadableTarget, WritableTarget, rt, wt} from './Target.js';
import define_Delta                             from './Delta_class.js';
import define_Overloaded                        from './Overloaded.js';
import define_Modify                            from './Modify.js';
import define_basicOperations                   from './basicOperations.js';
import define_PutIntoArray                      from './PutIntoArray.js';
import define_PutIntoFunction                   from './PutIntoFunction.js';
import define_DeltaModel                        from './DeltaModel.js';
import define_features                          from './features.js';
import define_variationPoints                   from './variationPoints.js';
import define_applicationConditions             from './applicationConditions.js';
import define_ContainerProxy                    from './ContainerProxy.js';


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

		/* fetch the given applyTo function (if any) which will be slightly modified */
		var givenApplyTo = DeltaClass.prototype.applyTo || (()=>{});
		var givenEquals  = DeltaClass.prototype.equals;

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
			equals(other) {
				if (this.type !== other.type) { return false }
				if (isDefined(givenEquals)) {
					return givenEquals.call(this, other);
				} else {
					return arraysEqual(this.args, other.args);
				}
			},
			type: name
		});

		/* create any given methods with default handler */
		var lowercaseName = name[0].toLowerCase()+name.slice(1);
		(DeltaClass.prototype.methods || [lowercaseName]).forEach((method) => {
			this.ContainerProxy.newProxyMethod(method, (...args) => new DeltaClass(...args));
		});

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
