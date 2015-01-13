(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("js-graph"));
	else if(typeof define === 'function' && define.amd)
		define(["js-graph"], factory);
	else if(typeof exports === 'object')
		exports["DeltaJs"] = factory(require("js-graph"));
	else
		root["DeltaJs"] = factory(root["JsGraph"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function(U, JsGraph) {
	  'use strict';
	  var DeltaJs = U.newClass(function DeltaJs() {
	    var $__0 = this;
	    var thisDeltaJs = this;
	    this.operations = {};
	    this.compositions = [];
	    this._onNewOperationTypeListeners = [];
	    var Delta = this.Delta = U.newClass(function(arg, meta) {
	      this.arg = arg;
	      this.meta = U.extend({}, meta || {});
	    }, {
	      clone: function() {
	        return new this.constructor(this.arg, this.meta);
	      },
	      appliedTo: function(value) {
	        if (typeof value.clone === 'function') {
	          value = value.clone();
	        }
	        var obj = {value: value};
	        this.applyTo(wt(obj, 'value'));
	        return obj.value;
	      },
	      compose: function(otherDelta) {
	        var $__0 = this;
	        var composeFn;
	        thisDeltaJs.compositions.some((function($__4) {
	          var $__5 = $__4,
	              precondition = $__5.precondition,
	              fn = $__5.compose;
	          if (precondition($__0, otherDelta)) {
	            composeFn = fn;
	            return true;
	          }
	        }));
	        U.assert(typeof composeFn === 'function', ("A '" + this.type + "' operation cannot be followed by a '" + otherDelta.type + "' operation."));
	        return composeFn(this, otherDelta);
	      },
	      toString: function() {
	        var indentLvl = arguments[0] !== (void 0) ? arguments[0] : 0;
	        var prop = arguments[1] !== (void 0) ? arguments[1] : '(root)';
	        var indent = U.repeat(indentLvl, '    ');
	        var str = ("" + indent + this.type);
	        if (prop) {
	          str += (" '" + prop + "'");
	        }
	        if (U.isDefined(this.arg)) {
	          str += (": " + JSON.stringify(this.arg));
	        }
	        return str;
	      },
	      _createOperationInterface: ((function() {
	        var operationMethods = {};
	        $__0.onNewOperationType((function(cls) {
	          cls.meta.methods.forEach((function(method) {
	            if (U.isUndefined(operationMethods[method])) {
	              operationMethods[method] = function() {
	                for (var args = [],
	                    $__2 = 0; $__2 < arguments.length; $__2++)
	                  args[$__2] = arguments[$__2];
	                var newDelta = this._applyOperationMethod(method, args);
	                return newDelta.operations || this;
	              };
	            }
	          }));
	        }));
	        return function _createOperationInterface(handleOperation) {
	          Object.defineProperty(this, 'operations', {value: Object.create(operationMethods, {
	              _applyOperationMethod: {value: handleOperation},
	              delta: {value: this}
	            })});
	        };
	      }))()
	    });
	    this.overloads = {};
	    var OverloadedDelta = this.operations.OverloadedDelta = U.newSubclass(this.Delta, (function(superFn) {
	      return function(arg, meta) {
	        superFn.call(this, arg, meta);
	        this.overloads = [];
	      };
	    }), {
	      clone: function() {
	        var result = thisDeltaJs.Delta.prototype.clone.call(this, this.arg, this.meta);
	        result.overloads = this.overloads.map((function(delta) {
	          return delta.clone();
	        }));
	        return result;
	      },
	      applyTo: function(target) {
	        var errors = [];
	        var success = this.overloads.some((function(delta) {
	          var judgment = thisDeltaJs._evaluatePrecondition(delta, target);
	          if (judgment !== true) {
	            errors.push(judgment);
	            return false;
	          }
	          delta.applyTo(target);
	          return true;
	        }));
	        if (!success) {
	          if (errors.length === 0) {
	            throw new Error("This overloaded delta has no overloads, " + ("so cannot apply to the value: " + target.value));
	          } else if (errors.length === 1) {
	            throw errors[0];
	          } else {
	            throw new Error(("None of the delta types " + this.type.join(',') + " ") + ("apply to the value: " + target.value + "\n") + errors.map((function(e) {
	              return e.message;
	            })).join('\n'));
	          }
	        }
	      },
	      toString: function() {
	        var indentLvl = arguments[0] !== (void 0) ? arguments[0] : 0;
	        var prop = arguments[1] !== (void 0) ? arguments[1] : '(root)';
	        var str = Delta.prototype.toString.call(this, indentLvl, prop);
	        str += '\n' + this.overloads.map((function(delta) {
	          return delta.toString(indentLvl + 1, null);
	        })).join('\n');
	        return str;
	      }
	    });
	    OverloadedDelta.type = OverloadedDelta.prototype.type = 'OverloadedDelta';
	    OverloadedDelta.meta = OverloadedDelta.prototype.meta = {methods: []};
	    this.newComposition((function(d1, d2) {
	      return (d1 instanceof OverloadedDelta || d2 instanceof OverloadedDelta);
	    }), (function(d1, d2) {
	      var D1 = d1 instanceof OverloadedDelta ? d1.overloads : [d1];
	      var D2 = d2 instanceof OverloadedDelta ? d2.overloads : [d2];
	      var result = new OverloadedDelta();
	      var errors = [];
	      D1.forEach((function(delta1) {
	        D2.forEach((function(delta2) {
	          try {
	            result.overloads.push(delta1.compose(delta2));
	          } catch (error) {
	            errors.push(error);
	          }
	        }));
	      }));
	      if (result.overloads.length === 0) {
	        throw new Error(errors.map((function(e) {
	          return e.message;
	        })).join('\n'));
	      }
	      return result;
	    }));
	    var Modify = this.operations.Modify = U.newSubclass(this.Delta, (function(superFn) {
	      return function(__, meta) {
	        var $__1 = this;
	        superFn.call(this, __, meta);
	        this.deltas = {};
	        this._createOperationInterface((function(method, $__4) {
	          var $__5 = $__4,
	              pathOrOptions = $__5[0],
	              arg = $__5[1];
	          var options = thisDeltaJs._processOptions(pathOrOptions);
	          var delta = thisDeltaJs._getDeltaByMethod(method, arg);
	          var newDelta = $__1._addOperation(options, delta);
	          return newDelta.operations ? newDelta : delta;
	        }));
	      };
	    }), {
	      clone: function() {
	        var $__1 = this;
	        var result = thisDeltaJs.Delta.prototype.clone.call(this, this.arg, this.meta);
	        Object.keys(this.deltas).forEach((function(prop) {
	          result.deltas[prop] = $__1.deltas[prop].clone();
	        }));
	        return result;
	      },
	      precondition: function(target) {
	        return target.value instanceof Object;
	      },
	      applyTo: function(target) {
	        var $__1 = this;
	        U.assert(U.isUndefined(this.meta.target), "Targeted deltas cannot be applied to anything manually.");
	        U.assert(U.isDefined(target.value), "The 'Modify' operation expects the property to be defined.");
	        U.assert(target.value instanceof Object, "The 'Modify' operation expects the property to be an Object.");
	        Object.keys(this.deltas).forEach((function(prop) {
	          $__1.deltas[prop].applyTo(wt(target.value, prop));
	        }));
	      },
	      toString: function() {
	        var indentLvl = arguments[0] !== (void 0) ? arguments[0] : 0;
	        var prop = arguments[1] !== (void 0) ? arguments[1] : '(root)';
	        var $__1 = this;
	        var str = Delta.prototype.toString.call(this, indentLvl, prop);
	        if (Object.keys(this.deltas).length > 0) {
	          str += '\n' + Object.keys(this.deltas).map((function(p) {
	            return $__1.deltas[p].toString(indentLvl + 1, p);
	          })).join('\n');
	        }
	        return str;
	      },
	      _addOperation: function(options, delta) {
	        var $__4 = thisDeltaJs._parsePath(options.path),
	            lead = $__4.lead,
	            prop = $__4.prop,
	            rest = $__4.rest;
	        if (lead === '#') {
	          return this._addOperation(U.extend({}, options, {path: (".(instance)." + prop + rest)}), delta);
	        } else if (rest.length > 0) {
	          return this.operations.modify(prop).delta._addOperation(U.extend({}, options, {path: rest}), delta);
	        }
	        if (U.isDefined(this.meta.target)) {
	          if (delta.type === 'Modify') {
	            return (new Modify(undefined, U.extend({}, delta.meta, {target: this.meta.target.chain(prop)})));
	          }
	          delta.applyTo(this.meta.target.chain(prop));
	          return this;
	        }
	        if (U.isDefined(this.deltas[prop])) {
	          var composition = this.deltas[prop] = this.deltas[prop].compose(delta);
	          if (delta.type === 'Modify' && composition.type !== 'Modify') {
	            return (new Modify(undefined, U.extend({}, delta.meta, {target: wt(composition, 'arg')})));
	          }
	        } else {
	          this.deltas[prop] = delta;
	        }
	        return this.deltas[prop];
	      }
	    });
	    Modify.type = Modify.prototype.type = 'Modify';
	    Modify.meta = Modify.prototype.meta = {methods: ['modify']};
	    this._onNewOperationTypeListeners.forEach((function(fn) {
	      fn(Modify);
	    }));
	    if (!Array.isArray(this.overloads['modify'])) {
	      this.overloads['modify'] = [];
	    }
	    this.overloads['modify'].push('Modify');
	    this._defineStandardOperationTypes();
	  }, {
	    _parsePath: function(path) {
	      var match = path.match(/^([.#]?)(\w+|\(\w+\))(.*)$/);
	      U.assert(match, ("The path string '" + path + "' is not well formed."));
	      var $__4 = match,
	          lead = $__4[1],
	          prop = $__4[2],
	          rest = $__4[3];
	      return {
	        lead: lead,
	        prop: prop,
	        rest: rest
	      };
	    },
	    _processOptions: function(pathOrOptions) {
	      if (typeof pathOrOptions === 'string') {
	        return {path: pathOrOptions};
	      } else if (pathOrOptions instanceof Object) {
	        return pathOrOptions;
	      } else {
	        throw new Error("The options argument on a delta operation " + "a should be a path string or an options object.");
	      }
	    },
	    _getDeltaByMethod: function(method, arg) {
	      var $__0 = this;
	      var newDeltas = this.overloads[method].map((function(type) {
	        return new $__0.operations[type](arg, {method: method});
	      }));
	      if (newDeltas.length === 1) {
	        return newDeltas[0];
	      } else {
	        var delta = new this.operations.OverloadedDelta(arg, {method: method});
	        delta.overloads = newDeltas;
	        return delta;
	      }
	    },
	    _evaluatePrecondition: function(delta, target) {
	      if (typeof delta.precondition === 'function') {
	        var judgment = delta.precondition(target);
	        if (judgment instanceof Error) {
	          return judgment;
	        } else if (typeof judgment === 'string') {
	          return new TypeError(judgment);
	        } else if (!judgment) {
	          return new TypeError(("The value '" + target.value + "' does not satisfy ") + ("the precondition of the '" + name + "' operation."));
	        }
	      }
	      return true;
	    },
	    newOperationType: function(name, $__4) {
	      var $__5 = $__4,
	          construct = $__5.construct,
	          precondition = $__5.precondition,
	          forceApplyTo = $__5.applyTo,
	          methods = $__5.methods,
	          clone = $__5.clone;
	      var prototype = arguments[2] !== (void 0) ? arguments[2] : {};
	      var $__0 = this;
	      var thisDeltaJs = this;
	      U.assert(!this.operations[name], ("The '" + name + "' operation type already exists."));
	      var cls = this.operations[name] = U.newSubclass(this.Delta, (function(superFn) {
	        return function(arg, meta) {
	          superFn.call(this, arg, meta);
	          if (construct) {
	            construct.call(this);
	          }
	        };
	      }), U.extend({
	        precondition: precondition,
	        applyTo: function(target) {
	          var judgment = thisDeltaJs._evaluatePrecondition(this, target);
	          if (judgment !== true) {
	            throw judgment;
	          }
	          if (U.isDefined(forceApplyTo)) {
	            forceApplyTo.call(this, target);
	          }
	        }
	      }, prototype));
	      cls.type = cls.prototype.type = name;
	      cls.meta = cls.prototype.meta = {methods: methods || [name[0].toLowerCase() + name.slice(1)]};
	      if (U.isDefined(clone)) {
	        cls.prototype.clone = clone;
	      }
	      cls.meta.methods.forEach((function(method) {
	        if (!Array.isArray($__0.overloads[method])) {
	          $__0.overloads[method] = [];
	        }
	        $__0.overloads[method].push(name);
	      }));
	      this._onNewOperationTypeListeners.forEach((function(fn) {
	        fn(cls);
	      }));
	      return cls;
	    },
	    onNewOperationType: function(fn) {
	      var $__0 = this;
	      this._onNewOperationTypeListeners.push(fn);
	      Object.keys(this.operations).forEach((function(name) {
	        fn($__0.operations[name]);
	      }));
	    },
	    newComposition: function(precondition, compose) {
	      this.compositions.push({
	        precondition: precondition,
	        compose: compose
	      });
	    },
	    _defineStandardOperationTypes: function() {
	      var thisDeltaJs = this;
	      function t(type1, type2) {
	        return (function(d1, d2) {
	          return (d1.type === type1 && d2.type === type2);
	        });
	      }
	      function d(type) {
	        var fn = arguments[1] !== (void 0) ? arguments[1] : null;
	        if (typeof fn === 'string') {
	          fn = ((function(v) {
	            return (function(o) {
	              return o[v];
	            });
	          }))(fn);
	        }
	        if (fn) {
	          return (function(d1, d2) {
	            return new (thisDeltaJs.operations[type])(fn({
	              d1: d1,
	              d2: d2,
	              p1: d1.arg,
	              p2: d2.arg
	            }));
	          });
	        } else {
	          return (function(d1, d2) {
	            return new (thisDeltaJs.operations[type])();
	          });
	        }
	      }
	      this.newOperationType('Add', {
	        precondition: function(target) {
	          return target instanceof WritableTarget && U.isUndefined(target.value);
	        },
	        applyTo: function(target) {
	          target.value = this.arg;
	        }
	      });
	      this.newOperationType('Remove', {
	        precondition: function(target) {
	          return target instanceof WritableTarget && U.isDefined(target.value);
	        },
	        applyTo: function(target) {
	          target.delete();
	        }
	      });
	      this.newOperationType('Forbid', {precondition: function(target) {
	          return U.isUndefined(target.value);
	        }});
	      this.newOperationType('Replace', {
	        precondition: function(target) {
	          return target instanceof WritableTarget && U.isDefined(target.value);
	        },
	        applyTo: function(target) {
	          target.value = this.arg;
	        }
	      });
	      this.newComposition(t('Modify', 'Modify'), (function(d1, d2) {
	        var result = d1.clone();
	        Object.keys(d2.deltas).forEach((function(prop) {
	          result.deltas[prop].compose(d2.deltas[prop]);
	        }));
	        return result;
	      }));
	      this.newComposition(t('Add', 'Modify'), d('Add', (function($__4) {
	        var $__5 = $__4,
	            d2 = $__5.d2,
	            p1 = $__5.p1;
	        return d2.appliedTo(p1);
	      })));
	      this.newComposition(t('Modify', 'Remove'), d('Remove'));
	      this.newComposition(t('Add', 'Remove'), d('Forbid'));
	      this.newComposition(t('Remove', 'Add'), d('Replace', (function($__4) {
	        var p2 = $__4.p2;
	        return p2;
	      })));
	      this.newComposition(t('Remove', 'Forbid'), d('Remove'));
	      this.newComposition(t('Forbid', 'Add'), d('Add', (function($__4) {
	        var p2 = $__4.p2;
	        return p2;
	      })));
	      this.newComposition(t('Forbid', 'Forbid'), d('Forbid'));
	      this.newComposition(t('Modify', 'Replace'), d('Replace', (function($__4) {
	        var p2 = $__4.p2;
	        return p2;
	      })));
	      this.newComposition(t('Add', 'Replace'), d('Add', (function($__4) {
	        var p2 = $__4.p2;
	        return p2;
	      })));
	      this.newComposition(t('Replace', 'Modify'), d('Replace', (function($__4) {
	        var $__5 = $__4,
	            d2 = $__5.d2,
	            p1 = $__5.p1;
	        return d2.appliedTo(p1);
	      })));
	      this.newComposition(t('Replace', 'Remove'), d('Remove'));
	      this.newComposition(t('Replace', 'Replace'), d('Replace', (function($__4) {
	        var p2 = $__4.p2;
	        return p2;
	      })));
	      this.newOperationType('PutIntoArray', {
	        construct: function() {
	          if (this.meta.method) {
	            this.values = [{
	              method: this.meta.method,
	              value: this.arg
	            }];
	          } else {
	            this.values = [];
	          }
	        },
	        clone: function() {
	          var result = thisDeltaJs.Delta.prototype.clone.call(this, this.arg, this.meta);
	          result.values = [];
	          this.values.forEach((function(v) {
	            result.values.push(v);
	          }));
	          return result;
	        },
	        precondition: function(target) {
	          return U.isDefined(target.value) && Array.isArray(target.value);
	        },
	        applyTo: function(target) {
	          var arr = target.value;
	          this.values.forEach((function($__4) {
	            var $__5 = $__4,
	                method = $__5.method,
	                value = $__5.value;
	            switch (method) {
	              case 'prepend':
	                {
	                  arr.unshift(value);
	                }
	                break;
	              case 'insert':
	                {
	                  var position = Math.floor(Math.random() * (arr.length + 1));
	                  arr.splice(position, 0, value);
	                }
	                break;
	              case 'append':
	                {
	                  arr.push(value);
	                }
	                break;
	            }
	          }));
	        },
	        methods: ['prepend', 'insert', 'append']
	      });
	      this.newComposition(t('Add', 'PutIntoArray'), d('Add', (function($__4) {
	        var $__5 = $__4,
	            d2 = $__5.d2,
	            p1 = $__5.p1;
	        return d2.appliedTo(p1);
	      })));
	      this.newComposition(t('Replace', 'PutIntoArray'), d('Replace', (function($__4) {
	        var $__5 = $__4,
	            d2 = $__5.d2,
	            p1 = $__5.p1;
	        return d2.appliedTo(p1);
	      })));
	      this.newComposition(t('PutIntoArray', 'Remove'), d('Remove'));
	      this.newComposition(t('PutIntoArray', 'Replace'), d('Replace', (function($__4) {
	        var p2 = $__4.p2;
	        return p2;
	      })));
	      this.newComposition(t('PutIntoArray', 'PutIntoArray'), (function(d1, d2) {
	        var result = new thisDeltaJs.operations.PutIntoArray();
	        result.values = (d1.values).concat(d2.values);
	        return result;
	      }));
	      this.newOperationType('PutIntoFunction', {
	        construct: function() {
	          if (this.meta.method) {
	            this.values = [{
	              method: this.meta.method,
	              value: this.arg
	            }];
	          } else {
	            this.values = [];
	          }
	        },
	        clone: function() {
	          var result = thisDeltaJs.Delta.prototype.clone.call(this, this.arg, this.meta);
	          result.values = [];
	          this.values.forEach((function(v) {
	            result.values.push(v);
	          }));
	          return result;
	        },
	        precondition: function(target) {
	          return U.isDefined(target.value) && typeof target.value === 'function' && (U.isDefined(target.value._DeltaJs_functions) || target instanceof WritableTarget);
	        },
	        applyTo: function(target) {
	          if (U.isUndefined(target.value._DeltaJs_functions)) {
	            var originalFn = target.value;
	            var newFn = function() {
	              for (var args = [],
	                  $__2 = 0; $__2 < arguments.length; $__2++)
	                args[$__2] = arguments[$__2];
	              var $__0 = this;
	              var result;
	              newFn._DeltaJs_functions.forEach((function(fn) {
	                result = fn.apply($__0, args);
	              }));
	              return result;
	            };
	            newFn._DeltaJs_functions = [function() {
	              for (var args = [],
	                  $__3 = 0; $__3 < arguments.length; $__3++)
	                args[$__3] = arguments[$__3];
	              originalFn.apply(this, args);
	            }];
	            target.value = newFn;
	          }
	          var arr = target.value._DeltaJs_functions;
	          this.values.forEach((function($__4) {
	            var $__5 = $__4,
	                method = $__5.method,
	                value = $__5.value;
	            switch (method) {
	              case 'prepend':
	                {
	                  arr.unshift(value);
	                }
	                break;
	              case 'insert':
	                {
	                  var position = Math.floor(Math.random() * (arr.length + 1));
	                  arr.splice(position, 0, value);
	                }
	                break;
	              case 'append':
	                {
	                  arr.push(value);
	                }
	                break;
	            }
	          }));
	        },
	        methods: ['prepend', 'insert', 'append']
	      });
	      this.newComposition(t('Add', 'PutIntoFunction'), d('Add', (function($__4) {
	        var $__5 = $__4,
	            d2 = $__5.d2,
	            p1 = $__5.p1;
	        return d2.appliedTo(p1);
	      })));
	      this.newComposition(t('Replace', 'PutIntoFunction'), d('Replace', (function($__4) {
	        var $__5 = $__4,
	            d2 = $__5.d2,
	            p1 = $__5.p1;
	        return d2.appliedTo(p1);
	      })));
	      this.newComposition(t('PutIntoFunction', 'Remove'), d('Remove'));
	      this.newComposition(t('PutIntoFunction', 'Replace'), d('Replace', (function($__4) {
	        var p2 = $__4.p2;
	        return p2;
	      })));
	      this.newComposition(t('PutIntoFunction', 'PutIntoFunction'), (function(d1, d2) {
	        var result = new thisDeltaJs.operations.PutIntoFunction();
	        result.values = (d1.values).concat(d2.values);
	        return result;
	      }));
	    }
	  });
	  var ReadableTarget = DeltaJs.ReadableTarget = U.newClass(function(value) {
	    this._val = value;
	  }, {
	    getValue: function() {
	      return this._val;
	    },
	    get value() {
	      return this.getValue();
	    },
	    set value(v) {
	      this.setValue(v);
	    },
	    chain: function(prop) {
	      U.assert(this.value instanceof Object, "The ReadableTarget.prototype.chain method expects the target value to be an Object.");
	      return new WritableTarget(this.value, prop);
	    }
	  });
	  var WritableTarget = DeltaJs.WritableTarget = U.newSubclass(ReadableTarget, (function(superFn) {
	    return function(obj, prop) {
	      this._obj = obj;
	      this._prop = prop;
	    };
	  }), {
	    getValue: function() {
	      return this._obj[this._prop];
	    },
	    setValue: function(v) {
	      this._obj[this._prop] = v;
	    },
	    delete: function() {
	      delete this._obj[this._prop];
	    }
	  });
	  function wt(obj, prop) {
	    return new WritableTarget(obj, prop);
	  }
	  return DeltaJs;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  'use strict';
	  var U = {
	    newClass: function() {
	      var constructor = arguments[0] !== (void 0) ? arguments[0] : {};
	      var prototype = arguments[1] !== (void 0) ? arguments[1] : {};
	      if (typeof constructor !== 'function') {
	        prototype = constructor;
	        constructor = function() {};
	      }
	      var cls = constructor;
	      cls.prototype = prototype;
	      cls.prototype.constructor = cls;
	      return cls;
	    },
	    newSubclass: function(superClass) {
	      var constructorMaker = arguments[1] !== (void 0) ? arguments[1] : {};
	      var prototype = arguments[2] !== (void 0) ? arguments[2] : {};
	      if (typeof constructorMaker !== 'function') {
	        prototype = constructorMaker;
	        constructorMaker = (function(superFn) {
	          return function() {
	            for (var args = [],
	                $__0 = 0; $__0 < arguments.length; $__0++)
	              args[$__0] = arguments[$__0];
	            superFn.apply(this, args);
	          };
	        });
	      }
	      var cls = constructorMaker(superClass.prototype.constructor);
	      cls.prototype = Object.create(superClass.prototype);
	      U.extend(cls.prototype, prototype);
	      cls.prototype.constructor = cls;
	      return cls;
	    },
	    extend: function(obj1) {
	      for (var rest = [],
	          $__0 = 1; $__0 < arguments.length; $__0++)
	        rest[$__0 - 1] = arguments[$__0];
	      rest.forEach((function(obj) {
	        for (var key in obj) {
	          if (obj.hasOwnProperty(key)) {
	            Object.defineProperty(obj1, key, Object.getOwnPropertyDescriptor(obj, key));
	          }
	        }
	      }));
	      return obj1;
	    },
	    applyConstructor: function(ConstructorFn, args) {
	      var new_obj = Object.create(ConstructorFn.prototype);
	      ConstructorFn.apply(new_obj, args);
	      return new_obj;
	    },
	    assert: function(condition, message) {
	      if (!condition) {
	        throw new Error(message || "Assertion failed");
	      }
	    },
	    isUndefined: function(val) {
	      return typeof val === 'undefined';
	    },
	    isDefined: function(val) {
	      return typeof val !== 'undefined';
	    },
	    repeat: function(nr, str) {
	      return new Array(nr + 1).join(str);
	    }
	  };
	  return U;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAwY2ZjNmUxOGI2MGM4YWVlYmEyZiIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJKc0dyYXBoXCIsXCJjb21tb25qczJcIjpcImpzLWdyYXBoXCIsXCJjb21tb25qc1wiOlwianMtZ3JhcGhcIixcImFtZFwiOlwianMtZ3JhcGhcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL21pc2MuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0EsaUNBQVEsdUJBQWEsd0JBQVUsQ0FBRywwQ0FBVSxFQUFHLFFBQU07QUFDcEQsY0FBVyxDQUFDO0FBUVIsYUFBTSxFQUFJLFdBQVUsQ0FBQyxRQUFTLFFBQU0sQ0FBRTs7QUFHckMsbUJBQVUsRUFBSSxLQUFHLENBQUM7QUFHdEIsUUFBRyxXQUFXLEVBQUksR0FBQyxDQUFDO0FBQ3BCLFFBQUcsYUFBYSxFQUFJLEdBQUMsQ0FBQztBQUN0QixRQUFHLDZCQUE2QixFQUFJLEdBQUMsQ0FBQztBQUlsQyxhQUFJLEVBQUksS0FBRyxNQUFNLEVB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QUFDLEdBQUUsQ0FBRyxJQUFFLENBQUMsQ0FBQyxDQUFDO1dBQzVFO0FBQUEsU0FDRDtBQUFBLE9BQ0QsRUFBQyxDQUFDO0FBQ0YsWUFBTyxLQUFHLENBQUM7S0FDWjtBQUdBLG9CQUFlLENBQWYsVUFBaUIsYUFBWSxDQUFHLEtBQUcsQ0FBRztBQUNqQyxpQkFBTSxFQUFJLE9BQUssT0FBUSxDQUFDLGFBQVksVUFBVSxDQUFDLENBQUM7QUFDcEQsbUJBQVksTUFBTyxDQUFDLE9BQU0sQ0FBRyxLQUFHLENBQUMsQ0FBQztBQUNsQyxZQUFPLFFBQU0sQ0FBQztLQUNmO0FBR0EsVUFBSyxDQUFMLFVBQU8sU0FBUSxDQUFHLFFBQU0sQ0FBRztBQUMxQixVQUFJLENBQUMsU0FBUSxDQUFHO0FBQUUsYUFBTSxJQUFJLE1BQUssQ0FBQyxPQUFNLEdBQUssbUJBQWlCLENBQUM7T0FBRTtBQUFBLEtBQ2xFO0FBR0EsZUFBVSxDQUFWLFVBQVksR0FBRSxDQUFHO0FBQUUsWUFBTyxPQUFPLElBQUUsSUFBTSxZQUFVO0tBQUU7QUFHckQsYUFBUSxDQUFSLFVBQVUsR0FBRSxDQUFHO0FBQUUsWUFBTyxPQUFPLElBQUUsSUFBTSxZQUFVO0tBQUU7QUFHbkQsVUFBSyxDQUFMLFVBQU8sRUFBQyxDQUFHLElBQUUsQ0FBRztBQUFFLFlBQU8sSUFBSSxNQUFLLENBQUMsRUFBQyxFQUFFLEdBQUMsS0FBTSxDQUFDLEdBQUUsQ0FBQztLQUFFO0FBQUEsR0FDcEQsQ0FBQztBQUVELFFBQU8sR0FBQztBQUNULHdKQUFFO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcy1ncmFwaFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcy1ncmFwaFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJEZWx0YUpzXCJdID0gZmFjdG9yeShyZXF1aXJlKFwianMtZ3JhcGhcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkRlbHRhSnNcIl0gPSBmYWN0b3J5KHJvb3RbXCJKc0dyYXBoXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMGNmYzZlMThiNjBjOGFlZWJhMmZcbiAqKi8iLCJkZWZpbmUoWycuL21pc2MuanMnLCAnanMtZ3JhcGgnXSwgZnVuY3Rpb24gKFUsIEpzR3JhcGgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0LyoqIHtAY2xhc3MgRGVsdGFKc31cblx0ICogVGhpcyBjbGFzcyBvZmZlcnMgZXZlcnkgZnVuY3Rpb25hbGl0eSB5b3UgbmVlZCBmcm9tIGRlbHRhIG1vZGVsaW5nLlxuXHQgKiBFYWNoIGluc3RhbmNlIG9mZmVycyBpdHMgb3duIG9wZXJhdGlvbiB0eXBlcyBhbmQgdmFyaWF0aW9uIHBvaW50cy5cblx0ICogWW91IHdpbGwgdXN1YWxseSBuZWVkIG9ubHkgb25lIGluc3RhbmNlIHBlciBhcHBsaWNhdGlvbi5cblx0ICovXG5cdHZhciBEZWx0YUpzID0gVS5uZXdDbGFzcyhmdW5jdGlvbiBEZWx0YUpzKCkge1xuXG5cdFx0LyogJ3RoaXMnIGFsaWFzICovXG5cdFx0dmFyIHRoaXNEZWx0YUpzID0gdGhpcztcblxuXHRcdC8qIHRoZSB0aGluZ3MgaW5zdGFuY2VzIG9mICdEZWx0YUpzJyBrZWVwcyB0cmFjayBvZiAqL1xuXHRcdHRoaXMub3BlcmF0aW9ucyA9IHt9OyAgIC8vIHByb3BlcnR5IC0+IERlbHRhLXN1YmNsYXNzXG5cdFx0dGhpcy5jb21wb3NpdGlvbnMgPSBbXTsgLy8gW3twcmVjb25kaXRpb24sIGNvbXBvc2VGbn1dXG5cdFx0dGhpcy5fb25OZXdPcGVyYXRpb25UeXBlTGlzdGVuZXJzID0gW107XG5cblxuXHRcdC8qIERlbHRhICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogRGVsdGEgKi9cblx0XHR2YXIgRGVsdGEgPSB0aGlzLkRlbHRhID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoYXJnLCBtZXRhKSB7XG5cdFx0XHR0aGlzLmFyZyA9IGFyZztcblx0XHRcdHRoaXMubWV0YSA9IFUuZXh0ZW5kKHt9LCBtZXRhIHx8IHt9KTtcblx0XHR9LCB7XG5cdFx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0XHQgKiBUaGlzIG1ldGhvZCBzaG91bGQgYmUgb3ZlcndyaXR0ZW4gYnkgc3ViY2xhc3NlcyB0byBtYWtlIGEgY2xvbmUgb2YgJ3RoaXMnIGRlbHRhLlxuXHRcdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHRcdCAqL1xuXHRcdFx0Y2xvbmUoKSB7XG5cdFx0XHRcdHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLmFyZywgdGhpcy5tZXRhKTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0XHQgKiBAcGFyYW0gIHZhbHVlIHsqfSAtIGFueSBnaXZlbiB2YWx1ZVxuXHRcdFx0ICogQHJldHVybiB0aGUgdmFsdWUgcmVzdWx0aW5nIGluIHRoaXMgZGVsdGEgYmVpbmcgYXBwbGllZCB0byB0aGUgZ2l2ZW4gYHZhbHVlYFxuXHRcdFx0ICovXG5cdFx0XHRhcHBsaWVkVG8odmFsdWUpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZS5jbG9uZSA9PT0gJ2Z1bmN0aW9uJykgeyB2YWx1ZSA9IHZhbHVlLmNsb25lKCkgfVxuXHRcdFx0XHR2YXIgb2JqID0geyB2YWx1ZSB9O1xuXHRcdFx0XHR0aGlzLmFwcGx5VG8od3Qob2JqLCAndmFsdWUnKSk7XG5cdFx0XHRcdHJldHVybiBvYmoudmFsdWU7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdFx0ICogQHBhcmFtIG90aGVyRGVsdGEge0RlbHRhSnMjRGVsdGF9XG5cdFx0XHQgKi9cblx0XHRcdGNvbXBvc2Uob3RoZXJEZWx0YSkge1xuXHRcdFx0XHR2YXIgY29tcG9zZUZuO1xuXHRcdFx0XHR0aGlzRGVsdGFKcy5jb21wb3NpdGlvbnMuc29tZSgoe3ByZWNvbmRpdGlvbiwgY29tcG9zZTogZm59KSA9PiB7XG5cdFx0XHRcdFx0aWYgKHByZWNvbmRpdGlvbih0aGlzLCBvdGhlckRlbHRhKSkge1xuXHRcdFx0XHRcdFx0Y29tcG9zZUZuID0gZm47XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRVLmFzc2VydCh0eXBlb2YgY29tcG9zZUZuID09PSAnZnVuY3Rpb24nLFxuXHRcdFx0XHRcdFx0YEEgJyR7dGhpcy50eXBlfScgb3BlcmF0aW9uIGNhbm5vdCBiZSBmb2xsb3dlZCBieSBhICcke290aGVyRGVsdGEudHlwZX0nIG9wZXJhdGlvbi5gKTtcblx0XHRcdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRBc3NpZ25tZW50XG5cdFx0XHRcdHJldHVybiBjb21wb3NlRm4odGhpcywgb3RoZXJEZWx0YSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gaW5kZW50THZsIHtOdW1iZXI/fVxuXHRcdFx0ICogQHBhcmFtIHByb3AgICAgICB7U3RyaW5nP31cblx0XHRcdCAqL1xuXHRcdFx0dG9TdHJpbmcoaW5kZW50THZsID0gMCwgcHJvcCA9ICcocm9vdCknKSB7XG5cdFx0XHRcdHZhciBpbmRlbnQgPSBVLnJlcGVhdChpbmRlbnRMdmwsICcgICAgJyk7XG5cdFx0XHRcdHZhciBzdHIgPSBgJHtpbmRlbnR9JHt0aGlzLnR5cGV9YDtcblx0XHRcdFx0aWYgKHByb3ApICAgICAgICAgICAgICAgICAgeyBzdHIgKz0gYCAnJHtwcm9wfSdgIH1cblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHRoaXMuYXJnKSkgeyBzdHIgKz0gYDogJHtKU09OLnN0cmluZ2lmeSh0aGlzLmFyZyl9YCB9XG5cdFx0XHRcdHJldHVybiBzdHI7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKiBhIHByb3RlY3RlZCBEZWx0YSBtZXRob2QgdG8gY3JlYXRlIGFuIGludGVyZmFjZSB3aXRoIG9wZXJhdGlvbiBtZXRob2RzICovXG5cdFx0XHQvKioge0Bwcm90ZWN0ZWR9e0BtZXRob2R9XG5cdFx0XHQgKiBUbyBjcmVhdGUgYW4gJ29wZXJhdGlvbnMnIHByb3BlcnR5IG9uIHRoaXMgZGVsdGEgd2l0aCBvcGVyYXRpb24gbWV0aG9kcy5cblx0XHRcdCAqIEBwYXJhbSBoYW5kbGVPcGVyYXRpb24ge2Z1bmN0aW9uKFN0cmluZywgKik6IERlbHRhSnMjRGVsdGF9IC0gYSBmdW5jdGlvbiB0aGF0IGFwcGxpZXMgYSBkZWx0YSBvcGVyYXRpb25cblx0XHRcdCAqL1xuXHRcdFx0X2NyZWF0ZU9wZXJhdGlvbkludGVyZmFjZTogKCgpID0+IHtcblx0XHRcdFx0dmFyIG9wZXJhdGlvbk1ldGhvZHMgPSB7fTtcblx0XHRcdFx0dGhpcy5vbk5ld09wZXJhdGlvblR5cGUoKGNscykgPT4ge1xuXHRcdFx0XHRcdGNscy5tZXRhLm1ldGhvZHMuZm9yRWFjaCgobWV0aG9kKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvcGVyYXRpb25NZXRob2RzW21ldGhvZF0pKSB7XG5cdFx0XHRcdFx0XHRcdG9wZXJhdGlvbk1ldGhvZHNbbWV0aG9kXSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIG5ld0RlbHRhID0gdGhpcy5fYXBwbHlPcGVyYXRpb25NZXRob2QobWV0aG9kLCBhcmdzKTtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbmV3RGVsdGEub3BlcmF0aW9ucyB8fCB0aGlzO1xuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uIF9jcmVhdGVPcGVyYXRpb25JbnRlcmZhY2UoaGFuZGxlT3BlcmF0aW9uKSB7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdvcGVyYXRpb25zJywge1xuXHRcdFx0XHRcdFx0dmFsdWU6IE9iamVjdC5jcmVhdGUob3BlcmF0aW9uTWV0aG9kcywge1xuXHRcdFx0XHRcdFx0XHRfYXBwbHlPcGVyYXRpb25NZXRob2Q6IHsgdmFsdWU6IGhhbmRsZU9wZXJhdGlvbiB9LFxuXHRcdFx0XHRcdFx0XHRkZWx0YTogICAgICAgICAgICAgICAgIHsgdmFsdWU6IHRoaXMgICAgICAgICAgICB9XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9O1xuXHRcdFx0fSkoKVxuXHRcdH0pO1xuXG5cblx0XHQvKiBPdmVybG9hZGVkRGVsdGEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogT3ZlcmxvYWRlZERlbHRhICovXG5cdFx0dGhpcy5vdmVybG9hZHMgPSB7fTsgLy8gbWV0aG9kIC0+IFtkZWx0YS1jbGFzc2VzXVxuXHRcdHZhciBPdmVybG9hZGVkRGVsdGEgPSB0aGlzLm9wZXJhdGlvbnMuT3ZlcmxvYWRlZERlbHRhID0gVS5uZXdTdWJjbGFzcyh0aGlzLkRlbHRhLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKGFyZywgbWV0YSkge1xuXHRcdFx0c3VwZXJGbi5jYWxsKHRoaXMsIGFyZywgbWV0YSk7XG5cdFx0XHR0aGlzLm92ZXJsb2FkcyA9IFtdO1xuXHRcdH0sIHtcblx0XHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjb3BlcmF0aW9ucy5PdmVybG9hZGVkRGVsdGF9IC0gYSBjbG9uZSBvZiB0aGlzIGRlbHRhXG5cdFx0XHQgKi9cblx0XHRcdGNsb25lKCkge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gdGhpc0RlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMubWV0YSk7IC8vIHN1cGVyKClcblx0XHRcdFx0cmVzdWx0Lm92ZXJsb2FkcyA9IHRoaXMub3ZlcmxvYWRzLm1hcChkZWx0YSA9PiBkZWx0YS5jbG9uZSgpKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIEBwYXJhbSB0YXJnZXQge0RlbHRhSnMuV3JpdGFibGVUYXJnZXR9XG5cdFx0XHQgKi9cblx0XHRcdGFwcGx5VG8odGFyZ2V0KSB7XG5cdFx0XHRcdC8qIGFwcGx5IHRoZSBmaXJzdCBvdmVybG9hZCB0aGF0IGFwcGxpZXMgdG8gdGhlIHRhcmdldDsgZ2F0aGVyIGFueSBlcnJvcnMgKi9cblx0XHRcdFx0dmFyIGVycm9ycyA9IFtdO1xuXHRcdFx0XHR2YXIgc3VjY2VzcyA9IHRoaXMub3ZlcmxvYWRzLnNvbWUoKGRlbHRhKSA9PiB7XG5cdFx0XHRcdFx0dmFyIGp1ZGdtZW50ID0gdGhpc0RlbHRhSnMuX2V2YWx1YXRlUHJlY29uZGl0aW9uKGRlbHRhLCB0YXJnZXQpO1xuXHRcdFx0XHRcdGlmIChqdWRnbWVudCAhPT0gdHJ1ZSkge1xuXHRcdFx0XHRcdFx0ZXJyb3JzLnB1c2goanVkZ21lbnQpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkZWx0YS5hcHBseVRvKHRhcmdldCk7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHQvKiBpZiBub25lIGFwcGx5LCB0aHJvdyBhbiBhcHByb3ByaWF0ZSBlcnJvciAqL1xuXHRcdFx0XHRpZiAoIXN1Y2Nlc3MpIHtcblx0XHRcdFx0XHRpZiAoZXJyb3JzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0XHRgVGhpcyBvdmVybG9hZGVkIGRlbHRhIGhhcyBubyBvdmVybG9hZHMsIGAgK1xuXHRcdFx0XHRcdFx0XHRgc28gY2Fubm90IGFwcGx5IHRvIHRoZSB2YWx1ZTogJHt0YXJnZXQudmFsdWV9YFxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGVycm9ycy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHRcdHRocm93IGVycm9yc1swXTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0XHRgTm9uZSBvZiB0aGUgZGVsdGEgdHlwZXMgJHt0aGlzLnR5cGUuam9pbignLCcpfSBgICtcblx0XHRcdFx0XHRcdFx0YGFwcGx5IHRvIHRoZSB2YWx1ZTogJHt0YXJnZXQudmFsdWV9XFxuYCAgICAgICAgICAgK1xuXHRcdFx0XHRcdFx0XHRlcnJvcnMubWFwKGUgPT4gZS5tZXNzYWdlKS5qb2luKCdcXG4nKVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIEBwYXJhbSBpbmRlbnRMdmwge051bWJlcj99XG5cdFx0XHQgKiBAcGFyYW0gcHJvcCAgICAgIHtTdHJpbmc/fVxuXHRcdFx0ICovXG5cdFx0XHR0b1N0cmluZyhpbmRlbnRMdmwgPSAwLCBwcm9wID0gJyhyb290KScpIHtcblx0XHRcdFx0dmFyIHN0ciA9IERlbHRhLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMsIGluZGVudEx2bCwgcHJvcCk7XG5cdFx0XHRcdHN0ciArPSAnXFxuJyArIHRoaXMub3ZlcmxvYWRzXG5cdFx0XHRcdFx0XHQubWFwKChkZWx0YSkgPT4gZGVsdGEudG9TdHJpbmcoaW5kZW50THZsICsgMSwgbnVsbCkpXG5cdFx0XHRcdFx0XHQuam9pbignXFxuJyk7XG5cdFx0XHRcdHJldHVybiBzdHI7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T3ZlcmxvYWRlZERlbHRhLnR5cGUgPSBPdmVybG9hZGVkRGVsdGEucHJvdG90eXBlLnR5cGUgPSAnT3ZlcmxvYWRlZERlbHRhJztcblx0XHRPdmVybG9hZGVkRGVsdGEubWV0YSA9IE92ZXJsb2FkZWREZWx0YS5wcm90b3R5cGUubWV0YSA9IHtcblx0XHRcdG1ldGhvZHM6IFtdXG5cdFx0fTtcblx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKChkMSwgZDIpID0+IChkMSBpbnN0YW5jZW9mIE92ZXJsb2FkZWREZWx0YSB8fCBkMiBpbnN0YW5jZW9mIE92ZXJsb2FkZWREZWx0YSksIChkMSwgZDIpID0+IHtcblx0XHRcdHZhciBEMSA9IGQxIGluc3RhbmNlb2YgT3ZlcmxvYWRlZERlbHRhID8gZDEub3ZlcmxvYWRzIDogW2QxXTtcblx0XHRcdHZhciBEMiA9IGQyIGluc3RhbmNlb2YgT3ZlcmxvYWRlZERlbHRhID8gZDIub3ZlcmxvYWRzIDogW2QyXTtcblx0XHRcdHZhciByZXN1bHQgPSBuZXcgT3ZlcmxvYWRlZERlbHRhKCk7XG5cdFx0XHR2YXIgZXJyb3JzID0gW107XG5cdFx0XHREMS5mb3JFYWNoKChkZWx0YTEpID0+IHtcblx0XHRcdFx0RDIuZm9yRWFjaCgoZGVsdGEyKSA9PiB7XG5cdFx0XHRcdFx0dHJ5IHsgcmVzdWx0Lm92ZXJsb2Fkcy5wdXNoKGRlbHRhMS5jb21wb3NlKGRlbHRhMikpIH1cblx0XHRcdFx0XHRjYXRjaCAoZXJyb3IpIHsgZXJyb3JzLnB1c2goZXJyb3IpIH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHRcdGlmIChyZXN1bHQub3ZlcmxvYWRzLmxlbmd0aCA9PT0gMCkgeyB0aHJvdyBuZXcgRXJyb3IoZXJyb3JzLm1hcChlID0+IGUubWVzc2FnZSkuam9pbignXFxuJykpIH1cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSk7XG5cblxuXHRcdC8qIE1vZGlmeSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiBNb2RpZnkgKi9cblx0XHR2YXIgTW9kaWZ5ID0gdGhpcy5vcGVyYXRpb25zLk1vZGlmeSA9IFUubmV3U3ViY2xhc3ModGhpcy5EZWx0YSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIChfXywgbWV0YSkge1xuXHRcdFx0c3VwZXJGbi5jYWxsKHRoaXMsIF9fLCBtZXRhKTtcblx0XHRcdHRoaXMuZGVsdGFzID0ge307XG5cdFx0XHR0aGlzLl9jcmVhdGVPcGVyYXRpb25JbnRlcmZhY2UoKG1ldGhvZCwgW3BhdGhPck9wdGlvbnMsIGFyZ10pID0+IHtcblx0XHRcdFx0dmFyIG9wdGlvbnMgPSB0aGlzRGVsdGFKcy5fcHJvY2Vzc09wdGlvbnMocGF0aE9yT3B0aW9ucyk7XG5cdFx0XHRcdHZhciBkZWx0YSA9IHRoaXNEZWx0YUpzLl9nZXREZWx0YUJ5TWV0aG9kKG1ldGhvZCwgYXJnKTtcblx0XHRcdFx0dmFyIG5ld0RlbHRhID0gdGhpcy5fYWRkT3BlcmF0aW9uKG9wdGlvbnMsIGRlbHRhKTtcblx0XHRcdFx0cmV0dXJuIG5ld0RlbHRhLm9wZXJhdGlvbnMgPyBuZXdEZWx0YSA6IGRlbHRhO1xuXHRcdFx0fSk7XG5cdFx0fSwge1xuXHRcdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdFx0ICogQHJldHVybiB7RGVsdGFKcyNvcGVyYXRpb25zLk1vZGlmeX0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHRcdCAqL1xuXHRcdFx0Y2xvbmUoKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSB0aGlzRGVsdGFKcy5EZWx0YS5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCB0aGlzLmFyZywgdGhpcy5tZXRhKTsgLy8gc3VwZXIoKVxuXHRcdFx0XHRPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHRcdHJlc3VsdC5kZWx0YXNbcHJvcF0gPSB0aGlzLmRlbHRhc1twcm9wXS5jbG9uZSgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIEBwYXJhbSB0YXJnZXQgeyp9XG5cdFx0XHQgKi9cblx0XHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHtcblx0XHRcdFx0cmV0dXJuIHRhcmdldC52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdDtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIEBwYXJhbSB0YXJnZXQge0RlbHRhSnMuV3JpdGFibGVUYXJnZXR9XG5cdFx0XHQgKi9cblx0XHRcdGFwcGx5VG8odGFyZ2V0KSB7XG5cdFx0XHRcdFUuYXNzZXJ0KFUuaXNVbmRlZmluZWQodGhpcy5tZXRhLnRhcmdldCksXG5cdFx0XHRcdFx0XHRgVGFyZ2V0ZWQgZGVsdGFzIGNhbm5vdCBiZSBhcHBsaWVkIHRvIGFueXRoaW5nIG1hbnVhbGx5LmApO1xuXHRcdFx0XHRVLmFzc2VydChVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUpLFxuXHRcdFx0XHRcdFx0YFRoZSAnTW9kaWZ5JyBvcGVyYXRpb24gZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgZGVmaW5lZC5gKTtcblx0XHRcdFx0VS5hc3NlcnQodGFyZ2V0LnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0LFxuXHRcdFx0XHRcdFx0YFRoZSAnTW9kaWZ5JyBvcGVyYXRpb24gZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgYW4gT2JqZWN0LmApO1xuXHRcdFx0XHRPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuZGVsdGFzW3Byb3BdLmFwcGx5VG8od3QodGFyZ2V0LnZhbHVlLCBwcm9wKSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogQHBhcmFtIGluZGVudEx2bCB7TnVtYmVyP31cblx0XHRcdCAqIEBwYXJhbSBwcm9wICAgICAge1N0cmluZz99XG5cdFx0XHQgKi9cblx0XHRcdHRvU3RyaW5nKGluZGVudEx2bCA9IDAsIHByb3AgPSAnKHJvb3QpJykge1xuXHRcdFx0XHR2YXIgc3RyID0gRGVsdGEucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcywgaW5kZW50THZsLCBwcm9wKTtcblx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0c3RyICs9ICdcXG4nICsgT2JqZWN0LmtleXModGhpcy5kZWx0YXMpXG5cdFx0XHRcdFx0XHRcdC5tYXAoKHApID0+IHRoaXMuZGVsdGFzW3BdLnRvU3RyaW5nKGluZGVudEx2bCArIDEsIHApKVxuXHRcdFx0XHRcdFx0XHQuam9pbignXFxuJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHN0cjtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7T2JqZWN0fVxuXHRcdFx0ICogQHBhcmFtIGRlbHRhICAge0RlbHRhSnMjRGVsdGF9XG5cdFx0XHQgKi9cblx0XHRcdF9hZGRPcGVyYXRpb24ob3B0aW9ucywgZGVsdGEpIHtcblx0XHRcdFx0LyogcGFyc2UgdGhlIHBhdGggKi9cblx0XHRcdFx0dmFyIHtsZWFkLCBwcm9wLCByZXN0fSA9IHRoaXNEZWx0YUpzLl9wYXJzZVBhdGgob3B0aW9ucy5wYXRoKTtcblx0XHRcdFx0aWYgKGxlYWQgPT09ICcjJykge1xuXHRcdFx0XHRcdC8qIGlmICdwYXRoJyBoYXMgYSBsZWFkaW5nICcjJyBjaGFyYWN0ZXIsIHRyYW5zZm9ybSBpdCBhbmQgcmVjYWxsIHRoaXMgbWV0aG9kICovXG5cdFx0XHRcdFx0Ly8gdGhlICMgc2VwYXJhdG9yIGV4cGVjdHMgdGhlIGN1cnJlbnQgb2JqZWN0IHRvIGJlIGEgY29uc3RydWN0b3IgZnVuY3Rpb24sXG5cdFx0XHRcdFx0Ly8gYW5kIHlpZWxkcyBhIGRlbHRhIHRvIG1vZGlmeSBuZXcgaW5zdGFuY2VzIG9mIHRoZSBjb3JyZXNwb25kaW5nIGNsYXNzXG5cdFx0XHRcdFx0Ly8gVE9ETzogaW1wbGVtZW50IHRoYXQgdGhlIGAuKGluc3RhbmNlKS5gIG1lbWJlcnMgYXJlIGFjdHVhbGx5IGluY2x1ZGVkIGluIGluc3RhbmNlc1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9hZGRPcGVyYXRpb24oVS5leHRlbmQoe30sIG9wdGlvbnMsIHsgcGF0aDogYC4oaW5zdGFuY2UpLiR7cHJvcH0ke3Jlc3R9YCB9KSwgZGVsdGEpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHJlc3QubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdC8qIGlmIHRoZXJlIGlzIGEgbG9uZ2VyIGNoYWluLCBjYWxsIHRoaXMgbWV0aG9kIHJlY3Vyc2l2ZWx5ICovXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMub3BlcmF0aW9ucy5tb2RpZnkocHJvcCkuZGVsdGEuX2FkZE9wZXJhdGlvbihVLmV4dGVuZCh7fSwgb3B0aW9ucywgeyBwYXRoOiByZXN0IH0pLCBkZWx0YSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiBjb2RlIHRvIHJ1biBpZiB0aGlzIGRlbHRhIGlzIHRhcmdldGVkICovXG5cdFx0XHRcdC8vIEluIG9yZGVyIHRvIHByb2Nlc3MgZGVsdGEgY29tcG9zaXRpb25zIGxpa2Vcblx0XHRcdFx0Ly8gICAgIGRlbHRhLmFkZCgnb2JqJywge30pO1xuXHRcdFx0XHQvLyAgICAgZGVsdGEubW9kaWZ5KCdvYmonKTtcblx0XHRcdFx0Ly8gYW5kIHN0aWxsIHJldHVybiAnTW9kaWZ5JyBkZWx0YXMgdG8gdGhlIHVzZXIgZm9yIGZ1cnRoZXIgb3BlcmF0aW9ucyxcblx0XHRcdFx0Ly8gd2UgbmVlZCB0ZW1wb3JhcnkgJ01vZGlmeScgZGVsdGFzIHRoYXQgcmVtZW1iZXIgdGhlaXIgdGFyZ2V0LCB3aGljaFxuXHRcdFx0XHQvLyB3ZSB3aWxsIGNhbGwgJ3RhcmdldGVkIGRlbHRhcycuXG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh0aGlzLm1ldGEudGFyZ2V0KSkge1xuXHRcdFx0XHRcdC8qIGlmIHRoZSBuZXcgZGVsdGEgc2hvdWxkIGJlIGEgJ01vZGlmeScgZGVsdGEsIGl0IGlzIGEgdGFyZ2V0ZWQgZGVsdGEgKi9cblx0XHRcdFx0XHRpZiAoZGVsdGEudHlwZSA9PT0gJ01vZGlmeScpIHtcblx0XHRcdFx0XHRcdHJldHVybiAobmV3IE1vZGlmeShcblx0XHRcdFx0XHRcdFx0dW5kZWZpbmVkLFxuXHRcdFx0XHRcdFx0XHRVLmV4dGVuZCh7fSwgZGVsdGEubWV0YSwgeyB0YXJnZXQ6IHRoaXMubWV0YS50YXJnZXQuY2hhaW4ocHJvcCkgfSlcblx0XHRcdFx0XHRcdCkpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8qIGFwcGx5IHRoZSBuZXcgZGVsdGEgdG8gaXRzIHRhcmdldCwgZGlzY2FyZCBpdCBhbmQgcmV0dXJuICd0aGlzJyBkZWx0YSAqL1xuXHRcdFx0XHRcdGRlbHRhLmFwcGx5VG8odGhpcy5tZXRhLnRhcmdldC5jaGFpbihwcm9wKSk7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiBkbyB3ZSBuZWVkIHRvIGNvbXBvc2UgdGhlIG5ldyBkZWx0YSB3aXRoIGFuIGV4aXN0aW5nIG9uZT8gKi9cblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHRoaXMuZGVsdGFzW3Byb3BdKSkge1xuXHRcdFx0XHRcdHZhciBjb21wb3NpdGlvbiA9IHRoaXMuZGVsdGFzW3Byb3BdID0gdGhpcy5kZWx0YXNbcHJvcF0uY29tcG9zZShkZWx0YSk7XG5cblx0XHRcdFx0XHQvKiAgaWYgdGhlIHJlc3VsdCBzaG91bGQgYmUgYSAnTW9kaWZ5JyB0byBhY2NvbW1vZGF0ZSBmdXJ0aGVyIG9wZXJhdGlvbnMsICAgICAgICAgICAqL1xuXHRcdFx0XHRcdC8qICBidXQgdGhlIGNvbXBvc2l0aW9uIGlzbid0LCByZXR1cm4gYSAnTW9kaWZ5JyB0YXJnZXRlZCBhdCB0aGUgY29tcG9zaXRpb24gdmFsdWUgICovXG5cdFx0XHRcdFx0aWYgKGRlbHRhLnR5cGUgPT09ICdNb2RpZnknICYmIGNvbXBvc2l0aW9uLnR5cGUgIT09ICdNb2RpZnknKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gKG5ldyBNb2RpZnkodW5kZWZpbmVkLCBVLmV4dGVuZCh7fSwgZGVsdGEubWV0YSwgeyB0YXJnZXQ6IHd0KGNvbXBvc2l0aW9uLCAnYXJnJykgfSkpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZWx0YXNbcHJvcF0gPSBkZWx0YTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcy5kZWx0YXNbcHJvcF07XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0TW9kaWZ5LnR5cGUgPSBNb2RpZnkucHJvdG90eXBlLnR5cGUgPSAnTW9kaWZ5Jztcblx0XHRNb2RpZnkubWV0YSA9IE1vZGlmeS5wcm90b3R5cGUubWV0YSA9IHtcblx0XHRcdG1ldGhvZHM6IFsnbW9kaWZ5J11cblx0XHR9O1xuXHRcdHRoaXMuX29uTmV3T3BlcmF0aW9uVHlwZUxpc3RlbmVycy5mb3JFYWNoKChmbikgPT4geyBmbihNb2RpZnkpIH0pO1xuXG5cdFx0LyogYWRkIHRoaXMgbmV3IHR5cGUgdG8gdGhlIGxpc3Qgb2YgdHlwZXMgYXNzb2NpYXRlZCB3aXRoIGVhY2ggbWV0aG9kICovXG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KHRoaXMub3ZlcmxvYWRzWydtb2RpZnknXSkpIHsgdGhpcy5vdmVybG9hZHNbJ21vZGlmeSddID0gW10gfVxuXHRcdHRoaXMub3ZlcmxvYWRzWydtb2RpZnknXS5wdXNoKCdNb2RpZnknKTtcblxuXG5cdFx0Lyogc3RhbmRhcmQgb3BlcmF0aW9ucyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogc3RhbmRhcmQgb3BlcmF0aW9ucyAqL1xuXHRcdHRoaXMuX2RlZmluZVN0YW5kYXJkT3BlcmF0aW9uVHlwZXMoKTtcblxuXG5cdH0sIC8qKiBAbGVuZHMgRGVsdGFKcy5wcm90b3R5cGUgKi8gIHsgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIERlbHRhSnMucHJvdG90eXBlICovXG5cblx0XHQvLy8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQvLyAqXG5cdFx0Ly8gKi9cblx0XHQvL3ZwKHZwTmFtZSwgdmFsKSB7XG5cdFx0Ly9cdC8vIFRPRE9cblx0XHQvL30sXG5cblx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBwYXRoICB7U3RyaW5nfVxuXHRcdCAqIEByZXR1cm4ge3tsZWFkOiBTdHJpbmcsIHByb3A6IFN0cmluZywgcmVzdDogU3RyaW5nfX1cblx0XHQgKi9cblx0XHRfcGFyc2VQYXRoKHBhdGgpIHtcblx0XHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyAgMTExMTEgIDIyMjIyMjIyMjIyICAzMyAgLy9cblx0XHRcdHZhciBtYXRjaCA9IHBhdGgubWF0Y2goL14oWy4jXT8pKFxcdyt8XFwoXFx3K1xcKSkoLiopJC8pO1xuXHRcdFx0VS5hc3NlcnQobWF0Y2gsIGBUaGUgcGF0aCBzdHJpbmcgJyR7cGF0aH0nIGlzIG5vdCB3ZWxsIGZvcm1lZC5gKTtcblx0XHRcdHZhciBbLCBsZWFkLCBwcm9wLCByZXN0XSA9IG1hdGNoO1xuXHRcdFx0cmV0dXJuIHtsZWFkLCBwcm9wLCByZXN0fTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gcGF0aE9yT3B0aW9ucyB7U3RyaW5nfHtwYXRoOiBTdHJpbmd9fVxuXHRcdCAqIEByZXR1cm4ge09iamVjdH1cblx0XHQgKi9cblx0XHRfcHJvY2Vzc09wdGlvbnMocGF0aE9yT3B0aW9ucykge1xuXHRcdFx0aWYgKHR5cGVvZiBwYXRoT3JPcHRpb25zID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRyZXR1cm4geyBwYXRoOiBwYXRoT3JPcHRpb25zIH07XG5cdFx0XHR9IGVsc2UgaWYgKHBhdGhPck9wdGlvbnMgaW5zdGFuY2VvZiBPYmplY3QpIHtcblx0XHRcdFx0cmV0dXJuIHBhdGhPck9wdGlvbnM7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0YFRoZSBvcHRpb25zIGFyZ3VtZW50IG9uIGEgZGVsdGEgb3BlcmF0aW9uIGAgK1xuXHRcdFx0XHRcdGBhIHNob3VsZCBiZSBhIHBhdGggc3RyaW5nIG9yIGFuIG9wdGlvbnMgb2JqZWN0LmBcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gbWV0aG9kIHtTdHJpbmd9XG5cdFx0ICogQHBhcmFtIGFyZyAgICB7Kn1cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfVxuXHRcdCAqL1xuXHRcdF9nZXREZWx0YUJ5TWV0aG9kKG1ldGhvZCwgYXJnKSB7XG5cdFx0XHR2YXIgbmV3RGVsdGFzID0gdGhpcy5vdmVybG9hZHNbbWV0aG9kXVxuXHRcdFx0XHQubWFwKHR5cGUgPT4gbmV3IHRoaXMub3BlcmF0aW9uc1t0eXBlXShhcmcsIHsgbWV0aG9kIH0pKTtcblx0XHRcdGlmIChuZXdEZWx0YXMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiBuZXdEZWx0YXNbMF07XG5cdFx0XHR9IGVsc2UgeyAvLyBuZXdEZWx0YXMubGVuZ3RoID4gMVxuXHRcdFx0XHR2YXIgZGVsdGEgPSBuZXcgdGhpcy5vcGVyYXRpb25zLk92ZXJsb2FkZWREZWx0YShhcmcsIHsgbWV0aG9kIH0pO1xuXHRcdFx0XHRkZWx0YS5vdmVybG9hZHMgPSBuZXdEZWx0YXM7XG5cdFx0XHRcdHJldHVybiBkZWx0YTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gZGVsdGEgIHtEZWx0YUpzI0RlbHRhfVxuXHRcdCAqIEBwYXJhbSB0YXJnZXQge0RlbHRhSnMuUmVhZGFibGVUYXJnZXR9XG5cdFx0ICovXG5cdFx0X2V2YWx1YXRlUHJlY29uZGl0aW9uKGRlbHRhLCB0YXJnZXQpIHtcblx0XHRcdGlmICh0eXBlb2YgZGVsdGEucHJlY29uZGl0aW9uID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdHZhciBqdWRnbWVudCA9IGRlbHRhLnByZWNvbmRpdGlvbih0YXJnZXQpO1xuXHRcdFx0XHRpZiAoanVkZ21lbnQgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdFx0XHRcdHJldHVybiBqdWRnbWVudDtcblx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YganVkZ21lbnQgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG5ldyBUeXBlRXJyb3IoanVkZ21lbnQpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCFqdWRnbWVudCkge1xuXHRcdFx0XHRcdHJldHVybiBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHRcdFx0XHRgVGhlIHZhbHVlICcke3RhcmdldC52YWx1ZX0nIGRvZXMgbm90IHNhdGlzZnkgYCArXG5cdFx0XHRcdFx0XHRcdGB0aGUgcHJlY29uZGl0aW9uIG9mIHRoZSAnJHtuYW1lfScgb3BlcmF0aW9uLmBcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBuYW1lICAgIHtTdHJpbmd9XG5cdFx0ICogQHBhcmFtIGFwcGx5VG8geyhEZWx0YUpzLldyaXRhYmxlVGFyZ2V0KSA9PiB1bmRlZmluZWR9XG5cdFx0ICovXG5cdFx0bmV3T3BlcmF0aW9uVHlwZShuYW1lLCB7Y29uc3RydWN0LCBwcmVjb25kaXRpb24sIGFwcGx5VG86IGZvcmNlQXBwbHlUbywgbWV0aG9kcywgY2xvbmV9LCBwcm90b3R5cGUgPSB7fSkge1xuXG5cdFx0XHQvKiAndGhpcycgYWxpYXMgKi9cblx0XHRcdHZhciB0aGlzRGVsdGFKcyA9IHRoaXM7XG5cblx0XHRcdC8qIHNhbml0eSBjaGVja3MgKi9cblx0XHRcdFUuYXNzZXJ0KCF0aGlzLm9wZXJhdGlvbnNbbmFtZV0sXG5cdFx0XHRcdFx0YFRoZSAnJHtuYW1lfScgb3BlcmF0aW9uIHR5cGUgYWxyZWFkeSBleGlzdHMuYCk7XG5cblx0XHRcdC8qIERlbHRhIHN1YmNsYXNzICovXG5cdFx0XHR2YXIgY2xzID0gdGhpcy5vcGVyYXRpb25zW25hbWVdID0gVS5uZXdTdWJjbGFzcyh0aGlzLkRlbHRhLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKGFyZywgbWV0YSkge1xuXHRcdFx0XHRzdXBlckZuLmNhbGwodGhpcywgYXJnLCBtZXRhKTtcblx0XHRcdFx0aWYgKGNvbnN0cnVjdCkgeyBjb25zdHJ1Y3QuY2FsbCh0aGlzKSB9XG5cdFx0XHR9LCBVLmV4dGVuZCh7XG5cdFx0XHRcdHByZWNvbmRpdGlvbjogcHJlY29uZGl0aW9uLFxuXHRcdFx0XHRhcHBseVRvKHRhcmdldCkge1xuXHRcdFx0XHRcdHZhciBqdWRnbWVudCA9IHRoaXNEZWx0YUpzLl9ldmFsdWF0ZVByZWNvbmRpdGlvbih0aGlzLCB0YXJnZXQpO1xuXHRcdFx0XHRcdGlmIChqdWRnbWVudCAhPT0gdHJ1ZSkgeyB0aHJvdyBqdWRnbWVudCB9XG5cdFx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKGZvcmNlQXBwbHlUbykpIHsgZm9yY2VBcHBseVRvLmNhbGwodGhpcywgdGFyZ2V0KSB9XG5cdFx0XHRcdH1cblx0XHRcdH0sIHByb3RvdHlwZSkpO1xuXHRcdFx0Y2xzLnR5cGUgPSBjbHMucHJvdG90eXBlLnR5cGUgPSBuYW1lO1xuXHRcdFx0Y2xzLm1ldGEgPSBjbHMucHJvdG90eXBlLm1ldGEgPSB7XG5cdFx0XHRcdC8vIGlmIG5vIG1ldGhvZHMgYXJlIHByb3ZpZGVkLCB1c2UgdGhlIG9wZXJhdGlvbiBuYW1lIHN0YXJ0aW5nIHdpdGggYSBsb3dlcmNhc2UgbGV0dGVyXG5cdFx0XHRcdG1ldGhvZHM6IG1ldGhvZHMgfHwgWyBuYW1lWzBdLnRvTG93ZXJDYXNlKCkrbmFtZS5zbGljZSgxKSBdXG5cdFx0XHR9O1xuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKGNsb25lKSkgeyBjbHMucHJvdG90eXBlLmNsb25lID0gY2xvbmUgfVxuXG5cdFx0XHQvKiBhZGQgdGhpcyBuZXcgdHlwZSB0byB0aGUgbGlzdCBvZiB0eXBlcyBhc3NvY2lhdGVkIHdpdGggZWFjaCBtZXRob2QgKi9cblx0XHRcdGNscy5tZXRhLm1ldGhvZHMuZm9yRWFjaCgobWV0aG9kKSA9PiB7XG5cdFx0XHRcdGlmICghQXJyYXkuaXNBcnJheSh0aGlzLm92ZXJsb2Fkc1ttZXRob2RdKSkgeyB0aGlzLm92ZXJsb2Fkc1ttZXRob2RdID0gW10gfVxuXHRcdFx0XHR0aGlzLm92ZXJsb2Fkc1ttZXRob2RdLnB1c2gobmFtZSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Lyogbm90aWZ5IGxpc3RlbmVycyAqL1xuXHRcdFx0dGhpcy5fb25OZXdPcGVyYXRpb25UeXBlTGlzdGVuZXJzLmZvckVhY2goKGZuKSA9PiB7IGZuKGNscykgfSk7XG5cblx0XHRcdC8qIHJldHVybiB0aGUgbmV3IGNsYXNzICovXG5cdFx0XHRyZXR1cm4gY2xzO1xuXG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gZm4geyhGdW5jdGlvbikgPT4gdW5kZWZpbmVkfSAtIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHN1YmNsYXNzIG9mIGBEZWx0YUpzI0RlbHRhYFxuXHRcdCAqL1xuXHRcdG9uTmV3T3BlcmF0aW9uVHlwZShmbikge1xuXHRcdFx0dGhpcy5fb25OZXdPcGVyYXRpb25UeXBlTGlzdGVuZXJzLnB1c2goZm4pO1xuXHRcdFx0T2JqZWN0LmtleXModGhpcy5vcGVyYXRpb25zKS5mb3JFYWNoKChuYW1lKSA9PiB7XG5cdFx0XHRcdGZuKHRoaXMub3BlcmF0aW9uc1tuYW1lXSk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBwcmVjb25kaXRpb24geyhEZWx0YUpzI0RlbHRhLCBEZWx0YUpzI0RlbHRhKSA9PiBCb29sZWFufSAtIGNhbiB0aGVzZSBkZWx0YXMgYmUgY29tcG9zZWQgdGhpcyB3YXk/XG5cdFx0ICogQHBhcmFtIGNvbXBvc2UgICAgICB7KERlbHRhSnMjRGVsdGEsIERlbHRhSnMjRGVsdGEpID0+IERlbHRhSnMjRGVsdGF9IC0gc2hvdWxkIGJlIHNpZGUtZWZmZWN0IGZyZWVcblx0XHQgKi9cblx0XHRuZXdDb21wb3NpdGlvbihwcmVjb25kaXRpb24sIGNvbXBvc2UpIHtcblx0XHRcdHRoaXMuY29tcG9zaXRpb25zLnB1c2goe3ByZWNvbmRpdGlvbiwgY29tcG9zZX0pO1xuXHRcdH0sXG5cblx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdCAqXG5cdFx0ICovXG5cdFx0X2RlZmluZVN0YW5kYXJkT3BlcmF0aW9uVHlwZXMoKSB7XG5cblx0XHRcdC8qICd0aGlzJyBhbGlhcyAqL1xuXHRcdFx0dmFyIHRoaXNEZWx0YUpzID0gdGhpcztcblxuXHRcdFx0LyogY29udmVuaWVuY2UgZGVmaW5pdGlvbnMgZm9yIHRoZSBhcHBsaWNhdGlvbiBhbmQgY29tcG9zaXRpb24gZnVuY3Rpb25zIGJlbG93ICovXG5cdFx0XHRmdW5jdGlvbiB0KHR5cGUxLCB0eXBlMikgeyByZXR1cm4gKGQxLCBkMikgPT4gKGQxLnR5cGUgPT09IHR5cGUxICYmIGQyLnR5cGUgPT09IHR5cGUyKSB9XG5cdFx0XHRmdW5jdGlvbiBkKHR5cGUsIGZuID0gbnVsbCkge1xuXHRcdFx0XHRpZiAodHlwZW9mIGZuID09PSAnc3RyaW5nJykgeyBmbiA9ICgodikgPT4gKG8pID0+IG9bdl0pKGZuKSB9XG5cdFx0XHRcdGlmIChmbikge1xuXHRcdFx0XHRcdHJldHVybiAoZDEsIGQyKSA9PiBuZXcgKHRoaXNEZWx0YUpzLm9wZXJhdGlvbnNbdHlwZV0pKGZuKHtkMSwgZDIsIHAxOiBkMS5hcmcsIHAyOiBkMi5hcmd9KSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuIChkMSwgZDIpID0+IG5ldyAodGhpc0RlbHRhSnMub3BlcmF0aW9uc1t0eXBlXSkoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHRcdC8qIGRlY2xhcmluZyB0aGUgYmFzaWMgb3BlcmF0aW9uIHR5cGVzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFx0XHQvLyAnTW9kaWZ5JyBpcyB0aGUgbW9zdCBmdW5kYW1lbnRhbCBvcGVyYXRpb24sXG5cdFx0XHQvLyAgYW5kIGlzIGRlZmluZWQgYWJvdmUgcmF0aGVyIHRoYW4gaGVyZVxuXHRcdFx0dGhpcy5uZXdPcGVyYXRpb25UeXBlKCdBZGQnLCB7XG5cdFx0XHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0ICYmIFUuaXNVbmRlZmluZWQodGFyZ2V0LnZhbHVlKSB9LFxuXHRcdFx0XHRhcHBseVRvKHRhcmdldCkgeyB0YXJnZXQudmFsdWUgPSB0aGlzLmFyZyB9XG5cdFx0XHR9KTtcblx0XHRcdHRoaXMubmV3T3BlcmF0aW9uVHlwZSgnUmVtb3ZlJywge1xuXHRcdFx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBXcml0YWJsZVRhcmdldCAmJiBVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUpIH0sXG5cdFx0XHRcdGFwcGx5VG8odGFyZ2V0KSB7IHRhcmdldC5kZWxldGUoKSB9XG5cdFx0XHR9KTtcblx0XHRcdHRoaXMubmV3T3BlcmF0aW9uVHlwZSgnRm9yYmlkJywge1xuXHRcdFx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiBVLmlzVW5kZWZpbmVkKHRhcmdldC52YWx1ZSkgfVxuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLm5ld09wZXJhdGlvblR5cGUoJ1JlcGxhY2UnLCB7XG5cdFx0XHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0ICYmIFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgfSxcblx0XHRcdFx0YXBwbHlUbyh0YXJnZXQpIHsgdGFyZ2V0LnZhbHVlID0gdGhpcy5hcmcgfVxuXHRcdFx0fSk7XG5cblx0XHRcdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ01vZGlmeScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknLCAnTW9kaWZ5JyksIChkMSwgZDIpID0+IHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IGQxLmNsb25lKCk7XG5cdFx0XHRcdE9iamVjdC5rZXlzKGQyLmRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHRcdHJlc3VsdC5kZWx0YXNbcHJvcF0uY29tcG9zZShkMi5kZWx0YXNbcHJvcF0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdBZGQnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJywgJ01vZGlmeScpLCBkKCdBZGQnLCAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cblx0XHRcdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1JlbW92ZScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknLCAnUmVtb3ZlJyksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgLCAnUmVtb3ZlJyksIGQoJ0ZvcmJpZCcpICAgICAgICAgICAgICAgICk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnLCAnQWRkJyAgICksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICk7XG5cblx0XHRcdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ0ZvcmJpZCcgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnLCAnRm9yYmlkJyksIGQoJ1JlbW92ZScpICAgICAgICAgICAgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcsICdBZGQnICAgKSwgZCgnQWRkJywgKHtwMn0pID0+IHAyKSApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJywgJ0ZvcmJpZCcpLCBkKCdGb3JiaWQnKSAgICAgICAgICAgICk7XG5cblx0XHRcdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1JlcGxhY2UnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknICwgJ1JlcGxhY2UnKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICAgICAgICAgICAgICAgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAgLCAnUmVwbGFjZScpLCBkKCdBZGQnLCAgICAgKHtwMn0pID0+IHAyKSAgICAgICAgICAgICAgICAgICApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdNb2RpZnknICksIGQoJ1JlcGxhY2UnLCAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ1JlbW92ZScgKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnUmVwbGFjZScpLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICAgICAgICAgICAgICApO1xuXHRcdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRcdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0XHQvKiBkZWNsYXJpbmcgdGhlIGFycmF5IG9wZXJhdGlvbiB0eXBlICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0dGhpcy5uZXdPcGVyYXRpb25UeXBlKCdQdXRJbnRvQXJyYXknLCB7XG5cdFx0XHRcdGNvbnN0cnVjdCgpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5tZXRhLm1ldGhvZCkge1xuXHRcdFx0XHRcdFx0dGhpcy52YWx1ZXMgPSBbe1xuXHRcdFx0XHRcdFx0XHRtZXRob2Q6IHRoaXMubWV0YS5tZXRob2QsXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiB0aGlzLmFyZ1xuXHRcdFx0XHRcdFx0fV07XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsdWVzID0gW107XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRjbG9uZSgpIHtcblx0XHRcdFx0XHR2YXIgcmVzdWx0ID0gdGhpc0RlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMubWV0YSk7IC8vIHN1cGVyKClcblx0XHRcdFx0XHRyZXN1bHQudmFsdWVzID0gW107XG5cdFx0XHRcdFx0dGhpcy52YWx1ZXMuZm9yRWFjaCgodikgPT4geyByZXN1bHQudmFsdWVzLnB1c2godikgfSk7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fSxcblx0XHRcdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gVS5pc0RlZmluZWQodGFyZ2V0LnZhbHVlKSAmJiBBcnJheS5pc0FycmF5KHRhcmdldC52YWx1ZSkgfSxcblx0XHRcdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdFx0XHR2YXIgYXJyID0gdGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHttZXRob2QsIHZhbHVlfSkgPT4ge1xuXHRcdFx0XHRcdFx0c3dpdGNoIChtZXRob2QpIHtcblx0XHRcdFx0XHRcdFx0Y2FzZSAncHJlcGVuZCc6IHtcblx0XHRcdFx0XHRcdFx0XHRhcnIudW5zaGlmdCh2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0XHRcdGNhc2UgJ2luc2VydCc6IHtcblx0XHRcdFx0XHRcdFx0XHQvLyAnaW5zZXJ0JyBkb2Vzbid0ICpoYXZlKiB0byB1c2UgYSByYW5kb20gcG9zaXRpb24uIEFueSBwb3NpdGlvbiB3aWxsIGRvLlxuXHRcdFx0XHRcdFx0XHRcdC8vICBFLmcuLCBpdHMgaW1wbGVtZW50YXRpb24gY291bGQganVzdCBiZSB0aGUgc2FtZSBhcyBmb3IgJ2FwcGVuZCcuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gIE5vbmV0aGVsZXNzLCB3ZSB1c2UgYSByYW5kb20gcG9zaXRpb24gdG8gZm9yY2UgdGhlIHRlc3RzIHRvIGJlIHBlcm1pc3NpdmUuXG5cdFx0XHRcdFx0XHRcdFx0dmFyIHBvc2l0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGFyci5sZW5ndGggKyAxKSk7XG5cdFx0XHRcdFx0XHRcdFx0YXJyLnNwbGljZShwb3NpdGlvbiwgMCwgdmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRjYXNlICdhcHBlbmQnOiB7XG5cdFx0XHRcdFx0XHRcdFx0YXJyLnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRtZXRob2RzOiBbJ3ByZXBlbmQnLCAnaW5zZXJ0JywgJ2FwcGVuZCddXG5cdFx0XHR9KTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUHV0SW50b0FycmF5JyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAgLCAnUHV0SW50b0FycmF5JyAgICApLCBkKCdBZGQnLCAgICAgKHtkMiwgcDF9KSA9PiBkMi5hcHBsaWVkVG8ocDEpKSApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdQdXRJbnRvQXJyYXknICAgICksIGQoJ1JlcGxhY2UnLCAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknICAgICwgJ1JlbW92ZScgKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScgICAgLCAnUmVwbGFjZScpLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICAgICAgICAgICAgICApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JyAgICAsICdQdXRJbnRvQXJyYXknICAgICksIChkMSwgZDIpID0+IHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IG5ldyB0aGlzRGVsdGFKcy5vcGVyYXRpb25zLlB1dEludG9BcnJheSgpO1xuXHRcdFx0XHRyZXN1bHQudmFsdWVzID0gKGQxLnZhbHVlcykuY29uY2F0KGQyLnZhbHVlcyk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9KTtcblx0XHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0XHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdFx0LyogZGVjbGFyaW5nIHRoZSBmdW5jdGlvbiBvcGVyYXRpb24gdHlwZSAqL1xuXHRcdFx0dGhpcy5uZXdPcGVyYXRpb25UeXBlKCdQdXRJbnRvRnVuY3Rpb24nLCB7XG5cdFx0XHRcdGNvbnN0cnVjdCgpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5tZXRhLm1ldGhvZCkge1xuXHRcdFx0XHRcdFx0dGhpcy52YWx1ZXMgPSBbe1xuXHRcdFx0XHRcdFx0XHRtZXRob2Q6IHRoaXMubWV0YS5tZXRob2QsXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiB0aGlzLmFyZ1xuXHRcdFx0XHRcdFx0fV07XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsdWVzID0gW107XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRjbG9uZSgpIHtcblx0XHRcdFx0XHR2YXIgcmVzdWx0ID0gdGhpc0RlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMubWV0YSk7IC8vIHN1cGVyKClcblx0XHRcdFx0XHRyZXN1bHQudmFsdWVzID0gW107XG5cdFx0XHRcdFx0dGhpcy52YWx1ZXMuZm9yRWFjaCgodikgPT4geyByZXN1bHQudmFsdWVzLnB1c2godikgfSk7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fSxcblx0XHRcdFx0cHJlY29uZGl0aW9uKHRhcmdldCkge1xuXHRcdFx0XHRcdHJldHVybiBVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUpICYmIHR5cGVvZiB0YXJnZXQudmFsdWUgPT09ICdmdW5jdGlvbicgJiZcblx0XHRcdFx0XHRcdFx0KFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZS5fRGVsdGFKc19mdW5jdGlvbnMpIHx8IHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0KTtcblx0XHRcdFx0fSxcblx0XHRcdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdFx0XHRpZiAoVS5pc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUuX0RlbHRhSnNfZnVuY3Rpb25zKSkge1xuXHRcdFx0XHRcdFx0dmFyIG9yaWdpbmFsRm4gPSB0YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0XHR2YXIgbmV3Rm4gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdFx0XHR2YXIgcmVzdWx0O1xuXHRcdFx0XHRcdFx0XHRuZXdGbi5fRGVsdGFKc19mdW5jdGlvbnMuZm9yRWFjaCgoZm4pID0+IHtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkQXNzaWdubWVudFxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdG5ld0ZuLl9EZWx0YUpzX2Z1bmN0aW9ucyA9IFtmdW5jdGlvbiAoLi4uYXJncykgeyBvcmlnaW5hbEZuLmFwcGx5KHRoaXMsIGFyZ3MpIH1dO1xuXHRcdFx0XHRcdFx0dGFyZ2V0LnZhbHVlID0gbmV3Rm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHZhciBhcnIgPSB0YXJnZXQudmFsdWUuX0RlbHRhSnNfZnVuY3Rpb25zO1xuXHRcdFx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHttZXRob2QsIHZhbHVlfSkgPT4ge1xuXHRcdFx0XHRcdFx0c3dpdGNoIChtZXRob2QpIHtcblx0XHRcdFx0XHRcdFx0Y2FzZSAncHJlcGVuZCc6IHtcblx0XHRcdFx0XHRcdFx0XHRhcnIudW5zaGlmdCh2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0XHRcdGNhc2UgJ2luc2VydCc6IHtcblx0XHRcdFx0XHRcdFx0XHQvLyAnaW5zZXJ0JyBkb2Vzbid0ICpoYXZlKiB0byB1c2UgYSByYW5kb20gcG9zaXRpb24uIEFueSBwb3NpdGlvbiB3aWxsIGRvLlxuXHRcdFx0XHRcdFx0XHRcdC8vICBFLmcuLCBpdHMgaW1wbGVtZW50YXRpb24gY291bGQganVzdCBiZSB0aGUgc2FtZSBhcyBmb3IgJ2FwcGVuZCcuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gIE5vbmV0aGVsZXNzLCB3ZSB1c2UgYSByYW5kb20gcG9zaXRpb24gdG8gZm9yY2UgdGhlIHRlc3RzIHRvIGJlIHBlcm1pc3NpdmUuXG5cdFx0XHRcdFx0XHRcdFx0dmFyIHBvc2l0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGFyci5sZW5ndGggKyAxKSk7XG5cdFx0XHRcdFx0XHRcdFx0YXJyLnNwbGljZShwb3NpdGlvbiwgMCwgdmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRjYXNlICdhcHBlbmQnOiB7XG5cdFx0XHRcdFx0XHRcdFx0YXJyLnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRtZXRob2RzOiBbJ3ByZXBlbmQnLCAnaW5zZXJ0JywgJ2FwcGVuZCddXG5cdFx0XHR9KTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUHV0SW50b0Z1bmN0aW9uJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAgICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgZCgnQWRkJywgICAgICh7ZDIsIHAxfSkgPT4gZDIuYXBwbGllZFRvKHAxKSkgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgZCgnUmVwbGFjZScsICh7ZDIsIHAxfSkgPT4gZDIuYXBwbGllZFRvKHAxKSkgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdSZW1vdmUnICAgICAgICAgKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdSZXBsYWNlJyAgICAgICAgKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICAgICAgICAgICAgICAgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdQdXRJbnRvRnVuY3Rpb24nKSwgKGQxLCBkMikgPT4ge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gbmV3IHRoaXNEZWx0YUpzLm9wZXJhdGlvbnMuUHV0SW50b0Z1bmN0aW9uKCk7XG5cdFx0XHRcdHJlc3VsdC52YWx1ZXMgPSAoZDEudmFsdWVzKS5jb25jYXQoZDIudmFsdWVzKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0pO1xuXHRcdFx0Ly8gVE9ETzogQ2hhbmdlICdhcHBlbmQnIGFuZCAncHJlcGVuZCcgdG8gZm9sbG93IGFueSB1bmRlcmx5aW5nIHBhcnRpYWwgb3JkZXIgKGRlbHRhIG1vZGVsKVxuXHRcdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRcdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0XHQvLy8qIGRlY2xhcmluZyB0aGUgJ0RlbHRhTW9kZWwnIHR5cGUgKi9cblx0XHRcdC8vdmFyIERlbHRhTW9kZWwgPSB0aGlzLm5ld09wZXJhdGlvblR5cGUoJ0RlbHRhTW9kZWwnLCB7XG5cdFx0XHQvL1x0Y29uc3RydWN0KCkge1xuXHRcdFx0Ly9cdFx0dGhpcy5ncmFwaCA9IG5ldyBKc0dyYXBoKCk7XG5cdFx0XHQvL1x0XHR0aGlzLl9jcmVhdGVPcGVyYXRpb25JbnRlcmZhY2UoKG1ldGhvZCwgW25hbWUsIHBhdGhPck9wdGlvbnMsIGFyZ10pID0+IHtcblx0XHRcdC8vXHRcdHZhciBvcHRpb25zID0gdGhpc0RlbHRhSnMuX3Byb2Nlc3NPcHRpb25zKHBhdGhPck9wdGlvbnMpO1xuXHRcdFx0Ly9cdFx0dmFyIGRlbHRhID0gdGhpc0RlbHRhSnMuX2dldERlbHRhQnlNZXRob2QobWV0aG9kLCBhcmcpO1xuXHRcdFx0Ly9cdFx0dmFyIG5ld0RlbHRhID0gdGhpcy5fYWRkT3BlcmF0aW9uKG9wdGlvbnMsIGRlbHRhKTtcblx0XHRcdC8vXHRcdHJldHVybiBuZXdEZWx0YS5vcGVyYXRpb25zID8gbmV3RGVsdGEgOiBkZWx0YTtcblx0XHRcdC8vXHRcdH0pO1xuXHRcdFx0Ly9cdH0sXG5cdFx0XHQvL1x0Y2xvbmUoKSB7XG5cdFx0XHQvL1x0XHR2YXIgcmVzdWx0ID0gbmV3IERlbHRhTW9kZWwoKTtcblx0XHRcdC8vXHRcdHJlc3VsdC5ncmFwaCA9IHRoaXMuZ3JhcGguY2xvbmUoKTtcblx0XHRcdC8vXHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHQvL1x0fSxcblx0XHRcdC8vXHRhcHBseVRvKHRhcmdldCkge1xuXHRcdFx0Ly9cdFx0dGhpcy5ncmFwaC50b3BvbG9naWNhbGx5KChuYW1lLCBzdWJEZWx0YSkgPT4ge1xuXHRcdFx0Ly9cdFx0XHRzdWJEZWx0YS5hcHBseVRvKHRhcmdldCk7XG5cdFx0XHQvL1x0XHR9KTtcblx0XHRcdC8vXHR9XG5cdFx0XHQvL30sIHtcblx0XHRcdC8vXHRfYWRkT3BlcmF0aW9uKG5hbWUsIG9wdGlvbnMsIGRlbHRhKSB7XG5cdFx0XHQvL1x0XHQvKiBwYXJzZSB0aGUgcGF0aCAqL1xuXHRcdFx0Ly9cdFx0dmFyIHtsZWFkLCBwcm9wLCByZXN0fSA9IHRoaXNEZWx0YUpzLl9wYXJzZVBhdGgob3B0aW9ucy5wYXRoKTtcblx0XHRcdC8vXHRcdGlmIChsZWFkID09PSAnIycpIHtcblx0XHRcdC8vXHRcdFx0LyogaWYgJ3BhdGgnIGhhcyBhIGxlYWRpbmcgJyMnIGNoYXJhY3RlciwgdHJhbnNmb3JtIGl0IGFuZCByZWNhbGwgdGhpcyBtZXRob2QgKi9cblx0XHRcdC8vXHRcdFx0Ly8gdGhlICMgc2VwYXJhdG9yIGV4cGVjdHMgdGhlIGN1cnJlbnQgb2JqZWN0IHRvIGJlIGEgY29uc3RydWN0b3IgZnVuY3Rpb24sXG5cdFx0XHQvL1x0XHRcdC8vIGFuZCB5aWVsZHMgYSBkZWx0YSB0byBtb2RpZnkgbmV3IGluc3RhbmNlcyBvZiB0aGUgY29ycmVzcG9uZGluZyBjbGFzc1xuXHRcdFx0Ly9cdFx0XHQvLyBUT0RPOiBpbXBsZW1lbnQgdGhhdCB0aGUgYC4oaW5zdGFuY2UpLmAgbWVtYmVycyBhcmUgYWN0dWFsbHkgaW5jbHVkZWQgaW4gaW5zdGFuY2VzXG5cdFx0XHQvL1x0XHRcdHJldHVybiB0aGlzLl9hZGRPcGVyYXRpb24oVS5leHRlbmQoe30sIG9wdGlvbnMsIHsgcGF0aDogYC4oaW5zdGFuY2UpLiR7cHJvcH0ke3Jlc3R9YCB9KSwgZGVsdGEpO1xuXHRcdFx0Ly9cdFx0fSBlbHNlIGlmIChyZXN0Lmxlbmd0aCA+IDApIHtcblx0XHRcdC8vXHRcdFx0LyogaWYgdGhlcmUgaXMgYSBsb25nZXIgY2hhaW4sIGNhbGwgdGhpcyBtZXRob2QgcmVjdXJzaXZlbHkgKi9cblx0XHRcdC8vXHRcdFx0cmV0dXJuIHRoaXMub3BlcmF0aW9ucy5tb2RpZnkocHJvcCkuZGVsdGEuX2FkZE9wZXJhdGlvbihVLmV4dGVuZCh7fSwgb3B0aW9ucywgeyBwYXRoOiByZXN0IH0pLCBkZWx0YSk7XG5cdFx0XHQvL1x0XHR9XG5cdFx0XHQvL1xuXHRcdFx0Ly9cdFx0Ly8gVE9ET1xuXHRcdFx0Ly9cblx0XHRcdC8vXG5cdFx0XHQvL1xuXHRcdFx0Ly9cblx0XHRcdC8vXHRcdC8qIGFkZCBpdCB0byB0aGUgZGVsdGEgbW9kZWwgKi9cblx0XHRcdC8vXHRcdHRoaXMuZ3JhcGguYWRkTmV3VmVydGV4KG5hbWUsIGRlbHRhKTsgLy8gVE9ETzogc2hvdWxkIGJlIGRlbHRhIGNoYWluIGJhc2VkIG9uIHBhdGhcblx0XHRcdC8vXG5cdFx0XHQvL1xuXHRcdFx0Ly9cdFx0cmV0dXJuIGRlbHRhO1xuXHRcdFx0Ly9cdH1cblx0XHRcdC8vfSk7XG5cdFx0XHQvL1xuXHRcdFx0Ly8vKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdEZWx0YU1vZGVsJyAqL1xuXHRcdFx0Ly8vLyB0byBjb21wb3NlIGRlbHRhIG1vZGVscywgd2Ugc2ltcGx5IGhhdmUgb25lIGFwcGx5IGFmdGVyIHRoZSBvdGhlclxuXHRcdFx0Ly8vLyB3aXRob3V0IGFueSBjb21wb3NhYmlsaXR5IGNoZWNrczsgaW4gdGhlIGZ1dHVyZSwgdGhpcyBtYXkgYmVjb21lIG1vcmUgY2xldmVyXG5cdFx0XHQvL3RoaXMubmV3Q29tcG9zaXRpb24oKGQxLCBkMikgPT4gKGQxIGluc3RhbmNlb2YgRGVsdGFNb2RlbCB8fCBkMiBpbnN0YW5jZW9mIERlbHRhTW9kZWwpLCAoZDEsIGQyKSA9PiB7XG5cdFx0XHQvL1x0dmFyIHJlc3VsdCA9IG5ldyBEZWx0YU1vZGVsKCk7XG5cdFx0XHQvL1x0cmVzdWx0LmdyYXBoLmFkZE5ld1ZlcnRleCgxLCBkMSk7XG5cdFx0XHQvL1x0cmVzdWx0LmdyYXBoLmFkZE5ld1ZlcnRleCgyLCBkMik7XG5cdFx0XHQvL1x0cmVzdWx0LmdyYXBoLmFkZE5ld0VkZ2UoMSwgMik7XG5cdFx0XHQvL1x0cmV0dXJuIHJlc3VsdDtcblx0XHRcdC8vfSk7XG5cdFx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXHRcdH1cblxuXHR9KTtcblxuXG5cdC8qIHRoZSBSZWFkYWJsZVRhcmdldCBjbGFzcyAqL1xuXHR2YXIgUmVhZGFibGVUYXJnZXQgPSBEZWx0YUpzLlJlYWRhYmxlVGFyZ2V0ID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAodmFsdWUpIHtcblx0XHR0aGlzLl92YWwgPSB2YWx1ZTtcblx0fSwge1xuXHRcdGdldFZhbHVlKCkgeyByZXR1cm4gdGhpcy5fdmFsIH0sXG5cdFx0Z2V0IHZhbHVlKCkgeyByZXR1cm4gdGhpcy5nZXRWYWx1ZSgpIH0sXG5cdFx0c2V0IHZhbHVlKHYpIHsgdGhpcy5zZXRWYWx1ZSh2KSB9LFxuXHRcdGNoYWluKHByb3ApIHtcblx0XHRcdFUuYXNzZXJ0KHRoaXMudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QsXG5cdFx0XHRcdFx0YFRoZSBSZWFkYWJsZVRhcmdldC5wcm90b3R5cGUuY2hhaW4gbWV0aG9kIGV4cGVjdHMgdGhlIHRhcmdldCB2YWx1ZSB0byBiZSBhbiBPYmplY3QuYCk7XG5cdFx0XHRyZXR1cm4gbmV3IFdyaXRhYmxlVGFyZ2V0KHRoaXMudmFsdWUsIHByb3ApO1xuXHRcdH1cblx0fSk7XG5cdC8vZnVuY3Rpb24gcnQodmFsdWUpIHsgcmV0dXJuIG5ldyBEZWx0YUpzLlJlYWRhYmxlVGFyZ2V0KHZhbHVlKSB9XG5cblxuXHQvKiB0aGUgV3JpdGFibGVUYXJnZXQgY2xhc3MgKi9cblx0dmFyIFdyaXRhYmxlVGFyZ2V0ID0gRGVsdGFKcy5Xcml0YWJsZVRhcmdldCA9IFUubmV3U3ViY2xhc3MoUmVhZGFibGVUYXJnZXQsIChzdXBlckZuKSA9PiBmdW5jdGlvbiAob2JqLCBwcm9wKSB7XG5cdFx0dGhpcy5fb2JqICA9IG9iajtcblx0XHR0aGlzLl9wcm9wID0gcHJvcDtcblx0fSwge1xuXHRcdGdldFZhbHVlKCkgeyByZXR1cm4gdGhpcy5fb2JqW3RoaXMuX3Byb3BdIH0sXG5cdFx0c2V0VmFsdWUodikgeyB0aGlzLl9vYmpbdGhpcy5fcHJvcF0gPSB2IH0sXG5cdFx0ZGVsZXRlKCkgeyBkZWxldGUgdGhpcy5fb2JqW3RoaXMuX3Byb3BdIH1cblx0fSk7XG5cdGZ1bmN0aW9uIHd0KG9iaiwgcHJvcCkgeyByZXR1cm4gbmV3IFdyaXRhYmxlVGFyZ2V0KG9iaiwgcHJvcCkgfVxuXG5cblx0LyogZXhwb3J0IHRoZSBtYWluIGNsYXNzICovXG5cdHJldHVybiBEZWx0YUpzO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZGVsdGEuanNcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKCgpID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXG5cdFx0LyogY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGUgKi9cblx0XHRuZXdDbGFzcyhjb25zdHJ1Y3RvciA9IHt9LCBwcm90b3R5cGUgPSB7fSkge1xuXG5cdFx0XHQvKiBhbGxvdyBmb3Igbm8gY29uc3RydWN0b3IgZnVuY3Rpb24gdG8gYmUgcGFzc2VkICovXG5cdFx0XHRpZiAodHlwZW9mIGNvbnN0cnVjdG9yICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdHByb3RvdHlwZSA9IGNvbnN0cnVjdG9yO1xuXHRcdFx0XHRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uICgpIHt9O1xuXHRcdFx0fVxuXG5cdFx0XHQvKiBkZWZpbmUgdGhlIGNsYXNzICovXG5cdFx0XHR2YXIgY2xzID0gY29uc3RydWN0b3I7XG5cdFx0XHRjbHMucHJvdG90eXBlID0gcHJvdG90eXBlO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cblx0XHR9LFxuXG5cdFx0LyogY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGUgKi9cblx0XHRuZXdTdWJjbGFzcyhzdXBlckNsYXNzLCBjb25zdHJ1Y3Rvck1ha2VyID0ge30sIHByb3RvdHlwZSA9IHt9KSB7XG5cblx0XHRcdC8qIGFsbG93IGZvciBubyBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBiZSBwYXNzZWQgKi9cblx0XHRcdGlmICh0eXBlb2YgY29uc3RydWN0b3JNYWtlciAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRwcm90b3R5cGUgPSBjb25zdHJ1Y3Rvck1ha2VyO1xuXHRcdFx0XHRjb25zdHJ1Y3Rvck1ha2VyID0gKHN1cGVyRm4pID0+IGZ1bmN0aW9uICguLi5hcmdzKSB7IHN1cGVyRm4uYXBwbHkodGhpcywgYXJncykgfTtcblx0XHRcdH1cblxuXHRcdFx0LyogZGVmaW5lIHRoZSBzdWJjbGFzcyAqL1xuXHRcdFx0dmFyIGNscyA9IGNvbnN0cnVjdG9yTWFrZXIoc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IpO1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuXHRcdFx0VS5leHRlbmQoY2xzLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXG5cdFx0fSxcblxuXHRcdC8qICBleHRlbmQgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllcyAgICAgKi9cblx0XHQvKiAgb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnMgICovXG5cdFx0LyogIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdFx0XHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqMSwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBvYmoxO1xuXHRcdH0sXG5cblx0XHQvKiBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWQgd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVycyAqL1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIG5ld19vYmogPSBPYmplY3QuY3JlYXRlKENvbnN0cnVjdG9yRm4ucHJvdG90eXBlKTtcblx0XHRcdENvbnN0cnVjdG9yRm4uYXBwbHkobmV3X29iaiwgYXJncyk7XG5cdFx0XHRyZXR1cm4gbmV3X29iajtcblx0XHR9LFxuXG5cdFx0LyogYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYSBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlICovXG5cdFx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0XHR9LFxuXG5cdFx0LyogdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgICovXG5cdFx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0LyogdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYCkgKi9cblx0XHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0LyogcmVwZWF0IGEgc3RyaW5nIGEgZ2l2ZW4gbnVtYmVyIG9mIHRpbWVzICovXG5cdFx0cmVwZWF0KG5yLCBzdHIpIHsgcmV0dXJuIG5ldyBBcnJheShucisxKS5qb2luKHN0cikgfVxuXHR9O1xuXG5cdHJldHVybiBVO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9taXNjLmpzXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiZGVsdGEuanMifQ==