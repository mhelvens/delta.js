'use strict';


describe("DeltaJs constructor", function () {

	it("is present", function () {
		expect(DeltaJs).toEqual(any(Function));
	});

	it("never throws any exception", function () {
		expect(function () {
			return new DeltaJs();
		}).not.toThrow();
	});

	it("returns an object of type DeltaJs", function () {
		var deltaJs = new DeltaJs();
		expect(deltaJs).toEqual(any(DeltaJs));
	});

});


describe("DeltaJs instance", function () {

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var deltaJs, delta;
	beforeEach(() => {
		deltaJs = new DeltaJs();
	});

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function ExpectedError(type, content) {
		this.type = type;
		this.content = content;
	}

	function expectError(type, content) { return new ExpectedError(type, content) }

	var _afterAction;
	beforeEach(() => {
		_afterAction = ()=>{};
	});
	function afterAction(fn) {
		_afterAction = fn;
	}

	function _itCan(fn) {
		return function (description, triples) {
			var counter = 0;
			triples.forEach(([pre, action, post]) => {
				fn(`can ${description} (${++counter})`, () => {
					/* creating the initial object using the given 'pre' */
					var rootObj = typeof pre === 'function' ? pre() : pre;

					/* creating the delta through the given code */
					if (post instanceof ExpectedError && post.type !== DeltaJs.ApplicationError) {
						expect(() => {
							action();
							_afterAction();
						}).toThrowSpecific(post.type, post.content);
					} else {
						action();
						_afterAction();

						/* applying the delta to the given 'pre' value */
						if (post instanceof ExpectedError && post.type === DeltaJs.ApplicationError) {
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

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/* set up a few functions that can be tracked */
	var callLog;
	var fA = (...args) => { callLog.push(['fA', args]) };
	var fB = (...args) => { callLog.push(['fB', args]) };
	var fC = (...args) => { callLog.push(['fC', args]) };
	beforeEach(() => { callLog = [] });

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	describe("algebraic", () => {

		describe("delta application", () => {

			beforeEach(() => {
				delta = new deltaJs.Delta.Modify();
			});

			it("can be manually performed on values", () => {
				delta.subDeltas['foo'] = new deltaJs.Delta.Add("bar");
				var obj = { existingKey: "existing value" };
				delta.applyTo(obj);
				expect(obj).toEqual({ existingKey: "existing value", foo: "bar" });
			});

			// From here on, the helper function 'itCan' is used, which accepts a list of 'triples'
			// in a nice notation for testing, and applies the delta for us.

			describe("for the basic operations", () => {

				itCan("add a new field to an object", [[
					{},
					() => { delta.subDeltas['foo'] = new deltaJs.Delta.Add("bar") },
					{ foo: "bar" }
				], [
					{ key: "val" },
					() => { delta.subDeltas['foo'] = new deltaJs.Delta.Add("bar") },
					{ key: "val", foo: "bar" }
				], [
					{ obj: {} },
					() => {
						delta.subDeltas['obj'] = new deltaJs.Delta.Modify({
							foo: new deltaJs.Delta.Add("bar")
						});
					},
					{ obj: { foo: "bar" } }
				], [
					{ obj: { key: "val" } },
					() => {
						delta.subDeltas['obj'] = new deltaJs.Delta.Modify({
							foo: new deltaJs.Delta.Add("bar")
						});
					},
					{ obj: { key: "val", foo: "bar" } }
				], [
					{ key: "val" },
					() => { delta.subDeltas['key'] = new deltaJs.Delta.Add("bar") },
					expectError(DeltaJs.ApplicationError)
				]]);

				itCan("remove an existing field from an object", [[
					{ foo: "bar" },
					() => { delta.subDeltas['foo'] = new deltaJs.Delta.Remove() },
					{}
				], [
					{ key: "val", foo: "bar" },
					() => { delta.subDeltas['foo'] = new deltaJs.Delta.Remove() },
					{ key: "val" }
				], [
					{ obj: { foo: "bar" } },
					() => {
						delta.subDeltas['obj'] = new deltaJs.Delta.Modify({
							foo: new deltaJs.Delta.Remove()
						});
					},
					{ obj: {} }
				], [
					{ obj: { key: "val", foo: "bar" } },
					() => {
						delta.subDeltas['obj'] = new deltaJs.Delta.Modify({
							foo: new deltaJs.Delta.Remove()
						});
					},
					{ obj: { key: "val" } }
				], [
					{ foo: "bar" },
					() => { delta.subDeltas['absentKey'] = new deltaJs.Delta.Remove() },
					expectError(DeltaJs.ApplicationError)
				]]);

				itCan("forbid a field from being in an object", [[
					{ foo: "bar" },
					() => { delta.subDeltas['absentKey'] = new deltaJs.Delta.Forbid() },
					{ foo: "bar" }
				], [
					{ obj: { foo: "bar" } },
					() => {
						delta.subDeltas['obj'] = new deltaJs.Delta.Modify({
							absentKey: new deltaJs.Delta.Forbid()
						});
					},
					{ obj: { foo: "bar" } }
				], [
					{ key: "val", foo: "bar" },
					() => { delta.subDeltas['key'] = new deltaJs.Delta.Forbid() },
					expectError(DeltaJs.ApplicationError)
				]]);

				itCan("replace an existing field in an object", [[
					{ foo: "bar" },
					() => { delta.subDeltas['foo'] = new deltaJs.Delta.Replace("BAS") },
					{ foo: "BAS" }
				], [
					{ key: "val", foo: "bar" },
					() => { delta.subDeltas['foo'] = new deltaJs.Delta.Replace("BAS") },
					{ key: "val", foo: "BAS" }
				], [
					{ obj: { foo: "bar" } },
					() => {
						delta.subDeltas['obj'] = new deltaJs.Delta.Modify({
							foo: new deltaJs.Delta.Replace("BAS")
						});
					},
					{ obj: { foo: "BAS" } }
				], [
					{ obj: { key: "val", foo: "bar" } },
					() => {
						delta.subDeltas['obj'] = new deltaJs.Delta.Modify({
							foo: new deltaJs.Delta.Replace("BAS")
						});
					},
					{ obj: { key: "val", foo: "BAS" } }
				], [
					{ foo: "bar" },
					() => { delta.subDeltas['absentKey'] = new deltaJs.Delta.Replace("BAS") },
					expectError(DeltaJs.ApplicationError)
				]]);

				itCan("update an existing field in an object using the old value", [[
					{ foo: "bar" },
					() => { delta.subDeltas['foo'] = new deltaJs.Delta.Update(old => `${old}-BAS`) },
					{ foo: "bar-BAS" }
				], [
					{ key: "val", foo: "bar" },
					() => { delta.subDeltas['foo'] = new deltaJs.Delta.Update(old => `${old}-BAS`) },
					{ key: "val", foo: "bar-BAS" }
				], [
					{ obj: { foo: "bar" } },
					() => {
						delta.subDeltas['obj'] = new deltaJs.Delta.Modify({
							foo: new deltaJs.Delta.Update(old => `${old}-BAS`)
						});
					},
					{ obj: { foo: "bar-BAS" } }
				], [
					{ obj: { key: "val", foo: "bar" } },
					() => {
						delta.subDeltas['obj'] = new deltaJs.Delta.Modify({
							foo: new deltaJs.Delta.Update(old => `${old}-BAS`)
						});
					},
					{ obj: { key: "val", foo: "bar-BAS" } }
				]]);

				// NOTE: We're not expecting Update on an undefined value to throw an error,
				//       because Update shouldn't have such a precondition. However, that's not
				//       implemented yet, so the correct behavior isn't tested yet either.

			});

		});

		describe("delta composition", () => {

			var delta1, delta2;

			beforeEach(() => {
				delta1 = new deltaJs.Delta.Modify();
				delta2 = new deltaJs.Delta.Modify();
			});

			itCan("correctly modify objects when the composition is valid", [[
				{ key: "val" },
				() => {
					delta1.subDeltas['foo1'] = new deltaJs.Delta.Add("bar1");
					delta2.subDeltas['foo2'] = new deltaJs.Delta.Add("bar2");
					delta = delta1.composedWith(delta2);
				},
				{ key: "val", foo1: "bar1", foo2: "bar2" }
			], [
				{ key: "val", key1: "val1", key2: "val2" },
				() => {
					delta1.subDeltas['key1'] = new deltaJs.Delta.Remove();
					delta2.subDeltas['key2'] = new deltaJs.Delta.Remove();
					delta = delta1.composedWith(delta2);
				},
				{ key: "val" }
			], [
				{ key: "val" },
				() => {
					delta1.subDeltas['foo1'] = new deltaJs.Delta.Forbid();
					delta2.subDeltas['foo2'] = new deltaJs.Delta.Forbid();
					delta = delta1.composedWith(delta2);
				},
				{ key: "val" }
			], [
				{ key1: "val1", key2: "val2" },
				() => {
					delta1.subDeltas['key1'] = new deltaJs.Delta.Replace("VAL1");
					delta2.subDeltas['key2'] = new deltaJs.Delta.Replace("VAL2");
					delta = delta1.composedWith(delta2);
				},
				{ key1: "VAL1", key2: "VAL2" }
			], [
				{ key: "val" },
				() => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Add({});
					delta2.subDeltas['foo'] = new deltaJs.Delta.Modify({
						bar: new deltaJs.Delta.Add("bas")
					});
					delta = delta1.composedWith(delta2);
				},
				{ key: "val", foo: { bar: "bas" } }
			], [
				{ key: "val", foo: "bar" },
				() => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Add({});
					delta2.subDeltas['foo'] = new deltaJs.Delta.Modify({
						bar: new deltaJs.Delta.Add("bas")
					});
					delta = delta1.composedWith(delta2);
				},
				expectError(DeltaJs.ApplicationError) // 'foo' is forbidden, but was present
			], [
				{ key: "val" },
				() => {
					// a more complex / deep version of 'add' composed with 'modify' (so, just for this one, two extra deltas)
					var delta3 = new deltaJs.Delta.Modify();
					var delta4 = new deltaJs.Delta.Modify();
					delta1.subDeltas['level1'] = new deltaJs.Delta.Add({ level2: {} });
					delta2.subDeltas['level1'] = new deltaJs.Delta.Modify({
						level2: new deltaJs.Delta.Modify({
							sideLevel: new deltaJs.Delta.Add("final")
						})
					});
					delta3.subDeltas['level1'] = new deltaJs.Delta.Modify({
						level2: new deltaJs.Delta.Modify({
							level3: new deltaJs.Delta.Add({})
						})
					});
					delta4.subDeltas['level1'] = new deltaJs.Delta.Modify({
						level2: new deltaJs.Delta.Modify({
							level3: new deltaJs.Delta.Modify({
								level4: new deltaJs.Delta.Add("final")
							})
						})
					});
					delta = delta1.composedWith(delta2).composedWith(delta3).composedWith(delta4);
				},
				{ key: "val", level1: { level2: { sideLevel: "final", level3: { level4: "final" } } } }
			], [
				{ key: "val", foo: { bar: "bas" } },
				() => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Modify({
						newKey: new deltaJs.Delta.Add("newVal")
					});
					delta2.subDeltas['foo'] = new deltaJs.Delta.Remove();
					delta = delta1.composedWith(delta2);
				},
				{ key: "val" }
			], [
				{ key: "val" },
				() => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Add("bar");
					delta2.subDeltas['foo'] = new deltaJs.Delta.Remove();
					delta = delta1.composedWith(delta2);
				},
				{ key: "val" }
			], [
				{ key: "val", foo: "whatever" },
				() => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Add("bar");
					delta2.subDeltas['foo'] = new deltaJs.Delta.Remove();
					delta = delta1.composedWith(delta2);
				},
				expectError(DeltaJs.ApplicationError) // 'foo' is forbidden, but was present
			], [
				{ key: "val", foo: "whatever" },
				() => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Remove();
					delta2.subDeltas['foo'] = new deltaJs.Delta.Add("bar");
					delta = delta1.composedWith(delta2);
				},
				{ key: "val", foo: "bar" }
			], [
				{ key: "val" },
				() => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Remove();
					delta2.subDeltas['foo'] = new deltaJs.Delta.Add("bar");
					delta = delta1.composedWith(delta2);
				},
				expectError(DeltaJs.ApplicationError) // 'foo' is mandatory, but was absent
			], [
				{ key: "val", foo: "whatever" },
				() => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Remove();
					delta2.subDeltas['foo'] = new deltaJs.Delta.Forbid();
					delta = delta1.composedWith(delta2);
				},
				{ key: "val" }
			], [
				{ key: "val" },
				() => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Remove();
					delta2.subDeltas['foo'] = new deltaJs.Delta.Forbid();
					delta = delta1.composedWith(delta2);
				},
				expectError(DeltaJs.ApplicationError) // 'foo' is mandatory, but was absent
			], [
				{ key: "val" },
				() => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Forbid();
					delta2.subDeltas['foo'] = new deltaJs.Delta.Add("bar");
					delta = delta1.composedWith(delta2);
				},
				{ key: "val", foo: "bar" }
			], [
				{ key: "val", foo: "bar" },
				() => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Forbid();
					delta2.subDeltas['foo'] = new deltaJs.Delta.Add("bar");
					delta = delta1.composedWith(delta2);
				},
				expectError(DeltaJs.ApplicationError) // 'foo' is forbidden, but was present
			], [
				{ key: "val" },
				() => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Forbid();
					delta2.subDeltas['foo'] = new deltaJs.Delta.Forbid();
					delta = delta1.composedWith(delta2);
				},
				{ key: "val" }
			], [
				{ key: "val", foo: "bar" },
				() => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Forbid();
					delta2.subDeltas['foo'] = new deltaJs.Delta.Forbid();
					delta = delta1.composedWith(delta2);
				},
				expectError(DeltaJs.ApplicationError) // 'foo' is forbidden (twice), but was present
			], [
				{ key: "val", foo: { bar: "bas" } },
				() => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Modify();
					delta2.subDeltas['foo'] = new deltaJs.Delta.Replace("newValue");
					delta = delta1.composedWith(delta2);
				},
				{ key: "val", foo: "newValue" }
			], [
				{ key: "val" },
				() => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Modify();
					delta2.subDeltas['foo'] = new deltaJs.Delta.Replace("newValue");
					delta = delta1.composedWith(delta2);
				},
				expectError(DeltaJs.ApplicationError) // 'foo' is mandatory, but was absent
			], [
				{ key: "val" },
				() => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Add("oldValue");
					delta2.subDeltas['foo'] = new deltaJs.Delta.Replace("newValue");
					delta = delta1.composedWith(delta2);
				},
				{ key: "val", foo: "newValue" }
			], [
				{ key: "val", foo: { bar: "bas" } },
				() => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Add("oldValue");
					delta2.subDeltas['foo'] = new deltaJs.Delta.Replace("newValue");
					delta = delta1.composedWith(delta2);
				},
				expectError(DeltaJs.ApplicationError) // 'foo' is forbidden, but was present
			], [
				{ key: "val", foo: "bar" },
				() => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Replace({});
					delta2.subDeltas['foo'] = new deltaJs.Delta.Modify({
						bar: new deltaJs.Delta.Add("bas")
					});
					delta = delta1.composedWith(delta2);
				},
				{ key: "val", foo: { bar: "bas" } }
			], [
				{ key: "val" },
				() => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Replace({});
					delta2.subDeltas['foo'] = new deltaJs.Delta.Modify({
						bar: new deltaJs.Delta.Add("bas")
					});
					delta = delta1.composedWith(delta2);
				},
				expectError(DeltaJs.ApplicationError) // 'foo' is mandatory, but was absent
			], [
				{ key: "val", level1: "oldValue" },
				() => {
					// a more complex / deep version of 'replace' composed with 'modify' (so, just for this one, two extra deltas)
					var delta3 = new deltaJs.Delta.Modify();
					var delta4 = new deltaJs.Delta.Modify();
					delta1.subDeltas['level1'] = new deltaJs.Delta.Replace({ level2: {} });
					delta2.subDeltas['level1'] = new deltaJs.Delta.Modify({
						level2: new deltaJs.Delta.Modify({
							sideLevel: new deltaJs.Delta.Add("final")
						})
					});
					delta3.subDeltas['level1'] = new deltaJs.Delta.Modify({
						level2: new deltaJs.Delta.Modify({
							level3: new deltaJs.Delta.Add({})
						})
					});
					delta4.subDeltas['level1'] = new deltaJs.Delta.Modify({
						level2: new deltaJs.Delta.Modify({
							level3: new deltaJs.Delta.Modify({
								level4: new deltaJs.Delta.Add("final")
							})
						})
					});
					delta = delta1.composedWith(delta2).composedWith(delta3).composedWith(delta4);
				},
				{ key: "val", level1: { level2: { sideLevel: "final", level3: { level4: "final" } } } }
			], [
				{ key: "val", foo: { bar: "bas" } },
				() => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Replace("newValue");
					delta2.subDeltas['foo'] = new deltaJs.Delta.Remove();
					delta = delta1.composedWith(delta2);
				},
				{ key: "val" }
			], [
				{ key: "val" },
				() => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Replace("newValue");
					delta2.subDeltas['foo'] = new deltaJs.Delta.Remove();
					delta = delta1.composedWith(delta2);
				},
				expectError(DeltaJs.ApplicationError) // 'foo' is mandatory, but was absent
			], [
				{ key: "val", foo: { bar: "bas" } },
				() => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Replace("oldValue");
					delta2.subDeltas['foo'] = new deltaJs.Delta.Replace("newValue");
					delta = delta1.composedWith(delta2);
				},
				{ key: "val", foo: "newValue" }
			], [
				{ key: "val" },
				() => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Replace("oldValue");
					delta2.subDeltas['foo'] = new deltaJs.Delta.Replace("newValue");
					delta = delta1.composedWith(delta2);
				},
				expectError(DeltaJs.ApplicationError) // 'foo' is mandatory, but was absent
			], [
				{ key: "val" },
				() => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Add("oldValue");
					delta2.subDeltas['foo'] = new deltaJs.Delta.Update(v => `${v}-newValue`);
					delta = delta1.composedWith(delta2);
				},
				{ key: "val", foo: "oldValue-newValue" }
			], [
				{ key: "val", foo: { bar: "bas" } },
				() => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Update(v => `${v}-newValue`);
					delta2.subDeltas['foo'] = new deltaJs.Delta.Remove();
					delta = delta1.composedWith(delta2);
				},
				{ key: "val" }
			], [
				{ key: "val", foo: "initialValue" },
				() => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Update(v => `${v}-oldValue`);
					delta2.subDeltas['foo'] = new deltaJs.Delta.Update(v => `${v}-newValue`);
					delta = delta1.composedWith(delta2);
				},
				{ key: "val", foo: "initialValue-oldValue-newValue" }
			]]);

			// NOTE: We're not expecting Update on an undefined value to throw an error,
			//       because Update shouldn't have such a precondition. However, that's not
			//       implemented yet, so the correct behavior isn't tested yet either.
			// NOTE: Composition between Modify and Update is not implemented yet, but should
			//       test as specified in the 'xitCan' below:

			xitCan("correctly modify objects when the composition is valid (not yet implemented)", [[
				{ key: "val", foo: { bar1: "bas1" } },
				() => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Modify({
						bar2: new deltaJs.Delta.Add("bas2")
					});
					delta2.subDeltas['foo'] = new deltaJs.Delta.Update(v => ({ BAR: `${v.bar}-${v.bar2}` }));
					delta = delta1.composedWith(delta2);
				},
				{ key: "val", foo: { BAR: "bas1-bas2" } }
			], [
				{ key: "val", foo: "bas1" },
				() => {
					delta2.subDeltas['foo'] = new deltaJs.Delta.Update(v => ({ bar1: v }));
					delta1.subDeltas['foo'] = new deltaJs.Delta.Modify({
						bar2: new deltaJs.Delta.Add("bas2")
					});
					delta = delta1.composedWith(delta2);
				},
				{ key: "val", foo: { bar1: "bas1", bar2: "bas2" } }
			]]);

			itCan("throw an error when the composition is detectably invalid", [
				() => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Modify();
					delta2.subDeltas['foo'] = new deltaJs.Delta.Add("bar");
					delta = delta1.composedWith(delta2);
				}, () => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Add("bar1");
					delta2.subDeltas['foo'] = new deltaJs.Delta.Add("bar2");
					delta = delta1.composedWith(delta2);
				}, () => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Remove();
					delta2.subDeltas['foo'] = new deltaJs.Delta.Modify();
					delta = delta1.composedWith(delta2);
				}, () => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Remove();
					delta2.subDeltas['foo'] = new deltaJs.Delta.Remove();
					delta = delta1.composedWith(delta2);
				}, () => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Modify();
					delta2.subDeltas['foo'] = new deltaJs.Delta.Forbid();
					delta = delta1.composedWith(delta2);
				}, () => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Add("bar");
					delta2.subDeltas['foo'] = new deltaJs.Delta.Forbid();
					delta = delta1.composedWith(delta2);
				}, () => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Forbid();
					delta2.subDeltas['foo'] = new deltaJs.Delta.Modify();
					delta = delta1.composedWith(delta2);
				}, () => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Forbid();
					delta2.subDeltas['foo'] = new deltaJs.Delta.Remove();
					delta = delta1.composedWith(delta2);
				}, () => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Remove();
					delta2.subDeltas['foo'] = new deltaJs.Delta.Replace("bar");
					delta = delta1.composedWith(delta2);
				}, () => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Forbid();
					delta2.subDeltas['foo'] = new deltaJs.Delta.Replace("bar");
					delta = delta1.composedWith(delta2);
				}, () => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Replace("bar1");
					delta2.subDeltas['foo'] = new deltaJs.Delta.Add("bar2");
					delta = delta1.composedWith(delta2);
				}, () => {
					delta1.subDeltas['foo'] = new deltaJs.Delta.Replace("bar");
					delta2.subDeltas['foo'] = new deltaJs.Delta.Forbid();
					delta = delta1.composedWith(delta2);
				}
			].map((action) => [null, action, expectError(DeltaJs.CompositionError)]));

		});

	});


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	describe("delta proxies", () => {


		var d;
		beforeEach(() => {
			afterAction(() => {
				delta = d.delta();
			});
		});


		describe("object operations", () => {

			beforeEach(() => {
				d = new deltaJs.Delta.Modify().do();
			});

			itCan("add a new field to an object", [[
				{},
				() => { d.add('foo', "bar") },
				{ foo: "bar" }
			], [
				{ key: "val" },
				() => { d.add('foo', "bar") },
				{ key: "val", foo: "bar" }
			], [
				{ key: "val" },
				() => { d.add('key', "bar") },
				expectError(DeltaJs.ApplicationError)
			]]);

			itCan("remove an existing field from an object", [[
				{ foo: "bar" },
				() => { d.remove('foo') },
				{}
			], [
				{ key: "val", foo: "bar" },
				() => { d.remove('foo') },
				{ key: "val" }
			], [
				{ foo: "bar" },
				() => { d.remove('key') },
				expectError(DeltaJs.ApplicationError)
			]]);

			itCan("forbid a field from being in an object", [[
				{ foo: "bar" },
				() => { d.forbid('key') },
				{ foo: "bar" }
			], [
				{ key: "val", foo: "bar" },
				() => { d.forbid('key') },
				expectError(DeltaJs.ApplicationError)
			]]);

			itCan("replace an existing field in an object", [[
				{ foo: "bar" },
				() => { d.replace('foo', "BAS") },
				{ foo: "BAS" }
			], [
				{ key: "val", foo: "bar" },
				() => { d.replace('foo', "BAS") },
				{ key: "val", foo: "BAS" }
			], [
				{ foo: "bar" },
				() => { d.replace('key', "BAS") },
				expectError(DeltaJs.ApplicationError)
			]]);

			itCan("update an existing field in an object using the old value", [[
				{ foo: "bar" },
				() => { d.update('foo', old => `${old}-BAS`) },
				{ foo: "bar-BAS" }
			], [
				{ key: "val", foo: "bar" },
				() => { d.update('foo', old => `${old}-BAS`) },
				{ key: "val", foo: "bar-BAS" }
			], [
				{ obj: { foo: "bar" } },
				() => { d.update('obj.foo', old => `${old}-BAS`) },
				{ obj: { foo: "bar-BAS" } }
			], [
				{ obj: { key: "val", foo: "bar" } },
				() => { d.update('obj.foo', old => `${old}-BAS`) },
				{ obj: { key: "val", foo: "bar-BAS" } }
			], [
				{ fn(x) { return `(${x})` } },
				() => { d.update('fn', old => x => `-${old(x)}-`) },
				(obj) => { expect(obj.fn("message")).toEqual("-(message)-") }
			]]);

			// NOTE: We're not expecting Update on an undefined value to throw an error,
			//       because Update shouldn't have such a precondition. However, that's not
			//       implemented yet, so the correct behavior isn't tested yet either.

		});


		describe("composite object operations", () => {

			beforeEach(() => {
				d = new deltaJs.Delta.Modify().do();
			});

			itCan("correctly modify objects when the composition is valid", [[
				{ key: "val" },
				() => {
					d.add('foo1', "bar1");
					d.add('foo2', "bar2");
				},
				{ key: "val", foo1: "bar1", foo2: "bar2" }
			], [
				{ key: "val", key1: "val1", key2: "val2" },
				() => {
					d.remove('key1');
					d.remove('key2');
				},
				{ key: "val" }
			], [
				{ key: "val" },
				() => {
					d.forbid('foo1');
					d.forbid('foo2');
				},
				{ key: "val" }
			], [
				{ key1: "val1", key2: "val2" },
				() => {
					d.replace('key1', "VAL1");
					d.replace('key2', "VAL2");
				},
				{ key1: "VAL1", key2: "VAL2" }
			], [
				{ key: "val" },
				() => {
					d.add('foo', {});
					d.modify('foo').add('bar', "bas");
				},
				{ key: "val", foo: { bar: "bas" } }
			], [
				{ key: "val", foo: "bar" },
				() => {
					d.add('foo', {});
					d.modify('foo').add('bar', "bas");
				},
				expectError(DeltaJs.ApplicationError) // 'foo' is forbidden, but was present
			], [
				{ key: "val" },
				() => {
					// a more complex / deep version of 'add' composed with 'modify'
					d.add('level1', { level2: {} });
					d.add('level1.level2.sideLevel', "final");
					d.modify('level1.level2').add('level3', {});
					d.modify('level1').modify('level2.level3').add('level4', "final");
				},
				{ key: "val", level1: { level2: { sideLevel: "final", level3: { level4: "final" } } } }
			], [
				{ key: "val", foo: { bar: "bas" } },
				() => {
					d.modify('foo').add('newKey', "newVal");
					d.remove('foo');
				},
				{ key: "val" }
			], [
				{ key: "val" },
				() => {
					d.add('foo', "bar");
					d.remove('foo');
				},
				{ key: "val" }
			], [
				{ key: "val", foo: "whatever" },
				() => {
					d.add('foo', "bar");
					d.remove('foo');
				},
				expectError(DeltaJs.ApplicationError) // 'foo' is forbidden, but was present
			], [
				{ key: "val", foo: "whatever" },
				() => {
					d.remove('foo');
					d.add('foo', "bar");
				},
				{ key: "val", foo: "bar" }
			], [
				{ key: "val" },
				() => {
					d.remove('foo');
					d.add('foo', "bar");
				},
				expectError(DeltaJs.ApplicationError) // 'foo' is mandatory, but was absent
			], [
				{ key: "val", foo: "whatever" },
				() => {
					d.remove('foo');
					d.forbid('foo');
				},
				{ key: "val" }
			], [
				{ key: "val" },
				() => {
					d.remove('foo');
					d.forbid('foo');
				},
				expectError(DeltaJs.ApplicationError) // 'foo' is mandatory, but was absent
			], [
				{ key: "val" },
				() => {
					d.forbid('foo');
					d.add('foo', "bar");
				},
				{ key: "val", foo: "bar" }
			], [
				{ key: "val", foo: "bar" },
				() => {
					d.forbid('foo');
					d.add('foo', "bar");
				},
				expectError(DeltaJs.ApplicationError) // 'foo' is forbidden, but was present
			], [
				{ key: "val" },
				() => {
					d.forbid('foo');
					d.forbid('foo');
				},
				{ key: "val" }
			], [
				{ key: "val", foo: "bar" },
				() => {
					d.forbid('foo');
					d.forbid('foo');
				},
				expectError(DeltaJs.ApplicationError) // 'foo' is forbidden (twice), but was present
			], [
				{ key: "val", foo: { bar: "bas" } },
				() => {
					d.modify('foo');
					d.replace('foo', "newValue");
				},
				{ key: "val", foo: "newValue" }
			], [
				{ key: "val" },
				() => {
					d.modify('foo');
					d.replace('foo', "newValue");
				},
				expectError(DeltaJs.ApplicationError) // 'foo' is mandatory, but was absent
			], [
				{ key: "val" },
				() => {
					d.add('foo', "oldValue");
					d.replace('foo', "newValue");
				},
				{ key: "val", foo: "newValue" }
			], [
				{ key: "val", foo: { bar: "bas" } },
				() => {
					d.add('foo', "oldValue");
					d.replace('foo', "newValue");
				},
				expectError(DeltaJs.ApplicationError) // 'foo' is forbidden, but was present
			], [
				{ key: "val", foo: "bar" },
				() => {
					d.replace('foo', {});
					d.modify('foo').add('bar', "bas");
				},
				{ key: "val", foo: { bar: "bas" } }
			], [
				{ key: "val" },
				() => {
					d.replace('foo', {});
					d.modify('foo').add('bar', "bas");
				},
				expectError(DeltaJs.ApplicationError) // 'foo' is mandatory, but was absent
			], [
				{ key: "val", level1: "oldValue" },
				() => {
					// a more complex / deep version of 'replace' composed with 'modify'
					d.replace('level1', { level2: {} });
					d.add('level1.level2.sideLevel', "final");
					d.modify('level1.level2').add('level3', {});
					d.modify('level1').modify('level2.level3').add('level4', "final");
				},
				{ key: "val", level1: { level2: { sideLevel: "final", level3: { level4: "final" } } } }
			], [
				{ key: "val", foo: { bar: "bas" } },
				() => {
					d.replace('foo', "newValue");
					d.remove('foo');
				},
				{ key: "val" }
			], [
				{ key: "val" },
				() => {
					d.replace('foo', "newValue");
					d.remove('foo');
				},
				expectError(DeltaJs.ApplicationError) // 'foo' is mandatory, but was absent
			], [
				{ key: "val", foo: { bar: "bas" } },
				() => {
					d.replace('foo', "oldValue");
					d.replace('foo', "newValue");
				},
				{ key: "val", foo: "newValue" }
			], [
				{ key: "val" },
				() => {
					d.replace('foo', "oldValue");
					d.replace('foo', "newValue");
				},
				expectError(DeltaJs.ApplicationError) // 'foo' is mandatory, but was absent
			]]);

			itCan("throw an error when the composition is detectably invalid", [
				() => {
					d.modify('foo');
					d.add('foo', "bar");
				}, () => {
					d.add('foo', "bar1");
					d.add('foo', "bar2");
				}, () => {
					d.remove('foo');
					d.modify('foo');
				}, () => {
					d.remove('foo');
					d.remove('foo');
				}, () => {
					d.modify('foo');
					d.forbid('foo');
				}, () => {
					d.add('foo', "bar");
					d.forbid('foo');
				}, () => {
					d.forbid('foo');
					d.modify('foo');
				}, () => {
					d.forbid('foo');
					d.remove('foo');
				}, () => {
					d.remove('foo');
					d.replace('foo', "bar");
				}, () => {
					d.forbid('foo');
					d.replace('foo', "bar");
				}, () => {
					d.replace('foo', "bar1");
					d.add('foo', "bar2");
				}, () => {
					d.replace('foo', "bar");
					d.forbid('foo');
				}
			].map(action => [null, action, expectError(DeltaJs.CompositionError)]));

		});


		describe("array operations", () => {

			beforeEach(() => {
				d = new deltaJs.Delta.Modify().do();
			});

			itCan("prepend a new value to an array", [[
				{ arr: [] },
				() => { d.prepend('arr', "val") },
				{ arr: ['val'] }
			], [
				{ arr: ['init'] },
				() => { d.prepend('arr', "val") },
				{ arr: ['val', 'init'] }
			], [
				{ arr: ['init1', 'init2'] },
				() => { d.prepend('arr', "val") },
				{ arr: ['val', 'init1', 'init2'] }
			], [
				{ arr: 'not an array or a function' },
				() => { d.prepend('arr', "val") },
				expectError(DeltaJs.ApplicationError)
			], [
				{ key: "val" },
				() => { d.prepend('arr', "val") },
				expectError(DeltaJs.ApplicationError)
			]]);

			itCan("insert a new value into an array", [[
				{ arr: [] },
				() => { d.insert('arr', "val") },
				{ arr: ['val'] }
			], [
				{ arr: ['init'] },
				() => { d.insert('arr', "val") },
				(obj) => {
					expect(obj).toEqualOneOf(
						{ arr: ['val', 'init'] },
						{ arr: ['init', 'val'] }
					);
				}
			], [
				{ arr: ['init1', 'init2'] },
				() => { d.insert('arr', "val") },
				(obj) => {
					expect(obj).toEqualOneOf(
						{ arr: ['val', 'init1', 'init2'] },
						{ arr: ['init1', 'val', 'init2'] },
						{ arr: ['init1', 'init2', 'val'] }
					);
				}
			], [
				{ arr: 'not an array or a function' },
				() => { d.insert('arr', "val") },
				expectError(DeltaJs.ApplicationError)
			], [
				{ key: "val" },
				() => { d.insert('arr', "val") },
				expectError(DeltaJs.ApplicationError)
			]]);

			itCan("append a new value to an array", [[
				{ arr: [] },
				() => { d.append('arr', "val") },
				{ arr: ['val'] }
			], [
				{ arr: ['init'] },
				() => { d.append('arr', "val") },
				{ arr: ['init', 'val'] }
			], [
				{ arr: ['init1', 'init2'] },
				() => { d.append('arr', "val") },
				{ arr: ['init1', 'init2', 'val'] }
			], [
				{ arr: 'not an array or a function' },
				() => { d.append('arr', "val") },
				expectError(DeltaJs.ApplicationError)
			], [
				{ key: "val" },
				() => { d.append('arr', "val") },
				expectError(DeltaJs.ApplicationError)
			]]);

		});


		describe("composite array operations", () => {

			beforeEach(() => {
				d = new deltaJs.Delta.Modify().do();
			});

			itCan("combine multiple array operations", [[
				{ arr: ['init'] },
				() => {
					d.prepend('arr', 1);
					d.prepend('arr', 2);
				},
				{ arr: [2, 1, 'init'] }
			], [
				{ arr: ['init'] },
				() => {
					d.prepend('arr', 1);
					d.insert('arr', 2);
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
					d.prepend('arr', 1);
					d.append('arr', 2);
				},
				{ arr: [1, 'init', 2] }
			], [
				{ arr: ['init'] },
				() => {
					d.insert('arr', 1);
					d.prepend('arr', 2);
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
					d.insert('arr', 1);
					d.insert('arr', 2);
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
					d.insert('arr', 1);
					d.append('arr', 2);
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
					d.append('arr', 1);
					d.prepend('arr', 2);
				},
				{ arr: [2, 'init', 1] }
			], [
				{ arr: ['init'] },
				() => {
					d.append('arr', 1);
					d.insert('arr', 2);
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
					d.append('arr', 1);
					d.append('arr', 2);
				},
				{ arr: ['init', 1, 2] }
			]]);

			itCan("combine array operations with other types of operations or throw an error if invalid", [[
				{ key: "val" },
				() => {
					d.add('arr', ['init']);
					d.append('arr', "val");
				},
				{ key: "val", arr: ['init', 'val'] }
			], [
				{ key: "val" },
				() => {
					d.add('arr', 'not an array');
					d.append('arr', "val");
				},
				expectError(DeltaJs.CompositionError) // 'arr', left by the 'add' operation, has to be an array
			], [
				{ key: "val", arr: "whatever" },
				() => {
					d.add('arr', ['init']);
					d.append('arr', "val");
				},
				expectError(DeltaJs.ApplicationError) // 'arr' is forbidden, but was present
			], [
				{ key: "val", arr: "whatever" },
				() => {
					d.replace('arr', ['init']);
					d.append('arr', "val");
				},
				{ key: "val", arr: ['init', 'val'] }
			], [
				{ key: "val", arr: "whatever" },
				() => {
					d.replace('arr', 'not an array');
					d.append('arr', "val");
				},
				expectError(DeltaJs.CompositionError) // 'arr', left by the 'replace' operation, has to be an array
			], [
				{ key: "val" },
				() => {
					d.replace('arr', ['init']);
					d.append('arr', "val");
				},
				expectError(DeltaJs.ApplicationError) // 'arr' is mandatory, but was absent
			], [
				{ key: "val", arr: ['init'] },
				() => {
					d.append('arr', "val");
					d.remove('arr');
				},
				{ key: "val" }
			], [
				{ key: "val" },
				() => {
					d.append('arr', "val");
					d.remove('arr');
				},
				expectError(DeltaJs.ApplicationError) // 'arr' is mandatory, but was absent
			], [
				{ key: "val", arr: ['init'] },
				() => {
					d.append('arr', "val");
					d.replace('arr', "whatever");
				},
				{ key: "val", arr: "whatever" }
			], [
				{ key: "val" },
				() => {
					d.append('arr', "val");
					d.replace('arr', "whatever");
				},
				expectError(DeltaJs.ApplicationError) // 'arr' is mandatory, but was absent
			]]);

		});


		describe("function operations", () => {

			beforeEach(() => {
				d = new deltaJs.Delta.Modify().do();
			});

			itCan("prepend new statements to run inside an existing function", [[
				{ fn(a, b, c) { fA(this, a, c) } },
				() => { d.prepend('fn', function (a, b) { fB(this, b, b) }) },
				(obj) => {
					obj.fn(1, 2, 3);
					expect(callLog).toEqual([['fB', [obj, 2, 2]], ['fA', [obj, 1, 3]]]);
				}
			], [
				{ fn: 'not a function or an array' },
				() => { d.prepend('fn', function () {}) },
				expectError(DeltaJs.ApplicationError)
			], [
				{ key: "val" },
				() => { d.prepend('fn', function () {}) },
				expectError(DeltaJs.ApplicationError)
			]]);

			itCan("insert new statements to run inside an existing function", [[
				{ fn(a, b, c) { fA(this, a, c) } },
				() => { d.insert('fn', function (a, b) { fB(this, b, b) }) },
				(obj) => {
					obj.fn(1, 2, 3);
					expect(callLog).toEqualOneOf(
							[['fB', [obj, 2, 2]], ['fA', [obj, 1, 3]]],
							[['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]]]
					);
				}
			], [
				{ fn: 'not a function or an array' },
				() => { d.insert('fn', function () {}) },
				expectError(DeltaJs.ApplicationError)
			], [
				{ key: "val" },
				() => { d.insert('fn', function () {}) },
				expectError(DeltaJs.ApplicationError)
			]]);

			itCan("append new statements to run inside an existing function", [[
				{ fn(a, b, c) { fA(this, a, c) } },
				() => { d.append('fn', function (a, b) { fB(this, b, b) }) },
				(obj) => {
					obj.fn(1, 2, 3);
					expect(callLog).toEqual([['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]]]);
				}
			], [
				{ fn: 'not a function or an array' },
				() => { d.append('fn', function () {}) },
				expectError(DeltaJs.ApplicationError)
			], [
				{ key: "val" },
				() => { d.append('fn', function () {}) },
				expectError(DeltaJs.ApplicationError)
			]]);

		});


		describe("composite function operations", () => {

			beforeEach(() => {
				d = new deltaJs.Delta.Modify().do();
			});

			itCan("combine multiple function operations", [[
				{ fn(a, b, c) { fA(this, a, c) } },
				() => {
					d.prepend('fn', function (a, b) { fB(this, b, b) });
					d.prepend('fn', function (a, b) { fC(this, b, a) });
				},
				(obj) => {
					obj.fn(1, 2, 3);
					expect(callLog).toEqual([['fC', [obj, 2, 1]], ['fB', [obj, 2, 2]], ['fA', [obj, 1, 3]]]);
				}
			], [
				{ fn(a, b, c) { fA(this, a, c) } },
				() => {
					d.prepend('fn', function (a, b) { fB(this, b, b) });
					d.insert('fn', function (a, b) { fC(this, b, a) });
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
					d.prepend('fn', function (a, b) { fB(this, b, b) });
					d.append('fn', function (a, b) { fC(this, b, a) });
				},
				(obj) => {
					obj.fn(1, 2, 3);
					expect(callLog).toEqual([['fB', [obj, 2, 2]], ['fA', [obj, 1, 3]], ['fC', [obj, 2, 1]]]);
				}
			], [
				{ fn(a, b, c) { fA(this, a, c) } },
				() => {
					d.insert('fn', function (a, b) { fB(this, b, b) });
					d.prepend('fn', function (a, b) { fC(this, b, a) });
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
					d.insert('fn', function (a, b) { fB(this, b, b) });
					d.insert('fn', function (a, b) { fC(this, b, a) });
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
					d.insert('fn', function (a, b) { fB(this, b, b) });
					d.append('fn', function (a, b) { fC(this, b, a) });
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
					d.append('fn', function (a, b) { fB(this, b, b) });
					d.prepend('fn', function (a, b) { fC(this, b, a) });
				},
				(obj) => {
					obj.fn(1, 2, 3);
					expect(callLog).toEqual([['fC', [obj, 2, 1]], ['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]]]);
				}
			], [
				{ fn(a, b, c) { fA(this, a, c) } },
				() => {
					d.append('fn', function (a, b) { fB(this, b, b) });
					d.insert('fn', function (a, b) { fC(this, b, a) });
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
					d.append('fn', function (a, b) { fB(this, b, b) });
					d.append('fn', function (a, b) { fC(this, b, a) });
				},
				(obj) => {
					obj.fn(1, 2, 3);
					expect(callLog).toEqual([['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]], ['fC', [obj, 2, 1]]]);
				}
			]]);

			itCan("combine function operations with other types of operations or throw an error if invalid", [[
				{ key: "val" },
				() => {
					d.add('fn', function (a, b, c) { fA(this, a, c) });
					d.append('fn', function (a, b) { fB(this, b, b) });
				},
				(obj) => {
					obj.fn(1, 2, 3);
					expect(obj.key).toBe("val");
					expect(callLog).toEqual([['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]]]);
				}
			], [
				{ key: "val" },
				() => {
					d.add('fn', 'not a function or an array');
					d.append('fn', function (a, b) { fB(this, b, b) });
				},
				expectError(DeltaJs.CompositionError) // 'fn', left by the 'add' operation, has to be an array
			], [
				{ key: "val", fn(a, b, c) { fA(this, a, c) } },
				() => {
					d.add('fn', function (a, b, c) { fA(this, a, c) });
					d.append('fn', function (a, b) { fB(this, b, b) });
				},
				expectError(DeltaJs.ApplicationError) // 'fn' is forbidden, but was present
			], [
				{ key: "val", fn(a, b, c) { fA(this, a, c) } },
				() => {
					d.replace('fn', function (a, b) { fB(this, b, b) });
					d.append('fn', function (a, b) { fC(this, b, a) });
				},
				(obj) => {
					obj.fn(1, 2, 3);
					expect(obj.key).toBe("val");
					expect(callLog).toEqual([['fB', [obj, 2, 2]], ['fC', [obj, 2, 1]]]);
				}
			], [
				{ key: "val", fn(a, b, c) { fA(this, a, c) } },
				() => {
					d.replace('fn', 'not a function or an array');
					d.append('fn', function (a, b) { fB(this, b, b) });
				},
				expectError(DeltaJs.CompositionError) // 'fn', left by the 'replace' operation, has to be an array
			], [
				{ key: "val" },
				() => {
					d.replace('fn', function (a, b, c) { fA(this, a, c) });
					d.append('fn', function (a, b) { fB(this, b, b) });
				},
				expectError(DeltaJs.ApplicationError) // 'fn' is mandatory, but was absent
			], [
				{ key: "val", fn(a, b, c) { fA(this, a, c) } },
				() => {
					d.append('fn', function (a, b) { fB(this, b, b) });
					d.remove('fn');
				},
				{ key: "val" }
			], [
				{ key: "val" },
				() => {
					d.append('fn', function (a, b) { fB(this, b, b) });
					d.remove('fn');
				},
				expectError(DeltaJs.ApplicationError) // 'fn' is mandatory, but was absent
			], [
				{ key: "val", fn(a, b, c) { fA(this, a, c) } },
				() => {
					d.append('fn', function (a, b) { fB(this, b, b) });
					d.replace('fn', "whatever");
				},
				{ key: "val", fn: "whatever" }
			], [
				{ key: "val" },
				() => {
					d.append('fn', function (a, b) { fB(this, b, b) });
					d.replace('fn', "whatever");
				},
				expectError(DeltaJs.ApplicationError) // 'fn' is mandatory, but was absent
			]]);

		});


		describe("the delta model operation", () => {

			var dm;
			beforeEach(() => {
				dm = d = new deltaJs.Delta.DeltaModel().do();
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
				},
				expectError(DeltaJs.ApplicationOrderCycle, { from: "Y", to: "Z" }) // it's about the last connection that makes the cycle
			]]);

			xitCan("throw an error if there is an unresolved conflict", [[
				{},
				() => {
					dm.do('X').add('key', "X value");
					dm.do('Y').add('key', "Y value");
				},
				expectError(DeltaJs.UnresolvedDeltaConflict)
			], [
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



		});


		describe("proxy-hierarchies", () => {

			beforeEach(() => {
				d = new deltaJs.Delta.Modify().do();
			});

			itCan("always give you the deepest container proxy in your call-chain", [[
				{ obj: { sub: { subSub: {} } } },
				() => {
					d.modify('obj')         // .
						.add('foo', "bar")  // .obj
						.add('bar', "bas"); // .obj
				},
				{ obj: { foo: "bar", bar: "bas", sub: { subSub: {} } } }
			], [
				{ obj: { sub: { subSub: {} } } },
				() => {
					d.modify('obj')                   // .
						.add('sub.subSub.foo', "bar") // .obj
						.add('bar', "bas");           // .obj (even though two implicit modifies were used)
				},
				{ obj: { bar: "bas", sub: { subSub: { foo: "bar" } } } }
			], [
				{ obj: { sub: { subSub: {} } } },
				() => {
					d.modify('obj.sub')         // .
						.modify('subSub')       // .obj.sub
							.add('foo', "bar")  // .obj.sub.subSub
							.add('bar', "bas"); // .obj.sub.subSub
				},
				{ obj: { sub: { subSub: { foo: "bar", bar: "bas" } } } }
			], [
				{ obj: { sub: { subSub: {} } } },
				() => {
					d.deltaModel('obj')             // .
						.do('X')                    // .obj
							.add('foo', "bar")      // .obj[X]
					        .modify('sub')          // .obj[X] (note that all .do argument are remembered in the chain)
								.add('bar', "bas"); // .obj[X].sub
				},
				{ obj: { foo: "bar", sub: { bar: "bas", subSub: {} } } }
			], [
				{ obj: { sub: { subSub: {} } } },
				() => {
					var subD = d.modify('obj').add('foo', "bar");
					subD.add('bar', "bas");
					d.add('key', "val"); // (note that you can use an existing reference to a shallower proxy)
				},
				{ key: "val", obj: { foo: "bar", bar: "bas", sub: { subSub: {} } } }
			]]);

			itCan("can only have one sub-proxy per key active at a time", [[
				{ obj: { sub: {} } }, // modify -> modify
				() => {
					d = d.modify('obj');
					var subD = d.modify('sub'); // create subD
					d.replace('sub', {});       // deactivate subD
					subD.add('key', 'value');   // try to use subD
				},
				expectError(DeltaJs.MultipleActiveProxiesError)
			], [
				{ obj: { sub: {} } }, // deltaModel -> modify
				() => {
					d = d.deltaModel('obj');
					var subD = d.do('x').modify('sub'); // create subD
					d.do('x').replace('sub', {});       // deactivate subD
					subD.add('key', "value");           // try to use subD
				},
				expectError(DeltaJs.MultipleActiveProxiesError)
			], [
				{ obj: { sub: {} } }, // modify -> delta model
				() => {
					d = d.modify('obj');
					var subD = d.deltaModel('sub');   // create subD
					d.replace('sub', {});             // deactivate subD
					subD.do('y').add('key', "value"); // try to use subD
				},
				expectError(DeltaJs.MultipleActiveProxiesError)
			], [
				{ obj: { sub: {} } }, // delta model -> delta model
				() => {
					d = d.deltaModel('obj');
					var subD = d.do('x').deltaModel('sub'); // create subD
					d.do('x').replace('sub', {});           // deactivate subD
					subD.do('y').add('key', "value");       // try to use subD
				},
				expectError(DeltaJs.MultipleActiveProxiesError)
			], [
				{ obj: { sub: { subSub: {} } } }, // make sure sub-proxies are disabled too
				() => {
					d = d.modify('obj');
					var subD = d.modify('sub');          // create subD
					var subSubD = subD.modify('subSub'); // create subSubD
					d.replace('sub', {});                // deactivate subD
					subSubD.add('key', "value");         // try to use subSubD
				},
				expectError(DeltaJs.MultipleActiveProxiesError)
			]]);

		});



	});


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
				e.selects(e);
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
				e.selects('e');
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

		});

	});

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
			w.do({ iff: ['F'] }).add('obj.w', 'w-value');
			x.do({ iff: ['F', 'G'] }).add('obj.x', 'x-value');
			y.do({ iff: ['F', 'H'] }).add('obj.y', 'y-value');
			z.do({ feature: false }).add('obj.z', 'z-value');

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
