import U from './misc.js';

export var ApplicationError = U.newSubclass(Error, (superFn) => function ApplicationError(delta, value) {
	superFn.call(this, `This delta of type '${delta.type}' cannot apply to this value of type '${typeof value}.`);
	this.delta = delta;
	this.value = value;
});

export var MultipleOverloadsApplicationError = U.newSubclass(ApplicationError, (superFn) => function MultipleOverloadsApplicationError(delta, value, errors = []) {
	superFn.call(this, delta, value);
	this.errors = errors;
	this.message = `None of these deltas of types ${delta.overloads.map(d => "'"+d.type+"'").join(',')} can apply to this value of type '${typeof value}.` +
	errors.map(e => `\n-- ${e.message}`).join('');
});

export var NoOverloadsApplicationError = U.newSubclass(ApplicationError, (superFn) => function NoOverloadsApplicationError(delta, value) {
	superFn.call(this, delta, value);
	this.message = `This delta of type '${delta.type}' has no spcific deltas assigned to it, so it cannot apply to this value of type '${typeof value}.`;
});

export var DeltaArgApplicationError = U.newSubclass(ApplicationError, (superFn) => function DeltaArgApplicationError(delta, baseDelta) {
	superFn.call(this, delta, baseDelta.arg);
	this.message = `This delta of type '${delta.type}' cannot apply to the type-'${typeof baseDelta.arg}'-value of this base delta of type '${baseDelta.type}'.`;
	this.baseDelta = baseDelta;
});

export var CompositionError = U.newSubclass(Error, (superFn) => function CompositionError(delta1, delta2) {
	superFn.call(this, `This delta of type '${delta1.type}' cannot be composed with this other delta of type '${delta2.type}.`);
	this.delta1 = delta1;
	this.delta2 = delta2;
});

export var MultipleOverloadsCompositionError = U.newSubclass(CompositionError, (superFn) => function MultipleOverloadsCompositionError(delta1, delta2, errors = []) {
	superFn.call(this, delta1, delta2);
	this.errors = errors;
	this.message = `There are no overloads to compose this delta of type '${delta1.type}' with this other delta of type '${delta2.type}'.` +
	errors.map(e => `\n-- ${e.message}`).join('');
});
