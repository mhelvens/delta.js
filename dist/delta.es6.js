/* import utilities */
import {extend} from './util.es6.js';


/* import the DeltaJs class */
import DeltaJs from './DeltaJs.es6.js';


/* make Target classes available under the DeltaJs symbol */
import {ReadableTarget, WritableTarget} from './Target.es6.js';
extend(DeltaJs, { ReadableTarget, WritableTarget });


/* make Path classes available under the DeltaJs symbol */
import Path from './Path.es6.js';
extend(DeltaJs, { Path });


/* make Error classes available under the DeltaJs symbol */
import {ApplicationError, PreconditionFailure, MultipleOverloadsApplicationError,
		NoOverloadsApplicationError, CompositionError,
        MultipleOverloadsCompositionError, ConstraintFailure,
        ApplicationOrderCycle, UnresolvedDeltaConflict,
        MultipleActiveProxiesError} from './Error.es6.js';
extend(DeltaJs, { ApplicationError, PreconditionFailure, MultipleOverloadsApplicationError,
                    NoOverloadsApplicationError, CompositionError,
                    MultipleOverloadsCompositionError, ConstraintFailure,
                    ApplicationOrderCycle, UnresolvedDeltaConflict,
                    MultipleActiveProxiesError });


/* export the DeltaJs class */
export default DeltaJs;
