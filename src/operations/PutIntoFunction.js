/* import internal stuff */
import U                     from '../misc.js';
import {WritableTarget}      from '../Target.js';
import defineBasicOperations from './basicOperations.js';


export default (deltaJs) => {
	if (U.isDefined(deltaJs.Delta.PutIntoFunction)) { return }

	defineBasicOperations(deltaJs);

	/* convenience definitions for the application and composition functions below */
	function t(type1, type2) { return (d1, d2) => (d1.type === type1 && d2.type === type2) }
	function d(type, fn) {
		if (typeof fn === 'string') { fn = ((v) => (o) => o[v])(fn) }
		return (d1, d2) => new deltaJs.Delta[type](fn && fn({d1, d2, p1: d1.arg, p2: d2.arg}));
	}

	/* declaring the function operation type */
	deltaJs.newOperationType('PutIntoFunction', {
		construct() {
			if (this.options.method) {
				this.values = [{
	               method: this.options.method,
	               value: this.arg
               }];
			} else {
				this.values = [];
			}
		},
		clone() {
			var result = deltaJs.Delta.prototype.clone.call(this, this.arg, this.options); // super()
			result.values = [];
			this.values.forEach((v) => { result.values.push(v) });
			return result;
		},
		precondition(target) {
			return U.isDefined(target.value) && typeof target.value === 'function' &&
			       (U.isDefined(target.value._DeltaJs_functions) || target instanceof WritableTarget);
		},
		applyTo(target) {
			if (U.isUndefined(target.value._DeltaJs_functions)) {
				var originalFn = target.value;
				var newFn = function (...args) {
					var result;
					newFn._DeltaJs_functions.forEach((fn) => {
						result = fn.apply(this, args);
					});
					//noinspection JSUnusedAssignment
					return result;
				};
				newFn._DeltaJs_functions = [function (...args) { originalFn.apply(this, args) }];
				target.value = newFn;
			}
			var arr = target.value._DeltaJs_functions;
			this.values.forEach(({method, value}) => {
				switch (method) {
				case 'prepend': {
					arr.unshift(value);
				} break;
				case 'insert': {
					// 'insert' doesn't *have* to use a random position. Any position will do.
					//  E.g., its implementation could just be the same as for 'append'.
					//  Nonetheless, we use a random position to force the tests to be permissive.
					var position = Math.floor(Math.random() * (arr.length + 1));
					arr.splice(position, 0, value);
				} break;
				case 'append': {
					arr.push(value);
				} break;
				}
			});
		},
		methods: ['prepend', 'insert', 'append']
	});

	/* composition - introducing 'PutIntoFunction' **************************************************/
	deltaJs.newComposition( t('Add'            , 'PutIntoFunction'), (d1, d2) => d1.afterApplying(d2) );
	deltaJs.newComposition( t('Replace'        , 'PutIntoFunction'), (d1, d2) => d1.afterApplying(d2) );
	deltaJs.newComposition( t('PutIntoFunction', 'Remove'         ), d('Remove')                      );
	deltaJs.newComposition( t('PutIntoFunction', 'Replace'        ), d('Replace', ({p2}) => p2)       );
	deltaJs.newComposition( t('PutIntoFunction', 'PutIntoFunction'), (d1, d2) => {
		var result = new deltaJs.Delta.PutIntoFunction();
		result.values = (d1.values).concat(d2.values);
		return result;
	});
	// TODO: Change 'append' and 'prepend' to follow any underlying partial order (delta model)

};
