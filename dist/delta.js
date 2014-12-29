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
	      _addOperation: function(opType, path, arg, meta) {
	        var match = path.match(/^([.#]?)(\w+|\(\w+\))(.*)$/);
	        U.assert(match, ("The path string '" + path + "' is not well formed."));
	        var $__1 = match,
	            lead = $__1[1],
	            prop = $__1[2],
	            rest = $__1[3];
	        if (lead === '#') {
	          return this._addOperation(opType, (".(instance)." + prop + rest), arg, meta);
	        }
	        if (rest.length > 0) {
	          return this.modify(prop)._addOperation(opType, rest, arg, meta);
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
	    }), {_addOperation: function(opType, prop, arg, meta) {
	        var match = prop.match(/^([.#]?)(\w+|\(\w+\))(.*)$/);
	        U.assert(match, ("The path string '" + prop + "' is not well formed."));
	        if (match[1] === '#') {
	          return this._addOperation(opType, (".(instance)." + match[2] + match[3]), arg, meta);
	        }
	        if (match[3].length > 0) {
	          return this.modify(match[2])._addOperation(opType, match[3], arg, meta);
	        }
	        if (opType === 'Modify') {
	          var newDelta = new thisDeltaJs.operations.TargetedModify(arg, meta);
	          newDelta.target = this.target[match[2]];
	          return newDelta;
	        }
	        (new thisDeltaJs.operations[opType](arg, meta)).applyTo(this.target, match[2]);
	        return this;
	      }});
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmM2E4MmViZjEyNDdmNDFjYTNlZCIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvbWlzYy5qcyIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FBUSx1QkFBYSx3QkFBVSxDQUFHLDBDQUFVO0FBQzNDLGNBQVcsQ0FBQztBQU1SLGFBQU0sRUFBSSxXQUFVLENBQUMsUUFBUyxRQUFNLENBQUU7QUFJckMsbUJBQVUsRUFBSSxLQUFHLENBQUM7QUFJdEIsUUFBRyxXQUFXLEVBQUksR0FBQyxDQUFDO0FBQ3BCLFFBQUcsYUFBYSxFQUFJLEdBQUMsQ0FBQztBQUl0QixRQUFHLFdBQVcsTUFBTSxFQUFJLFdBQVUsQ0FBQyxTQUFVLEdBQUUsQ0FBRyxLQUFHLENBQUc7QUFDdkQsVUFBRyxJQUFJLEVBQUksSUFBRSxDQUFDO0FBQ2QsVUFBRyxLQUFLLEVBQUksS0FBRyxHQUFL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RTtBQUFBLEdBQ3BELENBQUM7QUFFRCxRQUFPLEdBQUM7QUFDVCx3SkFBRTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianMtZ3JhcGhcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianMtZ3JhcGhcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRGVsdGFKc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEZWx0YUpzXCJdID0gZmFjdG9yeShyb290W1wiSnNHcmFwaFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGYzYTgyZWJmMTI0N2Y0MWNhM2VkXG4gKiovIiwiZGVmaW5lKFsnLi9taXNjLmpzJywgJ2pzLWdyYXBoJ10sIGZ1bmN0aW9uIChVLyosIEpzR3JhcGgqLykge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHQvKioge0BjbGFzcyBEZWx0YUpzfVxuXHQgKlxuXHQgKi9cblx0dmFyIERlbHRhSnMgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIERlbHRhSnMoKSB7XG5cblxuXHRcdC8qIGFsaWFzIGZvciAndGhpcycgKi9cblx0XHR2YXIgdGhpc0RlbHRhSnMgPSB0aGlzO1xuXG5cblx0XHQvKiB0aGUgdGhpbmdzIGluc3RhbmNlcyBvZiAnRGVsdGFKcycga2VlcHMgdHJhY2sgb2YgKi9cblx0XHR0aGlzLm9wZXJhdGlvbnMgPSB7fTsgICAvLyBwcm9wZXJ0eSAtPiBEZWx0YVxuXHRcdHRoaXMuY29tcG9zaXRpb25zID0ge307IC8vIHR5cGUxIC0+IHR5cGUyIC0+IFtjb21wb3NlRm5dXG5cblxuXHRcdC8qIGRlZmluZSB0aGUgYmFzZSAnRGVsdGEnIGNsYXNzICovLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLShEZWx0YSlcblx0XHR0aGlzLm9wZXJhdGlvbnMuRGVsdGEgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIChhcmcsIG1ldGEpIHtcblx0XHRcdHRoaXMuYXJnID0gYXJnO1xuXHRcdFx0dGhpcy5tZXRhID0gbWV0YSB8fCB7fTtcblx0XHR9LCB7XG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIGluZGVudEx2bCB7TnVtYmVyP31cblx0XHRcdCAqIEBwYXJhbSBwcm9wZXJ0eSAge1N0cmluZz99XG5cdFx0XHQgKi9cblx0XHRcdHRvU3RyaW5nKGluZGVudEx2bCA9IDAsIHByb3AgPSAnKHJvb3QpJykge1xuXHRcdFx0XHR2YXIgaW5kZW50ID0gVS5yZXBlYXQoMCArIGluZGVudEx2bCwgJyAgICAnKTtcblx0XHRcdFx0dmFyIHN0ciA9IGAke2luZGVudH0ke3RoaXMudHlwZX0gJyR7cHJvcH0nYDtcblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHRoaXMuYXJnKSkge1xuXHRcdFx0XHRcdHN0ciArPSBgOiAke0pTT04uc3RyaW5naWZ5KHRoaXMuYXJnKS5zbGljZSgxLCAtMSl9YDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodGhpcy5kZWx0YXMgJiYgT2JqZWN0LmtleXModGhpcy5kZWx0YXMpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRzdHIgKz0gJ1xcbicgKyBPYmplY3Qua2V5cyh0aGlzLmRlbHRhcylcblx0XHRcdFx0XHRcdFx0Lm1hcCgocCkgPT4gdGhpcy5kZWx0YXNbcF0udG9TdHJpbmcoaW5kZW50THZsICsgMSwgcCkpXG5cdFx0XHRcdFx0XHRcdC5qb2luKCdcXG4nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gc3RyO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKC9EZWx0YSlcblxuXG5cdFx0LyogZGVmaW5lIHRoZSBmdW5kYW1lbnRhbCAnTW9kaWZ5JyBkZWx0YSAqLy8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0obW9kaWZ5KVxuXHRcdHRoaXMub3BlcmF0aW9ucy5Nb2RpZnkgPSBVLm5ld1N1YmNsYXNzKHRoaXMub3BlcmF0aW9ucy5EZWx0YSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIChhcmcsIG1ldGEpIHtcblx0XHRcdHN1cGVyRm4uY2FsbCh0aGlzLCBhcmcsIG1ldGEpO1xuXHRcdFx0dGhpcy5kZWx0YXMgPSB7fTtcblx0XHRcdC8vIFRPRE86IGFsbG93IG9wZXJhdGlvbnMgdG8gYmUgYWRkZWQgdGhyb3VnaCBhbiBvcHRpb25hbCBhcmd1bWVudFxuXHRcdH0sIHtcblx0XHRcdHR5cGU6ICdNb2RpZnknLFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIG9iaiAge09iamVjdH1cblx0XHRcdCAqIEBwYXJhbSBwcm9wIHtTdHJpbmd9XG5cdFx0XHQgKi9cblx0XHRcdGFwcGx5VG8ob2JqLCBwcm9wKSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZChwcm9wKSkgeyBvYmogPSBvYmpbcHJvcF0gfVxuXHRcdFx0XHRVLmFzc2VydChvYmogaW5zdGFuY2VvZiBPYmplY3QsXG5cdFx0XHRcdFx0XHRgVGhlICdNb2RpZnknIG9wZXJhdGlvbiBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBhbiBhbHJlYWR5IGRlZmluZWQgT2JqZWN0LmApO1xuXHRcdFx0XHRPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykuZm9yRWFjaCgoc3ViUHJvcCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuZGVsdGFzW3N1YlByb3BdLmFwcGx5VG8ob2JqLCBzdWJQcm9wKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHByb3AgICAgICAge1N0cmluZ31cblx0XHRcdCAqIEBwYXJhbSBvdGhlckRlbHRhIHtEZWx0YUpzI29wZXJhdGlvbnMuRGVsdGF9XG5cdFx0XHQgKi9cblx0XHRcdGNvbXBvc2UocHJvcCwgb3RoZXJEZWx0YSkge1xuXHRcdFx0XHR2YXIgZmlyc3REZWx0YSA9IHRoaXMuZGVsdGFzW3Byb3BdO1xuXHRcdFx0XHR2YXIgYXJyID0gdGhpc0RlbHRhSnMuY29tcG9zaXRpb25zW2ZpcnN0RGVsdGEudHlwZV1bb3RoZXJEZWx0YS50eXBlXTtcblx0XHRcdFx0VS5hc3NlcnQoYXJyLmxlbmd0aCA+IDAsXG5cdFx0XHRcdFx0XHRgTm8gY29tcG9zaXRpb24gaXMgZGVmaW5lZCBiZXR3ZWVuICcke2ZpcnN0RGVsdGEudHlwZX0nIGFuZCAnJHtvdGhlckRlbHRhLnR5cGV9Jy5gKTtcblx0XHRcdFx0cmV0dXJuIGFyclswXSh0aGlzLCBwcm9wLCBvdGhlckRlbHRhKTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0gcHJvcCB7U3RyaW5nfVxuXHRcdFx0ICovXG5cdFx0XHRtb2RpZnkocHJvcCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fYWRkT3BlcmF0aW9uKCdNb2RpZnknLCBwcm9wKTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIG9wVHlwZSB7U3RyaW5nfVxuXHRcdFx0ICogQHBhcmFtIHByb3AgICB7U3RyaW5nfVxuXHRcdFx0ICogQHBhcmFtIGFyZyAgICB7Kn1cblx0XHRcdCAqIEBwYXJhbSBtZXRhICAge09iamVjdH0gLSBtZXRhIGluZm9ybWF0aW9uIGFib3V0IHRoZSBvcGVyYXRpb25cblx0XHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjb3BlcmF0aW9ucy5tb2RpZnl9IC0gdGhlIGRlZXBlc3QgJ01vZGlmeScgZGVsdGEgaW52b2x2ZWQgaW4gdGhpcyBtZXRob2QtY2FsbFxuXHRcdFx0ICovXG5cdFx0XHRfYWRkT3BlcmF0aW9uKG9wVHlwZSwgcGF0aCwgYXJnLCBtZXRhKSB7XG5cblx0XHRcdFx0LyogZGlzc2VjdCB0aGUgJ3BhdGgnIHN0cmluZyAqL1xuXHRcdFx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gIDExMTExICAyMjIyMjIyMjIyMiAgMzMgIC8vXG5cdFx0XHRcdHZhciBtYXRjaCA9IHBhdGgubWF0Y2goL14oWy4jXT8pKFxcdyt8XFwoXFx3K1xcKSkoLiopJC8pO1xuXHRcdFx0XHRVLmFzc2VydChtYXRjaCwgYFRoZSBwYXRoIHN0cmluZyAnJHtwYXRofScgaXMgbm90IHdlbGwgZm9ybWVkLmApO1xuXHRcdFx0XHR2YXIgWywgbGVhZCwgcHJvcCwgcmVzdF0gPSBtYXRjaDtcblxuXHRcdFx0XHQvKiBpZiAncGF0aCcgaGFzIGEgbGVhZGluZyAnIycgY2hhcmFjdGVyLCB0cmFuc2Zvcm0gaXQgYW5kIHJlY2FsbCB0aGlzIG1ldGhvZCAqL1xuXHRcdFx0XHRpZiAobGVhZCA9PT0gJyMnKSB7XG5cdFx0XHRcdFx0Ly8gdGhlICMgc2VwYXJhdG9yIGV4cGVjdHMgdGhlIGN1cnJlbnQgb2JqZWN0IHRvIGJlIGEgY29uc3RydWN0b3IgZnVuY3Rpb24sXG5cdFx0XHRcdFx0Ly8gYW5kIHlpZWxkcyBhIGRlbHRhIHRvIG1vZGlmeSBuZXcgaW5zdGFuY2VzIG9mIHRoZSBjb3JyZXNwb25kaW5nIGNsYXNzXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2FkZE9wZXJhdGlvbihvcFR5cGUsIGAuKGluc3RhbmNlKS4ke3Byb3B9JHtyZXN0fWAsIGFyZywgbWV0YSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiBpZiB0aGVyZSBpcyBhIGxvbmdlciBjaGFpbiwgY2FsbCB0aGlzIG1ldGhvZCByZWN1cnNpdmVseSAqL1xuXHRcdFx0XHRpZiAocmVzdC5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0Ly8gcmVjdXJzZS4uaW5kaXJlY3RseS4uLi4uLi5kaXJlY3RseVxuXHRcdFx0XHRcdHJldHVybiB0aGlzLm1vZGlmeShwcm9wKS5fYWRkT3BlcmF0aW9uKG9wVHlwZSwgcmVzdCwgYXJnLCBtZXRhKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qIGF0IHRoaXMgcG9pbnQsIHdlIGNvbnN0cnVjdCB0aGUgbmV3IGRlbHRhICovXG5cdFx0XHRcdHZhciBuZXdEZWx0YSA9IG5ldyB0aGlzRGVsdGFKcy5vcGVyYXRpb25zW29wVHlwZV0oYXJnLCBtZXRhKTtcblxuXHRcdFx0XHQvKiBPSywgbm8gdGFyZ2V0ZWQgZGVsdGFzOyBkbyB3ZSBuZWVkIHRvIGNvbXBvc2UgdGhlIG5ldyBkZWx0YSB3aXRoIGFuIGV4aXN0aW5nIG9uZT8gKi9cblx0XHRcdFx0aWYgKHRoaXMuZGVsdGFzW3Byb3BdKSB7XG5cdFx0XHRcdFx0dmFyIGNvbXBvc2l0aW9uID0gdGhpcy5kZWx0YXNbcHJvcF0gPSB0aGlzLmNvbXBvc2UocHJvcCwgbmV3RGVsdGEpO1xuXG5cdFx0XHRcdFx0LyogIGlmIHRoZSByZXN1bHQgc2hvdWxkIGJlIGEgJ01vZGlmeScgdG8gYWNjb21tb2RhdGUgZnVydGhlciBvcGVyYXRpb25zLCAgICAgICAgICAgKi9cblx0XHRcdFx0XHQvKiAgYnV0IHRoZSBjb21wb3NpdGlvbiBpc24ndCwgcmV0dXJuIGEgJ01vZGlmeScgdGFyZ2V0ZWQgYXQgdGhlIGNvbXBvc2l0aW9uIHZhbHVlICAqL1xuXHRcdFx0XHRcdGlmIChvcFR5cGUgPT09ICdNb2RpZnknICYmIGNvbXBvc2l0aW9uLnR5cGUgIT09ICdNb2RpZnknKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbmV3IHRoaXNEZWx0YUpzLm9wZXJhdGlvbnMuVGFyZ2V0ZWRNb2RpZnkoY29tcG9zaXRpb24uYXJnLCBtZXRhKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gY29tcG9zaXRpb24udHlwZSA9PT0gJ01vZGlmeScgPyBjb21wb3NpdGlvbiA6IHRoaXM7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiB0aGVyZSB3YXMgbm8gb3BlcmF0aW9uIG9uIHRoYXQgcHJvcGVydHkgeWV0OyBhZGQgaXQgKi9cblx0XHRcdFx0dGhpcy5kZWx0YXNbcHJvcF0gPSBuZXdEZWx0YTtcblx0XHRcdFx0cmV0dXJuIG5ld0RlbHRhLnR5cGUgPT09ICdNb2RpZnknID8gbmV3RGVsdGEgOiB0aGlzO1xuXG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSgvbW9kaWZ5KVxuXG5cblx0XHQvLyBJbiBvcmRlciB0byBwcm9jZXNzIGRlbHRhIGNvbXBvc2l0aW9ucyBsaWtlXG5cdFx0Ly8gICAgIGRlbHRhLmFkZCgnb2JqJywge30pO1xuXHRcdC8vICAgICBkZWx0YS5tb2RpZnkoJ29iaicpO1xuXHRcdC8vIGFuZCBzdGlsbCByZXR1cm4gJ01vZGlmeScgZGVsdGFzIHRvIHRoZSB1c2VyIGZvciBmdXJ0aGVyIG9wZXJhdGlvbnMsXG5cdFx0Ly8gd2UgbmVlZCB0ZW1wb3JhcnkgJ01vZGlmeScgZGVsdGFzIHRoYXQgcmVtZW1iZXIgdGhlaXIgdGFyZ2V0LCB3aGljaFxuXHRcdC8vIHdlIHdpbGwgY2FsbCAndGFyZ2V0ZWQgZGVsdGFzJy5cblxuXHRcdC8qIGRlZmluZSB0aGUgJ1RhcmdldGVkTW9kaWZ5JyBkZWx0YSBzdWJjbGFzcyAqLy8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSh0YXJnZXRlZE1vZGlmeSlcblx0XHR0aGlzLm9wZXJhdGlvbnMuVGFyZ2V0ZWRNb2RpZnkgPSBVLm5ld1N1YmNsYXNzKHRoaXMub3BlcmF0aW9ucy5Nb2RpZnksIChzdXBlckZuKSA9PiBmdW5jdGlvbiAodGFyZ2V0LCBhcmcsIG1ldGEpIHtcblx0XHRcdHN1cGVyRm4uY2FsbCh0aGlzLCBhcmcsIG1ldGEpO1xuXHRcdFx0dGhpcy50YXJnZXQgPSB0YXJnZXQ7XG5cdFx0fSwge1xuXHRcdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0gb3BUeXBlIHtTdHJpbmd9XG5cdFx0XHQgKiBAcGFyYW0gcHJvcCAgIHtTdHJpbmd9XG5cdFx0XHQgKiBAcGFyYW0gYXJnICAgIHsqfVxuXHRcdFx0ICogQHBhcmFtIG1ldGEgICB7T2JqZWN0fSAtIG1ldGEgaW5mb3JtYXRpb24gYWJvdXQgdGhlIG9wZXJhdGlvblxuXHRcdFx0ICogQHJldHVybiB7RGVsdGFKcyNvcGVyYXRpb25zLm1vZGlmeX0gLSB0aGUgZGVlcGVzdCAnTW9kaWZ5JyBkZWx0YSBpbnZvbHZlZCBpbiB0aGlzIG1ldGhvZC1jYWxsXG5cdFx0XHQgKi9cblx0XHRcdF9hZGRPcGVyYXRpb24ob3BUeXBlLCBwcm9wLCBhcmcsIG1ldGEpIHtcblxuXHRcdFx0XHQvKiBkaXNzZWN0IHRoZSAncHJvcCcgc3RyaW5nICovXG5cdFx0XHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyAgMTExMTEgIDIyMjIyMjIyMjIyICAzMyAgLy9cblx0XHRcdFx0dmFyIG1hdGNoID0gcHJvcC5tYXRjaCgvXihbLiNdPykoXFx3K3xcXChcXHcrXFwpKSguKikkLyk7XG5cdFx0XHRcdFUuYXNzZXJ0KG1hdGNoLCBgVGhlIHBhdGggc3RyaW5nICcke3Byb3B9JyBpcyBub3Qgd2VsbCBmb3JtZWQuYCk7XG5cblx0XHRcdFx0LyogaWYgJ3Byb3AnIGhhcyBhIGxlYWRpbmcgJyMnIGNoYXJhY3RlciwgdHJhbnNmb3JtIGl0IGFuZCByZWNhbGwgdGhpcyBtZXRob2QgKi9cblx0XHRcdFx0aWYgKG1hdGNoWzFdID09PSAnIycpIHtcblx0XHRcdFx0XHQvLyB0aGUgIyBzZXBhcmF0b3IgZXhwZWN0cyB0aGUgY3VycmVudCBvYmplY3QgdG8gYmUgYSBjb25zdHJ1Y3RvciBmdW5jdGlvbixcblx0XHRcdFx0XHQvLyBhbmQgeWllbGRzIGEgZGVsdGEgdG8gbW9kaWZ5IG5ldyBpbnN0YW5jZXMgb2YgdGhlIGNvcnJlc3BvbmRpbmcgY2xhc3Ncblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fYWRkT3BlcmF0aW9uKG9wVHlwZSwgYC4oaW5zdGFuY2UpLiR7bWF0Y2hbMl19JHttYXRjaFszXX1gLCBhcmcsIG1ldGEpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyogaWYgdGhlcmUgaXMgYSBsb25nZXIgY2hhaW4sIGNhbGwgdGhpcyBtZXRob2QgcmVjdXJzaXZlbHkgKi9cblx0XHRcdFx0aWYgKG1hdGNoWzNdLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHQvLyByZWN1cnNlLi5baW5kaXJlY3RseV0uLi4uLltkaXJlY3RseV1cblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5tb2RpZnkobWF0Y2hbMl0pLl9hZGRPcGVyYXRpb24ob3BUeXBlLCBtYXRjaFszXSwgYXJnLCBtZXRhKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qIGlmIHRoZSBuZXcgZGVsdGEgc2hvdWxkIGJlIGEgJ01vZGlmeScgZGVsdGEsIGl0IGlzIGEgdGFyZ2V0ZWQgZGVsdGEgKi9cblx0XHRcdFx0aWYgKG9wVHlwZSA9PT0gJ01vZGlmeScpIHtcblx0XHRcdFx0XHR2YXIgbmV3RGVsdGEgPSBuZXcgdGhpc0RlbHRhSnMub3BlcmF0aW9ucy5UYXJnZXRlZE1vZGlmeShhcmcsIG1ldGEpO1xuXHRcdFx0XHRcdG5ld0RlbHRhLnRhcmdldCA9IHRoaXMudGFyZ2V0W21hdGNoWzJdXTtcblx0XHRcdFx0XHRyZXR1cm4gbmV3RGVsdGE7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiBhcHBseSB0aGUgbmV3IGRlbHRhIHRvIGl0cyB0YXJnZXQsIGRpc2NhcmQgaXQgYW5kIHJldHVybiAndGhpcycgZGVsdGEgKi9cblx0XHRcdFx0KG5ldyB0aGlzRGVsdGFKcy5vcGVyYXRpb25zW29wVHlwZV0oYXJnLCBtZXRhKSkuYXBwbHlUbyh0aGlzLnRhcmdldCwgbWF0Y2hbMl0pO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKC90YXJnZXRlZE1vZGlmeSlcblxuXG5cdFx0Lyogc2V0IHRoZSBmb3VuZGF0aW9uIG9mIHRoZSBjb21wb3NpdGlvbnMgYXJyYXkgKi9cblx0XHR0aGlzLmNvbXBvc2l0aW9uc1snTW9kaWZ5J10gPSB7ICdNb2RpZnknOiBbXSB9O1xuXG5cblx0XHQvKiBkZWZpbmUgc3RhbmRhcmQgb3BlcmF0aW9ucyAqL1xuXHRcdHRoaXMuX2RlZmluZU9iamVjdE9wZXJhdGlvblR5cGVzKCk7XG5cdFx0dGhpcy5fZGVmaW5lQXJyYXlPcGVyYXRpb25UeXBlcygpO1xuXHRcdHRoaXMuX2RlZmluZURlbHRhTW9kZWxPcGVyYXRpb25UeXBlKCk7XG5cblxuXHR9LCAvKiogQGxlbmRzIERlbHRhSnMucHJvdG90eXBlICovICB7XG5cblx0XHQvKioge0BwdWJsaWN9e0Bwcm9wZXJ0eX1cblx0XHQgKiBxdWljayBhY2Nlc3MgdG8gdGhlICdNb2RpZnknIGRlbHRhIGNvbnN0cnVjdG9yXG5cdFx0ICovXG5cdFx0Z2V0IERlbHRhKCkgeyByZXR1cm4gdGhpcy5vcGVyYXRpb25zLk1vZGlmeSB9LFxuXG5cdFx0Ly8vKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0Ly8gKlxuXHRcdC8vICovXG5cdFx0Ly92cCh2cE5hbWUsIHZhbCkge1xuXHRcdC8vXHQvLyBUT0RPXG5cdFx0Ly99LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIG5hbWUgICAge1N0cmluZ31cblx0XHQgKiBAcGFyYW0gYXBwbHlUbyB7KERlbHRhSnMjb3BlcmF0aW9ucy5EZWx0YSwgT2JqZWN0LCBTdHJpbmcpID0+IHVuZGVmaW5lZH1cblx0XHQgKi9cblx0XHRuZXdPcGVyYXRpb25UeXBlKG5hbWUsIHtjb25zdHJ1Y3QsIGFwcGx5VG8sIG1ldGhvZHN9KSB7XG5cblx0XHRcdC8qIHNhbml0eSBjaGVja3MgKi9cblx0XHRcdFUuYXNzZXJ0KCF0aGlzLm9wZXJhdGlvbnNbbmFtZV0sXG5cdFx0XHRcdFx0YFRoZSAnJHtuYW1lfScgb3BlcmF0aW9uIHR5cGUgYWxyZWFkeSBleGlzdHMuYCk7XG5cblx0XHRcdC8qIGNyZWF0ZSB0aGUgY29ycmVzcG9uZGluZyBtZXRob2QocykgaW4gdGhlICdNb2RpZnknIGNsYXNzICovXG5cdFx0XHQvLyBpZiBubyBtZXRob2RzIGFyZSBwcm92aWRlZCwgdXNlIHRoZSBvcGVyYXRpb24gbmFtZSBzdGFydGluZyB3aXRoIGEgbG93ZXJjYXNlIGxldHRlclxuXHRcdFx0bWV0aG9kcyA9IG1ldGhvZHMgfHwgWyBuYW1lWzBdLnRvTG93ZXJDYXNlKCkrbmFtZS5zbGljZSgxKSBdO1xuXHRcdFx0bWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHtcblx0XHRcdFx0dGhpcy5vcGVyYXRpb25zLk1vZGlmeS5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uIChwcm9wLCBhcmcpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fYWRkT3BlcmF0aW9uKG5hbWUsIHByb3AsIGFyZywgeyBtZXRob2QgfSk7XG5cdFx0XHRcdH07XG5cdFx0XHR9KTtcblxuXHRcdFx0LyogcHV0IHRoZSByaWdodCBmb3VuZGF0aW9uIGluICd0aGlzLmNvbXBvc2l0aW9uJyAqL1xuXHRcdFx0dGhpcy5jb21wb3NpdGlvbnNbbmFtZV0gPSB7fTtcblx0XHRcdE9iamVjdC5rZXlzKHRoaXMuY29tcG9zaXRpb25zKS5mb3JFYWNoKCh0eXBlKSA9PiB7XG5cdFx0XHRcdFUuYXNzZXJ0KCF0aGlzLmNvbXBvc2l0aW9uc1t0eXBlXVtuYW1lXSk7XG5cdFx0XHRcdFUuYXNzZXJ0KCF0aGlzLmNvbXBvc2l0aW9uc1tuYW1lXVt0eXBlXSk7XG5cdFx0XHRcdHRoaXMuY29tcG9zaXRpb25zW3R5cGVdW25hbWVdID0gW107XG5cdFx0XHRcdHRoaXMuY29tcG9zaXRpb25zW25hbWVdW3R5cGVdID0gW107XG5cdFx0XHR9KTtcblxuXHRcdFx0LyogY3JlYXRlIHRoZSBEZWx0YSBzdWJjbGFzcyByZXByZXNlbnRpbmcgdGhpcyBvcGVyYXRpb24gdHlwZSAqLy8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0ob3RoZXIpXG5cdFx0XHR0aGlzLm9wZXJhdGlvbnNbbmFtZV0gPSBVLm5ld1N1YmNsYXNzKHRoaXMub3BlcmF0aW9ucy5EZWx0YSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIChhcmcsIG1ldGEpIHtcblx0XHRcdFx0c3VwZXJGbi5jYWxsKHRoaXMsIGFyZywgbWV0YSk7XG5cdFx0XHRcdGlmIChjb25zdHJ1Y3QpIHsgY29uc3RydWN0LmNhbGwodGhpcykgfVxuXHRcdFx0fSwgVS5leHRlbmQoe1xuXHRcdFx0XHR0eXBlOiBuYW1lLFxuXHRcdFx0XHRhcHBseVRvOiBhcHBseVRvXG5cdFx0XHR9KSk7XG5cdFx0XHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKC9vdGhlcilcblxuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gdHlwZTEgICB7U3RyaW5nfVxuXHRcdCAqIEBwYXJhbSB0eXBlMiAgIHtTdHJpbmd9XG5cdFx0ICogQHBhcmFtIGNvbXBvc2UgeyhEZWx0YUpzI29wZXJhdGlvbnMubW9kaWZ5LCBTdHJpbmcsIERlbHRhSnMjb3BlcmF0aW9ucy5EZWx0YSkgPT4gdW5kZWZpbmVkfVxuXHRcdCAqL1xuXHRcdG5ld0NvbXBvc2l0aW9uKHR5cGUxLCB0eXBlMiwgY29tcG9zZSkge1xuXHRcdFx0dGhpcy5jb21wb3NpdGlvbnNbdHlwZTFdW3R5cGUyXS5wdXNoKGNvbXBvc2UpO1xuXHRcdH0sXG5cblx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdCAqXG5cdFx0ICovXG5cdFx0X2RlZmluZU9iamVjdE9wZXJhdGlvblR5cGVzKCkge1xuXG5cdFx0XHR2YXIgZGVsdGFKcyA9IHRoaXM7XG5cblx0XHRcdC8vIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gL1xuXG5cdFx0XHQvKiBjb252ZW5pZW5jZSBkZWZpbml0aW9ucyBmb3IgdGhlIGFwcGxpY2F0aW9uIGFuZCBjb21wb3NpdGlvbiBmdW5jdGlvbnMgYmVsb3cgKi9cblx0XHRcdHZhciBlcnJvciA9IChkMSwgcCwgZDIpID0+IHsgdGhyb3cgbmV3IEVycm9yKGBZb3UgY2Fubm90IGZvbGxvdyAnJHtkMVtwXS50eXBlfScgd2l0aCAnJHtkMi50eXBlfScuYCkgfTtcblxuXHRcdFx0ZnVuY3Rpb24gZCh0eXBlLCAgZm4gPSAoKCk9Pm51bGwpKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgZm4gPT09ICdzdHJpbmcnKSB7IGZuID0gKCh2KSA9PiAobykgPT4gb1t2XSkoZm4pIH1cblx0XHRcdFx0cmV0dXJuIChkMSwgcCwgZDIpID0+IHtcblx0XHRcdFx0XHR2YXIgYXJncyA9IHtcblx0XHRcdFx0XHRcdGQxOiBkMS5kZWx0YXMgJiYgZDEuZGVsdGFzW3BdLFxuXHRcdFx0XHRcdFx0ZDI6IGQyLFxuXHRcdFx0XHRcdFx0cDE6IGQxLmRlbHRhcyAmJiBkMS5kZWx0YXNbcF0gJiYgZDEuZGVsdGFzW3BdLmFyZyAmJiBkMS5kZWx0YXNbcF0uYXJnLFxuXHRcdFx0XHRcdFx0cDI6IGQyLmFyZ1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0cmV0dXJuIG5ldyAoZGVsdGFKcy5vcGVyYXRpb25zW3R5cGVdKShmbihhcmdzKSk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdGZ1bmN0aW9uIGFzc2VydERlZmluZWQodmFsLCBvcFR5cGUpIHtcblx0XHRcdFx0VS5hc3NlcnQoVS5pc0RlZmluZWQodmFsKSxcblx0XHRcdFx0XHRcdGBUaGUgb3BlcmF0aW9uICcke29wVHlwZX0nIGV4cGVjdHMgdGhlIHByb3BlcnR5IHRvIGJlIGRlZmluZWQuYCk7XG5cdFx0XHR9XG5cdFx0XHRmdW5jdGlvbiBhc3NlcnRVbmRlZmluZWQodmFsLCBvcFR5cGUpIHtcblx0XHRcdFx0VS5hc3NlcnQoVS5pc1VuZGVmaW5lZCh2YWwpLFxuXHRcdFx0XHRcdFx0YFRoZSBvcGVyYXRpb24gJyR7b3BUeXBlfScgZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgdW5kZWZpbmVkLmApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC9cblxuXHRcdFx0LyogZGVjbGFyaW5nIHRoZSBiYXNpYyBvcGVyYXRpb24gdHlwZXMgKi9cblx0XHRcdC8vICdNb2RpZnknIGlzIHRoZSBtb3N0IGZ1bmRhbWVudGFsIG9wZXJhdGlvbixcblx0XHRcdC8vICBhbmQgaXMgZGVmaW5lZCBhYm92ZSByYXRoZXIgdGhhbiBoZXJlXG5cdFx0XHR0aGlzLm5ld09wZXJhdGlvblR5cGUoJ0FkZCcsIHtcblx0XHRcdFx0YXBwbHlUbyhvYmosIHApIHtcblx0XHRcdFx0XHRhc3NlcnRVbmRlZmluZWQob2JqW3BdLCAnQWRkJyk7XG5cdFx0XHRcdFx0b2JqW3BdID0gdGhpcy5hcmc7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0dGhpcy5uZXdPcGVyYXRpb25UeXBlKCdSZW1vdmUnLCB7XG5cdFx0XHRcdGFwcGx5VG8ob2JqLCBwKSB7XG5cdFx0XHRcdFx0YXNzZXJ0RGVmaW5lZChvYmpbcF0sICdSZW1vdmUnKTtcblx0XHRcdFx0XHRkZWxldGUgb2JqW3BdO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHRoaXMubmV3T3BlcmF0aW9uVHlwZSgnRm9yYmlkJywge1xuXHRcdFx0XHRhcHBseVRvKG9iaiwgcCkge1xuXHRcdFx0XHRcdGFzc2VydFVuZGVmaW5lZChvYmpbcF0sICdGb3JiaWQnKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLm5ld09wZXJhdGlvblR5cGUoJ1JlcGxhY2UnLCB7XG5cdFx0XHRcdGFwcGx5VG8ob2JqLCBwKSB7XG5cdFx0XHRcdFx0YXNzZXJ0RGVmaW5lZChvYmpbcF0sICdSZXBsYWNlJyk7XG5cdFx0XHRcdFx0b2JqW3BdID0gdGhpcy5hcmc7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC9cblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnTW9kaWZ5JyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ01vZGlmeScsICdNb2RpZnknLCAoZDEsIHAsIGQyKSA9PiB7XG5cdFx0XHRcdE9iamVjdC5rZXlzKGQyLmRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHRcdGQxLmNvbXBvc2UocCwgZDIuZGVsdGFzW3Byb3BdKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiBkMS5kZWx0YXNbcF07XG5cdFx0XHR9KTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnQWRkJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ01vZGlmeScsICdBZGQnICAgLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdBZGQnICAgLCAnQWRkJyAgICwgZXJyb3IpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignQWRkJyAgICwgJ01vZGlmeScsIGQoJ0FkZCcsICh7ZDEsIGQyfSkgPT4gKGQyLmFwcGx5VG8oZDEsICdhcmcnKSwgZDEuYXJnKSkpO1xuXG5cdFx0XHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdSZW1vdmUnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignTW9kaWZ5JywgJ1JlbW92ZScsIGQoJ1JlbW92ZScpKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ0FkZCcgICAsICdSZW1vdmUnLCBkKCdGb3JiaWQnKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdSZW1vdmUnLCAnTW9kaWZ5JywgZXJyb3IpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignUmVtb3ZlJywgJ0FkZCcgICAsIGQoJ1JlcGxhY2UnLCAncDInKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdSZW1vdmUnLCAnUmVtb3ZlJywgZXJyb3IpO1xuXG5cdFx0XHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdGb3JiaWQnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignTW9kaWZ5JywgJ0ZvcmJpZCcsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ0FkZCcgICAsICdGb3JiaWQnLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdSZW1vdmUnLCAnRm9yYmlkJywgZCgnUmVtb3ZlJykpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignRm9yYmlkJywgJ01vZGlmeScsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ0ZvcmJpZCcsICdBZGQnICAgLCBkKCdBZGQnLCAncDInKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdGb3JiaWQnLCAnUmVtb3ZlJywgZXJyb3IpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignRm9yYmlkJywgJ0ZvcmJpZCcsIGQoJ0ZvcmJpZCcpKTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUmVwbGFjZScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ01vZGlmeScgLCAnUmVwbGFjZScsIGQoJ1JlcGxhY2UnLCAncDInKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdBZGQnICAgICwgJ1JlcGxhY2UnLCBkKCdBZGQnLCAncDInKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdSZW1vdmUnICwgJ1JlcGxhY2UnLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdGb3JiaWQnICwgJ1JlcGxhY2UnLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdSZXBsYWNlJywgJ01vZGlmeScgLCBkKCdSZXBsYWNlJywgKHtkMSwgZDJ9KSA9PiAoZDIuYXBwbHlUbyhkMSwgJ2FyZycpLCBkMS5hcmcpKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdSZXBsYWNlJywgJ0FkZCcgICAgLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdSZXBsYWNlJywgJ1JlbW92ZScgLCBkKCdSZW1vdmUnKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdSZXBsYWNlJywgJ0ZvcmJpZCcgLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdSZXBsYWNlJywgJ1JlcGxhY2UnLCBkKCdSZXBsYWNlJywgJ3AyJykpO1xuXG5cdFx0fSxcblxuXHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0ICpcblx0XHQgKi9cblx0XHRfZGVmaW5lQXJyYXlPcGVyYXRpb25UeXBlcygpIHtcblxuXHRcdFx0dmFyIGRlbHRhSnMgPSB0aGlzO1xuXG5cdFx0XHQvLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC9cblxuXHRcdFx0LyogY29udmVuaWVuY2UgZGVmaW5pdGlvbnMgZm9yIHRoZSBhcHBsaWNhdGlvbiBhbmQgY29tcG9zaXRpb24gZnVuY3Rpb25zIGJlbG93ICovXG5cdFx0XHR2YXIgZXJyb3IgPSAoZDEsIHAsIGQyKSA9PiB7IHRocm93IG5ldyBFcnJvcihgWW91IGNhbm5vdCBmb2xsb3cgJyR7ZDFbcF0udHlwZX0nIHdpdGggJyR7ZDIudHlwZX0nLmApIH07XG5cblx0XHRcdGZ1bmN0aW9uIGQodHlwZSwgIGZuID0gKCgpPT5udWxsKSkge1xuXHRcdFx0XHRpZiAodHlwZW9mIGZuID09PSAnc3RyaW5nJykgeyBmbiA9ICgodikgPT4gKG8pID0+IG9bdl0pKGZuKSB9XG5cdFx0XHRcdHJldHVybiAoZDEsIHAsIGQyKSA9PiB7XG5cdFx0XHRcdFx0dmFyIGFyZ3MgPSB7XG5cdFx0XHRcdFx0XHRkMTogZDEuZGVsdGFzICYmIGQxLmRlbHRhc1twXSxcblx0XHRcdFx0XHRcdGQyOiBkMixcblx0XHRcdFx0XHRcdHAxOiBkMS5kZWx0YXMgJiYgZDEuZGVsdGFzW3BdICYmIGQxLmRlbHRhc1twXS5hcmcsXG5cdFx0XHRcdFx0XHRwMjogZDIuYXJnXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRyZXR1cm4gbmV3IChkZWx0YUpzLm9wZXJhdGlvbnNbdHlwZV0pKGZuKGFyZ3MpKTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gYXNzZXJ0RGVmaW5lZCh2YWwsIG9wVHlwZSkge1xuXHRcdFx0XHRVLmFzc2VydChVLmlzRGVmaW5lZCh2YWwpLFxuXHRcdFx0XHRcdFx0YFRoZSBvcGVyYXRpb24gJyR7b3BUeXBlfScgZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgZGVmaW5lZC5gKTtcblx0XHRcdH1cblx0XHRcdGZ1bmN0aW9uIGFzc2VydEFycmF5KHZhbCwgb3BUeXBlKSB7XG5cdFx0XHRcdFUuYXNzZXJ0KEFycmF5LmlzQXJyYXkodmFsKSxcblx0XHRcdFx0XHRcdGBUaGUgb3BlcmF0aW9uICcke29wVHlwZX0nIGV4cGVjdHMgdGhlIHByb3BlcnR5IHRvIGJlIGFuIGFycmF5LmApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC8gLyAvIC9cblxuXHRcdFx0LyogZGVjbGFyaW5nIHRoZSBhcnJheSBvcGVyYXRpb24gdHlwZXMgKi9cblx0XHRcdHRoaXMubmV3T3BlcmF0aW9uVHlwZSgnUHV0Jywge1xuXHRcdFx0XHRjb25zdHJ1Y3QoKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMubWV0YS5tZXRob2QpIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsdWVzID0gW3tcblx0XHRcdFx0XHRcdFx0bWV0aG9kOiB0aGlzLm1ldGEubWV0aG9kLFxuXHRcdFx0XHRcdFx0XHR2YWx1ZTogdGhpcy5hcmdcblx0XHRcdFx0XHRcdH1dO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzLnZhbHVlcyA9IFtdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0YXBwbHlUbyhvYmosIHApIHtcblx0XHRcdFx0XHRhc3NlcnREZWZpbmVkKG9ialtwXSwgJ1B1dCcpO1xuXHRcdFx0XHRcdGFzc2VydEFycmF5KG9ialtwXSwgJ1B1dCcpO1xuXHRcdFx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHttZXRob2QsIHZhbHVlfSkgPT4ge1xuXHRcdFx0XHRcdFx0c3dpdGNoIChtZXRob2QpIHtcblx0XHRcdFx0XHRcdFx0Y2FzZSAncHJlcGVuZCc6IHtcblx0XHRcdFx0XHRcdFx0XHRvYmpbcF0udW5zaGlmdCh2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0XHRcdGNhc2UgJ2luc2VydCc6IHtcblx0XHRcdFx0XHRcdFx0XHQvLyAnSW5zZXJ0JyBkb2Vzbid0ICpoYXZlKiB0byB1c2UgYSByYW5kb20gcG9zaXRpb24uIEFueSBwb3NpdGlvbiB3aWxsIGRvLlxuXHRcdFx0XHRcdFx0XHRcdC8vICBOb25ldGhlbGVzcywgd2UgdXNlIGEgcmFuZG9tIHBvc2l0aW9uIGZvciB0ZXN0aW5nIHB1cnBvc2VzLlxuXHRcdFx0XHRcdFx0XHRcdHZhciBwb3NpdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChvYmpbcF0ubGVuZ3RoICsgMSkpO1xuXHRcdFx0XHRcdFx0XHRcdG9ialtwXS5zcGxpY2UocG9zaXRpb24sIDAsIHZhbHVlKTtcblx0XHRcdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0XHRcdFx0Y2FzZSAnYXBwZW5kJzoge1xuXHRcdFx0XHRcdFx0XHRcdG9ialtwXS5wdXNoKHZhbHVlKTtcblx0XHRcdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSxcblx0XHRcdFx0bWV0aG9kczogWydwcmVwZW5kJywgJ2luc2VydCcsICdhcHBlbmQnXVxuXHRcdFx0fSk7XG5cblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUmVwbGFjZScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ01vZGlmeScgLCAnUHV0JyAgICAsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ0FkZCcgICAgLCAnUHV0JyAgICAsIGQoJ0FkZCcsICh7ZDEsIGQyfSkgPT4gKGQyLmFwcGx5VG8oZDEsICdhcmcnKSwgZDEuYXJnKSkpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignUmVtb3ZlJyAsICdQdXQnICAgICwgZXJyb3IpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignRm9yYmlkJyAsICdQdXQnICAgICwgZXJyb3IpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignUmVwbGFjZScsICdQdXQnICAgICwgZCgnUmVwbGFjZScsICh7ZDEsIGQyfSkgPT4gKGQyLmFwcGx5VG8oZDEsICdhcmcnKSwgZDEuYXJnKSkpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignUHV0JyAgICAsICdNb2RpZnknICwgZXJyb3IpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignUHV0JyAgICAsICdBZGQnICAgICwgZXJyb3IpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignUHV0JyAgICAsICdSZW1vdmUnICwgZCgnUmVtb3ZlJykpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignUHV0JyAgICAsICdGb3JiaWQnICwgZXJyb3IpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignUHV0JyAgICAsICdSZXBsYWNlJywgZCgnUmVwbGFjZScsICdwMicpKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ1B1dCcgICAgLCAnUHV0JyAgICAsIChkMSwgcCwgZDIpID0+IHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IG5ldyBkZWx0YUpzLm9wZXJhdGlvbnMuUHV0KCk7XG5cdFx0XHRcdHJlc3VsdC52YWx1ZXMgPSAoZDEuZGVsdGFzW3BdLnZhbHVlcykuY29uY2F0KGQyLnZhbHVlcyk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9KTtcblxuXG5cblxuXHRcdH0sXG5cblx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdCAqXG5cdFx0ICovXG5cdFx0X2RlZmluZURlbHRhTW9kZWxPcGVyYXRpb25UeXBlKCkge1xuXG5cdFx0XHQvL3RoaXMubmV3T3BlcmF0aW9uVHlwZSgnRGVsdGFNb2RlbCcsIGZ1bmN0aW9uIGFwcGx5VG8ob2JqLCBwKSB7XG5cdFx0XHQvL1x0dGhpcy5hcmcudG9wb2xvZ2ljYWxseSgoc3ViRGVsdGEpID0+IHtcblx0XHRcdC8vXHRcdC8vIHRoZSBncmFwaCBpcyBhbGxvd2VkIHRvIGNvbnRhaW4gJ251bGwnIHZlcnRpY2VzIGZvciBvcmRlcmluZyBwdXJwb3Nlc1xuXHRcdFx0Ly9cdFx0aWYgKHN1YkRlbHRhKSB7IHN1YkRlbHRhLmFwcGx5VG8ob2JqLCBwKSB9XG5cdFx0XHQvL1x0fSk7XG5cdFx0XHQvL30sIHtcblx0XHRcdC8vXG5cdFx0XHQvL30pO1xuXHRcdFx0Ly9cblx0XHRcdC8vXG5cdFx0XHQvLy8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ0RlbHRhTW9kZWwnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFx0XHQvLy8vIHRvIGNvbXBvc2UgZGVsdGEgbW9kZWxzLCB3ZSBzaW1wbHkgaGF2ZSBvbmUgYXBwbHkgYWZ0ZXIgdGhlIG90aGVyXG5cdFx0XHQvLy8vIHdpdGhvdXQgYW55IGNvbXBvc2FiaWxpdHkgY2hlY2tzOyBpbiB0aGUgZnV0dXJlLCB0aGlzIG1heSBiZWNvbWUgbW9yZSBjbGV2ZXJcblx0XHRcdC8vdmFyIG9yZGVyZWRCeVNpbXBsZURlbHRhTW9kZWwgPSAoZDEsIHAsIGQyKSA9PiB7XG5cdFx0XHQvL1x0dmFyIGdyYXBoID0gbmV3IEpzR3JhcGgoKTtcblx0XHRcdC8vXHRncmFwaC5hZGROZXdWZXJ0ZXgoMSwgZDEuZGVsdGFzW3BdKTtcblx0XHRcdC8vXHRncmFwaC5hZGROZXdWZXJ0ZXgoMiwgZDIpO1xuXHRcdFx0Ly9cdGdyYXBoLmFkZE5ld0VkZ2UoMSwgMik7XG5cdFx0XHQvL1x0cmV0dXJuIGQxLmRlbHRhc1twXSA9IG5ldyBkZWx0YUpzLm9wZXJhdGlvbnMuRGVsdGFNb2RlbChncmFwaCk7XG5cdFx0XHQvL307XG5cdFx0XHQvL3RoaXMubmV3Q29tcG9zaXRpb24oJ01vZGlmeScsICAgICAnRGVsdGFNb2RlbCcsIG9yZGVyZWRCeVNpbXBsZURlbHRhTW9kZWwpO1xuXHRcdFx0Ly90aGlzLm5ld0NvbXBvc2l0aW9uKCdBZGQnLCAgICAgICAgJ0RlbHRhTW9kZWwnLCBvcmRlcmVkQnlTaW1wbGVEZWx0YU1vZGVsKTtcblx0XHRcdC8vdGhpcy5uZXdDb21wb3NpdGlvbignUmVtb3ZlJywgICAgICdEZWx0YU1vZGVsJywgb3JkZXJlZEJ5U2ltcGxlRGVsdGFNb2RlbCk7XG5cdFx0XHQvL3RoaXMubmV3Q29tcG9zaXRpb24oJ0ZvcmJpZCcsICAgICAnRGVsdGFNb2RlbCcsIG9yZGVyZWRCeVNpbXBsZURlbHRhTW9kZWwpO1xuXHRcdFx0Ly90aGlzLm5ld0NvbXBvc2l0aW9uKCdSZXBsYWNlJywgICAgJ0RlbHRhTW9kZWwnLCBvcmRlcmVkQnlTaW1wbGVEZWx0YU1vZGVsKTtcblx0XHRcdC8vdGhpcy5uZXdDb21wb3NpdGlvbignRGVsdGFNb2RlbCcsICdNb2RpZnknLCAgICAgb3JkZXJlZEJ5U2ltcGxlRGVsdGFNb2RlbCk7XG5cdFx0XHQvL3RoaXMubmV3Q29tcG9zaXRpb24oJ0RlbHRhTW9kZWwnLCAnQWRkJywgICAgICAgIG9yZGVyZWRCeVNpbXBsZURlbHRhTW9kZWwpO1xuXHRcdFx0Ly90aGlzLm5ld0NvbXBvc2l0aW9uKCdEZWx0YU1vZGVsJywgJ1JlbW92ZScsICAgICBvcmRlcmVkQnlTaW1wbGVEZWx0YU1vZGVsKTtcblx0XHRcdC8vdGhpcy5uZXdDb21wb3NpdGlvbignRGVsdGFNb2RlbCcsICdGb3JiaWQnLCAgICAgb3JkZXJlZEJ5U2ltcGxlRGVsdGFNb2RlbCk7XG5cdFx0XHQvL3RoaXMubmV3Q29tcG9zaXRpb24oJ0RlbHRhTW9kZWwnLCAnUmVwbGFjZScsICAgIG9yZGVyZWRCeVNpbXBsZURlbHRhTW9kZWwpO1xuXHRcdFx0Ly90aGlzLm5ld0NvbXBvc2l0aW9uKCdEZWx0YU1vZGVsJywgJ0RlbHRhTW9kZWwnLCBvcmRlcmVkQnlTaW1wbGVEZWx0YU1vZGVsKTtcblxuXHRcdH1cblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXHR9KTtcblxuXG5cdHJldHVybiBEZWx0YUpzO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZGVsdGEuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKCgpID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXG5cdFx0LyogY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGUgKi9cblx0XHRuZXdDbGFzcyhjb25zdHJ1Y3RvciwgcHJvdG90eXBlID0ge30pIHtcblx0XHRcdHZhciBjbHMgPSBjb25zdHJ1Y3Rvcjtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0LyogY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGUgKi9cblx0XHRuZXdTdWJjbGFzcyhzdXBlckNsYXNzLCBjb25zdHJ1Y3Rvck1ha2VyLCBwcm90b3R5cGUgPSB7fSkge1xuXHRcdFx0dmFyIGNscyA9IGNvbnN0cnVjdG9yTWFrZXIoc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IpO1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuXHRcdFx0VS5leHRlbmQoY2xzLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvKiAgZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXMgICAgICovXG5cdFx0LyogIG9mIHRoZSBvdGhlciBvYmplY3RzLCBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5zICAqL1xuXHRcdC8qICB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdFx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb2JqMTtcblx0XHR9LFxuXG5cdFx0LyogYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkIHdpdGggYW4gYXJyYXkgb2YgZm9ybWFsIHBhcmFtZXRlcnMgKi9cblx0XHRhcHBseUNvbnN0cnVjdG9yKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcblx0XHRcdHZhciBuZXdfb2JqID0gT2JqZWN0LmNyZWF0ZShDb25zdHJ1Y3RvckZuLnByb3RvdHlwZSk7XG5cdFx0XHRDb25zdHJ1Y3RvckZuLmFwcGx5KG5ld19vYmosIGFyZ3MpO1xuXHRcdFx0cmV0dXJuIG5ld19vYmo7XG5cdFx0fSxcblxuXHRcdC8qIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGEgY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZSAqL1xuXHRcdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdFx0fSxcblxuXHRcdC8qIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYCAqL1xuXHRcdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8qIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApICovXG5cdFx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8qIHJlcGVhdCBhIHN0cmluZyBhIGdpdmVuIG51bWJlciBvZiB0aW1lcyAqL1xuXHRcdHJlcGVhdChuciwgc3RyKSB7IHJldHVybiBuZXcgQXJyYXkobnIrMSkuam9pbihzdHIpIH1cblx0fTtcblxuXHRyZXR1cm4gVTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWlzYy5qc1xuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImRlbHRhLmpzIn0=