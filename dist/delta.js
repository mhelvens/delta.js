(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["DeltaJs"] = factory();
	else
		root["DeltaJs"] = factory();
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
	          }))(U.applyConstructor(thisDeltaJs.operations[opType], args));
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
	        var indent = U.repeat(0 + indentLvl, '    ');
	        return (indent + "modify '" + prop + "'\n") + Object.keys(this.deltas).map((function(p) {
	          return $__0.deltas[p].toString(indentLvl + 1, p);
	        })).join('\n');
	      }
	    });
	    this._defineStandardOperationTypes();
	  }, {
	    get Delta() {
	      return this.operations['modify'];
	    },
	    vp: function(vpName, val) {},
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
	          var indent = U.repeat(0 + indentLvl, '    ');
	          return ("" + indent + name + " '" + prop + "': " + JSON.stringify(this.a).slice(1, -1));
	        }
	      });
	    },
	    newComposition: function(type1, type2, compose) {
	      this.compositions[type1][type2].push(compose);
	    },
	    _defineStandardOperationTypes: function() {
	      var deltaJs = this;
	      var keepFirst = (function() {});
	      var keepSecond = (function(d1, p, d2) {
	        d1.deltas[p] = d2;
	      });
	      var applySecondToFirst = (function(d1, p, d2) {
	        d2.applyTo(d1.deltas[p].a, 0);
	      });
	      var error = (function(d1, p, d2) {
	        throw new Error(("You cannot follow '" + d1[p].type + "' with '" + d2.type + "'."));
	      });
	      function d(type) {
	        var fn = arguments[1] !== (void 0) ? arguments[1] : (function() {
	          return null;
	        });
	        if (typeof fn === 'string') {
	          fn = ((function(v) {
	            return (function(o) {
	              return o[v];
	            });
	          }))(fn);
	        }
	        return (function(d1, p, d2) {
	          d1.deltas[p] = U.applyConstructor(deltaJs.operations[type], [fn({
	            d1: d1.deltas[p],
	            d2: d2,
	            p1: d1.deltas[p].a[0],
	            p2: d2.a[0]
	          })]);
	        });
	      }
	      function v(thing) {
	        return (function(o) {
	          return o[thing];
	        });
	      }
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
	      }));
	      this.newComposition('modify', 'add', error);
	      this.newComposition('add', 'add', error);
	      this.newComposition('add', 'modify', d('add', (function($__3) {
	        var $__4 = $__3,
	            d2 = $__4.d2,
	            p1 = $__4.p1;
	        return d2.appliedTo(p1);
	      })));
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
	      this.newComposition('replace', 'add', error);
	      this.newComposition('replace', 'remove', d('remove'));
	      this.newComposition('replace', 'forbid', error);
	      this.newComposition('replace', 'modify', d('replace', (function($__3) {
	        var $__4 = $__3,
	            d2 = $__4.d2,
	            p1 = $__4.p1;
	        return d2.appliedTo(p1);
	      })));
	      this.newComposition('replace', 'replace', d('replace', 'p2'));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5NTUwNmI4ZDZiNGQ1ZjlmNjViOCIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi9zcmMvbWlzYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7aUVDdENBLGlDQUFRLHVCQUFXLENBQUcsMENBQVU7QUFDL0IsY0FBVyxDQUFDO0FBTVIsYUFBTSxFQUFJLFdBQVUsQ0FBQyxRQUFTLFFBQU0sQ0FBRTtBQUVyQyxtQkFBVSxFQUFJLEtBQUcsQ0FBQztBQUd0QixRQUFHLFdBQVcsRUFBSSxHQUFDLENBQUM7QUFDcEIsUUFBRyxhQUFhLEVBQUksR0FBQyxDQUFDO0FBR3RCLFFBQUcsV0FBVyxNQUFNLEVBQUksV0FBVSxDQUFDLFNBQVUsQ0FBRSxHQUFDLENBQUMsQ0FBQztBQUdsRCxRQUFHLGFBQWEsQ0FBRSxRQUFPLENBQUMsRUFBSSxFQUFFLFFBQU8sQ0FBRyxHQUFDLENBQUUsQ0FBQztBQUk5QyxRQUFHLFdBQVcsQ0FBRSxRQUFPLENBQUMsRUFBSSxjQUFhLENBQUMsSUFBRyxXQUFXLE1BQU0sR0FBRyxTQUFD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T0FBSyx5QkFBMEIsQ0FBQyxHQUFFLENBQUcsSUFBRSxDQUFDLENBQUMsQ0FBQztXQUM1RTtBQUFBLFNBQ0Q7QUFBQSxPQUNELEVBQUMsQ0FBQztBQUNGLFlBQU8sS0FBRyxDQUFDO0tBQ1o7QUFHQSxvQkFBZSxDQUFmLFVBQWlCLGFBQVksQ0FBRyxLQUFHLENBQUc7QUFDakMsaUJBQU0sRUFBSSxPQUFLLE9BQVEsQ0FBQyxhQUFZLFVBQVUsQ0FBQyxDQUFDO0FBQ3BELG1CQUFZLE1BQU8sQ0FBQyxPQUFNLENBQUcsS0FBRyxDQUFDLENBQUM7QUFDbEMsWUFBTyxRQUFNLENBQUM7S0FDZjtBQUdBLFVBQUssQ0FBTCxVQUFPLFNBQVEsQ0FBRyxRQUFNLENBQUc7QUFDMUIsVUFBSSxDQUFDLFNBQVEsQ0FBRztBQUFFLGFBQU0sSUFBSSxNQUFLLENBQUMsT0FBTSxHQUFLLG1CQUFpQixDQUFDO09BQUU7QUFBQSxLQUNsRTtBQUdBLGVBQVUsQ0FBVixVQUFZLEdBQUUsQ0FBRztBQUFFLFlBQU8sT0FBTyxJQUFFLElBQU0sWUFBVTtLQUFFO0FBR3JELGFBQVEsQ0FBUixVQUFVLEdBQUUsQ0FBRztBQUFFLFlBQU8sT0FBTyxJQUFFLElBQU0sWUFBVTtLQUFFO0FBR25ELFVBQUssQ0FBTCxVQUFPLEVBQUMsQ0FBRyxJQUFFLENBQUc7QUFBRSxZQUFPLElBQUksTUFBSyxDQUFDLEVBQUMsRUFBRSxHQUFDLEtBQU0sQ0FBQyxHQUFFLENBQUM7S0FBRTtBQUFBLEdBQ3BELENBQUM7QUFFRCxRQUFPLEdBQUM7QUFDVCx3SkFBRTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJEZWx0YUpzXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkRlbHRhSnNcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA5NTUwNmI4ZDZiNGQ1ZjlmNjViOFxuICoqLyIsImRlZmluZShbJy4vbWlzYy5qcyddLCBmdW5jdGlvbiAoVSkge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHQvKioge0BjbGFzcyBEZWx0YUpzfVxuXHQgKlxuXHQgKi9cblx0dmFyIERlbHRhSnMgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIERlbHRhSnMoKSB7XG5cblx0XHR2YXIgdGhpc0RlbHRhSnMgPSB0aGlzO1xuXG5cdFx0LyogdGhlIHRoaW5ncyBpbnN0YW5jZXMgb2YgJ0RlbHRhSnMnIGtlZXBzIHRyYWNrIG9mICovXG5cdFx0dGhpcy5vcGVyYXRpb25zID0ge307ICAgLy8gcHJvcGVydHkgLT4gRGVsdGFcblx0XHR0aGlzLmNvbXBvc2l0aW9ucyA9IHt9OyAvLyB0eXBlMSAtPiB0eXBlMiAtPiBbY29tcG9zZUZuXVxuXG5cdFx0LyogZGVmaW5lIHRoZSBiYXNlICdEZWx0YScgY2xhc3MgKi9cblx0XHR0aGlzLm9wZXJhdGlvbnMuRGVsdGEgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uICgpIHt9KTtcblxuXHRcdC8qIHB1dCB0aGUgcmlnaHQgZm91bmRhdGlvbiBpbiAndGhpcy5jb21wb3NpdGlvbicgKi9cblx0XHR0aGlzLmNvbXBvc2l0aW9uc1snbW9kaWZ5J10gPSB7ICdtb2RpZnknOiBbXSB9O1xuXG5cdFx0Ly8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy9cblx0XHQvKiBkZWZpbmUgdGhlIGZ1bmRhbWVudGFsICdtb2RpZnknIGRlbHRhICovXG5cdFx0dGhpcy5vcGVyYXRpb25zWydtb2RpZnknXSA9IFUubmV3U3ViY2xhc3ModGhpcy5vcGVyYXRpb25zLkRlbHRhLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKCkge1xuXHRcdFx0c3VwZXJGbigpO1xuXHRcdFx0dGhpcy5kZWx0YXMgPSB7fTtcblx0XHR9LCB7XG5cblx0XHRcdHR5cGU6ICdtb2RpZnknLFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIG9iaiAge09iamVjdH1cblx0XHRcdCAqIEBwYXJhbSBwcm9wIHtTdHJpbmd9XG5cdFx0XHQgKi9cblx0XHRcdGFwcGx5VG8ob2JqLCBwcm9wKSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZChwcm9wKSkgeyBvYmogPSBvYmpbcHJvcF0gfVxuXHRcdFx0XHRVLmFzc2VydChvYmogaW5zdGFuY2VvZiBPYmplY3QsXG5cdFx0XHRcdFx0XHRgVGhlICdtb2RpZnknIG9wZXJhdGlvbiBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBhbiBhbHJlYWR5IGRlZmluZWQgT2JqZWN0LmApO1xuXHRcdFx0XHRPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykuZm9yRWFjaCgoc3ViUHJvcCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuZGVsdGFzW3N1YlByb3BdLmFwcGx5VG8ob2JqLCBzdWJQcm9wKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXG5cdFx0XHRhcHBsaWVkVG8ob2JqLCBwcm9wKSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZChwcm9wKSkgeyBvYmogPSBvYmpbcHJvcF0gfVxuXHRcdFx0XHR2YXIgcmVzdWx0ID0gVS5leHRlbmQoe30sIG9iaik7XG5cdFx0XHRcdHRoaXMuYXBwbHlUbyhyZXN1bHQpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSBwcm9wICB7U3RyaW5nfVxuXHRcdFx0ICogQHBhcmFtIG90aGVyIHtEZWx0YUpzI29wZXJhdGlvbnMuRGVsdGF9XG5cdFx0XHQgKi9cblx0XHRcdGNvbXBvc2UocHJvcCwgb3RoZXIpIHtcblxuXHRcdFx0XHRpZiAob3RoZXIpIHtcblx0XHRcdFx0XHR2YXIgdGhpc0RlbHRhID0gdGhpcy5kZWx0YXNbcHJvcF07XG5cdFx0XHRcdFx0dmFyIHN1Y2Nlc3MgPSB0aGlzRGVsdGFKcy5jb21wb3NpdGlvbnNbdGhpc0RlbHRhLnR5cGVdW290aGVyLnR5cGVdLnNvbWUoKGNvbXApID0+IHtcblx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdGNvbXAodGhpcywgcHJvcCwgb3RoZXIpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdH0gY2F0Y2ggKF9fKSB7fVxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFUuYXNzZXJ0KHN1Y2Nlc3MsXG5cdFx0XHRcdFx0XHRcdGBObyBjb21wb3NpdGlvbiBpcyBkZWZpbmVkIGJldHdlZW4gJyR7dGhpc0RlbHRhLnR5cGV9JyBhbmQgJyR7b3RoZXIudHlwZX0nLmApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHByb3Age1N0cmluZ31cblx0XHRcdCAqL1xuXHRcdFx0bW9kaWZ5KHByb3ApIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2FkZE9wZXJhdGlvbignbW9kaWZ5JywgcHJvcCwgW10pO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0gb3BUeXBlIHtTdHJpbmd9XG5cdFx0XHQgKiBAcGFyYW0gcHJvcCAgIHtTdHJpbmd9XG5cdFx0XHQgKiBAcGFyYW0gYXJncyAgIHtbKl19XG5cdFx0XHQgKi9cblx0XHRcdF9hZGRPcGVyYXRpb24ob3BUeXBlLCBwcm9wLCBhcmdzKSB7XG5cblx0XHRcdFx0LyogZGlzc2VjdCB0aGUgJ3Byb3AnIHN0cmluZyAqL1xuXHRcdFx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gIDExMTExICAyMjIyMjIyMjIyMiAgMzMgIC8vXG5cdFx0XHRcdHZhciBtYXRjaCA9IHByb3AubWF0Y2goL14oWy4jXT8pKFxcdyt8XFwoXFx3K1xcKSkoLiopJC8pO1xuXHRcdFx0XHRVLmFzc2VydChtYXRjaCwgYFRoZSBwYXRoIHN0cmluZyAnJHtwcm9wfScgaXMgbm90IHdlbGwgZm9ybWVkLmApO1xuXG5cdFx0XHRcdC8qIGlmICdwcm9wJyBoYXMgYSBsZWFkaW5nICcjJyBjaGFyYWN0ZXIsIHRyYW5zZm9ybSBpdCBhbmQgcmVjYWxsIHRoaXMgbWV0aG9kICovXG5cdFx0XHRcdGlmIChtYXRjaFsxXSA9PT0gJyMnKSB7XG5cdFx0XHRcdFx0Ly8gdGhlICMgc2VwYXJhdG9yIGV4cGVjdHMgdGhlIGN1cnJlbnQgb2JqZWN0IHRvIGJlIGEgY29uc3RydWN0b3IgZnVuY3Rpb24sXG5cdFx0XHRcdFx0Ly8gYW5kIHlpZWxkcyBhIGRlbHRhIHRvIG1vZGlmeSBuZXcgaW5zdGFuY2VzIG9mIHRoZSBjb3JyZXNwb25kaW5nIGNsYXNzXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2FkZE9wZXJhdGlvbihvcFR5cGUsIGAuKGluc3RhbmNlKS4ke21hdGNoWzJdfSR7bWF0Y2hbM119YCwgYXJncyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiBjcmVhdGUgdGhlIHJlc3VsdGluZyBkZWx0YSwgcG9zc2libHkgY2FsbGluZyB0aGlzIG1ldGhvZCByZWN1cnNpdmVseSBmb3IgYSBsb25nZXIgY2hhaW4gKi9cblx0XHRcdFx0dmFyIHJlc3VsdERlbHRhO1xuXHRcdFx0XHRpZiAobWF0Y2hbM10gPT09ICcnKSB7XG5cdFx0XHRcdFx0KChuZXdEZWx0YSkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMuZGVsdGFzW21hdGNoWzJdXSkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLmNvbXBvc2UobWF0Y2hbMl0sIG5ld0RlbHRhKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuZGVsdGFzW21hdGNoWzJdXSA9IG5ld0RlbHRhO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pKFUuYXBwbHlDb25zdHJ1Y3Rvcih0aGlzRGVsdGFKcy5vcGVyYXRpb25zW29wVHlwZV0sIGFyZ3MpKTtcblx0XHRcdFx0XHRyZXN1bHREZWx0YSA9IHRoaXMuZGVsdGFzW21hdGNoWzJdXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXN1bHREZWx0YSA9IHRoaXMubW9kaWZ5KG1hdGNoWzJdKS5fYWRkT3BlcmF0aW9uKG9wVHlwZSwgbWF0Y2hbM10sIGFyZ3MpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyogaWYgdGhpcyBvcGVyYXRpb24gd2FzIGEgbW9kaWZpY2F0aW9uLCByZXR1cm4gdGhlIG5ldyBkZWx0YTsgb3RoZXJ3aXNlLCByZXR1cm4gdGhpcyBkZWx0YSAqL1xuXHRcdFx0XHRyZXR1cm4gb3BUeXBlID09PSAnbW9kaWZ5JyA/IHJlc3VsdERlbHRhIDogdGhpcztcblxuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSBpbmRlbnRMdmwge051bWJlcj99XG5cdFx0XHQgKiBAcGFyYW0gcHJvcGVydHkgIHtTdHJpbmc/fVxuXHRcdFx0ICovXG5cdFx0XHR0b1N0cmluZyhpbmRlbnRMdmwgPSAwLCBwcm9wID0gJyhyb290KScpIHtcblx0XHRcdFx0dmFyIGluZGVudCA9IFUucmVwZWF0KDAgKyBpbmRlbnRMdmwsICcgICAgJyk7XG5cdFx0XHRcdHJldHVybiBgJHtpbmRlbnR9bW9kaWZ5ICcke3Byb3B9J1xcbmAgK1xuXHRcdFx0XHRcdFx0T2JqZWN0LmtleXModGhpcy5kZWx0YXMpLm1hcCgocCkgPT4gdGhpcy5kZWx0YXNbcF0udG9TdHJpbmcoaW5kZW50THZsICsgMSwgcCkpLmpvaW4oJ1xcbicpO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cdFx0Ly8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy9cblxuXG5cdFx0LyogZGVmaW5lIHN0YW5kYXJkIG9wZXJhdGlvbnMgKi9cblx0XHR0aGlzLl9kZWZpbmVTdGFuZGFyZE9wZXJhdGlvblR5cGVzKCk7XG5cblxuXHR9LCAvKiogQGxlbmRzIERlbHRhSnMucHJvdG90eXBlICovICB7XG5cblx0XHQvKioge0BwdWJsaWN9e0Bwcm9wZXJ0eX1cblx0XHQgKiBxdWljayBhY2Nlc3MgdG8gdGhlICdtb2RpZnknIGRlbHRhIGNvbnN0cnVjdG9yXG5cdFx0ICovXG5cdFx0Z2V0IERlbHRhKCkgeyByZXR1cm4gdGhpcy5vcGVyYXRpb25zWydtb2RpZnknXSB9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqXG5cdFx0ICovXG5cdFx0dnAodnBOYW1lLCB2YWwpIHtcblx0XHRcdC8vIFRPRE9cblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIG5hbWUgICAge1N0cmluZ31cblx0XHQgKiBAcGFyYW0gYXBwbHlUbyB7KERlbHRhSnMjb3BlcmF0aW9ucy5EZWx0YSwgT2JqZWN0LCBTdHJpbmcpID0+IHVuZGVmaW5lZH1cblx0XHQgKi9cblx0XHRuZXdPcGVyYXRpb25UeXBlKG5hbWUsIGFwcGx5VG8pIHtcblxuXHRcdFx0Lyogc2FuaXR5IGNoZWNrcyAqL1xuXHRcdFx0VS5hc3NlcnQoIXRoaXMub3BlcmF0aW9uc1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlICcke25hbWV9JyBvcGVyYXRpb24gdHlwZSBhbHJlYWR5IGV4aXN0cy5gKTtcblxuXHRcdFx0LyogY3JlYXRlIHRoZSBjb3JyZXNwb25kaW5nIG1ldGhvZCBpbiB0aGUgJ21vZGlmeScgZGVsdGEgKi9cblx0XHRcdHRoaXMub3BlcmF0aW9ucy5tb2RpZnkucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24gKHByb3AsIC4uLmFyZ3MpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2FkZE9wZXJhdGlvbihuYW1lLCBwcm9wLCBhcmdzKTtcblx0XHRcdH07XG5cblx0XHRcdC8qIHB1dCB0aGUgcmlnaHQgZm91bmRhdGlvbiBpbiAndGhpcy5jb21wb3NpdGlvbicgKi9cblx0XHRcdHRoaXMuY29tcG9zaXRpb25zW25hbWVdID0ge307XG5cdFx0XHRPYmplY3Qua2V5cyh0aGlzLmNvbXBvc2l0aW9ucykuZm9yRWFjaCgodHlwZSkgPT4ge1xuXHRcdFx0XHRVLmFzc2VydCghdGhpcy5jb21wb3NpdGlvbnNbdHlwZV1bbmFtZV0pO1xuXHRcdFx0XHRVLmFzc2VydCghdGhpcy5jb21wb3NpdGlvbnNbbmFtZV1bdHlwZV0pO1xuXHRcdFx0XHR0aGlzLmNvbXBvc2l0aW9uc1t0eXBlXVtuYW1lXSA9IFtdO1xuXHRcdFx0XHR0aGlzLmNvbXBvc2l0aW9uc1tuYW1lXVt0eXBlXSA9IFtdO1xuXHRcdFx0fSk7XG5cblxuXHRcdFx0Ly8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvL1xuXHRcdFx0LyogY3JlYXRlIHRoZSBEZWx0YSBzdXBlcmNsYXNzIHJlcHJlc2VudGluZyB0aGlzIG9wZXJhdGlvbiB0eXBlICovXG5cdFx0XHR0aGlzLm9wZXJhdGlvbnNbbmFtZV0gPSBVLm5ld1N1YmNsYXNzKHRoaXMub3BlcmF0aW9ucy5EZWx0YSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHN1cGVyRm4oKTtcblx0XHRcdFx0dGhpcy5hID0gYXJncztcblx0XHRcdH0sIHtcblx0XHRcdFx0dHlwZTogbmFtZSxcblx0XHRcdFx0YXBwbHlUbzogYXBwbHlUbyxcblxuXHRcdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHRcdCAqIEBwYXJhbSBpbmRlbnRMdmwge051bWJlcj99XG5cdFx0XHRcdCAqIEBwYXJhbSBwcm9wZXJ0eSAge1N0cmluZz99XG5cdFx0XHRcdCAqL1xuXHRcdFx0XHR0b1N0cmluZyhpbmRlbnRMdmwgPSAwLCBwcm9wID0gJyhyb290KScpIHtcblx0XHRcdFx0XHR2YXIgaW5kZW50ID0gVS5yZXBlYXQoMCArIGluZGVudEx2bCwgJyAgICAnKTtcblx0XHRcdFx0XHRyZXR1cm4gYCR7aW5kZW50fSR7bmFtZX0gJyR7cHJvcH0nOiAke0pTT04uc3RyaW5naWZ5KHRoaXMuYSkuc2xpY2UoMSwgLTEpfWA7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0Ly8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvL1xuXG5cblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHR5cGUxICAge1N0cmluZ31cblx0XHQgKiBAcGFyYW0gdHlwZTIgICB7U3RyaW5nfVxuXHRcdCAqIEBwYXJhbSBjb21wb3NlIHsoRGVsdGFKcyNvcGVyYXRpb25zLm1vZGlmeSwgU3RyaW5nLCBEZWx0YUpzI29wZXJhdGlvbnMuRGVsdGEpID0+IHVuZGVmaW5lZH1cblx0XHQgKi9cblx0XHRuZXdDb21wb3NpdGlvbih0eXBlMSwgdHlwZTIsIGNvbXBvc2UpIHtcblx0XHRcdHRoaXMuY29tcG9zaXRpb25zW3R5cGUxXVt0eXBlMl0ucHVzaChjb21wb3NlKTtcblx0XHR9LFxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHQgKlxuXHRcdCAqL1xuXHRcdF9kZWZpbmVTdGFuZGFyZE9wZXJhdGlvblR5cGVzKCkge1xuXG5cdFx0XHR2YXIgZGVsdGFKcyA9IHRoaXM7XG5cblx0XHRcdC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy9cblxuXHRcdFx0LyogY29udmVuaWVuY2UgZGVmaW5pdGlvbnMgZm9yIHRoZSBhcHBsaWNhdGlvbiBhbmQgY29tcG9zaXRpb24gZnVuY3Rpb25zIGJlbG93ICovXG5cdFx0XHR2YXIga2VlcEZpcnN0ID0gKCkgPT4ge307XG5cdFx0XHR2YXIga2VlcFNlY29uZCA9IChkMSwgcCwgZDIpID0+IHsgZDEuZGVsdGFzW3BdID0gZDIgfTtcblx0XHRcdHZhciBhcHBseVNlY29uZFRvRmlyc3QgPSAoZDEsIHAsIGQyKSA9PiB7IGQyLmFwcGx5VG8oZDEuZGVsdGFzW3BdLmEsIDApIH07XG5cdFx0XHR2YXIgZXJyb3IgPSAoZDEsIHAsIGQyKSA9PiB7IHRocm93IG5ldyBFcnJvcihgWW91IGNhbm5vdCBmb2xsb3cgJyR7ZDFbcF0udHlwZX0nIHdpdGggJyR7ZDIudHlwZX0nLmApIH07XG5cblx0XHRcdGZ1bmN0aW9uIGQodHlwZSwgIGZuID0gKCk9Pm51bGwpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBmbiA9PT0gJ3N0cmluZycpIHsgZm4gPSAoKHYpID0+IChvKSA9PiBvW3ZdKShmbikgfVxuXHRcdFx0XHRyZXR1cm4gKGQxLCBwLCBkMikgPT4ge1xuXHRcdFx0XHRcdGQxLmRlbHRhc1twXSA9IFUuYXBwbHlDb25zdHJ1Y3RvcihkZWx0YUpzLm9wZXJhdGlvbnNbdHlwZV0sXG5cdFx0XHRcdFx0XHRcdFtmbih7IGQxOiBkMS5kZWx0YXNbcF0sIGQyOiBkMiwgcDE6IGQxLmRlbHRhc1twXS5hWzBdLCBwMjogZDIuYVswXSB9KV0pO1xuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0ZnVuY3Rpb24gdih0aGluZykgeyByZXR1cm4gKG8pID0+IG9bdGhpbmddIH1cblxuXHRcdFx0ZnVuY3Rpb24gYXNzZXJ0RnVuY3Rpb24odmFsLCBvcFR5cGUpIHtcblx0XHRcdFx0VS5hc3NlcnQodHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJyxcblx0XHRcdFx0XHRcdGBUaGUgb3BlcmF0aW9uICcke29wVHlwZX0nIGV4cGVjdHMgdGhlIHByb3BlcnR5IGl0IGFjdHMgb24gdG8gYmUgYSBmdW5jdGlvbi5gKTtcblx0XHRcdH1cblx0XHRcdGZ1bmN0aW9uIGFzc2VydE9iamVjdCh2YWwsIG9wVHlwZSkge1xuXHRcdFx0XHRVLmFzc2VydCh2YWwgaW5zdGFuY2VvZiBPYmplY3QsXG5cdFx0XHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnJHtvcFR5cGV9JyBleHBlY3RzIHRoZSBwcm9wZXJ0eSBpdCBhY3RzIG9uIHRvIGJlIGFuIE9iamVjdC5gKTtcblx0XHRcdH1cblx0XHRcdGZ1bmN0aW9uIGFzc2VydERlZmluZWQodmFsLCBvcFR5cGUpIHtcblx0XHRcdFx0VS5hc3NlcnQoVS5pc0RlZmluZWQodmFsKSxcblx0XHRcdFx0XHRcdGBUaGUgb3BlcmF0aW9uICcke29wVHlwZX0nIGV4cGVjdHMgdGhlIHByb3BlcnR5IHRvIGJlIGRlZmluZWQuYCk7XG5cdFx0XHR9XG5cdFx0XHRmdW5jdGlvbiBhc3NlcnRVbmRlZmluZWQodmFsLCBvcFR5cGUpIHtcblx0XHRcdFx0VS5hc3NlcnQoVS5pc1VuZGVmaW5lZCh2YWwpLFxuXHRcdFx0XHRcdFx0YFRoZSBvcGVyYXRpb24gJyR7b3BUeXBlfScgZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgdW5kZWZpbmVkLmApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vXG5cblx0XHRcdC8vICdtb2RpZnknIGlzIG1vcmUgZnVuZGFtZW50YWwsIGFuZCBkZWZpbmVkIGFib3ZlXG5cdFx0XHR0aGlzLm5ld09wZXJhdGlvblR5cGUoJ2FkZCcsIGZ1bmN0aW9uIGFwcGx5VG8ob2JqLCBwKSB7XG5cdFx0XHRcdGFzc2VydFVuZGVmaW5lZChvYmpbcF0sICdhZGQnKTtcblx0XHRcdFx0b2JqW3BdID0gdGhpcy5hWzBdO1xuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLm5ld09wZXJhdGlvblR5cGUoJ3JlbW92ZScsIGZ1bmN0aW9uIGFwcGx5VG8ob2JqLCBwKSB7XG5cdFx0XHRcdGFzc2VydERlZmluZWQob2JqW3BdLCAncmVtb3ZlJyk7XG5cdFx0XHRcdGRlbGV0ZSBvYmpbcF07XG5cdFx0XHR9KTtcblx0XHRcdHRoaXMubmV3T3BlcmF0aW9uVHlwZSgnZm9yYmlkJywgZnVuY3Rpb24gYXBwbHlUbyhvYmosIHApIHtcblx0XHRcdFx0YXNzZXJ0VW5kZWZpbmVkKG9ialtwXSwgJ2ZvcmJpZCcpO1xuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLm5ld09wZXJhdGlvblR5cGUoJ3JlcGxhY2UnLCBmdW5jdGlvbiBhcHBseVRvKG9iaiwgcCkge1xuXHRcdFx0XHRhc3NlcnREZWZpbmVkKG9ialtwXSwgJ3JlcGxhY2UnKTtcblx0XHRcdFx0b2JqW3BdID0gdGhpcy5hWzBdO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy9cblxuXHRcdFx0Ly8gbW9kaWZ5XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdtb2RpZnknLCAnbW9kaWZ5JywgKGQxLCBwLCBkMikgPT4ge1xuXHRcdFx0XHRPYmplY3Qua2V5cyhkMi5kZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0XHRkMS5jb21wb3NlKHAsIGQyLmRlbHRhc1twcm9wXSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vIGFkZFxuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignbW9kaWZ5JywgJ2FkZCcgICAsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ2FkZCcgICAsICdhZGQnICAgLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdhZGQnICAgLCAnbW9kaWZ5JywgZCgnYWRkJywgKHtkMiwgcDF9KSA9PiBkMi5hcHBsaWVkVG8ocDEpKSk7XG5cblx0XHRcdC8vIHJlbW92ZVxuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignbW9kaWZ5JywgJ3JlbW92ZScsIGQoJ3JlbW92ZScpKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ2FkZCcgICAsICdyZW1vdmUnLCBkKCdmb3JiaWQnKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdyZW1vdmUnLCAnbW9kaWZ5JywgZXJyb3IpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbigncmVtb3ZlJywgJ2FkZCcgICAsIGQoJ3JlcGxhY2UnLCAncDInKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdyZW1vdmUnLCAncmVtb3ZlJywgZXJyb3IpO1xuXG5cdFx0XHQvLyBmb3JiaWRcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ21vZGlmeScsICdmb3JiaWQnLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdhZGQnICAgLCAnZm9yYmlkJywgZXJyb3IpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbigncmVtb3ZlJywgJ2ZvcmJpZCcsIGQoJ3JlbW92ZScpKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ2ZvcmJpZCcsICdtb2RpZnknLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdmb3JiaWQnLCAnYWRkJyAgICwgZCgnYWRkJywgJ3AyJykpO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignZm9yYmlkJywgJ3JlbW92ZScsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ2ZvcmJpZCcsICdmb3JiaWQnLCBkKCdmb3JiaWQnKSk7XG5cblx0XHRcdC8vIHJlcGxhY2Vcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ21vZGlmeScgLCAncmVwbGFjZScsIGQoJ3JlcGxhY2UnLCAncDInKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdhZGQnICAgICwgJ3JlcGxhY2UnLCBkKCdhZGQnLCAncDInKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdyZW1vdmUnICwgJ3JlcGxhY2UnLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdmb3JiaWQnICwgJ3JlcGxhY2UnLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdyZXBsYWNlJywgJ2FkZCcgICAgLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdyZXBsYWNlJywgJ3JlbW92ZScgLCBkKCdyZW1vdmUnKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdyZXBsYWNlJywgJ2ZvcmJpZCcgLCBlcnJvcik7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdyZXBsYWNlJywgJ21vZGlmeScgLCBkKCdyZXBsYWNlJywgKHtkMiwgcDF9KSA9PiBkMi5hcHBsaWVkVG8ocDEpKSk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdyZXBsYWNlJywgJ3JlcGxhY2UnLCBkKCdyZXBsYWNlJywgJ3AyJykpO1xuXG5cdFx0fVxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdH0pO1xuXG5cblx0cmV0dXJuIERlbHRhSnM7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9kZWx0YS5qc1xuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyIsImRlZmluZSgoKSA9PiB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgVSA9IHtcblxuXHRcdC8qIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlICovXG5cdFx0bmV3Q2xhc3MoY29uc3RydWN0b3IsIHByb3RvdHlwZSA9IHt9KSB7XG5cdFx0XHR2YXIgY2xzID0gY29uc3RydWN0b3I7XG5cdFx0XHRjbHMucHJvdG90eXBlID0gcHJvdG90eXBlO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cdFx0fSxcblxuXHRcdC8qIGNyZWF0ZSBhIG5ldyBzdWJjbGFzcywgZ2l2ZW4gYSBzdXBlcmNsYXNzLCBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlICovXG5cdFx0bmV3U3ViY2xhc3Moc3VwZXJDbGFzcywgY29uc3RydWN0b3JNYWtlciwgcHJvdG90eXBlID0ge30pIHtcblx0XHRcdHZhciBjbHMgPSBjb25zdHJ1Y3Rvck1ha2VyKHN1cGVyQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yKTtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcblx0XHRcdFUuZXh0ZW5kKGNscy5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0LyogIGV4dGVuZCB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzICAgICAqL1xuXHRcdC8qICBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJucyAgKi9cblx0XHQvKiAgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0ZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0XHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmoxLCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIG9iajE7XG5cdFx0fSxcblxuXHRcdC8qIGFsbG93cyB0aGUgRnVuY3Rpb24gY29uc3RydWN0b3IgdG8gYmUgdXNlZCB3aXRoIGFuIGFycmF5IG9mIGZvcm1hbCBwYXJhbWV0ZXJzICovXG5cdFx0YXBwbHlDb25zdHJ1Y3RvcihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG5cdFx0XHR2YXIgbmV3X29iaiA9IE9iamVjdC5jcmVhdGUoQ29uc3RydWN0b3JGbi5wcm90b3R5cGUpO1xuXHRcdFx0Q29uc3RydWN0b3JGbi5hcHBseShuZXdfb2JqLCBhcmdzKTtcblx0XHRcdHJldHVybiBuZXdfb2JqO1xuXHRcdH0sXG5cblx0XHQvKiBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWUgKi9cblx0XHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHRcdH0sXG5cblx0XHQvKiB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGAgKi9cblx0XHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvKiB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKSAqL1xuXHRcdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvKiByZXBlYXQgYSBzdHJpbmcgYSBnaXZlbiBudW1iZXIgb2YgdGltZXMgKi9cblx0XHRyZXBlYXQobnIsIHN0cikgeyByZXR1cm4gbmV3IEFycmF5KG5yKzEpLmpvaW4oc3RyKSB9XG5cdH07XG5cblx0cmV0dXJuIFU7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21pc2MuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJkZWx0YS5qcyJ9