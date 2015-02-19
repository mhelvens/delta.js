import U from './misc.js';

export var ApplicationError = U.newSubclass(Error, (superFn) => function ApplicationError(delta, value) {
	superFn.call(this);
	this.name = 'ApplicationError';
	this.message = `This delta of type '${delta.type}' cannot apply to this value of type '${typeof value}'.`;
	this.delta = delta;
	this.value = value;
});

export var MultipleOverloadsApplicationError = U.newSubclass(ApplicationError, (superFn) => function MultipleOverloadsApplicationError(delta, value, errors = []) {
	superFn.call(this, delta, value);
	this.name = 'MultipleOverloadsApplicationError';
	this.message = `None of the delta-types ${delta.overloads.map(d => "'"+d.type+"'").join(',')} can apply to this value of type '${typeof value}'.` +
	               errors.map(e => `\n-- ${e.message}`).join('');
	this.errors = errors;
});

export var NoOverloadsApplicationError = U.newSubclass(ApplicationError, (superFn) => function NoOverloadsApplicationError(delta, value) {
	superFn.call(this, delta, value);
	this.name = 'NoOverloadsApplicationError';
	this.message = `This delta of type '${delta.type}' has no spcific deltas assigned to it, so it cannot apply to this value of type '${typeof value}.`;
});

export var DeltaArgApplicationError = U.newSubclass(ApplicationError, (superFn) => function DeltaArgApplicationError(delta, baseDelta) {
	superFn.call(this, delta, baseDelta.arg);
	this.name = 'DeltaArgApplicationError';
	this.message = `This delta of type '${delta.type}' cannot apply to the type-'${typeof baseDelta.arg}'-value of this base delta of type '${baseDelta.type}'.`;
	this.baseDelta = baseDelta;
});

export var CompositionError = U.newSubclass(Error, (superFn) => function CompositionError(delta1, delta2) {
	superFn.call(this);
	this.name = 'CompositionError';
	this.message = `This delta of type '${delta1.type}' cannot be composed with this other delta of type '${delta2.type}'.`;
	this.delta1 = delta1;
	this.delta2 = delta2;
});

export var MultipleOverloadsCompositionError = U.newSubclass(CompositionError, (superFn) => function MultipleOverloadsCompositionError(delta1, delta2, errors = []) {
	superFn.call(this, delta1, delta2);
	this.name = 'MultipleOverloadsCompositionError';
	this.message = `There are no overloads to compose this delta of type '${delta1.type}' with this other delta of type '${delta2.type}'.` +
	               errors.map(e => `\n-- ${e.message}`).join('');
	this.errors = errors;
});

export var ConstraintFailure = U.newSubclass(Error, (superFn) => function ConstraintFailure(feature) {
	superFn.call(this);
	this.name = 'ConstraintFailure';
	this.message = `The feature '${feature.name}' is both selected and excluded by its constraints.`;
	this.feature = feature;
});

export var ApplicationOrderCycle = U.newSubclass(Error, (superFn) => function ApplicationOrderCycle(from, to) {
	superFn.call(this);
	this.name = 'ApplicationOrderCycle';
	this.message = `The new application order between ${from} and ${to} created a cycle.`;
	this.from = from;
	this.to   = to;
});

export var DeltaConflict = U.newSubclass(Error, (superFn) => function DeltaConflict(deltas) {
	superFn.call(this);
	this.name = 'DeltaConflict';
	var deltaNames = deltas.map(d => `'${d.name}'`).join(',');
	this.message = `There is an unresolved conflict between deltas ${deltaNames}.`;
	this.deltas = deltas;
});




