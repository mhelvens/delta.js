/* import internal stuff */
import define_OperationTypes  from './operationTypes.es6.js';
import define_Modify          from './Modify.es6.js';
import define_BasicOperations from './basicOperations.es6.js';
import define_Proxy           from './Proxy.es6.js';
import {WritableTarget}       from './Target.es6.js';
import {isUndefined, isDefined, t,
        define_d, oncePer, arraysEqual} from './util.es6.js';


export default oncePer('PutIntoFunction', (deltaJs) => {


	define_OperationTypes (deltaJs);
	define_Modify         (deltaJs);
	define_BasicOperations(deltaJs);
	define_Proxy          (deltaJs);


	/* a symbol under which function parts can be stored in public functions */
	let functionPartsSymbol = Symbol('DeltaJs:function-parts');


	/* declaring the function operation type */
	/**
	 * @class DeltaJs#Delta.PutIntoFunction
	 * @extends DeltaJs#Delta
	 */
	deltaJs.newOperationType('PutIntoFunction', class PutIntoFunction extends deltaJs.Delta {

		constructor(...args) {
			super(...args);
			this.values = this.arg ? (Array.isArray(this.arg) ? this.arg : [this.arg]) : [];
		}

		clone() {
			var result = super.clone();
			result.values = [...this.values];
			return result;
		}

		precondition(target) {
			return isDefined(target.value) && typeof target.value === 'function' &&
				(isDefined(target.value[functionPartsSymbol]) || target instanceof WritableTarget);
		}

		applyTo(target) {
			if (isUndefined(target.value[functionPartsSymbol])) {
				var originalFn = target.value;
				var newFn = function (...args) {
					let result;
					for (let fn of newFn[functionPartsSymbol]) {
						result = fn.apply(this, args);
					}
					return result;
				};
				newFn[functionPartsSymbol] = [function (...args) { originalFn.apply(this, args) }];
				target.value = newFn;
			}
			var arr = target.value[functionPartsSymbol];
			for (let {method, value} of this.values) {
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
			}
		}

		get methods() { return [] }

	});


	/* Proxy methods ****************************************************************************/
	// TODO: docs
	deltaJs.newProxyMethod('prepend', (value) => new deltaJs.Delta.PutIntoFunction({ method: 'prepend', value }));
	deltaJs.newProxyMethod('insert',  (value) => new deltaJs.Delta.PutIntoFunction({ method: 'insert',  value }));
	deltaJs.newProxyMethod('append',  (value) => new deltaJs.Delta.PutIntoFunction({ method: 'append',  value }));


	/* composition - introducing 'PutIntoFunction' **************************************************/
	var d = define_d(deltaJs);
	deltaJs.newComposition( t('Modify'         , 'PutIntoFunction'), false                                        );
	deltaJs.newComposition( t('Add'            , 'PutIntoFunction'), d('Add',     ({d2, p1}) => d2.appliedTo(p1)) );
	deltaJs.newComposition( t('Remove'         , 'PutIntoFunction'), false                                        );
	deltaJs.newComposition( t('Forbid'         , 'PutIntoFunction'), false                                        );
	deltaJs.newComposition( t('Replace'        , 'PutIntoFunction'), d('Replace', ({d2, p1}) => d2.appliedTo(p1)) );
	deltaJs.newComposition( t('Update'         , 'PutIntoFunction'), true                                         );
	deltaJs.newComposition( t('PutIntoFunction', 'Modify'         ), false                                        );
	deltaJs.newComposition( t('PutIntoFunction', 'Add'            ), false                                        );
	deltaJs.newComposition( t('PutIntoFunction', 'Remove'         ), d('Remove')                                  );
	deltaJs.newComposition( t('PutIntoFunction', 'Forbid'         ), false                                        );
	deltaJs.newComposition( t('PutIntoFunction', 'Replace'        ), d('Replace', ({p2}) => p2)                   );
	deltaJs.newComposition( t('PutIntoFunction', 'Update'         ), true                                         );
	deltaJs.newComposition( t('PutIntoFunction', 'PutIntoFunction'), (d1, d2) =>
		new deltaJs.Delta.PutIntoFunction([...d1.values, ...d2.values]));

	// TODO: Change 'append' and 'prepend' to follow any underlying partial order (delta model)


	/* equality */
	// TODO: refinement function instead of equals function (look at PutIntoArray.es6.js)
	deltaJs.newEquality( t('PutIntoFunction', 'PutIntoFunction'), (d1, d2) =>
		arraysEqual(d1.values, d2.values, (a, b) => a.method === b.method && a.value && b.value) );


	/* weak commutation - allow two PutIntoFunction deltas to always commute in a weak context*/
	deltaJs.newCommutation( t('PutIntoFunction', 'PutIntoFunction'), (d1, d2) => true, { weak: true });


});
