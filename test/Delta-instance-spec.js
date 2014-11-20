'use strict';

describe("Delta instance", function () {


	var dm;
	var delta;
	beforeEach(() => {
		dm = new DeltaModel();
		delta = new dm.Delta('test-delta', {if: true});
	});

	function itCan(description, ...triples) {
		var counter = 0;
		triples.forEach(function ([pre, action, post]) {
			it(`can ${description} (${++counter})`, () => {
				action();
				var obj = dm.vp('obj', typeof pre === 'function' ? pre() : pre);
				if (typeof post === 'function') {
					post(obj);
				} else {
					expect(obj).toEqual(post);
				}
			});
		});
	}


	describe('object operations', () => {

		itCan('add a new field to an object',
				[
					{},
					() => delta.add('obj.foo', 'bar'),
					{foo: 'bar'}
				], [
					{},
					() => delta.modify('obj').add('foo', 'bar'),
					{foo: 'bar'}
				], [
					{key: 'val'},
					() => delta.add('obj.foo', 'bar'),
					{key: 'val', foo: 'bar'}
				], [
					{key: 'val'},
					() => delta.modify('obj').add('foo', 'bar'),
					{key: 'val', foo: 'bar'}
				]);

		itCan('remove an existing field from an object',
				[
					{foo: 'bar'},
					() => delta.remove('obj.foo'),
					{}
				], [
					{foo: 'bar'},
					() => delta.modify('obj').remove('foo'),
					{}
				], [
					{key: 'val', foo: 'bar'},
					() => delta.remove('obj.foo'),
					{key: 'val'}
				], [
					{key: 'val', foo: 'bar'},
					() => delta.modify('obj').remove('foo'),
					{key: 'val'}
				]);

		itCan('replace an existing field in an object',
				[
					{foo: 'bar'},
					() => delta.replace('obj.foo', 'BAS'),
					{foo: 'BAS'}
				], [
					{foo: 'bar'},
					() => delta.modify('obj').replace('foo', 'BAS'),
					{foo: 'BAS'}
				], [
					{key: 'val', foo: 'bar'},
					() => delta.replace('obj.foo', 'BAS'),
					{key: 'val', foo: 'BAS'}
				], [
					{key: 'val', foo: 'bar'},
					() => delta.modify('obj').replace('foo', 'BAS'),
					{key: 'val', foo: 'BAS'}
				]);

	});


	describe('function operations', () => {

		var callLog;
		function fA(...args) { callLog.push(['fA', args]) }
		function fB(...args) { callLog.push(['fB', args]) }
		function fC(...args) { callLog.push(['fC', args]) }
		function fD(...args) { callLog.push(['fD', args]) }
		beforeEach(() => {
			callLog = [];
		});

		itCan('append statements to an existing function',
				[
					{ fn(a, b, c) { fA(this, a, c) } },
					() => { delta.append('obj.fn', function (a, b) { fB(this, b, b) }) },
					(obj) => {
						obj.fn(1, 2, 3);
						expect(callLog[0]).toEqual(['fA', [obj, 1, 3]]);
						expect(callLog[1]).toEqual(['fB', [obj, 2, 2]]);
					}
				], [
					{ fn(a, b, c) { fA(this, a, c) } },
					() => { delta.modify('obj').append('fn', function (a, b) { fB(this, b, b) }) },
					(obj) => {
						obj.fn(1, 2, 3);
						expect(callLog[0]).toEqual(['fA', [obj, 1, 3]]);
						expect(callLog[1]).toEqual(['fB', [obj, 2, 2]]);
					}
				]
		);


		itCan('prepend statements to an existing function',
				[
					{ fn(a, b, c) { fA(this, a, c) } },
					() => { delta.prepend('obj.fn', function (a, b) { fB(this, b, b) }) },
					(obj) => {
						obj.fn(1, 2, 3);
						expect(callLog[0]).toEqual(['fB', [obj, 2, 2]]);
						expect(callLog[1]).toEqual(['fA', [obj, 1, 3]]);
					}
				], [
					{ fn(a, b, c) { fA(this, a, c) } },
					() => { delta.modify('obj').prepend('fn', function (a, b) { fB(this, b, b) }) },
					(obj) => {
						obj.fn(1, 2, 3);
						expect(callLog[0]).toEqual(['fB', [obj, 2, 2]]);
						expect(callLog[1]).toEqual(['fA', [obj, 1, 3]]);
					}
				]
		);


		itCan('insert statements into an existing function',
				[
					{ fn(a, b, c) { fA(this, a, c) } },
					() => { delta.insert('obj.fn', function (a, b) { fB(this, b, b) }) },
					(obj) => {
						obj.fn(1, 2, 3);
						expect(callLog).toContainSomethingEqualTo(['fA', [obj, 1, 3]]);
						expect(callLog).toContainSomethingEqualTo(['fB', [obj, 2, 2]]);
					}
				], [
					{ fn(a, b, c) { fA(this, a, c) } },
					() => { delta.modify('obj').insert('fn', function (a, b) { fB(this, b, b) }) },
					(obj) => {
						obj.fn(1, 2, 3);
						expect(callLog).toContainSomethingEqualTo(['fA', [obj, 1, 3]]);
						expect(callLog).toContainSomethingEqualTo(['fB', [obj, 2, 2]]);
					}
				]
		);

	});




});
