/* import external libraries */
import JsGraph from 'js-graph';
import {ApplicationOrderCycle} from '../Error.js';

/* import internal stuff */
import U               from '../misc.js';
import Path            from '../Path.js';
import defineComposite from './Composite.js';


export default (deltaJs) => {
	if (U.isDefined(deltaJs.Delta.DeltaModel)) { return }

	defineComposite(deltaJs);

	var DeltaModel = deltaJs.newOperationType(deltaJs.Delta.Composite, 'DeltaModel', {
		construct() {
			this.graph = new JsGraph();
		},
		clone() {
			var result = new DeltaModel();
			result.graph = this.graph.clone();
			result.graph.eachVertex((id, delta) => {
				result.graph.setVertex(id, delta.clone());
			});
			return result;
		},
		applyTo(target, options = {}) {
			this.graph.topologically((name, subDelta) => {
				subDelta.applyTo(target, options);
			});
		},

		/** {@public}{@method}
		 * Prepare a specific delta operation with this Modify delta as the base.
		 * @param options1 {object?} - any (optional) options; there may be any number of these before the `name` argument
		 * @param name {string}      - the name of the delta inside the delta model
		 * @param options2 {object?} - any (optional) options; there may be any number of these before the `path` argument
		 * @param path {string}      - the relative path to perform this operation on
		 * @param arg {*}            - the argument to the operation
		 * @return {DeltaJs#Delta} - the delta resulting from the operation
		 */
		operation(options1, name, options2, path, arg) {
			var args = [].slice.call(arguments);
			var allOptions = {};
			while (typeof args[0] === 'object') {
				U.extend(allOptions, args.shift());
			}
			name = args.shift();
			while (typeof args[0] === 'object') {
				U.extend(allOptions, args.shift());
			}
			[path, arg] = args;
			var delta = deltaJs._newDeltaByMethod(allOptions, arg);
			return this._addOperation(name, allOptions, new Path(path), delta);
		},

		/** {@public}{@method}
		 * @param options {object?}
		 * @return {string}
		 */
		toString(options) {
			var str = deltaJs.Delta.prototype.toString.call(this, options);
			if (this.graph.vertexCount() > 0) {
				var deltas = '';
				this.graph.topologically((name, delta) => {
					deltas += `[${name}] ${delta.toString(options)}\n`;
				});
				str += '\n' + U.indent(deltas, 4);
			}
			return str;
		},

		_addOperation(name, options, path, delta) {

			/* check if a delta with this name already exists */
			var alreadyExists = U.isDefined(this.graph.vertexValue(name));

			/* starting to define the delta that goes directly in the graph */
			var deltaBase = delta;

			/* if there is a path, create the corresponding chain of deltas */
			if (path.prop) {
				deltaBase = new deltaJs.Delta.Modify();
				deltaBase._addOperation(options, path, delta);
			}

			/* if there is already a delta with this name, compose them and return `delta` early */
			if (alreadyExists) {
				var existingDelta = this.graph.vertexValue(name);
				deltaBase = existingDelta.composedWith(deltaBase);
				deltaBase.name = existingDelta.name;
				deltaBase.applicationCondition = existingDelta.applicationCondition;
				this.graph.setVertex(name, deltaBase);
			} else {
				/* add the new delta to the delta model */
				deltaBase.name = name;
				this.graph.addVertex(name, deltaBase);

				/* connect it to the partial order */
				(options['resolves'] || []).concat(options['after'] || []).concat(options['requires'] || []).forEach((subordinateName) => {
					this.graph.createEdge(subordinateName, name);
					if (this.graph.hasCycle()) {
						this.graph.removeExistingEdge(subordinateName, name);
						throw new ApplicationOrderCycle(subordinateName, name);
					}
				});

				/* application condition and optionally, an eponymous, linked feature */
				var deltaFeature;
				if (options.feature) { deltaFeature = deltaJs.newFeature(  name,            options                             ) }
				else                 { deltaFeature = deltaJs.newFeature( `delta__${name}`, U.extend({ hidden: true }, options) ) }
				if (options.feature || deltaFeature.conditional) {
					deltaBase.applicationCondition = deltaFeature;
				}

				/* extract 'if' from compound options */
				if (U.isDefined(options['resolves'])) {
					deltaFeature.if(options['resolves']);
				}

				/* extract 'selects' from compound options */
				if (U.isDefined(options['requires'])) {
					deltaFeature.selects(options['requires']);
				}
			}

			return delta;

		}

		// TODO: add precondition method which checks 'source' deltas

	});

	/* composition - introducing 'DeltaModel' */
	// to compose delta models, we simply have one apply after the other
	// without any composability checks; in the future, this may become more clever
	deltaJs.newComposition((d1, d2) => (d1 instanceof DeltaModel || d2 instanceof DeltaModel), (d1, d2) => {
		var result = new DeltaModel();
		result.graph.addNewVertex(1, d1);
		result.graph.addNewVertex(2, d2);
		result.graph.addNewEdge(1, 2);
		return result;
	});

};
