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
	      return function(prop) {
	        superFn();
	        this.prop = prop;
	        this.deltas = {};
	      };
	    }), {
	      type: 'modify',
	      applyTo: function(obj, prop) {
	        var $__0 = this;
	        if (U.isDefined(prop)) {
	          U.assert(U.isDefined(obj[prop]), "The 'modify' operation expects the property to be already defined.");
	          Object.keys(this.deltas).forEach((function(subProp) {
	            $__0.deltas[subProp].applyTo(obj[prop], subProp);
	          }));
	        } else {
	          U.assert(U.isDefined(obj), "The 'modify' operation expects the property to be already defined.");
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
	        var $__0 = this;
	        return (U.repeat(indentLvl, '    ') + "modify '" + this.prop + "'\n") + Object.keys(this.deltas).map((function(prop) {
	          return $__0.deltas[prop].toString(indentLvl + 1, prop);
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
	        return function(prop) {
	          for (var args = [],
	              $__2 = 1; $__2 < arguments.length; $__2++)
	            args[$__2 - 1] = arguments[$__2];
	          superFn();
	          this.prop = prop;
	          this.a = args;
	        };
	      }), {
	        type: name,
	        applyTo: applyTo,
	        toString: function() {
	          var indentLvl = arguments[0] !== (void 0) ? arguments[0] : 0;
	          return ("" + U.repeat(0 + indentLvl, '    ') + name + " '" + this.prop + "': " + JSON.stringify(this.a).slice(1, -1));
	        }
	      });
	    },
	    newComposition: function(type1, type2, compose) {
	      this.compositions[type1][type2].push(compose);
	    },
	    _defineStandardOperationTypes: function() {
	      function assertUndefined(val, opType) {
	        U.assert(U.isUndefined(val), ("The operation '" + opType + "' expects the property to be undefined."));
	      }
	      this.newComposition('modify', 'modify', (function(d1, p, d2) {
	        Object.keys(d2.deltas).forEach((function(prop) {
	          d1.compose(prop, d2.deltas[prop]);
	        }));
	      }));
	      this.newOperationType('add', function applyTo(obj) {
	        assertUndefined(obj[this.prop], 'add');
	        obj[this.prop] = this.a[0];
	      });
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmNWRhZTcyOGVjZGJiZmY0ODQ2MiIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy8uL3NyYy9taXNjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0EsaUNBQVEsdUJBQVcsQ0FBRywwQ0FBVTtBQUMvQixjQUFXLENBQUM7QUFNUixhQUFNLEVBQUksV0FBVSxDQUFDLFFBQVMsUUFBTSxDQUFFO0FBRXJDLG1CQUFVLEVBQUksS0FBRyxDQUFDO0FBR3RCLFFBQUcsV0FBVyxFQUFJLEdBQUMsQ0FBQztBQUNwQixRQUFHLGFBQWEsRUFBSSxHQUFDLENBQUM7QUFHdEIsUUFBRyxXQUFXLE1BQU0sRUFBSSxXQUFVLENBQUMsU0FBVSxDQUFFLEdBQUMsQ0FBQyxDQUFDO0FBR2xELFFBQUcsYUFBYSxDQUFFLFFBQU8sQ0FBQyxFQUFJLEVBQUUsUUFBTyxDQUFHLEdBQUMsQ0FBRSxDQUFDO0FBSTlDLFFBQUcsV0FBVyxDQUFFLFFBQU8sQ0FBQyxFQUFJLGNBQWEsQ0FBQyxJQUFHLFdBQVcsTUFBTSxHQUFHLFNBQUMsT0FBTTtZQUFNLFVBQVUsSUFBRyxDQUFHO0FBQzdGLGVBQU8sRUFBQyxDQUFDO0FB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QUFFLElBQU0sWUFBVTtLQUFFO0FBR3JELGFBQVEsQ0FBUixVQUFVLEdBQUUsQ0FBRztBQUFFLFlBQU8sT0FBTyxJQUFFLElBQU0sWUFBVTtLQUFFO0FBR25ELFVBQUssQ0FBTCxVQUFPLEVBQUMsQ0FBRyxJQUFFLENBQUc7QUFBRSxZQUFPLElBQUksTUFBSyxDQUFDLEVBQUMsRUFBRSxHQUFDLEtBQU0sQ0FBQyxHQUFFLENBQUM7S0FBRTtBQUFBLEdBQ3BELENBQUM7QUFFRCxRQUFPLEdBQUM7QUFDVCx3SkFBRTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJEZWx0YU1vZGVsXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkRlbHRhTW9kZWxcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBmNWRhZTcyOGVjZGJiZmY0ODQ2MlxuICoqLyIsImRlZmluZShbJy4vbWlzYy5qcyddLCBmdW5jdGlvbiAoVSkge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHQvKioge0BjbGFzcyBEZWx0YUpzfVxuXHQgKlxuXHQgKi9cblx0dmFyIERlbHRhSnMgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIERlbHRhSnMoKSB7XG5cblx0XHR2YXIgdGhpc0RlbHRhSnMgPSB0aGlzO1xuXG5cdFx0LyogdGhlIHRoaW5ncyBpbnN0YW5jZXMgb2YgJ0RlbHRhSnMnIGtlZXBzIHRyYWNrIG9mICovXG5cdFx0dGhpcy5vcGVyYXRpb25zID0ge307ICAgLy8gcHJvcGVydHkgLT4gRGVsdGFcblx0XHR0aGlzLmNvbXBvc2l0aW9ucyA9IHt9OyAvLyB0eXBlMSAtPiB0eXBlMiAtPiBbY29tcG9zZUZuXVxuXG5cdFx0LyogZGVmaW5lIHRoZSBiYXNlICdEZWx0YScgY2xhc3MgKi9cblx0XHR0aGlzLm9wZXJhdGlvbnMuRGVsdGEgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uICgpIHt9KTtcblxuXHRcdC8qIHB1dCB0aGUgcmlnaHQgZm91bmRhdGlvbiBpbiAndGhpcy5jb21wb3NpdGlvbicgKi9cblx0XHR0aGlzLmNvbXBvc2l0aW9uc1snbW9kaWZ5J10gPSB7ICdtb2RpZnknOiBbXSB9O1xuXG5cdFx0Ly8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy9cblx0XHQvKiBkZWZpbmUgdGhlIGZ1bmRhbWVudGFsICdtb2RpZnknIGRlbHRhICovXG5cdFx0dGhpcy5vcGVyYXRpb25zWydtb2RpZnknXSA9IFUubmV3U3ViY2xhc3ModGhpcy5vcGVyYXRpb25zLkRlbHRhLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKHByb3ApIHtcblx0XHRcdHN1cGVyRm4oKTtcblx0XHRcdHRoaXMucHJvcCA9IHByb3A7XG5cdFx0XHR0aGlzLmRlbHRhcyA9IHt9O1xuXHRcdH0sIHtcblxuXHRcdFx0dHlwZTogJ21vZGlmeScsXG5cblx0XHRcdGFwcGx5VG8ob2JqLCBwcm9wKSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZChwcm9wKSkge1xuXHRcdFx0XHRcdC8qIGlmIGEgcHJvcGVydHkgaXMgcGFzc2VkLCBhcHBseSB0aGlzIGRlbHRhIHRvIGBvYmpbcHJvcF1gICovXG5cdFx0XHRcdFx0VS5hc3NlcnQoVS5pc0RlZmluZWQob2JqW3Byb3BdKSxcblx0XHRcdFx0XHRcdFx0YFRoZSAnbW9kaWZ5JyBvcGVyYXRpb24gZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgYWxyZWFkeSBkZWZpbmVkLmApO1xuXHRcdFx0XHRcdE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5mb3JFYWNoKChzdWJQcm9wKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlbHRhc1tzdWJQcm9wXS5hcHBseVRvKG9ialtwcm9wXSwgc3ViUHJvcCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0LyogaWYgYSBwcm9wZXJ0eSBpcyBub3QgcGFzc2VkLCBhcHBseSB0aGlzIGRlbHRhIHRvIGBvYmpgICovXG5cdFx0XHRcdFx0VS5hc3NlcnQoVS5pc0RlZmluZWQob2JqKSxcblx0XHRcdFx0XHRcdFx0YFRoZSAnbW9kaWZ5JyBvcGVyYXRpb24gZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgYWxyZWFkeSBkZWZpbmVkLmApO1xuXHRcdFx0XHRcdE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5mb3JFYWNoKChzdWJQcm9wKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlbHRhc1tzdWJQcm9wXS5hcHBseVRvKG9iaiwgc3ViUHJvcCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIEBwYXJhbSBwcm9wICB7U3RyaW5nfVxuXHRcdFx0ICogQHBhcmFtIG90aGVyIHtEZWx0YUpzI29wZXJhdGlvbnMuRGVsdGF9XG5cdFx0XHQgKi9cblx0XHRcdGNvbXBvc2UocHJvcCwgb3RoZXIpIHtcblxuXHRcdFx0XHRpZiAob3RoZXIpIHtcblx0XHRcdFx0XHR2YXIgdGhpc0RlbHRhID0gdGhpcy5kZWx0YXNbcHJvcF07XG5cdFx0XHRcdFx0dmFyIHN1Y2Nlc3MgPSB0aGlzRGVsdGFKcy5jb21wb3NpdGlvbnNbdGhpc0RlbHRhLnR5cGVdW290aGVyLnR5cGVdLnNvbWUoKGNvbXApID0+IHtcblx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdGNvbXAodGhpcywgcHJvcCwgb3RoZXIpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdH0gY2F0Y2ggKF9fKSB7fVxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFUuYXNzZXJ0KHN1Y2Nlc3MsXG5cdFx0XHRcdFx0XHRcdGBObyBjb21wb3NpdGlvbiBpcyBkZWZpbmVkIGJldHdlZW4gJyR7dGhpc0RlbHRhLnR5cGV9JyBhbmQgJyR7b3RoZXIudHlwZX0nLmApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gcHJvcCB7U3RyaW5nfVxuXHRcdFx0ICovXG5cdFx0XHRtb2RpZnkocHJvcCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fYWRkT3BlcmF0aW9uKCdtb2RpZnknLCBwcm9wLCBbXSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdFx0ICogQHBhcmFtIG9wVHlwZSB7U3RyaW5nfVxuXHRcdFx0ICogQHBhcmFtIHByb3AgICB7U3RyaW5nfVxuXHRcdFx0ICogQHBhcmFtIGFyZ3MgICB7WypdfVxuXHRcdFx0ICovXG5cdFx0XHRfYWRkT3BlcmF0aW9uKG9wVHlwZSwgcHJvcCwgYXJncykge1xuXG5cdFx0XHRcdC8qIGRpc3NlY3QgdGhlICdwcm9wJyBzdHJpbmcgKi9cblx0XHRcdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vICAxMTExMSAgMjIyMjIyMjIyMjIgIDMzICAvL1xuXHRcdFx0XHR2YXIgbWF0Y2ggPSBwcm9wLm1hdGNoKC9eKFsuI10/KShcXHcrfFxcKFxcdytcXCkpKC4qKSQvKTtcblx0XHRcdFx0VS5hc3NlcnQobWF0Y2gsIGBUaGUgcGF0aCBzdHJpbmcgJyR7cHJvcH0nIGlzIG5vdCB3ZWxsIGZvcm1lZC5gKTtcblxuXHRcdFx0XHQvKiBpZiAncHJvcCcgaGFzIGEgbGVhZGluZyAnIycgY2hhcmFjdGVyLCB0cmFuc2Zvcm0gaXQgYW5kIHJlY2FsbCB0aGlzIG1ldGhvZCAqL1xuXHRcdFx0XHRpZiAobWF0Y2hbMV0gPT09ICcjJykge1xuXHRcdFx0XHRcdC8vIHRoZSAjIHNlcGFyYXRvciBleHBlY3RzIHRoZSBjdXJyZW50IG9iamVjdCB0byBiZSBhIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLFxuXHRcdFx0XHRcdC8vIGFuZCB5aWVsZHMgYSBkZWx0YSB0byBtb2RpZnkgbmV3IGluc3RhbmNlcyBvZiB0aGUgY29ycmVzcG9uZGluZyBjbGFzc1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9hZGRPcGVyYXRpb24ob3BUeXBlLCBgLihpbnN0YW5jZSkuJHttYXRjaFsyXX0ke21hdGNoWzNdfWAsIGFyZ3MpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyogY3JlYXRlIHRoZSByZXN1bHRpbmcgZGVsdGEsIHBvc3NpYmx5IGNhbGxpbmcgdGhpcyBtZXRob2QgcmVjdXJzaXZlbHkgZm9yIGEgbG9uZ2VyIGNoYWluICovXG5cdFx0XHRcdHZhciByZXN1bHREZWx0YTtcblx0XHRcdFx0aWYgKG1hdGNoWzNdID09PSAnJykge1xuXHRcdFx0XHRcdCgobmV3RGVsdGEpID0+IHtcblx0XHRcdFx0XHRcdGlmICh0aGlzLmRlbHRhc1ttYXRjaFsyXV0pIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5jb21wb3NlKG1hdGNoWzJdLCBuZXdEZWx0YSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR0aGlzLmRlbHRhc1ttYXRjaFsyXV0gPSBuZXdEZWx0YTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KShVLmFwcGx5Q29uc3RydWN0b3IodGhpc0RlbHRhSnMub3BlcmF0aW9uc1tvcFR5cGVdLCBbbWF0Y2hbMl1dLmNvbmNhdChhcmdzKSkpO1xuXHRcdFx0XHRcdHJlc3VsdERlbHRhID0gdGhpcy5kZWx0YXNbbWF0Y2hbMl1dO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlc3VsdERlbHRhID0gdGhpcy5tb2RpZnkobWF0Y2hbMl0pLl9hZGRPcGVyYXRpb24ob3BUeXBlLCBtYXRjaFszXSwgYXJncyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiBpZiB0aGlzIG9wZXJhdGlvbiB3YXMgYSBtb2RpZmljYXRpb24sIHJldHVybiB0aGUgbmV3IGRlbHRhOyBvdGhlcndpc2UsIHJldHVybiB0aGlzIGRlbHRhICovXG5cdFx0XHRcdHJldHVybiBvcFR5cGUgPT09ICdtb2RpZnknID8gcmVzdWx0RGVsdGEgOiB0aGlzO1xuXG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gaW5kZW50THZsIHtOdW1iZXI/fVxuXHRcdFx0ICogQHBhcmFtIHByb3BlcnR5ICB7U3RyaW5nP31cblx0XHRcdCAqL1xuXHRcdFx0dG9TdHJpbmcoaW5kZW50THZsID0gMCkge1xuXHRcdFx0XHRyZXR1cm4gYCR7VS5yZXBlYXQoaW5kZW50THZsLCAnICAgICcpfW1vZGlmeSAnJHt0aGlzLnByb3B9J1xcbmAgK1xuXHRcdFx0XHRcdFx0T2JqZWN0LmtleXModGhpcy5kZWx0YXMpLm1hcCgocHJvcCkgPT4gdGhpcy5kZWx0YXNbcHJvcF0udG9TdHJpbmcoaW5kZW50THZsICsgMSwgcHJvcCkpLmpvaW4oJ1xcbicpO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cdFx0Ly8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy9cblxuXG5cdFx0LyogZGVmaW5lIHN0YW5kYXJkIG9wZXJhdGlvbnMgKi9cblx0XHR0aGlzLl9kZWZpbmVTdGFuZGFyZE9wZXJhdGlvblR5cGVzKCk7XG5cblxuXHR9LCAvKiogQGxlbmRzIERlbHRhSnMucHJvdG90eXBlICovICB7XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG5hbWUgICAge1N0cmluZ31cblx0XHQgKiBAcGFyYW0gYXBwbHlUbyB7KERlbHRhSnMjb3BlcmF0aW9ucy5EZWx0YSwgT2JqZWN0LCBTdHJpbmcpID0+IHVuZGVmaW5lZH1cblx0XHQgKi9cblx0XHRuZXdPcGVyYXRpb25UeXBlKG5hbWUsIGFwcGx5VG8pIHtcblxuXHRcdFx0Lyogc2FuaXR5IGNoZWNrcyAqL1xuXHRcdFx0VS5hc3NlcnQoIXRoaXMub3BlcmF0aW9uc1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlICcke25hbWV9JyBvcGVyYXRpb24gdHlwZSBhbHJlYWR5IGV4aXN0cy5gKTtcblxuXHRcdFx0LyogY3JlYXRlIHRoZSBjb3JyZXNwb25kaW5nIG1ldGhvZCBpbiB0aGUgJ21vZGlmeScgZGVsdGEgKi9cblx0XHRcdHRoaXMub3BlcmF0aW9ucy5tb2RpZnkucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24gKHByb3AsIC4uLmFyZ3MpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2FkZE9wZXJhdGlvbihuYW1lLCBwcm9wLCBhcmdzKTtcblx0XHRcdH07XG5cblx0XHRcdC8qIHB1dCB0aGUgcmlnaHQgZm91bmRhdGlvbiBpbiAndGhpcy5jb21wb3NpdGlvbicgKi9cblx0XHRcdHRoaXMuY29tcG9zaXRpb25zW25hbWVdID0ge307XG5cdFx0XHRPYmplY3Qua2V5cyh0aGlzLmNvbXBvc2l0aW9ucykuZm9yRWFjaCgodHlwZSkgPT4ge1xuXHRcdFx0XHRVLmFzc2VydCghdGhpcy5jb21wb3NpdGlvbnNbdHlwZV1bbmFtZV0pO1xuXHRcdFx0XHRVLmFzc2VydCghdGhpcy5jb21wb3NpdGlvbnNbbmFtZV1bdHlwZV0pO1xuXHRcdFx0XHR0aGlzLmNvbXBvc2l0aW9uc1t0eXBlXVtuYW1lXSA9IFtdO1xuXHRcdFx0XHR0aGlzLmNvbXBvc2l0aW9uc1tuYW1lXVt0eXBlXSA9IFtdO1xuXHRcdFx0fSk7XG5cblxuXHRcdFx0Ly8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvL1xuXHRcdFx0LyogY3JlYXRlIHRoZSBEZWx0YSBzdXBlcmNsYXNzIHJlcHJlc2VudGluZyB0aGlzIG9wZXJhdGlvbiB0eXBlICovXG5cdFx0XHR0aGlzLm9wZXJhdGlvbnNbbmFtZV0gPSBVLm5ld1N1YmNsYXNzKHRoaXMub3BlcmF0aW9ucy5EZWx0YSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIChwcm9wLCAuLi5hcmdzKSB7XG5cdFx0XHRcdHN1cGVyRm4oKTtcblx0XHRcdFx0dGhpcy5wcm9wID0gcHJvcDtcblx0XHRcdFx0dGhpcy5hID0gYXJncztcblx0XHRcdH0sIHtcblx0XHRcdFx0dHlwZTogbmFtZSxcblx0XHRcdFx0YXBwbHlUbzogYXBwbHlUbyxcblxuXHRcdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHRcdCAqIEBwYXJhbSBpbmRlbnRMdmwge051bWJlcj99XG5cdFx0XHRcdCAqIEBwYXJhbSBwcm9wZXJ0eSAge1N0cmluZz99XG5cdFx0XHRcdCAqL1xuXHRcdFx0XHR0b1N0cmluZyhpbmRlbnRMdmwgPSAwKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGAke1UucmVwZWF0KDAgKyBpbmRlbnRMdmwsICcgICAgJyl9JHtuYW1lfSAnJHt0aGlzLnByb3B9JzogJHtKU09OLnN0cmluZ2lmeSh0aGlzLmEpLnNsaWNlKDEsIC0xKX1gO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy9cblxuXG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gdHlwZTEgICB7U3RyaW5nfVxuXHRcdCAqIEBwYXJhbSB0eXBlMiAgIHtTdHJpbmd9XG5cdFx0ICogQHBhcmFtIGNvbXBvc2UgeyhEZWx0YUpzI29wZXJhdGlvbnMubW9kaWZ5LCBTdHJpbmcsIERlbHRhSnMjb3BlcmF0aW9ucy5EZWx0YSkgPT4gdW5kZWZpbmVkfVxuXHRcdCAqL1xuXHRcdG5ld0NvbXBvc2l0aW9uKHR5cGUxLCB0eXBlMiwgY29tcG9zZSkge1xuXHRcdFx0dGhpcy5jb21wb3NpdGlvbnNbdHlwZTFdW3R5cGUyXS5wdXNoKGNvbXBvc2UpO1xuXHRcdH0sXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdCAqL1xuXHRcdF9kZWZpbmVTdGFuZGFyZE9wZXJhdGlvblR5cGVzKCkge1xuXG5cdFx0XHQvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vXG5cblx0XHRcdC8vZnVuY3Rpb24gYXNzZXJ0RnVuY3Rpb24odmFsLCBvcFR5cGUpIHtcblx0XHRcdC8vXHRVLmFzc2VydCh0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nLFxuXHRcdFx0Ly9cdFx0XHRgVGhlIG9wZXJhdGlvbiAnJHtvcFR5cGV9JyBleHBlY3RzIHRoZSBwcm9wZXJ0eSBpdCBhY3RzIG9uIHRvIGJlIGEgZnVuY3Rpb24uYCk7XG5cdFx0XHQvL31cblx0XHRcdC8vXG5cdFx0XHQvL2Z1bmN0aW9uIGFzc2VydERlZmluZWQodmFsLCBvcFR5cGUpIHtcblx0XHRcdC8vXHRVLmFzc2VydChVLmlzRGVmaW5lZCh2YWwpLFxuXHRcdFx0Ly9cdFx0XHRgVGhlIG9wZXJhdGlvbiAnJHtvcFR5cGV9JyBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBkZWZpbmVkLmApO1xuXHRcdFx0Ly99XG5cblx0XHRcdGZ1bmN0aW9uIGFzc2VydFVuZGVmaW5lZCh2YWwsIG9wVHlwZSkge1xuXHRcdFx0XHRVLmFzc2VydChVLmlzVW5kZWZpbmVkKHZhbCksXG5cdFx0XHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnJHtvcFR5cGV9JyBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSB1bmRlZmluZWQuYCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy9cblxuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignbW9kaWZ5JywgJ21vZGlmeScsIChkMSwgcCwgZDIpID0+IHtcblx0XHRcdFx0T2JqZWN0LmtleXMoZDIuZGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdFx0ZDEuY29tcG9zZShwcm9wLCBkMi5kZWx0YXNbcHJvcF0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cblx0XHRcdHRoaXMubmV3T3BlcmF0aW9uVHlwZSgnYWRkJywgZnVuY3Rpb24gYXBwbHlUbyhvYmopIHtcblx0XHRcdFx0YXNzZXJ0VW5kZWZpbmVkKG9ialt0aGlzLnByb3BdLCAnYWRkJyk7XG5cdFx0XHRcdG9ialt0aGlzLnByb3BdID0gdGhpcy5hWzBdO1xuXHRcdFx0fSk7XG5cblx0XHR9XG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblx0fSk7XG5cblxuXHRyZXR1cm4gRGVsdGFKcztcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2RlbHRhLmpzXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wXG4gKiovIiwiZGVmaW5lKCgpID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdDbGFzcyhjb25zdHJ1Y3RvciwgcHJvdG90eXBlID0ge30pIHtcblx0XHRcdHZhciBjbHMgPSBjb25zdHJ1Y3Rvcjtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdTdWJjbGFzcyhzdXBlckNsYXNzLCBjb25zdHJ1Y3Rvck1ha2VyLCBwcm90b3R5cGUgPSB7fSkge1xuXHRcdFx0dmFyIGNscyA9IGNvbnN0cnVjdG9yTWFrZXIoc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IpO1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuXHRcdFx0VS5leHRlbmQoY2xzLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvLyBleHRlbmQgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllc1xuXHRcdC8vIG9mIHRoZSBvdGhlciBvYmplY3RzLCBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5zXG5cdFx0Ly8gdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Rcblx0XHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdFx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb2JqMTtcblx0XHR9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBhcnJheSBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYW4gYXJyYXksIG1ha2UgaXQgYW4gZW1wdHkgYXJyYXkgZmlyc3Rcblx0XHRhcnJheShvYmosIG5hbWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0gW10gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgdGFraW5nIGFuIGFycmF5IGxpa2UgYEZ1bmN0aW9uLmFwcGx5YCBkb2VzXG5cdFx0YmluZEEoZm4sIGN0eCwgYXJncykgeyByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKSB9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgb25seSBoYXZpbmcgdG8gc3BlY2lmeSB0aGUgY29udGV4dC1vYmplY3Qgb25jZVxuXHRcdGJpbmQob2JqLCBtLCAuLi5hcmdzKSB7IHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkXG5cdFx0Ly8gd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVyc1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIE5ld0NvbnN0cnVjdG9yRm4gPSBDb25zdHJ1Y3RvckZuLmJpbmQuYXBwbHkoQ29uc3RydWN0b3JGbiwgW251bGxdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRyZXR1cm4gbmV3IE5ld0NvbnN0cnVjdG9yRm4oKTtcblx0XHR9LFxuXG5cdFx0Ly8gYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYVxuXHRcdC8vIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWVcblx0XHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHRcdH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGBcblx0XHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKVxuXHRcdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyByZXBlYXQgYSBzdHJpbmcgYSBnaXZlbiBudW1iZXIgb2YgdGltZXNcblx0XHRyZXBlYXQobnIsIHN0cikgeyByZXR1cm4gbmV3IEFycmF5KG5yKzEpLmpvaW4oc3RyKSB9XG5cdH07XG5cblx0cmV0dXJuIFU7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21pc2MuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJkZWx0YS5qcyJ9