/* import utilities */
import U from './misc.js';


/* import the DeltaJs class */
import DeltaJs from './DeltaJs.js';


/* import the other stuff */
import { ReadableTarget, WritableTarget } from './Target.js';
import Path from './Path.js';
import {
	ApplicationError,
	MultipleOverloadsApplicationError,
	NoOverloadsApplicationError,
	DeltaArgApplicationError,
	CompositionError,
	MultipleOverloadsCompositionError } from './Error.js';


/* make these available under the DeltaJs symbol */
U.extend(DeltaJs, {
	WritableTarget,
	ReadableTarget,
	Path,
	ApplicationError,
	MultipleOverloadsApplicationError,
	NoOverloadsApplicationError,
	DeltaArgApplicationError,
	CompositionError,
	MultipleOverloadsCompositionError
});


/* export the main class */
export default DeltaJs;
