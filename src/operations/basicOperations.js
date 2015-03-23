/* import internal stuff */
import U                                        from '../misc.js';
import {WritableTarget, ReadableTarget, rt, wt} from '../Target.js';
import defineDelta                              from './Delta.js';
import defineModify                             from './Modify.js';


export default (deltaJs) => U.oncePer(deltaJs, 'basic operations', () => {

	defineDelta (deltaJs);
	defineModify(deltaJs);

	/* convenience definitions for the application and composition functions below ******/
	function t(type1, type2) { return (d1, d2) => (d1.type === type1 && d2.type === type2) }
	function d(type, fn) {
		if (typeof fn === 'string') { fn = ((v) => (o) => o[v])(fn) }
		return (d1, d2) => new deltaJs.Delta[type](fn && fn({d1, d2, p1: d1.arg, p2: d2.arg}));
	}

	/* declaring the basic operation types **********************************************/
	deltaJs.newOperationType('NoOp', class NoOp extends deltaJs.Delta {});
	deltaJs.newOperationType('Add', class Add extends deltaJs.Delta {
		//constructor(...args) { super(...args) }
		precondition(target) { return target instanceof WritableTarget && U.isUndefined(target.value) }
		applyTo(target) { target.value = this.arg }
	});
	deltaJs.newOperationType('Remove', class Remove extends deltaJs.Delta {
		precondition(target) { return target instanceof WritableTarget && U.isDefined(target.value) }
		applyTo(target) { target.delete() }
	});
	deltaJs.newOperationType('Forbid', class Forbid extends deltaJs.Delta {
		precondition(target) { return U.isUndefined(target.value) }
	});
	deltaJs.newOperationType('Replace', class Replace extends deltaJs.Delta {
		precondition(target) { return target instanceof WritableTarget && U.isDefined(target.value) }
		applyTo(target) { target.value = this.arg }
	});
	deltaJs.newOperationType('Update', class Update extends deltaJs.Delta {
		precondition(target) { return target instanceof WritableTarget && U.isDefined(target.value) }
		applyTo(target) { target.value = this.arg(target.value) }
	});

	/* composition - introducing 'NoOp' *************************************************/
	deltaJs.newComposition( (d1, d2) => d1 instanceof deltaJs.Delta.NoOp, (d1, d2) => d2.clone() );
	deltaJs.newComposition( (d1, d2) => d2 instanceof deltaJs.Delta.NoOp, (d1, d2) => d1.clone() );

	/* composition - introducing 'Add' **************************************************/
	deltaJs.newComposition( t('Add', 'Modify'), d('Add', ({d2, p1}) => d2.appliedTo(p1)) );

	/* composition - introducing 'Remove' ***********************************************/
	deltaJs.newComposition( t('Modify', 'Remove'), d('Remove')                );
	deltaJs.newComposition( t('Add'   , 'Remove'), d('Forbid')                );
	deltaJs.newComposition( t('Remove', 'Add'   ), d('Replace', ({p2}) => p2) );

	/* composition - introducing 'Forbid' ***********************************************/
	deltaJs.newComposition( t('Remove', 'Forbid'), d('Remove')            );
	deltaJs.newComposition( t('Forbid', 'Add'   ), d('Add', ({p2}) => p2) );
	deltaJs.newComposition( t('Forbid', 'Forbid'), d('Forbid')            );

	/* composition - introducing 'Replace' **********************************************/
	deltaJs.newComposition( t('Modify' , 'Replace'), d('Replace', ({p2}) => p2)                   );
	deltaJs.newComposition( t('Add'    , 'Replace'), d('Add',     ({p2}) => p2)                   );
	deltaJs.newComposition( t('Replace', 'Modify' ), d('Replace', ({d2, p1}) => d2.appliedTo(p1)) );
	deltaJs.newComposition( t('Replace', 'Remove' ), d('Remove')                                  );
	deltaJs.newComposition( t('Replace', 'Replace'), d('Replace', ({p2}) => p2)                   );

	/* composition - introducing 'Update' ***********************************************/
	deltaJs.newComposition( t('Add'    , 'Update' ), d('Add',     ({d2, p1}) => d2.appliedTo(p1)) );
	deltaJs.newComposition( t('Replace', 'Update' ), d('Replace', ({d2, p1}) => d2.appliedTo(p1)) );
	deltaJs.newComposition( t('Update' , 'Remove' ), d('Remove')                                  );
	deltaJs.newComposition( t('Update' , 'Replace'), d('Replace', ({p2}) => p2)                   );
	deltaJs.newComposition( t('Update' , 'Update' ), d('Update',  ({p1, p2}) => v => p2(p1(v)))   );
	// TODO: allow more kinds of compositions with Update

});
