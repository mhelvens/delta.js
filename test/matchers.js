'use strict';

window.any = jasmine.any;

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
					var messageEnd = "";
					try {
						actual();
						result.pass = false;
						messageEnd = "However, no exception was thrown.";
					} catch (exception) {
						result.pass = exception instanceof expectedType;
						if (result.pass) {
							result.pass = Object.keys(expectedContent || {}).every((prop) => util.equals(expectedContent[prop], exception[prop], customEqualityTesters));
							messageEnd = `However, the thrown ${expectedType.prototype.name} had the following properties: ${JSON.stringify(exception, null, ' ')}`;
						} else {
							messageEnd = `However, the thrown exception was not a subclass of ${expectedType.name}.`;
							if (typeof exception.name === 'string') { messageEnd += ` It is of type ${exception.name}.` }
							messageEnd += `\n${exception.message}`;
							if (exception.stack) { messageEnd += `\n${exception.stack}` }
						}
					}

					result.message = `Expected the function to throw a new ${expectedType.name}`;
					if (expectedContent) {
						result.message += ` with the following properties:\n${JSON.stringify(expectedContent, null, ' ')}\n`;
					} else {
						result.message += ".\n";
					}
					result.message += messageEnd;

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
