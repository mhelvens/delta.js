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
	    var thisDeltaJs = this;
	    this.operations = {};
	    this.compositions = {};
	    this.operations.Delta = U.newClass(function() {}, {toString: function() {
	        var indentLvl = arguments[0] !== (void 0) ? arguments[0] : 0;
	        var prop = arguments[1] !== (void 0) ? arguments[1] : '(root)';
	        var $__0 = this;
	        var indent = U.repeat(0 + indentLvl, '    ');
	        var str = ("" + indent + this.type + " '" + prop + "'");
	        if (this.a && this.a.length > 0) {
	          str += (": " + JSON.stringify(this.a).slice(1, -1));
	        }
	        if (this.deltas && Object.keys(this.deltas).length > 0) {
	          str += '\n' + Object.keys(this.deltas).map((function(p) {
	            return $__0.deltas[p].toString(indentLvl + 1, p);
	          })).join('\n');
	        }
	        return str;
	      }});
	    this.operations['modify'] = U.newSubclass(this.operations.Delta, (function(superFn) {
	      return function() {
	        for (var args = [],
	            $__1 = 0; $__1 < arguments.length; $__1++)
	          args[$__1] = arguments[$__1];
	        superFn.apply(this, args);
	        this.deltas = {};
	      };
	    }), {
	      type: 'modify',
	      applyTo: function(obj, prop) {
	        var $__0 = this;
	        if (U.isDefined(prop)) {
	          obj = obj[prop];
	        }
	        U.assert(obj instanceof Object, "The 'modify' operation expects the property to be an already defined Object.");
	        Object.keys(this.deltas).forEach((function(subProp) {
	          $__0.deltas[subProp].applyTo(obj, subProp);
	        }));
	      },
	      appliedTo: function(obj, prop) {
	        if (U.isDefined(prop)) {
	          obj = obj[prop];
	        }
	        var result = U.extend({}, obj);
	        this.applyTo(result);
	        return result;
	      },
	      compose: function(prop, otherDelta) {
	        var firstDelta = this.deltas[prop];
	        var arr = thisDeltaJs.compositions[firstDelta.type][otherDelta.type];
	        U.assert(arr.length > 0, ("No composition is defined between '" + firstDelta.type + "' and '" + otherDelta.type + "'."));
	        return arr[0](this, prop, otherDelta);
	      },
	      modify: function(prop) {
	        return this._addOperation('modify', prop, []);
	      },
	      _addOperation: function(opType, prop, args) {
	        var match = prop.match(/^([.#]?)(\w+|\(\w+\))(.*)$/);
	        U.assert(match, ("The path string '" + prop + "' is not well formed."));
	        if (match[1] === '#') {
	          return this._addOperation(opType, (".(instance)." + match[2] + match[3]), args);
	        }
	        if (match[3].length > 0) {
	          return this.modify(match[2])._addOperation(opType, match[3], args);
	        }
	        var newDelta = U.applyConstructor(thisDeltaJs.operations[opType], args);
	        var result;
	        if (this.deltas[match[2]]) {
	          result = this.compose(match[2], newDelta);
	        } else {
	          result = this.deltas[match[2]] = newDelta;
	        }
	        return result.type === 'modify' ? result : this;
	      }
	    });
	    this.operations['targetedModify'] = U.newSubclass(this.operations['modify'], (function(superFn) {
	      return function(target) {
	        for (var args = [],
	            $__1 = 1; $__1 < arguments.length; $__1++)
	          args[$__1 - 1] = arguments[$__1];
	        superFn.apply(this, [target].concat(args));
	        this._target = target;
	      };
	    }), {_addOperation: function(opType, prop, args) {
	        var match = prop.match(/^([.#]?)(\w+|\(\w+\))(.*)$/);
	        U.assert(match, ("The path string '" + prop + "' is not well formed."));
	        if (match[1] === '#') {
	          return this._addOperation(opType, (".(instance)." + match[2] + match[3]), args);
	        }
	        if (match[3].length > 0) {
	          return this.modify(match[2])._addOperation(opType, match[3], args);
	        }
	        if (opType === 'modify') {
	          var newDelta = U.applyConstructor(thisDeltaJs.operations['targetedModify'], args);
	          newDelta._target = this._target[match[2]];
	          return newDelta;
	        }
	        U.applyConstructor(thisDeltaJs.operations[opType], args).applyTo(this._target, match[2]);
	        return this;
	      }});
	    this.compositions['modify'] = {'modify': []};
	    this._defineStandardOperationTypes();
	  }, {
	    get Delta() {
	      return this.operations['modify'];
	    },
	    newOperationType: function(name, applyTo) {
	      var prototype = arguments[2] !== (void 0) ? arguments[2] : {};
	      var $__0 = this;
	      U.assert(!this.operations[name], ("The '" + name + "' operation type already exists."));
	      this.operations.Delta.prototype[name] = function(prop) {
	        for (var args = [],
	            $__1 = 1; $__1 < arguments.length; $__1++)
	          args[$__1 - 1] = arguments[$__1];
	        return this._addOperation(name, prop, args);
	      };
	      this.compositions[name] = {};
	      Object.keys(this.compositions).forEach((function(type) {
	        U.assert(!$__0.compositions[type][name]);
	        U.assert(!$__0.compositions[name][type]);
	        $__0.compositions[type][name] = [];
	        $__0.compositions[name][type] = [];
	      }));
	      this.operations[name] = U.newSubclass(this.operations.Delta, (function(superFn) {
	        return function() {
	          for (var args = [],
	              $__2 = 0; $__2 < arguments.length; $__2++)
	            args[$__2] = arguments[$__2];
	          superFn.apply(this, args);
	          this.a = args;
	        };
	      }), U.extend({
	        type: name,
	        applyTo: applyTo
	      }, prototype));
	    },
	    newComposition: function(type1, type2, compose) {
	      this.compositions[type1][type2].push(compose);
	    },
	    _defineStandardOperationTypes: function() {
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
	            p1: d1.deltas && d1.deltas[p] && d1.deltas[p].a && d1.deltas[p].a[0],
	            p2: d2.a && d2.a[0]
	          };
	          return d1.deltas[p] = new (deltaJs.operations[type])(fn(args));
	        });
	      }
	      function assertDefined(val, opType) {
	        U.assert(U.isDefined(val), ("The operation '" + opType + "' expects the property to be defined."));
	      }
	      function assertUndefined(val, opType) {
	        U.assert(U.isUndefined(val), ("The operation '" + opType + "' expects the property to be undefined."));
	      }
	      this.newOperationType('add', function applyTo(obj, p) {
	        assertUndefined(obj[p], 'add');
	        obj[p] = this.a[0];
	      });
	      this.newOperationType('remove', function applyTo(obj, p) {
	        assertDefined(obj[p], 'remove');
	        delete obj[p];
	      });
	      this.newOperationType('forbid', function applyTo(obj, p) {
	        assertUndefined(obj[p], 'forbid');
	      });
	      this.newOperationType('replace', function applyTo(obj, p) {
	        assertDefined(obj[p], 'replace');
	        obj[p] = this.a[0];
	      });
	      this.newComposition('modify', 'modify', (function(d1, p, d2) {
	        Object.keys(d2.deltas).forEach((function(prop) {
	          d1.compose(p, d2.deltas[prop]);
	        }));
	        return d1.deltas[p];
	      }));
	      this.newComposition('modify', 'add', error);
	      this.newComposition('add', 'add', error);
	      this.newComposition('add', 'modify', (function(d1, p) {
	        return new (deltaJs.operations['targetedModify'])(d1.deltas[p].a[0]);
	      }));
	      this.newComposition('modify', 'remove', d('remove'));
	      this.newComposition('add', 'remove', d('forbid'));
	      this.newComposition('remove', 'modify', error);
	      this.newComposition('remove', 'add', d('replace', 'p2'));
	      this.newComposition('remove', 'remove', error);
	      this.newComposition('modify', 'forbid', error);
	      this.newComposition('add', 'forbid', error);
	      this.newComposition('remove', 'forbid', d('remove'));
	      this.newComposition('forbid', 'modify', error);
	      this.newComposition('forbid', 'add', d('add', 'p2'));
	      this.newComposition('forbid', 'remove', error);
	      this.newComposition('forbid', 'forbid', d('forbid'));
	      this.newComposition('modify', 'replace', d('replace', 'p2'));
	      this.newComposition('add', 'replace', d('add', 'p2'));
	      this.newComposition('remove', 'replace', error);
	      this.newComposition('forbid', 'replace', error);
	      this.newComposition('replace', 'modify', (function(d1, p) {
	        return new (deltaJs.operations['targetedModify'])(d1.deltas[p].a[0]);
	      }));
	      this.newComposition('replace', 'add', error);
	      this.newComposition('replace', 'remove', d('remove'));
	      this.newComposition('replace', 'forbid', error);
	      this.newComposition('replace', 'replace', d('replace', 'p2'));
	    }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkZGVlYWYxOGY0N2VmM2VkNzkyZCIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9Iiwid2VicGFjazovLy8uL3NyYy9taXNjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0EsaUNBQVEsdUJBQWEsd0JBQVUsQ0FBRywwQ0FBVSxFQUFHLFFBQU07QUFDcEQsY0FBVyxDQUFDO0FBTVIsYUFBTSxFQUFJLFdBQVUsQ0FBQyxRQUFTLFFBQU0sQ0FBRTtBQUVyQyxtQkFBVSxFQUFJLEtBQUcsQ0FBQztBQUd0QixRQUFHLFdBQVcsRUFBSSxHQUFDLENBQUM7QUFDcEIsUUFBRyxhQUFhLEVBQUksR0FBQyxDQUFDO0FBR3RCLFFBQUcsV0FBVyxNQUFNLEVBQUksV0FBVSxDQUFDLFNBQVUsQ0FBRSxHQUFDLENBQUcsRUFNbEQs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ZUFBZ0IsQ0FBQyxHQUFFLENBQUMsQ0FBRztBQUM1QixrQkFBSyxlQUFnQixDQUFDLElBQUcsQ0FBRyxJQUFFLENBQUcsT0FBSyx5QkFBMEIsQ0FBQyxHQUFFLENBQUcsSUFBRSxDQUFDLENBQUMsQ0FBQztXQUM1RTtBQUFBLFNBQ0Q7QUFBQSxPQUNELEVBQUMsQ0FBQztBQUNGLFlBQU8sS0FBRyxDQUFDO0tBQ1o7QUFHQSxvQkFBZSxDQUFmLFVBQWlCLGFBQVksQ0FBRyxLQUFHLENBQUc7QUFDakMsaUJBQU0sRUFBSSxPQUFLLE9BQVEsQ0FBQyxhQUFZLFVBQVUsQ0FBQyxDQUFDO0FBQ3BELG1CQUFZLE1BQU8sQ0FBQyxPQUFNLENBQUcsS0FBRyxDQUFDLENBQUM7QUFDbEMsWUFBTyxRQUFNLENBQUM7S0FDZjtBQUdBLFVBQUssQ0FBTCxVQUFPLFNBQVEsQ0FBRyxRQUFNLENBQUc7QUFDMUIsVUFBSSxDQUFDLFNBQVEsQ0FBRztBQUFFLGFBQU0sSUFBSSxNQUFLLENBQUMsT0FBTSxHQUFLLG1CQUFpQixDQUFDO09BQUU7QUFBQSxLQUNsRTtBQUdBLGVBQVUsQ0FBVixVQUFZLEdBQUUsQ0FBRztBQUFFLFlBQU8sT0FBTyxJQUFFLElBQU0sWUFBVTtLQUFFO0FBR3JELGFBQVEsQ0FBUixVQUFVLEdBQUUsQ0FBRztBQUFFLFlBQU8sT0FBTyxJQUFFLElBQU0sWUFBVTtLQUFFO0FBR25ELFVBQUssQ0FBTCxVQUFPLEVBQUMsQ0FBRyxJQUFFLENBQUc7QUFBRSxZQUFPLElBQUksTUFBSyxDQUFDLEVBQUMsRUFBRSxHQUFDLEtBQU0sQ0FBQyxHQUFFLENBQUM7S0FBRTtBQUFBLEdBQ3BELENBQUM7QUFFRCxRQUFPLEdBQUM7QUFDVCx3SkFBRTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianMtZ3JhcGhcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianMtZ3JhcGhcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRGVsdGFKc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEZWx0YUpzXCJdID0gZmFjdG9yeShyb290W1wiSnNHcmFwaFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGRkZWVhZjE4ZjQ3ZWYzZWQ3OTJkXG4gKiovIiwiZGVmaW5lKFsnLi9taXNjLmpzJywgJ2pzLWdyYXBoJ10sIGZ1bmN0aW9uIChVLCBKc0dyYXBoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdC8qKiB7QGNsYXNzIERlbHRhSnN9XG5cdCAqXG5cdCAqL1xuXHR2YXIgRGVsdGFKcyA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gRGVsdGFKcygpIHtcblxuXHRcdHZhciB0aGlzRGVsdGFKcyA9IHRoaXM7XG5cblx0XHQvKiB0aGUgdGhpbmdzIGluc3RhbmNlcyBvZiAnRGVsdGFKcycga2VlcHMgdHJhY2sgb2YgKi9cblx0XHR0aGlzLm9wZXJhdGlvbnMgPSB7fTsgICAvLyBwcm9wZXJ0eSAtPiBEZWx0YVxuXHRcdHRoaXMuY29tcG9zaXRpb25zID0ge307IC8vIHR5cGUxIC0+IHR5cGUyIC0+IFtjb21wb3NlRm5dXG5cblx0XHQvKiBkZWZpbmUgdGhlIGJhc2UgJ0RlbHRhJyBjbGFzcyAqLy8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0oRGVsdGEpXG5cdFx0dGhpcy5vcGVyYXRpb25zLkRlbHRhID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoKSB7fSwge1xuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSBpbmRlbnRMdmwge051bWJlcj99XG5cdFx0XHQgKiBAcGFyYW0gcHJvcGVydHkgIHtTdHJpbmc/fVxuXHRcdFx0ICovXG5cdFx0XHR0b1N0cmluZyhpbmRlbnRMdmwgPSAwLCBwcm9wID0gJyhyb290KScpIHtcblx0XHRcdFx0dmFyIGluZGVudCA9IFUucmVwZWF0KDAgKyBpbmRlbnRMdmwsICcgICAgJyk7XG5cdFx0XHRcdHZhciBzdHIgPSBgJHtpbmRlbnR9JHt0aGlzLnR5cGV9ICcke3Byb3B9J2A7XG5cdFx0XHRcdGlmICh0aGlzLmEgJiYgdGhpcy5hLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRzdHIgKz0gYDogJHtKU09OLnN0cmluZ2lmeSh0aGlzLmEpLnNsaWNlKDEsIC0xKX1gO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh0aGlzLmRlbHRhcyAmJiBPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdHN0ciArPSAnXFxuJyArIE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKVxuXHRcdFx0XHRcdFx0XHQubWFwKChwKSA9PiB0aGlzLmRlbHRhc1twXS50b1N0cmluZyhpbmRlbnRMdmwgKyAxLCBwKSlcblx0XHRcdFx0XHRcdFx0LmpvaW4oJ1xcbicpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBzdHI7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0oL0RlbHRhKVxuXG5cblx0XHQvKiBkZWZpbmUgdGhlIGZ1bmRhbWVudGFsICdtb2RpZnknIGRlbHRhICovLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLShtb2RpZnkpXG5cdFx0dGhpcy5vcGVyYXRpb25zWydtb2RpZnknXSA9IFUubmV3U3ViY2xhc3ModGhpcy5vcGVyYXRpb25zLkRlbHRhLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdHN1cGVyRm4uYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHR0aGlzLmRlbHRhcyA9IHt9O1xuXHRcdH0sIHtcblx0XHRcdHR5cGU6ICdtb2RpZnknLFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIG9iaiAge09iamVjdH1cblx0XHRcdCAqIEBwYXJhbSBwcm9wIHtTdHJpbmd9XG5cdFx0XHQgKi9cblx0XHRcdGFwcGx5VG8ob2JqLCBwcm9wKSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZChwcm9wKSkgeyBvYmogPSBvYmpbcHJvcF0gfVxuXHRcdFx0XHRVLmFzc2VydChvYmogaW5zdGFuY2VvZiBPYmplY3QsXG5cdFx0XHRcdFx0XHRgVGhlICdtb2RpZnknIG9wZXJhdGlvbiBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBhbiBhbHJlYWR5IGRlZmluZWQgT2JqZWN0LmApO1xuXHRcdFx0XHRPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykuZm9yRWFjaCgoc3ViUHJvcCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuZGVsdGFzW3N1YlByb3BdLmFwcGx5VG8ob2JqLCBzdWJQcm9wKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXG5cdFx0XHRhcHBsaWVkVG8ob2JqLCBwcm9wKSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZChwcm9wKSkgeyBvYmogPSBvYmpbcHJvcF0gfVxuXHRcdFx0XHR2YXIgcmVzdWx0ID0gVS5leHRlbmQoe30sIG9iaik7XG5cdFx0XHRcdHRoaXMuYXBwbHlUbyhyZXN1bHQpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSBwcm9wICAgICAgIHtTdHJpbmd9XG5cdFx0XHQgKiBAcGFyYW0gb3RoZXJEZWx0YSB7RGVsdGFKcyNvcGVyYXRpb25zLkRlbHRhfVxuXHRcdFx0ICovXG5cdFx0XHRjb21wb3NlKHByb3AsIG90aGVyRGVsdGEpIHtcblx0XHRcdFx0dmFyIGZpcnN0RGVsdGEgPSB0aGlzLmRlbHRhc1twcm9wXTtcblx0XHRcdFx0dmFyIGFyciA9IHRoaXNEZWx0YUpzLmNvbXBvc2l0aW9uc1tmaXJzdERlbHRhLnR5cGVdW290aGVyRGVsdGEudHlwZV07XG5cdFx0XHRcdFUuYXNzZXJ0KGFyci5sZW5ndGggPiAwLFxuXHRcdFx0XHRcdFx0YE5vIGNvbXBvc2l0aW9uIGlzIGRlZmluZWQgYmV0d2VlbiAnJHtmaXJzdERlbHRhLnR5cGV9JyBhbmQgJyR7b3RoZXJEZWx0YS50eXBlfScuYCk7XG5cdFx0XHRcdHJldHVybiBhcnJbMF0odGhpcywgcHJvcCwgb3RoZXJEZWx0YSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHByb3Age1N0cmluZ31cblx0XHRcdCAqL1xuXHRcdFx0bW9kaWZ5KHByb3ApIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2FkZE9wZXJhdGlvbignbW9kaWZ5JywgcHJvcCwgW10pO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0gb3BUeXBlIHtTdHJpbmd9XG5cdFx0XHQgKiBAcGFyYW0gcHJvcCAgIHtTdHJpbmd9XG5cdFx0XHQgKiBAcGFyYW0gYXJncyAgIHtbKl19XG5cdFx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI29wZXJhdGlvbnMubW9kaWZ5fSAtIHRoZSBkZWVwZXN0ICdtb2RpZnknIGRlbHRhIGludm9sdmVkIGluIHRoaXMgbWV0aG9kLWNhbGxcblx0XHRcdCAqL1xuXHRcdFx0X2FkZE9wZXJhdGlvbihvcFR5cGUsIHByb3AsIGFyZ3MpIHtcblxuXHRcdFx0XHQvKiBkaXNzZWN0IHRoZSAncHJvcCcgc3RyaW5nICovXG5cdFx0XHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyAgMTExMTEgIDIyMjIyMjIyMjIyICAzMyAgLy9cblx0XHRcdFx0dmFyIG1hdGNoID0gcHJvcC5tYXRjaCgvXihbLiNdPykoXFx3K3xcXChcXHcrXFwpKSguKikkLyk7XG5cdFx0XHRcdFUuYXNzZXJ0KG1hdGNoLCBgVGhlIHBhdGggc3RyaW5nICcke3Byb3B9JyBpcyBub3Qgd2VsbCBmb3JtZWQuYCk7XG5cblx0XHRcdFx0LyogaWYgJ3Byb3AnIGhhcyBhIGxlYWRpbmcgJyMnIGNoYXJhY3RlciwgdHJhbnNmb3JtIGl0IGFuZCByZWNhbGwgdGhpcyBtZXRob2QgKi9cblx0XHRcdFx0aWYgKG1hdGNoWzFdID09PSAnIycpIHtcblx0XHRcdFx0XHQvLyB0aGUgIyBzZXBhcmF0b3IgZXhwZWN0cyB0aGUgY3VycmVudCBvYmplY3QgdG8gYmUgYSBjb25zdHJ1Y3RvciBmdW5jdGlvbixcblx0XHRcdFx0XHQvLyBhbmQgeWllbGRzIGEgZGVsdGEgdG8gbW9kaWZ5IG5ldyBpbnN0YW5jZXMgb2YgdGhlIGNvcnJlc3BvbmRpbmcgY2xhc3Ncblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fYWRkT3BlcmF0aW9uKG9wVHlwZSwgYC4oaW5zdGFuY2UpLiR7bWF0Y2hbMl19JHttYXRjaFszXX1gLCBhcmdzKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qIGlmIHRoZXJlIGlzIGEgbG9uZ2VyIGNoYWluLCBjYWxsIHRoaXMgbWV0aG9kIHJlY3Vyc2l2ZWx5ICovXG5cdFx0XHRcdGlmIChtYXRjaFszXS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0Ly8gcmVjdXJzZS4uW2luZGlyZWN0bHldLi4uLi5bZGlyZWN0bHldXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMubW9kaWZ5KG1hdGNoWzJdKS5fYWRkT3BlcmF0aW9uKG9wVHlwZSwgbWF0Y2hbM10sIGFyZ3MpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyogYXQgdGhpcyBwb2ludCwgd2UgY29uc3RydWN0IHRoZSBuZXcgZGVsdGEgKi9cblx0XHRcdFx0dmFyIG5ld0RlbHRhID0gVS5hcHBseUNvbnN0cnVjdG9yKHRoaXNEZWx0YUpzLm9wZXJhdGlvbnNbb3BUeXBlXSwgYXJncyk7XG5cblx0XHRcdFx0LyogT0ssIG5vIHRhcmdldGVkIGRlbHRhczsgZG8gd2UgbmVlZCB0byBjb21wb3NlIHRoZSBuZXcgZGVsdGEgd2l0aCBhbiBleGlzdGluZyBvbmU/ICovXG5cdFx0XHRcdHZhciByZXN1bHQ7XG5cdFx0XHRcdGlmICh0aGlzLmRlbHRhc1ttYXRjaFsyXV0pIHtcblx0XHRcdFx0XHRyZXN1bHQgPSB0aGlzLmNvbXBvc2UobWF0Y2hbMl0sIG5ld0RlbHRhKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXN1bHQgPSB0aGlzLmRlbHRhc1ttYXRjaFsyXV0gPSBuZXdEZWx0YTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0LnR5cGUgPT09ICdtb2RpZnknID8gcmVzdWx0IDogdGhpcztcblxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0oL21vZGlmeSlcblxuXHRcdC8vIEluIG9yZGVyIHRvIHByb2Nlc3MgZGVsdGEgY29tcG9zaXRpb25zIGxpa2Vcblx0XHQvLyAgICAgZGVsdGEuYWRkKCdvYmonLCB7fSk7XG5cdFx0Ly8gICAgIGRlbHRhLm1vZGlmeSgnb2JqJyk7XG5cdFx0Ly8gYW5kIHN0aWxsIHJldHVybiAnbW9kaWZ5JyBkZWx0YXMgdG8gdGhlIHVzZXIgZm9yIGZ1cnRoZXIgb3BlcmF0aW9ucyxcblx0XHQvLyB3ZSBuZWVkIHRlbXBvcmFyeSAnbW9kaWZ5JyBkZWx0YXMgdGhhdCByZW1lbWJlciB0aGVpciB0YXJnZXQsIHdoaWNoXG5cdFx0Ly8gd2Ugd2lsbCBjYWxsICd0YXJnZXRlZCBkZWx0YXMnLlxuXG5cdFx0LyogZGVmaW5lIHRoZSAndGFyZ2V0ZWRNb2RpZnknIGRlbHRhIHN1YmNsYXNzICovLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKHRhcmdldGVkTW9kaWZ5KVxuXHRcdHRoaXMub3BlcmF0aW9uc1sndGFyZ2V0ZWRNb2RpZnknXSA9IFUubmV3U3ViY2xhc3ModGhpcy5vcGVyYXRpb25zWydtb2RpZnknXSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uICh0YXJnZXQsIC4uLmFyZ3MpIHtcblx0XHRcdHN1cGVyRm4uYXBwbHkodGhpcywgW3RhcmdldF0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdHRoaXMuX3RhcmdldCA9IHRhcmdldDtcblx0XHR9LCB7XG5cdFx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSBvcFR5cGUge1N0cmluZ31cblx0XHRcdCAqIEBwYXJhbSBwcm9wICAge1N0cmluZ31cblx0XHRcdCAqIEBwYXJhbSBhcmdzICAge1sqXX1cblx0XHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjb3BlcmF0aW9ucy5tb2RpZnl9IC0gdGhlIGRlZXBlc3QgJ21vZGlmeScgZGVsdGEgaW52b2x2ZWQgaW4gdGhpcyBtZXRob2QtY2FsbFxuXHRcdFx0ICovXG5cdFx0XHRfYWRkT3BlcmF0aW9uKG9wVHlwZSwgcHJvcCwgYXJncykge1xuXG5cdFx0XHRcdC8qIGRpc3NlY3QgdGhlICdwcm9wJyBzdHJpbmcgKi9cblx0XHRcdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vICAxMTExMSAgMjIyMjIyMjIyMjIgIDMzICAvL1xuXHRcdFx0XHR2YXIgbWF0Y2ggPSBwcm9wLm1hdGNoKC9eKFsuI10/KShcXHcrfFxcKFxcdytcXCkpKC4qKSQvKTtcblx0XHRcdFx0VS5hc3NlcnQobWF0Y2gsIGBUaGUgcGF0aCBzdHJpbmcgJyR7cHJvcH0nIGlzIG5vdCB3ZWxsIGZvcm1lZC5gKTtcblxuXHRcdFx0XHQvKiBpZiAncHJvcCcgaGFzIGEgbGVhZGluZyAnIycgY2hhcmFjdGVyLCB0cmFuc2Zvcm0gaXQgYW5kIHJlY2FsbCB0aGlzIG1ldGhvZCAqL1xuXHRcdFx0XHRpZiAobWF0Y2hbMV0gPT09ICcjJykge1xuXHRcdFx0XHRcdC8vIHRoZSAjIHNlcGFyYXRvciBleHBlY3RzIHRoZSBjdXJyZW50IG9iamVjdCB0byBiZSBhIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLFxuXHRcdFx0XHRcdC8vIGFuZCB5aWVsZHMgYSBkZWx0YSB0byBtb2RpZnkgbmV3IGluc3RhbmNlcyBvZiB0aGUgY29ycmVzcG9uZGluZyBjbGFzc1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9hZGRPcGVyYXRpb24ob3BUeXBlLCBgLihpbnN0YW5jZSkuJHttYXRjaFsyXX0ke21hdGNoWzNdfWAsIGFyZ3MpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyogaWYgdGhlcmUgaXMgYSBsb25nZXIgY2hhaW4sIGNhbGwgdGhpcyBtZXRob2QgcmVjdXJzaXZlbHkgKi9cblx0XHRcdFx0aWYgKG1hdGNoWzNdLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHQvLyByZWN1cnNlLi5baW5kaXJlY3RseV0uLi4uLltkaXJlY3RseV1cblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5tb2RpZnkobWF0Y2hbMl0pLl9hZGRPcGVyYXRpb24ob3BUeXBlLCBtYXRjaFszXSwgYXJncyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiBpZiB0aGUgbmV3IGRlbHRhIHNob3VsZCBiZSBhICdtb2RpZnknIGRlbHRhLCBpdCBpcyBhIHRhcmdldGVkIGRlbHRhICovXG5cdFx0XHRcdGlmIChvcFR5cGUgPT09ICdtb2RpZnknKSB7XG5cdFx0XHRcdFx0dmFyIG5ld0RlbHRhID0gVS5hcHBseUNvbnN0cnVjdG9yKHRoaXNEZWx0YUpzLm9wZXJhdGlvbnNbJ3RhcmdldGVkTW9kaWZ5J10sIGFyZ3MpO1xuXHRcdFx0XHRcdG5ld0RlbHRhLl90YXJnZXQgPSB0aGlzLl90YXJnZXRbbWF0Y2hbMl1dO1xuXHRcdFx0XHRcdHJldHVybiBuZXdEZWx0YTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qIGFwcGx5IHRoZSBuZXcgZGVsdGEgdG8gaXRzIHRhcmdldCwgZGlzY2FyZCBpdCBhbmQgcmV0dXJuICd0aGlzJyBkZWx0YSAqL1xuXHRcdFx0XHRVLmFwcGx5Q29uc3RydWN0b3IodGhpc0RlbHRhSnMub3BlcmF0aW9uc1tvcFR5cGVdLCBhcmdzKS5hcHBseVRvKHRoaXMuX3RhcmdldCwgbWF0Y2hbMl0pO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKC90YXJnZXRlZE1vZGlmeSlcblxuXG5cdFx0Lyogc2V0IHRoZSBmb3VuZGF0aW9uIG9mIHRoZSBjb21wb3NpdGlvbnMgYXJyYXkgKi9cblx0XHR0aGlzLmNvbXBvc2l0aW9uc1snbW9kaWZ5J10gPSB7ICdtb2RpZnknOiBbXSB9O1xuXG5cblx0XHQvKiBkZWZpbmUgc3RhbmRhcmQgb3BlcmF0aW9ucyAqL1xuXHRcdHRoaXMuX2RlZmluZVN0YW5kYXJkT3BlcmF0aW9uVHlwZXMoKTtcblxuXG5cdH0sIC8qKiBAbGVuZHMgRGVsdGFKcy5wcm90b3R5cGUgKi8gIHtcblxuXHRcdC8qKiB7QHB1YmxpY317QHByb3BlcnR5fVxuXHRcdCAqIHF1aWNrIGFjY2VzcyB0byB0aGUgJ21vZGlmeScgZGVsdGEgY29uc3RydWN0b3Jcblx0XHQgKi9cblx0XHRnZXQgRGVsdGEoKSB7IHJldHVybiB0aGlzLm9wZXJhdGlvbnNbJ21vZGlmeSddIH0sXG5cblx0XHQvLy8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQvLyAqXG5cdFx0Ly8gKi9cblx0XHQvL3ZwKHZwTmFtZSwgdmFsKSB7XG5cdFx0Ly9cdC8vIFRPRE9cblx0XHQvL30sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gbmFtZSAgICB7U3RyaW5nfVxuXHRcdCAqIEBwYXJhbSBhcHBseVRvIHsoRGVsdGFKcyNvcGVyYXRpb25zLkRlbHRhLCBPYmplY3QsIFN0cmluZykgPT4gdW5kZWZpbmVkfVxuXHRcdCAqL1xuXHRcdG5ld09wZXJhdGlvblR5cGUobmFtZSwgYXBwbHlUbywgcHJvdG90eXBlID0ge30pIHtcblxuXHRcdFx0Lyogc2FuaXR5IGNoZWNrcyAqL1xuXHRcdFx0VS5hc3NlcnQoIXRoaXMub3BlcmF0aW9uc1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlICcke25hbWV9JyBvcGVyYXRpb24gdHlwZSBhbHJlYWR5IGV4aXN0cy5gKTtcblxuXHRcdFx0LyogY3JlYXRlIHRoZSBjb3JyZXNwb25kaW5nIG1ldGhvZCBpbiB0aGUgJ21vZGlmeScgZGVsdGEgKi9cblx0XHRcdHRoaXMub3BlcmF0aW9ucy5EZWx0YS5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbiAocHJvcCwgLi4uYXJncykge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fYWRkT3BlcmF0aW9uKG5hbWUsIHByb3AsIGFyZ3MpO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogcHV0IHRoZSByaWdodCBmb3VuZGF0aW9uIGluICd0aGlzLmNvbXBvc2l0aW9uJyAqL1xuXHRcdFx0dGhpcy5jb21wb3NpdGlvbnNbbmFtZV0gPSB7fTtcblx0XHRcdE9iamVjdC5rZXlzKHRoaXMuY29tcG9zaXRpb25zKS5mb3JFYWNoKCh0eXBlKSA9PiB7XG5cdFx0XHRcdFUuYXNzZXJ0KCF0aGlzLmNvbXBvc2l0aW9uc1t0eXBlXVtuYW1lXSk7XG5cdFx0XHRcdFUuYXNzZXJ0KCF0aGlzLmNvbXBvc2l0aW9uc1tuYW1lXVt0eXBlXSk7XG5cdFx0XHRcdHRoaXMuY29tcG9zaXRpb25zW3R5cGVdW25hbWVdID0gW107XG5cdFx0XHRcdHRoaXMuY29tcG9zaXRpb25zW25hbWVdW3R5cGVdID0gW107XG5cdFx0XHR9KTtcblxuXHRcdFx0LyogY3JlYXRlIHRoZSBEZWx0YSBzdWJjbGFzcyByZXByZXNlbnRpbmcgdGhpcyBvcGVyYXRpb24gdHlwZSAqLy8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0ob3RoZXIpXG5cdFx0XHR0aGlzLm9wZXJhdGlvbnNbbmFtZV0gPSBVLm5ld1N1YmNsYXNzKHRoaXMub3BlcmF0aW9ucy5EZWx0YSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHN1cGVyRm4uYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdHRoaXMuYSA9IGFyZ3M7XG5cdFx0XHR9LCBVLmV4dGVuZCh7XG5cdFx0XHRcdHR5cGU6IG5hbWUsXG5cdFx0XHRcdGFwcGx5VG86IGFwcGx5VG9cblx0XHRcdH0sIHByb3RvdHlwZSkpO1xuXHRcdFx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSgvb3RoZXIpXG5cblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHR5cGUxICAge1N0cmluZ31cblx0XHQgKiBAcGFyYW0gdHlwZTIgICB7U3RyaW5nfVxuXHRcdCAqIEBwYXJhbSBjb21wb3NlIHsoRGVsdGFKcyNvcGVyYXRpb25zLm1vZGlmeSwgU3RyaW5nLCBEZWx0YUpzI29wZXJhdGlvbnMuRGVsdGEpID0+IHVuZGVmaW5lZH1cblx0XHQgKi9cblx0XHRuZXdDb21wb3NpdGlvbih0eXBlMSwgdHlwZTIsIGNvbXBvc2UpIHtcblx0XHRcdHRoaXMuY29tcG9zaXRpb25zW3R5cGUxXVt0eXBlMl0ucHVzaChjb21wb3NlKTtcblx0XHR9LFxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHQgKlxuXHRcdCAqL1xuXHRcdF9kZWZpbmVTdGFuZGFyZE9wZXJhdGlvblR5cGVzKCkge1xuXG5cdFx0XHR2YXIgZGVsdGFKcyA9IHRoaXM7XG5cblx0XHRcdC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy9cblxuXHRcdFx0LyogY29udmVuaWVuY2UgZGVmaW5pdGlvbnMgZm9yIHRoZSBhcHBsaWNhdGlvbiBhbmQgY29tcG9zaXRpb24gZnVuY3Rpb25zIGJlbG93ICovXG5cdFx0XHR2YXIgZXJyb3IgPSAoZDEsIHAsIGQyKSA9PiB7IHRocm93IG5ldyBFcnJvcihgWW91IGNhbm5vdCBmb2xsb3cgJyR7ZDFbcF0udHlwZX0nIHdpdGggJyR7ZDIudHlwZX0nLmApIH07XG5cblx0XHRcdGZ1bmN0aW9uIGQodHlwZSwgIGZuID0gKCgpPT5udWxsKSkge1xuXHRcdFx0XHRpZiAodHlwZW9mIGZuID09PSAnc3RyaW5nJykgeyBmbiA9ICgodikgPT4gKG8pID0+IG9bdl0pKGZuKSB9XG5cdFx0XHRcdHJldHVybiAoZDEsIHAsIGQyKSA9PiB7XG5cdFx0XHRcdFx0dmFyIGFyZ3MgPSB7XG5cdFx0XHRcdFx0XHRkMTogZDEuZGVsdGFzICYmIGQxLmRlbHRhc1twXSxcblx0XHRcdFx0XHRcdGQyOiBkMixcblx0XHRcdFx0XHRcdHAxOiBkMS5kZWx0YXMgJiYgZDEuZGVsdGFzW3BdICYmIGQxLmRlbHRhc1twXS5hICYmIGQxLmRlbHRhc1twXS5hWzBdLFxuXHRcdFx0XHRcdFx0cDI6IGQyLmEgJiYgZDIuYVswXVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0cmV0dXJuIGQxLmRlbHRhc1twXSA9IG5ldyAoZGVsdGFKcy5vcGVyYXRpb25zW3R5cGVdKShmbihhcmdzKSk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdGZ1bmN0aW9uIGFzc2VydERlZmluZWQodmFsLCBvcFR5cGUpIHtcblx0XHRcdFx0VS5hc3NlcnQoVS5pc0RlZmluZWQodmFsKSxcblx0XHRcdFx0XHRcdGBUaGUgb3BlcmF0aW9uICcke29wVHlwZX0nIGV4cGVjdHMgdGhlIHByb3BlcnR5IHRvIGJlIGRlZmluZWQuYCk7XG5cdFx0XHR9XG5cdFx0XHRmdW5jdGlvbiBhc3NlcnRVbmRlZmluZWQodmFsLCBvcFR5cGUpIHtcblx0XHRcdFx0VS5hc3NlcnQoVS5pc1VuZGVmaW5lZCh2YWwpLFxuXHRcdFx0XHRcdFx0YFRoZSBvcGVyYXRpb24gJyR7b3BUeXBlfScgZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgdW5kZWZpbmVkLmApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vXG5cdFx0XHQvLyBEZWx0YU1vZGVsXG5cdFx0XHQvL1xuXHRcdFx0Ly8gbW9kaWZ5ICAgICAgIC0gIChvYmplY3QsIFtEZWx0YV0pICAgPT4gKG9iamVjdCkgICAgICAgICAgICAgLSAgeyBkZWx0YXM6IHtTdHJpbmctPkRlbHRhfSB9XG5cdFx0XHQvL1xuXHRcdFx0Ly8gYWRkICAgICAgICAgIC0gICh1bmRlZmluZWQsIFQpICAgICAgPT4gKFQpICAgICAgICAgICAgICAgICAgLSAgeyBuZXdWYWx1ZTogVCB9XG5cdFx0XHQvLyByZW1vdmUgICAgICAgLSAgKFQpICAgICAgICAgICAgICAgICA9PiAodW5kZWZpbmVkKSAgICAgICAgICAtICB7IH1cblx0XHRcdC8vIHJlcGxhY2UgICAgICAtICAoVCwgVSkgICAgICAgICAgICAgID0+IChVKSAgICAgICAgICAgICAgICAgIC0gIHsgbmV3VmFsdWU6IFUgfVxuXHRcdFx0Ly8gcmVwbGFjZVdpdGggIC0gIChULCBUID0+IFUpICAgICAgICAgPT4gKFUpICAgICAgICAgICAgICAgICAgLSAgeyBuZXdWYWx1ZUZuOiBUID0+IFUgfVxuXHRcdFx0Ly9cblx0XHRcdC8vIGFsdGVyICAgICAgICAtICAoWypdLCBbRGVsdGFdKSAgICAgID0+IChbKl0pICAgICAgICAgICAgICAgIC0gIHsgYWx0ZXJhdGlvbnM6IFtBbHRlckFycmF5RGVsdGFdIH1cblx0XHRcdC8vIHByZXBlbmQgICAgICAtICAoWypdLCBUKSAgICAgICAgICAgID0+IChbKl0pICAgICAgICAgICAgICAgIC0gIHsgbmV3VmFsdWU6IFQgfVxuXHRcdFx0Ly8gaW5zZXJ0ICAgICAgIC0gIChbKl0sIFQpICAgICAgICAgICAgPT4gKFsqXSkgICAgICAgICAgICAgICAgLSAgeyBuZXdWYWx1ZTogVCB9XG5cdFx0XHQvLyBhcHBlbmQgICAgICAgLSAgKFsqXSwgVCkgICAgICAgICAgICA9PiAoWypdKSAgICAgICAgICAgICAgICAtICB7IG5ld1ZhbHVlOiBUIH1cblx0XHRcdC8vXG5cdFx0XHQvLyBhbHRlciAgICAgICAgLSAgKFQgPT4gVSwgW0RlbHRhXSkgICA9PiAoVCA9PiAqKSAgICAgICAgICAgICAtICB7IGFsdGVyYXRpb25zOiBbQWx0ZXJGbkRlbHRhXSB9XG5cdFx0XHQvLyBwcmVwZW5kICAgICAgLSAgKFQgPT4gVSwgVCA9PiB2b2lkKSA9PiAoVCA9PiBVKSAgICAgICAgICAgICAtICB7IG5ld0NvZGU6IFQgPT4gdm9pZCB9XG5cdFx0XHQvLyBpbnNlcnQgICAgICAgLSAgKFQgPT4gVSwgVCA9PiB2b2lkKSA9PiAoVCA9PiBVKSAgICAgICAgICAgICAtICB7IG5ld0NvZGU6IFQgPT4gdm9pZCB9XG5cdFx0XHQvLyBhcHBlbmQgICAgICAgLSAgKFQgPT4gVSwgVCA9PiBWKSAgICA9PiAoVCA9PiBWKSAgICAgICAgICAgICAtICB7IG5ld0NvZGU6IFQgPT4gViB9XG5cdFx0XHQvL1xuXHRcdFx0Ly8gYWZ0ZXIgICAgICAgIC0gIChUID0+IFA8VT4sIFA8VT4gPT4gVCA9PiBWKSA9PiAoVCA9PiBQPFY+KSAgLSAgeyBuZXdDb2RlOiBQPFU+ID0+IFQgPT4gViB9XG5cdFx0XHQvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vXG5cblx0XHRcdC8qIGRlY2xhcmluZyB0aGUgYmFzaWMgb3BlcmF0aW9uIHR5cGVzICovXG5cdFx0XHQvLyAnbW9kaWZ5JyBpcyB0aGUgbW9zdCBmdW5kYW1lbnRhbCBvcGVyYXRpb24sXG5cdFx0XHQvLyAgYW5kIGlzIGRlZmluZWQgYWJvdmUgcmF0aGVyIHRoYW4gaGVyZVxuXHRcdFx0dGhpcy5uZXdPcGVyYXRpb25UeXBlKCdhZGQnLCBmdW5jdGlvbiBhcHBseVRvKG9iaiwgcCkge1xuXHRcdFx0XHRhc3NlcnRVbmRlZmluZWQob2JqW3BdLCAnYWRkJyk7XG5cdFx0XHRcdG9ialtwXSA9IHRoaXMuYVswXTtcblx0XHRcdH0pO1xuXHRcdFx0dGhpcy5uZXdPcGVyYXRpb25UeXBlKCdyZW1vdmUnLCBmdW5jdGlvbiBhcHBseVRvKG9iaiwgcCkge1xuXHRcdFx0XHRhc3NlcnREZWZpbmVkKG9ialtwXSwgJ3JlbW92ZScpO1xuXHRcdFx0XHRkZWxldGUgb2JqW3BdO1xuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLm5ld09wZXJhdGlvblR5cGUoJ2ZvcmJpZCcsIGZ1bmN0aW9uIGFwcGx5VG8ob2JqLCBwKSB7XG5cdFx0XHRcdGFzc2VydFVuZGVmaW5lZChvYmpbcF0sICdmb3JiaWQnKTtcblx0XHRcdH0pO1xuXHRcdFx0dGhpcy5uZXdPcGVyYXRpb25UeXBlKCdyZXBsYWNlJywgZnVuY3Rpb24gYXBwbHlUbyhvYmosIHApIHtcblx0XHRcdFx0YXNzZXJ0RGVmaW5lZChvYmpbcF0sICdyZXBsYWNlJyk7XG5cdFx0XHRcdG9ialtwXSA9IHRoaXMuYVswXTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vXG5cblx0XHRcdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ21vZGlmeScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdtb2RpZnknLCAnbW9kaWZ5JywgKGQxLCBwLCBkMikgPT4ge1xuXHRcdFx0XHRPYmplY3Qua2V5cyhkMi5kZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0XHRkMS5jb21wb3NlKHAsIGQyLmRlbHRhc1twcm9wXSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm4gZDEuZGVsdGFzW3BdO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ2FkZCcgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdtb2RpZnknLCAnYWRkJyAgICwgZXJyb3IpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignYWRkJyAgICwgJ2FkZCcgICAsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ2FkZCcgICAsICdtb2RpZnknLCAoZDEsIHApID0+IG5ldyAoZGVsdGFKcy5vcGVyYXRpb25zWyd0YXJnZXRlZE1vZGlmeSddKShkMS5kZWx0YXNbcF0uYVswXSkpO1xuXG5cdFx0XHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdyZW1vdmUnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignbW9kaWZ5JywgJ3JlbW92ZScsIGQoJ3JlbW92ZScpKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ2FkZCcgICAsICdyZW1vdmUnLCBkKCdmb3JiaWQnKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdyZW1vdmUnLCAnbW9kaWZ5JywgZXJyb3IpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbigncmVtb3ZlJywgJ2FkZCcgICAsIGQoJ3JlcGxhY2UnLCAncDInKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdyZW1vdmUnLCAncmVtb3ZlJywgZXJyb3IpO1xuXG5cdFx0XHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdmb3JiaWQnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignbW9kaWZ5JywgJ2ZvcmJpZCcsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ2FkZCcgICAsICdmb3JiaWQnLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdyZW1vdmUnLCAnZm9yYmlkJywgZCgncmVtb3ZlJykpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignZm9yYmlkJywgJ21vZGlmeScsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ2ZvcmJpZCcsICdhZGQnICAgLCBkKCdhZGQnLCAncDInKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdmb3JiaWQnLCAncmVtb3ZlJywgZXJyb3IpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignZm9yYmlkJywgJ2ZvcmJpZCcsIGQoJ2ZvcmJpZCcpKTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAncmVwbGFjZScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ21vZGlmeScgLCAncmVwbGFjZScsIGQoJ3JlcGxhY2UnLCAncDInKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdhZGQnICAgICwgJ3JlcGxhY2UnLCBkKCdhZGQnLCAncDInKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdyZW1vdmUnICwgJ3JlcGxhY2UnLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdmb3JiaWQnICwgJ3JlcGxhY2UnLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdyZXBsYWNlJywgJ21vZGlmeScsIChkMSwgcCkgPT4gbmV3IChkZWx0YUpzLm9wZXJhdGlvbnNbJ3RhcmdldGVkTW9kaWZ5J10pKGQxLmRlbHRhc1twXS5hWzBdKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdyZXBsYWNlJywgJ2FkZCcgICAgLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdyZXBsYWNlJywgJ3JlbW92ZScgLCBkKCdyZW1vdmUnKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdyZXBsYWNlJywgJ2ZvcmJpZCcgLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdyZXBsYWNlJywgJ3JlcGxhY2UnLCBkKCdyZXBsYWNlJywgJ3AyJykpO1xuXG5cdFx0XHQvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vXG5cblx0XHRcdC8vLyogZGVjbGFyaW5nIHRoZSAnZGVsdGFNb2RlbCcgb3BlcmF0aW9uICovXG5cdFx0XHQvL3RoaXMubmV3T3BlcmF0aW9uVHlwZSgnZGVsdGFNb2RlbCcsIGZ1bmN0aW9uIGFwcGx5VG8ob2JqLCBwKSB7XG5cdFx0XHQvL1x0dGhpcy5hWzBdLnRvcG9sb2dpY2FsbHkoKHN1YkRlbHRhKSA9PiB7XG5cdFx0XHQvL1x0XHQvLyB0aGUgZ3JhcGggaXMgYWxsb3dlZCB0byBjb250YWluICdudWxsJyB2ZXJ0aWNlcyBmb3Igb3JkZXJpbmcgcHVycG9zZXNcblx0XHRcdC8vXHRcdGlmIChzdWJEZWx0YSkgeyBzdWJEZWx0YS5hcHBseVRvKG9iaiwgcCkgfVxuXHRcdFx0Ly9cdH0pO1xuXHRcdFx0Ly99LCB7XG5cdFx0XHQvL1xuXHRcdFx0Ly99KTtcblx0XHRcdC8vXG5cdFx0XHQvL1xuXHRcdFx0Ly8vKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdkZWx0YU1vZGVsJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0Ly8vLyB0byBjb21wb3NlIGRlbHRhIG1vZGVscywgd2Ugc2ltcGx5IGhhdmUgb25lIGFwcGx5IGFmdGVyIHRoZSBvdGhlclxuXHRcdFx0Ly8vLyB3aXRob3V0IGFueSBjb21wb3NhYmlsaXR5IGNoZWNrczsgaW4gdGhlIGZ1dHVyZSwgdGhpcyBtYXkgYmVjb21lIG1vcmUgY2xldmVyXG5cdFx0XHQvL3ZhciBvcmRlcmVkQnlTaW1wbGVEZWx0YU1vZGVsID0gKGQxLCBwLCBkMikgPT4ge1xuXHRcdFx0Ly9cdHZhciBncmFwaCA9IG5ldyBKc0dyYXBoKCk7XG5cdFx0XHQvL1x0Z3JhcGguYWRkTmV3VmVydGV4KDEsIGQxLmRlbHRhc1twXSk7XG5cdFx0XHQvL1x0Z3JhcGguYWRkTmV3VmVydGV4KDIsIGQyKTtcblx0XHRcdC8vXHRncmFwaC5hZGROZXdFZGdlKDEsIDIpO1xuXHRcdFx0Ly9cdHJldHVybiBkMS5kZWx0YXNbcF0gPSBuZXcgKGRlbHRhSnMub3BlcmF0aW9uc1snZGVsdGFNb2RlbCddKShncmFwaCk7XG5cdFx0XHQvL307XG5cdFx0XHQvL3RoaXMubmV3Q29tcG9zaXRpb24oJ21vZGlmeScsICAgICAnZGVsdGFNb2RlbCcsIG9yZGVyZWRCeVNpbXBsZURlbHRhTW9kZWwpO1xuXHRcdFx0Ly90aGlzLm5ld0NvbXBvc2l0aW9uKCdhZGQnLCAgICAgICAgJ2RlbHRhTW9kZWwnLCBvcmRlcmVkQnlTaW1wbGVEZWx0YU1vZGVsKTtcblx0XHRcdC8vdGhpcy5uZXdDb21wb3NpdGlvbigncmVtb3ZlJywgICAgICdkZWx0YU1vZGVsJywgb3JkZXJlZEJ5U2ltcGxlRGVsdGFNb2RlbCk7XG5cdFx0XHQvL3RoaXMubmV3Q29tcG9zaXRpb24oJ2ZvcmJpZCcsICAgICAnZGVsdGFNb2RlbCcsIG9yZGVyZWRCeVNpbXBsZURlbHRhTW9kZWwpO1xuXHRcdFx0Ly90aGlzLm5ld0NvbXBvc2l0aW9uKCdyZXBsYWNlJywgICAgJ2RlbHRhTW9kZWwnLCBvcmRlcmVkQnlTaW1wbGVEZWx0YU1vZGVsKTtcblx0XHRcdC8vdGhpcy5uZXdDb21wb3NpdGlvbignZGVsdGFNb2RlbCcsICdtb2RpZnknLCAgICAgb3JkZXJlZEJ5U2ltcGxlRGVsdGFNb2RlbCk7XG5cdFx0XHQvL3RoaXMubmV3Q29tcG9zaXRpb24oJ2RlbHRhTW9kZWwnLCAnYWRkJywgICAgICAgIG9yZGVyZWRCeVNpbXBsZURlbHRhTW9kZWwpO1xuXHRcdFx0Ly90aGlzLm5ld0NvbXBvc2l0aW9uKCdkZWx0YU1vZGVsJywgJ3JlbW92ZScsICAgICBvcmRlcmVkQnlTaW1wbGVEZWx0YU1vZGVsKTtcblx0XHRcdC8vdGhpcy5uZXdDb21wb3NpdGlvbignZGVsdGFNb2RlbCcsICdmb3JiaWQnLCAgICAgb3JkZXJlZEJ5U2ltcGxlRGVsdGFNb2RlbCk7XG5cdFx0XHQvL3RoaXMubmV3Q29tcG9zaXRpb24oJ2RlbHRhTW9kZWwnLCAncmVwbGFjZScsICAgIG9yZGVyZWRCeVNpbXBsZURlbHRhTW9kZWwpO1xuXHRcdFx0Ly90aGlzLm5ld0NvbXBvc2l0aW9uKCdkZWx0YU1vZGVsJywgJ2RlbHRhTW9kZWwnLCBvcmRlcmVkQnlTaW1wbGVEZWx0YU1vZGVsKTtcblxuXHRcdH1cblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXHR9KTtcblxuXG5cdHJldHVybiBEZWx0YUpzO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZGVsdGEuanNcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzFcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKCgpID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXG5cdFx0LyogY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGUgKi9cblx0XHRuZXdDbGFzcyhjb25zdHJ1Y3RvciwgcHJvdG90eXBlID0ge30pIHtcblx0XHRcdHZhciBjbHMgPSBjb25zdHJ1Y3Rvcjtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0LyogY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGUgKi9cblx0XHRuZXdTdWJjbGFzcyhzdXBlckNsYXNzLCBjb25zdHJ1Y3Rvck1ha2VyLCBwcm90b3R5cGUgPSB7fSkge1xuXHRcdFx0dmFyIGNscyA9IGNvbnN0cnVjdG9yTWFrZXIoc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IpO1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuXHRcdFx0VS5leHRlbmQoY2xzLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvKiAgZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXMgICAgICovXG5cdFx0LyogIG9mIHRoZSBvdGhlciBvYmplY3RzLCBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5zICAqL1xuXHRcdC8qICB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdFx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb2JqMTtcblx0XHR9LFxuXG5cdFx0LyogYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkIHdpdGggYW4gYXJyYXkgb2YgZm9ybWFsIHBhcmFtZXRlcnMgKi9cblx0XHRhcHBseUNvbnN0cnVjdG9yKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcblx0XHRcdHZhciBuZXdfb2JqID0gT2JqZWN0LmNyZWF0ZShDb25zdHJ1Y3RvckZuLnByb3RvdHlwZSk7XG5cdFx0XHRDb25zdHJ1Y3RvckZuLmFwcGx5KG5ld19vYmosIGFyZ3MpO1xuXHRcdFx0cmV0dXJuIG5ld19vYmo7XG5cdFx0fSxcblxuXHRcdC8qIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGEgY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZSAqL1xuXHRcdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdFx0fSxcblxuXHRcdC8qIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYCAqL1xuXHRcdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8qIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApICovXG5cdFx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8qIHJlcGVhdCBhIHN0cmluZyBhIGdpdmVuIG51bWJlciBvZiB0aW1lcyAqL1xuXHRcdHJlcGVhdChuciwgc3RyKSB7IHJldHVybiBuZXcgQXJyYXkobnIrMSkuam9pbihzdHIpIH1cblx0fTtcblxuXHRyZXR1cm4gVTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWlzYy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImRlbHRhLmpzIn0=