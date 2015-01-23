/* import external libraries */
import JsGraph from 'js-graph';


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
		 * @param method {string}   - the type of operation (e.g., 'add', 'remove', etc.)
		 * @param name {string}     - the name of the delta inside the delta model
		 * @param options {object?} - the (optional) options for this operation
		 * @param path {string}     - the relative path to perform this operation on
		 * @param arg {*}           - the argument to the operation
		 * @return {DeltaJs#Delta}  - the delta resulting from the operation
		 */
		operation(method, name, options, path, arg) {
			if (typeof options === 'string') { [options, path, arg] = [{}, options, path] }
			var delta = deltaJs._getDeltaByMethod(method, arg);
			return this._addOperation(name, options, new Path(path), delta);
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
			var {before} = options;

			var deltaBase = delta;

			/* if there is a path, create the corresponding chain of deltas */
			if (path.prop) {
				deltaBase = new deltaJs.Delta.Modify();
				deltaBase._addOperation(options, path, delta);
			}

			/* a delta by this name cannot already be in the graph */
			U.assert(!this.graph.vertexValue(name),
					`A delta by the name “${name}” is already in this delta model.`);

			/* add the new delta to the delta model */
			this.graph.addVertex(name, deltaBase);

			/* connect it to the partial order */
			(before || []).forEach((subordinateName) => {
				this.graph.createEdge(subordinateName, name);
			});

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
