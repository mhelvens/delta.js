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
	      get type() {
	        return 'Modify';
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
	      compose: function(prop, otherDelta) {
	        var firstDelta = this.deltas[prop];
	        var arr = thisDeltaJs.compositions[firstDelta.type][otherDelta.type];
	        U.assert(arr.length > 0, ("No composition is defined between '" + firstDelta.type + "' and '" + otherDelta.type + "'."));
	        return arr[0](this, prop, otherDelta);
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
	        (new thisDeltaJs.operations[opType](arg, meta)).applyTo(wf(this.target, prop));
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
	        return (d2.applyTo(wf(d1, 'arg')), d1.arg);
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
	        return (d2.applyTo(wf(d1, 'arg')), d1.arg);
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
	      this.newComposition('Add', 'Put', d('Add', (function($__1) {
	        var $__2 = $__1,
	            d1 = $__2.d1,
	            d2 = $__2.d2;
	        return (d2.applyTo(wf(d1, 'arg')), d1.arg);
	      })));
	      this.newComposition('Remove', 'Put', error);
	      this.newComposition('Forbid', 'Put', error);
	      this.newComposition('Replace', 'Put', d('Replace', (function($__1) {
	        var $__2 = $__1,
	            d1 = $__2.d1,
	            d2 = $__2.d2;
	        return (d2.applyTo(wf(d1, 'arg')), d1.arg);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1YzZhYTYyZjI0N2U5MTg1MTI5MyIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvbWlzYy5qcyIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FBUSx1QkFBYSx3QkFBVSxDQUFHLDBDQUFVO0FBQzNDLGNBQVcsQ0FBQztBQU1SLGFBQU0sRUFBSSxXQUFVLENBQUMsUUFBUyxRQUFNLENBQUU7QUFJckMsbUJBQVUsRUFBSSxLQUFHLENBQUM7QUFJdEIsUUFBRyxXQUFXLEVBQUksR0FBQyxDQUFDO0FBQ3BCLFFBQUcsYUFBYSxFQUFJLEdBQUMsQ0FBQztBQUl0QixRQUFHLFdBQVcsTUFBTSxFQUFJLFdBQVUsQ0FBQyxTQUFVLEdBQUUsQ0FBRyxLQUFHLENBQUc7QUFDdkQsVUFBRyxJQUFJLEVBQUksSUFBRSxDQUFDO0FBQ2QsVUFBRyxLQUFLLEVBQUksS0FBRyxHQUFL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QUksR0FBRSxlQUFnQixDQUFDLEdBQUUsQ0FBQyxDQUFHO0FBQzVCLGtCQUFLLGVBQWdCLENBQUMsSUFBRyxDQUFHLElBQUUsQ0FBRyxPQUFLLHlCQUEwQixDQUFDLEdBQUUsQ0FBRyxJQUFFLENBQUMsQ0FBQyxDQUFDO1dBQzVFO0FBQUEsU0FDRDtBQUFBLE9BQ0QsRUFBQyxDQUFDO0FBQ0YsWUFBTyxLQUFHLENBQUM7S0FDWjtBQUdBLG9CQUFlLENBQWYsVUFBaUIsYUFBWSxDQUFHLEtBQUcsQ0FBRztBQUNqQyxpQkFBTSxFQUFJLE9BQUssT0FBUSxDQUFDLGFBQVksVUFBVSxDQUFDLENBQUM7QUFDcEQsbUJBQVksTUFBTyxDQUFDLE9BQU0sQ0FBRyxLQUFHLENBQUMsQ0FBQztBQUNsQyxZQUFPLFFBQU0sQ0FBQztLQUNmO0FBR0EsVUFBSyxDQUFMLFVBQU8sU0FBUSxDQUFHLFFBQU0sQ0FBRztBQUMxQixVQUFJLENBQUMsU0FBUSxDQUFHO0FBQUUsYUFBTSxJQUFJLE1BQUssQ0FBQyxPQUFNLEdBQUssbUJBQWlCLENBQUM7T0FBRTtBQUFBLEtBQ2xFO0FBR0EsZUFBVSxDQUFWLFVBQVksR0FBRSxDQUFHO0FBQUUsWUFBTyxPQUFPLElBQUUsSUFBTSxZQUFVO0tBQUU7QUFHckQsYUFBUSxDQUFSLFVBQVUsR0FBRSxDQUFHO0FBQUUsWUFBTyxPQUFPLElBQUUsSUFBTSxZQUFVO0tBQUU7QUFHbkQsVUFBSyxDQUFMLFVBQU8sRUFBQyxDQUFHLElBQUUsQ0FBRztBQUFFLFlBQU8sSUFBSSxNQUFLLENBQUMsRUFBQyxFQUFFLEdBQUMsS0FBTSxDQUFDLEdBQUUsQ0FBQztLQUFFO0FBQUEsR0FDcEQsQ0FBQztBQUVELFFBQU8sR0FBQztBQUNULHdKQUFFO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcy1ncmFwaFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcy1ncmFwaFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJEZWx0YUpzXCJdID0gZmFjdG9yeShyZXF1aXJlKFwianMtZ3JhcGhcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkRlbHRhSnNcIl0gPSBmYWN0b3J5KHJvb3RbXCJKc0dyYXBoXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNWM2YWE2MmYyNDdlOTE4NTEyOTNcbiAqKi8iLCJkZWZpbmUoWycuL21pc2MuanMnLCAnanMtZ3JhcGgnXSwgZnVuY3Rpb24gKFUvKiwgSnNHcmFwaCovKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdC8qKiB7QGNsYXNzIERlbHRhSnN9XG5cdCAqXG5cdCAqL1xuXHR2YXIgRGVsdGFKcyA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gRGVsdGFKcygpIHtcblxuXG5cdFx0LyogYWxpYXMgZm9yICd0aGlzJyAqL1xuXHRcdHZhciB0aGlzRGVsdGFKcyA9IHRoaXM7XG5cblxuXHRcdC8qIHRoZSB0aGluZ3MgaW5zdGFuY2VzIG9mICdEZWx0YUpzJyBrZWVwcyB0cmFjayBvZiAqL1xuXHRcdHRoaXMub3BlcmF0aW9ucyA9IHt9OyAgIC8vIHByb3BlcnR5IC0+IERlbHRhXG5cdFx0dGhpcy5jb21wb3NpdGlvbnMgPSB7fTsgLy8gdHlwZTEgLT4gdHlwZTIgLT4gW2NvbXBvc2VGbl1cblxuXG5cdFx0LyogZGVmaW5lIHRoZSBiYXNlICdEZWx0YScgY2xhc3MgKi8vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKERlbHRhKVxuXHRcdHRoaXMub3BlcmF0aW9ucy5EZWx0YSA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKGFyZywgbWV0YSkge1xuXHRcdFx0dGhpcy5hcmcgPSBhcmc7XG5cdFx0XHR0aGlzLm1ldGEgPSBtZXRhIHx8IHt9O1xuXHRcdH0sIHtcblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0gaW5kZW50THZsIHtOdW1iZXI/fVxuXHRcdFx0ICogQHBhcmFtIHByb3AgICAgICB7U3RyaW5nP31cblx0XHRcdCAqL1xuXHRcdFx0dG9TdHJpbmcoaW5kZW50THZsID0gMCwgcHJvcCA9ICcocm9vdCknKSB7XG5cdFx0XHRcdHZhciBpbmRlbnQgPSBVLnJlcGVhdCgwICsgaW5kZW50THZsLCAnICAgICcpO1xuXHRcdFx0XHR2YXIgc3RyID0gYCR7aW5kZW50fSR7dGhpcy50eXBlfSAnJHtwcm9wfSdgO1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQodGhpcy5hcmcpKSB7XG5cdFx0XHRcdFx0c3RyICs9IGA6ICR7SlNPTi5zdHJpbmdpZnkodGhpcy5hcmcpLnNsaWNlKDEsIC0xKX1gO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh0aGlzLmRlbHRhcyAmJiBPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdHN0ciArPSAnXFxuJyArIE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKVxuXHRcdFx0XHRcdFx0XHQubWFwKChwKSA9PiB0aGlzLmRlbHRhc1twXS50b1N0cmluZyhpbmRlbnRMdmwgKyAxLCBwKSlcblx0XHRcdFx0XHRcdFx0LmpvaW4oJ1xcbicpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBzdHI7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0oL0RlbHRhKVxuXG5cblx0XHQvL3RoaXMub3ZlcmxvYWRzID0ge307IC8vIG1ldGhvZCAtPiBbZGVsdGEtY2xhc3Nlc11cblx0XHQvL1xuXHRcdC8vLyogZGVmaW5lIHRoZSAnT3ZlcmxvYWRlZERlbHRhJyBjbGFzcywgd2hpY2ggaW52b2tlcyBkZWx0YXMgYmFzZWQgb24gdGFyZ2V0IHByZWRpY2F0ZXMgKi8vLy0tLS0oT3ZlcmxvYWRlZERlbHRhKVxuXHRcdC8vdGhpcy5vcGVyYXRpb25zLk92ZXJsb2FkZWREZWx0YSA9IFUubmV3U3ViY2xhc3ModGhpcy5vcGVyYXRpb25zLkRlbHRhLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKGFyZywgbWV0YSkge1xuXHRcdC8vXHRzdXBlckZuLmNhbGwodGhpcywgYXJnLCBtZXRhKTtcblx0XHQvL30sIHtcblx0XHQvL1x0Z2V0IHR5cGUoKSB7IHJldHVybiB0aGlzLm92ZXJsb2Fkc1t0aGlzLm1ldGEubWV0aG9kXS5tYXAoKGNscykgPT4gY2xzLnR5cGUpLmpvaW4oJ3wnKSB9LFxuXHRcdC8vXG5cdFx0Ly9cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQvL1x0ICpcblx0XHQvL1x0ICogQHBhcmFtIGZpZWxkIHtXcml0YWJsZUZpZWxkfVxuXHRcdC8vXHQgKi9cblx0XHQvL1x0YXBwbHlUbyhmaWVsZCkge1xuXHRcdC8vXHRcdC8vIFRPRE9cblx0XHQvL1x0fSxcblx0XHQvL1xuXHRcdC8vXHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0Ly9cdCAqXG5cdFx0Ly9cdCAqIEBwYXJhbSBwcm9wICAgICAgIHtTdHJpbmd9XG5cdFx0Ly9cdCAqIEBwYXJhbSBvdGhlckRlbHRhIHtEZWx0YUpzI29wZXJhdGlvbnMuRGVsdGF9XG5cdFx0Ly9cdCAqL1xuXHRcdC8vXHRjb21wb3NlKHByb3AsIG90aGVyRGVsdGEpIHtcblx0XHQvL1x0XHQvLyBUT0RPXG5cdFx0Ly9cdH0sXG5cdFx0Ly9cblx0XHQvL30pO1xuXHRcdC8vLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSgvT3ZlcmxvYWRlZERlbHRhKVxuXG5cblx0XHQvKiBkZWZpbmUgdGhlIGZ1bmRhbWVudGFsICdNb2RpZnknIGRlbHRhICovLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLShNb2RpZnkpXG5cdFx0dGhpcy5vcGVyYXRpb25zLk1vZGlmeSA9IFUubmV3U3ViY2xhc3ModGhpcy5vcGVyYXRpb25zLkRlbHRhLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKGFyZywgbWV0YSkge1xuXHRcdFx0c3VwZXJGbi5jYWxsKHRoaXMsIGFyZywgbWV0YSk7XG5cdFx0XHR0aGlzLmRlbHRhcyA9IHt9O1xuXHRcdFx0Ly8gVE9ETzogYWxsb3cgb3BlcmF0aW9ucyB0byBiZSBhZGRlZCB0aHJvdWdoIGFuIG9wdGlvbmFsIGFyZ3VtZW50XG5cdFx0fSwge1xuXHRcdFx0Z2V0IHR5cGUoKSB7IHJldHVybiAnTW9kaWZ5JyB9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gZmllbGQge0RlbHRhSnMuV3JpdGFibGVGaWVsZH1cblx0XHRcdCAqL1xuXHRcdFx0YXBwbHlUbyhmaWVsZCkge1xuXHRcdFx0XHRVLmFzc2VydChmaWVsZC52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCxcblx0XHRcdFx0XHRcdGBUaGUgJ01vZGlmeScgb3BlcmF0aW9uIGV4cGVjdHMgdGhlIHByb3BlcnR5IHRvIGJlIGFuIGFscmVhZHkgZGVmaW5lZCBPYmplY3QuYCk7XG5cdFx0XHRcdE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5kZWx0YXNbcHJvcF0uYXBwbHlUbyh3ZihmaWVsZC52YWx1ZSwgcHJvcCkpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIEBwYXJhbSBvYmogIHtPYmplY3R9XG5cdFx0XHQgKi9cblx0XHRcdGFwcGx5VG9Qcm9wZXJ0aWVzT2Yob2JqKSB7XG5cdFx0XHRcdFUuYXNzZXJ0KG9iaiBpbnN0YW5jZW9mIE9iamVjdCxcblx0XHRcdFx0XHRcdGBUaGUgJ01vZGlmeScgb3BlcmF0aW9uIGV4cGVjdHMgdGhlIHByb3BlcnR5IHRvIGJlIGFuIGFscmVhZHkgZGVmaW5lZCBPYmplY3QuYCk7XG5cdFx0XHRcdE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5kZWx0YXNbcHJvcF0uYXBwbHlUbyh3ZihvYmosIHByb3ApKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHByb3AgICAgICAge1N0cmluZ31cblx0XHRcdCAqIEBwYXJhbSBvdGhlckRlbHRhIHtEZWx0YUpzI29wZXJhdGlvbnMuRGVsdGF9XG5cdFx0XHQgKi9cblx0XHRcdGNvbXBvc2UocHJvcCwgb3RoZXJEZWx0YSkge1xuXHRcdFx0XHR2YXIgZmlyc3REZWx0YSA9IHRoaXMuZGVsdGFzW3Byb3BdO1xuXHRcdFx0XHR2YXIgYXJyID0gdGhpc0RlbHRhSnMuY29tcG9zaXRpb25zW2ZpcnN0RGVsdGEudHlwZV1bb3RoZXJEZWx0YS50eXBlXTtcblx0XHRcdFx0VS5hc3NlcnQoYXJyLmxlbmd0aCA+IDAsXG5cdFx0XHRcdFx0XHRgTm8gY29tcG9zaXRpb24gaXMgZGVmaW5lZCBiZXR3ZWVuICcke2ZpcnN0RGVsdGEudHlwZX0nIGFuZCAnJHtvdGhlckRlbHRhLnR5cGV9Jy5gKTtcblx0XHRcdFx0cmV0dXJuIGFyclswXSh0aGlzLCBwcm9wLCBvdGhlckRlbHRhKTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0gcGF0aCB7U3RyaW5nfVxuXHRcdFx0ICovXG5cdFx0XHRtb2RpZnkocGF0aCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fYWRkT3BlcmF0aW9uKCdNb2RpZnknLCBwYXRoKTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIG9wVHlwZSB7U3RyaW5nfVxuXHRcdFx0ICogQHBhcmFtIHBhdGggICB7U3RyaW5nfVxuXHRcdFx0ICogQHBhcmFtIGFyZyAgICB7Kn1cblx0XHRcdCAqIEBwYXJhbSBtZXRhICAge09iamVjdH0gLSBtZXRhIGluZm9ybWF0aW9uIGFib3V0IHRoZSBvcGVyYXRpb25cblx0XHRcdCAqIEByZXR1cm4ge3twcm9wOiBTdHJpbmcsIHJlc3VsdDogRGVsdGFKcyNvcGVyYXRpb25zLm1vZGlmeX19IC0gdGhlIGRlZXBlc3QgJ01vZGlmeScgZGVsdGEgaW52b2x2ZWQgaW4gdGhpcyBtZXRob2QtY2FsbFxuXHRcdFx0ICovXG5cdFx0XHRfcHJlUHJvY2Vzc05ld09wZXJhdGlvbihvcFR5cGUsIHBhdGgsIGFyZywgbWV0YSkge1xuXG5cdFx0XHRcdC8qIGRpc3NlY3QgdGhlICdwYXRoJyBzdHJpbmcgKi9cblx0XHRcdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vICAxMTExMSAgMjIyMjIyMjIyMjIgIDMzICAvL1xuXHRcdFx0XHR2YXIgbWF0Y2ggPSBwYXRoLm1hdGNoKC9eKFsuI10/KShcXHcrfFxcKFxcdytcXCkpKC4qKSQvKTtcblx0XHRcdFx0VS5hc3NlcnQobWF0Y2gsIGBUaGUgcGF0aCBzdHJpbmcgJyR7cGF0aH0nIGlzIG5vdCB3ZWxsIGZvcm1lZC5gKTtcblx0XHRcdFx0dmFyIFssIGxlYWQsIHByb3AsIHJlc3RdID0gbWF0Y2g7XG5cdFx0XHRcdHZhciByZXN1bHQgPSBudWxsO1xuXG5cdFx0XHRcdGlmIChsZWFkID09PSAnIycpIHtcblx0XHRcdFx0XHQvKiBpZiAncGF0aCcgaGFzIGEgbGVhZGluZyAnIycgY2hhcmFjdGVyLCB0cmFuc2Zvcm0gaXQgYW5kIHJlY2FsbCB0aGlzIG1ldGhvZCAqL1xuXHRcdFx0XHRcdC8vIHRoZSAjIHNlcGFyYXRvciBleHBlY3RzIHRoZSBjdXJyZW50IG9iamVjdCB0byBiZSBhIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLFxuXHRcdFx0XHRcdC8vIGFuZCB5aWVsZHMgYSBkZWx0YSB0byBtb2RpZnkgbmV3IGluc3RhbmNlcyBvZiB0aGUgY29ycmVzcG9uZGluZyBjbGFzc1xuXHRcdFx0XHRcdHJlc3VsdCA9IHRoaXMuX2FkZE9wZXJhdGlvbihvcFR5cGUsIGAuKGluc3RhbmNlKS4ke3Byb3B9JHtyZXN0fWAsIGFyZywgbWV0YSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAocmVzdC5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0LyogaWYgdGhlcmUgaXMgYSBsb25nZXIgY2hhaW4sIGNhbGwgdGhpcyBtZXRob2QgcmVjdXJzaXZlbHkgKi9cblx0XHRcdFx0XHQvLyByZWN1cnNlLi4uLmluZGlyZWN0bHkuLi5kaXJlY3RseVxuXHRcdFx0XHRcdHJlc3VsdCA9IHRoaXMubW9kaWZ5KHByb3ApLl9hZGRPcGVyYXRpb24ob3BUeXBlLCByZXN0LCBhcmcsIG1ldGEpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHtwcm9wLCByZXN1bHR9O1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0gb3BUeXBlIHtTdHJpbmd9XG5cdFx0XHQgKiBAcGFyYW0gcGF0aCAgIHtTdHJpbmd9XG5cdFx0XHQgKiBAcGFyYW0gYXJnICAgIHsqfVxuXHRcdFx0ICogQHBhcmFtIG1ldGEgICB7T2JqZWN0fSAtIG1ldGEgaW5mb3JtYXRpb24gYWJvdXQgdGhlIG9wZXJhdGlvblxuXHRcdFx0ICogQHJldHVybiB7RGVsdGFKcyNvcGVyYXRpb25zLm1vZGlmeX0gLSB0aGUgZGVlcGVzdCAnTW9kaWZ5JyBkZWx0YSBpbnZvbHZlZCBpbiB0aGlzIG1ldGhvZC1jYWxsXG5cdFx0XHQgKi9cblx0XHRcdF9hZGRPcGVyYXRpb24ob3BUeXBlLCBwYXRoLCBhcmcsIG1ldGEpIHtcblxuXHRcdFx0XHQvKiBwcmUtcHJvY2VzcyB0aGUgYXJndW1lbnRzLCBwb3NzaWJseSBhbHJlYWR5IGdldCB0aGUgcmVzdWx0IGJ5IGRlbGVnYXRpb24gKi9cblx0XHRcdFx0dmFyIHtwcm9wLCByZXN1bHR9ID0gdGhpcy5fcHJlUHJvY2Vzc05ld09wZXJhdGlvbihvcFR5cGUsIHBhdGgsIGFyZywgbWV0YSk7XG5cdFx0XHRcdGlmIChyZXN1bHQpIHsgcmV0dXJuIHJlc3VsdCB9XG5cblx0XHRcdFx0LyogYXQgdGhpcyBwb2ludCwgd2UgY29uc3RydWN0IHRoZSBuZXcgZGVsdGEgKi9cblx0XHRcdFx0dmFyIG5ld0RlbHRhID0gbmV3IHRoaXNEZWx0YUpzLm9wZXJhdGlvbnNbb3BUeXBlXShhcmcsIG1ldGEpO1xuXG5cdFx0XHRcdC8qIGRvIHdlIG5lZWQgdG8gY29tcG9zZSB0aGUgbmV3IGRlbHRhIHdpdGggYW4gZXhpc3Rpbmcgb25lPyAqL1xuXHRcdFx0XHRpZiAodGhpcy5kZWx0YXNbcHJvcF0pIHtcblx0XHRcdFx0XHR2YXIgY29tcG9zaXRpb24gPSB0aGlzLmRlbHRhc1twcm9wXSA9IHRoaXMuY29tcG9zZShwcm9wLCBuZXdEZWx0YSk7XG5cblx0XHRcdFx0XHQvKiAgaWYgdGhlIHJlc3VsdCBzaG91bGQgYmUgYSAnTW9kaWZ5JyB0byBhY2NvbW1vZGF0ZSBmdXJ0aGVyIG9wZXJhdGlvbnMsICAgICAgICAgICAqL1xuXHRcdFx0XHRcdC8qICBidXQgdGhlIGNvbXBvc2l0aW9uIGlzbid0LCByZXR1cm4gYSAnTW9kaWZ5JyB0YXJnZXRlZCBhdCB0aGUgY29tcG9zaXRpb24gdmFsdWUgICovXG5cdFx0XHRcdFx0aWYgKG9wVHlwZSA9PT0gJ01vZGlmeScgJiYgY29tcG9zaXRpb24udHlwZSAhPT0gJ01vZGlmeScpIHtcblx0XHRcdFx0XHRcdHJldHVybiBuZXcgdGhpc0RlbHRhSnMub3BlcmF0aW9ucy5UYXJnZXRlZE1vZGlmeShjb21wb3NpdGlvbi5hcmcsIG1ldGEpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiBjb21wb3NpdGlvbi50eXBlID09PSAnTW9kaWZ5JyA/IGNvbXBvc2l0aW9uIDogdGhpcztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qIHRoZXJlIHdhcyBubyBvcGVyYXRpb24gb24gdGhhdCBwcm9wZXJ0eSB5ZXQ7IGFkZCBpdCAqL1xuXHRcdFx0XHR0aGlzLmRlbHRhc1twcm9wXSA9IG5ld0RlbHRhO1xuXHRcdFx0XHRyZXR1cm4gbmV3RGVsdGEudHlwZSA9PT0gJ01vZGlmeScgPyBuZXdEZWx0YSA6IHRoaXM7XG5cblx0XHRcdH1cblx0XHR9KTtcblx0XHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKC9Nb2RpZnkpXG5cblxuXHRcdC8vIEluIG9yZGVyIHRvIHByb2Nlc3MgZGVsdGEgY29tcG9zaXRpb25zIGxpa2Vcblx0XHQvLyAgICAgZGVsdGEuYWRkKCdvYmonLCB7fSk7XG5cdFx0Ly8gICAgIGRlbHRhLm1vZGlmeSgnb2JqJyk7XG5cdFx0Ly8gYW5kIHN0aWxsIHJldHVybiAnTW9kaWZ5JyBkZWx0YXMgdG8gdGhlIHVzZXIgZm9yIGZ1cnRoZXIgb3BlcmF0aW9ucyxcblx0XHQvLyB3ZSBuZWVkIHRlbXBvcmFyeSAnTW9kaWZ5JyBkZWx0YXMgdGhhdCByZW1lbWJlciB0aGVpciB0YXJnZXQsIHdoaWNoXG5cdFx0Ly8gd2Ugd2lsbCBjYWxsICd0YXJnZXRlZCBkZWx0YXMnLlxuXG5cdFx0LyogZGVmaW5lIHRoZSAnVGFyZ2V0ZWRNb2RpZnknIGRlbHRhIHN1YmNsYXNzICovLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKHRhcmdldGVkTW9kaWZ5KVxuXHRcdHRoaXMub3BlcmF0aW9ucy5UYXJnZXRlZE1vZGlmeSA9IFUubmV3U3ViY2xhc3ModGhpcy5vcGVyYXRpb25zLk1vZGlmeSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uICh0YXJnZXQsIGFyZywgbWV0YSkge1xuXHRcdFx0c3VwZXJGbi5jYWxsKHRoaXMsIGFyZywgbWV0YSk7XG5cdFx0XHR0aGlzLnRhcmdldCA9IHRhcmdldDtcblx0XHR9LCB7XG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIFRhcmdldGVkIGRlbHRhcyBjYW4ndCBiZSBhcHBsaWVkIFRPIGFueXRoaW5nLlxuXHRcdFx0ICogVGhpcyBtZXRob2QgaXMgb3ZlcndyaXR0ZW4gdG8gYXZvaWQgbWlzdGFrZXMuXG5cdFx0XHQgKi9cblx0XHRcdGFwcGx5VG8oKSB7IHRocm93IG5ldyBFcnJvcihgVGFyZ2V0ZWRNb2RpZnkgZGVsdGFzIGNhbm5vdCBiZSBhcHBsaWVkIFRPIGFueXRoaW5nLmApIH0sXG5cblx0XHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIG9wVHlwZSB7U3RyaW5nfVxuXHRcdFx0ICogQHBhcmFtIHBhdGggICB7U3RyaW5nfVxuXHRcdFx0ICogQHBhcmFtIGFyZyAgICB7Kn1cblx0XHRcdCAqIEBwYXJhbSBtZXRhICAge09iamVjdH0gLSBtZXRhIGluZm9ybWF0aW9uIGFib3V0IHRoZSBvcGVyYXRpb25cblx0XHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjb3BlcmF0aW9ucy5tb2RpZnl9IC0gdGhlIGRlZXBlc3QgJ01vZGlmeScgZGVsdGEgaW52b2x2ZWQgaW4gdGhpcyBtZXRob2QtY2FsbFxuXHRcdFx0ICovXG5cdFx0XHRfYWRkT3BlcmF0aW9uKG9wVHlwZSwgcGF0aCwgYXJnLCBtZXRhKSB7XG5cdFx0XHRcdC8qIHByZS1wcm9jZXNzIHRoZSBhcmd1bWVudHMsIHBvc3NpYmx5IGFscmVhZHkgZ2V0IHRoZSByZXN1bHQgYnkgZGVsZWdhdGlvbiAqL1xuXHRcdFx0XHR2YXIge3Byb3AsIHJlc3VsdH0gPSB0aGlzLl9wcmVQcm9jZXNzTmV3T3BlcmF0aW9uKG9wVHlwZSwgcGF0aCwgYXJnLCBtZXRhKTtcblx0XHRcdFx0aWYgKHJlc3VsdCkgeyByZXR1cm4gcmVzdWx0IH1cblxuXHRcdFx0XHQvKiBpZiB0aGUgbmV3IGRlbHRhIHNob3VsZCBiZSBhICdNb2RpZnknIGRlbHRhLCBpdCBpcyBhIHRhcmdldGVkIGRlbHRhICovXG5cdFx0XHRcdGlmIChvcFR5cGUgPT09ICdNb2RpZnknKSB7XG5cdFx0XHRcdFx0dmFyIG5ld0RlbHRhID0gbmV3IHRoaXNEZWx0YUpzLm9wZXJhdGlvbnMuVGFyZ2V0ZWRNb2RpZnkoYXJnLCBtZXRhKTtcblx0XHRcdFx0XHRuZXdEZWx0YS50YXJnZXQgPSB0aGlzLnRhcmdldFtwcm9wXTtcblx0XHRcdFx0XHRyZXR1cm4gbmV3RGVsdGE7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiBhcHBseSB0aGUgbmV3IGRlbHRhIHRvIGl0cyB0YXJnZXQsIGRpc2NhcmQgaXQgYW5kIHJldHVybiAndGhpcycgZGVsdGEgKi9cblx0XHRcdFx0KG5ldyB0aGlzRGVsdGFKcy5vcGVyYXRpb25zW29wVHlwZV0oYXJnLCBtZXRhKSkuYXBwbHlUbyh3Zih0aGlzLnRhcmdldCwgcHJvcCkpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblxuXHRcdH0pO1xuXHRcdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKC90YXJnZXRlZE1vZGlmeSlcblxuXG5cdFx0Lyogc2V0IHRoZSBmb3VuZGF0aW9uIG9mIHRoZSBjb21wb3NpdGlvbnMgYXJyYXkgKi9cblx0XHR0aGlzLmNvbXBvc2l0aW9uc1snTW9kaWZ5J10gPSB7ICdNb2RpZnknOiBbXSB9O1xuXG5cblx0XHQvKiBkZWZpbmUgc3RhbmRhcmQgb3BlcmF0aW9ucyAqL1xuXHRcdHRoaXMuX2RlZmluZU9iamVjdE9wZXJhdGlvblR5cGVzKCk7XG5cdFx0dGhpcy5fZGVmaW5lQXJyYXlPcGVyYXRpb25UeXBlcygpO1xuXHRcdHRoaXMuX2RlZmluZURlbHRhTW9kZWxPcGVyYXRpb25UeXBlKCk7XG5cblxuXHR9LCAvKiogQGxlbmRzIERlbHRhSnMucHJvdG90eXBlICovICB7XG5cblx0XHQvKioge0BwdWJsaWN9e0Bwcm9wZXJ0eX1cblx0XHQgKiBxdWljayBhY2Nlc3MgdG8gdGhlICdNb2RpZnknIGRlbHRhIGNvbnN0cnVjdG9yXG5cdFx0ICovXG5cdFx0Z2V0IERlbHRhKCkgeyByZXR1cm4gdGhpcy5vcGVyYXRpb25zLk1vZGlmeSB9LFxuXG5cdFx0Ly8vKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0Ly8gKlxuXHRcdC8vICovXG5cdFx0Ly92cCh2cE5hbWUsIHZhbCkge1xuXHRcdC8vXHQvLyBUT0RPXG5cdFx0Ly99LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIG5hbWUgICAge1N0cmluZ31cblx0XHQgKiBAcGFyYW0gYXBwbHlUbyB7KERlbHRhSnMuV3JpdGFibGVGaWVsZCkgPT4gdW5kZWZpbmVkfVxuXHRcdCAqL1xuXHRcdG5ld09wZXJhdGlvblR5cGUobmFtZSwge2NvbnN0cnVjdCwgYXBwbHlUbywgbWV0aG9kc30pIHtcblxuXHRcdFx0Lyogc2FuaXR5IGNoZWNrcyAqL1xuXHRcdFx0VS5hc3NlcnQoIXRoaXMub3BlcmF0aW9uc1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlICcke25hbWV9JyBvcGVyYXRpb24gdHlwZSBhbHJlYWR5IGV4aXN0cy5gKTtcblxuXHRcdFx0LyogY3JlYXRlIHRoZSBjb3JyZXNwb25kaW5nIG1ldGhvZChzKSBpbiB0aGUgJ01vZGlmeScgY2xhc3MgKi9cblx0XHRcdC8vIGlmIG5vIG1ldGhvZHMgYXJlIHByb3ZpZGVkLCB1c2UgdGhlIG9wZXJhdGlvbiBuYW1lIHN0YXJ0aW5nIHdpdGggYSBsb3dlcmNhc2UgbGV0dGVyXG5cdFx0XHRtZXRob2RzID0gbWV0aG9kcyB8fCBbIG5hbWVbMF0udG9Mb3dlckNhc2UoKStuYW1lLnNsaWNlKDEpIF07XG5cdFx0XHRtZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuXHRcdFx0XHR0aGlzLm9wZXJhdGlvbnMuTW9kaWZ5LnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKHByb3AsIGFyZykge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9hZGRPcGVyYXRpb24obmFtZSwgcHJvcCwgYXJnLCB7IG1ldGhvZCB9KTtcblx0XHRcdFx0fTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKiBwdXQgdGhlIHJpZ2h0IGZvdW5kYXRpb24gaW4gJ3RoaXMuY29tcG9zaXRpb24nICovXG5cdFx0XHR0aGlzLmNvbXBvc2l0aW9uc1tuYW1lXSA9IHt9O1xuXHRcdFx0T2JqZWN0LmtleXModGhpcy5jb21wb3NpdGlvbnMpLmZvckVhY2goKHR5cGUpID0+IHtcblx0XHRcdFx0VS5hc3NlcnQoIXRoaXMuY29tcG9zaXRpb25zW3R5cGVdW25hbWVdKTtcblx0XHRcdFx0VS5hc3NlcnQoIXRoaXMuY29tcG9zaXRpb25zW25hbWVdW3R5cGVdKTtcblx0XHRcdFx0dGhpcy5jb21wb3NpdGlvbnNbdHlwZV1bbmFtZV0gPSBbXTtcblx0XHRcdFx0dGhpcy5jb21wb3NpdGlvbnNbbmFtZV1bdHlwZV0gPSBbXTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKiBjcmVhdGUgdGhlIERlbHRhIHN1YmNsYXNzIHJlcHJlc2VudGluZyB0aGlzIG9wZXJhdGlvbiB0eXBlICovLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLShvdGhlcilcblx0XHRcdHRoaXMub3BlcmF0aW9uc1tuYW1lXSA9IFUubmV3U3ViY2xhc3ModGhpcy5vcGVyYXRpb25zLkRlbHRhLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKGFyZywgbWV0YSkge1xuXHRcdFx0XHRzdXBlckZuLmNhbGwodGhpcywgYXJnLCBtZXRhKTtcblx0XHRcdFx0aWYgKGNvbnN0cnVjdCkgeyBjb25zdHJ1Y3QuY2FsbCh0aGlzKSB9XG5cdFx0XHR9LCBVLmV4dGVuZCh7XG5cdFx0XHRcdHR5cGU6IG5hbWUsXG5cdFx0XHRcdGFwcGx5VG86IGFwcGx5VG9cblx0XHRcdH0pKTtcblx0XHRcdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0oL290aGVyKVxuXG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB0eXBlMSAgIHtTdHJpbmd9XG5cdFx0ICogQHBhcmFtIHR5cGUyICAge1N0cmluZ31cblx0XHQgKiBAcGFyYW0gY29tcG9zZSB7KERlbHRhSnMjb3BlcmF0aW9ucy5tb2RpZnksIFN0cmluZywgRGVsdGFKcyNvcGVyYXRpb25zLkRlbHRhKSA9PiB1bmRlZmluZWR9XG5cdFx0ICovXG5cdFx0bmV3Q29tcG9zaXRpb24odHlwZTEsIHR5cGUyLCBjb21wb3NlKSB7XG5cdFx0XHR0aGlzLmNvbXBvc2l0aW9uc1t0eXBlMV1bdHlwZTJdLnB1c2goY29tcG9zZSk7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0ICpcblx0XHQgKi9cblx0XHRfZGVmaW5lT2JqZWN0T3BlcmF0aW9uVHlwZXMoKSB7XG5cblx0XHRcdHZhciBkZWx0YUpzID0gdGhpcztcblxuXHRcdFx0Ly8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvXG5cblx0XHRcdC8qIGNvbnZlbmllbmNlIGRlZmluaXRpb25zIGZvciB0aGUgYXBwbGljYXRpb24gYW5kIGNvbXBvc2l0aW9uIGZ1bmN0aW9ucyBiZWxvdyAqL1xuXHRcdFx0dmFyIGVycm9yID0gKGQxLCBwLCBkMikgPT4geyB0aHJvdyBuZXcgRXJyb3IoYFlvdSBjYW5ub3QgZm9sbG93ICcke2QxW3BdLnR5cGV9JyB3aXRoICcke2QyLnR5cGV9Jy5gKSB9O1xuXG5cdFx0XHRmdW5jdGlvbiBkKHR5cGUsICBmbiA9ICgoKT0+bnVsbCkpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBmbiA9PT0gJ3N0cmluZycpIHsgZm4gPSAoKHYpID0+IChvKSA9PiBvW3ZdKShmbikgfVxuXHRcdFx0XHRyZXR1cm4gKGQxLCBwLCBkMikgPT4ge1xuXHRcdFx0XHRcdHZhciBhcmdzID0ge1xuXHRcdFx0XHRcdFx0ZDE6IGQxLmRlbHRhcyAmJiBkMS5kZWx0YXNbcF0sXG5cdFx0XHRcdFx0XHRkMjogZDIsXG5cdFx0XHRcdFx0XHRwMTogZDEuZGVsdGFzICYmIGQxLmRlbHRhc1twXSAmJiBkMS5kZWx0YXNbcF0uYXJnICYmIGQxLmRlbHRhc1twXS5hcmcsXG5cdFx0XHRcdFx0XHRwMjogZDIuYXJnXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRyZXR1cm4gbmV3IChkZWx0YUpzLm9wZXJhdGlvbnNbdHlwZV0pKGZuKGFyZ3MpKTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gYXNzZXJ0RGVmaW5lZCh2YWwsIG9wVHlwZSkge1xuXHRcdFx0XHRVLmFzc2VydChVLmlzRGVmaW5lZCh2YWwpLFxuXHRcdFx0XHRcdFx0YFRoZSBvcGVyYXRpb24gJyR7b3BUeXBlfScgZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgZGVmaW5lZC5gKTtcblx0XHRcdH1cblx0XHRcdGZ1bmN0aW9uIGFzc2VydFVuZGVmaW5lZCh2YWwsIG9wVHlwZSkge1xuXHRcdFx0XHRVLmFzc2VydChVLmlzVW5kZWZpbmVkKHZhbCksXG5cdFx0XHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnJHtvcFR5cGV9JyBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSB1bmRlZmluZWQuYCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gL1xuXG5cdFx0XHQvKiBkZWNsYXJpbmcgdGhlIGJhc2ljIG9wZXJhdGlvbiB0eXBlcyAqL1xuXHRcdFx0Ly8gJ01vZGlmeScgaXMgdGhlIG1vc3QgZnVuZGFtZW50YWwgb3BlcmF0aW9uLFxuXHRcdFx0Ly8gIGFuZCBpcyBkZWZpbmVkIGFib3ZlIHJhdGhlciB0aGFuIGhlcmVcblx0XHRcdHRoaXMubmV3T3BlcmF0aW9uVHlwZSgnQWRkJywge1xuXHRcdFx0XHRhcHBseVRvKGZpZWxkKSB7XG5cdFx0XHRcdFx0YXNzZXJ0VW5kZWZpbmVkKGZpZWxkLnZhbHVlLCAnQWRkJyk7XG5cdFx0XHRcdFx0ZmllbGQudmFsdWUgPSB0aGlzLmFyZztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLm5ld09wZXJhdGlvblR5cGUoJ1JlbW92ZScsIHtcblx0XHRcdFx0YXBwbHlUbyhmaWVsZCkge1xuXHRcdFx0XHRcdGFzc2VydERlZmluZWQoZmllbGQudmFsdWUsICdSZW1vdmUnKTtcblx0XHRcdFx0XHRmaWVsZC5kZWxldGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLm5ld09wZXJhdGlvblR5cGUoJ0ZvcmJpZCcsIHtcblx0XHRcdFx0YXBwbHlUbyhmaWVsZCkge1xuXHRcdFx0XHRcdGFzc2VydFVuZGVmaW5lZChmaWVsZC52YWx1ZSwgJ0ZvcmJpZCcpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHRoaXMubmV3T3BlcmF0aW9uVHlwZSgnUmVwbGFjZScsIHtcblx0XHRcdFx0YXBwbHlUbyhmaWVsZCkge1xuXHRcdFx0XHRcdGFzc2VydERlZmluZWQoZmllbGQudmFsdWUsICdSZXBsYWNlJyk7XG5cdFx0XHRcdFx0ZmllbGQudmFsdWUgPSB0aGlzLmFyZztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gL1xuXG5cdFx0XHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdNb2RpZnknICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignTW9kaWZ5JywgJ01vZGlmeScsIChkMSwgcCwgZDIpID0+IHtcblx0XHRcdFx0T2JqZWN0LmtleXMoZDIuZGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdFx0ZDEuY29tcG9zZShwLCBkMi5kZWx0YXNbcHJvcF0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIGQxLmRlbHRhc1twXTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdBZGQnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignTW9kaWZ5JywgJ0FkZCcgICAsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ0FkZCcgICAsICdBZGQnICAgLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdBZGQnICAgLCAnTW9kaWZ5JywgZCgnQWRkJywgKHtkMSwgZDJ9KSA9PiAoZDIuYXBwbHlUbyh3ZihkMSwgJ2FyZycpKSwgZDEuYXJnKSkpO1xuXG5cdFx0XHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdSZW1vdmUnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignTW9kaWZ5JywgJ1JlbW92ZScsIGQoJ1JlbW92ZScpKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ0FkZCcgICAsICdSZW1vdmUnLCBkKCdGb3JiaWQnKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdSZW1vdmUnLCAnTW9kaWZ5JywgZXJyb3IpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignUmVtb3ZlJywgJ0FkZCcgICAsIGQoJ1JlcGxhY2UnLCAncDInKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdSZW1vdmUnLCAnUmVtb3ZlJywgZXJyb3IpO1xuXG5cdFx0XHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdGb3JiaWQnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignTW9kaWZ5JywgJ0ZvcmJpZCcsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ0FkZCcgICAsICdGb3JiaWQnLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdSZW1vdmUnLCAnRm9yYmlkJywgZCgnUmVtb3ZlJykpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignRm9yYmlkJywgJ01vZGlmeScsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ0ZvcmJpZCcsICdBZGQnICAgLCBkKCdBZGQnLCAncDInKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdGb3JiaWQnLCAnUmVtb3ZlJywgZXJyb3IpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignRm9yYmlkJywgJ0ZvcmJpZCcsIGQoJ0ZvcmJpZCcpKTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUmVwbGFjZScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ01vZGlmeScgLCAnUmVwbGFjZScsIGQoJ1JlcGxhY2UnLCAncDInKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdBZGQnICAgICwgJ1JlcGxhY2UnLCBkKCdBZGQnLCAncDInKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdSZW1vdmUnICwgJ1JlcGxhY2UnLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdGb3JiaWQnICwgJ1JlcGxhY2UnLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdSZXBsYWNlJywgJ01vZGlmeScgLCBkKCdSZXBsYWNlJywgKHtkMSwgZDJ9KSA9PiAoZDIuYXBwbHlUbyh3ZihkMSwgJ2FyZycpKSwgZDEuYXJnKSkpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignUmVwbGFjZScsICdBZGQnICAgICwgZXJyb3IpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignUmVwbGFjZScsICdSZW1vdmUnICwgZCgnUmVtb3ZlJykpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignUmVwbGFjZScsICdGb3JiaWQnICwgZXJyb3IpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignUmVwbGFjZScsICdSZXBsYWNlJywgZCgnUmVwbGFjZScsICdwMicpKTtcblxuXHRcdH0sXG5cblx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdCAqXG5cdFx0ICovXG5cdFx0X2RlZmluZUFycmF5T3BlcmF0aW9uVHlwZXMoKSB7XG5cblx0XHRcdHZhciBkZWx0YUpzID0gdGhpcztcblxuXHRcdFx0Ly8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvXG5cblx0XHRcdC8qIGNvbnZlbmllbmNlIGRlZmluaXRpb25zIGZvciB0aGUgYXBwbGljYXRpb24gYW5kIGNvbXBvc2l0aW9uIGZ1bmN0aW9ucyBiZWxvdyAqL1xuXHRcdFx0dmFyIGVycm9yID0gKGQxLCBwLCBkMikgPT4geyB0aHJvdyBuZXcgRXJyb3IoYFlvdSBjYW5ub3QgZm9sbG93ICcke2QxW3BdLnR5cGV9JyB3aXRoICcke2QyLnR5cGV9Jy5gKSB9O1xuXG5cdFx0XHRmdW5jdGlvbiBkKHR5cGUsICBmbiA9ICgoKT0+bnVsbCkpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBmbiA9PT0gJ3N0cmluZycpIHsgZm4gPSAoKHYpID0+IChvKSA9PiBvW3ZdKShmbikgfVxuXHRcdFx0XHRyZXR1cm4gKGQxLCBwLCBkMikgPT4ge1xuXHRcdFx0XHRcdHZhciBhcmdzID0ge1xuXHRcdFx0XHRcdFx0ZDE6IGQxLmRlbHRhcyAmJiBkMS5kZWx0YXNbcF0sXG5cdFx0XHRcdFx0XHRkMjogZDIsXG5cdFx0XHRcdFx0XHRwMTogZDEuZGVsdGFzICYmIGQxLmRlbHRhc1twXSAmJiBkMS5kZWx0YXNbcF0uYXJnLFxuXHRcdFx0XHRcdFx0cDI6IGQyLmFyZ1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0cmV0dXJuIG5ldyAoZGVsdGFKcy5vcGVyYXRpb25zW3R5cGVdKShmbihhcmdzKSk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdGZ1bmN0aW9uIGFzc2VydERlZmluZWQodmFsLCBvcFR5cGUpIHtcblx0XHRcdFx0VS5hc3NlcnQoVS5pc0RlZmluZWQodmFsKSxcblx0XHRcdFx0XHRcdGBUaGUgb3BlcmF0aW9uICcke29wVHlwZX0nIGV4cGVjdHMgdGhlIHByb3BlcnR5IHRvIGJlIGRlZmluZWQuYCk7XG5cdFx0XHR9XG5cdFx0XHRmdW5jdGlvbiBhc3NlcnRBcnJheSh2YWwsIG9wVHlwZSkge1xuXHRcdFx0XHRVLmFzc2VydChBcnJheS5pc0FycmF5KHZhbCksXG5cdFx0XHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnJHtvcFR5cGV9JyBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBhbiBhcnJheS5gKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvXG5cblx0XHRcdC8qIGRlY2xhcmluZyB0aGUgYXJyYXkgb3BlcmF0aW9uIHR5cGVzICovXG5cdFx0XHR0aGlzLm5ld09wZXJhdGlvblR5cGUoJ1B1dCcsIHtcblx0XHRcdFx0Y29uc3RydWN0KCkge1xuXHRcdFx0XHRcdGlmICh0aGlzLm1ldGEubWV0aG9kKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnZhbHVlcyA9IFt7XG5cdFx0XHRcdFx0XHRcdG1ldGhvZDogdGhpcy5tZXRhLm1ldGhvZCxcblx0XHRcdFx0XHRcdFx0dmFsdWU6IHRoaXMuYXJnXG5cdFx0XHRcdFx0XHR9XTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpcy52YWx1ZXMgPSBbXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFwcGx5VG8oZmllbGQpIHtcblx0XHRcdFx0XHRhc3NlcnREZWZpbmVkKGZpZWxkLnZhbHVlLCAnUHV0Jyk7XG5cdFx0XHRcdFx0YXNzZXJ0QXJyYXkoZmllbGQudmFsdWUsICdQdXQnKTtcblx0XHRcdFx0XHR2YXIgYXJyID0gZmllbGQudmFsdWU7XG5cdFx0XHRcdFx0dGhpcy52YWx1ZXMuZm9yRWFjaCgoe21ldGhvZCwgdmFsdWV9KSA9PiB7XG5cdFx0XHRcdFx0XHRzd2l0Y2ggKG1ldGhvZCkge1xuXHRcdFx0XHRcdFx0XHRjYXNlICdwcmVwZW5kJzoge1xuXHRcdFx0XHRcdFx0XHRcdGFyci51bnNoaWZ0KHZhbHVlKTtcblx0XHRcdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0XHRcdFx0Y2FzZSAnaW5zZXJ0Jzoge1xuXHRcdFx0XHRcdFx0XHRcdC8vICdJbnNlcnQnIGRvZXNuJ3QgKmhhdmUqIHRvIHVzZSBhIHJhbmRvbSBwb3NpdGlvbi4gQW55IHBvc2l0aW9uIHdpbGwgZG8uXG5cdFx0XHRcdFx0XHRcdFx0Ly8gIE5vbmV0aGVsZXNzLCB3ZSB1c2UgYSByYW5kb20gcG9zaXRpb24gZm9yIHRlc3RpbmcgcHVycG9zZXMuXG5cdFx0XHRcdFx0XHRcdFx0dmFyIHBvc2l0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGFyci5sZW5ndGggKyAxKSk7XG5cdFx0XHRcdFx0XHRcdFx0YXJyLnNwbGljZShwb3NpdGlvbiwgMCwgdmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRjYXNlICdhcHBlbmQnOiB7XG5cdFx0XHRcdFx0XHRcdFx0YXJyLnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRtZXRob2RzOiBbJ3ByZXBlbmQnLCAnaW5zZXJ0JywgJ2FwcGVuZCddXG5cdFx0XHR9KTtcblxuXG5cdFx0XHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdSZXBsYWNlJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignTW9kaWZ5JyAsICdQdXQnICAgICwgZXJyb3IpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignQWRkJyAgICAsICdQdXQnICAgICwgZCgnQWRkJywgKHtkMSwgZDJ9KSA9PiAoZDIuYXBwbHlUbyh3ZihkMSwgJ2FyZycpKSwgZDEuYXJnKSkpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignUmVtb3ZlJyAsICdQdXQnICAgICwgZXJyb3IpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignRm9yYmlkJyAsICdQdXQnICAgICwgZXJyb3IpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignUmVwbGFjZScsICdQdXQnICAgICwgZCgnUmVwbGFjZScsICh7ZDEsIGQyfSkgPT4gKGQyLmFwcGx5VG8od2YoZDEsICdhcmcnKSksIGQxLmFyZykpKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1B1dCcgICAgLCAnTW9kaWZ5JyAsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1B1dCcgICAgLCAnQWRkJyAgICAsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1B1dCcgICAgLCAnUmVtb3ZlJyAsIGQoJ1JlbW92ZScpKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1B1dCcgICAgLCAnRm9yYmlkJyAsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1B1dCcgICAgLCAnUmVwbGFjZScsIGQoJ1JlcGxhY2UnLCAncDInKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdQdXQnICAgICwgJ1B1dCcgICAgLCAoZDEsIHAsIGQyKSA9PiB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSBuZXcgZGVsdGFKcy5vcGVyYXRpb25zLlB1dCgpO1xuXHRcdFx0XHRyZXN1bHQudmFsdWVzID0gKGQxLmRlbHRhc1twXS52YWx1ZXMpLmNvbmNhdChkMi52YWx1ZXMpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSk7XG5cblxuXG5cblx0XHR9LFxuXG5cdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHQgKlxuXHRcdCAqL1xuXHRcdF9kZWZpbmVEZWx0YU1vZGVsT3BlcmF0aW9uVHlwZSgpIHtcblxuXHRcdFx0Ly90aGlzLm5ld09wZXJhdGlvblR5cGUoJ0RlbHRhTW9kZWwnLCBmdW5jdGlvbiBhcHBseVRvKGZpZWxkKSB7XG5cdFx0XHQvL1x0dGhpcy5hcmcudG9wb2xvZ2ljYWxseSgoc3ViRGVsdGEpID0+IHtcblx0XHRcdC8vXHRcdC8vIHRoZSBncmFwaCBpcyBhbGxvd2VkIHRvIGNvbnRhaW4gJ251bGwnIHZlcnRpY2VzIGZvciBvcmRlcmluZyBwdXJwb3Nlc1xuXHRcdFx0Ly9cdFx0aWYgKHN1YkRlbHRhKSB7IHN1YkRlbHRhLmFwcGx5VG8oZmllbGQpIH1cblx0XHRcdC8vXHR9KTtcblx0XHRcdC8vfSwge1xuXHRcdFx0Ly9cblx0XHRcdC8vfSk7XG5cdFx0XHQvL1xuXHRcdFx0Ly9cblx0XHRcdC8vLyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnRGVsdGFNb2RlbCcgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdC8vLy8gdG8gY29tcG9zZSBkZWx0YSBtb2RlbHMsIHdlIHNpbXBseSBoYXZlIG9uZSBhcHBseSBhZnRlciB0aGUgb3RoZXJcblx0XHRcdC8vLy8gd2l0aG91dCBhbnkgY29tcG9zYWJpbGl0eSBjaGVja3M7IGluIHRoZSBmdXR1cmUsIHRoaXMgbWF5IGJlY29tZSBtb3JlIGNsZXZlclxuXHRcdFx0Ly92YXIgb3JkZXJlZEJ5U2ltcGxlRGVsdGFNb2RlbCA9IChkMSwgcCwgZDIpID0+IHtcblx0XHRcdC8vXHR2YXIgZ3JhcGggPSBuZXcgSnNHcmFwaCgpO1xuXHRcdFx0Ly9cdGdyYXBoLmFkZE5ld1ZlcnRleCgxLCBkMS5kZWx0YXNbcF0pO1xuXHRcdFx0Ly9cdGdyYXBoLmFkZE5ld1ZlcnRleCgyLCBkMik7XG5cdFx0XHQvL1x0Z3JhcGguYWRkTmV3RWRnZSgxLCAyKTtcblx0XHRcdC8vXHRyZXR1cm4gZDEuZGVsdGFzW3BdID0gbmV3IGRlbHRhSnMub3BlcmF0aW9ucy5EZWx0YU1vZGVsKGdyYXBoKTtcblx0XHRcdC8vfTtcblx0XHRcdC8vdGhpcy5uZXdDb21wb3NpdGlvbignTW9kaWZ5JywgICAgICdEZWx0YU1vZGVsJywgb3JkZXJlZEJ5U2ltcGxlRGVsdGFNb2RlbCk7XG5cdFx0XHQvL3RoaXMubmV3Q29tcG9zaXRpb24oJ0FkZCcsICAgICAgICAnRGVsdGFNb2RlbCcsIG9yZGVyZWRCeVNpbXBsZURlbHRhTW9kZWwpO1xuXHRcdFx0Ly90aGlzLm5ld0NvbXBvc2l0aW9uKCdSZW1vdmUnLCAgICAgJ0RlbHRhTW9kZWwnLCBvcmRlcmVkQnlTaW1wbGVEZWx0YU1vZGVsKTtcblx0XHRcdC8vdGhpcy5uZXdDb21wb3NpdGlvbignRm9yYmlkJywgICAgICdEZWx0YU1vZGVsJywgb3JkZXJlZEJ5U2ltcGxlRGVsdGFNb2RlbCk7XG5cdFx0XHQvL3RoaXMubmV3Q29tcG9zaXRpb24oJ1JlcGxhY2UnLCAgICAnRGVsdGFNb2RlbCcsIG9yZGVyZWRCeVNpbXBsZURlbHRhTW9kZWwpO1xuXHRcdFx0Ly90aGlzLm5ld0NvbXBvc2l0aW9uKCdEZWx0YU1vZGVsJywgJ01vZGlmeScsICAgICBvcmRlcmVkQnlTaW1wbGVEZWx0YU1vZGVsKTtcblx0XHRcdC8vdGhpcy5uZXdDb21wb3NpdGlvbignRGVsdGFNb2RlbCcsICdBZGQnLCAgICAgICAgb3JkZXJlZEJ5U2ltcGxlRGVsdGFNb2RlbCk7XG5cdFx0XHQvL3RoaXMubmV3Q29tcG9zaXRpb24oJ0RlbHRhTW9kZWwnLCAnUmVtb3ZlJywgICAgIG9yZGVyZWRCeVNpbXBsZURlbHRhTW9kZWwpO1xuXHRcdFx0Ly90aGlzLm5ld0NvbXBvc2l0aW9uKCdEZWx0YU1vZGVsJywgJ0ZvcmJpZCcsICAgICBvcmRlcmVkQnlTaW1wbGVEZWx0YU1vZGVsKTtcblx0XHRcdC8vdGhpcy5uZXdDb21wb3NpdGlvbignRGVsdGFNb2RlbCcsICdSZXBsYWNlJywgICAgb3JkZXJlZEJ5U2ltcGxlRGVsdGFNb2RlbCk7XG5cdFx0XHQvL3RoaXMubmV3Q29tcG9zaXRpb24oJ0RlbHRhTW9kZWwnLCAnRGVsdGFNb2RlbCcsIG9yZGVyZWRCeVNpbXBsZURlbHRhTW9kZWwpO1xuXG5cdFx0fVxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdH0pO1xuXG5cblx0RGVsdGFKcy5Xcml0YWJsZUZpZWxkID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAob2JqLCBwcm9wKSB7XG5cdFx0dGhpcy5vYmogID0gb2JqO1xuXHRcdHRoaXMucHJvcCA9IHByb3A7XG5cdH0sIHtcblx0XHRnZXQgdmFsdWUoKSAgeyByZXR1cm4gdGhpcy5vYmpbdGhpcy5wcm9wXSB9LFxuXHRcdHNldCB2YWx1ZSh2KSB7IHRoaXMub2JqW3RoaXMucHJvcF0gPSB2IH0sXG5cdFx0ZGVsZXRlKCkgeyBkZWxldGUgdGhpcy5vYmpbdGhpcy5wcm9wXSB9XG5cdH0pO1xuXHRmdW5jdGlvbiB3ZihvYmosIHByb3ApIHsgcmV0dXJuIG5ldyBEZWx0YUpzLldyaXRhYmxlRmllbGQob2JqLCBwcm9wKSB9XG5cblxuXG5cdHJldHVybiBEZWx0YUpzO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZGVsdGEuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKCgpID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXG5cdFx0LyogY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGUgKi9cblx0XHRuZXdDbGFzcyhjb25zdHJ1Y3RvciwgcHJvdG90eXBlID0ge30pIHtcblx0XHRcdHZhciBjbHMgPSBjb25zdHJ1Y3Rvcjtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0LyogY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGUgKi9cblx0XHRuZXdTdWJjbGFzcyhzdXBlckNsYXNzLCBjb25zdHJ1Y3Rvck1ha2VyLCBwcm90b3R5cGUgPSB7fSkge1xuXHRcdFx0dmFyIGNscyA9IGNvbnN0cnVjdG9yTWFrZXIoc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IpO1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuXHRcdFx0VS5leHRlbmQoY2xzLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvKiAgZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXMgICAgICovXG5cdFx0LyogIG9mIHRoZSBvdGhlciBvYmplY3RzLCBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5zICAqL1xuXHRcdC8qICB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdFx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb2JqMTtcblx0XHR9LFxuXG5cdFx0LyogYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkIHdpdGggYW4gYXJyYXkgb2YgZm9ybWFsIHBhcmFtZXRlcnMgKi9cblx0XHRhcHBseUNvbnN0cnVjdG9yKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcblx0XHRcdHZhciBuZXdfb2JqID0gT2JqZWN0LmNyZWF0ZShDb25zdHJ1Y3RvckZuLnByb3RvdHlwZSk7XG5cdFx0XHRDb25zdHJ1Y3RvckZuLmFwcGx5KG5ld19vYmosIGFyZ3MpO1xuXHRcdFx0cmV0dXJuIG5ld19vYmo7XG5cdFx0fSxcblxuXHRcdC8qIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGEgY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZSAqL1xuXHRcdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdFx0fSxcblxuXHRcdC8qIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYCAqL1xuXHRcdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8qIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApICovXG5cdFx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8qIHJlcGVhdCBhIHN0cmluZyBhIGdpdmVuIG51bWJlciBvZiB0aW1lcyAqL1xuXHRcdHJlcGVhdChuciwgc3RyKSB7IHJldHVybiBuZXcgQXJyYXkobnIrMSkuam9pbihzdHIpIH1cblx0fTtcblxuXHRyZXR1cm4gVTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWlzYy5qc1xuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImRlbHRhLmpzIn0=