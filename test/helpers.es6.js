'use strict';

/* export utility stuff */
export let any = jasmine.any;

/* add matchers */
beforeEach(() => {

	jasmine.addCustomEqualityTester(function setEquals(a, b) {
		if (a instanceof Set && b instanceof Set) {
			if (a.size !== b.size) { return false }
			for (let aValue of a) {
				let found = false;
				for (let bValue of b) {
					if (jasmine.matchersUtil.equals(aValue, bValue, this)) {
						found = true;
						break;
					}
				}
				if (!found) { return false }
			}
			return true;
		}
	});

	jasmine.addCustomEqualityTester(function mapEquals(a, b) {
		if (a instanceof Map && b instanceof Map) {
			if (a.size !== b.size) { return false }
			for (let [key] of a) {
				if (!b.has(key))                                                { return false }
				if (!jasmine.matchersUtil.equals(a.get(key), b.get(key), this)) { return false }
			}
			return true;
		}
	});

	jasmine.addMatchers({
		toBeReachable(/*util, customEqualityTesters*/) {
			return {
				compare() {
					var result = {};
					result.message = "Expected this test not to be reachable.";
					result.pass = true;
					return result;
				}
			};
		},
		toThrowSpecific(util, customEqualityTesters) {
			return {
				compare(actual, expectedType, ...expectedContent) {
					var result = {};
					result.message = "";

					if (expectedContent.length === 0) { expectedContent.push({}) }

					try {
						actual();
						result.pass = false;
					} catch (exception) {
						result.pass = exception instanceof expectedType;
						if (result.pass) {
							let realProps = {};
							result.pass = expectedContent.some((eContent) =>
								Object.keys(eContent).every((prop) => {
									realProps[prop] = exception[prop];
									return util.equals(eContent[prop], exception[prop], customEqualityTesters);
								}));
							result.message = `However, the thrown ${expectedType.prototype.name} had the following properties: ${JSON.stringify(realProps)}`;
						} else {
							result.message = `However, the thrown exception was not a subclass of ${expectedType.prototype.name}.`;
						}
					}

					if (expectedContent.length === 1) {
						result.message = `Expected the function to throw a new ${expectedType.prototype.name} with the following properties: ` +
						                 `${JSON.stringify(expectedContent[0])}. ${result.message}`;
					} else {
						result.message = `Expected the function to throw a new ${expectedType.prototype.name} with one of the following sets of properties: ` +
						                 `${expectedContent.map(JSON.stringify).join(', ')}. ${result.message}`;
					}

					return result;
				}
			};
		},
		toEqualOneOf(util, customEqualityTesters) {
			return {
				compare(actual, expected) {
					var candidates = Array.prototype.slice.call(arguments, 1);
					var result = {};

					result.pass = candidates.some((candidate) => {
						return util.equals(actual, candidate, customEqualityTesters);
					});

					if (!result.pass) {
						result.message = `Expected ${JSON.stringify(actual)} to equal one of: ` +
						                 candidates.map(JSON.stringify).join(', ');
					}

					return result;
				}
			};
		}
	});
});
