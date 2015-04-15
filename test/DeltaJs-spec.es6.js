import {any}   from './helpers.es6.js';
import DeltaJs from '../src/delta.es6.js';


describe("DeltaJs constructor", () => {

	it("is present", () => {
		expect(DeltaJs).toEqual(any(Function));
	});

	it("never throws any exception", () => {
		expect(() => new DeltaJs()).not.toThrow();
	});

	it("returns an object of type DeltaJs", () => {
		expect(new DeltaJs()).toEqual(any(DeltaJs));
	});

});


describe("DeltaJs instance -", () => {


	/* from here on, every test starts with a fresh DeltaJs instance */
	var deltaJs;
	beforeEach(() => {
		deltaJs = new DeltaJs();
	});


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	/* declare a delta variable accessible to every test */
	var delta; // the itCan test is done on this 'delta' variable

	/*  a convenience function for testing that delta through 'triples',        */
	/*  a nice notation for a bunch of similar tests specified in three parts:  */
	/*  (1) precondition: some value before applying the delta                  */
	/*  (2) action: building up the delta                                       */
	/*  (3) postcondition: the value after delta-application, or an expected    */
	/*      error, or any custom set of assertions                              */
	function _itCan(fn) {
		return function (description, triples) {
			var counter = 0;
			triples.forEach(([pre, action, post]) => {
				fn(`can ${description} (${++counter})`, () => {
					/* creating the initial object using the given 'pre' */
					var rootObj = typeof pre === 'function' ? pre() : pre;

					/* creating the delta through the given code */
					if (post instanceof ExpectedError && !(post.type.prototype instanceof DeltaJs.ApplicationError)) {
						expect(() => {
							action();
							_afterAction();
						}).toThrowSpecific(post.type, post.content);
					} else {
						action();
						_afterAction();

						/* applying the delta to the given 'pre' value */
						if (post instanceof ExpectedError) {
							expect(() => { delta.applyTo(rootObj) }).toThrowSpecific(post.type, post.content);
						} else {
							delta.applyTo(rootObj);
							if (typeof post === 'function') {
								post(rootObj);
							} else {
								expect(rootObj).toEqual(post);
							}
						}
					}
				});
			});
		};
	}
	var itCan  = _itCan(it);
	var xitCan = _itCan(xit);

	/* a function for specifying any code to be run after each action but before applying the delta */
	var _afterAction;
	beforeEach(() => { _afterAction = ()=>{} });
	function afterAction(fn) { _afterAction = fn }

	/* a way to specify an expected error thrown */
	function ExpectedError(type, content) {
		this.type = type;
		this.content = content;
	}
	function expectError(type, content) { return new ExpectedError(type, content) }


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	describe("algebraic", () => {

		// These delta-algebra tests establish the behavior of delta application, composition, equality, etc.
		// These tests are done without using any Proxy, and only on the basic operation types:
		//     Modify, Add, Remove, Replace, Forbid
		// Testing all other operation types this way would become tiresome and redundant.

		describe("delta application", () => {

			beforeEach(() => {
				delta = new deltaJs.Delta.Modify();
			});

			it("can be manually performed on values", () => {
				delta.subDeltas.set('foo', new deltaJs.Delta.Add("bar"));
				var obj = { existingKey: "existing value" };
				delta.applyTo(obj);
				expect(obj).toEqual({ existingKey: "existing value", foo: "bar" });
			});

			// From here on, the helper function 'itCan' is used, which accepts a list of 'triples'
			// in a nice notation for testing. It applies the delta for us and compares results, etc.

			itCan("add a new field to an object", [[
				{},
				() => { delta.subDeltas.set('foo', new deltaJs.Delta.Add("bar")) },
				{ foo: "bar" }
			], [
				{ key: "val" },
				() => { delta.subDeltas.set('foo', new deltaJs.Delta.Add("bar")) },
				{ key: "val", foo: "bar" }
			], [
				{ obj: {} },
				() => {
					delta.subDeltas.set('obj', new deltaJs.Delta.Modify({
						foo: new deltaJs.Delta.Add("bar")
					}));
				},
				{ obj: { foo: "bar" } }
			], [
				{ obj: { key: "val" } },
				() => {
					delta.subDeltas.set('obj', new deltaJs.Delta.Modify({
						foo: new deltaJs.Delta.Add("bar")
					}));
				},
				{ obj: { key: "val", foo: "bar" } }
			], [
				{ key: "val" },
				() => { delta.subDeltas.set('key', new deltaJs.Delta.Add("bar")) },
				expectError(DeltaJs.PreconditionFailure)
			]]);

			itCan("remove an existing field from an object", [[
				{ foo: "bar" },
				() => { delta.subDeltas.set('foo', new deltaJs.Delta.Remove()) },
				{}
			], [
				{ key: "val", foo: "bar" },
				() => { delta.subDeltas.set('foo', new deltaJs.Delta.Remove()) },
				{ key: "val" }
			], [
				{ obj: { foo: "bar" } },
				() => {
					delta.subDeltas.set('obj', new deltaJs.Delta.Modify({
						foo: new deltaJs.Delta.Remove()
					}));
				},
				{ obj: {} }
			], [
				{ obj: { key: "val", foo: "bar" } },
				() => {
					delta.subDeltas.set('obj', new deltaJs.Delta.Modify({
						foo: new deltaJs.Delta.Remove()
					}));
				},
				{ obj: { key: "val" } }
			], [
				{ foo: "bar" },
				() => { delta.subDeltas.set('absentKey', new deltaJs.Delta.Remove()) },
				expectError(DeltaJs.PreconditionFailure)
			]]);

			itCan("forbid a field from being in an object", [[
				{ foo: "bar" },
				() => { delta.subDeltas.set('absentKey', new deltaJs.Delta.Forbid()) },
				{ foo: "bar" }
			], [
				{ obj: { foo: "bar" } },
				() => {
					delta.subDeltas.set('obj', new deltaJs.Delta.Modify({
						absentKey: new deltaJs.Delta.Forbid()
					}));
				},
				{ obj: { foo: "bar" } }
			], [
				{ key: "val", foo: "bar" },
				() => { delta.subDeltas.set('key', new deltaJs.Delta.Forbid()) },
				expectError(DeltaJs.PreconditionFailure)
			]]);

			itCan("replace an existing field in an object", [[
				{ foo: "bar" },
				() => { delta.subDeltas.set('foo', new deltaJs.Delta.Replace("BAS")) },
				{ foo: "BAS" }
			], [
				{ key: "val", foo: "bar" },
				() => { delta.subDeltas.set('foo', new deltaJs.Delta.Replace("BAS")) },
				{ key: "val", foo: "BAS" }
			], [
				{ obj: { foo: "bar" } },
				() => {
					delta.subDeltas.set('obj', new deltaJs.Delta.Modify({
						foo: new deltaJs.Delta.Replace("BAS")
					}));
				},
				{ obj: { foo: "BAS" } }
			], [
				{ obj: { key: "val", foo: "bar" } },
				() => {
					delta.subDeltas.set('obj', new deltaJs.Delta.Modify({
						foo: new deltaJs.Delta.Replace("BAS")
					}));
				},
				{ obj: { key: "val", foo: "BAS" } }
			], [
				{ foo: "bar" },
				() => { delta.subDeltas.set('absentKey', new deltaJs.Delta.Replace("BAS")) },
				expectError(DeltaJs.PreconditionFailure)
			]]);

			itCan("update an existing field in an object using the old value", [[
				{ foo: "bar" },
				() => { delta.subDeltas.set('foo', new deltaJs.Delta.Update(old => `${old}-BAS`)) },
				{ foo: "bar-BAS" }
			], [
				{ key: "val", foo: "bar" },
				() => { delta.subDeltas.set('foo', new deltaJs.Delta.Update(old => `${old}-BAS`)) },
				{ key: "val", foo: "bar-BAS" }
			], [
				{ obj: { foo: "bar" } },
				() => {
					delta.subDeltas.set('obj', new deltaJs.Delta.Modify({
						foo: new deltaJs.Delta.Update(old => `${old}-BAS`)
					}));
				},
				{ obj: { foo: "bar-BAS" } }
			], [
				{ obj: { key: "val", foo: "bar" } },
				() => {
					delta.subDeltas.set('obj', new deltaJs.Delta.Modify({
						foo: new deltaJs.Delta.Update(old => `${old}-BAS`)
					}));
				},
				{ obj: { key: "val", foo: "bar-BAS" } }
			]]);

			// NOTE: We're not expecting Update on an undefined value to throw an error,
			//       because Update shouldn't have such a precondition. However, that's not
			//       implemented yet, so the correct behavior isn't tested yet either.

		});

		// From this point, two deltas are involved in testing.
		var d1, d2;
		beforeEach(() => {
			d1 = new deltaJs.Delta.Modify();
			d2 = new deltaJs.Delta.Modify();
		});

		describe("delta composition", () => {

			itCan("correctly modify objects when the composition is valid", [[
				{ key: "val" },
				() => {
					d1.subDeltas.set('foo1', new deltaJs.Delta.Add("bar1"));
					d2.subDeltas.set('foo2', new deltaJs.Delta.Add("bar2"));
					delta = d1.composedWith(d2);
				},
				{ key: "val", foo1: "bar1", foo2: "bar2" }
			], [
				{ key: "val", key1: "val1", key2: "val2" },
				() => {
					d1.subDeltas.set('key1', new deltaJs.Delta.Remove());
					d2.subDeltas.set('key2', new deltaJs.Delta.Remove());
					delta = d1.composedWith(d2);
				},
				{ key: "val" }
			], [
				{ key: "val" },
				() => {
					d1.subDeltas.set('foo1', new deltaJs.Delta.Forbid());
					d2.subDeltas.set('foo2', new deltaJs.Delta.Forbid());
					delta = d1.composedWith(d2);
				},
				{ key: "val" }
			], [
				{ key1: "val1", key2: "val2" },
				() => {
					d1.subDeltas.set('key1', new deltaJs.Delta.Replace("VAL1"));
					d2.subDeltas.set('key2', new deltaJs.Delta.Replace("VAL2"));
					delta = d1.composedWith(d2);
				},
				{ key1: "VAL1", key2: "VAL2" }
			], [
				{ key: "val" },
				() => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Add({}));
					d2.subDeltas.set('foo', new deltaJs.Delta.Modify({
						bar: new deltaJs.Delta.Add("bas")
					}));
					delta = d1.composedWith(d2);
				},
				{ key: "val", foo: { bar: "bas" } }
			], [
				{ key: "val", foo: "bar" },
				() => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Add({}));
					d2.subDeltas.set('foo', new deltaJs.Delta.Modify({
						bar: new deltaJs.Delta.Add("bas")
					}));
					delta = d1.composedWith(d2);
				},
				expectError(DeltaJs.PreconditionFailure) // 'foo' is forbidden, but was present
			], [
				{ key: "val" },
				() => {
					// a more complex / deep version of 'add' composed with 'modify' (so, just for this one, two extra deltas)
					var delta3 = new deltaJs.Delta.Modify();
					var delta4 = new deltaJs.Delta.Modify();
					d1.subDeltas.set('level1', new deltaJs.Delta.Add({ level2: {} }));
					d2.subDeltas.set('level1', new deltaJs.Delta.Modify({
						level2: new deltaJs.Delta.Modify({
							sideLevel: new deltaJs.Delta.Add("final")
						})
					}));
					delta3.subDeltas.set('level1', new deltaJs.Delta.Modify({
						level2: new deltaJs.Delta.Modify({
							level3: new deltaJs.Delta.Add({})
						})
					}));
					delta4.subDeltas.set('level1', new deltaJs.Delta.Modify({
						level2: new deltaJs.Delta.Modify({
							level3: new deltaJs.Delta.Modify({
								level4: new deltaJs.Delta.Add("final")
							})
						})
					}));
					delta = d1.composedWith(d2).composedWith(delta3).composedWith(delta4);
				},
				{ key: "val", level1: { level2: { sideLevel: "final", level3: { level4: "final" } } } }
			], [
				{ key: "val", foo: { bar: "bas" } },
				() => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Modify({
						newKey: new deltaJs.Delta.Add("newVal")
					}));
					d2.subDeltas.set('foo', new deltaJs.Delta.Remove());
					delta = d1.composedWith(d2);
				},
				{ key: "val" }
			], [
				{ key: "val" },
				() => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Add("bar"));
					d2.subDeltas.set('foo', new deltaJs.Delta.Remove());
					delta = d1.composedWith(d2);
				},
				{ key: "val" }
			], [
				{ key: "val", foo: "whatever" },
				() => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Add("bar"));
					d2.subDeltas.set('foo', new deltaJs.Delta.Remove());
					delta = d1.composedWith(d2);
				},
				expectError(DeltaJs.PreconditionFailure) // 'foo' is forbidden, but was present
			], [
				{ key: "val", foo: "whatever" },
				() => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Remove());
					d2.subDeltas.set('foo', new deltaJs.Delta.Add("bar"));
					delta = d1.composedWith(d2);
				},
				{ key: "val", foo: "bar" }
			], [
				{ key: "val" },
				() => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Remove());
					d2.subDeltas.set('foo', new deltaJs.Delta.Add("bar"));
					delta = d1.composedWith(d2);
				},
				expectError(DeltaJs.PreconditionFailure) // 'foo' is mandatory, but was absent
			], [
				{ key: "val", foo: "whatever" },
				() => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Remove());
					d2.subDeltas.set('foo', new deltaJs.Delta.Forbid());
					delta = d1.composedWith(d2);
				},
				{ key: "val" }
			], [
				{ key: "val" },
				() => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Remove());
					d2.subDeltas.set('foo', new deltaJs.Delta.Forbid());
					delta = d1.composedWith(d2);
				},
				expectError(DeltaJs.PreconditionFailure) // 'foo' is mandatory, but was absent
			], [
				{ key: "val" },
				() => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Forbid());
					d2.subDeltas.set('foo', new deltaJs.Delta.Add("bar"));
					delta = d1.composedWith(d2);
				},
				{ key: "val", foo: "bar" }
			], [
				{ key: "val", foo: "bar" },
				() => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Forbid());
					d2.subDeltas.set('foo', new deltaJs.Delta.Add("bar"));
					delta = d1.composedWith(d2);
				},
				expectError(DeltaJs.PreconditionFailure) // 'foo' is forbidden, but was present
			], [
				{ key: "val" },
				() => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Forbid());
					d2.subDeltas.set('foo', new deltaJs.Delta.Forbid());
					delta = d1.composedWith(d2);
				},
				{ key: "val" }
			], [
				{ key: "val", foo: "bar" },
				() => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Forbid());
					d2.subDeltas.set('foo', new deltaJs.Delta.Forbid());
					delta = d1.composedWith(d2);
				},
				expectError(DeltaJs.PreconditionFailure) // 'foo' is forbidden (twice), but was present
			], [
				{ key: "val", foo: { bar: "bas" } },
				() => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Modify());
					d2.subDeltas.set('foo', new deltaJs.Delta.Replace("newValue"));
					delta = d1.composedWith(d2);
				},
				{ key: "val", foo: "newValue" }
			], [
				{ key: "val" },
				() => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Modify());
					d2.subDeltas.set('foo', new deltaJs.Delta.Replace("newValue"));
					delta = d1.composedWith(d2);
				},
				expectError(DeltaJs.PreconditionFailure) // 'foo' is mandatory, but was absent
			], [
				{ key: "val" },
				() => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Add("oldValue"));
					d2.subDeltas.set('foo', new deltaJs.Delta.Replace("newValue"));
					delta = d1.composedWith(d2);
				},
				{ key: "val", foo: "newValue" }
			], [
				{ key: "val", foo: { bar: "bas" } },
				() => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Add("oldValue"));
					d2.subDeltas.set('foo', new deltaJs.Delta.Replace("newValue"));
					delta = d1.composedWith(d2);
				},
				expectError(DeltaJs.PreconditionFailure) // 'foo' is forbidden, but was present
			], [
				{ key: "val", foo: "bar" },
				() => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Replace({}));
					d2.subDeltas.set('foo', new deltaJs.Delta.Modify({
						bar: new deltaJs.Delta.Add("bas")
					}));
					delta = d1.composedWith(d2);
				},
				{ key: "val", foo: { bar: "bas" } }
			], [
				{ key: "val" },
				() => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Replace({}));
					d2.subDeltas.set('foo', new deltaJs.Delta.Modify({
						bar: new deltaJs.Delta.Add("bas")
					}));
					delta = d1.composedWith(d2);
				},
				expectError(DeltaJs.PreconditionFailure) // 'foo' is mandatory, but was absent
			], [
				{ key: "val", level1: "oldValue" },
				() => {
					// a more complex / deep version of 'replace' composed with 'modify' (so, just for this one, two extra deltas)
					var delta3 = new deltaJs.Delta.Modify();
					var delta4 = new deltaJs.Delta.Modify();
					d1.subDeltas.set('level1', new deltaJs.Delta.Replace({ level2: {} }));
					d2.subDeltas.set('level1', new deltaJs.Delta.Modify({
						level2: new deltaJs.Delta.Modify({
							sideLevel: new deltaJs.Delta.Add("final")
						})
					}));
					delta3.subDeltas.set('level1', new deltaJs.Delta.Modify({
						level2: new deltaJs.Delta.Modify({
							level3: new deltaJs.Delta.Add({})
						})
					}));
					delta4.subDeltas.set('level1', new deltaJs.Delta.Modify({
						level2: new deltaJs.Delta.Modify({
							level3: new deltaJs.Delta.Modify({
								level4: new deltaJs.Delta.Add("final")
							})
						})
					}));
					delta = d1.composedWith(d2).composedWith(delta3).composedWith(delta4);
				},
				{ key: "val", level1: { level2: { sideLevel: "final", level3: { level4: "final" } } } }
			], [
				{ key: "val", foo: { bar: "bas" } },
				() => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Replace("newValue"));
					d2.subDeltas.set('foo', new deltaJs.Delta.Remove());
					delta = d1.composedWith(d2);
				},
				{ key: "val" }
			], [
				{ key: "val" },
				() => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Replace("newValue"));
					d2.subDeltas.set('foo', new deltaJs.Delta.Remove());
					delta = d1.composedWith(d2);
				},
				expectError(DeltaJs.PreconditionFailure) // 'foo' is mandatory, but was absent
			], [
				{ key: "val", foo: { bar: "bas" } },
				() => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Replace("oldValue"));
					d2.subDeltas.set('foo', new deltaJs.Delta.Replace("newValue"));
					delta = d1.composedWith(d2);
				},
				{ key: "val", foo: "newValue" }
			], [
				{ key: "val" },
				() => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Replace("oldValue"));
					d2.subDeltas.set('foo', new deltaJs.Delta.Replace("newValue"));
					delta = d1.composedWith(d2);
				},
				expectError(DeltaJs.PreconditionFailure) // 'foo' is mandatory, but was absent
			], [
				{ key: "val" },
				() => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Add("oldValue"));
					d2.subDeltas.set('foo', new deltaJs.Delta.Update(v => `${v}-newValue`));
					delta = d1.composedWith(d2);
				},
				{ key: "val", foo: "oldValue-newValue" }
			], [
				{ key: "val", foo: { bar: "bas" } },
				() => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Update(v => `${v}-newValue`));
					d2.subDeltas.set('foo', new deltaJs.Delta.Remove());
					delta = d1.composedWith(d2);
				},
				{ key: "val" }
			], [
				{ key: "val", foo: "initialValue" },
				() => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Update(v => `${v}-oldValue`));
					d2.subDeltas.set('foo', new deltaJs.Delta.Update(v => `${v}-newValue`));
					delta = d1.composedWith(d2);
				},
				{ key: "val", foo: "initialValue-oldValue-newValue" }
			], [
				{ key: "val", foo: { bar1: "bas1" } },
				() => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Modify({
						bar2: new deltaJs.Delta.Add("bas2")
					}));
					d2.subDeltas.set('foo', new deltaJs.Delta.Update(v => ({ BAR: `${v.bar1}-${v.bar2}` })));
					delta = d1.composedWith(d2);
				},
				{ key: "val", foo: { BAR: "bas1-bas2" } }
			], [
				{ key: "val", foo: "bas1" },
				() => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Update(v => ({ bar1: v })));
					d2.subDeltas.set('foo', new deltaJs.Delta.Modify({
						bar2: new deltaJs.Delta.Add("bas2")
					}));
					delta = d1.composedWith(d2);
				},
				{ key: "val", foo: { bar1: "bas1", bar2: "bas2" } }
			]]);

			// NOTE: We're not expecting Update on an undefined value to throw an error,
			//       because Update shouldn't have such a precondition. However, that's not
			//       implemented yet, so the correct behavior isn't tested yet either.

			itCan("throw an error when the composition is detectably invalid", [
				() => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Modify());
					d2.subDeltas.set('foo', new deltaJs.Delta.Add("bar"));
					delta = d1.composedWith(d2);
				}, () => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Add("bar1"));
					d2.subDeltas.set('foo', new deltaJs.Delta.Add("bar2"));
					delta = d1.composedWith(d2);
				}, () => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Remove());
					d2.subDeltas.set('foo', new deltaJs.Delta.Modify());
					delta = d1.composedWith(d2);
				}, () => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Remove());
					d2.subDeltas.set('foo', new deltaJs.Delta.Remove());
					delta = d1.composedWith(d2);
				}, () => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Modify());
					d2.subDeltas.set('foo', new deltaJs.Delta.Forbid());
					delta = d1.composedWith(d2);
				}, () => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Add("bar"));
					d2.subDeltas.set('foo', new deltaJs.Delta.Forbid());
					delta = d1.composedWith(d2);
				}, () => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Forbid());
					d2.subDeltas.set('foo', new deltaJs.Delta.Modify());
					delta = d1.composedWith(d2);
				}, () => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Forbid());
					d2.subDeltas.set('foo', new deltaJs.Delta.Remove());
					delta = d1.composedWith(d2);
				}, () => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Remove());
					d2.subDeltas.set('foo', new deltaJs.Delta.Replace("bar"));
					delta = d1.composedWith(d2);
				}, () => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Forbid());
					d2.subDeltas.set('foo', new deltaJs.Delta.Replace("bar"));
					delta = d1.composedWith(d2);
				}, () => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Replace("bar1"));
					d2.subDeltas.set('foo', new deltaJs.Delta.Add("bar2"));
					delta = d1.composedWith(d2);
				}, () => {
					d1.subDeltas.set('foo', new deltaJs.Delta.Replace("bar"));
					d2.subDeltas.set('foo', new deltaJs.Delta.Forbid());
					delta = d1.composedWith(d2);
				}
			].map((action) => [null, action, expectError(DeltaJs.CompositionError)]));

		});

		describe("delta equality", () => {

			it("tests two empty Modify deltas as equal", () => {
				expect(d1.equals(d2)).toBeTruthy();
			});

			it("tests two Modify->Add deltas as equal if they add the same value to the same key", () => {
				d1.subDeltas.set('key', new deltaJs.Delta.Add('value'));
				d2.subDeltas.set('key', new deltaJs.Delta.Add('value'));
				expect(d1.equals(d2)).toBeTruthy();
			});

			it("tests two Modify->Add deltas as unequal if they add different values to the same key", () => {
				d1.subDeltas.set('key', new deltaJs.Delta.Add('foo'));
				d2.subDeltas.set('key', new deltaJs.Delta.Add('bar'));
				expect(d1.equals(d2)).toBeFalsy();
			});

			it("tests two Modify->Add deltas as unequal if they add the same value to different keys", () => {
				d1.subDeltas.set('key1', new deltaJs.Delta.Add('value'));
				d2.subDeltas.set('key2', new deltaJs.Delta.Add('value'));
				expect(d1.equals(d2)).toBeFalsy();
			});

			it("tests two Modify->Replace deltas as equal if they add the same value to the same key", () => {
				d1.subDeltas.set('key', new deltaJs.Delta.Replace('value'));
				d2.subDeltas.set('key', new deltaJs.Delta.Replace('value'));
				expect(d1.equals(d2)).toBeTruthy();
			});

			it("tests two Modify->Replace deltas as unequal if they add different values to the same key", () => {
				d1.subDeltas.set('key', new deltaJs.Delta.Replace('foo'));
				d2.subDeltas.set('key', new deltaJs.Delta.Replace('bar'));
				expect(d1.equals(d2)).toBeFalsy();
			});

			it("tests two Modify->Replace deltas as unequal if they add the same value to different keys", () => {
				d1.subDeltas.set('key1', new deltaJs.Delta.Replace('value'));
				d2.subDeltas.set('key2', new deltaJs.Delta.Replace('value'));
				expect(d1.equals(d2)).toBeFalsy();
			});

			it("tests two Modify->Remove deltas as equal if they act on the same key", () => {
				d1.subDeltas.set('key', new deltaJs.Delta.Remove());
				d2.subDeltas.set('key', new deltaJs.Delta.Remove());
				expect(d1.equals(d2)).toBeTruthy();
			});

			it("tests two Modify->Remove deltas as unequal if they act on different keys", () => {
				d1.subDeltas.set('key1', new deltaJs.Delta.Remove());
				d2.subDeltas.set('key2', new deltaJs.Delta.Remove());
				expect(d1.equals(d2)).toBeFalsy();
			});

			it("tests two Modify->Forbid deltas as equal if they act on the same key", () => {
				d1.subDeltas.set('key', new deltaJs.Delta.Forbid());
				d2.subDeltas.set('key', new deltaJs.Delta.Forbid());
				expect(d1.equals(d2)).toBeTruthy();
			});

			it("tests two Modify->Forbid deltas as unequal if they act on different keys", () => {
				d1.subDeltas.set('key1', new deltaJs.Delta.Forbid());
				d2.subDeltas.set('key2', new deltaJs.Delta.Forbid());
				expect(d1.equals(d2)).toBeFalsy();
			});

			it("tests a Modify->Add delta as unequal to a Modify->Remove delta", () => {
				d1.subDeltas.set('key', new deltaJs.Delta.Add   ('value'));
				d2.subDeltas.set('key', new deltaJs.Delta.Remove()       );
				expect(d1.equals(d2)).toBeFalsy();
			});

			it("tests a Modify->Add delta as unequal to a Modify->Replace delta", () => {
				d1.subDeltas.set('key', new deltaJs.Delta.Add    ('value'));
				d2.subDeltas.set('key', new deltaJs.Delta.Replace('value'));
				expect(d1.equals(d2)).toBeFalsy();
			});

			it("tests a Modify->Add delta as unequal to a Modify->Forbid delta", () => {
				d1.subDeltas.set('key', new deltaJs.Delta.Add   ('value'));
				d2.subDeltas.set('key', new deltaJs.Delta.Forbid()       );
				expect(d1.equals(d2)).toBeFalsy();
			});

			it("tests a Modify->Add delta as unequal to a Modify->Modify delta", () => {
				d1.subDeltas.set('key', new deltaJs.Delta.Add   ('value'));
				d2.subDeltas.set('key', new deltaJs.Delta.Modify()       );
				expect(d1.equals(d2)).toBeFalsy();
			});

			it("tests a Modify->Remove delta as unequal to a Modify->Replace delta", () => {
				d1.subDeltas.set('key', new deltaJs.Delta.Remove ()       );
				d2.subDeltas.set('key', new deltaJs.Delta.Replace('value'));
				expect(d1.equals(d2)).toBeFalsy();
			});

			it("tests a Modify->Remove delta as unequal to a Modify->Forbid delta", () => {
				d1.subDeltas.set('key', new deltaJs.Delta.Remove());
				d2.subDeltas.set('key', new deltaJs.Delta.Forbid());
				expect(d1.equals(d2)).toBeFalsy();
			});

			it("tests a Modify->Remove delta as unequal to a Modify->Modify delta", () => {
				d1.subDeltas.set('key', new deltaJs.Delta.Remove());
				d2.subDeltas.set('key', new deltaJs.Delta.Modify());
				expect(d1.equals(d2)).toBeFalsy();
			});

			it("tests a Modify->Replace delta as unequal to a Modify->Forbid delta", () => {
				d1.subDeltas.set('key', new deltaJs.Delta.Replace('value'));
				d2.subDeltas.set('key', new deltaJs.Delta.Forbid ()       );
				expect(d1.equals(d2)).toBeFalsy();
			});

			it("tests a Modify->Replace delta as unequal to a Modify->Modify delta", () => {
				d1.subDeltas.set('key', new deltaJs.Delta.Replace('value'));
				d2.subDeltas.set('key', new deltaJs.Delta.Modify ()       );
				expect(d1.equals(d2)).toBeFalsy();
			});

			it("tests a Modify->Forbid delta as unequal to a Modify->Modify delta", () => {
				d1.subDeltas.set('key', new deltaJs.Delta.Forbid());
				d2.subDeltas.set('key', new deltaJs.Delta.Modify());
				expect(d1.equals(d2)).toBeFalsy();
			});

		});

	});


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	describe("delta proxies", () => {

		// These tests basically do the algebraic tests again, but we are building the deltas through a proxy.

		var proxy;
		beforeEach(() => {
			proxy = new deltaJs.Delta.Modify().do();
			afterAction(() => {
				delta = proxy.delta();
			});
		});

		describe("object operations", () => {

			itCan("add a new field to an object", [[
				{},
				() => { proxy.add('foo', "bar") },
				{ foo: "bar" }
			], [
				{ key: "val" },
				() => { proxy.add('foo', "bar") },
				{ key: "val", foo: "bar" }
			], [
				{ key: "val" },
				() => { proxy.add('key', "bar") },
				expectError(DeltaJs.PreconditionFailure)
			]]);

			itCan("remove an existing field from an object", [[
				{ foo: "bar" },
				() => { proxy.remove('foo') },
				{}
			], [
				{ key: "val", foo: "bar" },
				() => { proxy.remove('foo') },
				{ key: "val" }
			], [
				{ foo: "bar" },
				() => { proxy.remove('key') },
				expectError(DeltaJs.PreconditionFailure)
			]]);

			itCan("forbid a field from being in an object", [[
				{ foo: "bar" },
				() => { proxy.forbid('key') },
				{ foo: "bar" }
			], [
				{ key: "val", foo: "bar" },
				() => { proxy.forbid('key') },
				expectError(DeltaJs.PreconditionFailure)
			]]);

			itCan("replace an existing field in an object", [[
				{ foo: "bar" },
				() => { proxy.replace('foo', "BAS") },
				{ foo: "BAS" }
			], [
				{ key: "val", foo: "bar" },
				() => { proxy.replace('foo', "BAS") },
				{ key: "val", foo: "BAS" }
			], [
				{ foo: "bar" },
				() => { proxy.replace('key', "BAS") },
				expectError(DeltaJs.PreconditionFailure)
			]]);

			itCan("update an existing field in an object using the old value", [[
				{ foo: "bar" },
				() => { proxy.update('foo', old => `${old}-BAS`) },
				{ foo: "bar-BAS" }
			], [
				{ key: "val", foo: "bar" },
				() => { proxy.update('foo', old => `${old}-BAS`) },
				{ key: "val", foo: "bar-BAS" }
			], [
				{ obj: { foo: "bar" } },
				() => { proxy.update('obj.foo', old => `${old}-BAS`) },
				{ obj: { foo: "bar-BAS" } }
			], [
				{ obj: { key: "val", foo: "bar" } },
				() => { proxy.update('obj.foo', old => `${old}-BAS`) },
				{ obj: { key: "val", foo: "bar-BAS" } }
			], [
				{ fn(x) { return `(${x})` } },
				() => { proxy.update('fn', old => x => `-${old(x)}-`) },
				(obj) => { expect(obj.fn("message")).toEqual("-(message)-") }
			]]);

			// NOTE: We're not expecting Update on an undefined value to throw an error,
			//       because Update shouldn't have such a precondition. However, that's not
			//       implemented yet, so the correct behavior isn't tested yet either.

		});

		describe("composite object operations", () => {

			itCan("correctly modify objects when the composition is valid", [[
				{ key: "val" },
				() => {
					proxy.add('foo1', "bar1");
					proxy.add('foo2', "bar2");
				},
				{ key: "val", foo1: "bar1", foo2: "bar2" }
			], [
				{ key: "val", key1: "val1", key2: "val2" },
				() => {
					proxy.remove('key1');
					proxy.remove('key2');
				},
				{ key: "val" }
			], [
				{ key: "val" },
				() => {
					proxy.forbid('foo1');
					proxy.forbid('foo2');
				},
				{ key: "val" }
			], [
				{ key1: "val1", key2: "val2" },
				() => {
					proxy.replace('key1', "VAL1");
					proxy.replace('key2', "VAL2");
				},
				{ key1: "VAL1", key2: "VAL2" }
			], [
				{ key: "val" },
				() => {
					proxy.add('foo', {});
					proxy.modify('foo').add('bar', "bas");
				},
				{ key: "val", foo: { bar: "bas" } }
			], [
				{ key: "val", foo: "bar" },
				() => {
					proxy.add('foo', {});
					proxy.modify('foo').add('bar', "bas");
				},
				expectError(DeltaJs.PreconditionFailure) // 'foo' is forbidden, but was present
			], [
				{ key: "val" },
				() => {
					// a more complex / deep version of 'add' composed with 'modify'
					proxy.add('level1', { level2: {} });
					proxy.add('level1.level2.sideLevel', "final");
					proxy.modify('level1.level2').add('level3', {});
					proxy.modify('level1').modify('level2.level3').add('level4', "final");
				},
				{ key: "val", level1: { level2: { sideLevel: "final", level3: { level4: "final" } } } }
			], [
				{ key: "val", foo: { bar: "bas" } },
				() => {
					proxy.modify('foo').add('newKey', "newVal");
					proxy.remove('foo');
				},
				{ key: "val" }
			], [
				{ key: "val" },
				() => {
					proxy.add('foo', "bar");
					proxy.remove('foo');
				},
				{ key: "val" }
			], [
				{ key: "val", foo: "whatever" },
				() => {
					proxy.add('foo', "bar");
					proxy.remove('foo');
				},
				expectError(DeltaJs.PreconditionFailure) // 'foo' is forbidden, but was present
			], [
				{ key: "val", foo: "whatever" },
				() => {
					proxy.remove('foo');
					proxy.add('foo', "bar");
				},
				{ key: "val", foo: "bar" }
			], [
				{ key: "val" },
				() => {
					proxy.remove('foo');
					proxy.add('foo', "bar");
				},
				expectError(DeltaJs.PreconditionFailure) // 'foo' is mandatory, but was absent
			], [
				{ key: "val", foo: "whatever" },
				() => {
					proxy.remove('foo');
					proxy.forbid('foo');
				},
				{ key: "val" }
			], [
				{ key: "val" },
				() => {
					proxy.remove('foo');
					proxy.forbid('foo');
				},
				expectError(DeltaJs.PreconditionFailure) // 'foo' is mandatory, but was absent
			], [
				{ key: "val" },
				() => {
					proxy.forbid('foo');
					proxy.add('foo', "bar");
				},
				{ key: "val", foo: "bar" }
			], [
				{ key: "val", foo: "bar" },
				() => {
					proxy.forbid('foo');
					proxy.add('foo', "bar");
				},
				expectError(DeltaJs.PreconditionFailure) // 'foo' is forbidden, but was present
			], [
				{ key: "val" },
				() => {
					proxy.forbid('foo');
					proxy.forbid('foo');
				},
				{ key: "val" }
			], [
				{ key: "val", foo: "bar" },
				() => {
					proxy.forbid('foo');
					proxy.forbid('foo');
				},
				expectError(DeltaJs.PreconditionFailure) // 'foo' is forbidden (twice), but was present
			], [
				{ key: "val", foo: { bar: "bas" } },
				() => {
					proxy.modify('foo');
					proxy.replace('foo', "newValue");
				},
				{ key: "val", foo: "newValue" }
			], [
				{ key: "val" },
				() => {
					proxy.modify('foo');
					proxy.replace('foo', "newValue");
				},
				expectError(DeltaJs.PreconditionFailure) // 'foo' is mandatory, but was absent
			], [
				{ key: "val" },
				() => {
					proxy.add('foo', "oldValue");
					proxy.replace('foo', "newValue");
				},
				{ key: "val", foo: "newValue" }
			], [
				{ key: "val", foo: { bar: "bas" } },
				() => {
					proxy.add('foo', "oldValue");
					proxy.replace('foo', "newValue");
				},
				expectError(DeltaJs.PreconditionFailure) // 'foo' is forbidden, but was present
			], [
				{ key: "val", foo: "bar" },
				() => {
					proxy.replace('foo', {});
					proxy.modify('foo').add('bar', "bas");
				},
				{ key: "val", foo: { bar: "bas" } }
			], [
				{ key: "val" },
				() => {
					proxy.replace('foo', {});
					proxy.modify('foo').add('bar', "bas");
				},
				expectError(DeltaJs.PreconditionFailure) // 'foo' is mandatory, but was absent
			], [
				{ key: "val", level1: "oldValue" },
				() => {
					// a more complex / deep version of 'replace' composed with 'modify'
					proxy.replace('level1', { level2: {} });
					proxy.add('level1.level2.sideLevel', "final");
					proxy.modify('level1.level2').add('level3', {});
					proxy.modify('level1').modify('level2.level3').add('level4', "final");
				},
				{ key: "val", level1: { level2: { sideLevel: "final", level3: { level4: "final" } } } }
			], [
				{ key: "val", foo: { bar: "bas" } },
				() => {
					proxy.replace('foo', "newValue");
					proxy.remove('foo');
				},
				{ key: "val" }
			], [
				{ key: "val" },
				() => {
					proxy.replace('foo', "newValue");
					proxy.remove('foo');
				},
				expectError(DeltaJs.PreconditionFailure) // 'foo' is mandatory, but was absent
			], [
				{ key: "val", foo: { bar: "bas" } },
				() => {
					proxy.replace('foo', "oldValue");
					proxy.replace('foo', "newValue");
				},
				{ key: "val", foo: "newValue" }
			], [
				{ key: "val" },
				() => {
					proxy.replace('foo', "oldValue");
					proxy.replace('foo', "newValue");
				},
				expectError(DeltaJs.PreconditionFailure) // 'foo' is mandatory, but was absent
			]]);

			itCan("throw an error when the composition is detectably invalid", [
				() => {
					proxy.modify('foo');
					proxy.add('foo', "bar");
				}, () => {
					proxy.add('foo', "bar1");
					proxy.add('foo', "bar2");
				}, () => {
					proxy.remove('foo');
					proxy.modify('foo');
				}, () => {
					proxy.remove('foo');
					proxy.remove('foo');
				}, () => {
					proxy.modify('foo');
					proxy.forbid('foo');
				}, () => {
					proxy.add('foo', "bar");
					proxy.forbid('foo');
				}, () => {
					proxy.forbid('foo');
					proxy.modify('foo');
				}, () => {
					proxy.forbid('foo');
					proxy.remove('foo');
				}, () => {
					proxy.remove('foo');
					proxy.replace('foo', "bar");
				}, () => {
					proxy.forbid('foo');
					proxy.replace('foo', "bar");
				}, () => {
					proxy.replace('foo', "bar1");
					proxy.add('foo', "bar2");
				}, () => {
					proxy.replace('foo', "bar");
					proxy.forbid('foo');
				}
			].map(action => [null, action, expectError(DeltaJs.CompositionError)]));

		});

		describe("proxy-hierarchies", () => {


			itCan("always give you the deepest container proxy in your call-chain", [[
				{ obj: { sub: { subSub: {} } } },
				() => {
					proxy.modify('obj')         // .
						.add('foo', "bar")  // .obj
						.add('bar', "bas"); // .obj
				},
				{ obj: { foo: "bar", bar: "bas", sub: { subSub: {} } } }
			], [
				{ obj: { sub: { subSub: {} } } },
				() => {
					proxy.modify('obj')                   // .
						.add('sub.subSub.foo', "bar") // .obj
						.add('bar', "bas");           // .obj (even though two implicit modifies were used)
				},
				{ obj: { bar: "bas", sub: { subSub: { foo: "bar" } } } }
			], [
				{ obj: { sub: { subSub: {} } } },
				() => {
					proxy.modify('obj.sub')         // .
						.modify('subSub')       // .obj.sub
							.add('foo', "bar")  // .obj.sub.subSub
							.add('bar', "bas"); // .obj.sub.subSub
				},
				{ obj: { sub: { subSub: { foo: "bar", bar: "bas" } } } }
			], [
				{ obj: { sub: { subSub: {} } } },
				() => {
					proxy.deltaModel('obj')             // .
						.do('X')                    // .obj
							.add('foo', "bar")      // .obj[X]
					        .modify('sub')          // .obj[X] (note that all .do argument are remembered in the chain)
								.add('bar', "bas"); // .obj[X].sub
				},
				{ obj: { foo: "bar", sub: { bar: "bas", subSub: {} } } }
			], [
				{ obj: { sub: { subSub: {} } } },
				() => {
					var subD = proxy.modify('obj').add('foo', "bar");
					subD.add('bar', "bas");
					proxy.add('key', "val"); // (note that you can use an existing reference to a shallower proxy)
				},
				{ key: "val", obj: { foo: "bar", bar: "bas", sub: { subSub: {} } } }
			]]);

			itCan("can only have one sub-proxy per key active at a time", [[
				{ obj: { sub: {} } }, // modify -> modify
				() => {
					proxy = proxy.modify('obj');
					var subD = proxy.modify('sub'); // create subD
					proxy.replace('sub', {});       // deactivate subD
					subD.add('key', 'value');   // try to use subD
				},
				expectError(DeltaJs.MultipleActiveProxiesError)
			], [
				{ obj: { sub: {} } }, // deltaModel -> modify
				() => {
					proxy = proxy.deltaModel('obj');
					var subD = proxy.do('x').modify('sub'); // create subD
					proxy.do('x').replace('sub', {});       // deactivate subD
					subD.add('key', "value");           // try to use subD
				},
				expectError(DeltaJs.MultipleActiveProxiesError)
			], [
				{ obj: { sub: {} } }, // modify -> delta model
				() => {
					proxy = proxy.modify('obj');
					var subD = proxy.deltaModel('sub');   // create subD
					proxy.replace('sub', {});             // deactivate subD
					subD.do('y').add('key', "value"); // try to use subD
				},
				expectError(DeltaJs.MultipleActiveProxiesError)
			], [
				{ obj: { sub: {} } }, // delta model -> delta model
				() => {
					proxy = proxy.deltaModel('obj');
					var subD = proxy.do('x').deltaModel('sub'); // create subD
					proxy.do('x').replace('sub', {});           // deactivate subD
					subD.do('y').add('key', "value");       // try to use subD
				},
				expectError(DeltaJs.MultipleActiveProxiesError)
			], [
				{ obj: { sub: { subSub: {} } } }, // make sure sub-proxies are disabled too
				() => {
					proxy = proxy.modify('obj');
					var subD = proxy.modify('sub');          // create subD
					var subSubD = subD.modify('subSub'); // create subSubD
					proxy.replace('sub', {});                // deactivate subD
					subSubD.add('key', "value");         // try to use subSubD
				},
				expectError(DeltaJs.MultipleActiveProxiesError)
			]]);

		});

	});


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	describe("specialty operation types -", () => {

		// Here, we test the more advanced operation types.
		// We use a proxy to simplify delta-building.

		var proxy;
		beforeEach(() => {
			afterAction(() => {
				delta = proxy.delta();
			});
		});

		describe("array operations", () => {

			beforeEach(() => {
				proxy = new deltaJs.Delta.Modify().do();
			});

			itCan("prepend a new value to an array", [[
				{ arr: [] },
				() => { proxy.prepend('arr', "val") },
				{ arr: ['val'] }
			], [
				{ arr: ['init'] },
				() => { proxy.prepend('arr', "val") },
				{ arr: ['val', 'init'] }
			], [
				{ arr: ['init1', 'init2'] },
				() => { proxy.prepend('arr', "val") },
				{ arr: ['val', 'init1', 'init2'] }
			], [
				{ arr: 'not an array or a function' },
				() => { proxy.prepend('arr', "val") },
				expectError(DeltaJs.PreconditionFailure)
			], [
				{ key: "val" },
				() => { proxy.prepend('arr', "val") },
				expectError(DeltaJs.PreconditionFailure)
			]]);

			itCan("insert a new value into an array", [[
				{ arr: [] },
				() => { proxy.insert('arr', "val") },
				{ arr: ['val'] }
			], [
				{ arr: ['init'] },
				() => { proxy.insert('arr', "val") },
				(obj) => {
					expect(obj).toEqualOneOf(
						{ arr: ['val', 'init'] },
						{ arr: ['init', 'val'] }
					);
				}
			], [
				{ arr: ['init1', 'init2'] },
				() => { proxy.insert('arr', "val") },
				(obj) => {
					expect(obj).toEqualOneOf(
						{ arr: ['val', 'init1', 'init2'] },
						{ arr: ['init1', 'val', 'init2'] },
						{ arr: ['init1', 'init2', 'val'] }
					);
				}
			], [
				{ arr: 'not an array or a function' },
				() => { proxy.insert('arr', "val") },
				expectError(DeltaJs.PreconditionFailure)
			], [
				{ key: "val" },
				() => { proxy.insert('arr', "val") },
				expectError(DeltaJs.PreconditionFailure)
			]]);

			itCan("append a new value to an array", [[
				{ arr: [] },
				() => { proxy.append('arr', "val") },
				{ arr: ['val'] }
			], [
				{ arr: ['init'] },
				() => { proxy.append('arr', "val") },
				{ arr: ['init', 'val'] }
			], [
				{ arr: ['init1', 'init2'] },
				() => { proxy.append('arr', "val") },
				{ arr: ['init1', 'init2', 'val'] }
			], [
				{ arr: 'not an array or a function' },
				() => { proxy.append('arr', "val") },
				expectError(DeltaJs.PreconditionFailure)
			], [
				{ key: "val" },
				() => { proxy.append('arr', "val") },
				expectError(DeltaJs.PreconditionFailure)
			]]);

		});

		describe("composite array operations", () => {

			beforeEach(() => {
				proxy = new deltaJs.Delta.Modify().do();
			});

			itCan("combine multiple array operations", [[
				{ arr: ['init'] },
				() => {
					proxy.prepend('arr', 1);
					proxy.prepend('arr', 2);
				},
				{ arr: [2, 1, 'init'] }
			], [
				{ arr: ['init'] },
				() => {
					proxy.prepend('arr', 1);
					proxy.insert('arr', 2);
				},
				(obj) => {
					expect(obj).toEqualOneOf(
						{ arr: [2, 1, 'init'] },
						{ arr: [1, 2, 'init'] },
						{ arr: [1, 'init', 2] }
					);
				}
			], [
				{ arr: ['init'] },
				() => {
					proxy.prepend('arr', 1);
					proxy.append('arr', 2);
				},
				{ arr: [1, 'init', 2] }
			], [
				{ arr: ['init'] },
				() => {
					proxy.insert('arr', 1);
					proxy.prepend('arr', 2);
				},
				(obj) => {
					expect(obj).toEqualOneOf(
						{ arr: [2, 1, 'init'] },
						{ arr: [2, 'init', 1] }
					);
				}
			], [
				{ arr: ['init'] },
				() => {
					proxy.insert('arr', 1);
					proxy.insert('arr', 2);
				},
				(obj) => {
					expect(obj).toEqualOneOf(
						{ arr: [2, 1, 'init'] },
						{ arr: [1, 2, 'init'] },
						{ arr: [1, 'init', 2] },
						{ arr: [2, 'init', 1] },
						{ arr: ['init', 2, 1] },
						{ arr: ['init', 1, 2] }
					);
				}
			], [
				{ arr: ['init'] },
				() => {
					proxy.insert('arr', 1);
					proxy.append('arr', 2);
				},
				(obj) => {
					expect(obj).toEqualOneOf(
						{ arr: [1, 'init', 2] },
						{ arr: ['init', 1, 2] }
					);
				}
			], [
				{ arr: ['init'] },
				() => {
					proxy.append('arr', 1);
					proxy.prepend('arr', 2);
				},
				{ arr: [2, 'init', 1] }
			], [
				{ arr: ['init'] },
				() => {
					proxy.append('arr', 1);
					proxy.insert('arr', 2);
				},
				(obj) => {
					expect(obj).toEqualOneOf(
						{ arr: [2, 'init', 1] },
						{ arr: ['init', 2, 1] },
						{ arr: ['init', 1, 2] }
					);
				}
			], [
				{ arr: ['init'] },
				() => {
					proxy.append('arr', 1);
					proxy.append('arr', 2);
				},
				{ arr: ['init', 1, 2] }
			]]);

			itCan("combine array operations with other types of operations or throw an error if invalid", [[
				{ key: "val" },
				() => {
					proxy.add('arr', ['init']);
					proxy.append('arr', "val");
				},
				{ key: "val", arr: ['init', 'val'] }
			], [
				{ key: "val" },
				() => {
					proxy.add('arr', 'not an array');
					proxy.append('arr', "val");
				},
				expectError(DeltaJs.CompositionError) // 'arr', left by the 'add' operation, has to be an array
			], [
				{ key: "val", arr: "whatever" },
				() => {
					proxy.add('arr', ['init']);
					proxy.append('arr', "val");
				},
				expectError(DeltaJs.PreconditionFailure) // 'arr' is forbidden, but was present
			], [
				{ key: "val", arr: "whatever" },
				() => {
					proxy.replace('arr', ['init']);
					proxy.append('arr', "val");
				},
				{ key: "val", arr: ['init', 'val'] }
			], [
				{ key: "val", arr: "whatever" },
				() => {
					proxy.replace('arr', 'not an array');
					proxy.append('arr', "val");
				},
				expectError(DeltaJs.CompositionError) // 'arr', left by the 'replace' operation, has to be an array
			], [
				{ key: "val" },
				() => {
					proxy.replace('arr', ['init']);
					proxy.append('arr', "val");
				},
				expectError(DeltaJs.PreconditionFailure) // 'arr' is mandatory, but was absent
			], [
				{ key: "val", arr: ['init'] },
				() => {
					proxy.append('arr', "val");
					proxy.remove('arr');
				},
				{ key: "val" }
			], [
				{ key: "val" },
				() => {
					proxy.append('arr', "val");
					proxy.remove('arr');
				},
				expectError(DeltaJs.PreconditionFailure) // 'arr' is mandatory, but was absent
			], [
				{ key: "val", arr: ['init'] },
				() => {
					proxy.append('arr', "val");
					proxy.replace('arr', "whatever");
				},
				{ key: "val", arr: "whatever" }
			], [
				{ key: "val" },
				() => {
					proxy.append('arr', "val");
					proxy.replace('arr', "whatever");
				},
				expectError(DeltaJs.PreconditionFailure) // 'arr' is mandatory, but was absent
			]]);

		});

		/* setting up a few functions that can be tracked */
		var callLog;
		var fA = (...args) => { callLog.push(['fA', args]) };
		var fB = (...args) => { callLog.push(['fB', args]) };
		var fC = (...args) => { callLog.push(['fC', args]) };
		beforeEach(() => { callLog = [] });

		describe("function operations", () => {

			beforeEach(() => {
				proxy = new deltaJs.Delta.Modify().do();
			});

			itCan("prepend new statements to run inside an existing function", [[
				{ fn(a, b, c) { fA(this, a, c) } },
				() => { proxy.prepend('fn', function (a, b) { fB(this, b, b) }) },
				(obj) => {
					obj.fn(1, 2, 3);
					expect(callLog).toEqual([['fB', [obj, 2, 2]], ['fA', [obj, 1, 3]]]);
				}
			], [
				{ fn: 'not a function or an array' },
				() => { proxy.prepend('fn', function () {}) },
				expectError(DeltaJs.PreconditionFailure)
			], [
				{ key: "val" },
				() => { proxy.prepend('fn', function () {}) },
				expectError(DeltaJs.PreconditionFailure)
			]]);

			itCan("insert new statements to run inside an existing function", [[
				{ fn(a, b, c) { fA(this, a, c) } },
				() => { proxy.insert('fn', function (a, b) { fB(this, b, b) }) },
				(obj) => {
					obj.fn(1, 2, 3);
					expect(callLog).toEqualOneOf(
						[['fB', [obj, 2, 2]], ['fA', [obj, 1, 3]]],
						[['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]]]
					);
				}
			], [
				{ fn: 'not a function or an array' },
				() => { proxy.insert('fn', function () {}) },
				expectError(DeltaJs.PreconditionFailure)
			], [
				{ key: "val" },
				() => { proxy.insert('fn', function () {}) },
				expectError(DeltaJs.PreconditionFailure)
			]]);

			itCan("append new statements to run inside an existing function", [[
				{ fn(a, b, c) { fA(this, a, c) } },
				() => { proxy.append('fn', function (a, b) { fB(this, b, b) }) },
				(obj) => {
					obj.fn(1, 2, 3);
					expect(callLog).toEqual([['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]]]);
				}
			], [
				{ fn: 'not a function or an array' },
				() => { proxy.append('fn', function () {}) },
				expectError(DeltaJs.PreconditionFailure)
			], [
				{ key: "val" },
				() => { proxy.append('fn', function () {}) },
				expectError(DeltaJs.PreconditionFailure)
			]]);

		});

		describe("composite function operations", () => {

			beforeEach(() => {
				proxy = new deltaJs.Delta.Modify().do();
			});

			itCan("combine multiple function operations", [[
				{ fn(a, b, c) { fA(this, a, c) } },
				() => {
					proxy.prepend('fn', function (a, b) { fB(this, b, b) });
					proxy.prepend('fn', function (a, b) { fC(this, b, a) });
				},
				(obj) => {
					obj.fn(1, 2, 3);
					expect(callLog).toEqual([['fC', [obj, 2, 1]], ['fB', [obj, 2, 2]], ['fA', [obj, 1, 3]]]);
				}
			], [
				{ fn(a, b, c) { fA(this, a, c) } },
				() => {
					proxy.prepend('fn', function (a, b) { fB(this, b, b) });
					proxy.insert('fn', function (a, b) { fC(this, b, a) });
				},
				(obj) => {
					obj.fn(1, 2, 3);
					expect(callLog).toEqualOneOf(
						[['fC', [obj, 2, 1]], ['fB', [obj, 2, 2]], ['fA', [obj, 1, 3]]],
						[['fB', [obj, 2, 2]], ['fC', [obj, 2, 1]], ['fA', [obj, 1, 3]]],
						[['fB', [obj, 2, 2]], ['fA', [obj, 1, 3]], ['fC', [obj, 2, 1]]]
					);
				}
			], [
				{ fn(a, b, c) { fA(this, a, c) } },
				() => {
					proxy.prepend('fn', function (a, b) { fB(this, b, b) });
					proxy.append('fn', function (a, b) { fC(this, b, a) });
				},
				(obj) => {
					obj.fn(1, 2, 3);
					expect(callLog).toEqual([['fB', [obj, 2, 2]], ['fA', [obj, 1, 3]], ['fC', [obj, 2, 1]]]);
				}
			], [
				{ fn(a, b, c) { fA(this, a, c) } },
				() => {
					proxy.insert('fn', function (a, b) { fB(this, b, b) });
					proxy.prepend('fn', function (a, b) { fC(this, b, a) });
				},
				(obj) => {
					obj.fn(1, 2, 3);
					expect(callLog).toEqualOneOf(
						[['fC', [obj, 2, 1]], ['fB', [obj, 2, 2]], ['fA', [obj, 1, 3]]],
						[['fC', [obj, 2, 1]], ['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]]]
					);
				}
			], [
				{ fn(a, b, c) { fA(this, a, c) } },
				() => {
					proxy.insert('fn', function (a, b) { fB(this, b, b) });
					proxy.insert('fn', function (a, b) { fC(this, b, a) });
				},
				(obj) => {
					obj.fn(1, 2, 3);
					expect(callLog).toEqualOneOf(
						[['fC', [obj, 2, 1]], ['fB', [obj, 2, 2]], ['fA', [obj, 1, 3]]],
						[['fB', [obj, 2, 2]], ['fC', [obj, 2, 1]], ['fA', [obj, 1, 3]]],
						[['fB', [obj, 2, 2]], ['fA', [obj, 1, 3]], ['fC', [obj, 2, 1]]],
						[['fC', [obj, 2, 1]], ['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]]],
						[['fA', [obj, 1, 3]], ['fC', [obj, 2, 1]], ['fB', [obj, 2, 2]]],
						[['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]], ['fC', [obj, 2, 1]]]
					);
				}
			], [
				{ fn(a, b, c) { fA(this, a, c) } },
				() => {
					proxy.insert('fn', function (a, b) { fB(this, b, b) });
					proxy.append('fn', function (a, b) { fC(this, b, a) });
				},
				(obj) => {
					obj.fn(1, 2, 3);
					expect(callLog).toEqualOneOf(
						[['fB', [obj, 2, 2]], ['fA', [obj, 1, 3]], ['fC', [obj, 2, 1]]],
						[['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]], ['fC', [obj, 2, 1]]]
					);
				}
			], [
				{ fn(a, b, c) { fA(this, a, c) } },
				() => {
					proxy.append('fn', function (a, b) { fB(this, b, b) });
					proxy.prepend('fn', function (a, b) { fC(this, b, a) });
				},
				(obj) => {
					obj.fn(1, 2, 3);
					expect(callLog).toEqual([['fC', [obj, 2, 1]], ['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]]]);
				}
			], [
				{ fn(a, b, c) { fA(this, a, c) } },
				() => {
					proxy.append('fn', function (a, b) { fB(this, b, b) });
					proxy.insert('fn', function (a, b) { fC(this, b, a) });
				},
				(obj) => {
					obj.fn(1, 2, 3);
					expect(callLog).toEqualOneOf(
						[['fC', [obj, 2, 1]], ['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]]],
						[['fA', [obj, 1, 3]], ['fC', [obj, 2, 1]], ['fB', [obj, 2, 2]]],
						[['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]], ['fC', [obj, 2, 1]]]
					);
				}
			], [
				{ fn(a, b, c) { fA(this, a, c) } },
				() => {
					proxy.append('fn', function (a, b) { fB(this, b, b) });
					proxy.append('fn', function (a, b) { fC(this, b, a) });
				},
				(obj) => {
					obj.fn(1, 2, 3);
					expect(callLog).toEqual([['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]], ['fC', [obj, 2, 1]]]);
				}
			]]);

			itCan("combine function operations with other types of operations or throw an error if invalid", [[
				{ key: "val" },
				() => {
					proxy.add('fn', function (a, b, c) { fA(this, a, c) });
					proxy.append('fn', function (a, b) { fB(this, b, b) });
				},
				(obj) => {
					obj.fn(1, 2, 3);
					expect(obj.key).toBe("val");
					expect(callLog).toEqual([['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]]]);
				}
			], [
				{ key: "val" },
				() => {
					proxy.add('fn', 'not a function or an array');
					proxy.append('fn', function (a, b) { fB(this, b, b) });
				},
				expectError(DeltaJs.CompositionError) // 'fn', left by the 'add' operation, has to be an array
			], [
				{ key: "val", fn(a, b, c) { fA(this, a, c) } },
				() => {
					proxy.add('fn', function (a, b, c) { fA(this, a, c) });
					proxy.append('fn', function (a, b) { fB(this, b, b) });
				},
				expectError(DeltaJs.PreconditionFailure) // 'fn' is forbidden, but was present
			], [
				{ key: "val", fn(a, b, c) { fA(this, a, c) } },
				() => {
					proxy.replace('fn', function (a, b) { fB(this, b, b) });
					proxy.append('fn', function (a, b) { fC(this, b, a) });
				},
				(obj) => {
					obj.fn(1, 2, 3);
					expect(obj.key).toBe("val");
					expect(callLog).toEqual([['fB', [obj, 2, 2]], ['fC', [obj, 2, 1]]]);
				}
			], [
				{ key: "val", fn(a, b, c) { fA(this, a, c) } },
				() => {
					proxy.replace('fn', 'not a function or an array');
					proxy.append('fn', function (a, b) { fB(this, b, b) });
				},
				expectError(DeltaJs.CompositionError) // 'fn', left by the 'replace' operation, has to be an array
			], [
				{ key: "val" },
				() => {
					proxy.replace('fn', function (a, b, c) { fA(this, a, c) });
					proxy.append('fn', function (a, b) { fB(this, b, b) });
				},
				expectError(DeltaJs.PreconditionFailure) // 'fn' is mandatory, but was absent
			], [
				{ key: "val", fn(a, b, c) { fA(this, a, c) } },
				() => {
					proxy.append('fn', function (a, b) { fB(this, b, b) });
					proxy.remove('fn');
				},
				{ key: "val" }
			], [
				{ key: "val" },
				() => {
					proxy.append('fn', function (a, b) { fB(this, b, b) });
					proxy.remove('fn');
				},
				expectError(DeltaJs.PreconditionFailure) // 'fn' is mandatory, but was absent
			], [
				{ key: "val", fn(a, b, c) { fA(this, a, c) } },
				() => {
					proxy.append('fn', function (a, b) { fB(this, b, b) });
					proxy.replace('fn', "whatever");
				},
				{ key: "val", fn: "whatever" }
			], [
				{ key: "val" },
				() => {
					proxy.append('fn', function (a, b) { fB(this, b, b) });
					proxy.replace('fn', "whatever");
				},
				expectError(DeltaJs.PreconditionFailure) // 'fn' is mandatory, but was absent
			]]);

		});

		describe("delta model operations", () => {

			var dm;
			beforeEach(() => {
				dm = proxy = new deltaJs.Delta.DeltaModel().do();
			});

			itCan("be a middle-man for a single other delta", [[
				{},
				() => {
					dm.do('X').add('key', { foo: "bar" });
				},
				{ key: { foo: "bar" } }
			], [
				{ key: { foo: "bar" } },
				() => {
					dm.do('X').remove('key');
				},
				{}
			], [
				{},
				() => {
					dm.do('X').forbid('key');
				},
				{}
			], [
				{ key: { foo: "bar" } },
				() => {
					dm.do('X').replace('key', "value");
				},
				{ key: "value" }
			], [
				{ key: { foo: "bar" } },
				() => {
					dm.do('X').modify('key').replace('foo', "bas");
				},
				{ key: { foo: "bas" } }
			], [
				{ key: ['a'] },
				() => {
					dm.do('X').prepend('key', "b");
				},
				{ key: ['b', 'a'] }
			], [
				{ key: ['a'] },
				() => {
					dm.do('X').insert('key', "b");
				},
				(obj) => {
					expect(obj).toEqualOneOf(
						{ key: ['b', 'a'] },
						{ key: ['a', 'b'] }
					);
				}
			], [
				{ key: ['a'] },
				() => {
					dm.do('X').append('key', "b");
				},
				{ key: ['a', 'b'] }
			]]);

			describe("with a function operation delta inside", () => {
				itCan("be a middle man for that one delta", [[
					{ fn(a, b, c) { fA(this, a, c) } },
					() => {
						dm.do('X').prepend('fn', function (a, b) { fB(this, b, b) });
					},
					(obj) => {
						obj.fn(1, 2, 3);
						expect(callLog).toEqual([['fB', [obj, 2, 2]], ['fA', [obj, 1, 3]]]);
					}
				], [
					{ fn(a, b, c) { fA(this, a, c) } },
					() => {
						dm.do('X').insert('fn', function (a, b) { fB(this, b, b) });
					},
					(obj) => {
						obj.fn(1, 2, 3);
						expect(callLog).toEqualOneOf(
							[['fB', [obj, 2, 2]], ['fA', [obj, 1, 3]]],
							[['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]]]
						);
					}
				], [
					{ fn(a, b, c) { fA(this, a, c) } },
					() => {
						dm.do('X').append('fn', function (a, b) { fB(this, b, b) });
					},
					(obj) => {
						obj.fn(1, 2, 3);
						expect(callLog).toEqual([['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]]]);
					}
				]]);
			});

			itCan("apply deltas in a linear order (as if composed)", [[
				{},
				() => {
					dm.do('X').add('key', { foo: "bar" });
					dm.do('Y').remove({ after: ['X'] }, "key");
				},
				{}
			], [
				{},
				() => {
					dm.do('X').add('key', { foo: "bar" });
					dm.do('Y').replace({ after: ['X'] }, 'key', "some value");
				},
				{ key: 'some value' }
			], [
				{},
				() => {
					dm.do('X').add('key1', { foo: "bar" });
					dm.do('Y',  { after: ['X'] }).add('key2', "some value");
					dm.do('Z',  { after: ['Y'] }).add('key3', 'some other value');
					dm.do('rY', { after: ['Z'] }).remove("key2");
				},
				{ key1: { foo: "bar" }, key3: 'some other value' }
			]]);

			itCan("apply unordered deltas in arbitrary order, if they do not conflict", [[
				{ oldKey: 'old value' },
				() => {
					dm.do('X').add('key1', 1);
					dm.do('Y').add('key2', "b");
					dm.do('Z').add('key3', "iii");
					dm.do('r').remove("oldKey");
				},
				{ key1: 1, key2: "b", key3: "iii" }
			]]);

			itCan("apply a partially ordered set of deltas in topological order, if unordered deltas do not conflict", [[
				{ oldKey: 'old value' },
				() => {
					dm.do('W').add('key', { foo: "bar" });
					dm.do('X', { after: ['W'] }).add('key.x', 1);
					dm.do('Y', { after: ['W'] }).add('key.y', 2);
					dm.do('Z', { after: ['W'] }).add('key.z', 3);
				},
				{ oldKey: 'old value', key: { foo: "bar", x: 1, y: 2, z: 3 } }
			], [
				{ oldKey: 'old value' },
				() => {
					dm.do('X', { after: ['W'] }).add('key.x', 1);
					dm.do('Y', { after: ['W'] }).add('key.y', 2);
					dm.do('Z', { after: ['W'] }).add('key.z', 3);
					dm.do('W').add('key', { foo: "bar" }); // the order doesn't matter
				},
				{ oldKey: 'old value', key: { foo: "bar", x: 1, y: 2, z: 3 } }
			]]);

			itCan("have multiple separate operations on the same sub-delta", [[
				{ subObj: {} },
				() => {
					var x = dm.do('X');
					x.modify('subObj').add('one', 1);
					x.modify('subObj').add('two', 2);
				},
				{ subObj: { one: 1, two: 2 } }
			], [
				{ subObj: { subSubObj: {} } },
				() => {
					var x = dm.do('X');
					x.modify('subObj').add('one', 1);
					x.modify('subObj.subSubObj').add('two', 2);
				},
				{ subObj: { one: 1, subSubObj: { two: 2 } } }
			], [
				{ subObj: { subSubObj: {} } },
				() => {
					var x = dm.do('X');
					x.add('subObj.one', 1);
					x.modify('subObj.subSubObj').add('two', 2);
				},
				{ subObj: { one: 1, subSubObj: { two: 2 } } }
			], [
				{ subObj: { subSubObj: {} } },
				() => {
					var x = dm.do('X');
					x.modify('subObj.subSubObj').add('two', 2);
					x.modify('subObj').add('one', 1);
				},
				{ subObj: { one: 1, subSubObj: { two: 2 } } }
			]]);

			itCan("throw an error if there is an application order cycle", [[
				{},
				() => {
					dm.do('X', { after: ['Y'] }).add('keyX', "value X");
					dm.do('Y', { after: ['X'] }).add('keyY', "value Y");
				},
				expectError(DeltaJs.ApplicationOrderCycle, { from: "X", to: "Y" })
			], [
				{},
				() => {
					dm.do('W').add('keyW', "W value");
					dm.do('X', { after: ['W', 'Z'] }).add('keyX', "X value");
					dm.do('Y', { after: ['X'] }).add('keyY', "Y value");
					dm.do('Z', { after: ['Y'] }).add('keyZ', "Z value");
				},
				expectError(DeltaJs.ApplicationOrderCycle, { from: "Y", to: "Z" })
			]]);

			itCan("throw an error if there is an application order cycle", [[
				{},
				() => {
					dm.do('X', { after: ['Y'] }).add('keyX', "value X");
					dm.do('Y', { after: ['X'] }).add('keyY', "value Y");
				},
				expectError(DeltaJs.ApplicationOrderCycle, { from: "X", to: "Y" })
			], [
				{},
				() => {
					dm.do('W').add('keyW', "W value");
					dm.do('X', { after: ['W', 'Z'] }).add('keyX', "X value");
					dm.do('Y', { after: ['X'] }).add('keyY', "Y value");
					dm.do('Z', { after: ['Y'] }).add('keyZ', "Z value");
				},
				expectError(DeltaJs.ApplicationOrderCycle, { from: "Y", to: "Z" })
			], [
				{},
				() => {
					dm.do('X', { after: ['Z'] }).add('keyX', "value X");
					dm.do('Y', { after: ['X'] }).add('keyY', "value Y");
					dm.do('Z', { after: ['Y'] }).add('keyZ', "value Z");
				}, // it's about the last connection that connects the cycle:
				expectError(DeltaJs.ApplicationOrderCycle, { from: "Y", to: "Z" })
			]]);

			itCan("throw an error if there is an unresolved conflict", [[
				{ key: 'original value' },
				() => {
					dm.do('X').replace('key', "X value");
					dm.do('Y').replace('key', "Y value");
				},
				expectError(DeltaJs.UnresolvedDeltaConflict)
			], [
				{ key: [] },
				() => {
					dm.do('X').prepend('key', "X value");
					dm.do('Y').prepend('key', "Y value");
				},
				expectError(DeltaJs.UnresolvedDeltaConflict)
			], [
				{ key: [] },
				() => {
					dm.do('X').append('key', "X value");
					dm.do('Y').append('key', "Y value");
				},
				expectError(DeltaJs.UnresolvedDeltaConflict)
			], [
				{ key() {} },
				() => {
					dm.do('X').prepend('key', function () { console.log("something") });
					dm.do('Y').prepend('key', function () { console.log("something") }); // equivalence of functions cannot be detected
				},
				expectError(DeltaJs.UnresolvedDeltaConflict)
			], [
				{ key() {} },
				() => {
					dm.do('X').append('key', function () { console.log("something") });
					dm.do('Y').append('key', function () { console.log("something") }); // equivalence of functions cannot be detected
				},
				expectError(DeltaJs.UnresolvedDeltaConflict)
			]]);

			itCan("work correctly for combinations that may look like conflicts, but aren't", [[
				{ key: 'original value' },
				() => {
					dm.do('X').replace('key', "new value");
					dm.do('Y').replace('key', "new value");
				},
				{ key: 'new value' }
			], [
				{ key: "value" },
				() => {
					dm.do('X').forbid('absentKey');
					dm.do('Y').forbid('absentKey');
				},
				{ key: "value" }
			], [
				{ key: [] },
				() => {
					dm.do('X').prepend('key', "new value");
					dm.do('Y').prepend('key', "new value");
				},
				{ key: ['new value', 'new value'] }
			], [
				{ key: [] },
				() => {
					dm.do('X').append('key', "new value");
					dm.do('Y').append('key', "new value");
				},
				{ key: ['new value', 'new value'] }
			], [
				{ key: [] },
				() => {
					dm.do('X').insert('key', "X value");
					dm.do('Y').insert('key', "Y value");
				},
				(obj) => {
					expect(obj).toEqualOneOf(
						{ key: ['X value', 'Y value'] },
						{ key: ['Y value', 'X value'] }
					);
				}
			], [
				{ key() {} },
				() => {
					dm.do('X').insert('key', function () { fA(this) });
					dm.do('Y').insert('key', function () { fB(this) });
				},
				(obj) => {
					obj.key(1, 2, 3);
					expect(callLog).toEqualOneOf(
						[['fB', [obj]], ['fA', [obj]]],
						[['fA', [obj]], ['fB', [obj]]]
					);
				}
			]]);

			itCan("work fine if all conflicts are resolved", [[
				{ key: 'original value' },
				() => {
					dm.do('X')                       .replace('key', "X value");
					dm.do('Y')                       .replace('key', "Y value");
					dm.do('Z', { after: ['X', 'Y'] }).replace('key', "Z value");
				},
				{ key: "Z value" }
			], [
				{ key: [] },
				() => {
					dm.do('X')                       .prepend('key', "X value");
					dm.do('Y')                       .prepend('key', "Y value");
					dm.do('Z', { after: ['X', 'Y'] }).replace('key', "Z value");
				},
				{ key: "Z value" }
			], [
				{ key: [] },
				() => {
					dm.do('X')                       .append ('key', "X value");
					dm.do('Y')                       .append ('key', "Y value");
					dm.do('Z', { after: ['X', 'Y'] }).replace('key', "Z value");
				},
				{ key: "Z value" }
			], [
				{ key() {} },
				() => {
					dm.do('X')                       .prepend('key', function () { console.log("something") });
					dm.do('Y')                       .prepend('key', function () { console.log("something") });
					dm.do('Z', { after: ['X', 'Y'] }).replace('key', "Z value");
				},
				{ key: "Z value" }
			], [
				{ key() {} },
				() => {
					dm.do('X')                       .append ('key', function () { console.log("something") });
					dm.do('Y')                       .append ('key', function () { console.log("something") });
					dm.do('Z', { after: ['X', 'Y'] }).replace('key', "Z value");
				},
				{ key: "Z value" }
			]]);

			itCan("throw an error if there are multiple unresolved conflicts (larger example)", [[
				{ o: { x: 'value-x-0', y: 'value-y-0' } },
				() => {
					dm.do('1'                       ).replace('o.y', 'value-y-1');
					dm.do('2'                       ).replace('o.x', 'value-x-2');
					dm.do('3'                       ).replace('o.x', 'value-x-3');
					dm.do('4', { after: ['1']      }).modify('o');
					dm.do('5', { after: ['1']      }).modify('o');
					dm.do('6', { after: ['2', '3'] }).replace('o.y', 'value-y-6');
					dm.do('7', { after: ['4']      }).modify('o');
					dm.do('8', { after: ['5', '6'] }).modify('o');
				},
				expectError(DeltaJs.UnresolvedDeltaConflict)
			]]);

			itCan("throw an error if there are still unresolved conflicts, even though some conflicts are resolved (larger example)", [[
				{ o: { x: 'value-x-0', y: 'value-y-0' } },
				() => {
					dm.do('1'                       ).replace('o.y', 'value-y-1');
					dm.do('2'                       ).replace('o.x', 'value-x-2');
					dm.do('3'                       ).replace('o.x', 'value-x-3');
					dm.do('4', { after: ['1']      }).modify('o');
					dm.do('5', { after: ['1']      }).modify('o');
					dm.do('6', { after: ['2', '3'] }).replace('o.y', 'value-y-6').replace('o.x', 'value-x-6');
					dm.do('7', { after: ['4']      }).modify('o');
					dm.do('8', { after: ['5', '6'] }).modify('o');
				},
				expectError(DeltaJs.UnresolvedDeltaConflict)
			]]);

			itCan("work fine if all conflicts are resolved (larger example)", [[
				{ o: { x: 'value-x-0', y: 'value-y-0' } },
				() => {
					dm.do('1'                       ).replace('o.y', 'value-y-1');
					dm.do('2'                       ).replace('o.x', 'value-x-2');
					dm.do('3'                       ).replace('o.x', 'value-x-3');
					dm.do('4', { after: ['1']      }).modify('o');
					dm.do('5', { after: ['1']      }).modify('o');
					dm.do('6', { after: ['2', '3'] }).replace('o.y', 'value-y-6').replace('o.x', 'value-x-6');
					dm.do('7', { after: ['4']      }).modify('o');
					dm.do('8', { after: ['5', '6'] }).replace('o.y', 'value-y-8');
				},
				{ o: { x: 'value-x-6', y: 'value-y-8' } }
			]]);





			//itCan("TEST", [[
			//	{ o: {} },
			//	() => {
			//		dm.do('x').add('o.foo', "bar");
			//		dm.do('y').add('o.foo', "bar");
			//	},
			//	{ o: { foo: "bar" } }
			//]]);






		});

	});


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	describe("features", () => {

		it("have a class to represent them", () => {
			expect(typeof deltaJs.Feature).toBe('function');
		});

		it("have a DeltaJs method to declare them", () => {
			expect(typeof deltaJs.newFeature).toBe('function');
		});

		it("have a DeltaJs object in which they are stored", () => {
			expect(deltaJs.features).toEqual(any(Object));
			expect(deltaJs.features['f']).toBeUndefined();
			var f = deltaJs.newFeature('f');
			expect(f).toEqual(any(deltaJs.Feature));
			expect(deltaJs.features['f']).toBe(f);
		});

		it("can be instantiated", () => {
			var f = deltaJs.newFeature('f');
			expect(f).toBe(deltaJs.features['f']);
			expect(f).toEqual(any(deltaJs.Feature));
		});

		describe("that are instantiated", () => {
			var e, f, g, h;
			beforeEach(() => {
				e = deltaJs.newFeature('e');
				f = deltaJs.newFeature('f');
				g = deltaJs.newFeature('g');
				h = deltaJs.newFeature('h');
			});
			function expectAllUnselected() {
				expect(e.selected).toBeFalsy();
				expect(f.selected).toBeFalsy();
				expect(g.selected).toBeFalsy();
				expect(h.selected).toBeFalsy();
			}

			it("know their name", () => {
				expect(e.name).toBe('e');
				expect(f.name).toBe('f');
				expect(g.name).toBe('g');
				expect(h.name).toBe('h');
			});

			it("start out not selected", () => {
				expectAllUnselected();
			});

			it("can be selected: 'select'", () => {
				g.select();
				expect(e.selected).toBeFalsy();
				expect(f.selected).toBeFalsy();
				expect(g.selected).toBeTruthy();
				expect(h.selected).toBeFalsy();
			});

			it("can be selected: 'if(true)'", () => {
				g.if(true);
				expect(e.selected).toBeFalsy();
				expect(f.selected).toBeFalsy();
				expect(g.selected).toBeTruthy();
				expect(h.selected).toBeFalsy();
			});

			it("can automatically be selected when other features are: 'if' by reference", () => {
				e.if(f);
				f.if(g);
				g.if(h);
				expectAllUnselected();
				g.select();
				expect(e.selected).toBeTruthy();
				expect(f.selected).toBeTruthy();
				expect(g.selected).toBeTruthy();
				expect(h.selected).toBeFalsy();
			});

			it("can automatically be selected when other features are: 'if' by name", () => {
				e.if('f');
				f.if('g');
				g.if('h');
				expectAllUnselected();
				g.select();
				expect(e.selected).toBeTruthy();
				expect(f.selected).toBeTruthy();
				expect(g.selected).toBeTruthy();
				expect(h.selected).toBeFalsy();
			});

			it("can throw an error when constraints on other features are not met: 'onlyIf' by reference", () => {
				f.onlyIf(g);
				expectAllUnselected();
				f.select();
				expect(() => f.selected).toThrowSpecific(DeltaJs.ConstraintFailure, { feature: f });
				g.select();
				expect(f.selected).toBeTruthy();
				expect(g.selected).toBeTruthy();
			});

			it("can throw an error when constraints on other features are not met: 'onlyIf' by name", () => {
				f.onlyIf('g');
				expectAllUnselected();
				f.select();
				expect(() => f.selected).toThrowSpecific(DeltaJs.ConstraintFailure, { feature: f });
				g.select();
				expect(f.selected).toBeTruthy();
				expect(g.selected).toBeTruthy();
			});

			it("can automatically select other features when selected: 'selects' by reference", () => {
				e.selects(f);
				f.selects(g);
				g.selects(h);
				expectAllUnselected();
				f.select();
				expect(e.selected).toBeFalsy();
				expect(f.selected).toBeTruthy();
				expect(g.selected).toBeTruthy();
				expect(h.selected).toBeTruthy();
			});

			it("can automatically select other features when selected: 'selects' by name", () => {
				e.selects('f');
				f.selects('g');
				g.selects('h');
				expectAllUnselected();
				f.select();
				expect(e.selected).toBeFalsy();
				expect(f.selected).toBeTruthy();
				expect(g.selected).toBeTruthy();
				expect(h.selected).toBeTruthy();
			});

			it("can throw an error when constraints on other features are not met: 'requiredBy' by reference", () => {
				f.requiredBy(g);
				expectAllUnselected();
				g.select();
				expect(() => g.selected).toThrowSpecific(DeltaJs.ConstraintFailure, { feature: g });
				f.select();
				expect(f.selected).toBeTruthy();
				expect(g.selected).toBeTruthy();
			});

			it("can throw an error when constraints on other features are not met: 'requiredBy' by name", () => {
				f.requiredBy('g');
				expectAllUnselected();
				g.select();
				expect(() => g.selected).toThrowSpecific(DeltaJs.ConstraintFailure, { feature: g });
				f.select();
				expect(f.selected).toBeTruthy();
				expect(g.selected).toBeTruthy();
			});

			it("can automatically select other features when selected: 'iff' (1) by reference", () => {
				f.iff(g);
				expectAllUnselected();
				g.select();
				expect(f.selected).toBeTruthy();
				expect(g.selected).toBeTruthy();
			});

			it("can automatically select other features when selected: 'iff' (1) by name", () => {
				f.iff('g');
				expectAllUnselected();
				g.select();
				expect(f.selected).toBeTruthy();
				expect(g.selected).toBeTruthy();
			});

			it("can automatically select other features when selected: 'iff' (2) by reference", () => {
				f.iff(g);
				expectAllUnselected();
				f.select();
				expect(() => f.selected).toThrowSpecific(DeltaJs.ConstraintFailure, { feature: f });
				g.select();
				expect(f.selected).toBeTruthy();
				expect(g.selected).toBeTruthy();
			});

			it("can automatically select other features when selected: 'iff' (2) by name", () => {
				f.iff('g');
				expectAllUnselected();
				f.select();
				expect(() => f.selected).toThrowSpecific(DeltaJs.ConstraintFailure, { feature: f });
				g.select();
				expect(f.selected).toBeTruthy();
				expect(g.selected).toBeTruthy();
			});

			it("will not throw an error when constraints on other features are properly met (regression 1)", () => {
				g.if(['f', 'h']);
				f.if(true);
				expect(() => f.selected).not.toThrow();
			});

		});

	});


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	describe("variation points", () => {

		it("have a DeltaJs method to indicate them in the domain-specific code: 'vp'", () => {
			expect(deltaJs.vp).toEqual(any(Function));
		});

		it("have a DeltaJs proxy to operate on them: 'do'", () => {
			expect(deltaJs.do).toEqual(any(Function));
			expect(deltaJs.do()).toEqual(any(deltaJs.Proxy));
		});

		it("pass a value through unchanged if no operations are prepared for them", () => {
			var x = deltaJs.vp('x', "old value");
			expect(x).toBe("old value");
		});

		it("apply deltas to a value for which deltas are prepared (1)", () => {
			deltaJs.do('delta-name', { feature: false }).replace('x', 'new x value');
			var x = deltaJs.vp('x', 'old x value');
			var y = deltaJs.vp('y', 'old y value');
			expect(x).toBe('new x value');
			expect(y).toBe('old y value');
		});

		it("apply deltas to a value for which deltas are prepared (2)", () => {
			deltaJs.do('w', { feature: false }).add('obj', { keyW: "valW" });
			deltaJs.do('x', { feature: false, after: ['w'] }).add('obj.keyX', "valX");
			deltaJs.do('y', { feature: false, after: ['w'] }).add('obj.keyY', "valY");
			deltaJs.do('z', { feature: false, after: ['x', 'y'] }).modify('obj')
				.replace('keyX', "valXZ")
				.replace('keyY', "valYZ");
			var obj = deltaJs.vp('obj');
			expect(obj).toEqual({
				keyW: "valW",
				keyX: "valXZ",
				keyY: "valYZ"
			});
		});

	});


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	describe("application conditions", () => {

		var F, G, H;
		var w, x, y, z;

		beforeEach(() => {
			F = deltaJs.newFeature('F');
			G = deltaJs.newFeature('G');
			H = deltaJs.newFeature('H');
			w = deltaJs.do('w');
			x = deltaJs.do('x');
			y = deltaJs.do('y');
			z = deltaJs.do('z');
		});

		it("can, based on which features are selected, apply or not apply a delta", () => {

			/* deltas, normally declared independently */
			w.do({ iff: ['F']      }).add('obj.w', 'w-value');
			x.do({ iff: ['F', 'G'] }).add('obj.x', 'x-value');
			y.do({ iff: ['F', 'H'] }).add('obj.y', 'y-value');
			z.do({ feature: false  }).add('obj.z', 'z-value');

			/* the desired features, selected in a central location */
			deltaJs.select(['F', 'H']);

			/* a variation point, indicated throughout the domain specific code */
			var obj = deltaJs.vp('obj', {});

			/* as a consequence of the the above, 'obj' is expected to be as follows */
			expect(obj).toEqual({
				w: 'w-value',
				// not x, because 'G' was not selected
				y: 'y-value',
				z: 'z-value'
			});

		});

	});


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	describe("deltas and features", () => {

		var w, x, y, z;

		beforeEach(() => {
			w = deltaJs.do('w');
			x = deltaJs.do('x');
			y = deltaJs.do('y');
			z = deltaJs.do('z');
		});

		it("can be declared eponymous: together in one shot to share the same name and a one-to-one relationship", () => {

			/* deltas, normally declared independently */
			w.add('obj.w', 'w-value');
			x.add('obj.x', 'x-value');
			y.add('obj.y', 'y-value');

			/* the desired features, selected in a central location */
			deltaJs.select(['w', 'x']);

			/* a variation point, indicated throughout the domain specific code */
			var obj = deltaJs.vp('obj', {});

			/* as a consequence of the the above, 'obj' is expected to be as follows */
			expect(obj).toEqual({
				w: 'w-value',
				x: 'x-value',
				// not y, because it was not selected
			});

		});

		it("–if they are eponymous– are both effected by the 'resolves' option", () => {

			/* deltas, normally declared independently */
			x.add('obj.x', 'x-value');
			y.add('obj.y', 'y-value');
			z.do({ resolves: ['x', 'y'] })
				.replace('obj.y', 'z-value');

			/* the desired features, selected in a central location */
			deltaJs.select(['x', 'y']);

			/* a variation point, indicated throughout the domain specific code */
			var obj = deltaJs.vp('obj', {});

			/* as a consequence of the the above, 'obj' is expected to be as follows */
			expect(obj).toEqual({
				x: 'x-value',
				y: 'z-value'
			});

		});

		it("–if they are eponymous– are both effected by the 'requires' option", () => {

			/* deltas, normally declared independently */
			x.add('obj.x', 'x-value');
			y.add('obj.y', 'y-value');
			z.do({ requires: ['x', 'y'] })
				.replace('obj.y', 'z-value');

			/* the desired features, selected in a central location */
			deltaJs.select(['z']);

			/* a variation point, indicated throughout the domain specific code */
			var obj = deltaJs.vp('obj', {});

			/* as a consequence of the the above, 'obj' is expected to be as follows */
			expect(obj).toEqual({
				x: 'x-value',
				y: 'z-value'
			});

		});

	});


});
