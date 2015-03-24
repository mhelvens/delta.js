/* import utilities */
import {extend} from './util.js';


/* import the DeltaJs class */
import DeltaJs from './DeltaJs.js';


/* make Target classes available under the DeltaJs symbol */
import {ReadableTarget, WritableTarget} from './Target.js';
extend(DeltaJs, { ReadableTarget, WritableTarget });


/* make Path classes available under the DeltaJs symbol */
import Path from './Path.js';
extend(DeltaJs, { Path });


/* make Error classes available under the DeltaJs symbol */
import {ApplicationError, MultipleOverloadsApplicationError,
		NoOverloadsApplicationError, CompositionError,
        MultipleOverloadsCompositionError, ConstraintFailure,
        ApplicationOrderCycle, UnresolvedDeltaConflict,
        MultipleActiveProxiesError} from './Error.js';
extend(DeltaJs, { ApplicationError, MultipleOverloadsApplicationError,
                    NoOverloadsApplicationError, CompositionError,
                    MultipleOverloadsCompositionError, ConstraintFailure,
                    ApplicationOrderCycle, UnresolvedDeltaConflict,
                    MultipleActiveProxiesError });


/* export the DeltaJs class */
export default DeltaJs;
