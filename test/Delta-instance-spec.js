'use strict';

describe("Delta instance", function () {

	//beforeEach(() => {
	//	DeltaJs.registerPromiseResolver(P.resolve);
	//});
	//
	//function defer() {
	//	var result = {};
	//	result.promise = new P((resolve, reject) => {
	//		result.resolve = resolve;
	//		result.reject = reject;
	//	});
	//	return result;
	//}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var deltaJs;
	var delta;
	beforeEach(() => {
		deltaJs = new DeltaJs();
		delta = new deltaJs.Delta('test-delta', { if: true });
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

				/* creating the delta through the given code */
				if (post instanceof ExpectedError && post.when === 'delta-composition') {
					expect(() => action()).toThrowError();
				} else {
					action();

					/* applying the delta to the given 'pre' value */
					if (post instanceof ExpectedError && post.when === 'delta-application') {
						expect(() => delta.applyToPropertiesOf(rootObj)).toThrowError();
					} else {
						expect(() => delta.applyToPropertiesOf(rootObj)).not.toThrowError();
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
			{ arr: 'not an array' },
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
			{ arr: 'not an array' },
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
			{ arr: 'not an array' },
			() => { delta.append('obj.arr', 'val') },
			expectError('delta-application')
		], [
			{ key: 'val' },
			() => { delta.append('obj.arr', 'val') },
			expectError('delta-application')
		]]);


	});


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


		itCan("combine array operations with other types of operations if the composition is valid", [[
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

	// TODO: function operations; the old tests are below

	//describe('function operations', () => {
	//
	//	var callLog;
	//	function fA(...args) { callLog.push(['fA', args]) }
	//	function fB(...args) { callLog.push(['fB', args]) }
	//	function fC(...args) { callLog.push(['fC', args]) }
	//	function fD(...args) { callLog.push(['fD', args]) }
	//	beforeEach(() => {
	//		callLog = [];
	//	});
	//
	//	itCan('append statements to an existing function',
	//		[
	//			{ fn(a, b, c) { fA(this, a, c) } },
	//			() => { delta.append('obj.fn', function (a, b) { fB(this, b, b) }) },
	//			(obj) => {
	//				obj.fn(1, 2, 3);
	//				expect(callLog[0]).toEqual(['fA', [obj, 1, 3]]);
	//				expect(callLog[1]).toEqual(['fB', [obj, 2, 2]]);
	//			}
	//		], [
	//			{ fn(a, b, c) { fA(this, a, c) } },
	//			() => { delta.modify('obj').append('fn', function (a, b) { fB(this, b, b) }) },
	//			(obj) => {
	//				obj.fn(1, 2, 3);
	//				expect(callLog[0]).toEqual(['fA', [obj, 1, 3]]);
	//				expect(callLog[1]).toEqual(['fB', [obj, 2, 2]]);
	//			}
	//		]);
	//
	//
	//	itCan('prepend statements to an existing function',
	//		[
	//			{ fn(a, b, c) { fA(this, a, c) } },
	//			() => { delta.prepend('obj.fn', function (a, b) { fB(this, b, b) }) },
	//			(obj) => {
	//				obj.fn(1, 2, 3);
	//				expect(callLog[0]).toEqual(['fB', [obj, 2, 2]]);
	//				expect(callLog[1]).toEqual(['fA', [obj, 1, 3]]);
	//			}
	//		], [
	//			{ fn(a, b, c) { fA(this, a, c) } },
	//			() => { delta.modify('obj').prepend('fn', function (a, b) { fB(this, b, b) }) },
	//			(obj) => {
	//				obj.fn(1, 2, 3);
	//				expect(callLog[0]).toEqual(['fB', [obj, 2, 2]]);
	//				expect(callLog[1]).toEqual(['fA', [obj, 1, 3]]);
	//			}
	//		]);
	//
	//
	//	itCan('insert statements into an existing function',
	//		[
	//			{ fn(a, b, c) { fA(this, a, c) } },
	//			() => { delta.insert('obj.fn', function (a, b) { fB(this, b, b) }) },
	//			(obj) => {
	//				obj.fn(1, 2, 3);
	//				expect(callLog).toContainSomethingEqualTo(['fA', [obj, 1, 3]]);
	//				expect(callLog).toContainSomethingEqualTo(['fB', [obj, 2, 2]]);
	//			}
	//		], [
	//			{ fn(a, b, c) { fA(this, a, c) } },
	//			() => { delta.modify('obj').insert('fn', function (a, b) { fB(this, b, b) }) },
	//			(obj) => {
	//				obj.fn(1, 2, 3);
	//				expect(callLog).toContainSomethingEqualTo(['fA', [obj, 1, 3]]);
	//				expect(callLog).toContainSomethingEqualTo(['fB', [obj, 2, 2]]);
	//			}
	//		]);
	//
	//
	//	itCanAsync('attach statements to an existing function, to be run asynchronously after it finishes',
	//			[
	//				{ fn(a, b, c) { fA(this, a, c) } },
	//				(done) => {
	//					delta.after('obj.fn', function (a, b) {
	//						fB(this, b, b);
	//						expect(callLog[0]).toEqual(['fA', [this, 1, 3]]);
	//						expect(callLog[1]).toEqual(['fB', [this, 2, 2]]);
	//						done();
	//					});
	//				},
	//				(obj) => {
	//					obj.fn(1, 2, 3);
	//					expect(callLog[0]).toEqual(['fA', [obj, 1, 3]]);
	//					expect(callLog[1]).not.toBeDefined();
	//				}
	//			], [
	//				{ fn(a, b, c) { fA(this, a, c) } },
	//				(done) => {
	//					delta.modify('obj').after('fn', function (a, b) {
	//						fB(this, b, b);
	//						expect(callLog[0]).toEqual(['fA', [this, 1, 3]]);
	//						expect(callLog[1]).toEqual(['fB', [this, 2, 2]]);
	//						done();
	//					});
	//				},
	//				(obj) => {
	//					obj.fn(1, 2, 3);
	//					expect(callLog[0]).toEqual(['fA', [obj, 1, 3]]);
	//					expect(callLog[1]).not.toBeDefined();
	//				}
	//			]);
	//
	//
	//	var deferred;
	//	beforeEach(() => {
	//		deferred = defer();
	//	});
	//
	//
	//	itCanAsync('attach statements to an existing function, to be run after a returned promise is resolved',
	//		[
	//			{ fn(a, b, c) { fA(this, a, c); return deferred.promise; } },
	//			() => {
	//				delta.after('obj.fn', function (a, b) {
	//					fB(this, b, b);
	//				});
	//			},
	//			(obj, done) => {
	//				obj.fn(1, 2, 3);
	//				expect(callLog[0]).toEqual(['fA', [obj, 1, 3]]);
	//				setTimeout(() => {
	//					expect(callLog[1]).not.toBeDefined();
	//					deferred.resolve('promised value');
	//					expect(callLog[1]).not.toBeDefined();
	//					setTimeout(() => {
	//						expect(callLog[1]).toEqual(['fB', [obj, 2, 2]]);
	//						done();
	//					});
	//				});
	//			}
	//		], [
	//			{ fn(a, b, c) { fA(this, a, c); return deferred.promise; } },
	//			() => {
	//				delta.modify('obj').after('fn', function (a, b) {
	//					fB(this, b, b);
	//				});
	//			},
	//			(obj, done) => {
	//				obj.fn(1, 2, 3);
	//				expect(callLog[0]).toEqual(['fA', [obj, 1, 3]]);
	//				setTimeout(() => {
	//					expect(callLog[1]).not.toBeDefined();
	//					deferred.resolve('promised value');
	//					expect(callLog[1]).not.toBeDefined();
	//					setTimeout(() => {
	//						expect(callLog[1]).toEqual(['fB', [obj, 2, 2]]);
	//						done();
	//					});
	//				});
	//			}
	//		]);
	//
	//
	//
	//
	//});


});
