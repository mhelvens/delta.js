/* import internal stuff */
import U           from '../misc.js';
import Path        from '../Path.js';
import {wt}        from '../Target.js';
import defineProxy from './Proxy.js';


export default (deltaJs) => U.oncePer(deltaJs, 'Modify', () => {

	defineProxy(deltaJs);

	deltaJs.newOperationType('Modify', class Modify extends deltaJs.Delta {

		constructor(...args) {
			super(...args);
			this.subDeltas = {};
			U.extend(this.subDeltas, this.arg || {});
		}


		/** {@public}{@abstract}{@method}{@nosideeffects}
		 * @return {DeltaJs#Delta.Modify} - a clone of this delta
		 */
		clone() {
			var result = super.clone();
			Object.keys(this.subDeltas).forEach((prop) => {
				result.subDeltas[prop] = this.subDeltas[prop].clone();
			});
			return result;
		}


		/** {@public}{@method}
		 * @param target {*}
		 */
		precondition(target) { return target.value instanceof Object }


		/** {@public}{@method}
		 * @param target  {Delta.WritableTarget} - the target to which to apply this delta
		 * @param options {object?}              - the (optional) options for this delta application
		 */
		applyTo(target, options = {}) {
			Object.keys(this.subDeltas).forEach((prop) => {
				if (!options.restrictToProperty || options.restrictToProperty === prop) {
					this.subDeltas[prop].applyTo(wt(target.value, prop),
							U.extend({}, options, { restrictToProperty: null }));
				}
			});
		}


		/** {@public}{@method}
		 * @param options {object?}
		 * @return {string}
		 */
		toString(options = {}) {
			var str = super.toString(options);
			if (Object.keys(this.subDeltas).length > 0) {
				var deltas = Object
						.keys(this.subDeltas)
						.map((p) => this.subDeltas[p].toString(U.extend({}, options, { targetProp: p })))
						.join('\n');
				str += '\n' + U.indent(deltas, 4);
			}
			return str;
		}


	}, class ModifyProxy extends deltaJs.ContainerProxy {

		//noinspection JSMethodCanBeStatic
		/** {@public}{@method}
		 * @param rawArgs {*[]}
		 * @return {?{ options: Object, args: *[] }}
		 */
		processProxyArguments(...rawArgs) {
			// rawArgs is parsed as (...options, path, ...args),
			// though path may also be passed as an option directly
			var options = {};
			do {
				if (rawArgs.length === 0) { throw new Error(`The argument list for this Modify.Proxy method is insufficient.`) }
				var arg = rawArgs.shift();
				if (typeof arg === 'string') { options.path = arg     }
				else                         { U.extend(options, arg) }
			} while (!options.path);
			return { options, args: rawArgs };
		}


		/** {@public}{@method}
		 * @param delta   {DeltaJs#Delta}
		 * @param options {Object}
		 * @return {DeltaJs#Proxy} - the deepest proxy created for this operation
		 */
		addOperation(delta, options) {
			var {path} = options;
			if (!path.prop) { throw new Error('Operations on a Modify.Proxy need to have a non-empty path.') }

			/* create proxies */
			var deepestProxy;
			if (path.rest) {
				let newOptions = U.extend({}, options, { path: path.rest });
				let childProxy = this.addChildProxy(path.prop, new deltaJs.Delta.Modify());
				deepestProxy = childProxy.addOperation(delta, newOptions);
			} else {
				deepestProxy = this.addChildProxy(path.prop, delta);
			}

			// NOTE: Modify operations do not (yet) use any options

			/* return the deepest created proxy */
			return deepestProxy;
		}


		/** {@public}{@method}
		 * Dynamically compute and return the delta belonging to this proxy.
		 *
		 * @return the delta belonging to this proxy
		 */
		delta() {
			var result = super.delta();
			result.subDeltas = {};
			this.childKeys().forEach((prop) => {
				result.subDeltas[prop] = this.childDelta(prop);
			});
			return result;
		}

	});


	/* composition - introducing 'Modify' ***********************************************/
	function t(type1, type2) { return (d1, d2) => (d1.type === type1 && d2.type === type2) }
	deltaJs.newComposition( t('Modify', 'Modify'), (d1, d2) => {
		var result = d1.clone();
		Object.keys(d2.subDeltas).forEach((prop) => {
			result.subDeltas[prop] = deltaJs.Delta.composed(result.subDeltas[prop], d2.subDeltas[prop]);
		});
		return result;
	});

});


///** {@public}{@method} // TODO: replace all this through the new Proxy refactoring
// * Prepare a specific delta operation with this Modify delta as the base.
// * @param options {object} - any options; there may be any number of these before the `path` argument
// * @param path {string}    - the relative path to which to apply this operation
// * @param args {[*]}       - the arguments to the operation
// * @return {DeltaJs#Delta} - the delta resulting from the operation
// */
//operation(options, path, ...args) {
//	var argss = [...arguments];
//	var allOptions = {};
//	while (typeof argss[0] === 'object') {
//		U.extend(allOptions, argss.shift());
//	}
//	path = argss.shift();
//	var delta = deltaJs._newDeltaByMethod(allOptions, ...argss);
//	return this._addOperation(allOptions, new Path(path), delta);
//}
///** {@private}{@method}
// * @param options {object}
// * @param path    {string}
// * @param delta   {DeltaJs#Delta}
// */
//_addOperation(options, path, delta) {
//	/* if there is a 'rest' to the path, set a link in the chain */
//	if (path.rest) {
//		return this.operation({ method: 'modify' }, path.prop)
//			._addOperation(options, path.rest, delta);
//	}
//
//	/* store the new delta, possibly composed with an existing one */
//	this.subDeltas[path.prop] = this.subDeltas[path.prop] ? this.subDeltas[path.prop].composedWith(delta) : delta;
//
//	/* return the composed delta if it has an operations interface; otherwise, return the given delta */
//	return (this.subDeltas[path.prop] instanceof deltaJs.Delta.Composite) ? this.subDeltas[path.prop] : delta;
//}

///** {@public}{@method}
// * Get the deepest existing Modify delta corresponding to a relative path.
// * @param path {Path} - a path relative to this delta
// * @return {{ delta: DeltaJs#Delta.Modify, rest: Path }} - the deepest Modify delta corresponding to the path,
// *                                                         and the unused rest of the path
// */
//deepestModifyDeltaByPath(path) { // TODO: not needed anymore, right?
//	if (U.isUndefined(path.prop) || this.subDeltas[path.prop].type !== 'Modify') {
//		return { delta: this, rest: path };
//	}
//	return this.subDeltas[path.prop].deepestModifyDeltaByPath(path.rest || new Path());
//}
