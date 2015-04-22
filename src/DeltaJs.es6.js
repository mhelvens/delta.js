/* import internal stuff */
import define_OperationTypes                                 from './operationTypes.es6.js';
import define_Delta                                          from './Delta_class.es6.js';
import define_Composed                                       from './Composed.es6.js';
import define_Overloaded                                     from './Overloaded.es6.js';
import define_Modify                                         from './Modify.es6.js';
import define_basicOperations                                from './basicOperations.es6.js';
import define_PutIntoArray                                   from './PutIntoArray.es6.js';
import define_PutIntoFunction                                from './PutIntoFunction.es6.js';
import define_DeltaModel                                     from './DeltaModel.es6.js';
import define_features                                       from './features.es6.js';
import define_variationPoints                                from './variationPoints.es6.js';
import define_applicationConditions                          from './applicationConditions.es6.js';
import define_ContainerProxy                                 from './ContainerProxy.es6.js';


/**
 * @public
 * @class DeltaJs
 * @classdesc
 * This class offers every functionality you need from delta modeling.
 * Each instance offers its own operation types and variation points
 * and acts as a facade (as in design pattern) to the more specific
 * subsystems of delta.js.
 *
 * Using multiple `DeltaJs` instances allows you to use different sets
 * of deltas and rules in the same project that work independently
 * from each other. But you will usually need only one DeltaJs
 * instance per application.
 */
export default class DeltaJs {
	constructor() {
		define_OperationTypes       (this);
		define_ContainerProxy       (this);
		define_Delta                (this);
		define_Composed             (this);
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
}
