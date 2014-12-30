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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function(U) {
	  'use strict';
	  var DeltaJs = U.newClass(function DeltaJs() {
	    var thisDeltaJs = this;
	    this.operations = {};
	    this.compositions = {};
	    this.operations.Delta = U.newClass(function(arg, meta) {
	      this.arg = arg;
	      this.meta = meta || {};
	    }, {toString: function() {
	        var indentLvl = arguments[0] !== (void 0) ? arguments[0] : 0;
	        var prop = arguments[1] !== (void 0) ? arguments[1] : '(root)';
	        var $__0 = this;
	        var indent = U.repeat(0 + indentLvl, '    ');
	        var str = ("" + indent + this.type + " '" + prop + "'");
	        if (U.isDefined(this.arg)) {
	          str += (": " + JSON.stringify(this.arg).slice(1, -1));
	        }
	        if (this.deltas && Object.keys(this.deltas).length > 0) {
	          str += '\n' + Object.keys(this.deltas).map((function(p) {
	            return $__0.deltas[p].toString(indentLvl + 1, p);
	          })).join('\n');
	        }
	        return str;
	      }});
	    this.operations.Modify = U.newSubclass(this.operations.Delta, (function(superFn) {
	      return function(arg, meta) {
	        superFn.call(this, arg, meta);
	        this.deltas = {};
	      };
	    }), {
	      type: 'Modify',
	      applyTo: function(obj, prop) {
	        var $__0 = this;
	        if (U.isDefined(prop)) {
	          obj = obj[prop];
	        }
	        U.assert(obj instanceof Object, "The 'Modify' operation expects the property to be an already defined Object.");
	        Object.keys(this.deltas).forEach((function(subProp) {
	          $__0.deltas[subProp].applyTo(obj, subProp);
	        }));
	      },
	      compose: function(prop, otherDelta) {
	        var firstDelta = this.deltas[prop];
	        var arr = thisDeltaJs.compositions[firstDelta.type][otherDelta.type];
	        U.assert(arr.length > 0, ("No composition is defined between '" + firstDelta.type + "' and '" + otherDelta.type + "'."));
	        return arr[0](this, prop, otherDelta);
	      },
	      modify: function(prop) {
	        return this._addOperation('Modify', prop);
	      },
	      _preProcessNewOperation: function(opType, path, arg, meta) {
	        var match = path.match(/^([.#]?)(\w+|\(\w+\))(.*)$/);
	        U.assert(match, ("The path string '" + path + "' is not well formed."));
	        var $__1 = match,
	            lead = $__1[1],
	            prop = $__1[2],
	            rest = $__1[3];
	        var result = null;
	        if (lead === '#') {
	          result = this._addOperation(opType, (".(instance)." + prop + rest), arg, meta);
	        } else if (rest.length > 0) {
	          result = this.modify(prop)._addOperation(opType, rest, arg, meta);
	        }
	        return {
	          prop: prop,
	          result: result
	        };
	      },
	      _addOperation: function(opType, path, arg, meta) {
	        var $__1 = this._preProcessNewOperation(opType, path, arg, meta),
	            prop = $__1.prop,
	            result = $__1.result;
	        if (result) {
	          return result;
	        }
	        var newDelta = new thisDeltaJs.operations[opType](arg, meta);
	        if (this.deltas[prop]) {
	          var composition = this.deltas[prop] = this.compose(prop, newDelta);
	          if (opType === 'Modify' && composition.type !== 'Modify') {
	            return new thisDeltaJs.operations.TargetedModify(composition.arg, meta);
	          }
	          return composition.type === 'Modify' ? composition : this;
	        }
	        this.deltas[prop] = newDelta;
	        return newDelta.type === 'Modify' ? newDelta : this;
	      }
	    });
	    this.operations.TargetedModify = U.newSubclass(this.operations.Modify, (function(superFn) {
	      return function(target, arg, meta) {
	        superFn.call(this, arg, meta);
	        this.target = target;
	      };
	    }), {
	      applyTo: function() {
	        throw new Error("TargetedModify deltas cannot be applied TO anything.");
	      },
	      _addOperation: function(opType, path, arg, meta) {
	        var $__1 = this._preProcessNewOperation(opType, path, arg, meta),
	            prop = $__1.prop,
	            result = $__1.result;
	        if (result) {
	          return result;
	        }
	        if (opType === 'Modify') {
	          var newDelta = new thisDeltaJs.operations.TargetedModify(arg, meta);
	          newDelta.target = this.target[prop];
	          return newDelta;
	        }
	        (new thisDeltaJs.operations[opType](arg, meta)).applyTo(this.target, prop);
	        return this;
	      }
	    });
	    this.compositions['Modify'] = {'Modify': []};
	    this._defineObjectOperationTypes();
	    this._defineArrayOperationTypes();
	    this._defineDeltaModelOperationType();
	  }, {
	    get Delta() {
	      return this.operations.Modify;
	    },
	    newOperationType: function(name, $__1) {
	      var $__2 = $__1,
	          construct = $__2.construct,
	          applyTo = $__2.applyTo,
	          methods = $__2.methods;
	      var $__0 = this;
	      U.assert(!this.operations[name], ("The '" + name + "' operation type already exists."));
	      methods = methods || [name[0].toLowerCase() + name.slice(1)];
	      methods.forEach((function(method) {
	        $__0.operations.Modify.prototype[method] = function(prop, arg) {
	          return this._addOperation(name, prop, arg, {method: method});
	        };
	      }));
	      this.compositions[name] = {};
	      Object.keys(this.compositions).forEach((function(type) {
	        U.assert(!$__0.compositions[type][name]);
	        U.assert(!$__0.compositions[name][type]);
	        $__0.compositions[type][name] = [];
	        $__0.compositions[name][type] = [];
	      }));
	      this.operations[name] = U.newSubclass(this.operations.Delta, (function(superFn) {
	        return function(arg, meta) {
	          superFn.call(this, arg, meta);
	          if (construct) {
	            construct.call(this);
	          }
	        };
	      }), U.extend({
	        type: name,
	        applyTo: applyTo
	      }));
	    },
	    newComposition: function(type1, type2, compose) {
	      this.compositions[type1][type2].push(compose);
	    },
	    _defineObjectOperationTypes: function() {
	      var deltaJs = this;
	      var error = (function(d1, p, d2) {
	        throw new Error(("You cannot follow '" + d1[p].type + "' with '" + d2.type + "'."));
	      });
	      function d(type) {
	        var fn = arguments[1] !== (void 0) ? arguments[1] : ((function() {
	          return null;
	        }));
	        if (typeof fn === 'string') {
	          fn = ((function(v) {
	            return (function(o) {
	              return o[v];
	            });
	          }))(fn);
	        }
	        return (function(d1, p, d2) {
	          var args = {
	            d1: d1.deltas && d1.deltas[p],
	            d2: d2,
	            p1: d1.deltas && d1.deltas[p] && d1.deltas[p].arg && d1.deltas[p].arg,
	            p2: d2.arg
	          };
	          return new (deltaJs.operations[type])(fn(args));
	        });
	      }
	      function assertDefined(val, opType) {
	        U.assert(U.isDefined(val), ("The operation '" + opType + "' expects the property to be defined."));
	      }
	      function assertUndefined(val, opType) {
	        U.assert(U.isUndefined(val), ("The operation '" + opType + "' expects the property to be undefined."));
	      }
	      this.newOperationType('Add', {applyTo: function(obj, p) {
	          assertUndefined(obj[p], 'Add');
	          obj[p] = this.arg;
	        }});
	      this.newOperationType('Remove', {applyTo: function(obj, p) {
	          assertDefined(obj[p], 'Remove');
	          delete obj[p];
	        }});
	      this.newOperationType('Forbid', {applyTo: function(obj, p) {
	          assertUndefined(obj[p], 'Forbid');
	        }});
	      this.newOperationType('Replace', {applyTo: function(obj, p) {
	          assertDefined(obj[p], 'Replace');
	          obj[p] = this.arg;
	        }});
	      this.newComposition('Modify', 'Modify', (function(d1, p, d2) {
	        Object.keys(d2.deltas).forEach((function(prop) {
	          d1.compose(p, d2.deltas[prop]);
	        }));
	        return d1.deltas[p];
	      }));
	      this.newComposition('Modify', 'Add', error);
	      this.newComposition('Add', 'Add', error);
	      this.newComposition('Add', 'Modify', d('Add', (function($__1) {
	        var $__2 = $__1,
	            d1 = $__2.d1,
	            d2 = $__2.d2;
	        return (d2.applyTo(d1, 'arg'), d1.arg);
	      })));
	      this.newComposition('Modify', 'Remove', d('Remove'));
	      this.newComposition('Add', 'Remove', d('Forbid'));
	      this.newComposition('Remove', 'Modify', error);
	      this.newComposition('Remove', 'Add', d('Replace', 'p2'));
	      this.newComposition('Remove', 'Remove', error);
	      this.newComposition('Modify', 'Forbid', error);
	      this.newComposition('Add', 'Forbid', error);
	      this.newComposition('Remove', 'Forbid', d('Remove'));
	      this.newComposition('Forbid', 'Modify', error);
	      this.newComposition('Forbid', 'Add', d('Add', 'p2'));
	      this.newComposition('Forbid', 'Remove', error);
	      this.newComposition('Forbid', 'Forbid', d('Forbid'));
	      this.newComposition('Modify', 'Replace', d('Replace', 'p2'));
	      this.newComposition('Add', 'Replace', d('Add', 'p2'));
	      this.newComposition('Remove', 'Replace', error);
	      this.newComposition('Forbid', 'Replace', error);
	      this.newComposition('Replace', 'Modify', d('Replace', (function($__1) {
	        var $__2 = $__1,
	            d1 = $__2.d1,
	            d2 = $__2.d2;
	        return (d2.applyTo(d1, 'arg'), d1.arg);
	      })));
	      this.newComposition('Replace', 'Add', error);
	      this.newComposition('Replace', 'Remove', d('Remove'));
	      this.newComposition('Replace', 'Forbid', error);
	      this.newComposition('Replace', 'Replace', d('Replace', 'p2'));
	    },
	    _defineArrayOperationTypes: function() {
	      var deltaJs = this;
	      var error = (function(d1, p, d2) {
	        throw new Error(("You cannot follow '" + d1[p].type + "' with '" + d2.type + "'."));
	      });
	      function d(type) {
	        var fn = arguments[1] !== (void 0) ? arguments[1] : ((function() {
	          return null;
	        }));
	        if (typeof fn === 'string') {
	          fn = ((function(v) {
	            return (function(o) {
	              return o[v];
	            });
	          }))(fn);
	        }
	        return (function(d1, p, d2) {
	          var args = {
	            d1: d1.deltas && d1.deltas[p],
	            d2: d2,
	            p1: d1.deltas && d1.deltas[p] && d1.deltas[p].arg,
	            p2: d2.arg
	          };
	          return new (deltaJs.operations[type])(fn(args));
	        });
	      }
	      function assertDefined(val, opType) {
	        U.assert(U.isDefined(val), ("The operation '" + opType + "' expects the property to be defined."));
	      }
	      function assertArray(val, opType) {
	        U.assert(Array.isArray(val), ("The operation '" + opType + "' expects the property to be an array."));
	      }
	      this.newOperationType('Put', {
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
	        applyTo: function(obj, p) {
	          assertDefined(obj[p], 'Put');
	          assertArray(obj[p], 'Put');
	          this.values.forEach((function($__1) {
	            var $__2 = $__1,
	                method = $__2.method,
	                value = $__2.value;
	            switch (method) {
	              case 'prepend':
	                {
	                  obj[p].unshift(value);
	                }
	                break;
	              case 'insert':
	                {
	                  var position = Math.floor(Math.random() * (obj[p].length + 1));
	                  obj[p].splice(position, 0, value);
	                }
	                break;
	              case 'append':
	                {
	                  obj[p].push(value);
	                }
	                break;
	            }
	          }));
	        },
	        methods: ['prepend', 'insert', 'append']
	      });
	      this.newComposition('Modify', 'Put', error);
	      this.newComposition('Add', 'Put', d('Add', (function($__1) {
	        var $__2 = $__1,
	            d1 = $__2.d1,
	            d2 = $__2.d2;
	        return (d2.applyTo(d1, 'arg'), d1.arg);
	      })));
	      this.newComposition('Remove', 'Put', error);
	      this.newComposition('Forbid', 'Put', error);
	      this.newComposition('Replace', 'Put', d('Replace', (function($__1) {
	        var $__2 = $__1,
	            d1 = $__2.d1,
	            d2 = $__2.d2;
	        return (d2.applyTo(d1, 'arg'), d1.arg);
	      })));
	      this.newComposition('Put', 'Modify', error);
	      this.newComposition('Put', 'Add', error);
	      this.newComposition('Put', 'Remove', d('Remove'));
	      this.newComposition('Put', 'Forbid', error);
	      this.newComposition('Put', 'Replace', d('Replace', 'p2'));
	      this.newComposition('Put', 'Put', (function(d1, p, d2) {
	        var result = new deltaJs.operations.Put();
	        result.values = (d1.deltas[p].values).concat(d2.values);
	        return result;
	      }));
	    },
	    _defineDeltaModelOperationType: function() {}
	  });
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
	    newClass: function(constructor) {
	      var prototype = arguments[1] !== (void 0) ? arguments[1] : {};
	      var cls = constructor;
	      cls.prototype = prototype;
	      cls.prototype.constructor = cls;
	      return cls;
	    },
	    newSubclass: function(superClass, constructorMaker) {
	      var prototype = arguments[2] !== (void 0) ? arguments[2] : {};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5OGM3ZjNlNzg5OTg0ZGRlOWNiZiIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvbWlzYy5qcyIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FBUSx1QkFBYSx3QkFBVSxDQUFHLDBDQUFVO0FBQzNDLGNBQVcsQ0FBQztBQU1SLGFBQU0sRUFBSSxXQUFVLENBQUMsUUFBUyxRQUFNLENBQUU7QUFJckMsbUJBQVUsRUFBSSxLQUFHLENBQUM7QUFJdEIsUUFBRyxXQUFXLEVBQUksR0FBQyxDQUFDO0FBQ3BCLFFBQUcsYUFBYSxFQUFJLEdBQUMsQ0FBQztBQUl0QixRQUFHLFdBQVcsTUFBTSxFQUFJLFdBQVUsQ0FBQyxTQUFVLEdBQUUsQ0FBRyxLQUFHLENBQUc7QUFDdkQsVUFBRyxJQUFJLEVBQUksSUFBRSxDQUFDO0FBQ2QsVUFBRyxLQUFLLEVBQUksS0FBRyxHQUFL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O0FBQUUsWUFBTyxJQUFJLE1BQUssQ0FBQyxFQUFDLEVBQUUsR0FBQyxLQUFNLENBQUMsR0FBRSxDQUFDO0tBQUU7QUFBQSxHQUNwRCxDQUFDO0FBRUQsUUFBTyxHQUFDO0FBQ1Qsd0pBQUU7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpzLWdyYXBoXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkRlbHRhSnNcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJqcy1ncmFwaFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiRGVsdGFKc1wiXSA9IGZhY3Rvcnkocm9vdFtcIkpzR3JhcGhcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA5OGM3ZjNlNzg5OTg0ZGRlOWNiZlxuICoqLyIsImRlZmluZShbJy4vbWlzYy5qcycsICdqcy1ncmFwaCddLCBmdW5jdGlvbiAoVS8qLCBKc0dyYXBoKi8pIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0LyoqIHtAY2xhc3MgRGVsdGFKc31cblx0ICpcblx0ICovXG5cdHZhciBEZWx0YUpzID0gVS5uZXdDbGFzcyhmdW5jdGlvbiBEZWx0YUpzKCkge1xuXG5cblx0XHQvKiBhbGlhcyBmb3IgJ3RoaXMnICovXG5cdFx0dmFyIHRoaXNEZWx0YUpzID0gdGhpcztcblxuXG5cdFx0LyogdGhlIHRoaW5ncyBpbnN0YW5jZXMgb2YgJ0RlbHRhSnMnIGtlZXBzIHRyYWNrIG9mICovXG5cdFx0dGhpcy5vcGVyYXRpb25zID0ge307ICAgLy8gcHJvcGVydHkgLT4gRGVsdGFcblx0XHR0aGlzLmNvbXBvc2l0aW9ucyA9IHt9OyAvLyB0eXBlMSAtPiB0eXBlMiAtPiBbY29tcG9zZUZuXVxuXG5cblx0XHQvKiBkZWZpbmUgdGhlIGJhc2UgJ0RlbHRhJyBjbGFzcyAqLy8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0oRGVsdGEpXG5cdFx0dGhpcy5vcGVyYXRpb25zLkRlbHRhID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoYXJnLCBtZXRhKSB7XG5cdFx0XHR0aGlzLmFyZyA9IGFyZztcblx0XHRcdHRoaXMubWV0YSA9IG1ldGEgfHwge307XG5cdFx0fSwge1xuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSBpbmRlbnRMdmwge051bWJlcj99XG5cdFx0XHQgKiBAcGFyYW0gcHJvcGVydHkgIHtTdHJpbmc/fVxuXHRcdFx0ICovXG5cdFx0XHR0b1N0cmluZyhpbmRlbnRMdmwgPSAwLCBwcm9wID0gJyhyb290KScpIHtcblx0XHRcdFx0dmFyIGluZGVudCA9IFUucmVwZWF0KDAgKyBpbmRlbnRMdmwsICcgICAgJyk7XG5cdFx0XHRcdHZhciBzdHIgPSBgJHtpbmRlbnR9JHt0aGlzLnR5cGV9ICcke3Byb3B9J2A7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh0aGlzLmFyZykpIHtcblx0XHRcdFx0XHRzdHIgKz0gYDogJHtKU09OLnN0cmluZ2lmeSh0aGlzLmFyZykuc2xpY2UoMSwgLTEpfWA7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHRoaXMuZGVsdGFzICYmIE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0c3RyICs9ICdcXG4nICsgT2JqZWN0LmtleXModGhpcy5kZWx0YXMpXG5cdFx0XHRcdFx0XHRcdC5tYXAoKHApID0+IHRoaXMuZGVsdGFzW3BdLnRvU3RyaW5nKGluZGVudEx2bCArIDEsIHApKVxuXHRcdFx0XHRcdFx0XHQuam9pbignXFxuJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHN0cjtcblx0XHRcdH1cblx0XHR9KTtcblx0XHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSgvRGVsdGEpXG5cblxuXHRcdC8qIGRlZmluZSB0aGUgZnVuZGFtZW50YWwgJ01vZGlmeScgZGVsdGEgKi8vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKG1vZGlmeSlcblx0XHR0aGlzLm9wZXJhdGlvbnMuTW9kaWZ5ID0gVS5uZXdTdWJjbGFzcyh0aGlzLm9wZXJhdGlvbnMuRGVsdGEsIChzdXBlckZuKSA9PiBmdW5jdGlvbiAoYXJnLCBtZXRhKSB7XG5cdFx0XHRzdXBlckZuLmNhbGwodGhpcywgYXJnLCBtZXRhKTtcblx0XHRcdHRoaXMuZGVsdGFzID0ge307XG5cdFx0XHQvLyBUT0RPOiBhbGxvdyBvcGVyYXRpb25zIHRvIGJlIGFkZGVkIHRocm91Z2ggYW4gb3B0aW9uYWwgYXJndW1lbnRcblx0XHR9LCB7XG5cdFx0XHR0eXBlOiAnTW9kaWZ5JyxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSBvYmogIHtPYmplY3R9XG5cdFx0XHQgKiBAcGFyYW0gcHJvcCB7U3RyaW5nfVxuXHRcdFx0ICovXG5cdFx0XHRhcHBseVRvKG9iaiwgcHJvcCkge1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQocHJvcCkpIHsgb2JqID0gb2JqW3Byb3BdIH1cblx0XHRcdFx0VS5hc3NlcnQob2JqIGluc3RhbmNlb2YgT2JqZWN0LFxuXHRcdFx0XHRcdFx0YFRoZSAnTW9kaWZ5JyBvcGVyYXRpb24gZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgYW4gYWxyZWFkeSBkZWZpbmVkIE9iamVjdC5gKTtcblx0XHRcdFx0T2JqZWN0LmtleXModGhpcy5kZWx0YXMpLmZvckVhY2goKHN1YlByb3ApID0+IHtcblx0XHRcdFx0XHR0aGlzLmRlbHRhc1tzdWJQcm9wXS5hcHBseVRvKG9iaiwgc3ViUHJvcCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSBwcm9wICAgICAgIHtTdHJpbmd9XG5cdFx0XHQgKiBAcGFyYW0gb3RoZXJEZWx0YSB7RGVsdGFKcyNvcGVyYXRpb25zLkRlbHRhfVxuXHRcdFx0ICovXG5cdFx0XHRjb21wb3NlKHByb3AsIG90aGVyRGVsdGEpIHtcblx0XHRcdFx0dmFyIGZpcnN0RGVsdGEgPSB0aGlzLmRlbHRhc1twcm9wXTtcblx0XHRcdFx0dmFyIGFyciA9IHRoaXNEZWx0YUpzLmNvbXBvc2l0aW9uc1tmaXJzdERlbHRhLnR5cGVdW290aGVyRGVsdGEudHlwZV07XG5cdFx0XHRcdFUuYXNzZXJ0KGFyci5sZW5ndGggPiAwLFxuXHRcdFx0XHRcdFx0YE5vIGNvbXBvc2l0aW9uIGlzIGRlZmluZWQgYmV0d2VlbiAnJHtmaXJzdERlbHRhLnR5cGV9JyBhbmQgJyR7b3RoZXJEZWx0YS50eXBlfScuYCk7XG5cdFx0XHRcdHJldHVybiBhcnJbMF0odGhpcywgcHJvcCwgb3RoZXJEZWx0YSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHByb3Age1N0cmluZ31cblx0XHRcdCAqL1xuXHRcdFx0bW9kaWZ5KHByb3ApIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2FkZE9wZXJhdGlvbignTW9kaWZ5JywgcHJvcCk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSBvcFR5cGUge1N0cmluZ31cblx0XHRcdCAqIEBwYXJhbSBwYXRoICAge1N0cmluZ31cblx0XHRcdCAqIEBwYXJhbSBhcmcgICAgeyp9XG5cdFx0XHQgKiBAcGFyYW0gbWV0YSAgIHtPYmplY3R9IC0gbWV0YSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgb3BlcmF0aW9uXG5cdFx0XHQgKiBAcmV0dXJuIHt7cHJvcDogU3RyaW5nLCByZXN1bHQ6IERlbHRhSnMjb3BlcmF0aW9ucy5tb2RpZnl9fSAtIHRoZSBkZWVwZXN0ICdNb2RpZnknIGRlbHRhIGludm9sdmVkIGluIHRoaXMgbWV0aG9kLWNhbGxcblx0XHRcdCAqL1xuXHRcdFx0X3ByZVByb2Nlc3NOZXdPcGVyYXRpb24ob3BUeXBlLCBwYXRoLCBhcmcsIG1ldGEpIHtcblxuXHRcdFx0XHQvKiBkaXNzZWN0IHRoZSAncGF0aCcgc3RyaW5nICovXG5cdFx0XHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyAgMTExMTEgIDIyMjIyMjIyMjIyICAzMyAgLy9cblx0XHRcdFx0dmFyIG1hdGNoID0gcGF0aC5tYXRjaCgvXihbLiNdPykoXFx3K3xcXChcXHcrXFwpKSguKikkLyk7XG5cdFx0XHRcdFUuYXNzZXJ0KG1hdGNoLCBgVGhlIHBhdGggc3RyaW5nICcke3BhdGh9JyBpcyBub3Qgd2VsbCBmb3JtZWQuYCk7XG5cdFx0XHRcdHZhciBbLCBsZWFkLCBwcm9wLCByZXN0XSA9IG1hdGNoO1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gbnVsbDtcblxuXHRcdFx0XHRpZiAobGVhZCA9PT0gJyMnKSB7XG5cdFx0XHRcdFx0LyogaWYgJ3BhdGgnIGhhcyBhIGxlYWRpbmcgJyMnIGNoYXJhY3RlciwgdHJhbnNmb3JtIGl0IGFuZCByZWNhbGwgdGhpcyBtZXRob2QgKi9cblx0XHRcdFx0XHQvLyB0aGUgIyBzZXBhcmF0b3IgZXhwZWN0cyB0aGUgY3VycmVudCBvYmplY3QgdG8gYmUgYSBjb25zdHJ1Y3RvciBmdW5jdGlvbixcblx0XHRcdFx0XHQvLyBhbmQgeWllbGRzIGEgZGVsdGEgdG8gbW9kaWZ5IG5ldyBpbnN0YW5jZXMgb2YgdGhlIGNvcnJlc3BvbmRpbmcgY2xhc3Ncblx0XHRcdFx0XHRyZXN1bHQgPSB0aGlzLl9hZGRPcGVyYXRpb24ob3BUeXBlLCBgLihpbnN0YW5jZSkuJHtwcm9wfSR7cmVzdH1gLCBhcmcsIG1ldGEpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHJlc3QubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdC8qIGlmIHRoZXJlIGlzIGEgbG9uZ2VyIGNoYWluLCBjYWxsIHRoaXMgbWV0aG9kIHJlY3Vyc2l2ZWx5ICovXG5cdFx0XHRcdFx0Ly8gcmVjdXJzZS4uLi5pbmRpcmVjdGx5Li4uZGlyZWN0bHlcblx0XHRcdFx0XHRyZXN1bHQgPSB0aGlzLm1vZGlmeShwcm9wKS5fYWRkT3BlcmF0aW9uKG9wVHlwZSwgcmVzdCwgYXJnLCBtZXRhKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB7cHJvcCwgcmVzdWx0fTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIG9wVHlwZSB7U3RyaW5nfVxuXHRcdFx0ICogQHBhcmFtIHBhdGggICB7U3RyaW5nfVxuXHRcdFx0ICogQHBhcmFtIGFyZyAgICB7Kn1cblx0XHRcdCAqIEBwYXJhbSBtZXRhICAge09iamVjdH0gLSBtZXRhIGluZm9ybWF0aW9uIGFib3V0IHRoZSBvcGVyYXRpb25cblx0XHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjb3BlcmF0aW9ucy5tb2RpZnl9IC0gdGhlIGRlZXBlc3QgJ01vZGlmeScgZGVsdGEgaW52b2x2ZWQgaW4gdGhpcyBtZXRob2QtY2FsbFxuXHRcdFx0ICovXG5cdFx0XHRfYWRkT3BlcmF0aW9uKG9wVHlwZSwgcGF0aCwgYXJnLCBtZXRhKSB7XG5cblx0XHRcdFx0LyogcHJlLXByb2Nlc3MgdGhlIGFyZ3VtZW50cywgcG9zc2libHkgYWxyZWFkeSBnZXQgdGhlIHJlc3VsdCBieSBkZWxlZ2F0aW9uICovXG5cdFx0XHRcdHZhciB7cHJvcCwgcmVzdWx0fSA9IHRoaXMuX3ByZVByb2Nlc3NOZXdPcGVyYXRpb24ob3BUeXBlLCBwYXRoLCBhcmcsIG1ldGEpO1xuXHRcdFx0XHRpZiAocmVzdWx0KSB7IHJldHVybiByZXN1bHQgfVxuXG5cdFx0XHRcdC8qIGF0IHRoaXMgcG9pbnQsIHdlIGNvbnN0cnVjdCB0aGUgbmV3IGRlbHRhICovXG5cdFx0XHRcdHZhciBuZXdEZWx0YSA9IG5ldyB0aGlzRGVsdGFKcy5vcGVyYXRpb25zW29wVHlwZV0oYXJnLCBtZXRhKTtcblxuXHRcdFx0XHQvKiBPSywgbm8gdGFyZ2V0ZWQgZGVsdGFzOyBkbyB3ZSBuZWVkIHRvIGNvbXBvc2UgdGhlIG5ldyBkZWx0YSB3aXRoIGFuIGV4aXN0aW5nIG9uZT8gKi9cblx0XHRcdFx0aWYgKHRoaXMuZGVsdGFzW3Byb3BdKSB7XG5cdFx0XHRcdFx0dmFyIGNvbXBvc2l0aW9uID0gdGhpcy5kZWx0YXNbcHJvcF0gPSB0aGlzLmNvbXBvc2UocHJvcCwgbmV3RGVsdGEpO1xuXG5cdFx0XHRcdFx0LyogIGlmIHRoZSByZXN1bHQgc2hvdWxkIGJlIGEgJ01vZGlmeScgdG8gYWNjb21tb2RhdGUgZnVydGhlciBvcGVyYXRpb25zLCAgICAgICAgICAgKi9cblx0XHRcdFx0XHQvKiAgYnV0IHRoZSBjb21wb3NpdGlvbiBpc24ndCwgcmV0dXJuIGEgJ01vZGlmeScgdGFyZ2V0ZWQgYXQgdGhlIGNvbXBvc2l0aW9uIHZhbHVlICAqL1xuXHRcdFx0XHRcdGlmIChvcFR5cGUgPT09ICdNb2RpZnknICYmIGNvbXBvc2l0aW9uLnR5cGUgIT09ICdNb2RpZnknKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbmV3IHRoaXNEZWx0YUpzLm9wZXJhdGlvbnMuVGFyZ2V0ZWRNb2RpZnkoY29tcG9zaXRpb24uYXJnLCBtZXRhKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gY29tcG9zaXRpb24udHlwZSA9PT0gJ01vZGlmeScgPyBjb21wb3NpdGlvbiA6IHRoaXM7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiB0aGVyZSB3YXMgbm8gb3BlcmF0aW9uIG9uIHRoYXQgcHJvcGVydHkgeWV0OyBhZGQgaXQgKi9cblx0XHRcdFx0dGhpcy5kZWx0YXNbcHJvcF0gPSBuZXdEZWx0YTtcblx0XHRcdFx0cmV0dXJuIG5ld0RlbHRhLnR5cGUgPT09ICdNb2RpZnknID8gbmV3RGVsdGEgOiB0aGlzO1xuXG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSgvbW9kaWZ5KVxuXG5cblx0XHQvLyBJbiBvcmRlciB0byBwcm9jZXNzIGRlbHRhIGNvbXBvc2l0aW9ucyBsaWtlXG5cdFx0Ly8gICAgIGRlbHRhLmFkZCgnb2JqJywge30pO1xuXHRcdC8vICAgICBkZWx0YS5tb2RpZnkoJ29iaicpO1xuXHRcdC8vIGFuZCBzdGlsbCByZXR1cm4gJ01vZGlmeScgZGVsdGFzIHRvIHRoZSB1c2VyIGZvciBmdXJ0aGVyIG9wZXJhdGlvbnMsXG5cdFx0Ly8gd2UgbmVlZCB0ZW1wb3JhcnkgJ01vZGlmeScgZGVsdGFzIHRoYXQgcmVtZW1iZXIgdGhlaXIgdGFyZ2V0LCB3aGljaFxuXHRcdC8vIHdlIHdpbGwgY2FsbCAndGFyZ2V0ZWQgZGVsdGFzJy5cblxuXHRcdC8qIGRlZmluZSB0aGUgJ1RhcmdldGVkTW9kaWZ5JyBkZWx0YSBzdWJjbGFzcyAqLy8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSh0YXJnZXRlZE1vZGlmeSlcblx0XHR0aGlzLm9wZXJhdGlvbnMuVGFyZ2V0ZWRNb2RpZnkgPSBVLm5ld1N1YmNsYXNzKHRoaXMub3BlcmF0aW9ucy5Nb2RpZnksIChzdXBlckZuKSA9PiBmdW5jdGlvbiAodGFyZ2V0LCBhcmcsIG1ldGEpIHtcblx0XHRcdHN1cGVyRm4uY2FsbCh0aGlzLCBhcmcsIG1ldGEpO1xuXHRcdFx0dGhpcy50YXJnZXQgPSB0YXJnZXQ7XG5cdFx0fSwge1xuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBUYXJnZXRlZCBkZWx0YXMgY2FuJ3QgYmUgYXBwbGllZCBUTyBhbnl0aGluZy5cblx0XHRcdCAqIFRoaXMgbWV0aG9kIGlzIG92ZXJ3cml0dGVuIHRvIGF2b2lkIG1pc3Rha2VzLlxuXHRcdFx0ICovXG5cdFx0XHRhcHBseVRvKCkgeyB0aHJvdyBuZXcgRXJyb3IoYFRhcmdldGVkTW9kaWZ5IGRlbHRhcyBjYW5ub3QgYmUgYXBwbGllZCBUTyBhbnl0aGluZy5gKSB9LFxuXG5cdFx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSBvcFR5cGUge1N0cmluZ31cblx0XHRcdCAqIEBwYXJhbSBwYXRoICAge1N0cmluZ31cblx0XHRcdCAqIEBwYXJhbSBhcmcgICAgeyp9XG5cdFx0XHQgKiBAcGFyYW0gbWV0YSAgIHtPYmplY3R9IC0gbWV0YSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgb3BlcmF0aW9uXG5cdFx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI29wZXJhdGlvbnMubW9kaWZ5fSAtIHRoZSBkZWVwZXN0ICdNb2RpZnknIGRlbHRhIGludm9sdmVkIGluIHRoaXMgbWV0aG9kLWNhbGxcblx0XHRcdCAqL1xuXHRcdFx0X2FkZE9wZXJhdGlvbihvcFR5cGUsIHBhdGgsIGFyZywgbWV0YSkge1xuXHRcdFx0XHQvKiBwcmUtcHJvY2VzcyB0aGUgYXJndW1lbnRzLCBwb3NzaWJseSBhbHJlYWR5IGdldCB0aGUgcmVzdWx0IGJ5IGRlbGVnYXRpb24gKi9cblx0XHRcdFx0dmFyIHtwcm9wLCByZXN1bHR9ID0gdGhpcy5fcHJlUHJvY2Vzc05ld09wZXJhdGlvbihvcFR5cGUsIHBhdGgsIGFyZywgbWV0YSk7XG5cdFx0XHRcdGlmIChyZXN1bHQpIHsgcmV0dXJuIHJlc3VsdCB9XG5cblx0XHRcdFx0LyogaWYgdGhlIG5ldyBkZWx0YSBzaG91bGQgYmUgYSAnTW9kaWZ5JyBkZWx0YSwgaXQgaXMgYSB0YXJnZXRlZCBkZWx0YSAqL1xuXHRcdFx0XHRpZiAob3BUeXBlID09PSAnTW9kaWZ5Jykge1xuXHRcdFx0XHRcdHZhciBuZXdEZWx0YSA9IG5ldyB0aGlzRGVsdGFKcy5vcGVyYXRpb25zLlRhcmdldGVkTW9kaWZ5KGFyZywgbWV0YSk7XG5cdFx0XHRcdFx0bmV3RGVsdGEudGFyZ2V0ID0gdGhpcy50YXJnZXRbcHJvcF07XG5cdFx0XHRcdFx0cmV0dXJuIG5ld0RlbHRhO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyogYXBwbHkgdGhlIG5ldyBkZWx0YSB0byBpdHMgdGFyZ2V0LCBkaXNjYXJkIGl0IGFuZCByZXR1cm4gJ3RoaXMnIGRlbHRhICovXG5cblx0XHRcdFx0KG5ldyB0aGlzRGVsdGFKcy5vcGVyYXRpb25zW29wVHlwZV0oYXJnLCBtZXRhKSkuYXBwbHlUbyh0aGlzLnRhcmdldCwgcHJvcCk7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cdFx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0oL3RhcmdldGVkTW9kaWZ5KVxuXG5cblx0XHQvKiBzZXQgdGhlIGZvdW5kYXRpb24gb2YgdGhlIGNvbXBvc2l0aW9ucyBhcnJheSAqL1xuXHRcdHRoaXMuY29tcG9zaXRpb25zWydNb2RpZnknXSA9IHsgJ01vZGlmeSc6IFtdIH07XG5cblxuXHRcdC8qIGRlZmluZSBzdGFuZGFyZCBvcGVyYXRpb25zICovXG5cdFx0dGhpcy5fZGVmaW5lT2JqZWN0T3BlcmF0aW9uVHlwZXMoKTtcblx0XHR0aGlzLl9kZWZpbmVBcnJheU9wZXJhdGlvblR5cGVzKCk7XG5cdFx0dGhpcy5fZGVmaW5lRGVsdGFNb2RlbE9wZXJhdGlvblR5cGUoKTtcblxuXG5cdH0sIC8qKiBAbGVuZHMgRGVsdGFKcy5wcm90b3R5cGUgKi8gIHtcblxuXHRcdC8qKiB7QHB1YmxpY317QHByb3BlcnR5fVxuXHRcdCAqIHF1aWNrIGFjY2VzcyB0byB0aGUgJ01vZGlmeScgZGVsdGEgY29uc3RydWN0b3Jcblx0XHQgKi9cblx0XHRnZXQgRGVsdGEoKSB7IHJldHVybiB0aGlzLm9wZXJhdGlvbnMuTW9kaWZ5IH0sXG5cblx0XHQvLy8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQvLyAqXG5cdFx0Ly8gKi9cblx0XHQvL3ZwKHZwTmFtZSwgdmFsKSB7XG5cdFx0Ly9cdC8vIFRPRE9cblx0XHQvL30sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gbmFtZSAgICB7U3RyaW5nfVxuXHRcdCAqIEBwYXJhbSBhcHBseVRvIHsoRGVsdGFKcyNvcGVyYXRpb25zLkRlbHRhLCBPYmplY3QsIFN0cmluZykgPT4gdW5kZWZpbmVkfVxuXHRcdCAqL1xuXHRcdG5ld09wZXJhdGlvblR5cGUobmFtZSwge2NvbnN0cnVjdCwgYXBwbHlUbywgbWV0aG9kc30pIHtcblxuXHRcdFx0Lyogc2FuaXR5IGNoZWNrcyAqL1xuXHRcdFx0VS5hc3NlcnQoIXRoaXMub3BlcmF0aW9uc1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlICcke25hbWV9JyBvcGVyYXRpb24gdHlwZSBhbHJlYWR5IGV4aXN0cy5gKTtcblxuXHRcdFx0LyogY3JlYXRlIHRoZSBjb3JyZXNwb25kaW5nIG1ldGhvZChzKSBpbiB0aGUgJ01vZGlmeScgY2xhc3MgKi9cblx0XHRcdC8vIGlmIG5vIG1ldGhvZHMgYXJlIHByb3ZpZGVkLCB1c2UgdGhlIG9wZXJhdGlvbiBuYW1lIHN0YXJ0aW5nIHdpdGggYSBsb3dlcmNhc2UgbGV0dGVyXG5cdFx0XHRtZXRob2RzID0gbWV0aG9kcyB8fCBbIG5hbWVbMF0udG9Mb3dlckNhc2UoKStuYW1lLnNsaWNlKDEpIF07XG5cdFx0XHRtZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuXHRcdFx0XHR0aGlzLm9wZXJhdGlvbnMuTW9kaWZ5LnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKHByb3AsIGFyZykge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9hZGRPcGVyYXRpb24obmFtZSwgcHJvcCwgYXJnLCB7IG1ldGhvZCB9KTtcblx0XHRcdFx0fTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKiBwdXQgdGhlIHJpZ2h0IGZvdW5kYXRpb24gaW4gJ3RoaXMuY29tcG9zaXRpb24nICovXG5cdFx0XHR0aGlzLmNvbXBvc2l0aW9uc1tuYW1lXSA9IHt9O1xuXHRcdFx0T2JqZWN0LmtleXModGhpcy5jb21wb3NpdGlvbnMpLmZvckVhY2goKHR5cGUpID0+IHtcblx0XHRcdFx0VS5hc3NlcnQoIXRoaXMuY29tcG9zaXRpb25zW3R5cGVdW25hbWVdKTtcblx0XHRcdFx0VS5hc3NlcnQoIXRoaXMuY29tcG9zaXRpb25zW25hbWVdW3R5cGVdKTtcblx0XHRcdFx0dGhpcy5jb21wb3NpdGlvbnNbdHlwZV1bbmFtZV0gPSBbXTtcblx0XHRcdFx0dGhpcy5jb21wb3NpdGlvbnNbbmFtZV1bdHlwZV0gPSBbXTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKiBjcmVhdGUgdGhlIERlbHRhIHN1YmNsYXNzIHJlcHJlc2VudGluZyB0aGlzIG9wZXJhdGlvbiB0eXBlICovLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLShvdGhlcilcblx0XHRcdHRoaXMub3BlcmF0aW9uc1tuYW1lXSA9IFUubmV3U3ViY2xhc3ModGhpcy5vcGVyYXRpb25zLkRlbHRhLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKGFyZywgbWV0YSkge1xuXHRcdFx0XHRzdXBlckZuLmNhbGwodGhpcywgYXJnLCBtZXRhKTtcblx0XHRcdFx0aWYgKGNvbnN0cnVjdCkgeyBjb25zdHJ1Y3QuY2FsbCh0aGlzKSB9XG5cdFx0XHR9LCBVLmV4dGVuZCh7XG5cdFx0XHRcdHR5cGU6IG5hbWUsXG5cdFx0XHRcdGFwcGx5VG86IGFwcGx5VG9cblx0XHRcdH0pKTtcblx0XHRcdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0oL290aGVyKVxuXG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB0eXBlMSAgIHtTdHJpbmd9XG5cdFx0ICogQHBhcmFtIHR5cGUyICAge1N0cmluZ31cblx0XHQgKiBAcGFyYW0gY29tcG9zZSB7KERlbHRhSnMjb3BlcmF0aW9ucy5tb2RpZnksIFN0cmluZywgRGVsdGFKcyNvcGVyYXRpb25zLkRlbHRhKSA9PiB1bmRlZmluZWR9XG5cdFx0ICovXG5cdFx0bmV3Q29tcG9zaXRpb24odHlwZTEsIHR5cGUyLCBjb21wb3NlKSB7XG5cdFx0XHR0aGlzLmNvbXBvc2l0aW9uc1t0eXBlMV1bdHlwZTJdLnB1c2goY29tcG9zZSk7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0ICpcblx0XHQgKi9cblx0XHRfZGVmaW5lT2JqZWN0T3BlcmF0aW9uVHlwZXMoKSB7XG5cblx0XHRcdHZhciBkZWx0YUpzID0gdGhpcztcblxuXHRcdFx0Ly8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvXG5cblx0XHRcdC8qIGNvbnZlbmllbmNlIGRlZmluaXRpb25zIGZvciB0aGUgYXBwbGljYXRpb24gYW5kIGNvbXBvc2l0aW9uIGZ1bmN0aW9ucyBiZWxvdyAqL1xuXHRcdFx0dmFyIGVycm9yID0gKGQxLCBwLCBkMikgPT4geyB0aHJvdyBuZXcgRXJyb3IoYFlvdSBjYW5ub3QgZm9sbG93ICcke2QxW3BdLnR5cGV9JyB3aXRoICcke2QyLnR5cGV9Jy5gKSB9O1xuXG5cdFx0XHRmdW5jdGlvbiBkKHR5cGUsICBmbiA9ICgoKT0+bnVsbCkpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBmbiA9PT0gJ3N0cmluZycpIHsgZm4gPSAoKHYpID0+IChvKSA9PiBvW3ZdKShmbikgfVxuXHRcdFx0XHRyZXR1cm4gKGQxLCBwLCBkMikgPT4ge1xuXHRcdFx0XHRcdHZhciBhcmdzID0ge1xuXHRcdFx0XHRcdFx0ZDE6IGQxLmRlbHRhcyAmJiBkMS5kZWx0YXNbcF0sXG5cdFx0XHRcdFx0XHRkMjogZDIsXG5cdFx0XHRcdFx0XHRwMTogZDEuZGVsdGFzICYmIGQxLmRlbHRhc1twXSAmJiBkMS5kZWx0YXNbcF0uYXJnICYmIGQxLmRlbHRhc1twXS5hcmcsXG5cdFx0XHRcdFx0XHRwMjogZDIuYXJnXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRyZXR1cm4gbmV3IChkZWx0YUpzLm9wZXJhdGlvbnNbdHlwZV0pKGZuKGFyZ3MpKTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gYXNzZXJ0RGVmaW5lZCh2YWwsIG9wVHlwZSkge1xuXHRcdFx0XHRVLmFzc2VydChVLmlzRGVmaW5lZCh2YWwpLFxuXHRcdFx0XHRcdFx0YFRoZSBvcGVyYXRpb24gJyR7b3BUeXBlfScgZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgZGVmaW5lZC5gKTtcblx0XHRcdH1cblx0XHRcdGZ1bmN0aW9uIGFzc2VydFVuZGVmaW5lZCh2YWwsIG9wVHlwZSkge1xuXHRcdFx0XHRVLmFzc2VydChVLmlzVW5kZWZpbmVkKHZhbCksXG5cdFx0XHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnJHtvcFR5cGV9JyBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSB1bmRlZmluZWQuYCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gL1xuXG5cdFx0XHQvKiBkZWNsYXJpbmcgdGhlIGJhc2ljIG9wZXJhdGlvbiB0eXBlcyAqL1xuXHRcdFx0Ly8gJ01vZGlmeScgaXMgdGhlIG1vc3QgZnVuZGFtZW50YWwgb3BlcmF0aW9uLFxuXHRcdFx0Ly8gIGFuZCBpcyBkZWZpbmVkIGFib3ZlIHJhdGhlciB0aGFuIGhlcmVcblx0XHRcdHRoaXMubmV3T3BlcmF0aW9uVHlwZSgnQWRkJywge1xuXHRcdFx0XHRhcHBseVRvKG9iaiwgcCkge1xuXHRcdFx0XHRcdGFzc2VydFVuZGVmaW5lZChvYmpbcF0sICdBZGQnKTtcblx0XHRcdFx0XHRvYmpbcF0gPSB0aGlzLmFyZztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLm5ld09wZXJhdGlvblR5cGUoJ1JlbW92ZScsIHtcblx0XHRcdFx0YXBwbHlUbyhvYmosIHApIHtcblx0XHRcdFx0XHRhc3NlcnREZWZpbmVkKG9ialtwXSwgJ1JlbW92ZScpO1xuXHRcdFx0XHRcdGRlbGV0ZSBvYmpbcF07XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0dGhpcy5uZXdPcGVyYXRpb25UeXBlKCdGb3JiaWQnLCB7XG5cdFx0XHRcdGFwcGx5VG8ob2JqLCBwKSB7XG5cdFx0XHRcdFx0YXNzZXJ0VW5kZWZpbmVkKG9ialtwXSwgJ0ZvcmJpZCcpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHRoaXMubmV3T3BlcmF0aW9uVHlwZSgnUmVwbGFjZScsIHtcblx0XHRcdFx0YXBwbHlUbyhvYmosIHApIHtcblx0XHRcdFx0XHRhc3NlcnREZWZpbmVkKG9ialtwXSwgJ1JlcGxhY2UnKTtcblx0XHRcdFx0XHRvYmpbcF0gPSB0aGlzLmFyZztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gL1xuXG5cdFx0XHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdNb2RpZnknICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignTW9kaWZ5JywgJ01vZGlmeScsIChkMSwgcCwgZDIpID0+IHtcblx0XHRcdFx0T2JqZWN0LmtleXMoZDIuZGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdFx0ZDEuY29tcG9zZShwLCBkMi5kZWx0YXNbcHJvcF0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIGQxLmRlbHRhc1twXTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdBZGQnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignTW9kaWZ5JywgJ0FkZCcgICAsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ0FkZCcgICAsICdBZGQnICAgLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdBZGQnICAgLCAnTW9kaWZ5JywgZCgnQWRkJywgKHtkMSwgZDJ9KSA9PiAoZDIuYXBwbHlUbyhkMSwgJ2FyZycpLCBkMS5hcmcpKSk7XG5cblx0XHRcdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1JlbW92ZScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdNb2RpZnknLCAnUmVtb3ZlJywgZCgnUmVtb3ZlJykpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignQWRkJyAgICwgJ1JlbW92ZScsIGQoJ0ZvcmJpZCcpKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1JlbW92ZScsICdNb2RpZnknLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdSZW1vdmUnLCAnQWRkJyAgICwgZCgnUmVwbGFjZScsICdwMicpKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1JlbW92ZScsICdSZW1vdmUnLCBlcnJvcik7XG5cblx0XHRcdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ0ZvcmJpZCcgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdNb2RpZnknLCAnRm9yYmlkJywgZXJyb3IpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignQWRkJyAgICwgJ0ZvcmJpZCcsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1JlbW92ZScsICdGb3JiaWQnLCBkKCdSZW1vdmUnKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdGb3JiaWQnLCAnTW9kaWZ5JywgZXJyb3IpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignRm9yYmlkJywgJ0FkZCcgICAsIGQoJ0FkZCcsICdwMicpKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ0ZvcmJpZCcsICdSZW1vdmUnLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdGb3JiaWQnLCAnRm9yYmlkJywgZCgnRm9yYmlkJykpO1xuXG5cdFx0XHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdSZXBsYWNlJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignTW9kaWZ5JyAsICdSZXBsYWNlJywgZCgnUmVwbGFjZScsICdwMicpKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ0FkZCcgICAgLCAnUmVwbGFjZScsIGQoJ0FkZCcsICdwMicpKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1JlbW92ZScgLCAnUmVwbGFjZScsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ0ZvcmJpZCcgLCAnUmVwbGFjZScsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1JlcGxhY2UnLCAnTW9kaWZ5JyAsIGQoJ1JlcGxhY2UnLCAoe2QxLCBkMn0pID0+IChkMi5hcHBseVRvKGQxLCAnYXJnJyksIGQxLmFyZykpKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1JlcGxhY2UnLCAnQWRkJyAgICAsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1JlcGxhY2UnLCAnUmVtb3ZlJyAsIGQoJ1JlbW92ZScpKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1JlcGxhY2UnLCAnRm9yYmlkJyAsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1JlcGxhY2UnLCAnUmVwbGFjZScsIGQoJ1JlcGxhY2UnLCAncDInKSk7XG5cblx0XHR9LFxuXG5cdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHQgKlxuXHRcdCAqL1xuXHRcdF9kZWZpbmVBcnJheU9wZXJhdGlvblR5cGVzKCkge1xuXG5cdFx0XHR2YXIgZGVsdGFKcyA9IHRoaXM7XG5cblx0XHRcdC8vIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gL1xuXG5cdFx0XHQvKiBjb252ZW5pZW5jZSBkZWZpbml0aW9ucyBmb3IgdGhlIGFwcGxpY2F0aW9uIGFuZCBjb21wb3NpdGlvbiBmdW5jdGlvbnMgYmVsb3cgKi9cblx0XHRcdHZhciBlcnJvciA9IChkMSwgcCwgZDIpID0+IHsgdGhyb3cgbmV3IEVycm9yKGBZb3UgY2Fubm90IGZvbGxvdyAnJHtkMVtwXS50eXBlfScgd2l0aCAnJHtkMi50eXBlfScuYCkgfTtcblxuXHRcdFx0ZnVuY3Rpb24gZCh0eXBlLCAgZm4gPSAoKCk9Pm51bGwpKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgZm4gPT09ICdzdHJpbmcnKSB7IGZuID0gKCh2KSA9PiAobykgPT4gb1t2XSkoZm4pIH1cblx0XHRcdFx0cmV0dXJuIChkMSwgcCwgZDIpID0+IHtcblx0XHRcdFx0XHR2YXIgYXJncyA9IHtcblx0XHRcdFx0XHRcdGQxOiBkMS5kZWx0YXMgJiYgZDEuZGVsdGFzW3BdLFxuXHRcdFx0XHRcdFx0ZDI6IGQyLFxuXHRcdFx0XHRcdFx0cDE6IGQxLmRlbHRhcyAmJiBkMS5kZWx0YXNbcF0gJiYgZDEuZGVsdGFzW3BdLmFyZyxcblx0XHRcdFx0XHRcdHAyOiBkMi5hcmdcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdHJldHVybiBuZXcgKGRlbHRhSnMub3BlcmF0aW9uc1t0eXBlXSkoZm4oYXJncykpO1xuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHRmdW5jdGlvbiBhc3NlcnREZWZpbmVkKHZhbCwgb3BUeXBlKSB7XG5cdFx0XHRcdFUuYXNzZXJ0KFUuaXNEZWZpbmVkKHZhbCksXG5cdFx0XHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnJHtvcFR5cGV9JyBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBkZWZpbmVkLmApO1xuXHRcdFx0fVxuXHRcdFx0ZnVuY3Rpb24gYXNzZXJ0QXJyYXkodmFsLCBvcFR5cGUpIHtcblx0XHRcdFx0VS5hc3NlcnQoQXJyYXkuaXNBcnJheSh2YWwpLFxuXHRcdFx0XHRcdFx0YFRoZSBvcGVyYXRpb24gJyR7b3BUeXBlfScgZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgYW4gYXJyYXkuYCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gL1xuXG5cdFx0XHQvKiBkZWNsYXJpbmcgdGhlIGFycmF5IG9wZXJhdGlvbiB0eXBlcyAqL1xuXHRcdFx0dGhpcy5uZXdPcGVyYXRpb25UeXBlKCdQdXQnLCB7XG5cdFx0XHRcdGNvbnN0cnVjdCgpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5tZXRhLm1ldGhvZCkge1xuXHRcdFx0XHRcdFx0dGhpcy52YWx1ZXMgPSBbe1xuXHRcdFx0XHRcdFx0XHRtZXRob2Q6IHRoaXMubWV0YS5tZXRob2QsXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiB0aGlzLmFyZ1xuXHRcdFx0XHRcdFx0fV07XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsdWVzID0gW107XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRhcHBseVRvKG9iaiwgcCkge1xuXHRcdFx0XHRcdGFzc2VydERlZmluZWQob2JqW3BdLCAnUHV0Jyk7XG5cdFx0XHRcdFx0YXNzZXJ0QXJyYXkob2JqW3BdLCAnUHV0Jyk7XG5cdFx0XHRcdFx0dGhpcy52YWx1ZXMuZm9yRWFjaCgoe21ldGhvZCwgdmFsdWV9KSA9PiB7XG5cdFx0XHRcdFx0XHRzd2l0Y2ggKG1ldGhvZCkge1xuXHRcdFx0XHRcdFx0XHRjYXNlICdwcmVwZW5kJzoge1xuXHRcdFx0XHRcdFx0XHRcdG9ialtwXS51bnNoaWZ0KHZhbHVlKTtcblx0XHRcdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0XHRcdFx0Y2FzZSAnaW5zZXJ0Jzoge1xuXHRcdFx0XHRcdFx0XHRcdC8vICdJbnNlcnQnIGRvZXNuJ3QgKmhhdmUqIHRvIHVzZSBhIHJhbmRvbSBwb3NpdGlvbi4gQW55IHBvc2l0aW9uIHdpbGwgZG8uXG5cdFx0XHRcdFx0XHRcdFx0Ly8gIE5vbmV0aGVsZXNzLCB3ZSB1c2UgYSByYW5kb20gcG9zaXRpb24gZm9yIHRlc3RpbmcgcHVycG9zZXMuXG5cdFx0XHRcdFx0XHRcdFx0dmFyIHBvc2l0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG9ialtwXS5sZW5ndGggKyAxKSk7XG5cdFx0XHRcdFx0XHRcdFx0b2JqW3BdLnNwbGljZShwb3NpdGlvbiwgMCwgdmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRjYXNlICdhcHBlbmQnOiB7XG5cdFx0XHRcdFx0XHRcdFx0b2JqW3BdLnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRtZXRob2RzOiBbJ3ByZXBlbmQnLCAnaW5zZXJ0JywgJ2FwcGVuZCddXG5cdFx0XHR9KTtcblxuXG5cdFx0XHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdSZXBsYWNlJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignTW9kaWZ5JyAsICdQdXQnICAgICwgZXJyb3IpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignQWRkJyAgICAsICdQdXQnICAgICwgZCgnQWRkJywgKHtkMSwgZDJ9KSA9PiAoZDIuYXBwbHlUbyhkMSwgJ2FyZycpLCBkMS5hcmcpKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdSZW1vdmUnICwgJ1B1dCcgICAgLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdGb3JiaWQnICwgJ1B1dCcgICAgLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdSZXBsYWNlJywgJ1B1dCcgICAgLCBkKCdSZXBsYWNlJywgKHtkMSwgZDJ9KSA9PiAoZDIuYXBwbHlUbyhkMSwgJ2FyZycpLCBkMS5hcmcpKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdQdXQnICAgICwgJ01vZGlmeScgLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdQdXQnICAgICwgJ0FkZCcgICAgLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdQdXQnICAgICwgJ1JlbW92ZScgLCBkKCdSZW1vdmUnKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdQdXQnICAgICwgJ0ZvcmJpZCcgLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdQdXQnICAgICwgJ1JlcGxhY2UnLCBkKCdSZXBsYWNlJywgJ3AyJykpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignUHV0JyAgICAsICdQdXQnICAgICwgKGQxLCBwLCBkMikgPT4ge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gbmV3IGRlbHRhSnMub3BlcmF0aW9ucy5QdXQoKTtcblx0XHRcdFx0cmVzdWx0LnZhbHVlcyA9IChkMS5kZWx0YXNbcF0udmFsdWVzKS5jb25jYXQoZDIudmFsdWVzKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0pO1xuXG5cblxuXG5cdFx0fSxcblxuXHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0ICpcblx0XHQgKi9cblx0XHRfZGVmaW5lRGVsdGFNb2RlbE9wZXJhdGlvblR5cGUoKSB7XG5cblx0XHRcdC8vdGhpcy5uZXdPcGVyYXRpb25UeXBlKCdEZWx0YU1vZGVsJywgZnVuY3Rpb24gYXBwbHlUbyhvYmosIHApIHtcblx0XHRcdC8vXHR0aGlzLmFyZy50b3BvbG9naWNhbGx5KChzdWJEZWx0YSkgPT4ge1xuXHRcdFx0Ly9cdFx0Ly8gdGhlIGdyYXBoIGlzIGFsbG93ZWQgdG8gY29udGFpbiAnbnVsbCcgdmVydGljZXMgZm9yIG9yZGVyaW5nIHB1cnBvc2VzXG5cdFx0XHQvL1x0XHRpZiAoc3ViRGVsdGEpIHsgc3ViRGVsdGEuYXBwbHlUbyhvYmosIHApIH1cblx0XHRcdC8vXHR9KTtcblx0XHRcdC8vfSwge1xuXHRcdFx0Ly9cblx0XHRcdC8vfSk7XG5cdFx0XHQvL1xuXHRcdFx0Ly9cblx0XHRcdC8vLyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnRGVsdGFNb2RlbCcgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdC8vLy8gdG8gY29tcG9zZSBkZWx0YSBtb2RlbHMsIHdlIHNpbXBseSBoYXZlIG9uZSBhcHBseSBhZnRlciB0aGUgb3RoZXJcblx0XHRcdC8vLy8gd2l0aG91dCBhbnkgY29tcG9zYWJpbGl0eSBjaGVja3M7IGluIHRoZSBmdXR1cmUsIHRoaXMgbWF5IGJlY29tZSBtb3JlIGNsZXZlclxuXHRcdFx0Ly92YXIgb3JkZXJlZEJ5U2ltcGxlRGVsdGFNb2RlbCA9IChkMSwgcCwgZDIpID0+IHtcblx0XHRcdC8vXHR2YXIgZ3JhcGggPSBuZXcgSnNHcmFwaCgpO1xuXHRcdFx0Ly9cdGdyYXBoLmFkZE5ld1ZlcnRleCgxLCBkMS5kZWx0YXNbcF0pO1xuXHRcdFx0Ly9cdGdyYXBoLmFkZE5ld1ZlcnRleCgyLCBkMik7XG5cdFx0XHQvL1x0Z3JhcGguYWRkTmV3RWRnZSgxLCAyKTtcblx0XHRcdC8vXHRyZXR1cm4gZDEuZGVsdGFzW3BdID0gbmV3IGRlbHRhSnMub3BlcmF0aW9ucy5EZWx0YU1vZGVsKGdyYXBoKTtcblx0XHRcdC8vfTtcblx0XHRcdC8vdGhpcy5uZXdDb21wb3NpdGlvbignTW9kaWZ5JywgICAgICdEZWx0YU1vZGVsJywgb3JkZXJlZEJ5U2ltcGxlRGVsdGFNb2RlbCk7XG5cdFx0XHQvL3RoaXMubmV3Q29tcG9zaXRpb24oJ0FkZCcsICAgICAgICAnRGVsdGFNb2RlbCcsIG9yZGVyZWRCeVNpbXBsZURlbHRhTW9kZWwpO1xuXHRcdFx0Ly90aGlzLm5ld0NvbXBvc2l0aW9uKCdSZW1vdmUnLCAgICAgJ0RlbHRhTW9kZWwnLCBvcmRlcmVkQnlTaW1wbGVEZWx0YU1vZGVsKTtcblx0XHRcdC8vdGhpcy5uZXdDb21wb3NpdGlvbignRm9yYmlkJywgICAgICdEZWx0YU1vZGVsJywgb3JkZXJlZEJ5U2ltcGxlRGVsdGFNb2RlbCk7XG5cdFx0XHQvL3RoaXMubmV3Q29tcG9zaXRpb24oJ1JlcGxhY2UnLCAgICAnRGVsdGFNb2RlbCcsIG9yZGVyZWRCeVNpbXBsZURlbHRhTW9kZWwpO1xuXHRcdFx0Ly90aGlzLm5ld0NvbXBvc2l0aW9uKCdEZWx0YU1vZGVsJywgJ01vZGlmeScsICAgICBvcmRlcmVkQnlTaW1wbGVEZWx0YU1vZGVsKTtcblx0XHRcdC8vdGhpcy5uZXdDb21wb3NpdGlvbignRGVsdGFNb2RlbCcsICdBZGQnLCAgICAgICAgb3JkZXJlZEJ5U2ltcGxlRGVsdGFNb2RlbCk7XG5cdFx0XHQvL3RoaXMubmV3Q29tcG9zaXRpb24oJ0RlbHRhTW9kZWwnLCAnUmVtb3ZlJywgICAgIG9yZGVyZWRCeVNpbXBsZURlbHRhTW9kZWwpO1xuXHRcdFx0Ly90aGlzLm5ld0NvbXBvc2l0aW9uKCdEZWx0YU1vZGVsJywgJ0ZvcmJpZCcsICAgICBvcmRlcmVkQnlTaW1wbGVEZWx0YU1vZGVsKTtcblx0XHRcdC8vdGhpcy5uZXdDb21wb3NpdGlvbignRGVsdGFNb2RlbCcsICdSZXBsYWNlJywgICAgb3JkZXJlZEJ5U2ltcGxlRGVsdGFNb2RlbCk7XG5cdFx0XHQvL3RoaXMubmV3Q29tcG9zaXRpb24oJ0RlbHRhTW9kZWwnLCAnRGVsdGFNb2RlbCcsIG9yZGVyZWRCeVNpbXBsZURlbHRhTW9kZWwpO1xuXG5cdFx0fVxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdH0pO1xuXG5cblx0cmV0dXJuIERlbHRhSnM7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9kZWx0YS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJKc0dyYXBoXCIsXCJjb21tb25qczJcIjpcImpzLWdyYXBoXCIsXCJjb21tb25qc1wiOlwianMtZ3JhcGhcIixcImFtZFwiOlwianMtZ3JhcGhcIn1cbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoKCkgPT4ge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFUgPSB7XG5cblx0XHQvKiBjcmVhdGUgYSBuZXcgY2xhc3MsIGdpdmVuIGEgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZSAqL1xuXHRcdG5ld0NsYXNzKGNvbnN0cnVjdG9yLCBwcm90b3R5cGUgPSB7fSkge1xuXHRcdFx0dmFyIGNscyA9IGNvbnN0cnVjdG9yO1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvKiBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZSAqL1xuXHRcdG5ld1N1YmNsYXNzKHN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yTWFrZXIsIHByb3RvdHlwZSA9IHt9KSB7XG5cdFx0XHR2YXIgY2xzID0gY29uc3RydWN0b3JNYWtlcihzdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcik7XG5cdFx0XHRjbHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG5cdFx0XHRVLmV4dGVuZChjbHMucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cdFx0fSxcblxuXHRcdC8qICBleHRlbmQgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllcyAgICAgKi9cblx0XHQvKiAgb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnMgICovXG5cdFx0LyogIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdFx0XHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqMSwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBvYmoxO1xuXHRcdH0sXG5cblx0XHQvKiBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWQgd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVycyAqL1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIG5ld19vYmogPSBPYmplY3QuY3JlYXRlKENvbnN0cnVjdG9yRm4ucHJvdG90eXBlKTtcblx0XHRcdENvbnN0cnVjdG9yRm4uYXBwbHkobmV3X29iaiwgYXJncyk7XG5cdFx0XHRyZXR1cm4gbmV3X29iajtcblx0XHR9LFxuXG5cdFx0LyogYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYSBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlICovXG5cdFx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0XHR9LFxuXG5cdFx0LyogdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgICovXG5cdFx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0LyogdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYCkgKi9cblx0XHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0LyogcmVwZWF0IGEgc3RyaW5nIGEgZ2l2ZW4gbnVtYmVyIG9mIHRpbWVzICovXG5cdFx0cmVwZWF0KG5yLCBzdHIpIHsgcmV0dXJuIG5ldyBBcnJheShucisxKS5qb2luKHN0cikgfVxuXHR9O1xuXG5cdHJldHVybiBVO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9taXNjLmpzXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiZGVsdGEuanMifQ==