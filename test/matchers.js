'use strict';

beforeEach(() => {
	jasmine.addMatchers({
		toBeReachable() {
			return {
				compare() {
					return {
						message: `Expected this test not to be reachable.`,
						pass   : true
					};
				}
			};
		},
		toThrowSpecific(util, customEqualityTesters) {
			return {
				compare(actual, expectedType, expectedContent) {
					var result = {};
					result.message = "";

					if (typeof expectedContent === 'undefined') {
						expectedContent = {};
					}

					try {
						actual();
						result.pass = false;
					} catch (exception) {
						result.pass = exception instanceof expectedType;
						if (result.pass) {
							result.pass = Object.keys(expectedContent).every((prop) => util.equals(expectedContent[prop], exception[prop], customEqualityTesters));
							result.message = `However, the thrown ${expectedType.prototype.name} had the following properties: ${JSON.stringify(exception, null, ' ')}`;
						} else {
							result.message = `However, the thrown exception was not a subclass of ${expectedType.prototype.name}.`;
						}
					}

					result.message = `Expected the function to throw a new ${expectedType.prototype.name} with the following properties:
									 ${JSON.stringify(expectedContent, null, ' ')}.
									 ${result.message}`;

					return result;
				}
			};
		},
		toEqualOneOf(util, customEqualityTesters) {
			return {
				compare(actual, ...expected) {
					var result = {};

					result.pass = expected.some((candidate) => util.equals(actual, candidate, customEqualityTesters));

					if (!result.pass) {
						result.message = `Expected ${JSON.stringify(actual)} to equal one of:
										 ${expected.map(JSON.stringify).join(', ')}`;
					}

					return result;
				}
			};
		},
		toContainSomethingEqualTo(util, customEqualityTesters) {
			return {
				compare(actual, expected) {
					var result = {};

					result.pass = actual.some((candidate) => util.equals(expected, candidate, customEqualityTesters));

					if (!result.pass) {
						result.message = `Expected ${JSON.stringify(actual)} to contain an element equal to ${JSON.stringify(expected)}`;
					}

					return result;
				}
			};
		}
	});
});
