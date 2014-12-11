(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["DeltaModel"] = factory();
	else
		root["DeltaModel"] = factory();
})(this, function() {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function(U) {
	  'use strict';
	  var DeltaJs = U.newClass(function DeltaJs() {
	    var thisDeltaJs = this;
	    this.operations = {};
	    this.compositions = {};
	    this.operations.Delta = U.newClass(function() {});
	    this.compositions['modify'] = {'modify': []};
	    this.operations['modify'] = U.newSubclass(this.operations.Delta, (function(superFn) {
	      return function() {
	        superFn();
	        this.deltas = {};
	      };
	    }), {
	      type: 'modify',
	      applyTo: function(obj, prop) {
	        var $__0 = this;
	        if (U.isDefined(prop)) {
	          U.assert(obj[prop] instanceof Object, "The 'modify' operation expects the property to be an already defined Object.");
	          Object.keys(this.deltas).forEach((function(subProp) {
	            $__0.deltas[subProp].applyTo(obj[prop], subProp);
	          }));
	        } else {
	          U.assert(obj instanceof Object, "The 'modify' operation expects the property to be an already defined Object.");
	          Object.keys(this.deltas).forEach((function(subProp) {
	            $__0.deltas[subProp].applyTo(obj, subProp);
	          }));
	        }
	      },
	      compose: function(prop, other) {
	        var $__0 = this;
	        if (other) {
	          var thisDelta = this.deltas[prop];
	          var success = thisDeltaJs.compositions[thisDelta.type][other.type].some((function(comp) {
	            try {
	              comp($__0, prop, other);
	              return true;
	            } catch (__) {}
	            return false;
	          }));
	          U.assert(success, ("No composition is defined between '" + thisDelta.type + "' and '" + other.type + "'."));
	        }
	        return this;
	      },
	      modify: function(prop) {
	        return this._addOperation('modify', prop, []);
	      },
	      _addOperation: function(opType, prop, args) {
	        var $__0 = this;
	        var match = prop.match(/^([.#]?)(\w+|\(\w+\))(.*)$/);
	        U.assert(match, ("The path string '" + prop + "' is not well formed."));
	        if (match[1] === '#') {
	          return this._addOperation(opType, (".(instance)." + match[2] + match[3]), args);
	        }
	        var resultDelta;
	        if (match[3] === '') {
	          ((function(newDelta) {
	            if ($__0.deltas[match[2]]) {
	              $__0.compose(match[2], newDelta);
	            } else {
	              $__0.deltas[match[2]] = newDelta;
	            }
	          }))(U.applyConstructor(thisDeltaJs.operations[opType], [match[2]].concat(args)));
	          resultDelta = this.deltas[match[2]];
	        } else {
	          resultDelta = this.modify(match[2])._addOperation(opType, match[3], args);
	        }
	        return opType === 'modify' ? resultDelta : this;
	      },
	      toString: function() {
	        var indentLvl = arguments[0] !== (void 0) ? arguments[0] : 0;
	        var prop = arguments[1] !== (void 0) ? arguments[1] : '(root)';
	        var $__0 = this;
	        return (U.repeat(indentLvl, '    ') + "modify '" + prop + "'\n") + Object.keys(this.deltas).map((function(p) {
	          return $__0.deltas[p].toString(indentLvl + 1, p);
	        })).join('\n');
	      }
	    });
	    this._defineStandardOperationTypes();
	  }, {
	    newOperationType: function(name, applyTo) {
	      var $__0 = this;
	      U.assert(!this.operations[name], ("The '" + name + "' operation type already exists."));
	      this.operations.modify.prototype[name] = function(prop) {
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
	          superFn();
	          this.a = args;
	        };
	      }), {
	        type: name,
	        applyTo: applyTo,
	        toString: function() {
	          var indentLvl = arguments[0] !== (void 0) ? arguments[0] : 0;
	          var prop = arguments[1] !== (void 0) ? arguments[1] : '(root)';
	          return ("" + U.repeat(0 + indentLvl, '    ') + name + " '" + prop + "': " + JSON.stringify(this.a).slice(1, -1));
	        }
	      });
	    },
	    newComposition: function(type1, type2, compose) {
	      this.compositions[type1][type2].push(compose);
	    },
	    _defineStandardOperationTypes: function() {
	      var keepFirst = (function() {});
	      var keepSecond = (function(d1, p, d2) {
	        d1.deltas[p] = d2;
	      });
	      var applySecondToFirstValue = (function(d1, p, d2) {
	        d2.applyTo(d1.deltas[p].a, 0);
	      });
	      function assertFunction(val, opType) {
	        U.assert(typeof val === 'function', ("The operation '" + opType + "' expects the property it acts on to be a function."));
	      }
	      function assertObject(val, opType) {
	        U.assert(val instanceof Object, ("The operation '" + opType + "' expects the property it acts on to be an Object."));
	      }
	      function assertDefined(val, opType) {
	        U.assert(U.isDefined(val), ("The operation '" + opType + "' expects the property to be defined."));
	      }
	      function assertUndefined(val, opType) {
	        U.assert(U.isUndefined(val), ("The operation '" + opType + "' expects the property to be undefined."));
	      }
	      this.newComposition('modify', 'modify', (function(d1, p, d2) {
	        Object.keys(d2.deltas).forEach((function(prop) {
	          d1.compose(prop, d2.deltas[prop]);
	        }));
	      }));
	      this.newOperationType('add', function applyTo(obj, prop) {
	        assertUndefined(obj[prop], 'add');
	        obj[prop] = this.a[0];
	      });
	      this.newComposition('add', 'modify', (function(d1, p, d2) {
	        assertObject(d1.deltas[p].a[0], 'modify');
	        applySecondToFirstValue(d1, p, d2);
	      }));
	      this.newOperationType('remove', function applyTo(obj, p) {
	        assertDefined(obj[p], 'remove');
	        delete obj[p];
	      });
	      this.newComposition('modify', 'remove', keepSecond);
	      this.newComposition('add', 'remove', keepSecond);
	      this.newComposition('remove', 'add', (function(d1, p, d2) {}));
	    }
	  });
	  return DeltaJs;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 1 */
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
	    array: function(obj, name) {
	      if (U.isUndefined(obj[name])) {
	        obj[name] = [];
	      }
	      return obj[name];
	    },
	    bindA: function(fn, ctx, args) {
	      return fn.bind.apply(fn, [ctx].concat(args));
	    },
	    bind: function(obj, m) {
	      for (var args = [],
	          $__1 = 2; $__1 < arguments.length; $__1++)
	        args[$__1 - 2] = arguments[$__1];
	      return U.bindA(obj[m], obj, args);
	    },
	    applyConstructor: function(ConstructorFn, args) {
	      var NewConstructorFn = ConstructorFn.bind.apply(ConstructorFn, [null].concat(args));
	      return new NewConstructorFn();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2OTA0MDY1MTdlMWFlZmUxNTE4OCIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi9zcmMvbWlzYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7aUVDdENBLGlDQUFRLHVCQUFXLENBQUcsMENBQVU7QUFDL0IsY0FBVyxDQUFDO0FBTVIsYUFBTSxFQUFJLFdBQVUsQ0FBQyxRQUFTLFFBQU0sQ0FBRTtBQUVyQyxtQkFBVSxFQUFJLEtBQUcsQ0FBQztBQUd0QixRQUFHLFdBQVcsRUFBSSxHQUFDLENBQUM7QUFDcEIsUUFBRyxhQUFhLEVBQUksR0FBQyxDQUFDO0FBR3RCLFFBQUcsV0FBVyxNQUFNLEVBQUksV0FBVSxDQUFDLFNBQVUsQ0FBRSxHQUFDLENBQUMsQ0FBQztBQUdsRCxRQUFHLGFBQWEsQ0FBRSxRQUFPLENBQUMsRUFBSSxFQUFFLFFBQU8sQ0FBRyxHQUFDLENBQUUsQ0FBQztBQUk5QyxRQUFHLFdBQVcsQ0FBRSxRQUFPLENBQUMsRUFBSSxjQUFhLENBQUMsSUFBRyxXQUFXLE1BQU0sR0FBRyxTQUFD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LENBQUcsRUFBQyxJQUFHLENBQUMsT0FBUSxDQUFDLElBQUcsQ0FBQyxDQUFDLENBQUM7QUFDbkYsWUFBTyxJQUFJLGlCQUFnQixFQUFDLENBQUM7S0FDOUI7QUFJQSxVQUFLLENBQUwsVUFBTyxTQUFRLENBQUcsUUFBTSxDQUFHO0FBQzFCLFVBQUksQ0FBQyxTQUFRLENBQUc7QUFBRSxhQUFNLElBQUksTUFBSyxDQUFDLE9BQU0sR0FBSyxtQkFBaUIsQ0FBQztPQUFFO0FBQUEsS0FDbEU7QUFHQSxlQUFVLENBQVYsVUFBWSxHQUFFLENBQUc7QUFBRSxZQUFPLE9BQU8sSUFBRSxJQUFNLFlBQVU7S0FBRTtBQUdyRCxhQUFRLENBQVIsVUFBVSxHQUFFLENBQUc7QUFBRSxZQUFPLE9BQU8sSUFBRSxJQUFNLFlBQVU7S0FBRTtBQUduRCxVQUFLLENBQUwsVUFBTyxFQUFDLENBQUcsSUFBRSxDQUFHO0FBQUUsWUFBTyxJQUFJLE1BQUssQ0FBQyxFQUFDLEVBQUUsR0FBQyxLQUFNLENBQUMsR0FBRSxDQUFDO0tBQUU7QUFBQSxHQUNwRCxDQUFDO0FBRUQsUUFBTyxHQUFDO0FBQ1Qsd0pBQUU7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRGVsdGFNb2RlbFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEZWx0YU1vZGVsXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNjkwNDA2NTE3ZTFhZWZlMTUxODhcbiAqKi8iLCJkZWZpbmUoWycuL21pc2MuanMnXSwgZnVuY3Rpb24gKFUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0LyoqIHtAY2xhc3MgRGVsdGFKc31cblx0ICpcblx0ICovXG5cdHZhciBEZWx0YUpzID0gVS5uZXdDbGFzcyhmdW5jdGlvbiBEZWx0YUpzKCkge1xuXG5cdFx0dmFyIHRoaXNEZWx0YUpzID0gdGhpcztcblxuXHRcdC8qIHRoZSB0aGluZ3MgaW5zdGFuY2VzIG9mICdEZWx0YUpzJyBrZWVwcyB0cmFjayBvZiAqL1xuXHRcdHRoaXMub3BlcmF0aW9ucyA9IHt9OyAgIC8vIHByb3BlcnR5IC0+IERlbHRhXG5cdFx0dGhpcy5jb21wb3NpdGlvbnMgPSB7fTsgLy8gdHlwZTEgLT4gdHlwZTIgLT4gW2NvbXBvc2VGbl1cblxuXHRcdC8qIGRlZmluZSB0aGUgYmFzZSAnRGVsdGEnIGNsYXNzICovXG5cdFx0dGhpcy5vcGVyYXRpb25zLkRlbHRhID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoKSB7fSk7XG5cblx0XHQvKiBwdXQgdGhlIHJpZ2h0IGZvdW5kYXRpb24gaW4gJ3RoaXMuY29tcG9zaXRpb24nICovXG5cdFx0dGhpcy5jb21wb3NpdGlvbnNbJ21vZGlmeSddID0geyAnbW9kaWZ5JzogW10gfTtcblxuXHRcdC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vXG5cdFx0LyogZGVmaW5lIHRoZSBmdW5kYW1lbnRhbCAnbW9kaWZ5JyBkZWx0YSAqL1xuXHRcdHRoaXMub3BlcmF0aW9uc1snbW9kaWZ5J10gPSBVLm5ld1N1YmNsYXNzKHRoaXMub3BlcmF0aW9ucy5EZWx0YSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uICgpIHtcblx0XHRcdHN1cGVyRm4oKTtcblx0XHRcdHRoaXMuZGVsdGFzID0ge307XG5cdFx0fSwge1xuXG5cdFx0XHR0eXBlOiAnbW9kaWZ5JyxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSBvYmogIHtPYmplY3R9XG5cdFx0XHQgKiBAcGFyYW0gcHJvcCB7U3RyaW5nfVxuXHRcdFx0ICovXG5cdFx0XHRhcHBseVRvKG9iaiwgcHJvcCkge1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQocHJvcCkpIHtcblx0XHRcdFx0XHQvKiBpZiBhIHByb3BlcnR5IGlzIHBhc3NlZCwgYXBwbHkgdGhpcyBkZWx0YSB0byBgb2JqW3Byb3BdYCAqL1xuXHRcdFx0XHRcdFUuYXNzZXJ0KG9ialtwcm9wXSBpbnN0YW5jZW9mIE9iamVjdCxcblx0XHRcdFx0XHRcdFx0YFRoZSAnbW9kaWZ5JyBvcGVyYXRpb24gZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgYW4gYWxyZWFkeSBkZWZpbmVkIE9iamVjdC5gKTtcblx0XHRcdFx0XHRPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykuZm9yRWFjaCgoc3ViUHJvcCkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWx0YXNbc3ViUHJvcF0uYXBwbHlUbyhvYmpbcHJvcF0sIHN1YlByb3ApO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8qIGlmIGEgcHJvcGVydHkgaXMgbm90IHBhc3NlZCwgYXBwbHkgdGhpcyBkZWx0YSB0byBgb2JqYCAqL1xuXHRcdFx0XHRcdFUuYXNzZXJ0KG9iaiBpbnN0YW5jZW9mIE9iamVjdCxcblx0XHRcdFx0XHRcdFx0YFRoZSAnbW9kaWZ5JyBvcGVyYXRpb24gZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgYW4gYWxyZWFkeSBkZWZpbmVkIE9iamVjdC5gKTtcblx0XHRcdFx0XHRPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykuZm9yRWFjaCgoc3ViUHJvcCkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWx0YXNbc3ViUHJvcF0uYXBwbHlUbyhvYmosIHN1YlByb3ApO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHByb3AgIHtTdHJpbmd9XG5cdFx0XHQgKiBAcGFyYW0gb3RoZXIge0RlbHRhSnMjb3BlcmF0aW9ucy5EZWx0YX1cblx0XHRcdCAqL1xuXHRcdFx0Y29tcG9zZShwcm9wLCBvdGhlcikge1xuXG5cdFx0XHRcdGlmIChvdGhlcikge1xuXHRcdFx0XHRcdHZhciB0aGlzRGVsdGEgPSB0aGlzLmRlbHRhc1twcm9wXTtcblx0XHRcdFx0XHR2YXIgc3VjY2VzcyA9IHRoaXNEZWx0YUpzLmNvbXBvc2l0aW9uc1t0aGlzRGVsdGEudHlwZV1bb3RoZXIudHlwZV0uc29tZSgoY29tcCkgPT4ge1xuXHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0Y29tcCh0aGlzLCBwcm9wLCBvdGhlcik7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0fSBjYXRjaCAoX18pIHt9XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0VS5hc3NlcnQoc3VjY2Vzcyxcblx0XHRcdFx0XHRcdFx0YE5vIGNvbXBvc2l0aW9uIGlzIGRlZmluZWQgYmV0d2VlbiAnJHt0aGlzRGVsdGEudHlwZX0nIGFuZCAnJHtvdGhlci50eXBlfScuYCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0gcHJvcCB7U3RyaW5nfVxuXHRcdFx0ICovXG5cdFx0XHRtb2RpZnkocHJvcCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fYWRkT3BlcmF0aW9uKCdtb2RpZnknLCBwcm9wLCBbXSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSBvcFR5cGUge1N0cmluZ31cblx0XHRcdCAqIEBwYXJhbSBwcm9wICAge1N0cmluZ31cblx0XHRcdCAqIEBwYXJhbSBhcmdzICAge1sqXX1cblx0XHRcdCAqL1xuXHRcdFx0X2FkZE9wZXJhdGlvbihvcFR5cGUsIHByb3AsIGFyZ3MpIHtcblxuXHRcdFx0XHQvKiBkaXNzZWN0IHRoZSAncHJvcCcgc3RyaW5nICovXG5cdFx0XHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyAgMTExMTEgIDIyMjIyMjIyMjIyICAzMyAgLy9cblx0XHRcdFx0dmFyIG1hdGNoID0gcHJvcC5tYXRjaCgvXihbLiNdPykoXFx3K3xcXChcXHcrXFwpKSguKikkLyk7XG5cdFx0XHRcdFUuYXNzZXJ0KG1hdGNoLCBgVGhlIHBhdGggc3RyaW5nICcke3Byb3B9JyBpcyBub3Qgd2VsbCBmb3JtZWQuYCk7XG5cblx0XHRcdFx0LyogaWYgJ3Byb3AnIGhhcyBhIGxlYWRpbmcgJyMnIGNoYXJhY3RlciwgdHJhbnNmb3JtIGl0IGFuZCByZWNhbGwgdGhpcyBtZXRob2QgKi9cblx0XHRcdFx0aWYgKG1hdGNoWzFdID09PSAnIycpIHtcblx0XHRcdFx0XHQvLyB0aGUgIyBzZXBhcmF0b3IgZXhwZWN0cyB0aGUgY3VycmVudCBvYmplY3QgdG8gYmUgYSBjb25zdHJ1Y3RvciBmdW5jdGlvbixcblx0XHRcdFx0XHQvLyBhbmQgeWllbGRzIGEgZGVsdGEgdG8gbW9kaWZ5IG5ldyBpbnN0YW5jZXMgb2YgdGhlIGNvcnJlc3BvbmRpbmcgY2xhc3Ncblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fYWRkT3BlcmF0aW9uKG9wVHlwZSwgYC4oaW5zdGFuY2UpLiR7bWF0Y2hbMl19JHttYXRjaFszXX1gLCBhcmdzKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qIGNyZWF0ZSB0aGUgcmVzdWx0aW5nIGRlbHRhLCBwb3NzaWJseSBjYWxsaW5nIHRoaXMgbWV0aG9kIHJlY3Vyc2l2ZWx5IGZvciBhIGxvbmdlciBjaGFpbiAqL1xuXHRcdFx0XHR2YXIgcmVzdWx0RGVsdGE7XG5cdFx0XHRcdGlmIChtYXRjaFszXSA9PT0gJycpIHtcblx0XHRcdFx0XHQoKG5ld0RlbHRhKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5kZWx0YXNbbWF0Y2hbMl1dKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuY29tcG9zZShtYXRjaFsyXSwgbmV3RGVsdGEpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5kZWx0YXNbbWF0Y2hbMl1dID0gbmV3RGVsdGE7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSkoVS5hcHBseUNvbnN0cnVjdG9yKHRoaXNEZWx0YUpzLm9wZXJhdGlvbnNbb3BUeXBlXSwgW21hdGNoWzJdXS5jb25jYXQoYXJncykpKTtcblx0XHRcdFx0XHRyZXN1bHREZWx0YSA9IHRoaXMuZGVsdGFzW21hdGNoWzJdXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXN1bHREZWx0YSA9IHRoaXMubW9kaWZ5KG1hdGNoWzJdKS5fYWRkT3BlcmF0aW9uKG9wVHlwZSwgbWF0Y2hbM10sIGFyZ3MpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyogaWYgdGhpcyBvcGVyYXRpb24gd2FzIGEgbW9kaWZpY2F0aW9uLCByZXR1cm4gdGhlIG5ldyBkZWx0YTsgb3RoZXJ3aXNlLCByZXR1cm4gdGhpcyBkZWx0YSAqL1xuXHRcdFx0XHRyZXR1cm4gb3BUeXBlID09PSAnbW9kaWZ5JyA/IHJlc3VsdERlbHRhIDogdGhpcztcblxuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSBpbmRlbnRMdmwge051bWJlcj99XG5cdFx0XHQgKiBAcGFyYW0gcHJvcGVydHkgIHtTdHJpbmc/fVxuXHRcdFx0ICovXG5cdFx0XHR0b1N0cmluZyhpbmRlbnRMdmwgPSAwLCBwcm9wID0gJyhyb290KScpIHtcblx0XHRcdFx0cmV0dXJuIGAke1UucmVwZWF0KGluZGVudEx2bCwgJyAgICAnKX1tb2RpZnkgJyR7cHJvcH0nXFxuYCArXG5cdFx0XHRcdFx0XHRPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykubWFwKChwKSA9PiB0aGlzLmRlbHRhc1twXS50b1N0cmluZyhpbmRlbnRMdmwgKyAxLCBwKSkuam9pbignXFxuJyk7XG5cdFx0XHR9XG5cblx0XHR9KTtcblx0XHQvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvL1xuXG5cblx0XHQvKiBkZWZpbmUgc3RhbmRhcmQgb3BlcmF0aW9ucyAqL1xuXHRcdHRoaXMuX2RlZmluZVN0YW5kYXJkT3BlcmF0aW9uVHlwZXMoKTtcblxuXG5cdH0sIC8qKiBAbGVuZHMgRGVsdGFKcy5wcm90b3R5cGUgKi8gIHtcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSBuYW1lICAgIHtTdHJpbmd9XG5cdFx0ICogQHBhcmFtIGFwcGx5VG8geyhEZWx0YUpzI29wZXJhdGlvbnMuRGVsdGEsIE9iamVjdCwgU3RyaW5nKSA9PiB1bmRlZmluZWR9XG5cdFx0ICovXG5cdFx0bmV3T3BlcmF0aW9uVHlwZShuYW1lLCBhcHBseVRvKSB7XG5cblx0XHRcdC8qIHNhbml0eSBjaGVja3MgKi9cblx0XHRcdFUuYXNzZXJ0KCF0aGlzLm9wZXJhdGlvbnNbbmFtZV0sXG5cdFx0XHRcdFx0YFRoZSAnJHtuYW1lfScgb3BlcmF0aW9uIHR5cGUgYWxyZWFkeSBleGlzdHMuYCk7XG5cblx0XHRcdC8qIGNyZWF0ZSB0aGUgY29ycmVzcG9uZGluZyBtZXRob2QgaW4gdGhlICdtb2RpZnknIGRlbHRhICovXG5cdFx0XHR0aGlzLm9wZXJhdGlvbnMubW9kaWZ5LnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uIChwcm9wLCAuLi5hcmdzKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9hZGRPcGVyYXRpb24obmFtZSwgcHJvcCwgYXJncyk7XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiBwdXQgdGhlIHJpZ2h0IGZvdW5kYXRpb24gaW4gJ3RoaXMuY29tcG9zaXRpb24nICovXG5cdFx0XHR0aGlzLmNvbXBvc2l0aW9uc1tuYW1lXSA9IHt9O1xuXHRcdFx0T2JqZWN0LmtleXModGhpcy5jb21wb3NpdGlvbnMpLmZvckVhY2goKHR5cGUpID0+IHtcblx0XHRcdFx0VS5hc3NlcnQoIXRoaXMuY29tcG9zaXRpb25zW3R5cGVdW25hbWVdKTtcblx0XHRcdFx0VS5hc3NlcnQoIXRoaXMuY29tcG9zaXRpb25zW25hbWVdW3R5cGVdKTtcblx0XHRcdFx0dGhpcy5jb21wb3NpdGlvbnNbdHlwZV1bbmFtZV0gPSBbXTtcblx0XHRcdFx0dGhpcy5jb21wb3NpdGlvbnNbbmFtZV1bdHlwZV0gPSBbXTtcblx0XHRcdH0pO1xuXG5cblx0XHRcdC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy9cblx0XHRcdC8qIGNyZWF0ZSB0aGUgRGVsdGEgc3VwZXJjbGFzcyByZXByZXNlbnRpbmcgdGhpcyBvcGVyYXRpb24gdHlwZSAqL1xuXHRcdFx0dGhpcy5vcGVyYXRpb25zW25hbWVdID0gVS5uZXdTdWJjbGFzcyh0aGlzLm9wZXJhdGlvbnMuRGVsdGEsIChzdXBlckZuKSA9PiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRzdXBlckZuKCk7XG5cdFx0XHRcdHRoaXMuYSA9IGFyZ3M7XG5cdFx0XHR9LCB7XG5cdFx0XHRcdHR5cGU6IG5hbWUsXG5cdFx0XHRcdGFwcGx5VG86IGFwcGx5VG8sXG5cblx0XHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0XHQgKiBAcGFyYW0gaW5kZW50THZsIHtOdW1iZXI/fVxuXHRcdFx0XHQgKiBAcGFyYW0gcHJvcGVydHkgIHtTdHJpbmc/fVxuXHRcdFx0XHQgKi9cblx0XHRcdFx0dG9TdHJpbmcoaW5kZW50THZsID0gMCwgcHJvcCA9ICcocm9vdCknKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGAke1UucmVwZWF0KDAgKyBpbmRlbnRMdmwsICcgICAgJyl9JHtuYW1lfSAnJHtwcm9wfSc6ICR7SlNPTi5zdHJpbmdpZnkodGhpcy5hKS5zbGljZSgxLCAtMSl9YDtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHQvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vXG5cblxuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gdHlwZTEgICB7U3RyaW5nfVxuXHRcdCAqIEBwYXJhbSB0eXBlMiAgIHtTdHJpbmd9XG5cdFx0ICogQHBhcmFtIGNvbXBvc2UgeyhEZWx0YUpzI29wZXJhdGlvbnMubW9kaWZ5LCBTdHJpbmcsIERlbHRhSnMjb3BlcmF0aW9ucy5EZWx0YSkgPT4gdW5kZWZpbmVkfVxuXHRcdCAqL1xuXHRcdG5ld0NvbXBvc2l0aW9uKHR5cGUxLCB0eXBlMiwgY29tcG9zZSkge1xuXHRcdFx0dGhpcy5jb21wb3NpdGlvbnNbdHlwZTFdW3R5cGUyXS5wdXNoKGNvbXBvc2UpO1xuXHRcdH0sXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdCAqXG5cdFx0ICovXG5cdFx0X2RlZmluZVN0YW5kYXJkT3BlcmF0aW9uVHlwZXMoKSB7XG5cblx0XHRcdC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy9cblxuXHRcdFx0LyogY29udmVuaWVuY2UgZGVmaW5pdGlvbnMgZm9yIHRoZSBhcHBsaWNhdGlvbiBhbmQgY29tcG9zaXRpb24gZnVuY3Rpb25zIGJlbG93ICovXG5cdFx0XHR2YXIga2VlcEZpcnN0ID0gKCkgPT4ge307XG5cdFx0XHR2YXIga2VlcFNlY29uZCA9IChkMSwgcCwgZDIpID0+IHsgZDEuZGVsdGFzW3BdID0gZDIgfTtcblx0XHRcdHZhciBhcHBseVNlY29uZFRvRmlyc3RWYWx1ZSA9IChkMSwgcCwgZDIpID0+IHsgZDIuYXBwbHlUbyhkMS5kZWx0YXNbcF0uYSwgMCkgfTtcblxuXHRcdFx0ZnVuY3Rpb24gYXNzZXJ0RnVuY3Rpb24odmFsLCBvcFR5cGUpIHtcblx0XHRcdFx0VS5hc3NlcnQodHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJyxcblx0XHRcdFx0XHRcdGBUaGUgb3BlcmF0aW9uICcke29wVHlwZX0nIGV4cGVjdHMgdGhlIHByb3BlcnR5IGl0IGFjdHMgb24gdG8gYmUgYSBmdW5jdGlvbi5gKTtcblx0XHRcdH1cblx0XHRcdGZ1bmN0aW9uIGFzc2VydE9iamVjdCh2YWwsIG9wVHlwZSkge1xuXHRcdFx0XHRVLmFzc2VydCh2YWwgaW5zdGFuY2VvZiBPYmplY3QsXG5cdFx0XHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnJHtvcFR5cGV9JyBleHBlY3RzIHRoZSBwcm9wZXJ0eSBpdCBhY3RzIG9uIHRvIGJlIGFuIE9iamVjdC5gKTtcblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gYXNzZXJ0RGVmaW5lZCh2YWwsIG9wVHlwZSkge1xuXHRcdFx0XHRVLmFzc2VydChVLmlzRGVmaW5lZCh2YWwpLFxuXHRcdFx0XHRcdFx0YFRoZSBvcGVyYXRpb24gJyR7b3BUeXBlfScgZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgZGVmaW5lZC5gKTtcblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gYXNzZXJ0VW5kZWZpbmVkKHZhbCwgb3BUeXBlKSB7XG5cdFx0XHRcdFUuYXNzZXJ0KFUuaXNVbmRlZmluZWQodmFsKSxcblx0XHRcdFx0XHRcdGBUaGUgb3BlcmF0aW9uICcke29wVHlwZX0nIGV4cGVjdHMgdGhlIHByb3BlcnR5IHRvIGJlIHVuZGVmaW5lZC5gKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvL1xuXG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdtb2RpZnknLCAnbW9kaWZ5JywgKGQxLCBwLCBkMikgPT4ge1xuXHRcdFx0XHRPYmplY3Qua2V5cyhkMi5kZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0XHRkMS5jb21wb3NlKHByb3AsIGQyLmRlbHRhc1twcm9wXSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMubmV3T3BlcmF0aW9uVHlwZSgnYWRkJywgZnVuY3Rpb24gYXBwbHlUbyhvYmosIHByb3ApIHtcblx0XHRcdFx0YXNzZXJ0VW5kZWZpbmVkKG9ialtwcm9wXSwgJ2FkZCcpO1xuXHRcdFx0XHRvYmpbcHJvcF0gPSB0aGlzLmFbMF07XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly90aGlzLm5ld0NvbXBvc2l0aW9uKCdtb2RpZnknLCAnYWRkJywgKGQxLCBwLCBkMikgPT4geyBlcnJvciB9KTtcblxuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignYWRkJywgJ21vZGlmeScsIChkMSwgcCwgZDIpID0+IHtcblx0XHRcdFx0YXNzZXJ0T2JqZWN0KGQxLmRlbHRhc1twXS5hWzBdLCAnbW9kaWZ5Jyk7XG5cdFx0XHRcdGFwcGx5U2Vjb25kVG9GaXJzdFZhbHVlKGQxLCBwLCBkMik7XG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5uZXdPcGVyYXRpb25UeXBlKCdyZW1vdmUnLCBmdW5jdGlvbiBhcHBseVRvKG9iaiwgcCkge1xuXHRcdFx0XHRhc3NlcnREZWZpbmVkKG9ialtwXSwgJ3JlbW92ZScpO1xuXHRcdFx0XHRkZWxldGUgb2JqW3BdO1xuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ21vZGlmeScsICdyZW1vdmUnLCBrZWVwU2Vjb25kKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ2FkZCcsICdyZW1vdmUnLCBrZWVwU2Vjb25kKTtcblx0XHRcdC8vdGhpcy5uZXdDb21wb3NpdGlvbigncmVtb3ZlJywgJ21vZGlmeScsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ3JlbW92ZScsICdhZGQnLCAoZDEsIHAsIGQyKSA9PiB7ICB9KTsgLy8gVE9ETzogcmVwbGFjZVxuXG5cblx0XHR9XG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblx0fSk7XG5cblxuXHRyZXR1cm4gRGVsdGFKcztcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2RlbHRhLmpzXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xXG4gKiovIiwiZGVmaW5lKCgpID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdDbGFzcyhjb25zdHJ1Y3RvciwgcHJvdG90eXBlID0ge30pIHtcblx0XHRcdHZhciBjbHMgPSBjb25zdHJ1Y3Rvcjtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdTdWJjbGFzcyhzdXBlckNsYXNzLCBjb25zdHJ1Y3Rvck1ha2VyLCBwcm90b3R5cGUgPSB7fSkge1xuXHRcdFx0dmFyIGNscyA9IGNvbnN0cnVjdG9yTWFrZXIoc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IpO1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuXHRcdFx0VS5leHRlbmQoY2xzLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvLyBleHRlbmQgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllc1xuXHRcdC8vIG9mIHRoZSBvdGhlciBvYmplY3RzLCBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5zXG5cdFx0Ly8gdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Rcblx0XHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdFx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb2JqMTtcblx0XHR9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBhcnJheSBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYW4gYXJyYXksIG1ha2UgaXQgYW4gZW1wdHkgYXJyYXkgZmlyc3Rcblx0XHRhcnJheShvYmosIG5hbWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0gW10gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgdGFraW5nIGFuIGFycmF5IGxpa2UgYEZ1bmN0aW9uLmFwcGx5YCBkb2VzXG5cdFx0YmluZEEoZm4sIGN0eCwgYXJncykgeyByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKSB9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgb25seSBoYXZpbmcgdG8gc3BlY2lmeSB0aGUgY29udGV4dC1vYmplY3Qgb25jZVxuXHRcdGJpbmQob2JqLCBtLCAuLi5hcmdzKSB7IHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkXG5cdFx0Ly8gd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVyc1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIE5ld0NvbnN0cnVjdG9yRm4gPSBDb25zdHJ1Y3RvckZuLmJpbmQuYXBwbHkoQ29uc3RydWN0b3JGbiwgW251bGxdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRyZXR1cm4gbmV3IE5ld0NvbnN0cnVjdG9yRm4oKTtcblx0XHR9LFxuXG5cdFx0Ly8gYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYVxuXHRcdC8vIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWVcblx0XHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHRcdH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGBcblx0XHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKVxuXHRcdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyByZXBlYXQgYSBzdHJpbmcgYSBnaXZlbiBudW1iZXIgb2YgdGltZXNcblx0XHRyZXBlYXQobnIsIHN0cikgeyByZXR1cm4gbmV3IEFycmF5KG5yKzEpLmpvaW4oc3RyKSB9XG5cdH07XG5cblx0cmV0dXJuIFU7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21pc2MuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJkZWx0YS5qcyJ9