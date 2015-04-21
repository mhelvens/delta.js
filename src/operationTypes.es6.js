/* import internal stuff */
import {extend, oncePer, assert, isUndefined} from './util.es6.js';


export default oncePer('operation types', (deltaJs) => {


	oncePer(deltaJs.constructor, 'operation types', (DeltaJs) => {
		extend(DeltaJs.prototype, /** @lends DeltaJs.prototype */ {


			/**
			 * This method allows you to tell delta.js about a new kind of delta operation.
			 * This was also done for existing operations like `modify`, `add`, `remove`, and so on.
			 * @param name          {string}    - name of the new operation type
			 * @param DeltaSubclass {function}  - the new operation class
			 * @param ProxySubclass {?function} - the optional custom `Proxy` subclass for this operation-type
			 */
			newOperationType(name, DeltaSubclass, ProxySubclass = null) {
				/* sanity checks */
				assert(name[0] === name[0].toUpperCase(),
					`Names of delta operation classes must start with a capital letter - '${name}' does not.`);
				assert(isUndefined(this.Delta[name]),
					`The '${name}' operation type already exists.`);

				/* store the operation class */
				this.Delta[name] = DeltaSubclass;

				/* set the (optional) Proxy class */
				DeltaSubclass.Proxy = ProxySubclass;

				/* fetch certain given methods (if they exist) that need to be slightly augmented */
				var givenApplyTo  = DeltaSubclass.prototype.applyTo || (()=>{});

				/* augment the class prototype */
				extend(DeltaSubclass.prototype, {
					applyTo(target, options = {}) {
						/* should this delta only be applied for a specific feature selection? */
						if (!this.selected) { return }

						/* if the target is not already in Target form, make it so now */
						if (!(target instanceof DeltaJs.ReadableTarget)) {
							target = new DeltaJs.ReadableTarget(target);
						}

						/* option defaults */
						if (isUndefined(options.weak)) { options.weak = false }

						/* does the target satisfy the precondition of the delta? */
						let judgment = this.evaluatePrecondition(target, options);
						if (judgment !== true) { throw judgment }

						/* OK, then apply it if a method to do so was included in the operation */
						givenApplyTo.call(this, target, options);
					},
					type: name
				});

				/* create any given methods with default handler */
				var lowercaseName = name[0].toLowerCase()+name.slice(1);
				for (let method of DeltaSubclass.prototype.methods || [lowercaseName]) {
					this.ContainerProxy.newProxyMethod(method, (...args) => new DeltaSubclass(...args));
				}

				/* return the new class */
				return DeltaSubclass;
			}

		});
	});


});
