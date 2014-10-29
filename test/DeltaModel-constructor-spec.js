'use strict';

describe("DeltaModel constructor", function () {


	it("is present", function () {
		expect(typeof DeltaModel).toBe('function');
	});


	it("never throws any exception", function () {
		expect(function () {
			var dm = new DeltaModel();
		}).not.toThrow();
	});


	it("returns an object of type DeltaModel", function () {
		var dm = new DeltaModel();
		expect(dm instanceof DeltaModel).toBeTruthy();
	});


});
