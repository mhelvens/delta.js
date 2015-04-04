/* import internal stuff */
import {isDefined, t, define_d, oncePer, arraysEqual, arraysHaveSameElements, customIndexOf} from './util.es6.js';
import define_Modify                                  from './Modify.es6.js';
import define_basicOperations                         from './basicOperations.es6.js';
import define_Proxy                                   from './Proxy.es6.js';


export default oncePer('PutIntoArray', (deltaJs) => {


	define_Modify         (deltaJs);
	define_basicOperations(deltaJs);
	define_Proxy          (deltaJs);


	/* declaring the array operation type ***********************************************/
	deltaJs.newOperationType('PutIntoArray', class PutIntoArray extends deltaJs.Delta {

		constructor(...args) {
			super(...args);
			this.values = this.arg ? (Array.isArray(this.arg) ? this.arg : [this.arg]) : [];
		}

		clone() {
			var result = super.clone();
			result.values = [...this.values];
			return result;
		}

		refines(other) {
			/* define operation equality */
			var eq = (x, y) => x.method === y.method && x.value === y.value;

			/* both need to at least have the same operations (not necessarily in the same order) */
			if (!arraysHaveSameElements(this.values, other.values, eq)) { return false }

			/* appensions and prepensions need to be in the same order */
			if (!arraysEqual(
				this .values.filter(v => v.method === 'append'),
				other.values.filter(v => v.method === 'append'), eq
			)) { return false }
			if (!arraysEqual(
				this .values.filter(v => v.method === 'prepend'),
				other.values.filter(v => v.method === 'prepend'), eq
			)) { return false }

			/* insertions in 'this' cannot come later than their counterparts in 'other', */
			/* in the sense of appensions and prepensions that have come before it        */
			var appensionsAndPrepensionsSeen = [];
			for (let i = 0; i < this.values.length; ++i) {
				if (this.values[i].method === 'insert') {
					var ind = customIndexOf(other.values, this.values[i], eq);
					var appensionsAndPrepensionsToGo = [...appensionsAndPrepensionsSeen];
					for (let j = 0; j <= ind; ++j) {
						var indd = customIndexOf(appensionsAndPrepensionsToGo, other.values[j], eq);
						if (indd > -1) {
							appensionsAndPrepensionsToGo.splice(indd, 1);
						}
					}
					if (appensionsAndPrepensionsToGo.length > 0) {
						return false;
					}
				} else {
					appensionsAndPrepensionsSeen.push(this.values[i]);
				}
			}

			/* OK, it's a refinement */
			return true;
		}

		precondition(target) { return isDefined(target.value) && Array.isArray(target.value) }

		applyTo(target) {
			var arr = target.value;
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
	deltaJs.newProxyMethod('prepend', (value) => new deltaJs.Delta.PutIntoArray({ method: 'prepend', value }));
	deltaJs.newProxyMethod('insert',  (value) => new deltaJs.Delta.PutIntoArray({ method: 'insert',  value }));
	deltaJs.newProxyMethod('append',  (value) => new deltaJs.Delta.PutIntoArray({ method: 'append',  value }));


	/* composition *******************************************************************************/
	var d = define_d(deltaJs);
	deltaJs.newComposition( t('Modify'      , 'PutIntoArray'), false                                        );
	deltaJs.newComposition( t('Add'         , 'PutIntoArray'), d('Add',     ({d2, p1}) => d2.appliedTo(p1)) );
	deltaJs.newComposition( t('Remove'      , 'PutIntoArray'), false                                        );
	deltaJs.newComposition( t('Forbid'      , 'PutIntoArray'), false                                        );
	deltaJs.newComposition( t('Replace'     , 'PutIntoArray'), d('Replace', ({d2, p1}) => d2.appliedTo(p1)) );
	deltaJs.newComposition( t('Update'      , 'PutIntoArray'), true                                         );
	deltaJs.newComposition( t('PutIntoArray', 'Modify'      ), false                                        );
	deltaJs.newComposition( t('PutIntoArray', 'Add'         ), false                                        );
	deltaJs.newComposition( t('PutIntoArray', 'Remove'      ), d('Remove')                                  );
	deltaJs.newComposition( t('PutIntoArray', 'Forbid'      ), false                                        );
	deltaJs.newComposition( t('PutIntoArray', 'Replace'     ), d('Replace', ({p2}) => p2)                   );
	deltaJs.newComposition( t('PutIntoArray', 'Update'      ), true                                         );
	deltaJs.newComposition( t('PutIntoArray', 'PutIntoArray'), (d1, d2) =>
		new deltaJs.Delta.PutIntoArray([...d1.values, ...d2.values]));

	// TODO: Change 'append' and 'prepend' to follow any underlying partial order (delta model)


});
