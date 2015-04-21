/* import internal stuff */
import {isUndefined, isDefined, t, define_d, oncePer} from './util.es6.js';
import {WritableTarget, ReadableTarget, rt, wt}       from './Target.es6.js';
import define_OperationTypes                          from './operationTypes.es6.js';
import define_Delta                                   from './Delta_class.es6.js';
import define_Modify                                  from './Modify.es6.js';


export default oncePer('basic operations', (deltaJs) => {


	define_OperationTypes(deltaJs);
	define_Delta         (deltaJs);
	define_Modify        (deltaJs);


	/* declaring the basic operation types **********************************************/
	deltaJs.newOperationType('NoOp', class NoOp extends deltaJs.Delta {});
	deltaJs.newOperationType('Add', class Add extends deltaJs.Delta {
		precondition(target, {weak}) { return target instanceof WritableTarget && (weak || isUndefined(target.value)) }
		applyTo     (target)         { target.value = this.arg                                                        }
	});
	deltaJs.newOperationType('Remove', class Remove extends deltaJs.Delta {
		precondition(target, {weak}) { return target instanceof WritableTarget && (weak || isDefined(target.value)) }
		applyTo     (target)         { target.delete()                                                              }
	});
	deltaJs.newOperationType('Forbid', class Forbid extends deltaJs.Delta {
		precondition(target, {weak}) { return weak || isUndefined(target.value) }
	});
	deltaJs.newOperationType('Replace', class Replace extends deltaJs.Delta {
		precondition(target, {weak}) { return target instanceof WritableTarget && (weak || isDefined(target.value)) }
		applyTo     (target)         { target.value = this.arg                                                      }
	});
	deltaJs.newOperationType('Update', class Update extends deltaJs.Delta {
		precondition(target, {weak}) { return target instanceof WritableTarget && (weak || isDefined(target.value)) }
		applyTo     (target)         { target.value = this.arg(target.value)                                        }
	});


	/* composition - introducing 'NoOp' *************************************************/
	deltaJs.newComposition( (d1, d2) => d1 instanceof deltaJs.Delta.NoOp, (d1, d2) => d2.clone() );
	deltaJs.newComposition( (d1, d2) => d2 instanceof deltaJs.Delta.NoOp, (d1, d2) => d1.clone() );


	/* utility function d */
	var d = define_d(deltaJs);


	/* composition - introducing 'Add' **************************************************/
	deltaJs.newComposition( t('Add'   , 'Modify'), d('Add', ({d2, p1}) => d2.appliedTo(p1)) );
	deltaJs.newComposition( t('Modify', 'Add'   ), false                                    );
	deltaJs.newComposition( (d1, d2) => (d2.type === 'Add'), d('Add', ({p2}) => p2)         , { weak: true });
	deltaJs.newComposition( t('Add'   , 'Add'   ), false                                    );


	/* composition - introducing 'Remove' ***********************************************/
	deltaJs.newComposition( t('Modify', 'Remove'), d('Remove')                );
	deltaJs.newComposition( t('Add'   , 'Remove'), d('Forbid')                );
	deltaJs.newComposition( t('Remove', 'Modify'), false                      );
	deltaJs.newComposition( t('Remove', 'Add'   ), d('Replace', ({p2}) => p2) );
	deltaJs.newComposition( (d1, d2) => (d2.type === 'Remove'), d('Remove')   , { weak: true });
	deltaJs.newComposition( t('Remove', 'Remove'), false                      );


	/* composition - introducing 'Forbid' ***********************************************/
	deltaJs.newComposition( (d1, d2) => (d1.type === 'Forbid'), (d1, d2) => d2.clone() , { weak: true }); // TODO: test
	deltaJs.newComposition( (d1, d2) => (d2.type === 'Forbid'), (d1, d2) => d1.clone() , { weak: true }); // TODO: test
	deltaJs.newComposition( t('Modify', 'Forbid')             , false                  );
	deltaJs.newComposition( t('Add'   , 'Forbid')             , false                  );
	deltaJs.newComposition( t('Remove', 'Forbid')             , d('Remove')            );
	deltaJs.newComposition( t('Forbid', 'Modify')             , false                  );
	deltaJs.newComposition( t('Forbid', 'Add'   )             , d('Add', ({p2}) => p2) );
	deltaJs.newComposition( t('Forbid', 'Remove')             , false                  );
	deltaJs.newComposition( t('Forbid', 'Forbid')             , d('Forbid')            );


	/* composition - introducing 'Replace' **********************************************/
	deltaJs.newComposition( t('Modify' , 'Replace'), d('Replace', ({p2}) => p2)                   );
	deltaJs.newComposition( t('Add'    , 'Replace'), d('Add',     ({p2}) => p2)                   );
	deltaJs.newComposition( t('Remove' , 'Replace'), false                                        );
	deltaJs.newComposition( t('Forbid' , 'Replace'), false                                        );
	deltaJs.newComposition( t('Replace', 'Modify' ), d('Replace', ({d2, p1}) => d2.appliedTo(p1)) );
	deltaJs.newComposition( t('Replace', 'Add'    ), false                                        );
	deltaJs.newComposition( t('Replace', 'Remove' ), d('Remove')                                  );
	deltaJs.newComposition( t('Replace', 'Forbid' ), false                                        );
	deltaJs.newComposition( t('Replace', 'Replace'), d('Replace', ({p2}) => p2)                   );


	/* composition - introducing 'Update' ***********************************************/
	deltaJs.newComposition( t('Modify' , 'Update' ), true                                         );
	deltaJs.newComposition( t('Add'    , 'Update' ), d('Add',     ({d2, p1}) => d2.appliedTo(p1)) );
	deltaJs.newComposition( t('Remove' , 'Update' ), true                                         );
	deltaJs.newComposition( t('Forbid' , 'Update' ), true                                         );
	deltaJs.newComposition( t('Replace', 'Update' ), d('Replace', ({d2, p1}) => d2.appliedTo(p1)) );
	deltaJs.newComposition( t('Update' , 'Modify' ), true                                         );
	deltaJs.newComposition( t('Update' , 'Add'    ), true                                         );
	deltaJs.newComposition( t('Update' , 'Remove' ), d('Remove')                                  );
	deltaJs.newComposition( t('Update' , 'Forbid' ), true                                         );
	deltaJs.newComposition( t('Update' , 'Replace'), d('Replace', ({p2}) => p2)                   );
	deltaJs.newComposition( t('Update' , 'Update' ), d('Update',  ({p1, p2}) => v => p2(p1(v)))   );


});
