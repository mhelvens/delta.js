require(['jquery', '../delta.js', './example.scss'], function ($, DeltaJs) {
	'use strict';

	var deltaJs = new DeltaJs();

	console.log(deltaJs);

	var delta = new deltaJs.operations.modify('(root)');

	delta.modify('Z#sub')
			.add('subsub.x', 'foo')
			.add('subsub.y', ['bar'])
			.add('subsub.z', ['bas']);

	console.log('' + delta);


});
