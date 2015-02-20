/* import utilities */
import U from './misc.js';


/* import the DeltaJs class */
import DeltaJs from './DeltaJs.js';


/* make Target classes available under the DeltaJs symbol */
import {ReadableTarget, WritableTarget} from './Target.js';
U.extend(DeltaJs, { ReadableTarget, WritableTarget });


/* make Path classes available under the DeltaJs symbol */
import Path from './Path.js';
U.extend(DeltaJs, { Path });


/* make Error classes available under the DeltaJs symbol */
import {ApplicationError, MultipleOverloadsApplicationError,
		NoOverloadsApplicationError, DeltaArgApplicationError,
		CompositionError, MultipleOverloadsCompositionError,
		ConstraintFailure, ApplicationOrderCycle,
		UnresolvedConflict, MultipleActiveFacadesError} from './Error.js';
U.extend(DeltaJs, { ApplicationError, MultipleOverloadsApplicationError,
                    NoOverloadsApplicationError, DeltaArgApplicationError,
                    CompositionError, MultipleOverloadsCompositionError,
                    ConstraintFailure, ApplicationOrderCycle,
                    UnresolvedConflict, MultipleActiveFacadesError });


/* export the DeltaJs class */
export default DeltaJs;
