/* import external libraries */
import JsGraph from 'js-graph';


/* import internal stuff */
import U                                        from './misc.js';
import Path                                     from './Path.js';
import {ReadableTarget, WritableTarget, rt, wt} from './Target.js';
import defineDelta                              from './operations/Delta.js';
import defineOverloaded                         from './operations/Overloaded.js';
import defineModify                             from './operations/Modify.js';
import defineBasicOperations                    from './operations/basicOperations.js';
import definePutIntoArray                       from './operations/PutIntoArray.js';
import definePutIntoFunction                    from './operations/PutIntoFunction.js';
import defineDeltaModel                         from './operations/DeltaModel.js';
import defineFeatures                           from './features.js';
import defineVariationPoints                    from './variationPoints.js';
import defineApplicationConditions              from './applicationConditions.js';
import defineProxy                              from './operations/Proxy.js';


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
		defineDelta                (this);
		defineProxy                (this);
		defineOverloaded           (this);
		defineModify               (this);
		defineBasicOperations      (this);
		definePutIntoArray         (this);
		definePutIntoFunction      (this);
		defineDeltaModel           (this);
		defineFeatures             (this);
		defineVariationPoints      (this);
		defineApplicationConditions(this);
	}


	/** {@public}{@method}
	 * @param name        {string}   - name of the new operation type
	 * @param DeltaClass  {Function} - the new operation class
	 * @param ProxyClass {?Function} - the optional custom Proxy subclass for this operation-type
	 */
	newOperationType(name, DeltaClass, ProxyClass) {
		/* sanity checks */
		U.assert(name[0] === name[0].toUpperCase(),
			`Delta operation classes must have a name starting with a capital letter - '${name}' does not.`);
		U.assert(U.isUndefined(this.Delta[name]),
			`The '${name}' operation type already exists.`);

		/* 'this' alias */
		var thisDeltaJs = this;

		/* store the operation class */
		this.Delta[name] = DeltaClass;

		/* set the (optional) Proxy class */
		DeltaClass.Proxy = ProxyClass;

		/* fetch the given applyTo function (if any) which will be slightly modified */
		var givenApplyTo = DeltaClass.prototype.applyTo || (()=>{});

		/* augment the class prototype */
		U.extend(DeltaClass.prototype, {
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


	/** {@public}{@method}
	 * @param precondition {(DeltaJs#Delta, DeltaJs#Delta) => Boolean} - can these deltas be composed this way?
	 * @param compose      {(DeltaJs#Delta, DeltaJs#Delta) => DeltaJs#Delta} - should be side-effect free
	 */
	newComposition(precondition, compose) {
		this.Delta.newComposition(precondition, compose);
	}

}
