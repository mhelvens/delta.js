'use strict';

describe("DeltaJs constructor", function () {


	it("is present", function () {
		expect(typeof DeltaJs).toBe('function');
	});


	it("never throws any exception", function () {
		expect(function () {
			var dm = new DeltaJs();
		}).not.toThrow();
	});


	it("returns an object of type DeltaJs", function () {
		var dm = new DeltaJs();
		expect(dm instanceof DeltaJs).toBeTruthy();
	});


});
