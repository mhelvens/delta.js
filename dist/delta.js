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
	    this.compositions = [];
	    this.operations.Delta = U.newClass(function(arg, meta) {
	      this.arg = arg;
	      this.meta = meta || {};
	    }, {
	      clone: function() {
	        return new this.constructor(this.arg, this.meta);
	      },
	      appliedTo: function(value) {
	        if (U.isDefined(value.clone)) {
	          value = value.clone();
	        }
	        var obj = {value: value};
	        this.applyTo(wf(obj, 'value'));
	        return obj.value;
	      },
	      compose: function(otherDelta) {
	        var $__0 = this;
	        var composeFn;
	        thisDeltaJs.compositions.some((function($__1) {
	          var $__2 = $__1,
	              predicate = $__2.predicate,
	              fn = $__2.compose;
	          if (predicate($__0, otherDelta)) {
	            composeFn = fn;
	            return true;
	          }
	        }));
	        if (!!composeFn) {
	          return composeFn(this, otherDelta);
	        } else {
	          U.assert(!!composeFn, ("A '" + this.type + "' operation cannot be followed by a '" + otherDelta.type + "' operation."));
	        }
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
	        U.assert(U.isDefined(field.value), "The 'Modify' operation expects the property to be defined.");
	        U.assert(field.value instanceof Object, "The 'Modify' operation expects the property to be an Object.");
	        Object.keys(this.deltas).forEach((function(prop) {
	          $__0.deltas[prop].applyTo(wf(field.value, prop));
	        }));
	      },
	      applyToPropertiesOf: function(obj) {
	        var $__0 = this;
	        U.assert(U.isDefined(obj), "The 'Modify' operation expects the property to be defined.");
	        U.assert(obj instanceof Object, "The 'Modify' operation expects the property to be an Object.");
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
	    newComposition: function(predicate, compose) {
	      this.compositions.push({
	        predicate: predicate,
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
	      function p2($__1) {
	        var v = $__1.p2;
	        return v;
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
	      this.newComposition(t('Modify', 'Modify'), (function(d1, d2) {
	        var result = d1.clone();
	        Object.keys(d2.deltas).forEach((function(prop) {
	          result.deltas[prop].compose(d2.deltas[prop]);
	        }));
	        return result;
	      }));
	      this.newComposition(t('Add', 'Modify'), d('Add', (function($__1) {
	        var $__2 = $__1,
	            d2 = $__2.d2,
	            p1 = $__2.p1;
	        return d2.appliedTo(p1);
	      })));
	      this.newComposition(t('Modify', 'Remove'), d('Remove'));
	      this.newComposition(t('Add', 'Remove'), d('Forbid'));
	      this.newComposition(t('Remove', 'Add'), d('Replace', p2));
	      this.newComposition(t('Remove', 'Forbid'), d('Remove'));
	      this.newComposition(t('Forbid', 'Add'), d('Add', p2));
	      this.newComposition(t('Forbid', 'Forbid'), d('Forbid'));
	      this.newComposition(t('Modify', 'Replace'), d('Replace', p2));
	      this.newComposition(t('Add', 'Replace'), d('Add', p2));
	      this.newComposition(t('Replace', 'Modify'), d('Replace', (function($__1) {
	        var $__2 = $__1,
	            d2 = $__2.d2,
	            p1 = $__2.p1;
	        return d2.appliedTo(p1);
	      })));
	      this.newComposition(t('Replace', 'Remove'), d('Remove'));
	      this.newComposition(t('Replace', 'Replace'), d('Replace', p2));
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
	      this.newComposition(t('Add', 'Put'), d('Add', (function($__1) {
	        var $__2 = $__1,
	            d2 = $__2.d2,
	            p1 = $__2.p1;
	        return d2.appliedTo(p1);
	      })));
	      this.newComposition(t('Replace', 'Put'), d('Replace', (function($__1) {
	        var $__2 = $__1,
	            d2 = $__2.d2,
	            p1 = $__2.p1;
	        return d2.appliedTo(p1);
	      })));
	      this.newComposition(t('Put', 'Remove'), d('Remove'));
	      this.newComposition(t('Put', 'Replace'), d('Replace', p2));
	      this.newComposition(t('Put', 'Put'), (function(d1, d2) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiZDM0YWViZTI3NGE4OTBmYjhkNCIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvbWlzYy5qcyIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FBUSx1QkFBYSx3QkFBVSxDQUFHLDBDQUFVO0FBQzNDLGNBQVcsQ0FBQztBQVFSLGFBQU0sRUFBSSxXQUFVLENBQUMsUUFBUyxRQUFNLENBQUU7QUFJckMsbUJBQVUsRUFBSSxLQUFHLENBQUM7QUFJdEIsUUFBRyxXQUFXLEVBQUksR0FBQyxDQUFDO0FBQ3BCLFFBQUcsYUFBYSxFQUFJLEdBQUMsQ0FBQztBQUl0QixRQUFHLFdBQVcsTUFBTSxFQUFJLFdBQVUsQ0FBQyxTQUFVLEdBQUUsQ0FBRyxLQUFHLENBQUc7QUFDdkQsVUFBRyxJQUFJLEVBQUksSUFBRSxDQUFDO0FBQ2QsVUFBRyxLQUFLLEVBQUksS0FBRyxHQUFL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QVU7S0FBRTtBQUdyRCxhQUFRLENBQVIsVUFBVSxHQUFFLENBQUc7QUFBRSxZQUFPLE9BQU8sSUFBRSxJQUFNLFlBQVU7S0FBRTtBQUduRCxVQUFLLENBQUwsVUFBTyxFQUFDLENBQUcsSUFBRSxDQUFHO0FBQUUsWUFBTyxJQUFJLE1BQUssQ0FBQyxFQUFDLEVBQUUsR0FBQyxLQUFNLENBQUMsR0FBRSxDQUFDO0tBQUU7QUFBQSxHQUNwRCxDQUFDO0FBRUQsUUFBTyxHQUFDO0FBQ1Qsd0pBQUU7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpzLWdyYXBoXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkRlbHRhSnNcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJqcy1ncmFwaFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiRGVsdGFKc1wiXSA9IGZhY3Rvcnkocm9vdFtcIkpzR3JhcGhcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBiZDM0YWViZTI3NGE4OTBmYjhkNFxuICoqLyIsImRlZmluZShbJy4vbWlzYy5qcycsICdqcy1ncmFwaCddLCBmdW5jdGlvbiAoVS8qLCBKc0dyYXBoKi8pIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0LyoqIHtAY2xhc3MgRGVsdGFKc31cblx0ICogVGhpcyBjbGFzcyBvZmZlcnMgZXZlcnkgZnVuY3Rpb25hbGl0eSB5b3UgbmVlZCBmcm9tIGRlbHRhIG1vZGVsaW5nLlxuXHQgKiBFYWNoIGluc3RhbmNlIG9mZmVycyBpdHMgb3duIG9wZXJhdGlvbiB0eXBlcyBhbmQgdmFyaWF0aW9uIHBvaW50cy5cblx0ICogWW91IHdpbGwgdXN1YWxseSBuZWVkIG9ubHkgb25lIGluc3RhbmNlIHBlciBhcHBsaWNhdGlvbi5cblx0ICovXG5cdHZhciBEZWx0YUpzID0gVS5uZXdDbGFzcyhmdW5jdGlvbiBEZWx0YUpzKCkge1xuXG5cblx0XHQvKiBhbGlhcyBmb3IgJ3RoaXMnICovXG5cdFx0dmFyIHRoaXNEZWx0YUpzID0gdGhpcztcblxuXG5cdFx0LyogdGhlIHRoaW5ncyBpbnN0YW5jZXMgb2YgJ0RlbHRhSnMnIGtlZXBzIHRyYWNrIG9mICovXG5cdFx0dGhpcy5vcGVyYXRpb25zID0ge307ICAgLy8gcHJvcGVydHkgLT4gRGVsdGFcblx0XHR0aGlzLmNvbXBvc2l0aW9ucyA9IFtdOyAvLyBbe3ByZWRpY2F0ZSwgY29tcG9zZUZufV1cblxuXG5cdFx0LyogZGVmaW5lIHRoZSBiYXNlICdEZWx0YScgY2xhc3MgKi8vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKERlbHRhKVxuXHRcdHRoaXMub3BlcmF0aW9ucy5EZWx0YSA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKGFyZywgbWV0YSkge1xuXHRcdFx0dGhpcy5hcmcgPSBhcmc7XG5cdFx0XHR0aGlzLm1ldGEgPSBtZXRhIHx8IHt9O1xuXHRcdH0sIHtcblx0XHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHRcdCAqIFRoaXMgbWV0aG9kIHNob3VsZCBiZSBvdmVyd3JpdHRlbiBieSBzdWJjbGFzc2VzIHRvIG1ha2UgYSBjbG9uZSBvZiAndGhpcycgZGVsdGEuXG5cdFx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI29wZXJhdGlvbnMuRGVsdGF9IC0gYSBjbG9uZSBvZiB0aGlzIGRlbHRhXG5cdFx0XHQgKi9cblx0XHRcdGNsb25lKCkge1xuXHRcdFx0XHRyZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcy5hcmcsIHRoaXMubWV0YSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdFx0ICogQHBhcmFtICB2YWx1ZSB7Kn0gLSBhbnkgZ2l2ZW4gdmFsdWVcblx0XHRcdCAqIEByZXR1cm4gdGhlIHZhbHVlIHJlc3VsdGluZyBpbiB0aGlzIGRlbHRhIGJlaW5nIGFwcGxpZWQgdG8gdGhlIGdpdmVuIGB2YWx1ZWBcblx0XHRcdCAqL1xuXHRcdFx0YXBwbGllZFRvKHZhbHVlKSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh2YWx1ZS5jbG9uZSkpIHsgdmFsdWUgPSB2YWx1ZS5jbG9uZSgpIH1cblx0XHRcdFx0dmFyIG9iaiA9IHt2YWx1ZX07XG5cdFx0XHRcdHRoaXMuYXBwbHlUbyh3ZihvYmosICd2YWx1ZScpKTtcblx0XHRcdFx0cmV0dXJuIG9iai52YWx1ZTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0XHQgKiBAcGFyYW0gb3RoZXJEZWx0YSB7RGVsdGFKcyNvcGVyYXRpb25zLkRlbHRhfVxuXHRcdFx0ICovXG5cdFx0XHRjb21wb3NlKG90aGVyRGVsdGEpIHtcblx0XHRcdFx0dmFyIGNvbXBvc2VGbjtcblx0XHRcdFx0dGhpc0RlbHRhSnMuY29tcG9zaXRpb25zLnNvbWUoKHtwcmVkaWNhdGUsIGNvbXBvc2U6IGZufSkgPT4ge1xuXHRcdFx0XHRcdGlmIChwcmVkaWNhdGUodGhpcywgb3RoZXJEZWx0YSkpIHtcblx0XHRcdFx0XHRcdGNvbXBvc2VGbiA9IGZuO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0aWYgKCEhY29tcG9zZUZuKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGNvbXBvc2VGbih0aGlzLCBvdGhlckRlbHRhKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRVLmFzc2VydCghIWNvbXBvc2VGbixcblx0XHRcdFx0XHRcdFx0YEEgJyR7dGhpcy50eXBlfScgb3BlcmF0aW9uIGNhbm5vdCBiZSBmb2xsb3dlZCBieSBhICcke290aGVyRGVsdGEudHlwZX0nIG9wZXJhdGlvbi5gKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogQHBhcmFtIGluZGVudEx2bCB7TnVtYmVyP31cblx0XHRcdCAqIEBwYXJhbSBwcm9wICAgICAge1N0cmluZz99XG5cdFx0XHQgKi9cblx0XHRcdHRvU3RyaW5nKGluZGVudEx2bCA9IDAsIHByb3AgPSAnKHJvb3QpJykge1xuXHRcdFx0XHR2YXIgaW5kZW50ID0gVS5yZXBlYXQoMCArIGluZGVudEx2bCwgJyAgICAnKTtcblx0XHRcdFx0dmFyIHN0ciA9IGAke2luZGVudH0ke3RoaXMudHlwZX0gJyR7cHJvcH0nYDtcblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHRoaXMuYXJnKSkge1xuXHRcdFx0XHRcdHN0ciArPSBgOiAke0pTT04uc3RyaW5naWZ5KHRoaXMuYXJnKS5zbGljZSgxLCAtMSl9YDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodGhpcy5kZWx0YXMgJiYgT2JqZWN0LmtleXModGhpcy5kZWx0YXMpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRzdHIgKz0gJ1xcbicgKyBPYmplY3Qua2V5cyh0aGlzLmRlbHRhcylcblx0XHRcdFx0XHRcdFx0Lm1hcCgocCkgPT4gdGhpcy5kZWx0YXNbcF0udG9TdHJpbmcoaW5kZW50THZsICsgMSwgcCkpXG5cdFx0XHRcdFx0XHRcdC5qb2luKCdcXG4nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gc3RyO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKC9EZWx0YSlcblxuXG5cdFx0Ly8gVE9ETzogaW1wbGVtZW50IGRlbHRhIG1ldGhvZCBvdmVybG9hZHNcblx0XHQvL3RoaXMub3ZlcmxvYWRzID0ge307IC8vIG1ldGhvZCAtPiBbZGVsdGEtY2xhc3Nlc11cblx0XHQvL1xuXHRcdC8vLyogZGVmaW5lIHRoZSAnT3ZlcmxvYWRlZERlbHRhJyBjbGFzcywgd2hpY2ggaW52b2tlcyBkZWx0YXMgYmFzZWQgb24gdGFyZ2V0IHByZWRpY2F0ZXMgKi8vLy0tLS0oT3ZlcmxvYWRlZERlbHRhKVxuXHRcdC8vdGhpcy5vcGVyYXRpb25zLk92ZXJsb2FkZWREZWx0YSA9IFUubmV3U3ViY2xhc3ModGhpcy5vcGVyYXRpb25zLkRlbHRhLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKGFyZywgbWV0YSkge1xuXHRcdC8vXHRzdXBlckZuLmNhbGwodGhpcywgYXJnLCBtZXRhKTtcblx0XHQvL1x0dGhpcy5vdmVybG9hZHMgPSBbXTtcblx0XHQvL30sIHtcblx0XHQvL1x0Z2V0IHR5cGUoKSB7IHJldHVybiB0aGlzRGVsdGFKcy5vdmVybG9hZHNbdGhpcy5tZXRhLm1ldGhvZF0ubWFwKChjbHMpID0+IGNscy50eXBlKSB9LFxuXHRcdC8vXG5cdFx0Ly9cdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQvL1x0ICogQHJldHVybiB7RGVsdGFKcyNvcGVyYXRpb25zLk92ZXJsb2FkZWREZWx0YX0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHQvL1x0ICovXG5cdFx0Ly9cdGNsb25lKCkge1xuXHRcdC8vXHRcdHZhciByZXN1bHQgPSB0aGlzRGVsdGFKcy5vcGVyYXRpb25zLkRlbHRhLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm1ldGEpOyAvLyBzdXBlcigpXG5cdFx0Ly9cdFx0cmVzdWx0Lm92ZXJsb2FkcyA9IHRoaXMub3ZlcmxvYWRzLm1hcCgoe3ByZWRpY2F0ZSwgZGVsdGF9KSA9PiAoe3ByZWRpY2F0ZSwgZGVsdGE6IGRlbHRhLmNsb25lKCl9KSk7XG5cdFx0Ly9cdFx0cmV0dXJuIHJlc3VsdDtcblx0XHQvL1x0fSxcblx0XHQvL1xuXHRcdC8vXHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0Ly9cdCAqIEBwYXJhbSBmaWVsZCB7V3JpdGFibGVGaWVsZH1cblx0XHQvL1x0ICovXG5cdFx0Ly9cdGFwcGx5VG8oZmllbGQpIHtcblx0XHQvL1x0XHQvKiBhcHBseSB0aGUgZmlyc3Qgb3ZlcmxvYWQgdGhhdCBhcHBsaWVzIHRvIHRoZSBmaWVsZCAqL1xuXHRcdC8vXHRcdHZhciBzdWNjZXNzID0gdGhpcy5vdmVybG9hZHMuc29tZSgoe3ByZWRpY2F0ZSwgZGVsdGF9KSA9PiB7XG5cdFx0Ly9cdFx0XHRpZiAocHJlZGljYXRlKGZpZWxkLnZhbHVlKSkge1xuXHRcdC8vXHRcdFx0XHRkZWx0YS5hcHBseVRvKGZpZWxkKTtcblx0XHQvL1x0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0Ly9cdFx0XHR9XG5cdFx0Ly9cdFx0fSk7XG5cdFx0Ly9cblx0XHQvL1x0XHQvKiBpZiBub25lIGFwcGx5LCB0aHJvdyBhbiBhcHByb3ByaWF0ZSBlcnJvciAqL1xuXHRcdC8vXHRcdGlmICghc3VjY2Vzcykge1xuXHRcdC8vXHRcdFx0aWYgKHRoaXMudHlwZS5sZW5ndGggPT09IDApIHtcblx0XHQvL1x0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBUaGlzIG92ZXJsb2FkZWQgZGVsdGEgaGFzIG5vIG92ZXJsb2Fkcywgc28gY2Fubm90IGFwcGx5IHRvIHRoZSB2YWx1ZTogJHtmaWVsZC52YWx1ZX1gKTtcblx0XHQvL1x0XHRcdH0gZWxzZSBpZiAodGhpcy50eXBlLmxlbmd0aCA9PT0gMSkge1xuXHRcdC8vXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYERlbHRhIHR5cGUgJHt0aGlzLnR5cGVbMF19IGRvZXMgbm90IGFwcGx5IHRvIHRoZSB2YWx1ZTogJHtmaWVsZC52YWx1ZX1gKTtcblx0XHQvL1x0XHRcdH0gZWxzZSB7XG5cdFx0Ly9cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgTm9uZSBvZiB0aGUgZGVsdGEgdHlwZXMgJHt0aGlzLnR5cGUuam9pbignLCcpfSBhcHBseSB0byB0aGUgdmFsdWU6ICR7ZmllbGQudmFsdWV9YCk7XG5cdFx0Ly9cdFx0XHR9XG5cdFx0Ly9cdFx0fVxuXHRcdC8vXHR9XG5cdFx0Ly99KTtcblx0XHQvLy8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0oL092ZXJsb2FkZWREZWx0YSlcblxuXG5cblx0XHQvLyBUT0RPOiBjb21wb3NpdGlvbiBmdW5jdGlvbiBmb3IgT3ZlcmxvYWRlZERlbHRhXG5cblxuXG5cdFx0LyogZGVmaW5lIHRoZSBmdW5kYW1lbnRhbCAnTW9kaWZ5JyBkZWx0YSAqLy8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0oTW9kaWZ5KVxuXHRcdHRoaXMub3BlcmF0aW9ucy5Nb2RpZnkgPSBVLm5ld1N1YmNsYXNzKHRoaXMub3BlcmF0aW9ucy5EZWx0YSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIChhcmcsIG1ldGEpIHtcblx0XHRcdHN1cGVyRm4uY2FsbCh0aGlzLCBhcmcsIG1ldGEpO1xuXHRcdFx0dGhpcy5kZWx0YXMgPSB7fTtcblx0XHRcdC8vIFRPRE86IGFsbG93IG9wZXJhdGlvbnMgdG8gYmUgYWRkZWQgdGhyb3VnaCBhbiBvcHRpb25hbCBhcmd1bWVudFxuXHRcdH0sIHtcblx0XHRcdGdldCB0eXBlKCkgeyByZXR1cm4gJ01vZGlmeScgfSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdFx0ICogQHJldHVybiB7RGVsdGFKcyNvcGVyYXRpb25zLk1vZGlmeX0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHRcdCAqL1xuXHRcdFx0Y2xvbmUoKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSB0aGlzRGVsdGFKcy5vcGVyYXRpb25zLkRlbHRhLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm1ldGEpOyAvLyBzdXBlcigpXG5cdFx0XHRcdE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdFx0cmVzdWx0LmRlbHRhc1twcm9wXSA9IHRoaXMuZGVsdGFzW3Byb3BdLmNsb25lKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogQHBhcmFtIGZpZWxkIHtEZWx0YUpzLldyaXRhYmxlRmllbGR9XG5cdFx0XHQgKi9cblx0XHRcdGFwcGx5VG8oZmllbGQpIHtcblx0XHRcdFx0VS5hc3NlcnQoVS5pc0RlZmluZWQoZmllbGQudmFsdWUpLFxuXHRcdFx0XHRcdFx0YFRoZSAnTW9kaWZ5JyBvcGVyYXRpb24gZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgZGVmaW5lZC5gKTtcblx0XHRcdFx0VS5hc3NlcnQoZmllbGQudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QsXG5cdFx0XHRcdFx0XHRgVGhlICdNb2RpZnknIG9wZXJhdGlvbiBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBhbiBPYmplY3QuYCk7XG5cdFx0XHRcdE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5kZWx0YXNbcHJvcF0uYXBwbHlUbyh3ZihmaWVsZC52YWx1ZSwgcHJvcCkpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIEBwYXJhbSBvYmogIHtPYmplY3R9XG5cdFx0XHQgKi9cblx0XHRcdGFwcGx5VG9Qcm9wZXJ0aWVzT2Yob2JqKSB7XG5cdFx0XHRcdFUuYXNzZXJ0KFUuaXNEZWZpbmVkKG9iaiksXG5cdFx0XHRcdFx0XHRgVGhlICdNb2RpZnknIG9wZXJhdGlvbiBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBkZWZpbmVkLmApO1xuXHRcdFx0XHRVLmFzc2VydChvYmogaW5zdGFuY2VvZiBPYmplY3QsXG5cdFx0XHRcdFx0XHRgVGhlICdNb2RpZnknIG9wZXJhdGlvbiBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBhbiBPYmplY3QuYCk7XG5cdFx0XHRcdE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5kZWx0YXNbcHJvcF0uYXBwbHlUbyh3ZihvYmosIHByb3ApKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gcGF0aCB7U3RyaW5nfVxuXHRcdFx0ICovXG5cdFx0XHRtb2RpZnkocGF0aCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fYWRkT3BlcmF0aW9uKCdNb2RpZnknLCBwYXRoKTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gb3BUeXBlIHtTdHJpbmd9XG5cdFx0XHQgKiBAcGFyYW0gcGF0aCAgIHtTdHJpbmd9XG5cdFx0XHQgKiBAcGFyYW0gYXJnICAgIHsqfVxuXHRcdFx0ICogQHBhcmFtIG1ldGEgICB7T2JqZWN0fSAtIG1ldGEgaW5mb3JtYXRpb24gYWJvdXQgdGhlIG9wZXJhdGlvblxuXHRcdFx0ICogQHJldHVybiB7e3Byb3A6IFN0cmluZywgcmVzdWx0OiBEZWx0YUpzI29wZXJhdGlvbnMubW9kaWZ5fX0gLSB0aGUgZGVlcGVzdCAnTW9kaWZ5JyBkZWx0YSBpbnZvbHZlZCBpbiB0aGlzIG1ldGhvZC1jYWxsXG5cdFx0XHQgKi9cblx0XHRcdF9wcmVQcm9jZXNzTmV3T3BlcmF0aW9uKG9wVHlwZSwgcGF0aCwgYXJnLCBtZXRhKSB7XG5cblx0XHRcdFx0LyogZGlzc2VjdCB0aGUgJ3BhdGgnIHN0cmluZyAqL1xuXHRcdFx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gIDExMTExICAyMjIyMjIyMjIyMiAgMzMgIC8vXG5cdFx0XHRcdHZhciBtYXRjaCA9IHBhdGgubWF0Y2goL14oWy4jXT8pKFxcdyt8XFwoXFx3K1xcKSkoLiopJC8pO1xuXHRcdFx0XHRVLmFzc2VydChtYXRjaCwgYFRoZSBwYXRoIHN0cmluZyAnJHtwYXRofScgaXMgbm90IHdlbGwgZm9ybWVkLmApO1xuXHRcdFx0XHR2YXIgWywgbGVhZCwgcHJvcCwgcmVzdF0gPSBtYXRjaDtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IG51bGw7XG5cblx0XHRcdFx0aWYgKGxlYWQgPT09ICcjJykge1xuXHRcdFx0XHRcdC8qIGlmICdwYXRoJyBoYXMgYSBsZWFkaW5nICcjJyBjaGFyYWN0ZXIsIHRyYW5zZm9ybSBpdCBhbmQgcmVjYWxsIHRoaXMgbWV0aG9kICovXG5cdFx0XHRcdFx0Ly8gdGhlICMgc2VwYXJhdG9yIGV4cGVjdHMgdGhlIGN1cnJlbnQgb2JqZWN0IHRvIGJlIGEgY29uc3RydWN0b3IgZnVuY3Rpb24sXG5cdFx0XHRcdFx0Ly8gYW5kIHlpZWxkcyBhIGRlbHRhIHRvIG1vZGlmeSBuZXcgaW5zdGFuY2VzIG9mIHRoZSBjb3JyZXNwb25kaW5nIGNsYXNzXG5cdFx0XHRcdFx0cmVzdWx0ID0gdGhpcy5fYWRkT3BlcmF0aW9uKG9wVHlwZSwgYC4oaW5zdGFuY2UpLiR7cHJvcH0ke3Jlc3R9YCwgYXJnLCBtZXRhKTtcblx0XHRcdFx0fSBlbHNlIGlmIChyZXN0Lmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHQvKiBpZiB0aGVyZSBpcyBhIGxvbmdlciBjaGFpbiwgY2FsbCB0aGlzIG1ldGhvZCByZWN1cnNpdmVseSAqL1xuXHRcdFx0XHRcdC8vIHJlY3Vyc2UuLi4uaW5kaXJlY3RseS4uLmRpcmVjdGx5XG5cdFx0XHRcdFx0cmVzdWx0ID0gdGhpcy5tb2RpZnkocHJvcCkuX2FkZE9wZXJhdGlvbihvcFR5cGUsIHJlc3QsIGFyZywgbWV0YSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4ge3Byb3AsIHJlc3VsdH07XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdFx0ICogQHBhcmFtIG9wVHlwZSB7U3RyaW5nfVxuXHRcdFx0ICogQHBhcmFtIHBhdGggICB7U3RyaW5nfVxuXHRcdFx0ICogQHBhcmFtIGFyZyAgICB7Kn1cblx0XHRcdCAqIEBwYXJhbSBtZXRhICAge09iamVjdH0gLSBtZXRhIGluZm9ybWF0aW9uIGFib3V0IHRoZSBvcGVyYXRpb25cblx0XHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjb3BlcmF0aW9ucy5tb2RpZnl9IC0gdGhlIGRlZXBlc3QgJ01vZGlmeScgZGVsdGEgaW52b2x2ZWQgaW4gdGhpcyBtZXRob2QtY2FsbFxuXHRcdFx0ICovXG5cdFx0XHRfYWRkT3BlcmF0aW9uKG9wVHlwZSwgcGF0aCwgYXJnLCBtZXRhKSB7XG5cblx0XHRcdFx0LyogcHJlLXByb2Nlc3MgdGhlIGFyZ3VtZW50cywgcG9zc2libHkgYWxyZWFkeSBnZXQgdGhlIHJlc3VsdCBieSBkZWxlZ2F0aW9uICovXG5cdFx0XHRcdHZhciB7cHJvcCwgcmVzdWx0fSA9IHRoaXMuX3ByZVByb2Nlc3NOZXdPcGVyYXRpb24ob3BUeXBlLCBwYXRoLCBhcmcsIG1ldGEpO1xuXHRcdFx0XHRpZiAocmVzdWx0KSB7IHJldHVybiByZXN1bHQgfVxuXG5cdFx0XHRcdC8qIGF0IHRoaXMgcG9pbnQsIHdlIGNvbnN0cnVjdCB0aGUgbmV3IGRlbHRhICovXG5cdFx0XHRcdHZhciBuZXdEZWx0YSA9IG5ldyB0aGlzRGVsdGFKcy5vcGVyYXRpb25zW29wVHlwZV0oYXJnLCBtZXRhKTtcblxuXHRcdFx0XHQvKiBkbyB3ZSBuZWVkIHRvIGNvbXBvc2UgdGhlIG5ldyBkZWx0YSB3aXRoIGFuIGV4aXN0aW5nIG9uZT8gKi9cblx0XHRcdFx0aWYgKHRoaXMuZGVsdGFzW3Byb3BdKSB7XG5cdFx0XHRcdFx0dmFyIGNvbXBvc2l0aW9uID0gdGhpcy5kZWx0YXNbcHJvcF0gPSB0aGlzLmRlbHRhc1twcm9wXS5jb21wb3NlKG5ld0RlbHRhKTtcblxuXHRcdFx0XHRcdC8qICBpZiB0aGUgcmVzdWx0IHNob3VsZCBiZSBhICdNb2RpZnknIHRvIGFjY29tbW9kYXRlIGZ1cnRoZXIgb3BlcmF0aW9ucywgICAgICAgICAgICovXG5cdFx0XHRcdFx0LyogIGJ1dCB0aGUgY29tcG9zaXRpb24gaXNuJ3QsIHJldHVybiBhICdNb2RpZnknIHRhcmdldGVkIGF0IHRoZSBjb21wb3NpdGlvbiB2YWx1ZSAgKi9cblx0XHRcdFx0XHRpZiAob3BUeXBlID09PSAnTW9kaWZ5JyAmJiBjb21wb3NpdGlvbi50eXBlICE9PSAnTW9kaWZ5Jykge1xuXHRcdFx0XHRcdFx0cmV0dXJuIG5ldyB0aGlzRGVsdGFKcy5vcGVyYXRpb25zLlRhcmdldGVkTW9kaWZ5KGNvbXBvc2l0aW9uLmFyZywgbWV0YSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIGNvbXBvc2l0aW9uLnR5cGUgPT09ICdNb2RpZnknID8gY29tcG9zaXRpb24gOiB0aGlzO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyogdGhlcmUgd2FzIG5vIG9wZXJhdGlvbiBvbiB0aGF0IHByb3BlcnR5IHlldDsgYWRkIGl0ICovXG5cdFx0XHRcdHRoaXMuZGVsdGFzW3Byb3BdID0gbmV3RGVsdGE7XG5cdFx0XHRcdHJldHVybiBuZXdEZWx0YS50eXBlID09PSAnTW9kaWZ5JyA/IG5ld0RlbHRhIDogdGhpcztcblxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0oL01vZGlmeSlcblxuXG5cdFx0Ly8gSW4gb3JkZXIgdG8gcHJvY2VzcyBkZWx0YSBjb21wb3NpdGlvbnMgbGlrZVxuXHRcdC8vICAgICBkZWx0YS5hZGQoJ29iaicsIHt9KTtcblx0XHQvLyAgICAgZGVsdGEubW9kaWZ5KCdvYmonKTtcblx0XHQvLyBhbmQgc3RpbGwgcmV0dXJuICdNb2RpZnknIGRlbHRhcyB0byB0aGUgdXNlciBmb3IgZnVydGhlciBvcGVyYXRpb25zLFxuXHRcdC8vIHdlIG5lZWQgdGVtcG9yYXJ5ICdNb2RpZnknIGRlbHRhcyB0aGF0IHJlbWVtYmVyIHRoZWlyIHRhcmdldCwgd2hpY2hcblx0XHQvLyB3ZSB3aWxsIGNhbGwgJ3RhcmdldGVkIGRlbHRhcycuXG5cblx0XHQvKiBkZWZpbmUgdGhlICdUYXJnZXRlZE1vZGlmeScgZGVsdGEgc3ViY2xhc3MgKi8vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0odGFyZ2V0ZWRNb2RpZnkpXG5cdFx0Ly8gVE9ETzogTUFZQkU/IGNyZWF0ZSBnZW5lcmljIFRhcmdldGVkRGVsdGEgY2xhc3MgdGhhdCBIQVMgYSBkZWx0YSB0byBhcHBseSB0byBpdHMgdGFyZ2V0P1xuXHRcdHRoaXMub3BlcmF0aW9ucy5UYXJnZXRlZE1vZGlmeSA9IFUubmV3U3ViY2xhc3ModGhpcy5vcGVyYXRpb25zLk1vZGlmeSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uICh0YXJnZXQsIGFyZywgbWV0YSkge1xuXHRcdFx0c3VwZXJGbi5jYWxsKHRoaXMsIGFyZywgbWV0YSk7XG5cdFx0XHR0aGlzLnRhcmdldCA9IHRhcmdldDtcblx0XHR9LCB7XG5cblx0XHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjb3BlcmF0aW9ucy5UYXJnZXRlZE1vZGlmeX0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHRcdCAqL1xuXHRcdFx0Y2xvbmUoKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSB0aGlzLm9wZXJhdGlvbnMuTW9kaWZ5LnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm1ldGEpOyAvLyBzdXBlcigpXG5cdFx0XHRcdHJlc3VsdC50YXJnZXQgPSB0aGlzLnRhcmdldDtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIFRhcmdldGVkIGRlbHRhcyBjYW4ndCBiZSBhcHBsaWVkIFRPIGFueXRoaW5nLlxuXHRcdFx0ICogVGhpcyBtZXRob2QgaXMgb3ZlcndyaXR0ZW4gdG8gYXZvaWQgbWlzdGFrZXMuXG5cdFx0XHQgKi9cblx0XHRcdGFwcGx5VG8oKSB7IHRocm93IG5ldyBFcnJvcihgVGFyZ2V0ZWRNb2RpZnkgZGVsdGFzIGNhbm5vdCBiZSBhcHBsaWVkIFRPIGFueXRoaW5nLmApIH0sXG5cblx0XHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIG9wVHlwZSB7U3RyaW5nfVxuXHRcdFx0ICogQHBhcmFtIHBhdGggICB7U3RyaW5nfVxuXHRcdFx0ICogQHBhcmFtIGFyZyAgICB7Kn1cblx0XHRcdCAqIEBwYXJhbSBtZXRhICAge09iamVjdH0gLSBtZXRhIGluZm9ybWF0aW9uIGFib3V0IHRoZSBvcGVyYXRpb25cblx0XHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjb3BlcmF0aW9ucy5tb2RpZnl9IC0gdGhlIGRlZXBlc3QgJ01vZGlmeScgZGVsdGEgaW52b2x2ZWQgaW4gdGhpcyBtZXRob2QtY2FsbFxuXHRcdFx0ICovXG5cdFx0XHRfYWRkT3BlcmF0aW9uKG9wVHlwZSwgcGF0aCwgYXJnLCBtZXRhKSB7XG5cdFx0XHRcdC8qIHByZS1wcm9jZXNzIHRoZSBhcmd1bWVudHMsIHBvc3NpYmx5IGFscmVhZHkgZ2V0IHRoZSByZXN1bHQgYnkgZGVsZWdhdGlvbiAqL1xuXHRcdFx0XHR2YXIge3Byb3AsIHJlc3VsdH0gPSB0aGlzLl9wcmVQcm9jZXNzTmV3T3BlcmF0aW9uKG9wVHlwZSwgcGF0aCwgYXJnLCBtZXRhKTtcblx0XHRcdFx0aWYgKHJlc3VsdCkgeyByZXR1cm4gcmVzdWx0IH1cblxuXHRcdFx0XHQvKiBpZiB0aGUgbmV3IGRlbHRhIHNob3VsZCBiZSBhICdNb2RpZnknIGRlbHRhLCBpdCBpcyBhIHRhcmdldGVkIGRlbHRhICovXG5cdFx0XHRcdGlmIChvcFR5cGUgPT09ICdNb2RpZnknKSB7XG5cdFx0XHRcdFx0dmFyIG5ld0RlbHRhID0gbmV3IHRoaXNEZWx0YUpzLm9wZXJhdGlvbnMuVGFyZ2V0ZWRNb2RpZnkoYXJnLCBtZXRhKTtcblx0XHRcdFx0XHRuZXdEZWx0YS50YXJnZXQgPSB0aGlzLnRhcmdldFtwcm9wXTtcblx0XHRcdFx0XHRyZXR1cm4gbmV3RGVsdGE7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiBhcHBseSB0aGUgbmV3IGRlbHRhIHRvIGl0cyB0YXJnZXQsIGRpc2NhcmQgaXQgYW5kIHJldHVybiAndGhpcycgZGVsdGEgKi9cblx0XHRcdFx0KG5ldyB0aGlzRGVsdGFKcy5vcGVyYXRpb25zW29wVHlwZV0oYXJnLCBtZXRhKSkuYXBwbHlUbyh3Zih0aGlzLnRhcmdldCwgcHJvcCkpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblxuXHRcdH0pO1xuXHRcdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKC90YXJnZXRlZE1vZGlmeSlcblxuXG5cdFx0Lyogc2V0IHRoZSBmb3VuZGF0aW9uIG9mIHRoZSBjb21wb3NpdGlvbnMgYXJyYXkgKi9cblx0XHR0aGlzLmNvbXBvc2l0aW9uc1snTW9kaWZ5J10gPSB7ICdNb2RpZnknOiBbXSB9O1xuXG5cblx0XHQvKiBkZWZpbmUgc3RhbmRhcmQgb3BlcmF0aW9ucyAqL1xuXHRcdHRoaXMuX2RlZmluZVN0YW5kYXJkT3BlcmF0aW9uVHlwZXMoKTtcblxuXG5cdH0sIC8qKiBAbGVuZHMgRGVsdGFKcy5wcm90b3R5cGUgKi8gIHtcblxuXHRcdC8qKiB7QHB1YmxpY317QHByb3BlcnR5fVxuXHRcdCAqIHF1aWNrIGFjY2VzcyB0byB0aGUgJ01vZGlmeScgZGVsdGEgY29uc3RydWN0b3Jcblx0XHQgKi9cblx0XHRnZXQgRGVsdGEoKSB7IHJldHVybiB0aGlzLm9wZXJhdGlvbnMuTW9kaWZ5IH0sXG5cblx0XHQvLy8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQvLyAqXG5cdFx0Ly8gKi9cblx0XHQvL3ZwKHZwTmFtZSwgdmFsKSB7XG5cdFx0Ly9cdC8vIFRPRE9cblx0XHQvL30sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gbmFtZSAgICB7U3RyaW5nfVxuXHRcdCAqIEBwYXJhbSBhcHBseVRvIHsoRGVsdGFKcy5Xcml0YWJsZUZpZWxkKSA9PiB1bmRlZmluZWR9XG5cdFx0ICovXG5cdFx0bmV3T3BlcmF0aW9uVHlwZShuYW1lLCB7Y29uc3RydWN0LCBhcHBseVRvLCBtZXRob2RzLCBjbG9uZX0pIHtcblxuXHRcdFx0Lyogc2FuaXR5IGNoZWNrcyAqL1xuXHRcdFx0VS5hc3NlcnQoIXRoaXMub3BlcmF0aW9uc1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlICcke25hbWV9JyBvcGVyYXRpb24gdHlwZSBhbHJlYWR5IGV4aXN0cy5gKTtcblxuXHRcdFx0LyogY3JlYXRlIHRoZSBjb3JyZXNwb25kaW5nIG1ldGhvZChzKSBpbiB0aGUgJ01vZGlmeScgY2xhc3MgKi9cblx0XHRcdC8vIGlmIG5vIG1ldGhvZHMgYXJlIHByb3ZpZGVkLCB1c2UgdGhlIG9wZXJhdGlvbiBuYW1lIHN0YXJ0aW5nIHdpdGggYSBsb3dlcmNhc2UgbGV0dGVyXG5cdFx0XHRtZXRob2RzID0gbWV0aG9kcyB8fCBbIG5hbWVbMF0udG9Mb3dlckNhc2UoKStuYW1lLnNsaWNlKDEpIF07XG5cdFx0XHRtZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuXHRcdFx0XHR0aGlzLm9wZXJhdGlvbnMuTW9kaWZ5LnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKHByb3AsIGFyZykge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9hZGRPcGVyYXRpb24obmFtZSwgcHJvcCwgYXJnLCB7IG1ldGhvZCB9KTtcblx0XHRcdFx0fTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKiBwdXQgdGhlIHJpZ2h0IGZvdW5kYXRpb24gaW4gJ3RoaXMuY29tcG9zaXRpb24nICovXG5cdFx0XHR0aGlzLmNvbXBvc2l0aW9uc1tuYW1lXSA9IHt9O1xuXHRcdFx0T2JqZWN0LmtleXModGhpcy5jb21wb3NpdGlvbnMpLmZvckVhY2goKHR5cGUpID0+IHtcblx0XHRcdFx0VS5hc3NlcnQoIXRoaXMuY29tcG9zaXRpb25zW3R5cGVdW25hbWVdKTtcblx0XHRcdFx0VS5hc3NlcnQoIXRoaXMuY29tcG9zaXRpb25zW25hbWVdW3R5cGVdKTtcblx0XHRcdFx0dGhpcy5jb21wb3NpdGlvbnNbdHlwZV1bbmFtZV0gPSBbXTtcblx0XHRcdFx0dGhpcy5jb21wb3NpdGlvbnNbbmFtZV1bdHlwZV0gPSBbXTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKiBjcmVhdGUgdGhlIERlbHRhIHN1YmNsYXNzIHJlcHJlc2VudGluZyB0aGlzIG9wZXJhdGlvbiB0eXBlICovLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLShvdGhlcilcblx0XHRcdHRoaXMub3BlcmF0aW9uc1tuYW1lXSA9IFUubmV3U3ViY2xhc3ModGhpcy5vcGVyYXRpb25zLkRlbHRhLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKGFyZywgbWV0YSkge1xuXHRcdFx0XHRzdXBlckZuLmNhbGwodGhpcywgYXJnLCBtZXRhKTtcblx0XHRcdFx0aWYgKGNvbnN0cnVjdCkgeyBjb25zdHJ1Y3QuY2FsbCh0aGlzKSB9XG5cdFx0XHR9LCBVLmV4dGVuZCh7XG5cdFx0XHRcdHR5cGU6IG5hbWUsXG5cdFx0XHRcdGFwcGx5VG86IGFwcGx5VG9cblx0XHRcdH0pKTtcblx0XHRcdGlmIChVLmlzRGVmaW5lZChjbG9uZSkpIHsgdGhpcy5vcGVyYXRpb25zW25hbWVdLnByb3RvdHlwZS5jbG9uZSA9IGNsb25lIH1cblx0XHRcdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0oL290aGVyKVxuXG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSBwcmVkaWNhdGUgeyhEZWx0YUpzI29wZXJhdGlvbnMuRGVsdGEsIERlbHRhSnMjb3BlcmF0aW9ucy5EZWx0YSkgPT4gQm9vbGVhbn0gLSBjYW4gdGhlc2UgZGVsdGFzIGJlIGNvbXBvc2VkIHRoaXMgd2F5P1xuXHRcdCAqIEBwYXJhbSBjb21wb3NlICAgeyhEZWx0YUpzI29wZXJhdGlvbnMuRGVsdGEsIERlbHRhSnMjb3BlcmF0aW9ucy5EZWx0YSkgPT4gRGVsdGFKcyNvcGVyYXRpb25zLkRlbHRhfSAtIHNob3VsZCBiZSBzaWRlLWVmZmVjdCBmcmVlXG5cdFx0ICovXG5cdFx0bmV3Q29tcG9zaXRpb24ocHJlZGljYXRlLCBjb21wb3NlKSB7XG5cdFx0XHR0aGlzLmNvbXBvc2l0aW9ucy5wdXNoKHtwcmVkaWNhdGUsIGNvbXBvc2V9KTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHQgKlxuXHRcdCAqL1xuXHRcdF9kZWZpbmVTdGFuZGFyZE9wZXJhdGlvblR5cGVzKCkge1xuXG5cdFx0XHR2YXIgdGhpc0RlbHRhSnMgPSB0aGlzO1xuXG5cdFx0XHQvKiBjb252ZW5pZW5jZSBkZWZpbml0aW9ucyBmb3IgdGhlIGFwcGxpY2F0aW9uIGFuZCBjb21wb3NpdGlvbiBmdW5jdGlvbnMgYmVsb3cgKi9cblx0XHRcdGZ1bmN0aW9uIHQodHlwZTEsIHR5cGUyKSB7IHJldHVybiAoZDEsIGQyKSA9PiAoZDEudHlwZSA9PT0gdHlwZTEgJiYgZDIudHlwZSA9PT0gdHlwZTIpIH1cblx0XHRcdGZ1bmN0aW9uIGQodHlwZSwgZm4gPSBudWxsKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgZm4gPT09ICdzdHJpbmcnKSB7IGZuID0gKCh2KSA9PiAobykgPT4gb1t2XSkoZm4pIH1cblx0XHRcdFx0aWYgKGZuKSB7XG5cdFx0XHRcdFx0cmV0dXJuIChkMSwgZDIpID0+IG5ldyAodGhpc0RlbHRhSnMub3BlcmF0aW9uc1t0eXBlXSkoZm4oe2QxLCBkMiwgcDE6IGQxLmFyZywgcDI6IGQyLmFyZ30pKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gKGQxLCBkMikgPT4gbmV3ICh0aGlzRGVsdGFKcy5vcGVyYXRpb25zW3R5cGVdKSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQvL2Z1bmN0aW9uIGQxKHtkMTogdn0pIHsgcmV0dXJuIHYgfVxuXHRcdFx0Ly9mdW5jdGlvbiBkMih7ZDI6IHZ9KSB7IHJldHVybiB2IH1cblx0XHRcdC8vZnVuY3Rpb24gcDEoe3AxOiB2fSkgeyByZXR1cm4gdiB9XG5cdFx0XHRmdW5jdGlvbiBwMih7cDI6IHZ9KSB7IHJldHVybiB2IH1cblx0XHRcdGZ1bmN0aW9uIGFzc2VydERlZmluZWQodmFsLCBvcFR5cGUpIHtcblx0XHRcdFx0VS5hc3NlcnQoVS5pc0RlZmluZWQodmFsKSxcblx0XHRcdFx0XHRcdGBUaGUgb3BlcmF0aW9uICcke29wVHlwZX0nIGV4cGVjdHMgdGhlIHByb3BlcnR5IHRvIGJlIGRlZmluZWQuYCk7XG5cdFx0XHR9XG5cdFx0XHRmdW5jdGlvbiBhc3NlcnRVbmRlZmluZWQodmFsLCBvcFR5cGUpIHtcblx0XHRcdFx0VS5hc3NlcnQoVS5pc1VuZGVmaW5lZCh2YWwpLFxuXHRcdFx0XHRcdFx0YFRoZSBvcGVyYXRpb24gJyR7b3BUeXBlfScgZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgdW5kZWZpbmVkLmApO1xuXHRcdFx0fVxuXHRcdFx0ZnVuY3Rpb24gYXNzZXJ0QXJyYXkodmFsLCBvcFR5cGUpIHtcblx0XHRcdFx0VS5hc3NlcnQoQXJyYXkuaXNBcnJheSh2YWwpLFxuXHRcdFx0XHRcdFx0YFRoZSBvcGVyYXRpb24gJyR7b3BUeXBlfScgZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgYW4gYXJyYXkuYCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gL1xuXG5cdFx0XHQvKiBkZWNsYXJpbmcgdGhlIGJhc2ljIG9wZXJhdGlvbiB0eXBlcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0Ly8gJ01vZGlmeScgaXMgdGhlIG1vc3QgZnVuZGFtZW50YWwgb3BlcmF0aW9uLFxuXHRcdFx0Ly8gIGFuZCBpcyBkZWZpbmVkIGFib3ZlIHJhdGhlciB0aGFuIGhlcmVcblx0XHRcdHRoaXMubmV3T3BlcmF0aW9uVHlwZSgnQWRkJywge1xuXHRcdFx0XHRhcHBseVRvKGZpZWxkKSB7XG5cdFx0XHRcdFx0YXNzZXJ0VW5kZWZpbmVkKGZpZWxkLnZhbHVlLCAnQWRkJyk7XG5cdFx0XHRcdFx0ZmllbGQudmFsdWUgPSB0aGlzLmFyZztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLm5ld09wZXJhdGlvblR5cGUoJ1JlbW92ZScsIHtcblx0XHRcdFx0YXBwbHlUbyhmaWVsZCkge1xuXHRcdFx0XHRcdGFzc2VydERlZmluZWQoZmllbGQudmFsdWUsICdSZW1vdmUnKTtcblx0XHRcdFx0XHRmaWVsZC5kZWxldGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLm5ld09wZXJhdGlvblR5cGUoJ0ZvcmJpZCcsIHtcblx0XHRcdFx0YXBwbHlUbyhmaWVsZCkge1xuXHRcdFx0XHRcdGFzc2VydFVuZGVmaW5lZChmaWVsZC52YWx1ZSwgJ0ZvcmJpZCcpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHRoaXMubmV3T3BlcmF0aW9uVHlwZSgnUmVwbGFjZScsIHtcblx0XHRcdFx0YXBwbHlUbyhmaWVsZCkge1xuXHRcdFx0XHRcdGFzc2VydERlZmluZWQoZmllbGQudmFsdWUsICdSZXBsYWNlJyk7XG5cdFx0XHRcdFx0ZmllbGQudmFsdWUgPSB0aGlzLmFyZztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ01vZGlmeScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknLCAnTW9kaWZ5JyksIChkMSwgZDIpID0+IHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IGQxLmNsb25lKCk7XG5cdFx0XHRcdE9iamVjdC5rZXlzKGQyLmRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHRcdHJlc3VsdC5kZWx0YXNbcHJvcF0uY29tcG9zZShkMi5kZWx0YXNbcHJvcF0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdBZGQnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0Ly90aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnLCAnTW9kaWZ5JyksIGFwcGx5RDJUb1AxICk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnLCAnTW9kaWZ5JyksIGQoJ0FkZCcsICh7ZDIsIHAxfSkgPT4gZDIuYXBwbGllZFRvKHAxKSkgKTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUmVtb3ZlJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScsICdSZW1vdmUnKSwgZCgnUmVtb3ZlJykgICAgICApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICwgJ1JlbW92ZScpLCBkKCdGb3JiaWQnKSAgICAgICk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnLCAnQWRkJyAgICksIGQoJ1JlcGxhY2UnLCBwMikgKTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnRm9yYmlkJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScsICdGb3JiaWQnKSwgZCgnUmVtb3ZlJykgICk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnLCAnQWRkJyAgICksIGQoJ0FkZCcsIHAyKSApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJywgJ0ZvcmJpZCcpLCBkKCdGb3JiaWQnKSAgKTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUmVwbGFjZScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScgLCAnUmVwbGFjZScpLCBkKCdSZXBsYWNlJywgcDIpICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICAsICdSZXBsYWNlJyksIGQoJ0FkZCcsIHAyKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ01vZGlmeScgKSwgZCgnUmVwbGFjZScsICh7ZDIsIHAxfSkgPT4gZDIuYXBwbGllZFRvKHAxKSkgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnUmVtb3ZlJyApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdSZXBsYWNlJyksIGQoJ1JlcGxhY2UnLCBwMikgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cblx0XHRcdC8qIGRlY2xhcmluZyB0aGUgYXJyYXkgb3BlcmF0aW9uIHR5cGUgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFx0XHR0aGlzLm5ld09wZXJhdGlvblR5cGUoJ1B1dCcsIHtcblx0XHRcdFx0Y29uc3RydWN0KCkge1xuXHRcdFx0XHRcdGlmICh0aGlzLm1ldGEubWV0aG9kKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnZhbHVlcyA9IFt7XG5cdFx0XHRcdFx0XHRcdG1ldGhvZDogdGhpcy5tZXRhLm1ldGhvZCxcblx0XHRcdFx0XHRcdFx0dmFsdWU6IHRoaXMuYXJnXG5cdFx0XHRcdFx0XHR9XTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpcy52YWx1ZXMgPSBbXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGNsb25lKCkge1xuXHRcdFx0XHRcdHZhciByZXN1bHQgPSB0aGlzRGVsdGFKcy5vcGVyYXRpb25zLkRlbHRhLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm1ldGEpOyAvLyBzdXBlcigpXG5cdFx0XHRcdFx0cmVzdWx0LnZhbHVlcyA9IFtdO1xuXHRcdFx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHYpID0+IHsgcmVzdWx0LnZhbHVlcy5wdXNoKHYpIH0pO1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFwcGx5VG8oZmllbGQpIHtcblx0XHRcdFx0XHRhc3NlcnREZWZpbmVkKGZpZWxkLnZhbHVlLCAnUHV0Jyk7XG5cdFx0XHRcdFx0YXNzZXJ0QXJyYXkoZmllbGQudmFsdWUsICdQdXQnKTtcblx0XHRcdFx0XHR2YXIgYXJyID0gZmllbGQudmFsdWU7XG5cdFx0XHRcdFx0dGhpcy52YWx1ZXMuZm9yRWFjaCgoe21ldGhvZCwgdmFsdWV9KSA9PiB7XG5cdFx0XHRcdFx0XHRzd2l0Y2ggKG1ldGhvZCkge1xuXHRcdFx0XHRcdFx0XHRjYXNlICdwcmVwZW5kJzoge1xuXHRcdFx0XHRcdFx0XHRcdGFyci51bnNoaWZ0KHZhbHVlKTtcblx0XHRcdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0XHRcdFx0Y2FzZSAnaW5zZXJ0Jzoge1xuXHRcdFx0XHRcdFx0XHRcdC8vICdpbnNlcnQnIGRvZXNuJ3QgKmhhdmUqIHRvIHVzZSBhIHJhbmRvbSBwb3NpdGlvbi4gQW55IHBvc2l0aW9uIHdpbGwgZG8uXG5cdFx0XHRcdFx0XHRcdFx0Ly8gIEUuZy4sIGl0cyBpbXBsZW1lbnRhdGlvbiBjb3VsZCBqdXN0IGJlIHRoZSBzYW1lIGFzIGZvciAnYXBwZW5kJy5cblx0XHRcdFx0XHRcdFx0XHQvLyAgTm9uZXRoZWxlc3MsIHdlIHVzZSBhIHJhbmRvbSBwb3NpdGlvbiB0byBmb3JjZSB0aGUgdGVzdHMgdG8gYmUgcGVybWlzc2l2ZS5cblx0XHRcdFx0XHRcdFx0XHR2YXIgcG9zaXRpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYXJyLmxlbmd0aCArIDEpKTtcblx0XHRcdFx0XHRcdFx0XHRhcnIuc3BsaWNlKHBvc2l0aW9uLCAwLCB2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0XHRcdGNhc2UgJ2FwcGVuZCc6IHtcblx0XHRcdFx0XHRcdFx0XHRhcnIucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdG1ldGhvZHM6IFsncHJlcGVuZCcsICdpbnNlcnQnLCAnYXBwZW5kJ11cblx0XHRcdH0pO1xuXG5cdFx0XHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdSZXBsYWNlJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICAsICdQdXQnICAgICksIGQoJ0FkZCcsICAgICAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ1B1dCcgICAgKSwgZCgnUmVwbGFjZScsICh7ZDIsIHAxfSkgPT4gZDIuYXBwbGllZFRvKHAxKSkgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dCcgICAgLCAnUmVtb3ZlJyApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0JyAgICAsICdSZXBsYWNlJyksIGQoJ1JlcGxhY2UnLCBwMikgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXQnICAgICwgJ1B1dCcgICAgKSwgKGQxLCBkMikgPT4ge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gbmV3IHRoaXNEZWx0YUpzLm9wZXJhdGlvbnMuUHV0KCk7XG5cdFx0XHRcdHJlc3VsdC52YWx1ZXMgPSAoZDEudmFsdWVzKS5jb25jYXQoZDIudmFsdWVzKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0pO1xuXG5cdFx0XHQvL3RoaXMubmV3T3BlcmF0aW9uVHlwZSgnRGVsdGFNb2RlbCcsIGZ1bmN0aW9uIGFwcGx5VG8oZmllbGQpIHtcblx0XHRcdC8vXHR0aGlzLmFyZy50b3BvbG9naWNhbGx5KChzdWJEZWx0YSkgPT4ge1xuXHRcdFx0Ly9cdFx0Ly8gdGhlIGdyYXBoIGlzIGFsbG93ZWQgdG8gY29udGFpbiAnbnVsbCcgdmVydGljZXMgZm9yIG9yZGVyaW5nIHB1cnBvc2VzXG5cdFx0XHQvL1x0XHRpZiAoc3ViRGVsdGEpIHsgc3ViRGVsdGEuYXBwbHlUbyhmaWVsZCkgfVxuXHRcdFx0Ly9cdH0pO1xuXHRcdFx0Ly99LCB7XG5cdFx0XHQvL1xuXHRcdFx0Ly99KTtcblx0XHRcdC8vXG5cdFx0XHQvL1xuXHRcdFx0Ly8vKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdEZWx0YU1vZGVsJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0Ly8vLyB0byBjb21wb3NlIGRlbHRhIG1vZGVscywgd2Ugc2ltcGx5IGhhdmUgb25lIGFwcGx5IGFmdGVyIHRoZSBvdGhlclxuXHRcdFx0Ly8vLyB3aXRob3V0IGFueSBjb21wb3NhYmlsaXR5IGNoZWNrczsgaW4gdGhlIGZ1dHVyZSwgdGhpcyBtYXkgYmVjb21lIG1vcmUgY2xldmVyXG5cdFx0XHQvL3ZhciBvcmRlcmVkQnlTaW1wbGVEZWx0YU1vZGVsID0gKGQxLCBkMikgPT4ge1xuXHRcdFx0Ly9cdHZhciBncmFwaCA9IG5ldyBKc0dyYXBoKCk7XG5cdFx0XHQvL1x0Z3JhcGguYWRkTmV3VmVydGV4KDEsIGQxKTtcblx0XHRcdC8vXHRncmFwaC5hZGROZXdWZXJ0ZXgoMiwgZDIpO1xuXHRcdFx0Ly9cdGdyYXBoLmFkZE5ld0VkZ2UoMSwgMik7XG5cdFx0XHQvL1x0cmV0dXJuIG5ldyBkZWx0YUpzLm9wZXJhdGlvbnMuRGVsdGFNb2RlbChncmFwaCk7XG5cdFx0XHQvL307XG5cdFx0XHQvL3RoaXMubmV3Q29tcG9zaXRpb24oZCgnTW9kaWZ5JywgICAgICAnRGVsdGFNb2RlbCcpLCBvcmRlcmVkQnlTaW1wbGVEZWx0YU1vZGVsKTtcblx0XHRcdC8vdGhpcy5uZXdDb21wb3NpdGlvbihkKCdBZGQnLCAgICAgICAgICdEZWx0YU1vZGVsJyksIG9yZGVyZWRCeVNpbXBsZURlbHRhTW9kZWwpO1xuXHRcdFx0Ly90aGlzLm5ld0NvbXBvc2l0aW9uKGQoJ1JlbW92ZScsICAgICAgJ0RlbHRhTW9kZWwnKSwgb3JkZXJlZEJ5U2ltcGxlRGVsdGFNb2RlbCk7XG5cdFx0XHQvL3RoaXMubmV3Q29tcG9zaXRpb24oZCgnRm9yYmlkJywgICAgICAnRGVsdGFNb2RlbCcpLCBvcmRlcmVkQnlTaW1wbGVEZWx0YU1vZGVsKTtcblx0XHRcdC8vdGhpcy5uZXdDb21wb3NpdGlvbihkKCdSZXBsYWNlJywgICAgICdEZWx0YU1vZGVsJyksIG9yZGVyZWRCeVNpbXBsZURlbHRhTW9kZWwpO1xuXHRcdFx0Ly90aGlzLm5ld0NvbXBvc2l0aW9uKGQoJ0RlbHRhTW9kZWwnLCAgJ01vZGlmeScpLCAgICAgb3JkZXJlZEJ5U2ltcGxlRGVsdGFNb2RlbCk7XG5cdFx0XHQvL3RoaXMubmV3Q29tcG9zaXRpb24oZCgnRGVsdGFNb2RlbCcsICAnQWRkJyksICAgICAgICBvcmRlcmVkQnlTaW1wbGVEZWx0YU1vZGVsKTtcblx0XHRcdC8vdGhpcy5uZXdDb21wb3NpdGlvbihkKCdEZWx0YU1vZGVsJywgICdSZW1vdmUnKSwgICAgIG9yZGVyZWRCeVNpbXBsZURlbHRhTW9kZWwpO1xuXHRcdFx0Ly90aGlzLm5ld0NvbXBvc2l0aW9uKGQoJ0RlbHRhTW9kZWwnLCAgJ0ZvcmJpZCcpLCAgICAgb3JkZXJlZEJ5U2ltcGxlRGVsdGFNb2RlbCk7XG5cdFx0XHQvL3RoaXMubmV3Q29tcG9zaXRpb24oZCgnRGVsdGFNb2RlbCcsICAnUmVwbGFjZScpLCAgICBvcmRlcmVkQnlTaW1wbGVEZWx0YU1vZGVsKTtcblx0XHRcdC8vdGhpcy5uZXdDb21wb3NpdGlvbihkKCdEZWx0YU1vZGVsJywgICdEZWx0YU1vZGVsJyksIG9yZGVyZWRCeVNpbXBsZURlbHRhTW9kZWwpO1xuXG5cdFx0fVxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdH0pO1xuXG5cblx0LyogdGhlIFdyaXRhYmxlRmllbGQgY2xhc3MgKi9cblx0RGVsdGFKcy5Xcml0YWJsZUZpZWxkID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAob2JqLCBwcm9wKSB7XG5cdFx0dGhpcy5vYmogID0gb2JqO1xuXHRcdHRoaXMucHJvcCA9IHByb3A7XG5cdH0sIHtcblx0XHRnZXQgdmFsdWUoKSAgeyByZXR1cm4gdGhpcy5vYmpbdGhpcy5wcm9wXSB9LFxuXHRcdHNldCB2YWx1ZSh2KSB7IHRoaXMub2JqW3RoaXMucHJvcF0gPSB2IH0sXG5cdFx0ZGVsZXRlKCkgeyBkZWxldGUgdGhpcy5vYmpbdGhpcy5wcm9wXSB9XG5cdH0pO1xuXHRmdW5jdGlvbiB3ZihvYmosIHByb3ApIHsgcmV0dXJuIG5ldyBEZWx0YUpzLldyaXRhYmxlRmllbGQob2JqLCBwcm9wKSB9XG5cblxuXHQvKiBleHBvcnQgdGhlIG1haW4gY2xhc3MgKi9cblx0cmV0dXJuIERlbHRhSnM7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9kZWx0YS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJKc0dyYXBoXCIsXCJjb21tb25qczJcIjpcImpzLWdyYXBoXCIsXCJjb21tb25qc1wiOlwianMtZ3JhcGhcIixcImFtZFwiOlwianMtZ3JhcGhcIn1cbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoKCkgPT4ge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFUgPSB7XG5cblx0XHQvKiBjcmVhdGUgYSBuZXcgY2xhc3MsIGdpdmVuIGEgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZSAqL1xuXHRcdG5ld0NsYXNzKGNvbnN0cnVjdG9yLCBwcm90b3R5cGUgPSB7fSkge1xuXHRcdFx0dmFyIGNscyA9IGNvbnN0cnVjdG9yO1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvKiBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZSAqL1xuXHRcdG5ld1N1YmNsYXNzKHN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yTWFrZXIsIHByb3RvdHlwZSA9IHt9KSB7XG5cdFx0XHR2YXIgY2xzID0gY29uc3RydWN0b3JNYWtlcihzdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcik7XG5cdFx0XHRjbHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG5cdFx0XHRVLmV4dGVuZChjbHMucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cdFx0fSxcblxuXHRcdC8qICBleHRlbmQgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllcyAgICAgKi9cblx0XHQvKiAgb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnMgICovXG5cdFx0LyogIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdFx0XHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqMSwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBvYmoxO1xuXHRcdH0sXG5cblx0XHQvKiBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWQgd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVycyAqL1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIG5ld19vYmogPSBPYmplY3QuY3JlYXRlKENvbnN0cnVjdG9yRm4ucHJvdG90eXBlKTtcblx0XHRcdENvbnN0cnVjdG9yRm4uYXBwbHkobmV3X29iaiwgYXJncyk7XG5cdFx0XHRyZXR1cm4gbmV3X29iajtcblx0XHR9LFxuXG5cdFx0LyogYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYSBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlICovXG5cdFx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0XHR9LFxuXG5cdFx0LyogdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgICovXG5cdFx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0LyogdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYCkgKi9cblx0XHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0LyogcmVwZWF0IGEgc3RyaW5nIGEgZ2l2ZW4gbnVtYmVyIG9mIHRpbWVzICovXG5cdFx0cmVwZWF0KG5yLCBzdHIpIHsgcmV0dXJuIG5ldyBBcnJheShucisxKS5qb2luKHN0cikgfVxuXHR9O1xuXG5cdHJldHVybiBVO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9taXNjLmpzXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiZGVsdGEuanMifQ==