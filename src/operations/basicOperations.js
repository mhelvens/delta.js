/* import internal stuff */
import U                                        from '../misc.js';
import {WritableTarget, ReadableTarget, rt, wt} from '../Target.js';
import {DeltaArgApplicationError}               from '../Error.js';
import defineDelta                              from './Delta.js';


export default (deltaJs) => {
	if (U.isDefined(deltaJs._basicOperationsDefined)) { return }
	deltaJs._basicOperationsDefined = true;

	defineDelta(deltaJs);

	/* convenience definitions for the application and composition functions below ******/
	function t(type1, type2) { return (d1, d2) => (d1.type === type1 && d2.type === type2) }
	function d(type, fn) {
		if (typeof fn === 'string') { fn = ((v) => (o) => o[v])(fn) }
		return (d1, d2) => new deltaJs.Delta[type](fn && fn({d1, d2, p1: d1.arg, p2: d2.arg}));
	}

	/* declaring the no-op type *********************************************************/
	class NoOp extends deltaJs.Delta { constructor(...args) { super(...args) } }
	deltaJs.newOperationType('NoOp', NoOp);
	deltaJs.newComposition( (d1, d2) => d1 instanceof NoOp, (d1, d2) => d2.clone() );
	deltaJs.newComposition( (d1, d2) => d2 instanceof NoOp, (d1, d2) => d1.clone() );

	/* declaring the basic operation types **********************************************/
	[   ['Add',     'add',     (target) => U.isUndefined(target.value)],
		['Replace', 'replace', (target) => U.isDefined  (target.value)]
	].forEach(([Type, type, pre]) => {
		class Class extends deltaJs.Delta {
			constructor(...args) { super(...args); this.deltasToApplyToArg = []; }
			precondition(target) { return target instanceof WritableTarget && pre(target) }
			applyTo(target) { target.value = this.deltasToApplyToArg.reduce((v, d) => d.appliedTo(v), this.arg) }
			clone() {
				var result = super.clone();
				result.deltasToApplyToArg = this.deltasToApplyToArg.map(d => d);
				return result;
			}
			afterApplying(delta) {
				var result = this.clone();
				result.deltasToApplyToArg.push(delta); // don't clone, as that would break any facades // TODO: this will no longer matter after the refactoring
				if (result.deltasToApplyToArg
						.reduce((d1, d2) => deltaJs.composed(d1, d2))
						.precondition(wt(result, 'arg')) !== true) {
					throw new DeltaArgApplicationError(delta, this);
				}
				return result;
			}
			toString(options = {}) {
				var str = super.toString(options);
				if (Object.keys(this.deltasToApplyToArg).length > 0) {
					var deltas = Object
						.keys(this.deltasToApplyToArg)
						.map(p => this.deltasToApplyToArg[p].toString(options))
						.join('\n');
					str += '\n' + U.indent(deltas, 4);
				}
				return str;
			}
		}
		deltaJs.newOperationType(Type, Class);
	});
	class Remove extends deltaJs.Delta {
		constructor(...args) { super(...args) }
		precondition(target) { return target instanceof WritableTarget && U.isDefined(target.value) }
		applyTo(target) { target.delete() }
	}
	deltaJs.newOperationType('Remove', Remove);
	class Forbid extends deltaJs.Delta {
		constructor(...args) { super(...args) }
		precondition(target) { return U.isUndefined(target.value) }
	}
	deltaJs.newOperationType('Forbid', Forbid);

	/* composition - introducing 'Modify' ***********************************************/
	deltaJs.newComposition( t('Modify', 'Modify'), (d1, d2) => {
		var result = d1.clone();
		Object.keys(d2.deltas).forEach((prop) => {
			result.deltas[prop] = deltaJs.composed(result.deltas[prop], d2.deltas[prop]);
		});
		return result;
	});

	/* composition - introducing 'Add' **************************************************/
	deltaJs.newComposition( t('Add', 'Modify'), (d1, d2) => d1.afterApplying(d2) );

	/* composition - introducing 'Remove' ***********************************************/
	deltaJs.newComposition( t('Modify', 'Remove'), d('Remove')                );
	deltaJs.newComposition( t('Add'   , 'Remove'), d('Forbid')                );
	deltaJs.newComposition( t('Remove', 'Add'   ), d('Replace', ({p2}) => p2) );

	/* composition - introducing 'Forbid' ***********************************************/
	deltaJs.newComposition( t('Remove', 'Forbid'), d('Remove')            );
	deltaJs.newComposition( t('Forbid', 'Add'   ), d('Add', ({p2}) => p2) );
	deltaJs.newComposition( t('Forbid', 'Forbid'), d('Forbid')            );

	/* composition - introducing 'Replace' **********************************************/
	deltaJs.newComposition( t('Modify' , 'Replace'), d('Replace', ({p2}) => p2)      );
	deltaJs.newComposition( t('Add'    , 'Replace'), d('Add',     ({p2}) => p2)      );
	deltaJs.newComposition( t('Replace', 'Modify'), (d1, d2) => d1.afterApplying(d2) );
	deltaJs.newComposition( t('Replace', 'Remove' ), d('Remove')                     );
	deltaJs.newComposition( t('Replace', 'Replace'), d('Replace', ({p2}) => p2)      );

};
