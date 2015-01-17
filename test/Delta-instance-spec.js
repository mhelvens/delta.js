'use strict';

describe("Delta instance", function () {

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var deltaJs, rootDelta, delta;
	beforeEach(() => {
		deltaJs = new DeltaJs();
		rootDelta = new deltaJs.operations.Modify();
		delta = rootDelta.facade();
	});

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function ExpectedError() {}

	function expectError(when) {
		var result = new ExpectedError();
		result.when = when;
		return result;
	}

	function itCan(description, triples) {
		var counter = 0;
		triples.forEach(([pre, action, post]) => {
			it(`can ${description} (${++counter})`, () => {
				/* creating the initial object using the given 'pre' */
				var rootObj = { obj: (typeof pre === 'function' ? pre() : pre) };
				var target = new DeltaJs.ReadableTarget(rootObj); // because we don't allow replacing/removing the root

				/* creating the delta through the given code */
				if (post instanceof ExpectedError && post.when === 'delta-composition') {
					expect(action).toThrowError();
				} else {
					action();

					/* applying the delta to the given 'pre' value */
					if (post instanceof ExpectedError && post.when === 'delta-application') {
						expect(() => rootDelta.applyTo(target)).toThrowError();
					} else {
						rootDelta.applyTo(target);
						if (typeof post === 'function') {
							post(rootObj.obj);
						} else {
							expect(rootObj.obj).toEqual(post);
						}
					}
				}
			});
		});
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	describe('object operations', () => {

		itCan('add a new field to an object', [[
			{},
			() => { delta.add('obj.foo', 'bar') },
			{ foo: 'bar' }
		], [
			{},
			() => { delta.modify('obj').add('foo', 'bar') },
			{ foo: 'bar' }
		], [
			{ key: 'val' },
			() => { delta.add('obj.foo', 'bar') },
			{ key: 'val', foo: 'bar' }
		], [
			{ key: 'val' },
			() => { delta.modify('obj').add('foo', 'bar') },
			{ key: 'val', foo: 'bar' }
		], [
			{ key: 'val' },
			() => { delta.add('obj.key', 'bar') },
			expectError('delta-application')
		], [
			{ key: 'val' },
			() => { delta.modify('obj').add('key', 'bar') },
			expectError('delta-application')
		]]);

		itCan('remove an existing field from an object', [[
			{ foo: 'bar' },
			() => { delta.remove('obj.foo') },
			{}
		], [
			{ foo: 'bar' },
			() => { delta.modify('obj').remove('foo') },
			{}
		], [
			{ key: 'val', foo: 'bar' },
			() => { delta.remove('obj.foo') },
			{ key: 'val' }
		], [
			{ key: 'val', foo: 'bar' },
			() => { delta.modify('obj').remove('foo') },
			{ key: 'val' }
		], [
			{ foo: 'bar' },
			() => { delta.remove('obj.key') },
			expectError('delta-application')
		], [
			{ foo: 'bar' },
			() => { delta.modify('obj').remove('key') },
			expectError('delta-application')
		]]);

		itCan('forbid a field from being in an object', [[
			{ foo: 'bar' },
			() => { delta.forbid('obj.key') },
			{ foo: 'bar' }
		], [
			{ foo: 'bar' },
			() => { delta.modify('obj').forbid('key') },
			{ foo: 'bar' }
		], [
			{ key: 'val', foo: 'bar' },
			() => { delta.forbid('obj.key') },
			expectError('delta-application')
		], [
			{ key: 'val', foo: 'bar' },
			() => { delta.modify('obj').forbid('key') },
			expectError('delta-application')
		]]);

		itCan('replace an existing field in an object', [[
			{ foo: 'bar' },
			() => { delta.replace('obj.foo', 'BAS') },
			{ foo: 'BAS' }
		], [
			{ foo: 'bar' },
			() => { delta.modify('obj').replace('foo', 'BAS') },
			{ foo: 'BAS' }
		], [
			{ key: 'val', foo: 'bar' },
			() => { delta.replace('obj.foo', 'BAS') },
			{ key: 'val', foo: 'BAS' }
		], [
			{ key: 'val', foo: 'bar' },
			() => { delta.modify('obj').replace('foo', 'BAS') },
			{ key: 'val', foo: 'BAS' }
		], [
			{ foo: 'bar' },
			() => { delta.replace('obj.key', 'BAS') },
			expectError('delta-application')
		], [
			{ foo: 'bar' },
			() => { delta.modify('obj').replace('key', 'BAS') },
			expectError('delta-application')
		]]);

	});

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	describe('composite object operations', () => {


		itCan('correctly modify objects when the composition is valid', [[
			{ key: 'val' },
			() => {
				delta.add('obj.foo1', 'bar1');
				delta.add('obj.foo2', 'bar2');
			},
			{ key: 'val', foo1: 'bar1', foo2: 'bar2' }
		], [
			{ key: 'val', key1: 'val1', key2: 'val2' },
			() => {
				delta.remove('obj.key1');
				delta.remove('obj.key2');
			},
			{ key: 'val' }
		], [
			{ key: 'val' },
			() => {
				delta.forbid('obj.foo1');
				delta.forbid('obj.foo2');
			},
			{ key: 'val' }
		], [
			{ key1: 'val1', key2: 'val2' },
			() => {
				delta.replace('obj.key1', 'VAL1');
				delta.replace('obj.key2', 'VAL2');
			},
			{ key1: 'VAL1', key2: 'VAL2' }
		], [
			{ key: 'val' },
			() => {
				delta.add('obj.foo', {});
				delta.modify('obj.foo').add('bar', 'bas');
			},
			{ key: 'val', foo: { bar: 'bas' } }
		], [
			{ key: 'val', foo: 'bar' },
			() => {
				delta.add('obj.foo', {});
				delta.modify('obj.foo').add('bar', 'bas');
			},
			expectError('delta-application') // 'obj.foo' is forbidden, but was present
		], [
			{ key: 'val' },
			() => {
				// a more complex / deep version of 'add' composed with 'modify'
				delta.add('obj.level1', { level2: {} });
				delta.add('obj.level1.level2.sideLevel', 'final');
				delta.modify('obj.level1.level2').add('level3', {});
				delta.modify('obj.level1').modify('level2.level3').add('level4', 'final');
			},
			{ key: 'val', level1: { level2: { sideLevel: 'final', level3: { level4: 'final' } } } }
		], [
			{ key: 'val', foo: { bar: 'bas' } },
			() => {
				delta.modify('obj.foo').add('newKey', 'newVal');
				delta.remove('obj.foo');
			},
			{ key: 'val' }
		], [
			{ key: 'val' },
			() => {
				delta.add('obj.foo', 'bar');
				delta.remove('obj.foo');
			},
			{ key: 'val' }
		], [
			{ key: 'val', foo: 'whatever' },
			() => {
				delta.add('obj.foo', 'bar');
				delta.remove('obj.foo');
			},
			expectError('delta-application') // 'obj.foo' is forbidden, but was present
		], [
			{ key: 'val', foo: 'whatever' },
			() => {
				delta.remove('obj.foo');
				delta.add('obj.foo', 'bar');
			},
			{ key: 'val', foo: 'bar' }
		], [
			{ key: 'val' },
			() => {
				delta.remove('obj.foo');
				delta.add('obj.foo', 'bar');
			},
			expectError('delta-application') // 'obj.foo' is mandatory, but was absent
		], [
			{ key: 'val', foo: 'whatever' },
			() => {
				delta.remove('obj.foo');
				delta.forbid('obj.foo');
			},
			{ key: 'val' }
		], [
			{ key: 'val' },
			() => {
				delta.remove('obj.foo');
				delta.forbid('obj.foo');
			},
			expectError('delta-application') // 'obj.foo' is mandatory, but was absent
		], [
			{ key: 'val' },
			() => {
				delta.forbid('obj.foo');
				delta.add('obj.foo', 'bar');
			},
			{ key: 'val', foo: 'bar' }
		], [
			{ key: 'val', foo: 'bar' },
			() => {
				delta.forbid('obj.foo');
				delta.add('obj.foo', 'bar');
			},
			expectError('delta-application') // 'obj.foo' is forbidden, but was present
		], [
			{ key: 'val' },
			() => {
				delta.forbid('obj.foo');
				delta.forbid('obj.foo');
			},
			{ key: 'val' }
		], [
			{ key: 'val', foo: 'bar' },
			() => {
				delta.forbid('obj.foo');
				delta.forbid('obj.foo');
			},
			expectError('delta-application') // 'obj.foo' is forbidden (twice), but was present
		], [
			{ key: 'val', foo: { bar: 'bas' } },
			() => {
				delta.modify('obj.foo');
				delta.replace('obj.foo', 'newValue');
			},
			{ key: 'val', foo: 'newValue' }
		], [
			{ key: 'val' },
			() => {
				delta.modify('obj.foo');
				delta.replace('obj.foo', 'newValue');
			},
			expectError('delta-application') // 'obj.foo' is mandatory, but was absent
		], [
			{ key: 'val' },
			() => {
				delta.add('obj.foo', 'oldValue');
				delta.replace('obj.foo', 'newValue');
			},
			{ key: 'val', foo: 'newValue' }
		], [
			{ key: 'val', foo: { bar: 'bas' } },
			() => {
				delta.add('obj.foo', 'oldValue');
				delta.replace('obj.foo', 'newValue');
			},
			expectError('delta-application') // 'obj.foo' is forbidden, but was present
		], [
			{ key: 'val', foo: 'bar' },
			() => {
				delta.replace('obj.foo', {});
				delta.modify('obj.foo').add('bar', 'bas');
			},
			{ key: 'val', foo: { bar: 'bas' } }
		], [
			{ key: 'val' },
			() => {
				delta.replace('obj.foo', {});
				delta.modify('obj.foo').add('bar', 'bas');
			},
			expectError('delta-application') // 'obj.foo' is mandatory, but was absent
		], [
			{ key: 'val', level1: 'oldValue' },
			() => {
				// a more complex / deep version of 'replace' composed with 'modify'
				delta.replace('obj.level1', { level2: {} });
				delta.add('obj.level1.level2.sideLevel', 'final');
				delta.modify('obj.level1.level2').add('level3', {});
				delta.modify('obj.level1').modify('level2.level3').add('level4', 'final');
			},
			{ key: 'val', level1: { level2: { sideLevel: 'final', level3: { level4: 'final' } } } }
		], [
			{ key: 'val', foo: { bar: 'bas' } },
			() => {
				delta.replace('obj.foo', 'newValue');
				delta.remove('obj.foo');
			},
			{ key: 'val' }
		], [
			{ key: 'val' },
			() => {
				delta.replace('obj.foo', 'newValue');
				delta.remove('obj.foo');
			},
			expectError('delta-application') // 'obj.foo' is mandatory, but was absent
		], [
			{ key: 'val', foo: { bar: 'bas' } },
			() => {
				delta.replace('obj.foo', 'oldValue');
				delta.replace('obj.foo', 'newValue');
			},
			{ key: 'val', foo: 'newValue' }
		], [
			{ key: 'val' },
			() => {
				delta.replace('obj.foo', 'oldValue');
				delta.replace('obj.foo', 'newValue');
			},
			expectError('delta-application') // 'obj.foo' is mandatory, but was absent
		]]);


		itCan('throw an error when the composition is detectably invalid', [
			() => {
				delta.modify('obj.foo');
				delta.add('obj.foo', 'bar');
			}, () => {
				delta.add('obj.foo', 'bar1');
				delta.add('obj.foo', 'bar2');
			}, () => {
				delta.remove('obj.foo');
				delta.modify('obj.foo');
			}, () => {
				delta.remove('obj.foo');
				delta.remove('obj.foo');
			}, () => {
				delta.modify('obj.foo');
				delta.forbid('obj.foo');
			}, () => {
				delta.add('obj.foo', 'bar');
				delta.forbid('obj.foo');
			}, () => {
				delta.forbid('obj.foo');
				delta.modify('obj.foo');
			}, () => {
				delta.forbid('obj.foo');
				delta.remove('obj.foo');
			}, () => {
				delta.remove('obj.foo');
				delta.replace('obj.foo', 'bar');
			}, () => {
				delta.forbid('obj.foo');
				delta.replace('obj.foo', 'bar');
			}, () => {
				delta.replace('obj.foo', 'bar1');
				delta.add('obj.foo', 'bar2');
			}, () => {
				delta.replace('obj.foo', 'bar');
				delta.forbid('obj.foo');
			}
		].map((action) => [null, action, expectError('delta-composition')]));


	});

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	describe('array operations', () => {


		itCan('prepend a new value to an array', [[
			{ arr: [] },
			() => { delta.prepend('obj.arr', 'val') },
			{ arr: ['val'] }
		], [
			{ arr: ['init'] },
			() => { delta.prepend('obj.arr', 'val') },
			{ arr: ['val', 'init'] }
		], [
			{ arr: ['init1', 'init2'] },
			() => { delta.prepend('obj.arr', 'val') },
			{ arr: ['val', 'init1', 'init2'] }
		], [
			{ arr: 'not an array or a function' },
			() => { delta.prepend('obj.arr', 'val') },
			expectError('delta-application')
		], [
			{ key: 'val' },
			() => { delta.prepend('obj.arr', 'val') },
			expectError('delta-application')
		]]);


		itCan('insert a new value into an array', [[
			{ arr: [] },
			() => { delta.insert('obj.arr', 'val') },
			{ arr: ['val'] }
		], [
			{ arr: ['init'] },
			() => { delta.insert('obj.arr', 'val') },
			(obj) => {
				expect(obj).toEqualOneOf(
					{ arr: ['val', 'init'] },
					{ arr: ['init', 'val'] }
				);
			}
		], [
			{ arr: ['init1', 'init2'] },
			() => { delta.insert('obj.arr', 'val') },
			(obj) => {
				expect(obj).toEqualOneOf(
					{ arr: ['val', 'init1', 'init2'] },
					{ arr: ['init1', 'val', 'init2'] },
					{ arr: ['init1', 'init2', 'val'] }
				);
			}
		], [
			{ arr: 'not an array or a function' },
			() => { delta.insert('obj.arr', 'val') },
			expectError('delta-application')
		], [
			{ key: 'val' },
			() => { delta.insert('obj.arr', 'val') },
			expectError('delta-application')
		]]);


		itCan('append a new value to an array', [[
			{ arr: [] },
			() => { delta.append('obj.arr', 'val') },
			{ arr: ['val'] }
		], [
			{ arr: ['init'] },
			() => { delta.append('obj.arr', 'val') },
			{ arr: ['init', 'val'] }
		], [
			{ arr: ['init1', 'init2'] },
			() => { delta.append('obj.arr', 'val') },
			{ arr: ['init1', 'init2', 'val'] }
		], [
			{ arr: 'not an array or a function' },
			() => { delta.append('obj.arr', 'val') },
			expectError('delta-application')
		], [
			{ key: 'val' },
			() => { delta.append('obj.arr', 'val') },
			expectError('delta-application')
		]]);


	});

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	describe('composite array operations', () => {


		itCan("combine multiple array operations", [[
			{ arr: ['init'] },
			() => {
				delta.prepend('obj.arr', 1);
				delta.prepend('obj.arr', 2);
			},
			{ arr: [2, 1, 'init'] }
		], [
			{ arr: ['init'] },
			() => {
				delta.prepend('obj.arr', 1);
				delta.insert ('obj.arr', 2);
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
				delta.prepend('obj.arr', 1);
				delta.append ('obj.arr', 2);
			},
			{ arr: [1, 'init', 2] }
		], [
			{ arr: ['init'] },
			() => {
				delta.insert ('obj.arr', 1);
				delta.prepend('obj.arr', 2);
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
				delta.insert('obj.arr', 1);
				delta.insert('obj.arr', 2);
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
				delta.insert('obj.arr', 1);
				delta.append('obj.arr', 2);
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
				delta.append ('obj.arr', 1);
				delta.prepend('obj.arr', 2);
			},
			{ arr: [2, 'init', 1] }
		], [
			{ arr: ['init'] },
			() => {
				delta.append('obj.arr', 1);
				delta.insert('obj.arr', 2);
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
				delta.append('obj.arr', 1);
				delta.append('obj.arr', 2);
			},
			{ arr: ['init', 1, 2] }
		]]);


		itCan("combine array operations with other types of operations or throw an error if invalid", [[
			{ key: 'val' },
			() => {
				delta.add   ('obj.arr', ['init']);
				delta.append('obj.arr', 'val');
			},
			{ key: 'val', arr: ['init', 'val'] }
		], [
			{ key: 'val' },
			() => {
				delta.add   ('obj.arr', 'not an array');
				delta.append('obj.arr', 'val');
			},
			expectError('delta-composition') // 'obj.arr', left by the 'add' operation, has to be an array
		], [
			{ key: 'val', arr: 'whatever' },
			() => {
				delta.add   ('obj.arr', ['init']);
				delta.append('obj.arr', 'val');
			},
			expectError('delta-application') // 'obj.arr' is forbidden, but was present
		], [
			{ key: 'val', arr: 'whatever' },
			() => {
				delta.replace('obj.arr', ['init']);
				delta.append ('obj.arr', 'val');
			},
			{ key: 'val', arr: ['init', 'val'] }
		], [
			{ key: 'val', arr: 'whatever' },
			() => {
				delta.replace('obj.arr', 'not an array');
				delta.append ('obj.arr', 'val');
			},
			expectError('delta-composition') // 'obj.arr', left by the 'replace' operation, has to be an array
		], [
			{ key: 'val' },
			() => {
				delta.replace('obj.arr', ['init']);
				delta.append ('obj.arr', 'val');
			},
			expectError('delta-application') // 'obj.arr' is mandatory, but was absent
		], [
			{ key: 'val', arr: ['init'] },
			() => {
				delta.append('obj.arr', 'val');
				delta.remove('obj.arr');
			},
			{ key: 'val' }
		], [
			{ key: 'val' },
			() => {
				delta.append('obj.arr', 'val');
				delta.remove('obj.arr');
			},
			expectError('delta-application') // 'obj.arr' is mandatory, but was absent
		], [
			{ key: 'val', arr: ['init'] },
			() => {
				delta.append ('obj.arr', 'val');
				delta.replace('obj.arr', 'whatever');
			},
			{ key: 'val', arr: 'whatever' }
		], [
			{ key: 'val' },
			() => {
				delta.append ('obj.arr', 'val');
				delta.replace('obj.arr', 'whatever');
			},
			expectError('delta-application') // 'obj.arr' is mandatory, but was absent
		]]);


	});

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	describe('function operations', () => {


		/* setup */
		var callLog;
		function fA(...args) { callLog.push(['fA', args]) }
		function fB(...args) { callLog.push(['fB', args]) }
		function fC(...args) { callLog.push(['fC', args]) }
		beforeEach(() => { callLog = [] });


		itCan('prepend new statements to run inside an existing function', [[
			{ fn(a, b, c) { fA(this, a, c) } },
			() => { delta.prepend('obj.fn', function (a, b) { fB(this, b, b) }) },
			(obj) => {
				obj.fn(1, 2, 3);
				expect(callLog).toEqual([ ['fB', [obj, 2, 2]], ['fA', [obj, 1, 3]] ]);
			}
		], [
			{ fn: 'not a function or an array' },
			() => { delta.prepend('obj.fn', function () {}) },
			expectError('delta-application')
		], [
			{ key: 'val' },
			() => { delta.prepend('obj.fn', function () {}) },
			expectError('delta-application')
		]]);


		itCan('insert new statements to run inside an existing function', [[
			{ fn(a, b, c) { fA(this, a, c) } },
			() => { delta.insert('obj.fn', function (a, b) { fB(this, b, b) }) },
			(obj) => {
				obj.fn(1, 2, 3);
				expect(callLog).toEqualOneOf(
					[ ['fB', [obj, 2, 2]], ['fA', [obj, 1, 3]] ],
					[ ['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]] ]
				);
			}
		], [
			{ fn: 'not a function or an array' },
			() => { delta.insert('obj.fn', function () {}) },
			expectError('delta-application')
		], [
			{ key: 'val' },
			() => { delta.insert('obj.fn', function () {}) },
			expectError('delta-application')
		]]);


		itCan('append new statements to run inside an existing function', [[
			{ fn(a, b, c) { fA(this, a, c) } },
			() => { delta.append('obj.fn', function (a, b) { fB(this, b, b) }) },
			(obj) => {
				obj.fn(1, 2, 3);
				expect(callLog).toEqual([ ['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]] ]);
			}
		], [
			{ fn: 'not a function or an array' },
			() => { delta.append('obj.fn', function () {}) },
			expectError('delta-application')
		], [
			{ key: 'val' },
			() => { delta.append('obj.fn', function () {}) },
			expectError('delta-application')
		]]);


	});

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	describe('composite function operations', () => {


		/* setup */
		var callLog;
		function fA(...args) { callLog.push(['fA', args]) }
		function fB(...args) { callLog.push(['fB', args]) }
		function fC(...args) { callLog.push(['fC', args]) }
		beforeEach(() => { callLog = [] });


		itCan("combine multiple function operations", [[
			{ fn(a, b, c) { fA(this, a, c) } },
			() => {
				delta.prepend('obj.fn', function (a, b) { fB(this, b, b) });
				delta.prepend('obj.fn', function (a, b) { fC(this, b, a) });
			},
			(obj) => {
				obj.fn(1, 2, 3);
				expect(callLog).toEqual([ ['fC', [obj, 2, 1]], ['fB', [obj, 2, 2]], ['fA', [obj, 1, 3]] ]);
			}
		], [
			{ fn(a, b, c) { fA(this, a, c) } },
			() => {
				delta.prepend('obj.fn', function (a, b) { fB(this, b, b) });
				delta.insert ('obj.fn', function (a, b) { fC(this, b, a) });
			},
			(obj) => {
				obj.fn(1, 2, 3);
				expect(callLog).toEqualOneOf(
					[ ['fC', [obj, 2, 1]], ['fB', [obj, 2, 2]], ['fA', [obj, 1, 3]] ],
					[ ['fB', [obj, 2, 2]], ['fC', [obj, 2, 1]], ['fA', [obj, 1, 3]] ],
					[ ['fB', [obj, 2, 2]], ['fA', [obj, 1, 3]], ['fC', [obj, 2, 1]] ]
				);
			}
		], [
			{ fn(a, b, c) { fA(this, a, c) } },
			() => {
				delta.prepend('obj.fn', function (a, b) { fB(this, b, b) });
				delta.append ('obj.fn', function (a, b) { fC(this, b, a) });
			},
			(obj) => {
				obj.fn(1, 2, 3);
				expect(callLog).toEqual([ ['fB', [obj, 2, 2]], ['fA', [obj, 1, 3]], ['fC', [obj, 2, 1]] ]);
			}
		], [
			{ fn(a, b, c) { fA(this, a, c) } },
			() => {
				delta.insert ('obj.fn', function (a, b) { fB(this, b, b) });
				delta.prepend('obj.fn', function (a, b) { fC(this, b, a) });
			},
			(obj) => {
				obj.fn(1, 2, 3);
				expect(callLog).toEqualOneOf(
					[ ['fC', [obj, 2, 1]], ['fB', [obj, 2, 2]], ['fA', [obj, 1, 3]] ],
					[ ['fC', [obj, 2, 1]], ['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]] ]
				);
			}
		], [
			{ fn(a, b, c) { fA(this, a, c) } },
			() => {
				delta.insert('obj.fn', function (a, b) { fB(this, b, b) });
				delta.insert('obj.fn', function (a, b) { fC(this, b, a) });
			},
			(obj) => {
				obj.fn(1, 2, 3);
				expect(callLog).toEqualOneOf(
					[ ['fC', [obj, 2, 1]], ['fB', [obj, 2, 2]], ['fA', [obj, 1, 3]] ],
					[ ['fB', [obj, 2, 2]], ['fC', [obj, 2, 1]], ['fA', [obj, 1, 3]] ],
					[ ['fB', [obj, 2, 2]], ['fA', [obj, 1, 3]], ['fC', [obj, 2, 1]] ],
					[ ['fC', [obj, 2, 1]], ['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]] ],
					[ ['fA', [obj, 1, 3]], ['fC', [obj, 2, 1]], ['fB', [obj, 2, 2]] ],
					[ ['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]], ['fC', [obj, 2, 1]] ]
				);
			}
		], [
			{ fn(a, b, c) { fA(this, a, c) } },
			() => {
				delta.insert('obj.fn', function (a, b) { fB(this, b, b) });
				delta.append('obj.fn', function (a, b) { fC(this, b, a) });
			},
			(obj) => {
				obj.fn(1, 2, 3);
				expect(callLog).toEqualOneOf(
					[ ['fB', [obj, 2, 2]], ['fA', [obj, 1, 3]], ['fC', [obj, 2, 1]] ],
					[ ['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]], ['fC', [obj, 2, 1]] ]
				);
			}
		], [
			{ fn(a, b, c) { fA(this, a, c) } },
			() => {
				delta.append ('obj.fn', function (a, b) { fB(this, b, b) });
				delta.prepend('obj.fn', function (a, b) { fC(this, b, a) });
			},
			(obj) => {
				obj.fn(1, 2, 3);
				expect(callLog).toEqual([ ['fC', [obj, 2, 1]], ['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]] ]);
			}
		], [
			{ fn(a, b, c) { fA(this, a, c) } },
			() => {
				delta.append('obj.fn', function (a, b) { fB(this, b, b) });
				delta.insert('obj.fn', function (a, b) { fC(this, b, a) });
			},
			(obj) => {
				obj.fn(1, 2, 3);
				expect(callLog).toEqualOneOf(
					[ ['fC', [obj, 2, 1]], ['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]] ],
					[ ['fA', [obj, 1, 3]], ['fC', [obj, 2, 1]], ['fB', [obj, 2, 2]] ],
					[ ['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]], ['fC', [obj, 2, 1]] ]
				);
			}
		], [
			{ fn(a, b, c) { fA(this, a, c) } },
			() => {
				delta.append('obj.fn', function (a, b) { fB(this, b, b) });
				delta.append('obj.fn', function (a, b) { fC(this, b, a) });
			},
			(obj) => {
				obj.fn(1, 2, 3);
				expect(callLog).toEqual([ ['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]], ['fC', [obj, 2, 1]] ]);
			}
		]]);


		itCan("combine function operations with other types of operations or throw an error if invalid", [[
			{ key: 'val' },
			() => {
				delta.add   ('obj.fn', function (a, b, c) { fA(this, a, c) });
				delta.append('obj.fn', function (a, b)    { fB(this, b, b) });
			},
			(obj) => {
				obj.fn(1, 2, 3);
				expect(obj.key).toBe('val');
				expect(callLog).toEqual([ ['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]] ]);
			}
		], [
			{ key: 'val' },
			() => {
				delta.add   ('obj.fn', 'not a function or an array');
				delta.append('obj.fn', function (a, b) { fB(this, b, b) });
			},
			expectError('delta-composition') // 'obj.fn', left by the 'add' operation, has to be an array
		], [
			{ key: 'val', fn(a, b, c) { fA(this, a, c) } },
			() => {
				delta.add   ('obj.fn', function (a, b, c) { fA(this, a, c) });
				delta.append('obj.fn', function (a, b) { fB(this, b, b) });
			},
			expectError('delta-application') // 'obj.fn' is forbidden, but was present
		], [
			{ key: 'val', fn(a, b, c) { fA(this, a, c) } },
			() => {
				delta.replace('obj.fn', function (a, b) { fB(this, b, b) });
				delta.append ('obj.fn', function (a, b) { fC(this, b, a) });
			},
			(obj) => {
				obj.fn(1, 2, 3);
				expect(obj.key).toBe('val');
				expect(callLog).toEqual([ ['fB', [obj, 2, 2]], ['fC', [obj, 2, 1]] ]);
			}
		], [
			{ key: 'val', fn(a, b, c) { fA(this, a, c) } },
			() => {
				delta.replace('obj.fn', 'not a function or an array');
				delta.append ('obj.fn', function (a, b) { fB(this, b, b) });
			},
			expectError('delta-composition') // 'obj.fn', left by the 'replace' operation, has to be an array
		], [
			{ key: 'val' },
			() => {
				delta.replace('obj.fn', function (a, b, c) { fA(this, a, c) });
				delta.append ('obj.fn', function (a, b) { fB(this, b, b) });
			},
			expectError('delta-application') // 'obj.fn' is mandatory, but was absent
		], [
			{ key: 'val', fn(a, b, c) { fA(this, a, c) } },
			() => {
				delta.append('obj.fn', function (a, b) { fB(this, b, b) });
				delta.remove('obj.fn');
			},
			{ key: 'val' }
		], [
			{ key: 'val' },
			() => {
				delta.append('obj.fn', function (a, b) { fB(this, b, b) });
				delta.remove('obj.fn');
			},
			expectError('delta-application') // 'obj.fn' is mandatory, but was absent
		], [
			{ key: 'val', fn(a, b, c) { fA(this, a, c) } },
			() => {
				delta.append ('obj.fn', function (a, b) { fB(this, b, b) });
				delta.replace('obj.fn', 'whatever');
			},
			{ key: 'val', fn: 'whatever' }
		], [
			{ key: 'val' },
			() => {
				delta.append ('obj.fn', function (a, b) { fB(this, b, b) });
				delta.replace('obj.fn', 'whatever');
			},
			expectError('delta-application') // 'obj.fn' is mandatory, but was absent
		]]);


	});

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	describe('the delta model operation', () => {


		itCan('be a middle-man for a single other delta', [[
			{},
			() => {
				var dm = delta.deltaModel('obj');
				dm('X').add('key', { foo: 'bar' });
			},
			{ key: { foo: 'bar' } }
		], [
			{ key: { foo: 'bar' } },
			() => {
				var dm = delta.deltaModel('obj');
				dm('X').remove('key');
			},
			{}
		], [
			{},
			() => {
				var dm = delta.deltaModel('obj');
				dm('X').forbid('key');
			},
			{}
		], [
			{ key: { foo: 'bar' } },
			() => {
				var dm = delta.deltaModel('obj');
				dm('X').replace('key', 'value');
			},
			{ key: 'value' }
		], [
			{ key: { foo: 'bar' } },
			() => {
				var dm = delta.deltaModel('obj');
				dm('X').modify('key').replace('foo', 'bas');
			},
			{ key: { foo: 'bas' } }
		], [
			{ key: ['a'] },
			() => {
				var dm = delta.deltaModel('obj');
				dm('X').prepend('key', 'b');
			},
			{ key: ['b', 'a'] }
		], [
			{ key: ['a'] },
			() => {
				var dm = delta.deltaModel('obj');
				dm('X').insert('key', 'b');
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
				var dm = delta.deltaModel('obj');
				dm('X').append('key', 'b');
			},
			{ key: ['a', 'b'] }
		]]);


		describe('with a function operation delta inside', () => {

			/* setup */
			var callLog;
			function fA(...args) { callLog.push(['fA', args]) }
			function fB(...args) { callLog.push(['fB', args]) }
			beforeEach(() => { callLog = [] });

			itCan('be a middle man for that one delta', [[
				{ fn(a, b, c) { fA(this, a, c) } },
				() => {
					var dm = delta.deltaModel('obj');
					dm('X').prepend('fn', function (a, b) { fB(this, b, b) });
				},
				(obj) => {
					obj.fn(1, 2, 3);
					expect(callLog).toEqual([ ['fB', [obj, 2, 2]], ['fA', [obj, 1, 3]] ]);
				}
			], [
				{ fn(a, b, c) { fA(this, a, c) } },
				() => {
					var dm = delta.deltaModel('obj');
					dm('X').insert('fn', function (a, b) { fB(this, b, b) });
				},
				(obj) => {
					obj.fn(1, 2, 3);
					expect(callLog).toEqualOneOf(
						[ ['fB', [obj, 2, 2]], ['fA', [obj, 1, 3]] ],
						[ ['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]] ]
					);
				}
			], [
				{ fn(a, b, c) { fA(this, a, c) } },
				() => {
					var dm = delta.deltaModel('obj');
					dm('X').append('fn', function (a, b) { fB(this, b, b) });
				},
				(obj) => {
					obj.fn(1, 2, 3);
					expect(callLog).toEqual([ ['fA', [obj, 1, 3]], ['fB', [obj, 2, 2]] ]);
				}
			]]);

		});


		itCan('apply deltas in a linear order (as if composed)', [[
			{},
			() => {
				var dm = delta.deltaModel('obj');
				dm('X').add('key', { foo: 'bar' });
				dm('Y').remove({
					path: 'key',
					after: ['X']
				});
			},
			{}
		], [
			{},
			() => {
				var dm = delta.deltaModel('obj');
				dm('X').add('key', { foo: 'bar' });
				dm('Y').replace({
					path: 'key',
					after: ['X']
				}, 'some value');
			},
			{ key: 'some value' }
		], [
			{},
			() => {
				var dm = delta.deltaModel('obj');
				dm('X').add('key1', { foo: 'bar' });
				dm('Y').add({
					path: 'key2',
					after: ['X']
				}, 'some value');
				dm('Z').add({
					path: 'key3',
					after: ['Y']
				}, 'some other value');
				dm('rY').remove({
					path: 'key2',
					after: ['Z']
				});
			},
			{ key1: { foo: 'bar' }, key3: 'some other value' }
		]]);


		itCan('apply unordered deltas in arbitrary order, if they do not conflict', [[
			{ oldKey: 'old value' },
			() => {
				var dm = delta.deltaModel('obj');
				dm('X').add('key1', 1);
				dm('Y').add('key2', 'b');
				dm('Z').add('key3', 'iii');
				dm('r').remove('oldKey');
			},
			{ key1: 1, key2: 'b', key3: 'iii' }
		]]);


		// TODO: partial orders

		// TODO: conflicts


	});

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

});
