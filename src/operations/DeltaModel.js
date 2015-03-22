/* import external libraries */
import JsGraph from 'js-graph';

/* import internal stuff */
import U                       from '../misc.js';
import Path                    from '../Path.js';
import defineModify            from './Modify.js';
import defineProxy             from './Proxy.js';
import {ApplicationOrderCycle} from '../Error.js';


export default (deltaJs) => {
	if (U.isDefined(deltaJs.Delta.DeltaModel)) { return }


	defineModify(deltaJs);
	defineProxy (deltaJs);


	deltaJs.newOperationType('DeltaModel', class DeltaModel extends deltaJs.Delta {

		constructor(...args) {
			super(...args);
			this.graph = new JsGraph();
		}


		clone() {
			var result = super.clone();
			result.graph = this.graph.clone();
			result.graph.eachVertex((id, delta) => {
				result.graph.setVertex(id, delta.clone());
			});
			return result;
		}


		applyTo(target, options = {}) {
			this.graph.topologically((name, subDelta) => {
				subDelta.applyTo(target, options);
			});
		}


		/** {@public}{@method}
		 * @param options {object?}
		 * @return {string}
		 */
		toString(options = {}) {
			var str = super.toString(options);
			if (this.graph.vertexCount() > 0) {
				var deltas = '';
				this.graph.topologically((name, delta) => {
					deltas += `[${name}] ${delta.toString(options)}\n`;
				});
				str += '\n' + U.indent(deltas, 4);
			}
			return str;
		}

		// TODO: add precondition method which checks 'source' deltas

	}, class DeltaModelProxy extends deltaJs.ContainerProxy {

		constructor(...args) {
			super(...args);
			this._childOptions = {}; // key -> options-of-first-occurrence
		}


		/** {@public}{@method}
		 * @param rawArgs {*[]}
		 * @return {?{ options: Object, path: string, args: *[] }}
		 */
		processProxyArguments(...rawArgs) {
			// rawArgs is parsed as (...options, name, ...options, path, ...args)
			var options = {};
			var path;
			do {
				if (rawArgs.length === 0) { throw new Error(`The argument list for this Modify.DeltaModel method is insufficient.`) }
				var arg = rawArgs.shift();
				if (typeof arg === 'string') {
					if (!options.name) { options.name = arg     }
					else               { path         = arg     }
				} else                 { U.extend(options, arg) }
			} while (!path);
			return { options, path, args: rawArgs };
		}


		/** {@public}{@method}
		 * @param delta   {DeltaJs#Delta}
		 * @param path    {Path}
		 * @param options {Object}
		 * @return {DeltaJs#Proxy}
		 */
		addOperation(delta, path, options) {
			/* create proxies */
			var deepestProxy;
			if (path.prop) {
				let newOptions = U.extend({}, options, { name: undefined });
				let childProxy = this.addChildProxy(options.name, new deltaJs.Delta.Modify());
				deepestProxy = childProxy.addOperation(delta, path, newOptions);
			} else {
				deepestProxy = this.addChildProxy(options.name, delta);
			}

			/* store options */
			if (!this._childOptions[options.name]) {
				this._childOptions[options.name] = options;
			}

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
			result.graph.clear();
			this.childKeys().forEach((name) => {
				result.graph.addVertex(name, this.childDelta(name));
				let options = this._childOptions[name];
				[ ...(options['resolves'] || []), ...(options['after'] || []), ...(options['requires'] || []) ]
					.forEach((subName) => {
						result.graph.createEdge(subName, name);
						if (result.graph.hasCycle()) {
							result.graph.removeExistingEdge(subName, name);
							throw new ApplicationOrderCycle(subName, name);
						}
					});
			});
			return result;
		}

	});


	/* composition */
	// to compose delta models, we simply have one apply after the other
	// without any composability checks; in the future, this may become more clever
	deltaJs.newComposition((d1, d2) => (
		d1 instanceof deltaJs.Delta.DeltaModel ||
		d2 instanceof deltaJs.Delta.DeltaModel
	), (d1, d2) => {
		var result = new deltaJs.Delta.DeltaModel();
		result.graph.addNewVertex(1, d1);
		result.graph.addNewVertex(2, d2);
		result.graph.addNewEdge(1, 2);
		return result;
	});

};



///** {@public}{@method} // TODO: redo this stuff with the new Proxy refactoring
// * Prepare a specific delta operation with this Modify delta as the base.
// * @param options1 {object?} - any (optional) options; there may be any number of these before the `name` argument
// * @param name {string}      - the name of the delta inside the delta model
// * @param options2 {object?} - any (optional) options; there may be any number of these before the `path` argument
// * @param path {string}      - the relative path to perform this operation on
// * @param args {[*]}         - the arguments to the operation
// * @return {DeltaJs#Delta} - the delta resulting from the operation
// */
//operation(options1, name, options2, path, ...args) {
//	var argss = [...arguments];
//	var allOptions = {};
//	while (typeof argss[0] === 'object') {
//		U.extend(allOptions, argss.shift());
//	}
//	name = argss.shift();
//	while (typeof argss[0] === 'object') {
//		U.extend(allOptions, argss.shift());
//	}
//	path = argss.shift();
//	var delta = deltaJs._newDeltaByMethod(allOptions, ...argss);
//	return this._addOperation(name, allOptions, new Path(path), delta);
//}
//
//
//_addOperation(name, options, path, delta) {
//	var deltaBase;
//
//	/* check if a delta with this name already exists */
//	var existingDelta = this.graph.vertexValue(name);
//
//
//
//	if (U.isDefined(existingDelta) && existingDelta.type === 'Modify' && U.isDefined(path.rest)) {
//		return existingDelta._addOperation(options, path.rest, delta);
//	}
//
//
//	/* if there is a path, create the corresponding chain of deltas */
//	if (path.prop) {
//		deltaBase = new deltaJs.Delta.Modify();
//		deltaBase._addOperation(options, path, delta);
//	}
//
//	/* if there is already a delta with this name, compose them and return `delta` early */
//	if (U.isDefined(existingDelta)) {
//		deltaBase = existingDelta.composedWith(deltaBase);
//		deltaBase.name = existingDelta.name;
//		deltaBase.applicationCondition = existingDelta.applicationCondition;
//		this.graph.setVertex(name, deltaBase);
//	} else {
//
//		/* add the new delta to the delta model */
//		deltaBase.name = name;
//		this.graph.addVertex(name, deltaBase);
//
//		/* connect it to the partial order */
//		(options['resolves'] || []).concat(options['after'] || []).concat(options['requires'] || []).forEach((subordinateName) => {
//			this.graph.createEdge(subordinateName, name);
//			if (this.graph.hasCycle()) {
//				this.graph.removeExistingEdge(subordinateName, name);
//				throw new ApplicationOrderCycle(subordinateName, name);
//			}
//		});
//
//		/* application condition and optionally, an eponymous, linked feature */
//		var deltaFeature;
//		if (options.feature) { deltaFeature = deltaJs.newFeature(  name,            options                             ) }
//		else                 { deltaFeature = deltaJs.newFeature( `delta__${name}`, U.extend({ hidden: true }, options) ) }
//		if (options.feature || deltaFeature.conditional) {
//			deltaBase.applicationCondition = deltaFeature;
//		}
//
//		/* extract 'if' from compound options */
//		if (U.isDefined(options['resolves'])) {
//			deltaFeature.if(options['resolves']);
//		}
//
//		/* extract 'selects' from compound options */
//		if (U.isDefined(options['requires'])) {
//			deltaFeature.selects(options['requires']);
//		}
//	}
//
//	return delta;
//}
