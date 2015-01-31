/* import internal stuff */
import U                                        from '../misc.js';
import {WritableTarget, ReadableTarget, rt, wt} from '../Target.js';
import {DeltaArgApplicationError}               from '../Error.js';
import defineBasicOperations                    from './basicOperations.js';


export default (deltaJs) => {
	if (U.isDefined(deltaJs.Delta.PutIntoArray)) { return }

	defineBasicOperations(deltaJs);

	/* convenience definitions for the application and composition functions below */
	function t(type1, type2) { return (d1, d2) => (d1.type === type1 && d2.type === type2) }
	function d(type, fn) {
		if (typeof fn === 'string') { fn = ((v) => (o) => o[v])(fn) }
		return (d1, d2) => new deltaJs.Delta[type](fn && fn({d1, d2, p1: d1.arg, p2: d2.arg}));
	}

	/* declaring the array operation type ***********************************************/
	deltaJs.newOperationType('PutIntoArray', {
		construct() {
			this.values = this.options.method ? [{ method: this.options.method, value: this.arg }] : [];
		},
		clone() {
			var result = deltaJs.Delta.prototype.clone.call(this, this.arg, this.options); // super()
			result.values = [];
			this.values.forEach((v) => { result.values.push(v) });
			return result;
		},
		precondition(target) { return U.isDefined(target.value) && Array.isArray(target.value) },
		applyTo(target) {
			var arr = target.value;
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

	/* composition - introducing 'PutIntoArray' **************************************************/
	deltaJs.newComposition( t('Add'    , 'PutIntoArray'    ), (d1, d2) => d1.afterApplying(d2) );
	deltaJs.newComposition( t('Replace', 'PutIntoArray'    ), (d1, d2) => d1.afterApplying(d2) );
	deltaJs.newComposition( t('PutIntoArray'    , 'Remove' ), d('Remove')                      );
	deltaJs.newComposition( t('PutIntoArray'    , 'Replace'), d('Replace', ({p2}) => p2)       );
	deltaJs.newComposition( t('PutIntoArray'    , 'PutIntoArray'    ), (d1, d2) => {
		var result = new deltaJs.Delta.PutIntoArray();
		result.values = (d1.values).concat(d2.values);
		return result;
	});

};
