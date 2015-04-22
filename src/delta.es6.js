/* import utilities */


/* import the DeltaJs class */
import DeltaJs from './DeltaJs.es6.js';


/* make Target classes available under the DeltaJs symbol */
import {ReadableTarget, WritableTarget} from './Target.es6.js';
Object.assign(DeltaJs, { ReadableTarget, WritableTarget });


/* make Path classes available under the DeltaJs symbol */
import Path from './Path.es6.js';
Object.assign(DeltaJs, { Path });


/* make Error classes available under the DeltaJs symbol */
import {ApplicationError, PreconditionFailure, MultipleOverloadsApplicationError,
		NoOverloadsApplicationError, CompositionError,
        MultipleOverloadsCompositionError, ConstraintFailure,
        ApplicationOrderCycle, UnresolvedDeltaConflict,
        MultipleActiveProxiesError} from './Error.es6.js';
Object.assign(DeltaJs, { ApplicationError, PreconditionFailure, MultipleOverloadsApplicationError,
                         NoOverloadsApplicationError, CompositionError,
                         MultipleOverloadsCompositionError, ConstraintFailure,
                         ApplicationOrderCycle, UnresolvedDeltaConflict,
                         MultipleActiveProxiesError });


/* export the DeltaJs class */
export default DeltaJs;
