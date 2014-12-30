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
	    }, {
	      clone: function() {
	        return new this.constructor(this.arg, this.meta);
	      },
	      compose: function(otherDelta) {
	        var arr = thisDeltaJs.compositions[this.type][otherDelta.type];
	        U.assert(arr.length > 0, ("No composition is defined between '" + this.type + "' and '" + otherDelta.type + "'."));
	        return arr[0](this, otherDelta);
	      },
	      toString: function() {
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
	      }
	    });
	    this.operations.Modify = U.newSubclass(this.operations.Delta, (function(superFn) {
	      return function(arg, meta) {
	        superFn.call(this, arg, meta);
	        this.deltas = {};
	      };
	    }), {
	      get type() {
	        return 'Modify';
	      },
	      clone: function() {
	        var $__0 = this;
	        var result = thisDeltaJs.operations.Delta.prototype.clone.call(this, this.arg, this.meta);
	        Object.keys(this.deltas).forEach((function(prop) {
	          result.deltas[prop] = $__0.deltas[prop].clone();
	        }));
	        return result;
	      },
	      applyTo: function(field) {
	        var $__0 = this;
	        U.assert(field.value instanceof Object, "The 'Modify' operation expects the property to be an already defined Object.");
	        Object.keys(this.deltas).forEach((function(prop) {
	          $__0.deltas[prop].applyTo(wf(field.value, prop));
	        }));
	      },
	      applyToPropertiesOf: function(obj) {
	        var $__0 = this;
	        U.assert(obj instanceof Object, "The 'Modify' operation expects the property to be an already defined Object.");
	        Object.keys(this.deltas).forEach((function(prop) {
	          $__0.deltas[prop].applyTo(wf(obj, prop));
	        }));
	      },
	      modify: function(path) {
	        return this._addOperation('Modify', path);
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
	          var composition = this.deltas[prop] = this.deltas[prop].compose(newDelta);
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
	      clone: function() {
	        var result = this.operations.Modify.prototype.clone.call(this, this.arg, this.meta);
	        result.target = this.target;
	        return result;
	      },
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
	        (new thisDeltaJs.operations[opType](arg, meta)).applyTo(wf(this.target, prop));
	        return this;
	      }
	    });
	    this.compositions['Modify'] = {'Modify': []};
	    this._defineStandardOperationTypes();
	  }, {
	    get Delta() {
	      return this.operations.Modify;
	    },
	    newOperationType: function(name, $__1) {
	      var $__2 = $__1,
	          construct = $__2.construct,
	          applyTo = $__2.applyTo,
	          methods = $__2.methods,
	          clone = $__2.clone;
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
	      if (U.isDefined(clone)) {
	        this.operations[name].prototype.clone = clone;
	      }
	    },
	    newComposition: function(type1, type2, compose) {
	      this.compositions[type1][type2].push(compose);
	    },
	    _defineStandardOperationTypes: function() {
	      var thisDeltaJs = this;
	      function error(d1, d2) {
	        throw new Error(("You cannot follow '" + d1.type + "' with '" + d2.type + "'."));
	      }
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
	        return (function(d1, d2) {
	          return new (thisDeltaJs.operations[type])(fn({
	            d1: d1,
	            d2: d2,
	            p1: d1.arg,
	            p2: d2.arg
	          }));
	        });
	      }
	      function p2($__1) {
	        var v = $__1.p2;
	        return v;
	      }
	      function applyD2ToP1(d1, d2) {
	        var result = d1.clone();
	        d2.applyTo(wf(result, 'arg'));
	        return result;
	      }
	      function assertDefined(val, opType) {
	        U.assert(U.isDefined(val), ("The operation '" + opType + "' expects the property to be defined."));
	      }
	      function assertUndefined(val, opType) {
	        U.assert(U.isUndefined(val), ("The operation '" + opType + "' expects the property to be undefined."));
	      }
	      function assertArray(val, opType) {
	        U.assert(Array.isArray(val), ("The operation '" + opType + "' expects the property to be an array."));
	      }
	      this.newOperationType('Add', {applyTo: function(field) {
	          assertUndefined(field.value, 'Add');
	          field.value = this.arg;
	        }});
	      this.newOperationType('Remove', {applyTo: function(field) {
	          assertDefined(field.value, 'Remove');
	          field.delete();
	        }});
	      this.newOperationType('Forbid', {applyTo: function(field) {
	          assertUndefined(field.value, 'Forbid');
	        }});
	      this.newOperationType('Replace', {applyTo: function(field) {
	          assertDefined(field.value, 'Replace');
	          field.value = this.arg;
	        }});
	      this.newComposition('Modify', 'Modify', (function(d1, d2) {
	        var result = d1.clone();
	        Object.keys(d2.deltas).forEach((function(prop) {
	          result.deltas[prop].compose(d2.deltas[prop]);
	        }));
	        return result;
	      }));
	      this.newComposition('Modify', 'Add', error);
	      this.newComposition('Add', 'Add', error);
	      this.newComposition('Add', 'Modify', applyD2ToP1);
	      this.newComposition('Modify', 'Remove', d('Remove'));
	      this.newComposition('Add', 'Remove', d('Forbid'));
	      this.newComposition('Remove', 'Modify', error);
	      this.newComposition('Remove', 'Add', d('Replace', p2));
	      this.newComposition('Remove', 'Remove', error);
	      this.newComposition('Modify', 'Forbid', error);
	      this.newComposition('Add', 'Forbid', error);
	      this.newComposition('Remove', 'Forbid', d('Remove'));
	      this.newComposition('Forbid', 'Modify', error);
	      this.newComposition('Forbid', 'Add', d('Add', p2));
	      this.newComposition('Forbid', 'Remove', error);
	      this.newComposition('Forbid', 'Forbid', d('Forbid'));
	      this.newComposition('Modify', 'Replace', d('Replace', p2));
	      this.newComposition('Add', 'Replace', d('Add', p2));
	      this.newComposition('Remove', 'Replace', error);
	      this.newComposition('Forbid', 'Replace', error);
	      this.newComposition('Replace', 'Modify', applyD2ToP1);
	      this.newComposition('Replace', 'Add', error);
	      this.newComposition('Replace', 'Remove', d('Remove'));
	      this.newComposition('Replace', 'Forbid', error);
	      this.newComposition('Replace', 'Replace', d('Replace', p2));
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
	        clone: function() {
	          var result = thisDeltaJs.operations.Delta.prototype.clone.call(this, this.arg, this.meta);
	          result.values = [];
	          this.values.forEach((function(v) {
	            result.values.push(v);
	          }));
	          return result;
	        },
	        applyTo: function(field) {
	          assertDefined(field.value, 'Put');
	          assertArray(field.value, 'Put');
	          var arr = field.value;
	          this.values.forEach((function($__1) {
	            var $__2 = $__1,
	                method = $__2.method,
	                value = $__2.value;
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
	      this.newComposition('Modify', 'Put', error);
	      this.newComposition('Add', 'Put', applyD2ToP1);
	      this.newComposition('Remove', 'Put', error);
	      this.newComposition('Forbid', 'Put', error);
	      this.newComposition('Replace', 'Put', applyD2ToP1);
	      this.newComposition('Put', 'Modify', error);
	      this.newComposition('Put', 'Add', error);
	      this.newComposition('Put', 'Remove', d('Remove'));
	      this.newComposition('Put', 'Forbid', error);
	      this.newComposition('Put', 'Replace', d('Replace', p2));
	      this.newComposition('Put', 'Put', (function(d1, d2) {
	        var result = new thisDeltaJs.operations.Put();
	        result.values = (d1.values).concat(d2.values);
	        return result;
	      }));
	    }
	  });
	  DeltaJs.WritableField = U.newClass(function(obj, prop) {
	    this.obj = obj;
	    this.prop = prop;
	  }, {
	    get value() {
	      return this.obj[this.prop];
	    },
	    set value(v) {
	      this.obj[this.prop] = v;
	    },
	    delete: function() {
	      delete this.obj[this.prop];
	    }
	  });
	  function wf(obj, prop) {
	    return new DeltaJs.WritableField(obj, prop);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyODZiNWVmNjQ3NDFlYzMxZjQ0ZiIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvbWlzYy5qcyIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FBUSx1QkFBYSx3QkFBVSxDQUFHLDBDQUFVO0FBQzNDLGNBQVcsQ0FBQztBQU1SLGFBQU0sRUFBSSxXQUFVLENBQUMsUUFBUyxRQUFNLENBQUU7QUFJckMsbUJBQVUsRUFBSSxLQUFHLENBQUM7QUFJdEIsUUFBRyxXQUFXLEVBQUksR0FBQyxDQUFDO0FBQ3BCLFFBQUcsYUFBYSxFQUFJLEdBQUMsQ0FBQztBQUl0QixRQUFHLFdBQVcsTUFBTSxFQUFJLFdBQVUsQ0FBQyxTQUFVLEdBQUUsQ0FBRyxLQUFHLENBQUc7QUFDdkQsVUFBRyxJQUFJLEVBQUksSUFBRSxDQUFDO0FBQ2QsVUFBRyxLQUFLLEVBQUksS0FBRyxHQUFL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S0FBRTtBQUduRCxVQUFLLENBQUwsVUFBTyxFQUFDLENBQUcsSUFBRSxDQUFHO0FBQUUsWUFBTyxJQUFJLE1BQUssQ0FBQyxFQUFDLEVBQUUsR0FBQyxLQUFNLENBQUMsR0FBRSxDQUFDO0tBQUU7QUFBQSxHQUNwRCxDQUFDO0FBRUQsUUFBTyxHQUFDO0FBQ1Qsd0pBQUU7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpzLWdyYXBoXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkRlbHRhSnNcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJqcy1ncmFwaFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiRGVsdGFKc1wiXSA9IGZhY3Rvcnkocm9vdFtcIkpzR3JhcGhcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAyODZiNWVmNjQ3NDFlYzMxZjQ0ZlxuICoqLyIsImRlZmluZShbJy4vbWlzYy5qcycsICdqcy1ncmFwaCddLCBmdW5jdGlvbiAoVS8qLCBKc0dyYXBoKi8pIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0LyoqIHtAY2xhc3MgRGVsdGFKc31cblx0ICpcblx0ICovXG5cdHZhciBEZWx0YUpzID0gVS5uZXdDbGFzcyhmdW5jdGlvbiBEZWx0YUpzKCkge1xuXG5cblx0XHQvKiBhbGlhcyBmb3IgJ3RoaXMnICovXG5cdFx0dmFyIHRoaXNEZWx0YUpzID0gdGhpcztcblxuXG5cdFx0LyogdGhlIHRoaW5ncyBpbnN0YW5jZXMgb2YgJ0RlbHRhSnMnIGtlZXBzIHRyYWNrIG9mICovXG5cdFx0dGhpcy5vcGVyYXRpb25zID0ge307ICAgLy8gcHJvcGVydHkgLT4gRGVsdGFcblx0XHR0aGlzLmNvbXBvc2l0aW9ucyA9IHt9OyAvLyB0eXBlMSAtPiB0eXBlMiAtPiBbY29tcG9zZUZuXVxuXG5cblx0XHQvKiBkZWZpbmUgdGhlIGJhc2UgJ0RlbHRhJyBjbGFzcyAqLy8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0oRGVsdGEpXG5cdFx0dGhpcy5vcGVyYXRpb25zLkRlbHRhID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoYXJnLCBtZXRhKSB7XG5cdFx0XHR0aGlzLmFyZyA9IGFyZztcblx0XHRcdHRoaXMubWV0YSA9IG1ldGEgfHwge307XG5cdFx0fSwge1xuXHRcdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdFx0ICogVGhpcyBtZXRob2Qgc2hvdWxkIGJlIG92ZXJ3cml0dGVuIGJ5IHN1YmNsYXNzZXMgdG8gbWFrZSBhIGNsb25lIG9mICd0aGlzJyBkZWx0YS5cblx0XHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjb3BlcmF0aW9ucy5EZWx0YX0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHRcdCAqL1xuXHRcdFx0Y2xvbmUoKSB7XG5cdFx0XHRcdHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLmFyZywgdGhpcy5tZXRhKTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0XHQgKiBAcGFyYW0gb3RoZXJEZWx0YSB7RGVsdGFKcyNvcGVyYXRpb25zLkRlbHRhfVxuXHRcdFx0ICovXG5cdFx0XHRjb21wb3NlKG90aGVyRGVsdGEpIHtcblx0XHRcdFx0dmFyIGFyciA9IHRoaXNEZWx0YUpzLmNvbXBvc2l0aW9uc1t0aGlzLnR5cGVdW290aGVyRGVsdGEudHlwZV07XG5cdFx0XHRcdFUuYXNzZXJ0KGFyci5sZW5ndGggPiAwLFxuXHRcdFx0XHRcdFx0YE5vIGNvbXBvc2l0aW9uIGlzIGRlZmluZWQgYmV0d2VlbiAnJHt0aGlzLnR5cGV9JyBhbmQgJyR7b3RoZXJEZWx0YS50eXBlfScuYCk7XG5cdFx0XHRcdHJldHVybiBhcnJbMF0odGhpcywgb3RoZXJEZWx0YSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gaW5kZW50THZsIHtOdW1iZXI/fVxuXHRcdFx0ICogQHBhcmFtIHByb3AgICAgICB7U3RyaW5nP31cblx0XHRcdCAqL1xuXHRcdFx0dG9TdHJpbmcoaW5kZW50THZsID0gMCwgcHJvcCA9ICcocm9vdCknKSB7XG5cdFx0XHRcdHZhciBpbmRlbnQgPSBVLnJlcGVhdCgwICsgaW5kZW50THZsLCAnICAgICcpO1xuXHRcdFx0XHR2YXIgc3RyID0gYCR7aW5kZW50fSR7dGhpcy50eXBlfSAnJHtwcm9wfSdgO1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQodGhpcy5hcmcpKSB7XG5cdFx0XHRcdFx0c3RyICs9IGA6ICR7SlNPTi5zdHJpbmdpZnkodGhpcy5hcmcpLnNsaWNlKDEsIC0xKX1gO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh0aGlzLmRlbHRhcyAmJiBPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdHN0ciArPSAnXFxuJyArIE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKVxuXHRcdFx0XHRcdFx0XHQubWFwKChwKSA9PiB0aGlzLmRlbHRhc1twXS50b1N0cmluZyhpbmRlbnRMdmwgKyAxLCBwKSlcblx0XHRcdFx0XHRcdFx0LmpvaW4oJ1xcbicpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBzdHI7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0oL0RlbHRhKVxuXG5cblx0XHQvL3RoaXMub3ZlcmxvYWRzID0ge307IC8vIG1ldGhvZCAtPiBbZGVsdGEtY2xhc3Nlc11cblx0XHQvL1xuXHRcdC8vLyogZGVmaW5lIHRoZSAnT3ZlcmxvYWRlZERlbHRhJyBjbGFzcywgd2hpY2ggaW52b2tlcyBkZWx0YXMgYmFzZWQgb24gdGFyZ2V0IHByZWRpY2F0ZXMgKi8vLy0tLS0oT3ZlcmxvYWRlZERlbHRhKVxuXHRcdC8vdGhpcy5vcGVyYXRpb25zLk92ZXJsb2FkZWREZWx0YSA9IFUubmV3U3ViY2xhc3ModGhpcy5vcGVyYXRpb25zLkRlbHRhLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKGFyZywgbWV0YSkge1xuXHRcdC8vXHRzdXBlckZuLmNhbGwodGhpcywgYXJnLCBtZXRhKTtcblx0XHQvL30sIHtcblx0XHQvL1x0Z2V0IHR5cGUoKSB7IHJldHVybiB0aGlzLm92ZXJsb2Fkc1t0aGlzLm1ldGEubWV0aG9kXS5tYXAoKGNscykgPT4gY2xzLnR5cGUpLmpvaW4oJ3wnKSB9LFxuXHRcdC8vXG5cdFx0Ly8gIGNsb25lKCkge30sIC8vIFRPRE9cblx0XHQvL1xuXHRcdC8vXHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0Ly9cdCAqXG5cdFx0Ly9cdCAqIEBwYXJhbSBmaWVsZCB7V3JpdGFibGVGaWVsZH1cblx0XHQvL1x0ICovXG5cdFx0Ly9cdGFwcGx5VG8oZmllbGQpIHtcblx0XHQvL1x0XHQvLyBUT0RPXG5cdFx0Ly9cdH0sXG5cdFx0Ly9cblx0XHQvL1x0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdC8vXHQgKlxuXHRcdC8vXHQgKiBAcGFyYW0gcHJvcCAgICAgICB7U3RyaW5nfVxuXHRcdC8vXHQgKiBAcGFyYW0gb3RoZXJEZWx0YSB7RGVsdGFKcyNvcGVyYXRpb25zLkRlbHRhfVxuXHRcdC8vXHQgKi9cblx0XHQvL1x0Y29tcG9zZShwcm9wLCBvdGhlckRlbHRhKSB7XG5cdFx0Ly9cdFx0Ly8gVE9ET1xuXHRcdC8vXHR9LFxuXHRcdC8vXG5cdFx0Ly99KTtcblx0XHQvLy8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0oL092ZXJsb2FkZWREZWx0YSlcblxuXG5cdFx0LyogZGVmaW5lIHRoZSBmdW5kYW1lbnRhbCAnTW9kaWZ5JyBkZWx0YSAqLy8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0oTW9kaWZ5KVxuXHRcdHRoaXMub3BlcmF0aW9ucy5Nb2RpZnkgPSBVLm5ld1N1YmNsYXNzKHRoaXMub3BlcmF0aW9ucy5EZWx0YSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIChhcmcsIG1ldGEpIHtcblx0XHRcdHN1cGVyRm4uY2FsbCh0aGlzLCBhcmcsIG1ldGEpO1xuXHRcdFx0dGhpcy5kZWx0YXMgPSB7fTtcblx0XHRcdC8vIFRPRE86IGFsbG93IG9wZXJhdGlvbnMgdG8gYmUgYWRkZWQgdGhyb3VnaCBhbiBvcHRpb25hbCBhcmd1bWVudFxuXHRcdH0sIHtcblx0XHRcdGdldCB0eXBlKCkgeyByZXR1cm4gJ01vZGlmeScgfSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdFx0ICogQHJldHVybiB7RGVsdGFKcyNvcGVyYXRpb25zLk1vZGlmeX0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHRcdCAqL1xuXHRcdFx0Y2xvbmUoKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSB0aGlzRGVsdGFKcy5vcGVyYXRpb25zLkRlbHRhLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm1ldGEpOyAvLyBzdXBlcigpXG5cdFx0XHRcdE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdFx0cmVzdWx0LmRlbHRhc1twcm9wXSA9IHRoaXMuZGVsdGFzW3Byb3BdLmNsb25lKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogQHBhcmFtIGZpZWxkIHtEZWx0YUpzLldyaXRhYmxlRmllbGR9XG5cdFx0XHQgKi9cblx0XHRcdGFwcGx5VG8oZmllbGQpIHtcblx0XHRcdFx0VS5hc3NlcnQoZmllbGQudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QsXG5cdFx0XHRcdFx0XHRgVGhlICdNb2RpZnknIG9wZXJhdGlvbiBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBhbiBhbHJlYWR5IGRlZmluZWQgT2JqZWN0LmApO1xuXHRcdFx0XHRPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuZGVsdGFzW3Byb3BdLmFwcGx5VG8od2YoZmllbGQudmFsdWUsIHByb3ApKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gb2JqICB7T2JqZWN0fVxuXHRcdFx0ICovXG5cdFx0XHRhcHBseVRvUHJvcGVydGllc09mKG9iaikge1xuXHRcdFx0XHRVLmFzc2VydChvYmogaW5zdGFuY2VvZiBPYmplY3QsXG5cdFx0XHRcdFx0XHRgVGhlICdNb2RpZnknIG9wZXJhdGlvbiBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBhbiBhbHJlYWR5IGRlZmluZWQgT2JqZWN0LmApO1xuXHRcdFx0XHRPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuZGVsdGFzW3Byb3BdLmFwcGx5VG8od2Yob2JqLCBwcm9wKSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogQHBhcmFtIHBhdGgge1N0cmluZ31cblx0XHRcdCAqL1xuXHRcdFx0bW9kaWZ5KHBhdGgpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2FkZE9wZXJhdGlvbignTW9kaWZ5JywgcGF0aCk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdFx0ICogQHBhcmFtIG9wVHlwZSB7U3RyaW5nfVxuXHRcdFx0ICogQHBhcmFtIHBhdGggICB7U3RyaW5nfVxuXHRcdFx0ICogQHBhcmFtIGFyZyAgICB7Kn1cblx0XHRcdCAqIEBwYXJhbSBtZXRhICAge09iamVjdH0gLSBtZXRhIGluZm9ybWF0aW9uIGFib3V0IHRoZSBvcGVyYXRpb25cblx0XHRcdCAqIEByZXR1cm4ge3twcm9wOiBTdHJpbmcsIHJlc3VsdDogRGVsdGFKcyNvcGVyYXRpb25zLm1vZGlmeX19IC0gdGhlIGRlZXBlc3QgJ01vZGlmeScgZGVsdGEgaW52b2x2ZWQgaW4gdGhpcyBtZXRob2QtY2FsbFxuXHRcdFx0ICovXG5cdFx0XHRfcHJlUHJvY2Vzc05ld09wZXJhdGlvbihvcFR5cGUsIHBhdGgsIGFyZywgbWV0YSkge1xuXG5cdFx0XHRcdC8qIGRpc3NlY3QgdGhlICdwYXRoJyBzdHJpbmcgKi9cblx0XHRcdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vICAxMTExMSAgMjIyMjIyMjIyMjIgIDMzICAvL1xuXHRcdFx0XHR2YXIgbWF0Y2ggPSBwYXRoLm1hdGNoKC9eKFsuI10/KShcXHcrfFxcKFxcdytcXCkpKC4qKSQvKTtcblx0XHRcdFx0VS5hc3NlcnQobWF0Y2gsIGBUaGUgcGF0aCBzdHJpbmcgJyR7cGF0aH0nIGlzIG5vdCB3ZWxsIGZvcm1lZC5gKTtcblx0XHRcdFx0dmFyIFssIGxlYWQsIHByb3AsIHJlc3RdID0gbWF0Y2g7XG5cdFx0XHRcdHZhciByZXN1bHQgPSBudWxsO1xuXG5cdFx0XHRcdGlmIChsZWFkID09PSAnIycpIHtcblx0XHRcdFx0XHQvKiBpZiAncGF0aCcgaGFzIGEgbGVhZGluZyAnIycgY2hhcmFjdGVyLCB0cmFuc2Zvcm0gaXQgYW5kIHJlY2FsbCB0aGlzIG1ldGhvZCAqL1xuXHRcdFx0XHRcdC8vIHRoZSAjIHNlcGFyYXRvciBleHBlY3RzIHRoZSBjdXJyZW50IG9iamVjdCB0byBiZSBhIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLFxuXHRcdFx0XHRcdC8vIGFuZCB5aWVsZHMgYSBkZWx0YSB0byBtb2RpZnkgbmV3IGluc3RhbmNlcyBvZiB0aGUgY29ycmVzcG9uZGluZyBjbGFzc1xuXHRcdFx0XHRcdHJlc3VsdCA9IHRoaXMuX2FkZE9wZXJhdGlvbihvcFR5cGUsIGAuKGluc3RhbmNlKS4ke3Byb3B9JHtyZXN0fWAsIGFyZywgbWV0YSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAocmVzdC5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0LyogaWYgdGhlcmUgaXMgYSBsb25nZXIgY2hhaW4sIGNhbGwgdGhpcyBtZXRob2QgcmVjdXJzaXZlbHkgKi9cblx0XHRcdFx0XHQvLyByZWN1cnNlLi4uLmluZGlyZWN0bHkuLi5kaXJlY3RseVxuXHRcdFx0XHRcdHJlc3VsdCA9IHRoaXMubW9kaWZ5KHByb3ApLl9hZGRPcGVyYXRpb24ob3BUeXBlLCByZXN0LCBhcmcsIG1ldGEpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHtwcm9wLCByZXN1bHR9O1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHRcdCAqIEBwYXJhbSBvcFR5cGUge1N0cmluZ31cblx0XHRcdCAqIEBwYXJhbSBwYXRoICAge1N0cmluZ31cblx0XHRcdCAqIEBwYXJhbSBhcmcgICAgeyp9XG5cdFx0XHQgKiBAcGFyYW0gbWV0YSAgIHtPYmplY3R9IC0gbWV0YSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgb3BlcmF0aW9uXG5cdFx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI29wZXJhdGlvbnMubW9kaWZ5fSAtIHRoZSBkZWVwZXN0ICdNb2RpZnknIGRlbHRhIGludm9sdmVkIGluIHRoaXMgbWV0aG9kLWNhbGxcblx0XHRcdCAqL1xuXHRcdFx0X2FkZE9wZXJhdGlvbihvcFR5cGUsIHBhdGgsIGFyZywgbWV0YSkge1xuXG5cdFx0XHRcdC8qIHByZS1wcm9jZXNzIHRoZSBhcmd1bWVudHMsIHBvc3NpYmx5IGFscmVhZHkgZ2V0IHRoZSByZXN1bHQgYnkgZGVsZWdhdGlvbiAqL1xuXHRcdFx0XHR2YXIge3Byb3AsIHJlc3VsdH0gPSB0aGlzLl9wcmVQcm9jZXNzTmV3T3BlcmF0aW9uKG9wVHlwZSwgcGF0aCwgYXJnLCBtZXRhKTtcblx0XHRcdFx0aWYgKHJlc3VsdCkgeyByZXR1cm4gcmVzdWx0IH1cblxuXHRcdFx0XHQvKiBhdCB0aGlzIHBvaW50LCB3ZSBjb25zdHJ1Y3QgdGhlIG5ldyBkZWx0YSAqL1xuXHRcdFx0XHR2YXIgbmV3RGVsdGEgPSBuZXcgdGhpc0RlbHRhSnMub3BlcmF0aW9uc1tvcFR5cGVdKGFyZywgbWV0YSk7XG5cblx0XHRcdFx0LyogZG8gd2UgbmVlZCB0byBjb21wb3NlIHRoZSBuZXcgZGVsdGEgd2l0aCBhbiBleGlzdGluZyBvbmU/ICovXG5cdFx0XHRcdGlmICh0aGlzLmRlbHRhc1twcm9wXSkge1xuXHRcdFx0XHRcdHZhciBjb21wb3NpdGlvbiA9IHRoaXMuZGVsdGFzW3Byb3BdID0gdGhpcy5kZWx0YXNbcHJvcF0uY29tcG9zZShuZXdEZWx0YSk7XG5cblx0XHRcdFx0XHQvKiAgaWYgdGhlIHJlc3VsdCBzaG91bGQgYmUgYSAnTW9kaWZ5JyB0byBhY2NvbW1vZGF0ZSBmdXJ0aGVyIG9wZXJhdGlvbnMsICAgICAgICAgICAqL1xuXHRcdFx0XHRcdC8qICBidXQgdGhlIGNvbXBvc2l0aW9uIGlzbid0LCByZXR1cm4gYSAnTW9kaWZ5JyB0YXJnZXRlZCBhdCB0aGUgY29tcG9zaXRpb24gdmFsdWUgICovXG5cdFx0XHRcdFx0aWYgKG9wVHlwZSA9PT0gJ01vZGlmeScgJiYgY29tcG9zaXRpb24udHlwZSAhPT0gJ01vZGlmeScpIHtcblx0XHRcdFx0XHRcdHJldHVybiBuZXcgdGhpc0RlbHRhSnMub3BlcmF0aW9ucy5UYXJnZXRlZE1vZGlmeShjb21wb3NpdGlvbi5hcmcsIG1ldGEpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiBjb21wb3NpdGlvbi50eXBlID09PSAnTW9kaWZ5JyA/IGNvbXBvc2l0aW9uIDogdGhpcztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qIHRoZXJlIHdhcyBubyBvcGVyYXRpb24gb24gdGhhdCBwcm9wZXJ0eSB5ZXQ7IGFkZCBpdCAqL1xuXHRcdFx0XHR0aGlzLmRlbHRhc1twcm9wXSA9IG5ld0RlbHRhO1xuXHRcdFx0XHRyZXR1cm4gbmV3RGVsdGEudHlwZSA9PT0gJ01vZGlmeScgPyBuZXdEZWx0YSA6IHRoaXM7XG5cblx0XHRcdH1cblx0XHR9KTtcblx0XHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKC9Nb2RpZnkpXG5cblxuXHRcdC8vIEluIG9yZGVyIHRvIHByb2Nlc3MgZGVsdGEgY29tcG9zaXRpb25zIGxpa2Vcblx0XHQvLyAgICAgZGVsdGEuYWRkKCdvYmonLCB7fSk7XG5cdFx0Ly8gICAgIGRlbHRhLm1vZGlmeSgnb2JqJyk7XG5cdFx0Ly8gYW5kIHN0aWxsIHJldHVybiAnTW9kaWZ5JyBkZWx0YXMgdG8gdGhlIHVzZXIgZm9yIGZ1cnRoZXIgb3BlcmF0aW9ucyxcblx0XHQvLyB3ZSBuZWVkIHRlbXBvcmFyeSAnTW9kaWZ5JyBkZWx0YXMgdGhhdCByZW1lbWJlciB0aGVpciB0YXJnZXQsIHdoaWNoXG5cdFx0Ly8gd2Ugd2lsbCBjYWxsICd0YXJnZXRlZCBkZWx0YXMnLlxuXG5cdFx0LyogZGVmaW5lIHRoZSAnVGFyZ2V0ZWRNb2RpZnknIGRlbHRhIHN1YmNsYXNzICovLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKHRhcmdldGVkTW9kaWZ5KVxuXHRcdC8vIFRPRE86IE1BWUJFPyBjcmVhdGUgZ2VuZXJpYyBUYXJnZXRlZERlbHRhIGNsYXNzIHRoYXQgSEFTIGEgZGVsdGEgdG8gYXBwbHkgdG8gaXRzIHRhcmdldFxuXHRcdHRoaXMub3BlcmF0aW9ucy5UYXJnZXRlZE1vZGlmeSA9IFUubmV3U3ViY2xhc3ModGhpcy5vcGVyYXRpb25zLk1vZGlmeSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uICh0YXJnZXQsIGFyZywgbWV0YSkge1xuXHRcdFx0c3VwZXJGbi5jYWxsKHRoaXMsIGFyZywgbWV0YSk7XG5cdFx0XHR0aGlzLnRhcmdldCA9IHRhcmdldDtcblx0XHR9LCB7XG5cblx0XHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjb3BlcmF0aW9ucy5UYXJnZXRlZE1vZGlmeX0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHRcdCAqL1xuXHRcdFx0Y2xvbmUoKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSB0aGlzLm9wZXJhdGlvbnMuTW9kaWZ5LnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm1ldGEpOyAvLyBzdXBlcigpXG5cdFx0XHRcdHJlc3VsdC50YXJnZXQgPSB0aGlzLnRhcmdldDtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIFRhcmdldGVkIGRlbHRhcyBjYW4ndCBiZSBhcHBsaWVkIFRPIGFueXRoaW5nLlxuXHRcdFx0ICogVGhpcyBtZXRob2QgaXMgb3ZlcndyaXR0ZW4gdG8gYXZvaWQgbWlzdGFrZXMuXG5cdFx0XHQgKi9cblx0XHRcdGFwcGx5VG8oKSB7IHRocm93IG5ldyBFcnJvcihgVGFyZ2V0ZWRNb2RpZnkgZGVsdGFzIGNhbm5vdCBiZSBhcHBsaWVkIFRPIGFueXRoaW5nLmApIH0sXG5cblx0XHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIG9wVHlwZSB7U3RyaW5nfVxuXHRcdFx0ICogQHBhcmFtIHBhdGggICB7U3RyaW5nfVxuXHRcdFx0ICogQHBhcmFtIGFyZyAgICB7Kn1cblx0XHRcdCAqIEBwYXJhbSBtZXRhICAge09iamVjdH0gLSBtZXRhIGluZm9ybWF0aW9uIGFib3V0IHRoZSBvcGVyYXRpb25cblx0XHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjb3BlcmF0aW9ucy5tb2RpZnl9IC0gdGhlIGRlZXBlc3QgJ01vZGlmeScgZGVsdGEgaW52b2x2ZWQgaW4gdGhpcyBtZXRob2QtY2FsbFxuXHRcdFx0ICovXG5cdFx0XHRfYWRkT3BlcmF0aW9uKG9wVHlwZSwgcGF0aCwgYXJnLCBtZXRhKSB7XG5cdFx0XHRcdC8qIHByZS1wcm9jZXNzIHRoZSBhcmd1bWVudHMsIHBvc3NpYmx5IGFscmVhZHkgZ2V0IHRoZSByZXN1bHQgYnkgZGVsZWdhdGlvbiAqL1xuXHRcdFx0XHR2YXIge3Byb3AsIHJlc3VsdH0gPSB0aGlzLl9wcmVQcm9jZXNzTmV3T3BlcmF0aW9uKG9wVHlwZSwgcGF0aCwgYXJnLCBtZXRhKTtcblx0XHRcdFx0aWYgKHJlc3VsdCkgeyByZXR1cm4gcmVzdWx0IH1cblxuXHRcdFx0XHQvKiBpZiB0aGUgbmV3IGRlbHRhIHNob3VsZCBiZSBhICdNb2RpZnknIGRlbHRhLCBpdCBpcyBhIHRhcmdldGVkIGRlbHRhICovXG5cdFx0XHRcdGlmIChvcFR5cGUgPT09ICdNb2RpZnknKSB7XG5cdFx0XHRcdFx0dmFyIG5ld0RlbHRhID0gbmV3IHRoaXNEZWx0YUpzLm9wZXJhdGlvbnMuVGFyZ2V0ZWRNb2RpZnkoYXJnLCBtZXRhKTtcblx0XHRcdFx0XHRuZXdEZWx0YS50YXJnZXQgPSB0aGlzLnRhcmdldFtwcm9wXTtcblx0XHRcdFx0XHRyZXR1cm4gbmV3RGVsdGE7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiBhcHBseSB0aGUgbmV3IGRlbHRhIHRvIGl0cyB0YXJnZXQsIGRpc2NhcmQgaXQgYW5kIHJldHVybiAndGhpcycgZGVsdGEgKi9cblx0XHRcdFx0KG5ldyB0aGlzRGVsdGFKcy5vcGVyYXRpb25zW29wVHlwZV0oYXJnLCBtZXRhKSkuYXBwbHlUbyh3Zih0aGlzLnRhcmdldCwgcHJvcCkpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblxuXHRcdH0pO1xuXHRcdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKC90YXJnZXRlZE1vZGlmeSlcblxuXG5cdFx0Lyogc2V0IHRoZSBmb3VuZGF0aW9uIG9mIHRoZSBjb21wb3NpdGlvbnMgYXJyYXkgKi9cblx0XHR0aGlzLmNvbXBvc2l0aW9uc1snTW9kaWZ5J10gPSB7ICdNb2RpZnknOiBbXSB9O1xuXG5cblx0XHQvKiBkZWZpbmUgc3RhbmRhcmQgb3BlcmF0aW9ucyAqL1xuXHRcdHRoaXMuX2RlZmluZVN0YW5kYXJkT3BlcmF0aW9uVHlwZXMoKTtcblxuXG5cdH0sIC8qKiBAbGVuZHMgRGVsdGFKcy5wcm90b3R5cGUgKi8gIHtcblxuXHRcdC8qKiB7QHB1YmxpY317QHByb3BlcnR5fVxuXHRcdCAqIHF1aWNrIGFjY2VzcyB0byB0aGUgJ01vZGlmeScgZGVsdGEgY29uc3RydWN0b3Jcblx0XHQgKi9cblx0XHRnZXQgRGVsdGEoKSB7IHJldHVybiB0aGlzLm9wZXJhdGlvbnMuTW9kaWZ5IH0sXG5cblx0XHQvLy8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQvLyAqXG5cdFx0Ly8gKi9cblx0XHQvL3ZwKHZwTmFtZSwgdmFsKSB7XG5cdFx0Ly9cdC8vIFRPRE9cblx0XHQvL30sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gbmFtZSAgICB7U3RyaW5nfVxuXHRcdCAqIEBwYXJhbSBhcHBseVRvIHsoRGVsdGFKcy5Xcml0YWJsZUZpZWxkKSA9PiB1bmRlZmluZWR9XG5cdFx0ICovXG5cdFx0bmV3T3BlcmF0aW9uVHlwZShuYW1lLCB7Y29uc3RydWN0LCBhcHBseVRvLCBtZXRob2RzLCBjbG9uZX0pIHtcblxuXHRcdFx0Lyogc2FuaXR5IGNoZWNrcyAqL1xuXHRcdFx0VS5hc3NlcnQoIXRoaXMub3BlcmF0aW9uc1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlICcke25hbWV9JyBvcGVyYXRpb24gdHlwZSBhbHJlYWR5IGV4aXN0cy5gKTtcblxuXHRcdFx0LyogY3JlYXRlIHRoZSBjb3JyZXNwb25kaW5nIG1ldGhvZChzKSBpbiB0aGUgJ01vZGlmeScgY2xhc3MgKi9cblx0XHRcdC8vIGlmIG5vIG1ldGhvZHMgYXJlIHByb3ZpZGVkLCB1c2UgdGhlIG9wZXJhdGlvbiBuYW1lIHN0YXJ0aW5nIHdpdGggYSBsb3dlcmNhc2UgbGV0dGVyXG5cdFx0XHRtZXRob2RzID0gbWV0aG9kcyB8fCBbIG5hbWVbMF0udG9Mb3dlckNhc2UoKStuYW1lLnNsaWNlKDEpIF07XG5cdFx0XHRtZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuXHRcdFx0XHR0aGlzLm9wZXJhdGlvbnMuTW9kaWZ5LnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKHByb3AsIGFyZykge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9hZGRPcGVyYXRpb24obmFtZSwgcHJvcCwgYXJnLCB7IG1ldGhvZCB9KTtcblx0XHRcdFx0fTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKiBwdXQgdGhlIHJpZ2h0IGZvdW5kYXRpb24gaW4gJ3RoaXMuY29tcG9zaXRpb24nICovXG5cdFx0XHR0aGlzLmNvbXBvc2l0aW9uc1tuYW1lXSA9IHt9O1xuXHRcdFx0T2JqZWN0LmtleXModGhpcy5jb21wb3NpdGlvbnMpLmZvckVhY2goKHR5cGUpID0+IHtcblx0XHRcdFx0VS5hc3NlcnQoIXRoaXMuY29tcG9zaXRpb25zW3R5cGVdW25hbWVdKTtcblx0XHRcdFx0VS5hc3NlcnQoIXRoaXMuY29tcG9zaXRpb25zW25hbWVdW3R5cGVdKTtcblx0XHRcdFx0dGhpcy5jb21wb3NpdGlvbnNbdHlwZV1bbmFtZV0gPSBbXTtcblx0XHRcdFx0dGhpcy5jb21wb3NpdGlvbnNbbmFtZV1bdHlwZV0gPSBbXTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKiBjcmVhdGUgdGhlIERlbHRhIHN1YmNsYXNzIHJlcHJlc2VudGluZyB0aGlzIG9wZXJhdGlvbiB0eXBlICovLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLShvdGhlcilcblx0XHRcdHRoaXMub3BlcmF0aW9uc1tuYW1lXSA9IFUubmV3U3ViY2xhc3ModGhpcy5vcGVyYXRpb25zLkRlbHRhLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKGFyZywgbWV0YSkge1xuXHRcdFx0XHRzdXBlckZuLmNhbGwodGhpcywgYXJnLCBtZXRhKTtcblx0XHRcdFx0aWYgKGNvbnN0cnVjdCkgeyBjb25zdHJ1Y3QuY2FsbCh0aGlzKSB9XG5cdFx0XHR9LCBVLmV4dGVuZCh7XG5cdFx0XHRcdHR5cGU6IG5hbWUsXG5cdFx0XHRcdGFwcGx5VG86IGFwcGx5VG9cblx0XHRcdH0pKTtcblx0XHRcdGlmIChVLmlzRGVmaW5lZChjbG9uZSkpIHsgdGhpcy5vcGVyYXRpb25zW25hbWVdLnByb3RvdHlwZS5jbG9uZSA9IGNsb25lIH1cblx0XHRcdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0oL290aGVyKVxuXG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB0eXBlMSAgIHtTdHJpbmd9XG5cdFx0ICogQHBhcmFtIHR5cGUyICAge1N0cmluZ31cblx0XHQgKiBAcGFyYW0gY29tcG9zZSB7KERlbHRhSnMjb3BlcmF0aW9ucy5EZWx0YSwgRGVsdGFKcyNvcGVyYXRpb25zLkRlbHRhKSA9PiBEZWx0YUpzI29wZXJhdGlvbnMuRGVsdGF9IC0gc2hvdWxkIGJlIHNpZGUtZWZmZWN0IGZyZWVcblx0XHQgKi9cblx0XHRuZXdDb21wb3NpdGlvbih0eXBlMSwgdHlwZTIsIGNvbXBvc2UpIHtcblx0XHRcdHRoaXMuY29tcG9zaXRpb25zW3R5cGUxXVt0eXBlMl0ucHVzaChjb21wb3NlKTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHQgKlxuXHRcdCAqL1xuXHRcdF9kZWZpbmVTdGFuZGFyZE9wZXJhdGlvblR5cGVzKCkge1xuXG5cdFx0XHR2YXIgdGhpc0RlbHRhSnMgPSB0aGlzO1xuXG5cdFx0XHQvKiBjb252ZW5pZW5jZSBkZWZpbml0aW9ucyBmb3IgdGhlIGFwcGxpY2F0aW9uIGFuZCBjb21wb3NpdGlvbiBmdW5jdGlvbnMgYmVsb3cgKi9cblx0XHRcdGZ1bmN0aW9uIGVycm9yKGQxLCBkMikgeyB0aHJvdyBuZXcgRXJyb3IoYFlvdSBjYW5ub3QgZm9sbG93ICcke2QxLnR5cGV9JyB3aXRoICcke2QyLnR5cGV9Jy5gKSB9XG5cdFx0XHRmdW5jdGlvbiBkKHR5cGUsICBmbiA9ICgoKT0+bnVsbCkpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBmbiA9PT0gJ3N0cmluZycpIHsgZm4gPSAoKHYpID0+IChvKSA9PiBvW3ZdKShmbikgfVxuXHRcdFx0XHRyZXR1cm4gKGQxLCBkMikgPT4gbmV3ICh0aGlzRGVsdGFKcy5vcGVyYXRpb25zW3R5cGVdKShmbih7ZDEsIGQyLCBwMTogZDEuYXJnLCBwMjogZDIuYXJnfSkpO1xuXHRcdFx0fVxuXHRcdFx0Ly9mdW5jdGlvbiBkMSh7ZDE6IHZ9KSB7IHJldHVybiB2IH1cblx0XHRcdC8vZnVuY3Rpb24gZDIoe2QyOiB2fSkgeyByZXR1cm4gdiB9XG5cdFx0XHQvL2Z1bmN0aW9uIHAxKHtwMTogdn0pIHsgcmV0dXJuIHYgfVxuXHRcdFx0ZnVuY3Rpb24gcDIoe3AyOiB2fSkgeyByZXR1cm4gdiB9XG5cdFx0XHRmdW5jdGlvbiBhcHBseUQyVG9QMShkMSwgZDIpIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IGQxLmNsb25lKCk7XG5cdFx0XHRcdGQyLmFwcGx5VG8od2YocmVzdWx0LCAnYXJnJykpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fVxuXHRcdFx0ZnVuY3Rpb24gYXNzZXJ0RGVmaW5lZCh2YWwsIG9wVHlwZSkge1xuXHRcdFx0XHRVLmFzc2VydChVLmlzRGVmaW5lZCh2YWwpLFxuXHRcdFx0XHRcdFx0YFRoZSBvcGVyYXRpb24gJyR7b3BUeXBlfScgZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgZGVmaW5lZC5gKTtcblx0XHRcdH1cblx0XHRcdGZ1bmN0aW9uIGFzc2VydFVuZGVmaW5lZCh2YWwsIG9wVHlwZSkge1xuXHRcdFx0XHRVLmFzc2VydChVLmlzVW5kZWZpbmVkKHZhbCksXG5cdFx0XHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnJHtvcFR5cGV9JyBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSB1bmRlZmluZWQuYCk7XG5cdFx0XHR9XG5cdFx0XHRmdW5jdGlvbiBhc3NlcnRBcnJheSh2YWwsIG9wVHlwZSkge1xuXHRcdFx0XHRVLmFzc2VydChBcnJheS5pc0FycmF5KHZhbCksXG5cdFx0XHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnJHtvcFR5cGV9JyBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBhbiBhcnJheS5gKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvXG5cblx0XHRcdC8qIGRlY2xhcmluZyB0aGUgYmFzaWMgb3BlcmF0aW9uIHR5cGVzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFx0XHQvLyAnTW9kaWZ5JyBpcyB0aGUgbW9zdCBmdW5kYW1lbnRhbCBvcGVyYXRpb24sXG5cdFx0XHQvLyAgYW5kIGlzIGRlZmluZWQgYWJvdmUgcmF0aGVyIHRoYW4gaGVyZVxuXHRcdFx0dGhpcy5uZXdPcGVyYXRpb25UeXBlKCdBZGQnLCB7XG5cdFx0XHRcdGFwcGx5VG8oZmllbGQpIHtcblx0XHRcdFx0XHRhc3NlcnRVbmRlZmluZWQoZmllbGQudmFsdWUsICdBZGQnKTtcblx0XHRcdFx0XHRmaWVsZC52YWx1ZSA9IHRoaXMuYXJnO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHRoaXMubmV3T3BlcmF0aW9uVHlwZSgnUmVtb3ZlJywge1xuXHRcdFx0XHRhcHBseVRvKGZpZWxkKSB7XG5cdFx0XHRcdFx0YXNzZXJ0RGVmaW5lZChmaWVsZC52YWx1ZSwgJ1JlbW92ZScpO1xuXHRcdFx0XHRcdGZpZWxkLmRlbGV0ZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHRoaXMubmV3T3BlcmF0aW9uVHlwZSgnRm9yYmlkJywge1xuXHRcdFx0XHRhcHBseVRvKGZpZWxkKSB7XG5cdFx0XHRcdFx0YXNzZXJ0VW5kZWZpbmVkKGZpZWxkLnZhbHVlLCAnRm9yYmlkJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0dGhpcy5uZXdPcGVyYXRpb25UeXBlKCdSZXBsYWNlJywge1xuXHRcdFx0XHRhcHBseVRvKGZpZWxkKSB7XG5cdFx0XHRcdFx0YXNzZXJ0RGVmaW5lZChmaWVsZC52YWx1ZSwgJ1JlcGxhY2UnKTtcblx0XHRcdFx0XHRmaWVsZC52YWx1ZSA9IHRoaXMuYXJnO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnTW9kaWZ5JyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ01vZGlmeScsICdNb2RpZnknLCAoZDEsIGQyKSA9PiB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSBkMS5jbG9uZSgpO1xuXHRcdFx0XHRPYmplY3Qua2V5cyhkMi5kZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0XHRyZXN1bHQuZGVsdGFzW3Byb3BdLmNvbXBvc2UoZDIuZGVsdGFzW3Byb3BdKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnQWRkJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ01vZGlmeScsICdBZGQnICAgLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdBZGQnICAgLCAnQWRkJyAgICwgZXJyb3IpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignQWRkJyAgICwgJ01vZGlmeScsIGFwcGx5RDJUb1AxKTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUmVtb3ZlJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ01vZGlmeScsICdSZW1vdmUnLCBkKCdSZW1vdmUnKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdBZGQnICAgLCAnUmVtb3ZlJywgZCgnRm9yYmlkJykpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignUmVtb3ZlJywgJ01vZGlmeScsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1JlbW92ZScsICdBZGQnICAgLCBkKCdSZXBsYWNlJywgcDIpKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1JlbW92ZScsICdSZW1vdmUnLCBlcnJvcik7XG5cblx0XHRcdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ0ZvcmJpZCcgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdNb2RpZnknLCAnRm9yYmlkJywgZXJyb3IpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignQWRkJyAgICwgJ0ZvcmJpZCcsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1JlbW92ZScsICdGb3JiaWQnLCBkKCdSZW1vdmUnKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdGb3JiaWQnLCAnTW9kaWZ5JywgZXJyb3IpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignRm9yYmlkJywgJ0FkZCcgICAsIGQoJ0FkZCcsIHAyKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdGb3JiaWQnLCAnUmVtb3ZlJywgZXJyb3IpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignRm9yYmlkJywgJ0ZvcmJpZCcsIGQoJ0ZvcmJpZCcpKTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUmVwbGFjZScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ01vZGlmeScgLCAnUmVwbGFjZScsIGQoJ1JlcGxhY2UnLCBwMikpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignQWRkJyAgICAsICdSZXBsYWNlJywgZCgnQWRkJywgcDIpKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1JlbW92ZScgLCAnUmVwbGFjZScsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ0ZvcmJpZCcgLCAnUmVwbGFjZScsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1JlcGxhY2UnLCAnTW9kaWZ5JyAsIGFwcGx5RDJUb1AxKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1JlcGxhY2UnLCAnQWRkJyAgICAsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1JlcGxhY2UnLCAnUmVtb3ZlJyAsIGQoJ1JlbW92ZScpKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1JlcGxhY2UnLCAnRm9yYmlkJyAsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1JlcGxhY2UnLCAnUmVwbGFjZScsIGQoJ1JlcGxhY2UnLCBwMikpO1xuXG5cdFx0XHQvKiBkZWNsYXJpbmcgdGhlIGFycmF5IG9wZXJhdGlvbiB0eXBlICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0dGhpcy5uZXdPcGVyYXRpb25UeXBlKCdQdXQnLCB7XG5cdFx0XHRcdGNvbnN0cnVjdCgpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5tZXRhLm1ldGhvZCkge1xuXHRcdFx0XHRcdFx0dGhpcy52YWx1ZXMgPSBbe1xuXHRcdFx0XHRcdFx0XHRtZXRob2Q6IHRoaXMubWV0YS5tZXRob2QsXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiB0aGlzLmFyZ1xuXHRcdFx0XHRcdFx0fV07XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsdWVzID0gW107XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRjbG9uZSgpIHtcblx0XHRcdFx0XHR2YXIgcmVzdWx0ID0gdGhpc0RlbHRhSnMub3BlcmF0aW9ucy5EZWx0YS5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCB0aGlzLmFyZywgdGhpcy5tZXRhKTsgLy8gc3VwZXIoKVxuXHRcdFx0XHRcdHJlc3VsdC52YWx1ZXMgPSBbXTtcblx0XHRcdFx0XHR0aGlzLnZhbHVlcy5mb3JFYWNoKCh2KSA9PiB7IHJlc3VsdC52YWx1ZXMucHVzaCh2KSB9KTtcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRhcHBseVRvKGZpZWxkKSB7XG5cdFx0XHRcdFx0YXNzZXJ0RGVmaW5lZChmaWVsZC52YWx1ZSwgJ1B1dCcpO1xuXHRcdFx0XHRcdGFzc2VydEFycmF5KGZpZWxkLnZhbHVlLCAnUHV0Jyk7XG5cdFx0XHRcdFx0dmFyIGFyciA9IGZpZWxkLnZhbHVlO1xuXHRcdFx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHttZXRob2QsIHZhbHVlfSkgPT4ge1xuXHRcdFx0XHRcdFx0c3dpdGNoIChtZXRob2QpIHtcblx0XHRcdFx0XHRcdFx0Y2FzZSAncHJlcGVuZCc6IHtcblx0XHRcdFx0XHRcdFx0XHRhcnIudW5zaGlmdCh2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0XHRcdGNhc2UgJ2luc2VydCc6IHtcblx0XHRcdFx0XHRcdFx0XHQvLyAnaW5zZXJ0JyBkb2Vzbid0ICpoYXZlKiB0byB1c2UgYSByYW5kb20gcG9zaXRpb24uIEFueSBwb3NpdGlvbiB3aWxsIGRvLlxuXHRcdFx0XHRcdFx0XHRcdC8vICBFLmcuLCBpdHMgaW1wbGVtZW50YXRpb24gY291bGQganVzdCBiZSB0aGUgc2FtZSBhcyBmb3IgJ2FwcGVuZCcuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gIE5vbmV0aGVsZXNzLCB3ZSB1c2UgYSByYW5kb20gcG9zaXRpb24gdG8gZm9yY2UgdGhlIHRlc3RzIHRvIGJlIHBlcm1pc3NpdmUuXG5cdFx0XHRcdFx0XHRcdFx0dmFyIHBvc2l0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGFyci5sZW5ndGggKyAxKSk7XG5cdFx0XHRcdFx0XHRcdFx0YXJyLnNwbGljZShwb3NpdGlvbiwgMCwgdmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRjYXNlICdhcHBlbmQnOiB7XG5cdFx0XHRcdFx0XHRcdFx0YXJyLnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRtZXRob2RzOiBbJ3ByZXBlbmQnLCAnaW5zZXJ0JywgJ2FwcGVuZCddXG5cdFx0XHR9KTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUmVwbGFjZScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ01vZGlmeScgLCAnUHV0JyAgICAsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ0FkZCcgICAgLCAnUHV0JyAgICAsIGFwcGx5RDJUb1AxKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1JlbW92ZScgLCAnUHV0JyAgICAsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ0ZvcmJpZCcgLCAnUHV0JyAgICAsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1JlcGxhY2UnLCAnUHV0JyAgICAsIGFwcGx5RDJUb1AxKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1B1dCcgICAgLCAnTW9kaWZ5JyAsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1B1dCcgICAgLCAnQWRkJyAgICAsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1B1dCcgICAgLCAnUmVtb3ZlJyAsIGQoJ1JlbW92ZScpKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1B1dCcgICAgLCAnRm9yYmlkJyAsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1B1dCcgICAgLCAnUmVwbGFjZScsIGQoJ1JlcGxhY2UnLCBwMikpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignUHV0JyAgICAsICdQdXQnICAgICwgKGQxLCBkMikgPT4ge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gbmV3IHRoaXNEZWx0YUpzLm9wZXJhdGlvbnMuUHV0KCk7XG5cdFx0XHRcdHJlc3VsdC52YWx1ZXMgPSAoZDEudmFsdWVzKS5jb25jYXQoZDIudmFsdWVzKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0pO1xuXG5cdFx0XHQvL3RoaXMubmV3T3BlcmF0aW9uVHlwZSgnRGVsdGFNb2RlbCcsIGZ1bmN0aW9uIGFwcGx5VG8oZmllbGQpIHtcblx0XHRcdC8vXHR0aGlzLmFyZy50b3BvbG9naWNhbGx5KChzdWJEZWx0YSkgPT4ge1xuXHRcdFx0Ly9cdFx0Ly8gdGhlIGdyYXBoIGlzIGFsbG93ZWQgdG8gY29udGFpbiAnbnVsbCcgdmVydGljZXMgZm9yIG9yZGVyaW5nIHB1cnBvc2VzXG5cdFx0XHQvL1x0XHRpZiAoc3ViRGVsdGEpIHsgc3ViRGVsdGEuYXBwbHlUbyhmaWVsZCkgfVxuXHRcdFx0Ly9cdH0pO1xuXHRcdFx0Ly99LCB7XG5cdFx0XHQvL1xuXHRcdFx0Ly99KTtcblx0XHRcdC8vXG5cdFx0XHQvL1xuXHRcdFx0Ly8vKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdEZWx0YU1vZGVsJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0Ly8vLyB0byBjb21wb3NlIGRlbHRhIG1vZGVscywgd2Ugc2ltcGx5IGhhdmUgb25lIGFwcGx5IGFmdGVyIHRoZSBvdGhlclxuXHRcdFx0Ly8vLyB3aXRob3V0IGFueSBjb21wb3NhYmlsaXR5IGNoZWNrczsgaW4gdGhlIGZ1dHVyZSwgdGhpcyBtYXkgYmVjb21lIG1vcmUgY2xldmVyXG5cdFx0XHQvL3ZhciBvcmRlcmVkQnlTaW1wbGVEZWx0YU1vZGVsID0gKGQxLCBkMikgPT4ge1xuXHRcdFx0Ly9cdHZhciBncmFwaCA9IG5ldyBKc0dyYXBoKCk7XG5cdFx0XHQvL1x0Z3JhcGguYWRkTmV3VmVydGV4KDEsIGQxKTtcblx0XHRcdC8vXHRncmFwaC5hZGROZXdWZXJ0ZXgoMiwgZDIpO1xuXHRcdFx0Ly9cdGdyYXBoLmFkZE5ld0VkZ2UoMSwgMik7XG5cdFx0XHQvL1x0cmV0dXJuIG5ldyBkZWx0YUpzLm9wZXJhdGlvbnMuRGVsdGFNb2RlbChncmFwaCk7XG5cdFx0XHQvL307XG5cdFx0XHQvL3RoaXMubmV3Q29tcG9zaXRpb24oJ01vZGlmeScsICAgICAnRGVsdGFNb2RlbCcsIG9yZGVyZWRCeVNpbXBsZURlbHRhTW9kZWwpO1xuXHRcdFx0Ly90aGlzLm5ld0NvbXBvc2l0aW9uKCdBZGQnLCAgICAgICAgJ0RlbHRhTW9kZWwnLCBvcmRlcmVkQnlTaW1wbGVEZWx0YU1vZGVsKTtcblx0XHRcdC8vdGhpcy5uZXdDb21wb3NpdGlvbignUmVtb3ZlJywgICAgICdEZWx0YU1vZGVsJywgb3JkZXJlZEJ5U2ltcGxlRGVsdGFNb2RlbCk7XG5cdFx0XHQvL3RoaXMubmV3Q29tcG9zaXRpb24oJ0ZvcmJpZCcsICAgICAnRGVsdGFNb2RlbCcsIG9yZGVyZWRCeVNpbXBsZURlbHRhTW9kZWwpO1xuXHRcdFx0Ly90aGlzLm5ld0NvbXBvc2l0aW9uKCdSZXBsYWNlJywgICAgJ0RlbHRhTW9kZWwnLCBvcmRlcmVkQnlTaW1wbGVEZWx0YU1vZGVsKTtcblx0XHRcdC8vdGhpcy5uZXdDb21wb3NpdGlvbignRGVsdGFNb2RlbCcsICdNb2RpZnknLCAgICAgb3JkZXJlZEJ5U2ltcGxlRGVsdGFNb2RlbCk7XG5cdFx0XHQvL3RoaXMubmV3Q29tcG9zaXRpb24oJ0RlbHRhTW9kZWwnLCAnQWRkJywgICAgICAgIG9yZGVyZWRCeVNpbXBsZURlbHRhTW9kZWwpO1xuXHRcdFx0Ly90aGlzLm5ld0NvbXBvc2l0aW9uKCdEZWx0YU1vZGVsJywgJ1JlbW92ZScsICAgICBvcmRlcmVkQnlTaW1wbGVEZWx0YU1vZGVsKTtcblx0XHRcdC8vdGhpcy5uZXdDb21wb3NpdGlvbignRGVsdGFNb2RlbCcsICdGb3JiaWQnLCAgICAgb3JkZXJlZEJ5U2ltcGxlRGVsdGFNb2RlbCk7XG5cdFx0XHQvL3RoaXMubmV3Q29tcG9zaXRpb24oJ0RlbHRhTW9kZWwnLCAnUmVwbGFjZScsICAgIG9yZGVyZWRCeVNpbXBsZURlbHRhTW9kZWwpO1xuXHRcdFx0Ly90aGlzLm5ld0NvbXBvc2l0aW9uKCdEZWx0YU1vZGVsJywgJ0RlbHRhTW9kZWwnLCBvcmRlcmVkQnlTaW1wbGVEZWx0YU1vZGVsKTtcblxuXHRcdH1cblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXHR9KTtcblxuXG5cdC8qIHRoZSBXcml0YWJsZUZpZWxkIGNsYXNzICovXG5cdERlbHRhSnMuV3JpdGFibGVGaWVsZCA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKG9iaiwgcHJvcCkge1xuXHRcdHRoaXMub2JqICA9IG9iajtcblx0XHR0aGlzLnByb3AgPSBwcm9wO1xuXHR9LCB7XG5cdFx0Z2V0IHZhbHVlKCkgIHsgcmV0dXJuIHRoaXMub2JqW3RoaXMucHJvcF0gfSxcblx0XHRzZXQgdmFsdWUodikgeyB0aGlzLm9ialt0aGlzLnByb3BdID0gdiB9LFxuXHRcdGRlbGV0ZSgpIHsgZGVsZXRlIHRoaXMub2JqW3RoaXMucHJvcF0gfVxuXHR9KTtcblx0ZnVuY3Rpb24gd2Yob2JqLCBwcm9wKSB7IHJldHVybiBuZXcgRGVsdGFKcy5Xcml0YWJsZUZpZWxkKG9iaiwgcHJvcCkgfVxuXG5cblx0LyogZXhwb3J0IHRoZSBtYWluIGNsYXNzICovXG5cdHJldHVybiBEZWx0YUpzO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZGVsdGEuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKCgpID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXG5cdFx0LyogY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGUgKi9cblx0XHRuZXdDbGFzcyhjb25zdHJ1Y3RvciwgcHJvdG90eXBlID0ge30pIHtcblx0XHRcdHZhciBjbHMgPSBjb25zdHJ1Y3Rvcjtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0LyogY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGUgKi9cblx0XHRuZXdTdWJjbGFzcyhzdXBlckNsYXNzLCBjb25zdHJ1Y3Rvck1ha2VyLCBwcm90b3R5cGUgPSB7fSkge1xuXHRcdFx0dmFyIGNscyA9IGNvbnN0cnVjdG9yTWFrZXIoc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IpO1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuXHRcdFx0VS5leHRlbmQoY2xzLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvKiAgZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXMgICAgICovXG5cdFx0LyogIG9mIHRoZSBvdGhlciBvYmplY3RzLCBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5zICAqL1xuXHRcdC8qICB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdFx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb2JqMTtcblx0XHR9LFxuXG5cdFx0LyogYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkIHdpdGggYW4gYXJyYXkgb2YgZm9ybWFsIHBhcmFtZXRlcnMgKi9cblx0XHRhcHBseUNvbnN0cnVjdG9yKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcblx0XHRcdHZhciBuZXdfb2JqID0gT2JqZWN0LmNyZWF0ZShDb25zdHJ1Y3RvckZuLnByb3RvdHlwZSk7XG5cdFx0XHRDb25zdHJ1Y3RvckZuLmFwcGx5KG5ld19vYmosIGFyZ3MpO1xuXHRcdFx0cmV0dXJuIG5ld19vYmo7XG5cdFx0fSxcblxuXHRcdC8qIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGEgY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZSAqL1xuXHRcdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdFx0fSxcblxuXHRcdC8qIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYCAqL1xuXHRcdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8qIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApICovXG5cdFx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8qIHJlcGVhdCBhIHN0cmluZyBhIGdpdmVuIG51bWJlciBvZiB0aW1lcyAqL1xuXHRcdHJlcGVhdChuciwgc3RyKSB7IHJldHVybiBuZXcgQXJyYXkobnIrMSkuam9pbihzdHIpIH1cblx0fTtcblxuXHRyZXR1cm4gVTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWlzYy5qc1xuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImRlbHRhLmpzIn0=