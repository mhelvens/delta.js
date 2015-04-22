/**
 * @class DeltaJs.ApplicationError
 * @extends Error
 */
export class ApplicationError extends Error {}

/**
 * @class DeltaJs.PreconditionFailure
 * @extends DeltaJs.ApplicationError
 */
export class PreconditionFailure extends ApplicationError {
	constructor(delta, value) {
		super();
		this.name = 'PreconditionFailure';
		this.message = `This delta of type '${delta.type}' cannot apply to this value of type '${typeof value}'.`;
		this.delta = delta;
		this.value = value;
	}
}

/**
 * @class DeltaJs.MultipleOverloadsApplicationError
 * @extends DeltaJs.PreconditionFailure
 */
export class MultipleOverloadsApplicationError extends PreconditionFailure {
	constructor(delta, value, errors = []) {
		super(delta, value);
		this.name = 'MultipleOverloadsApplicationError';
		this.message = `None of the delta-types ${delta.overloads.map(d => "'"+d.type+"'").join(',')} can apply to this value of type '${typeof value}'.` +
		errors.map(e => `\n-- ${e.message}`).join('');
		this.errors = errors;
	}
}

/**
 * @class DeltaJs.NoOverloadsApplicationError
 * @extends DeltaJs.PreconditionFailure
 */
export class NoOverloadsApplicationError extends PreconditionFailure {
	constructor(delta, value) {
		super(delta, value);
		this.name = 'NoOverloadsApplicationError';
		this.message = `This delta of type '${delta.type}' has no specific deltas assigned to it, so it cannot apply to this value of type '${typeof value}.`;
	}
}

/**
 * @class DeltaJs.UnresolvedDeltaConflict
 * @extends DeltaJs.ApplicationError
 */
export class UnresolvedDeltaConflict extends ApplicationError {
	constructor(deltaNames) {
		super();
		this.name = 'UnresolvedDeltaConflict';
		deltaNames = [...deltaNames];
		var nameList = deltaNames.slice(0, -1).map(name => `'${name}'`).join(',');
		this.message = `There is an unresolved conflict between deltas ${nameList} and '${deltaNames[deltaNames.length-1]}'.`;
		this.deltaNames = deltaNames;
	}
}

/**
 * @class DeltaJs.CompositionError
 * @extends Error
 */
export class CompositionError extends Error {
	constructor(delta1, delta2) {
		super();
		this.name = 'CompositionError';
		this.message = `This delta of type '${delta1.type}' cannot be composed with this other delta of type '${delta2.type}'.`;
		this.delta1 = delta1;
		this.delta2 = delta2;
	}
}

/**
 * @class DeltaJs.MultipleOverloadsCompositionError
 * @extends DeltaJs.CompositionError
 */
export class MultipleOverloadsCompositionError extends CompositionError {
	constructor(delta1, delta2, errors = []) {
		super(delta1, delta2);
		this.name = 'MultipleOverloadsCompositionError';
		this.message = `There are no overloads to compose this delta of type '${delta1.type}' with this other delta of type '${delta2.type}'.` +
		errors.map(e => `\n-- ${e.message}`).join('');
		this.errors = errors;
	}
}

/**
 * @class DeltaJs.ConstraintFailure
 * @extends Error
 */
export class ConstraintFailure extends Error {
	constructor(feature) {
		super();
		this.name = 'ConstraintFailure';
		this.message = `The feature '${feature.name}' is both selected and excluded by its constraints.`;
		this.feature = feature;
	}
}

/**
 * @class DeltaJs.ApplicationOrderCycle
 * @extends Error
 */
export class ApplicationOrderCycle extends Error {
	constructor(cycle) {
		super();
		this.name = 'ApplicationOrderCycle';
		this.message = `The new application order created a cycle: ${cycle}}`;
		this.cycle = cycle;
	}
}

/**
 * @class DeltaJs.MultipleActiveProxiesError
 * @extends Error
 */
export class MultipleActiveProxiesError extends Error {
	constructor() {
		super();
		this.name = 'MultipleActiveProxiesError';
		this.message = `Only one Proxy per path can be active at any given time.`;
	}
}
