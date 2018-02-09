(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("ReactDOMServer"), require("Draft"), require("Immutable"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "ReactDOMServer", "Draft", "Immutable"], factory);
	else if(typeof exports === 'object')
		exports["DraftConvert"] = factory(require("React"), require("ReactDOMServer"), require("Draft"), require("Immutable"));
	else
		root["DraftConvert"] = factory(root["React"], root["ReactDOMServer"], root["Draft"], root["Immutable"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_16__, __WEBPACK_EXTERNAL_MODULE_39__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.parseHTML = exports.convertFromHTML = exports.convertToHTML = undefined;

	var _convertToHTML = __webpack_require__(20);

	var _convertToHTML2 = _interopRequireDefault(_convertToHTML);

	var _convertFromHTML = __webpack_require__(19);

	var _convertFromHTML2 = _interopRequireDefault(_convertFromHTML);

	var _parseHTML = __webpack_require__(11);

	var _parseHTML2 = _interopRequireDefault(_parseHTML);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.convertToHTML = _convertToHTML2.default;
	exports.convertFromHTML = _convertFromHTML2.default;
	exports.parseHTML = _parseHTML2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (true) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (r1, r2) {
	  if (r1.offset === r2.offset) {
	    return r2.length - r1.length;
	  }
	  return r1.offset - r2.offset;
	};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = splitReactElement;

	var _invariant = __webpack_require__(2);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(8);

	var _server2 = _interopRequireDefault(_server);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// see http://w3c.github.io/html/syntax.html#writing-html-documents-elements
	var VOID_TAGS = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

	function splitReactElement(element) {
	  if (VOID_TAGS.indexOf(element.type) !== -1) {
	    return _server2.default.renderToStaticMarkup(element);
	  }

	  var tags = _server2.default.renderToStaticMarkup(_react2.default.cloneElement(element, {}, '\r')).split('\r');

	  (0, _invariant2.default)(tags.length > 1, 'convertToHTML: Element of type ' + element.type + ' must render children');

	  (0, _invariant2.default)(tags.length < 3, 'convertToHTML: Element of type ' + element.type + ' cannot use carriage return character');

	  return {
	    start: tags[0],
	    end: tags[1]
	  };
	}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	if (true) {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(5);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (true) {
	  var printWarning = function printWarning(format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };

	  warning = function warning(condition, format) {
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }

	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}

	module.exports = warning;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (newFn, rest) {
	  return function () {
	    var newResult = newFn.apply(undefined, arguments);
	    if (newResult !== undefined && newResult !== null) {
	      return newResult;
	    }

	    return rest.apply(undefined, arguments);
	  };
	};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getElementHTML;

	var _invariant = __webpack_require__(2);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(8);

	var _server2 = _interopRequireDefault(_server);

	var _splitReactElement = __webpack_require__(4);

	var _splitReactElement2 = _interopRequireDefault(_splitReactElement);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function hasChildren(element) {
	  return _react2.default.isValidElement(element) && _react2.default.Children.count(element.props.children) > 0;
	}

	function getElementHTML(element) {
	  var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	  if (element === undefined || element === null) {
	    return element;
	  }

	  if (typeof element === 'string') {
	    return element;
	  }

	  if (_react2.default.isValidElement(element)) {
	    if (hasChildren(element)) {
	      return _server2.default.renderToStaticMarkup(element);
	    }

	    var tags = (0, _splitReactElement2.default)(element);

	    if (text !== null) {
	      var start = tags.start,
	          end = tags.end;

	      return start + text + end;
	    }

	    return tags;
	  }

	  (0, _invariant2.default)(Object.prototype.hasOwnProperty.call(element, 'start') && Object.prototype.hasOwnProperty.call(element, 'end'), 'convertToHTML: received conversion data without either an HTML string, ReactElement or an object with start/end tags');

	  if (text !== null) {
	    var _start = element.start,
	        _end = element.end;

	    return _start + text + _end;
	  }

	  return element;
	}

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = parseHTML;
	var fallback = function fallback(html) {
	  var doc = document.implementation.createHTMLDocument('');
	  doc.documentElement.innerHTML = html;
	  return doc;
	};

	function parseHTML(html) {
	  var doc = void 0;
	  if (typeof DOMParser !== 'undefined') {
	    var parser = new DOMParser();
	    doc = parser.parseFromString(html, 'text/html');
	    if (doc === null || doc.body === null) {
	      doc = fallback(html);
	    }
	  } else {
	    doc = fallback(html);
	  }
	  return doc.body;
	}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = updateMutation;
	function updateMutation(mutation, originalOffset, originalLength, newLength, prefixLength, suffixLength) {
	  // three cases we can reasonably adjust - disjoint mutations that
	  // happen later on where the offset will need to be changed,
	  // mutations that completely contain the new one where we can adjust
	  // the length, and mutations that occur partially within the new one.
	  var lengthDiff = newLength - originalLength;

	  var mutationAfterChange = originalOffset + originalLength <= mutation.offset;
	  if (mutationAfterChange) {
	    return Object.assign({}, mutation, {
	      offset: mutation.offset + lengthDiff
	    });
	  }

	  var mutationContainsChange = originalOffset >= mutation.offset && originalOffset + originalLength <= mutation.offset + mutation.length;
	  if (mutationContainsChange) {
	    return Object.assign({}, mutation, {
	      length: mutation.length + lengthDiff
	    });
	  }

	  var mutationWithinPrefixChange = mutation.offset >= originalOffset && mutation.offset + mutation.length <= originalOffset + originalLength && prefixLength > 0;
	  if (mutationWithinPrefixChange) {
	    return Object.assign({}, mutation, {
	      offset: mutation.offset + prefixLength
	    });
	  }

	  var mutationContainsPrefix = mutation.offset < originalOffset && mutation.offset + mutation.length <= originalOffset + originalLength && mutation.offset + mutation.length > originalOffset && prefixLength > 0;
	  if (mutationContainsPrefix) {
	    return [Object.assign({}, mutation, {
	      length: originalOffset - mutation.offset
	    }), Object.assign({}, mutation, {
	      offset: originalOffset + prefixLength,
	      length: mutation.offset - originalOffset + mutation.length
	    })];
	  }

	  var mutationContainsSuffix = mutation.offset >= originalOffset && mutation.offset + mutation.length > originalOffset + originalLength && originalOffset + originalLength > mutation.offset && suffixLength > 0;
	  if (mutationContainsSuffix) {
	    return [Object.assign({}, mutation, {
	      offset: mutation.offset + prefixLength,
	      length: originalOffset + originalLength - mutation.offset
	    }), Object.assign({}, mutation, {
	      offset: originalOffset + originalLength + prefixLength + suffixLength,
	      length: mutation.offset + mutation.length - (originalOffset + originalLength)
	    })];
	  }

	  return mutation;
	}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	if (true) {
	  var invariant = __webpack_require__(6);
	  var warning = __webpack_require__(7);
	  var ReactPropTypesSecret = __webpack_require__(15);
	  var loggedTypeFailures = {};
	}

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  if (true) {
	    for (var typeSpecName in typeSpecs) {
	      if (typeSpecs.hasOwnProperty(typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	        } catch (ex) {
	          error = ex;
	        }
	        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
	        }
	      }
	    }
	  }
	}

	module.exports = checkPropTypes;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_16__;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _updateMutation = __webpack_require__(12);

	var _updateMutation2 = _interopRequireDefault(_updateMutation);

	var _rangeSort = __webpack_require__(3);

	var _rangeSort2 = _interopRequireDefault(_rangeSort);

	var _getElementHTML = __webpack_require__(10);

	var _getElementHTML2 = _interopRequireDefault(_getElementHTML);

	var _getElementTagLength = __webpack_require__(26);

	var _getElementTagLength2 = _interopRequireDefault(_getElementTagLength);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var converter = function converter() {
	  var entity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var originalText = arguments[1];

	  return originalText;
	};

	exports.default = function (block, entityMap) {
	  var entityConverter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : converter;

	  var resultText = [].concat(_toConsumableArray(block.text));

	  var getEntityHTML = entityConverter;

	  if (entityConverter.__isMiddleware) {
	    getEntityHTML = entityConverter(converter);
	  }

	  if (Object.prototype.hasOwnProperty.call(block, 'entityRanges') && block.entityRanges.length > 0) {
	    var entities = block.entityRanges.sort(_rangeSort2.default);

	    var styles = block.inlineStyleRanges;

	    var _loop = function _loop(index) {
	      var entityRange = entities[index];
	      var entity = entityMap[entityRange.key];

	      var originalText = resultText.slice(entityRange.offset, entityRange.offset + entityRange.length).join('');

	      var entityHTML = getEntityHTML(entity, originalText);
	      var converted = [].concat(_toConsumableArray((0, _getElementHTML2.default)(entityHTML, originalText) || originalText));

	      var prefixLength = (0, _getElementTagLength2.default)(entityHTML, 'start');
	      var suffixLength = (0, _getElementTagLength2.default)(entityHTML, 'end');

	      var updateLaterMutation = function updateLaterMutation(mutation, mutationIndex) {
	        if (mutationIndex > index || Object.prototype.hasOwnProperty.call(mutation, 'style')) {
	          return (0, _updateMutation2.default)(mutation, entityRange.offset, entityRange.length, converted.length, prefixLength, suffixLength);
	        }
	        return mutation;
	      };

	      var updateLaterMutations = function updateLaterMutations(mutationList) {
	        return mutationList.reduce(function (acc, mutation, mutationIndex) {
	          var updatedMutation = updateLaterMutation(mutation, mutationIndex);
	          if (Array.isArray(updatedMutation)) {
	            return acc.concat(updatedMutation);
	          }

	          return acc.concat([updatedMutation]);
	        }, []);
	      };

	      entities = updateLaterMutations(entities);
	      styles = updateLaterMutations(styles);

	      resultText = [].concat(_toConsumableArray(resultText.slice(0, entityRange.offset)), _toConsumableArray(converted), _toConsumableArray(resultText.slice(entityRange.offset + entityRange.length)));
	    };

	    for (var index = 0; index < entities.length; index++) {
	      _loop(index);
	    }

	    return Object.assign({}, block, {
	      text: resultText.join(''),
	      inlineStyleRanges: styles,
	      entityRanges: entities
	    });
	  }

	  return block;
	};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _invariant = __webpack_require__(2);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _styleObjectFunction = __webpack_require__(28);

	var _styleObjectFunction2 = _interopRequireDefault(_styleObjectFunction);

	var _accumulateFunction = __webpack_require__(9);

	var _accumulateFunction2 = _interopRequireDefault(_accumulateFunction);

	var _getElementHTML = __webpack_require__(10);

	var _getElementHTML2 = _interopRequireDefault(_getElementHTML);

	var _rangeSort = __webpack_require__(3);

	var _rangeSort2 = _interopRequireDefault(_rangeSort);

	var _defaultInlineHTML = __webpack_require__(22);

	var _defaultInlineHTML2 = _interopRequireDefault(_defaultInlineHTML);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var subtractStyles = function subtractStyles(original, toRemove) {
	  return original.filter(function (el) {
	    return !toRemove.some(function (elToRemove) {
	      return elToRemove.style === el.style;
	    });
	  });
	};

	var popEndingStyles = function popEndingStyles(styleStack, endingStyles) {
	  return endingStyles.reduceRight(function (stack, style) {
	    var styleToRemove = stack[stack.length - 1];

	    (0, _invariant2.default)(styleToRemove.style === style.style, 'Style ' + styleToRemove.style + ' to be removed doesn\'t match expected ' + style.style);

	    return stack.slice(0, -1);
	  }, styleStack);
	};

	var characterStyles = function characterStyles(offset, ranges) {
	  return ranges.filter(function (range) {
	    return offset >= range.offset && offset < range.offset + range.length;
	  });
	};

	var rangeIsSubset = function rangeIsSubset(firstRange, secondRange) {
	  // returns true if the second range is a subset of the first
	  var secondStartWithinFirst = firstRange.offset <= secondRange.offset;
	  var secondEndWithinFirst = firstRange.offset + firstRange.length >= secondRange.offset + secondRange.length;

	  return secondStartWithinFirst && secondEndWithinFirst;
	};

	var latestStyleLast = function latestStyleLast(s1, s2) {
	  // make sure longer-lasting styles are added first
	  var s2endIndex = s2.offset + s2.length;
	  var s1endIndex = s1.offset + s1.length;
	  return s2endIndex - s1endIndex;
	};

	var getStylesToReset = function getStylesToReset(remainingStyles, newStyles) {
	  var i = 0;
	  while (i < remainingStyles.length) {
	    if (newStyles.every(rangeIsSubset.bind(null, remainingStyles[i]))) {
	      i++;
	    } else {
	      return remainingStyles.slice(i);
	    }
	  }
	  return [];
	};

	var appendStartMarkup = function appendStartMarkup(inlineHTML, string, styleRange) {
	  return string + (0, _getElementHTML2.default)(inlineHTML(styleRange.style)).start;
	};

	var prependEndMarkup = function prependEndMarkup(inlineHTML, string, styleRange) {
	  return (0, _getElementHTML2.default)(inlineHTML(styleRange.style)).end + string;
	};

	var defaultCustomInlineHTML = function defaultCustomInlineHTML(next) {
	  return function (style) {
	    return next(style);
	  };
	};
	defaultCustomInlineHTML.__isMiddleware = true;

	exports.default = function (rawBlock) {
	  var customInlineHTML = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultCustomInlineHTML;

	  (0, _invariant2.default)(rawBlock !== null && rawBlock !== undefined, 'Expected raw block to be non-null');

	  var inlineHTML = void 0;
	  if (customInlineHTML.__isMiddleware === true) {
	    inlineHTML = customInlineHTML(_defaultInlineHTML2.default);
	  } else {
	    inlineHTML = (0, _accumulateFunction2.default)((0, _styleObjectFunction2.default)(customInlineHTML), (0, _styleObjectFunction2.default)(_defaultInlineHTML2.default));
	  }

	  var result = '';
	  var styleStack = [];

	  var sortedRanges = rawBlock.inlineStyleRanges.sort(_rangeSort2.default);

	  var originalTextArray = [].concat(_toConsumableArray(rawBlock.text));

	  for (var i = 0; i < originalTextArray.length; i++) {
	    var styles = characterStyles(i, sortedRanges);

	    var endingStyles = subtractStyles(styleStack, styles);
	    var newStyles = subtractStyles(styles, styleStack);
	    var remainingStyles = subtractStyles(styleStack, endingStyles);

	    // reset styles: look for any already existing styles that will need to
	    // end before styles that are being added on this character. to solve this
	    // close out those current tags and all nested children,
	    // then open new ones nested within the new styles.
	    var resetStyles = getStylesToReset(remainingStyles, newStyles);

	    var openingStyles = resetStyles.concat(newStyles).sort(latestStyleLast);

	    var openingStyleTags = openingStyles.reduce(appendStartMarkup.bind(null, inlineHTML), '');
	    var endingStyleTags = endingStyles.concat(resetStyles).reduce(prependEndMarkup.bind(null, inlineHTML), '');

	    result += endingStyleTags + openingStyleTags + originalTextArray[i];

	    styleStack = popEndingStyles(styleStack, resetStyles.concat(endingStyles));
	    styleStack = styleStack.concat(openingStyles);

	    (0, _invariant2.default)(styleStack.length === styles.length, 'Character ' + i + ': ' + (styleStack.length - styles.length) + ' styles left on stack that should no longer be there');
	  }

	  result = styleStack.reduceRight(function (res, openStyle) {
	    return res + (0, _getElementHTML2.default)(inlineHTML(openStyle.style)).end;
	  }, result);

	  return result;
	};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _immutable = __webpack_require__(39);

	var _draftJs = __webpack_require__(16);

	var _parseHTML = __webpack_require__(11);

	var _parseHTML2 = _interopRequireDefault(_parseHTML);

	var _rangeSort = __webpack_require__(3);

	var _rangeSort2 = _interopRequireDefault(_rangeSort);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the /src directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	var NBSP = '&nbsp;';
	var SPACE = ' ';

	// Arbitrary max indent
	var MAX_DEPTH = 4;

	// used for replacing characters in HTML
	/* eslint-disable no-control-regex */
	var REGEX_CR = new RegExp('\r', 'g');
	var REGEX_LF = new RegExp('\n', 'g');
	var REGEX_NBSP = new RegExp(NBSP, 'g');
	var REGEX_BLOCK_DELIMITER = new RegExp('\r', 'g');
	/* eslint-enable no-control-regex */

	// Block tag flow is different because LIs do not have
	// a deterministic style ;_;
	var blockTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'blockquote', 'pre'];
	var inlineTags = {
	  b: 'BOLD',
	  code: 'CODE',
	  del: 'STRIKETHROUGH',
	  em: 'ITALIC',
	  i: 'ITALIC',
	  s: 'STRIKETHROUGH',
	  strike: 'STRIKETHROUGH',
	  strong: 'BOLD',
	  u: 'UNDERLINE'
	};

	var handleMiddleware = function handleMiddleware(maybeMiddleware, base) {
	  if (maybeMiddleware && maybeMiddleware.__isMiddleware === true) {
	    return maybeMiddleware(base);
	  }

	  return maybeMiddleware;
	};

	var defaultHTMLToBlock = function defaultHTMLToBlock(nodeName, node, lastList) {
	  return undefined;
	};

	var defaultHTMLToStyle = function defaultHTMLToStyle(nodeName, node, currentStyle) {
	  return currentStyle;
	};

	var defaultHTMLToEntity = function defaultHTMLToEntity(nodeName, node) {
	  return undefined;
	};

	var defaultTextToEntity = function defaultTextToEntity(text) {
	  return [];
	};

	var nullthrows = function nullthrows(x) {
	  if (x != null) {
	    return x;
	  }
	  throw new Error('Got unexpected null or undefined');
	};

	var sanitizeDraftText = function sanitizeDraftText(input) {
	  return input.replace(REGEX_BLOCK_DELIMITER, '');
	};

	function getEmptyChunk() {
	  return {
	    text: '',
	    inlines: [],
	    entities: [],
	    blocks: []
	  };
	}

	function getWhitespaceChunk(inEntity) {
	  var entities = new Array(1);
	  if (inEntity) {
	    entities[0] = inEntity;
	  }
	  return {
	    text: SPACE,
	    inlines: [(0, _immutable.OrderedSet)()],
	    entities: entities,
	    blocks: []
	  };
	}

	function getSoftNewlineChunk(block, depth) {
	  var flat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	  var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : (0, _immutable.Map)();

	  if (flat === true) {
	    return {
	      text: '\r',
	      inlines: [(0, _immutable.OrderedSet)()],
	      entities: new Array(1),
	      blocks: [{
	        type: block,
	        data: data,
	        depth: Math.max(0, Math.min(MAX_DEPTH, depth))
	      }],
	      isNewline: true
	    };
	  }

	  return {
	    text: '\n',
	    inlines: [(0, _immutable.OrderedSet)()],
	    entities: new Array(1),
	    blocks: []
	  };
	}

	function getBlockDividerChunk(block, depth) {
	  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (0, _immutable.Map)();

	  return {
	    text: '\r',
	    inlines: [(0, _immutable.OrderedSet)()],
	    entities: new Array(1),
	    blocks: [{
	      type: block,
	      data: data,
	      depth: Math.max(0, Math.min(MAX_DEPTH, depth))
	    }]
	  };
	}

	function getBlockTypeForTag(tag, lastList) {
	  switch (tag) {
	    case 'h1':
	      return 'header-one';
	    case 'h2':
	      return 'header-two';
	    case 'h3':
	      return 'header-three';
	    case 'h4':
	      return 'header-four';
	    case 'h5':
	      return 'header-five';
	    case 'h6':
	      return 'header-six';
	    case 'li':
	      if (lastList === 'ol') {
	        return 'ordered-list-item';
	      }
	      return 'unordered-list-item';
	    case 'blockquote':
	      return 'blockquote';
	    case 'pre':
	      return 'code-block';
	    case 'div':
	    case 'p':
	      return 'unstyled';
	    default:
	      return null;
	  }
	}

	function baseCheckBlockType(nodeName, node, lastList) {
	  return getBlockTypeForTag(nodeName, lastList);
	}

	function processInlineTag(tag, node, currentStyle) {
	  var styleToCheck = inlineTags[tag];
	  if (styleToCheck) {
	    currentStyle = currentStyle.add(styleToCheck).toOrderedSet();
	  } else if (node instanceof HTMLElement) {
	    var htmlElement = node;
	    currentStyle = currentStyle.withMutations(function (style) {
	      if (htmlElement.style.fontWeight === 'bold') {
	        style.add('BOLD');
	      }

	      if (htmlElement.style.fontStyle === 'italic') {
	        style.add('ITALIC');
	      }

	      if (htmlElement.style.textDecoration === 'underline') {
	        style.add('UNDERLINE');
	      }

	      if (htmlElement.style.textDecoration === 'line-through') {
	        style.add('STRIKETHROUGH');
	      }
	    }).toOrderedSet();
	  }
	  return currentStyle;
	}

	function baseProcessInlineTag(tag, node) {
	  return processInlineTag(tag, node, (0, _immutable.OrderedSet)());
	}

	function joinChunks(A, B) {
	  var flat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	  // Sometimes two blocks will touch in the DOM and we need to strip the
	  // extra delimiter to preserve niceness.
	  var firstInB = B.text.slice(0, 1);
	  var lastInA = A.text.slice(-1);

	  var adjacentDividers = lastInA === '\r' && firstInB === '\r';
	  var isJoiningBlocks = A.text !== '\r' && B.text !== '\r'; // when joining two full blocks like this we want to pop one divider
	  var addingNewlineToEmptyBlock = A.text === '\r' && !A.isNewline && B.isNewline; // when joining a newline to an empty block we want to remove the newline

	  if (adjacentDividers && (isJoiningBlocks || addingNewlineToEmptyBlock)) {
	    A.text = A.text.slice(0, -1);
	    A.inlines.pop();
	    A.entities.pop();
	    A.blocks.pop();
	  }

	  // Kill whitespace after blocks if flat mode is on
	  if (A.text.slice(-1) === '\r' && flat === true) {
	    if (B.text === SPACE || B.text === '\n') {
	      return A;
	    } else if (firstInB === SPACE || firstInB === '\n') {
	      B.text = B.text.slice(1);
	      B.inlines.shift();
	      B.entities.shift();
	    }
	  }

	  var isNewline = A.text.length === 0 && B.isNewline;

	  return {
	    text: A.text + B.text,
	    inlines: A.inlines.concat(B.inlines),
	    entities: A.entities.concat(B.entities),
	    blocks: A.blocks.concat(B.blocks),
	    isNewline: isNewline
	  };
	}

	/*
	 * Check to see if we have anything like <p> <blockquote> <h1>... to create
	 * block tags from. If we do, we can use those and ignore <div> tags. If we
	 * don't, we can treat <div> tags as meaningful (unstyled) blocks.
	 */
	function containsSemanticBlockMarkup(html) {
	  return blockTags.some(function (tag) {
	    return html.indexOf('<' + tag) !== -1;
	  });
	}

	function genFragment(node, inlineStyle, lastList, inBlock, fragmentBlockTags, depth, processCustomInlineStyles, checkEntityNode, checkEntityText, checkBlockType, createEntity, getEntity, mergeEntityData, replaceEntityData, options, inEntity) {
	  var nodeName = node.nodeName.toLowerCase();
	  var newBlock = false;
	  var nextBlockType = 'unstyled';

	  // Base Case
	  if (nodeName === '#text') {
	    var text = node.textContent;
	    if (text.trim() === '' && inBlock === null) {
	      return getEmptyChunk();
	    }

	    if (text.trim() === '' && inBlock !== 'code-block') {
	      return getWhitespaceChunk(inEntity);
	    }
	    if (inBlock !== 'code-block') {
	      // Can't use empty string because MSWord
	      text = text.replace(REGEX_LF, SPACE);
	    }

	    var entities = Array(text.length).fill(inEntity);

	    var offsetChange = 0;
	    var textEntities = checkEntityText(text, createEntity, getEntity, mergeEntityData, replaceEntityData).sort(_rangeSort2.default);

	    textEntities.forEach(function (_ref) {
	      var entity = _ref.entity,
	          offset = _ref.offset,
	          length = _ref.length,
	          result = _ref.result;

	      var adjustedOffset = offset + offsetChange;

	      if (result === null || result === undefined) {
	        result = text.substr(adjustedOffset, length);
	      }

	      var textArray = text.split('');
	      textArray.splice.bind(textArray, adjustedOffset, length).apply(textArray, result.split(''));
	      text = textArray.join('');

	      entities.splice.bind(entities, adjustedOffset, length).apply(entities, Array(result.length).fill(entity));
	      offsetChange += result.length - length;
	    });

	    return {
	      text: text,
	      inlines: Array(text.length).fill(inlineStyle),
	      entities: entities,
	      blocks: []
	    };
	  }

	  // BR tags
	  if (nodeName === 'br') {
	    var _blockType = inBlock;

	    if (_blockType === null) {
	      //  BR tag is at top level, treat it as an unstyled block
	      return getSoftNewlineChunk('unstyled', depth, true);
	    }

	    return getSoftNewlineChunk(_blockType || 'unstyled', depth, options.flat);
	  }

	  var chunk = getEmptyChunk();
	  var newChunk = null;

	  // Inline tags
	  inlineStyle = processInlineTag(nodeName, node, inlineStyle);
	  inlineStyle = processCustomInlineStyles(nodeName, node, inlineStyle);

	  // Handle lists
	  if (nodeName === 'ul' || nodeName === 'ol') {
	    if (lastList) {
	      depth += 1;
	    }
	    lastList = nodeName;
	    inBlock = null;
	  }

	  // Block Tags
	  var blockInfo = checkBlockType(nodeName, node, lastList, inBlock);
	  var blockType = void 0;
	  var blockDataMap = void 0;

	  if (blockInfo === false) {
	    return getEmptyChunk();
	  }

	  blockInfo = blockInfo || {};

	  if (typeof blockInfo === 'string') {
	    blockType = blockInfo;
	    blockDataMap = (0, _immutable.Map)();
	  } else {
	    blockType = typeof blockInfo === 'string' ? blockInfo : blockInfo.type;
	    blockDataMap = blockInfo.data ? (0, _immutable.Map)(blockInfo.data) : (0, _immutable.Map)();
	  }
	  if (!inBlock && (fragmentBlockTags.indexOf(nodeName) !== -1 || blockType)) {
	    chunk = getBlockDividerChunk(blockType || getBlockTypeForTag(nodeName, lastList), depth, blockDataMap);
	    inBlock = blockType || getBlockTypeForTag(nodeName, lastList);
	    newBlock = true;
	  } else if (lastList && (inBlock === 'ordered-list-item' || inBlock === 'unordered-list-item') && nodeName === 'li') {
	    var listItemBlockType = getBlockTypeForTag(nodeName, lastList);
	    chunk = getBlockDividerChunk(listItemBlockType, depth);
	    inBlock = listItemBlockType;
	    newBlock = true;
	    nextBlockType = lastList === 'ul' ? 'unordered-list-item' : 'ordered-list-item';
	  } else if (inBlock && inBlock !== 'atomic' && blockType === 'atomic') {
	    inBlock = blockType;
	    newBlock = true;
	    chunk = getSoftNewlineChunk(blockType, depth, true, // atomic blocks within non-atomic blocks must always be split out
	    blockDataMap);
	  }

	  // Recurse through children
	  var child = node.firstChild;

	  // hack to allow conversion of atomic blocks from HTML (e.g. <figure><img
	  // src="..." /></figure>). since metadata must be stored on an entity text
	  // must exist for the entity to apply to. the way chunks are joined strips
	  // whitespace at the end so it cannot be a space character.

	  if (child == null && inEntity && (blockType === 'atomic' || inBlock === 'atomic')) {
	    child = document.createTextNode('a');
	  }

	  if (child != null) {
	    nodeName = child.nodeName.toLowerCase();
	  }

	  var entityId = null;

	  while (child) {
	    entityId = checkEntityNode(nodeName, child, createEntity, getEntity, mergeEntityData, replaceEntityData);

	    newChunk = genFragment(child, inlineStyle, lastList, inBlock, fragmentBlockTags, depth, processCustomInlineStyles, checkEntityNode, checkEntityText, checkBlockType, createEntity, getEntity, mergeEntityData, replaceEntityData, options, entityId || inEntity);

	    chunk = joinChunks(chunk, newChunk, options.flat);
	    var sibling = child.nextSibling;

	    // Put in a newline to break up blocks inside blocks
	    if (sibling && fragmentBlockTags.indexOf(nodeName) >= 0 && inBlock) {
	      var newBlockInfo = checkBlockType(nodeName, child, lastList, inBlock);

	      var newBlockType = void 0;
	      var newBlockData = void 0;

	      if (newBlockInfo !== false) {
	        newBlockInfo = newBlockInfo || {};

	        if (typeof newBlockInfo === 'string') {
	          newBlockType = newBlockInfo;
	          newBlockData = (0, _immutable.Map)();
	        } else {
	          newBlockType = newBlockInfo.type || getBlockTypeForTag(nodeName, lastList);
	          newBlockData = newBlockInfo.data ? (0, _immutable.Map)(newBlockInfo.data) : (0, _immutable.Map)();
	        }

	        chunk = joinChunks(chunk, getSoftNewlineChunk(newBlockType, depth, options.flat, newBlockData), options.flat);
	      }
	    }
	    if (sibling) {
	      nodeName = sibling.nodeName.toLowerCase();
	    }
	    child = sibling;
	  }

	  if (newBlock) {
	    chunk = joinChunks(chunk, getBlockDividerChunk(nextBlockType, depth, (0, _immutable.Map)()), options.flat);
	  }

	  return chunk;
	}

	function getChunkForHTML(html, processCustomInlineStyles, checkEntityNode, checkEntityText, checkBlockType, createEntity, getEntity, mergeEntityData, replaceEntityData, options, DOMBuilder) {
	  html = html.trim().replace(REGEX_CR, '').replace(REGEX_NBSP, SPACE);

	  var safeBody = DOMBuilder(html);
	  if (!safeBody) {
	    return null;
	  }

	  // Sometimes we aren't dealing with content that contains nice semantic
	  // tags. In this case, use divs to separate everything out into paragraphs
	  // and hope for the best.
	  var workingBlocks = containsSemanticBlockMarkup(html) ? blockTags.concat(['div']) : ['div'];

	  // Start with -1 block depth to offset the fact that we are passing in a fake
	  // UL block to sta rt with.
	  var chunk = genFragment(safeBody, (0, _immutable.OrderedSet)(), 'ul', null, workingBlocks, -1, processCustomInlineStyles, checkEntityNode, checkEntityText, checkBlockType, createEntity, getEntity, mergeEntityData, replaceEntityData, options);

	  // join with previous block to prevent weirdness on paste
	  if (chunk.text.indexOf('\r') === 0) {
	    chunk = {
	      text: chunk.text.slice(1),
	      inlines: chunk.inlines.slice(1),
	      entities: chunk.entities.slice(1),
	      blocks: chunk.blocks
	    };
	  }

	  // Kill block delimiter at the end
	  if (chunk.text.slice(-1) === '\r') {
	    chunk.text = chunk.text.slice(0, -1);
	    chunk.inlines = chunk.inlines.slice(0, -1);
	    chunk.entities = chunk.entities.slice(0, -1);
	    chunk.blocks.pop();
	  }

	  // If we saw no block tags, put an unstyled one in
	  if (chunk.blocks.length === 0) {
	    chunk.blocks.push({ type: 'unstyled', data: (0, _immutable.Map)(), depth: 0 });
	  }

	  // Sometimes we start with text that isn't in a block, which is then
	  // followed by blocks. Need to fix up the blocks to add in
	  // an unstyled block for this content
	  if (chunk.text.split('\r').length === chunk.blocks.length + 1) {
	    chunk.blocks.unshift({ type: 'unstyled', data: (0, _immutable.Map)(), depth: 0 });
	  }

	  return chunk;
	}

	function convertFromHTMLtoContentBlocks(html, processCustomInlineStyles, checkEntityNode, checkEntityText, checkBlockType, createEntity, getEntity, mergeEntityData, replaceEntityData, options, DOMBuilder) {
	  // Be ABSOLUTELY SURE that the dom builder you pass hare won't execute
	  // arbitrary code in whatever environment you're running this in. For an
	  // example of how we try to do this in-browser, see getSafeBodyFromHTML.

	  var chunk = getChunkForHTML(html, processCustomInlineStyles, checkEntityNode, checkEntityText, checkBlockType, createEntity, getEntity, mergeEntityData, replaceEntityData, options, DOMBuilder);
	  if (chunk == null) {
	    return [];
	  }
	  var start = 0;
	  return chunk.text.split('\r').map(function (textBlock, blockIndex) {
	    // Make absolutely certain that our text is acceptable.
	    textBlock = sanitizeDraftText(textBlock);
	    var end = start + textBlock.length;
	    var inlines = nullthrows(chunk).inlines.slice(start, end);
	    var entities = nullthrows(chunk).entities.slice(start, end);
	    var characterList = (0, _immutable.List)(inlines.map(function (style, entityIndex) {
	      var data = { style: style, entity: null };
	      if (entities[entityIndex]) {
	        data.entity = entities[entityIndex];
	      }
	      return _draftJs.CharacterMetadata.create(data);
	    }));
	    start = end + 1;

	    return new _draftJs.ContentBlock({
	      key: (0, _draftJs.genKey)(),
	      type: nullthrows(chunk).blocks[blockIndex].type,
	      data: nullthrows(chunk).blocks[blockIndex].data,
	      depth: nullthrows(chunk).blocks[blockIndex].depth,
	      text: textBlock,
	      characterList: characterList
	    });
	  });
	}

	var convertFromHTML = function convertFromHTML(_ref2) {
	  var _ref2$htmlToStyle = _ref2.htmlToStyle,
	      htmlToStyle = _ref2$htmlToStyle === undefined ? defaultHTMLToStyle : _ref2$htmlToStyle,
	      _ref2$htmlToEntity = _ref2.htmlToEntity,
	      htmlToEntity = _ref2$htmlToEntity === undefined ? defaultHTMLToEntity : _ref2$htmlToEntity,
	      _ref2$textToEntity = _ref2.textToEntity,
	      textToEntity = _ref2$textToEntity === undefined ? defaultTextToEntity : _ref2$textToEntity,
	      _ref2$htmlToBlock = _ref2.htmlToBlock,
	      htmlToBlock = _ref2$htmlToBlock === undefined ? defaultHTMLToBlock : _ref2$htmlToBlock;
	  return function (html) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
	      flat: false
	    };
	    var DOMBuilder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _parseHTML2.default;

	    var contentState = _draftJs.ContentState.createFromText('');
	    var createEntityWithContentState = function createEntityWithContentState() {
	      if (contentState.createEntity) {
	        var _contentState;

	        contentState = (_contentState = contentState).createEntity.apply(_contentState, arguments);
	        return contentState.getLastCreatedEntityKey();
	      }

	      return _draftJs.Entity.create.apply(_draftJs.Entity, arguments);
	    };

	    var getEntityWithContentState = function getEntityWithContentState() {
	      if (contentState.getEntity) {
	        var _contentState2;

	        return (_contentState2 = contentState).getEntity.apply(_contentState2, arguments);
	      }

	      return _draftJs.Entity.get.apply(_draftJs.Entity, arguments);
	    };

	    var mergeEntityDataWithContentState = function mergeEntityDataWithContentState() {
	      if (contentState.mergeEntityData) {
	        var _contentState3;

	        contentState = (_contentState3 = contentState).mergeEntityData.apply(_contentState3, arguments);
	        return;
	      }

	      _draftJs.Entity.mergeData.apply(_draftJs.Entity, arguments);
	    };

	    var replaceEntityDataWithContentState = function replaceEntityDataWithContentState() {
	      if (contentState.replaceEntityData) {
	        var _contentState4;

	        contentState = (_contentState4 = contentState).replaceEntityData.apply(_contentState4, arguments);
	        return;
	      }

	      _draftJs.Entity.replaceData.apply(_draftJs.Entity, arguments);
	    };

	    var contentBlocks = convertFromHTMLtoContentBlocks(html, handleMiddleware(htmlToStyle, baseProcessInlineTag), handleMiddleware(htmlToEntity, defaultHTMLToEntity), handleMiddleware(textToEntity, defaultTextToEntity), handleMiddleware(htmlToBlock, baseCheckBlockType), createEntityWithContentState, getEntityWithContentState, mergeEntityDataWithContentState, replaceEntityDataWithContentState, options, DOMBuilder);

	    var blockMap = _draftJs.BlockMapBuilder.createFromArray(contentBlocks);
	    return contentState.set('blockMap', blockMap);
	  };
	};

	exports.default = function () {
	  if (arguments.length >= 1 && typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'string') {
	    return convertFromHTML({}).apply(undefined, arguments);
	  }
	  return convertFromHTML.apply(undefined, arguments);
	};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _invariant = __webpack_require__(2);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(38);

	var _server2 = _interopRequireDefault(_server);

	var _draftJs = __webpack_require__(16);

	var _encodeBlock = __webpack_require__(23);

	var _encodeBlock2 = _interopRequireDefault(_encodeBlock);

	var _blockEntities = __webpack_require__(17);

	var _blockEntities2 = _interopRequireDefault(_blockEntities);

	var _blockInlineStyles = __webpack_require__(18);

	var _blockInlineStyles2 = _interopRequireDefault(_blockInlineStyles);

	var _accumulateFunction = __webpack_require__(9);

	var _accumulateFunction2 = _interopRequireDefault(_accumulateFunction);

	var _blockTypeObjectFunction = __webpack_require__(24);

	var _blockTypeObjectFunction2 = _interopRequireDefault(_blockTypeObjectFunction);

	var _getBlockTags = __webpack_require__(25);

	var _getBlockTags2 = _interopRequireDefault(_getBlockTags);

	var _getNestedBlockTags = __webpack_require__(27);

	var _getNestedBlockTags2 = _interopRequireDefault(_getNestedBlockTags);

	var _defaultBlockHTML = __webpack_require__(21);

	var _defaultBlockHTML2 = _interopRequireDefault(_defaultBlockHTML);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import Immutable from 'immutable'; // eslint-disable-line no-unused-vars
	var NESTED_BLOCK_TYPES = ['ordered-list-item', 'unordered-list-item'];

	var defaultEntityToHTML = function defaultEntityToHTML(entity, originalText) {
	  return originalText;
	};

	var convertToHTML = function convertToHTML(_ref) {
	  var _ref$styleToHTML = _ref.styleToHTML,
	      styleToHTML = _ref$styleToHTML === undefined ? {} : _ref$styleToHTML,
	      _ref$blockToHTML = _ref.blockToHTML,
	      blockToHTML = _ref$blockToHTML === undefined ? {} : _ref$blockToHTML,
	      _ref$entityToHTML = _ref.entityToHTML,
	      entityToHTML = _ref$entityToHTML === undefined ? defaultEntityToHTML : _ref$entityToHTML;
	  return function (contentState) {
	    (0, _invariant2.default)(contentState !== null && contentState !== undefined, 'Expected contentState to be non-null');

	    var getBlockHTML = void 0;
	    if (blockToHTML.__isMiddleware === true) {
	      getBlockHTML = blockToHTML((0, _blockTypeObjectFunction2.default)(_defaultBlockHTML2.default));
	    } else {
	      getBlockHTML = (0, _accumulateFunction2.default)((0, _blockTypeObjectFunction2.default)(blockToHTML), (0, _blockTypeObjectFunction2.default)(_defaultBlockHTML2.default));
	    }

	    var rawState = (0, _draftJs.convertToRaw)(contentState);

	    var listStack = [];

	    var result = rawState.blocks.map(function (block) {
	      var type = block.type,
	          depth = block.depth;


	      var closeNestTags = '';
	      var openNestTags = '';

	      if (NESTED_BLOCK_TYPES.indexOf(type) === -1) {
	        // this block can't be nested, so reset all nesting if necessary
	        closeNestTags = listStack.reduceRight(function (string, nestedBlock) {
	          return string + (0, _getNestedBlockTags2.default)(getBlockHTML(nestedBlock)).nestEnd;
	        }, '');
	        listStack = [];
	      } else {
	        while (depth + 1 !== listStack.length || type !== listStack[depth].type) {
	          if (depth + 1 === listStack.length) {
	            // depth is right but doesn't match type
	            var blockToClose = listStack[depth];
	            closeNestTags += (0, _getNestedBlockTags2.default)(getBlockHTML(blockToClose)).nestEnd;
	            openNestTags += (0, _getNestedBlockTags2.default)(getBlockHTML(block)).nestStart;
	            listStack[depth] = block;
	          } else if (depth + 1 < listStack.length) {
	            var _blockToClose = listStack[listStack.length - 1];
	            closeNestTags += (0, _getNestedBlockTags2.default)(getBlockHTML(_blockToClose)).nestEnd;
	            listStack = listStack.slice(0, -1);
	          } else {
	            openNestTags += (0, _getNestedBlockTags2.default)(getBlockHTML(block)).nestStart;
	            listStack.push(block);
	          }
	        }
	      }

	      var innerHTML = (0, _blockInlineStyles2.default)((0, _blockEntities2.default)((0, _encodeBlock2.default)(block), rawState.entityMap, entityToHTML), styleToHTML);

	      var blockHTML = (0, _getBlockTags2.default)(getBlockHTML(block));

	      var html = void 0;

	      if (typeof blockHTML === 'string') {
	        html = blockHTML;
	      } else {
	        html = blockHTML.start + innerHTML + blockHTML.end;
	      }

	      if (innerHTML.length === 0 && Object.prototype.hasOwnProperty.call(blockHTML, 'empty')) {
	        if (_react2.default.isValidElement(blockHTML.empty)) {
	          html = _server2.default.renderToStaticMarkup(blockHTML.empty);
	        } else {
	          html = blockHTML.empty;
	        }
	      }

	      return closeNestTags + openNestTags + html;
	    }).join('');

	    result = listStack.reduce(function (res, nestBlock) {
	      return res + (0, _getNestedBlockTags2.default)(getBlockHTML(nestBlock)).nestEnd;
	    }, result);

	    return result;
	  };
	};

	exports.default = function () {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  if (args.length === 1 && Object.prototype.hasOwnProperty.call(args[0], '_map') && args[0].getBlockMap != null) {
	    // skip higher-order function and use defaults
	    return convertToHTML({}).apply(undefined, args);
	  }

	  return convertToHTML.apply(undefined, args);
	};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  'unstyled': _react2.default.createElement('p', null),
	  'paragraph': _react2.default.createElement('p', null),
	  'header-one': _react2.default.createElement('h1', null),
	  'header-two': _react2.default.createElement('h2', null),
	  'header-three': _react2.default.createElement('h3', null),
	  'header-four': _react2.default.createElement('h4', null),
	  'header-five': _react2.default.createElement('h5', null),
	  'header-six': _react2.default.createElement('h6', null),
	  'blockquote': _react2.default.createElement('blockquote', null),
	  'unordered-list-item': {
	    element: _react2.default.createElement('li', null),
	    nest: _react2.default.createElement('ul', null)
	  },
	  'ordered-list-item': {
	    element: _react2.default.createElement('li', null),
	    nest: _react2.default.createElement('ol', null)
	  },
	  'media': _react2.default.createElement('figure', null)
	};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = defaultInlineHTML;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function defaultInlineHTML(style) {
	  switch (style) {
	    case 'BOLD':
	      return _react2.default.createElement('strong', null);
	    case 'ITALIC':
	      return _react2.default.createElement('em', null);
	    case 'UNDERLINE':
	      return _react2.default.createElement('u', null);
	    case 'CODE':
	      return _react2.default.createElement('code', null);
	    default:
	      return {
	        start: '',
	        end: ''
	      };
	  }
	}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _updateMutation = __webpack_require__(12);

	var _updateMutation2 = _interopRequireDefault(_updateMutation);

	var _rangeSort = __webpack_require__(3);

	var _rangeSort2 = _interopRequireDefault(_rangeSort);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var ENTITY_MAP = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#x27;',
	  '`': '&#x60;',
	  '\n': '<br/>'
	};

	exports.default = function (block) {
	  var blockText = [].concat(_toConsumableArray(block.text));

	  var entities = block.entityRanges.sort(_rangeSort2.default);
	  var styles = block.inlineStyleRanges.sort(_rangeSort2.default);
	  var resultText = '';

	  var _loop = function _loop(index) {
	    var char = blockText[index];

	    if (ENTITY_MAP[char] !== undefined) {
	      var encoded = ENTITY_MAP[char];
	      var resultIndex = resultText.length;
	      resultText += encoded;

	      var updateForChar = function updateForChar(mutation) {
	        return (0, _updateMutation2.default)(mutation, resultIndex, char.length, encoded.length, 0, 0);
	      };

	      entities = entities.map(updateForChar);
	      styles = styles.map(updateForChar);
	    } else {
	      resultText += char;
	    }
	  };

	  for (var index = 0; index < blockText.length; index++) {
	    _loop(index);
	  }

	  return Object.assign({}, block, {
	    text: resultText,
	    inlineStyleRanges: styles,
	    entityRanges: entities
	  });
	};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (typeObject) {
	  return function (block) {
	    if (typeof typeObject === 'function') {
	      // handle case where typeObject is already a function
	      return typeObject(block);
	    }

	    return typeObject[block.type];
	  };
	};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getBlockTags;

	var _invariant = __webpack_require__(2);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(8);

	var _server2 = _interopRequireDefault(_server);

	var _splitReactElement = __webpack_require__(4);

	var _splitReactElement2 = _interopRequireDefault(_splitReactElement);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function hasChildren(element) {
	  return _react2.default.isValidElement(element) && _react2.default.Children.count(element.props.children) > 0;
	}

	function getBlockTags(blockHTML) {
	  (0, _invariant2.default)(blockHTML !== null && blockHTML !== undefined, 'Expected block HTML value to be non-null');

	  if (typeof blockHTML === 'string') {
	    return blockHTML;
	  }

	  if (_react2.default.isValidElement(blockHTML)) {
	    if (hasChildren(blockHTML)) {
	      return _server2.default.renderToStaticMarkup(blockHTML);
	    }

	    return (0, _splitReactElement2.default)(blockHTML);
	  }

	  if (Object.prototype.hasOwnProperty.call(blockHTML, 'element') && _react2.default.isValidElement(blockHTML.element)) {
	    return Object.assign({}, blockHTML, (0, _splitReactElement2.default)(blockHTML.element));
	  }

	  (0, _invariant2.default)(Object.prototype.hasOwnProperty.call(blockHTML, 'start') && Object.prototype.hasOwnProperty.call(blockHTML, 'end'), 'convertToHTML: received block information without either a ReactElement or an object with start/end tags');

	  return blockHTML;
	}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _splitReactElement = __webpack_require__(4);

	var _splitReactElement2 = _interopRequireDefault(_splitReactElement);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var getElementTagLength = function getElementTagLength(element) {
	  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'start';

	  if (_react2.default.isValidElement(element)) {
	    var length = (0, _splitReactElement2.default)(element)[type].length;

	    var child = _react2.default.Children.toArray(element.props.children)[0];
	    return length + (child && _react2.default.isValidElement(child) ? getElementTagLength(child, type) : 0);
	  }

	  if ((typeof element === 'undefined' ? 'undefined' : _typeof(element)) === 'object') {
	    return element[type] ? element[type].length : 0;
	  }

	  return 0;
	};

	exports.default = getElementTagLength;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getNestedBlockTags;

	var _invariant = __webpack_require__(2);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _splitReactElement2 = __webpack_require__(4);

	var _splitReactElement3 = _interopRequireDefault(_splitReactElement2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getNestedBlockTags(blockHTML) {
	  (0, _invariant2.default)(blockHTML !== null && blockHTML !== undefined, 'Expected block HTML value to be non-null');

	  if (_react2.default.isValidElement(blockHTML.nest)) {
	    var _splitReactElement = (0, _splitReactElement3.default)(blockHTML.nest),
	        start = _splitReactElement.start,
	        end = _splitReactElement.end;

	    return Object.assign({}, blockHTML, {
	      nestStart: start,
	      nestEnd: end
	    });
	  }

	  (0, _invariant2.default)(Object.prototype.hasOwnProperty.call(blockHTML, 'nestStart') && Object.prototype.hasOwnProperty.call(blockHTML, 'nestEnd'), 'convertToHTML: received block information without either a ReactElement or an object with start/end tags');

	  return blockHTML;
	}

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (object) {
	  return function (style) {
	    if (typeof object === 'function') {
	      return object(style);
	    }

	    return object[style];
	  };
	};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @typechecks
	 */

	var _hyphenPattern = /-(.)/g;

	/**
	 * Camelcases a hyphenated string, for example:
	 *
	 *   > camelize('background-color')
	 *   < "backgroundColor"
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function camelize(string) {
	  return string.replace(_hyphenPattern, function (_, character) {
	    return character.toUpperCase();
	  });
	}

	module.exports = camelize;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @typechecks
	 */

	'use strict';

	var camelize = __webpack_require__(29);

	var msPattern = /^-ms-/;

	/**
	 * Camelcases a hyphenated CSS property name, for example:
	 *
	 *   > camelizeStyleName('background-color')
	 *   < "backgroundColor"
	 *   > camelizeStyleName('-moz-transition')
	 *   < "MozTransition"
	 *   > camelizeStyleName('-ms-transition')
	 *   < "msTransition"
	 *
	 * As Andi Smith suggests
	 * (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
	 * is converted to lowercase `ms`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function camelizeStyleName(string) {
	  return camelize(string.replace(msPattern, 'ms-'));
	}

	module.exports = camelizeStyleName;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var emptyObject = {};

	if (true) {
	  Object.freeze(emptyObject);
	}

	module.exports = emptyObject;

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @typechecks
	 */

	var _uppercasePattern = /([A-Z])/g;

	/**
	 * Hyphenates a camelcased string, for example:
	 *
	 *   > hyphenate('backgroundColor')
	 *   < "background-color"
	 *
	 * For CSS style names, use `hyphenateStyleName` instead which works properly
	 * with all vendor prefixes, including `ms`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function hyphenate(string) {
	  return string.replace(_uppercasePattern, '-$1').toLowerCase();
	}

	module.exports = hyphenate;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @typechecks
	 */

	'use strict';

	var hyphenate = __webpack_require__(32);

	var msPattern = /^ms-/;

	/**
	 * Hyphenates a camelcased CSS property name, for example:
	 *
	 *   > hyphenateStyleName('backgroundColor')
	 *   < "background-color"
	 *   > hyphenateStyleName('MozTransition')
	 *   < "-moz-transition"
	 *   > hyphenateStyleName('msTransition')
	 *   < "-ms-transition"
	 *
	 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
	 * is converted to `-ms-`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function hyphenateStyleName(string) {
	  return hyphenate(string).replace(msPattern, '-ms-');
	}

	module.exports = hyphenateStyleName;

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 * @typechecks static-only
	 */

	'use strict';

	/**
	 * Memoizes the return value of a function that accepts one string argument.
	 */

	function memoizeStringOnly(callback) {
	  var cache = {};
	  return function (string) {
	    if (!cache.hasOwnProperty(string)) {
	      cache[string] = callback.call(this, string);
	    }
	    return cache[string];
	  };
	}

	module.exports = memoizeStringOnly;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(5);
	var invariant = __webpack_require__(6);
	var warning = __webpack_require__(7);
	var assign = __webpack_require__(13);

	var ReactPropTypesSecret = __webpack_require__(15);
	var checkPropTypes = __webpack_require__(14);

	module.exports = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */

	  var ANONYMOUS = '<<anonymous>>';

	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker,
	  };

	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    if (true) {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          invariant(
	            false,
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	        } else if (("development") !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            warning(
	              false,
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `%s` prop on `%s`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
	              propFullName,
	              componentName
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);

	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	       true ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues);
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (propValue.hasOwnProperty(key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	       true ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        warning(
	          false,
	          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
	          'received %s at index %s.',
	          getPostfixForTypeWarning(checker),
	          i
	        );
	        return emptyFunction.thatReturnsNull;
	      }
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
	          return null;
	        }
	      }

	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      // We need to check all keys in case some are required but missing from
	      // props.
	      var allKeys = assign({}, props[propName], shapeTypes);
	      for (var key in allKeys) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          return new PropTypeError(
	            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
	            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
	            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
	          );
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }

	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }

	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  }

	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }

	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }

	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	if (true) {
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol.for &&
	    Symbol.for('react.element')) ||
	    0xeac7;

	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = __webpack_require__(35)(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = require('./factoryWithThrowingShims')();
	}


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	/** @license React v16.0.0
	 * react-dom-server.browser.development.js
	 *
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	'use strict';


	if (true) {
	(function() {

	'use strict';

	var objectAssign$1 = __webpack_require__(13);
	var invariant = __webpack_require__(6);
	var require$$0 = __webpack_require__(7);
	var react = __webpack_require__(1);
	var emptyFunction = __webpack_require__(5);
	var propTypes = __webpack_require__(36);
	var emptyObject = __webpack_require__(31);
	var hyphenateStyleName = __webpack_require__(33);
	var memoizeStringOnly = __webpack_require__(34);
	var checkPropTypes = __webpack_require__(14);
	var camelizeStyleName = __webpack_require__(30);

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule reactProdInvariant
	 * 
	 */

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule DOMNamespaces
	 */

	var HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
	var MATH_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
	var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

	var Namespaces$1 = {
	  html: HTML_NAMESPACE,
	  mathml: MATH_NAMESPACE,
	  svg: SVG_NAMESPACE
	};

	// Assumes there is no parent namespace.
	function getIntrinsicNamespace$1(type) {
	  switch (type) {
	    case 'svg':
	      return SVG_NAMESPACE;
	    case 'math':
	      return MATH_NAMESPACE;
	    default:
	      return HTML_NAMESPACE;
	  }
	}

	function getChildNamespace$1(parentNamespace, type) {
	  if (parentNamespace == null || parentNamespace === HTML_NAMESPACE) {
	    // No (or default) parent namespace: potential entry point.
	    return getIntrinsicNamespace$1(type);
	  }
	  if (parentNamespace === SVG_NAMESPACE && type === 'foreignObject') {
	    // We're leaving SVG.
	    return HTML_NAMESPACE;
	  }
	  // By default, pass namespace below.
	  return parentNamespace;
	}

	var Namespaces_1 = Namespaces$1;
	var getIntrinsicNamespace_1 = getIntrinsicNamespace$1;
	var getChildNamespace_1 = getChildNamespace$1;

	var DOMNamespaces = {
		Namespaces: Namespaces_1,
		getIntrinsicNamespace: getIntrinsicNamespace_1,
		getChildNamespace: getChildNamespace_1
	};

	// These attributes should be all lowercase to allow for
	// case insensitive checks
	var RESERVED_PROPS$1 = {
	  children: true,
	  dangerouslySetInnerHTML: true,
	  autoFocus: true,
	  defaultValue: true,
	  defaultChecked: true,
	  innerHTML: true,
	  suppressContentEditableWarning: true,
	  style: true
	};

	function checkMask(value, bitmask) {
	  return (value & bitmask) === bitmask;
	}

	var DOMPropertyInjection = {
	  /**
	   * Mapping from normalized, camelcased property names to a configuration that
	   * specifies how the associated DOM property should be accessed or rendered.
	   */
	  MUST_USE_PROPERTY: 0x1,
	  HAS_BOOLEAN_VALUE: 0x4,
	  HAS_NUMERIC_VALUE: 0x8,
	  HAS_POSITIVE_NUMERIC_VALUE: 0x10 | 0x8,
	  HAS_OVERLOADED_BOOLEAN_VALUE: 0x20,
	  HAS_STRING_BOOLEAN_VALUE: 0x40,

	  /**
	   * Inject some specialized knowledge about the DOM. This takes a config object
	   * with the following properties:
	   *
	   * Properties: object mapping DOM property name to one of the
	   * DOMPropertyInjection constants or null. If your attribute isn't in here,
	   * it won't get written to the DOM.
	   *
	   * DOMAttributeNames: object mapping React attribute name to the DOM
	   * attribute name. Attribute names not specified use the **lowercase**
	   * normalized name.
	   *
	   * DOMAttributeNamespaces: object mapping React attribute name to the DOM
	   * attribute namespace URL. (Attribute names not specified use no namespace.)
	   *
	   * DOMPropertyNames: similar to DOMAttributeNames but for DOM properties.
	   * Property names not specified use the normalized name.
	   *
	   * DOMMutationMethods: Properties that require special mutation methods. If
	   * `value` is undefined, the mutation method should unset the property.
	   *
	   * @param {object} domPropertyConfig the config as described above.
	   */
	  injectDOMPropertyConfig: function (domPropertyConfig) {
	    var Injection = DOMPropertyInjection;
	    var Properties = domPropertyConfig.Properties || {};
	    var DOMAttributeNamespaces = domPropertyConfig.DOMAttributeNamespaces || {};
	    var DOMAttributeNames = domPropertyConfig.DOMAttributeNames || {};
	    var DOMMutationMethods = domPropertyConfig.DOMMutationMethods || {};

	    for (var propName in Properties) {
	      !!DOMProperty.properties.hasOwnProperty(propName) ? invariant(false, 'injectDOMPropertyConfig(...): You\'re trying to inject DOM property \'%s\' which has already been injected. You may be accidentally injecting the same DOM property config twice, or you may be injecting two configs that have conflicting property names.', propName) : void 0;

	      var lowerCased = propName.toLowerCase();
	      var propConfig = Properties[propName];

	      var propertyInfo = {
	        attributeName: lowerCased,
	        attributeNamespace: null,
	        propertyName: propName,
	        mutationMethod: null,

	        mustUseProperty: checkMask(propConfig, Injection.MUST_USE_PROPERTY),
	        hasBooleanValue: checkMask(propConfig, Injection.HAS_BOOLEAN_VALUE),
	        hasNumericValue: checkMask(propConfig, Injection.HAS_NUMERIC_VALUE),
	        hasPositiveNumericValue: checkMask(propConfig, Injection.HAS_POSITIVE_NUMERIC_VALUE),
	        hasOverloadedBooleanValue: checkMask(propConfig, Injection.HAS_OVERLOADED_BOOLEAN_VALUE),
	        hasStringBooleanValue: checkMask(propConfig, Injection.HAS_STRING_BOOLEAN_VALUE)
	      };
	      !(propertyInfo.hasBooleanValue + propertyInfo.hasNumericValue + propertyInfo.hasOverloadedBooleanValue <= 1) ? invariant(false, 'DOMProperty: Value can be one of boolean, overloaded boolean, or numeric value, but not a combination: %s', propName) : void 0;

	      if (DOMAttributeNames.hasOwnProperty(propName)) {
	        var attributeName = DOMAttributeNames[propName];

	        propertyInfo.attributeName = attributeName;
	      }

	      if (DOMAttributeNamespaces.hasOwnProperty(propName)) {
	        propertyInfo.attributeNamespace = DOMAttributeNamespaces[propName];
	      }

	      if (DOMMutationMethods.hasOwnProperty(propName)) {
	        propertyInfo.mutationMethod = DOMMutationMethods[propName];
	      }

	      // Downcase references to whitelist properties to check for membership
	      // without case-sensitivity. This allows the whitelist to pick up
	      // `allowfullscreen`, which should be written using the property configuration
	      // for `allowFullscreen`
	      DOMProperty.properties[propName] = propertyInfo;
	    }
	  }
	};

	/* eslint-disable max-len */
	var ATTRIBUTE_NAME_START_CHAR = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
	/* eslint-enable max-len */

	/**
	 * DOMProperty exports lookup objects that can be used like functions:
	 *
	 *   > DOMProperty.isValid['id']
	 *   true
	 *   > DOMProperty.isValid['foobar']
	 *   undefined
	 *
	 * Although this may be confusing, it performs better in general.
	 *
	 * @see http://jsperf.com/key-exists
	 * @see http://jsperf.com/key-missing
	 */
	var DOMProperty = {
	  ID_ATTRIBUTE_NAME: 'data-reactid',
	  ROOT_ATTRIBUTE_NAME: 'data-reactroot',

	  ATTRIBUTE_NAME_START_CHAR: ATTRIBUTE_NAME_START_CHAR,
	  ATTRIBUTE_NAME_CHAR: ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040',

	  /**
	   * Map from property "standard name" to an object with info about how to set
	   * the property in the DOM. Each object contains:
	   *
	   * attributeName:
	   *   Used when rendering markup or with `*Attribute()`.
	   * attributeNamespace
	   * propertyName:
	   *   Used on DOM node instances. (This includes properties that mutate due to
	   *   external factors.)
	   * mutationMethod:
	   *   If non-null, used instead of the property or `setAttribute()` after
	   *   initial render.
	   * mustUseProperty:
	   *   Whether the property must be accessed and mutated as an object property.
	   * hasBooleanValue:
	   *   Whether the property should be removed when set to a falsey value.
	   * hasNumericValue:
	   *   Whether the property must be numeric or parse as a numeric and should be
	   *   removed when set to a falsey value.
	   * hasPositiveNumericValue:
	   *   Whether the property must be positive numeric or parse as a positive
	   *   numeric and should be removed when set to a falsey value.
	   * hasOverloadedBooleanValue:
	   *   Whether the property can be used as a flag as well as with a value.
	   *   Removed when strictly equal to false; present without a value when
	   *   strictly equal to true; present with a value otherwise.
	   */
	  properties: {},

	  /**
	   * Checks whether a property name is a writeable attribute.
	   * @method
	   */
	  shouldSetAttribute: function (name, value) {
	    if (DOMProperty.isReservedProp(name)) {
	      return false;
	    }
	    if ((name[0] === 'o' || name[0] === 'O') && (name[1] === 'n' || name[1] === 'N')) {
	      return false;
	    }
	    if (value === null) {
	      return true;
	    }
	    switch (typeof value) {
	      case 'boolean':
	        return DOMProperty.shouldAttributeAcceptBooleanValue(name);
	      case 'undefined':
	      case 'number':
	      case 'string':
	      case 'object':
	        return true;
	      default:
	        // function, symbol
	        return false;
	    }
	  },

	  getPropertyInfo: function (name) {
	    return DOMProperty.properties.hasOwnProperty(name) ? DOMProperty.properties[name] : null;
	  },
	  shouldAttributeAcceptBooleanValue: function (name) {
	    if (DOMProperty.isReservedProp(name)) {
	      return true;
	    }
	    var propertyInfo = DOMProperty.getPropertyInfo(name);
	    if (propertyInfo) {
	      return propertyInfo.hasBooleanValue || propertyInfo.hasStringBooleanValue || propertyInfo.hasOverloadedBooleanValue;
	    }
	    var prefix = name.toLowerCase().slice(0, 5);
	    return prefix === 'data-' || prefix === 'aria-';
	  },


	  /**
	   * Checks to see if a property name is within the list of properties
	   * reserved for internal React operations. These properties should
	   * not be set on an HTML element.
	   *
	   * @private
	   * @param {string} name
	   * @return {boolean} If the name is within reserved props
	   */
	  isReservedProp: function (name) {
	    return RESERVED_PROPS$1.hasOwnProperty(name);
	  },


	  injection: DOMPropertyInjection
	};

	var DOMProperty_1 = DOMProperty;

	/**
	 * Copyright (c) 2016-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * Based on the escape-html library, which is used under the MIT License below:
	 *
	 * Copyright (c) 2012-2013 TJ Holowaychuk
	 * Copyright (c) 2015 Andreas Lubbe
	 * Copyright (c) 2015 Tiancheng "Timothy" Gu
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining
	 * a copy of this software and associated documentation files (the
	 * 'Software'), to deal in the Software without restriction, including
	 * without limitation the rights to use, copy, modify, merge, publish,
	 * distribute, sublicense, and/or sell copies of the Software, and to
	 * permit persons to whom the Software is furnished to do so, subject to
	 * the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be
	 * included in all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
	 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
	 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
	 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
	 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	 *
	 * @providesModule escapeTextContentForBrowser
	 */

	// code copied and modified from escape-html
	/**
	 * Module variables.
	 * @private
	 */

	var matchHtmlRegExp = /["'&<>]/;

	/**
	 * Escape special characters in the given string of html.
	 *
	 * @param  {string} string The string to escape for inserting into HTML
	 * @return {string}
	 * @public
	 */

	function escapeHtml(string) {
	  var str = '' + string;
	  var match = matchHtmlRegExp.exec(str);

	  if (!match) {
	    return str;
	  }

	  var escape;
	  var html = '';
	  var index = 0;
	  var lastIndex = 0;

	  for (index = match.index; index < str.length; index++) {
	    switch (str.charCodeAt(index)) {
	      case 34:
	        // "
	        escape = '&quot;';
	        break;
	      case 38:
	        // &
	        escape = '&amp;';
	        break;
	      case 39:
	        // '
	        escape = '&#x27;'; // modified from escape-html; used to be '&#39'
	        break;
	      case 60:
	        // <
	        escape = '&lt;';
	        break;
	      case 62:
	        // >
	        escape = '&gt;';
	        break;
	      default:
	        continue;
	    }

	    if (lastIndex !== index) {
	      html += str.substring(lastIndex, index);
	    }

	    lastIndex = index + 1;
	    html += escape;
	  }

	  return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
	}
	// end code copied and modified from escape-html

	/**
	 * Escapes text to prevent scripting attacks.
	 *
	 * @param {*} text Text value to escape.
	 * @return {string} An escaped string.
	 */
	function escapeTextContentForBrowser(text) {
	  if (typeof text === 'boolean' || typeof text === 'number') {
	    // this shortcircuit helps perf for types that we know will never have
	    // special characters, especially given that this function is used often
	    // for numeric dom ids.
	    return '' + text;
	  }
	  return escapeHtml(text);
	}

	var escapeTextContentForBrowser_1 = escapeTextContentForBrowser;

	/**
	 * Escapes attribute value to prevent scripting attacks.
	 *
	 * @param {*} value Value to escape.
	 * @return {string} An escaped string.
	 */
	function quoteAttributeValueForBrowser(value) {
	  return '"' + escapeTextContentForBrowser_1(value) + '"';
	}

	var quoteAttributeValueForBrowser_1 = quoteAttributeValueForBrowser;

	{
	  var warning$1 = require$$0;
	}

	// isAttributeNameSafe() is currently duplicated in DOMPropertyOperations.
	// TODO: Find a better place for this.
	var VALID_ATTRIBUTE_NAME_REGEX = new RegExp('^[' + DOMProperty_1.ATTRIBUTE_NAME_START_CHAR + '][' + DOMProperty_1.ATTRIBUTE_NAME_CHAR + ']*$');
	var illegalAttributeNameCache = {};
	var validatedAttributeNameCache = {};
	function isAttributeNameSafe(attributeName) {
	  if (validatedAttributeNameCache.hasOwnProperty(attributeName)) {
	    return true;
	  }
	  if (illegalAttributeNameCache.hasOwnProperty(attributeName)) {
	    return false;
	  }
	  if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
	    validatedAttributeNameCache[attributeName] = true;
	    return true;
	  }
	  illegalAttributeNameCache[attributeName] = true;
	  {
	    warning$1(false, 'Invalid attribute name: `%s`', attributeName);
	  }
	  return false;
	}

	// shouldIgnoreValue() is currently duplicated in DOMPropertyOperations.
	// TODO: Find a better place for this.
	function shouldIgnoreValue(propertyInfo, value) {
	  return value == null || propertyInfo.hasBooleanValue && !value || propertyInfo.hasNumericValue && isNaN(value) || propertyInfo.hasPositiveNumericValue && value < 1 || propertyInfo.hasOverloadedBooleanValue && value === false;
	}

	/**
	 * Operations for dealing with DOM properties.
	 */
	var DOMMarkupOperations = {
	  /**
	   * Creates markup for the ID property.
	   *
	   * @param {string} id Unescaped ID.
	   * @return {string} Markup string.
	   */
	  createMarkupForID: function (id) {
	    return DOMProperty_1.ID_ATTRIBUTE_NAME + '=' + quoteAttributeValueForBrowser_1(id);
	  },

	  createMarkupForRoot: function () {
	    return DOMProperty_1.ROOT_ATTRIBUTE_NAME + '=""';
	  },

	  /**
	   * Creates markup for a property.
	   *
	   * @param {string} name
	   * @param {*} value
	   * @return {?string} Markup string, or null if the property was invalid.
	   */
	  createMarkupForProperty: function (name, value) {
	    var propertyInfo = DOMProperty_1.getPropertyInfo(name);
	    if (propertyInfo) {
	      if (shouldIgnoreValue(propertyInfo, value)) {
	        return '';
	      }
	      var attributeName = propertyInfo.attributeName;
	      if (propertyInfo.hasBooleanValue || propertyInfo.hasOverloadedBooleanValue && value === true) {
	        return attributeName + '=""';
	      } else if (typeof value !== 'boolean' || DOMProperty_1.shouldAttributeAcceptBooleanValue(name)) {
	        return attributeName + '=' + quoteAttributeValueForBrowser_1(value);
	      }
	    } else if (DOMProperty_1.shouldSetAttribute(name, value)) {
	      if (value == null) {
	        return '';
	      }
	      return name + '=' + quoteAttributeValueForBrowser_1(value);
	    }
	    return null;
	  },

	  /**
	   * Creates markup for a custom property.
	   *
	   * @param {string} name
	   * @param {*} value
	   * @return {string} Markup string, or empty string if the property was invalid.
	   */
	  createMarkupForCustomAttribute: function (name, value) {
	    if (!isAttributeNameSafe(name) || value == null) {
	      return '';
	    }
	    return name + '=' + quoteAttributeValueForBrowser_1(value);
	  }
	};

	var DOMMarkupOperations_1 = DOMMarkupOperations;

	var ReactControlledValuePropTypes = {
	  checkPropTypes: null
	};

	{
	  var warning$2 = require$$0;
	  var emptyFunction$1 = emptyFunction;
	  var PropTypes = propTypes;
	  var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	  ReactControlledValuePropTypes.checkPropTypes = emptyFunction$1;
	  var hasReadOnlyValue = {
	    button: true,
	    checkbox: true,
	    image: true,
	    hidden: true,
	    radio: true,
	    reset: true,
	    submit: true
	  };

	  var propTypes$1 = {
	    value: function (props, propName, componentName) {
	      if (!props[propName] || hasReadOnlyValue[props.type] || props.onChange || props.readOnly || props.disabled) {
	        return null;
	      }
	      return new Error('You provided a `value` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultValue`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
	    },
	    checked: function (props, propName, componentName) {
	      if (!props[propName] || props.onChange || props.readOnly || props.disabled) {
	        return null;
	      }
	      return new Error('You provided a `checked` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultChecked`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
	    },
	    onChange: PropTypes.func
	  };

	  var loggedTypeFailures = {};

	  /**
	   * Provide a linked `value` attribute for controlled forms. You should not use
	   * this outside of the ReactDOM controlled form components.
	   */
	  ReactControlledValuePropTypes.checkPropTypes = function (tagName, props, getStack) {
	    for (var propName in propTypes$1) {
	      if (propTypes$1.hasOwnProperty(propName)) {
	        var error = propTypes$1[propName](props, propName, tagName, 'prop', null, ReactPropTypesSecret);
	      }
	      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	        // Only monitor this failure once because there tends to be a lot of the
	        // same error.
	        loggedTypeFailures[error.message] = true;

	        warning$2(false, 'Failed form propType: %s%s', error.message, getStack());
	      }
	    }
	  };
	}

	var ReactControlledValuePropTypes_1 = ReactControlledValuePropTypes;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule omittedCloseTags
	 */

	// For HTML, certain tags should omit their close tag. We keep a whitelist for
	// those special-case tags.

	var omittedCloseTags = {
	  area: true,
	  base: true,
	  br: true,
	  col: true,
	  embed: true,
	  hr: true,
	  img: true,
	  input: true,
	  keygen: true,
	  link: true,
	  meta: true,
	  param: true,
	  source: true,
	  track: true,
	  wbr: true
	};

	var omittedCloseTags_1 = omittedCloseTags;

	// For HTML, certain tags cannot have children. This has the same purpose as
	// `omittedCloseTags` except that `menuitem` should still have its closing tag.

	var voidElementTags = objectAssign$1({
	  menuitem: true
	}, omittedCloseTags_1);

	var voidElementTags_1 = voidElementTags;

	{
	  var warning$3 = require$$0;
	}

	var HTML = '__html';

	function getDeclarationErrorAddendum(getCurrentOwnerName) {
	  {
	    var ownerName = getCurrentOwnerName();
	    if (ownerName) {
	      // TODO: also report the stack.
	      return '\n\nThis DOM node was rendered by `' + ownerName + '`.';
	    }
	  }
	  return '';
	}

	function assertValidProps(tag, props, getCurrentOwnerName) {
	  if (!props) {
	    return;
	  }
	  // Note the use of `==` which checks for null or undefined.
	  if (voidElementTags_1[tag]) {
	    !(props.children == null && props.dangerouslySetInnerHTML == null) ? invariant(false, '%s is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.%s', tag, getDeclarationErrorAddendum(getCurrentOwnerName)) : void 0;
	  }
	  if (props.dangerouslySetInnerHTML != null) {
	    !(props.children == null) ? invariant(false, 'Can only set one of `children` or `props.dangerouslySetInnerHTML`.') : void 0;
	    !(typeof props.dangerouslySetInnerHTML === 'object' && HTML in props.dangerouslySetInnerHTML) ? invariant(false, '`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://fb.me/react-invariant-dangerously-set-inner-html for more information.') : void 0;
	  }
	  {
	    warning$3(props.suppressContentEditableWarning || !props.contentEditable || props.children == null, 'A component is `contentEditable` and contains `children` managed by ' + 'React. It is now your responsibility to guarantee that none of ' + 'those nodes are unexpectedly modified or duplicated. This is ' + 'probably not intentional.');
	  }
	  !(props.style == null || typeof props.style === 'object') ? invariant(false, 'The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + \'em\'}} when using JSX.%s', getDeclarationErrorAddendum(getCurrentOwnerName)) : void 0;
	}

	var assertValidProps_1 = assertValidProps;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule CSSProperty
	 */

	/**
	 * CSS properties which accept numbers but are not in units of "px".
	 */

	var isUnitlessNumber$1 = {
	  animationIterationCount: true,
	  borderImageOutset: true,
	  borderImageSlice: true,
	  borderImageWidth: true,
	  boxFlex: true,
	  boxFlexGroup: true,
	  boxOrdinalGroup: true,
	  columnCount: true,
	  columns: true,
	  flex: true,
	  flexGrow: true,
	  flexPositive: true,
	  flexShrink: true,
	  flexNegative: true,
	  flexOrder: true,
	  gridRow: true,
	  gridRowEnd: true,
	  gridRowSpan: true,
	  gridRowStart: true,
	  gridColumn: true,
	  gridColumnEnd: true,
	  gridColumnSpan: true,
	  gridColumnStart: true,
	  fontWeight: true,
	  lineClamp: true,
	  lineHeight: true,
	  opacity: true,
	  order: true,
	  orphans: true,
	  tabSize: true,
	  widows: true,
	  zIndex: true,
	  zoom: true,

	  // SVG-related properties
	  fillOpacity: true,
	  floodOpacity: true,
	  stopOpacity: true,
	  strokeDasharray: true,
	  strokeDashoffset: true,
	  strokeMiterlimit: true,
	  strokeOpacity: true,
	  strokeWidth: true
	};

	/**
	 * @param {string} prefix vendor-specific prefix, eg: Webkit
	 * @param {string} key style name, eg: transitionDuration
	 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
	 * WebkitTransitionDuration
	 */
	function prefixKey(prefix, key) {
	  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
	}

	/**
	 * Support style names that may come passed in prefixed by adding permutations
	 * of vendor prefixes.
	 */
	var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

	// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
	// infinite loop, because it iterates over the newly added props too.
	Object.keys(isUnitlessNumber$1).forEach(function (prop) {
	  prefixes.forEach(function (prefix) {
	    isUnitlessNumber$1[prefixKey(prefix, prop)] = isUnitlessNumber$1[prop];
	  });
	});

	/**
	 * Most style properties can be unset by doing .style[prop] = '' but IE8
	 * doesn't like doing that with shorthand properties so for the properties that
	 * IE8 breaks on, which are listed here, we instead unset each of the
	 * individual properties. See http://bugs.jquery.com/ticket/12385.
	 * The 4-value 'clock' properties like margin, padding, border-width seem to
	 * behave without any problems. Curiously, list-style works too without any
	 * special prodding.
	 */
	var shorthandPropertyExpansions = {
	  background: {
	    backgroundAttachment: true,
	    backgroundColor: true,
	    backgroundImage: true,
	    backgroundPositionX: true,
	    backgroundPositionY: true,
	    backgroundRepeat: true
	  },
	  backgroundPosition: {
	    backgroundPositionX: true,
	    backgroundPositionY: true
	  },
	  border: {
	    borderWidth: true,
	    borderStyle: true,
	    borderColor: true
	  },
	  borderBottom: {
	    borderBottomWidth: true,
	    borderBottomStyle: true,
	    borderBottomColor: true
	  },
	  borderLeft: {
	    borderLeftWidth: true,
	    borderLeftStyle: true,
	    borderLeftColor: true
	  },
	  borderRight: {
	    borderRightWidth: true,
	    borderRightStyle: true,
	    borderRightColor: true
	  },
	  borderTop: {
	    borderTopWidth: true,
	    borderTopStyle: true,
	    borderTopColor: true
	  },
	  font: {
	    fontStyle: true,
	    fontVariant: true,
	    fontWeight: true,
	    fontSize: true,
	    lineHeight: true,
	    fontFamily: true
	  },
	  outline: {
	    outlineWidth: true,
	    outlineStyle: true,
	    outlineColor: true
	  }
	};

	var CSSProperty = {
	  isUnitlessNumber: isUnitlessNumber$1,
	  shorthandPropertyExpansions: shorthandPropertyExpansions
	};

	var CSSProperty_1 = CSSProperty;

	var isUnitlessNumber = CSSProperty_1.isUnitlessNumber;

	/**
	 * Convert a value into the proper css writable value. The style name `name`
	 * should be logical (no hyphens), as specified
	 * in `CSSProperty.isUnitlessNumber`.
	 *
	 * @param {string} name CSS property name such as `topMargin`.
	 * @param {*} value CSS property value such as `10px`.
	 * @return {string} Normalized style value with dimensions applied.
	 */
	function dangerousStyleValue(name, value, isCustomProperty) {
	  // Note that we've removed escapeTextForBrowser() calls here since the
	  // whole string will be escaped when the attribute is injected into
	  // the markup. If you provide unsafe user data here they can inject
	  // arbitrary CSS which may be problematic (I couldn't repro this):
	  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
	  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
	  // This is not an XSS hole but instead a potential CSS injection issue
	  // which has lead to a greater discussion about how we're going to
	  // trust URLs moving forward. See #2115901

	  var isEmpty = value == null || typeof value === 'boolean' || value === '';
	  if (isEmpty) {
	    return '';
	  }

	  if (!isCustomProperty && typeof value === 'number' && value !== 0 && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])) {
	    return value + 'px'; // Presumes implicit 'px' suffix for unitless numbers
	  }

	  return ('' + value).trim();
	}

	var dangerousStyleValue_1 = dangerousStyleValue;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule isCustomComponent
	 * 
	 */

	function isCustomComponent(tagName, props) {
	  if (tagName.indexOf('-') === -1) {
	    return typeof props.is === 'string';
	  }
	  switch (tagName) {
	    // These are reserved SVG and MathML elements.
	    // We don't mind this whitelist too much because we expect it to never grow.
	    // The alternative is to track the namespace in a few places which is convoluted.
	    // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
	    case 'annotation-xml':
	    case 'color-profile':
	    case 'font-face':
	    case 'font-face-src':
	    case 'font-face-uri':
	    case 'font-face-format':
	    case 'font-face-name':
	    case 'missing-glyph':
	      return false;
	    default:
	      return true;
	  }
	}

	var isCustomComponent_1 = isCustomComponent;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule getComponentName
	 * 
	 */

	function getComponentName$2(instanceOrFiber) {
	  if (typeof instanceOrFiber.getName === 'function') {
	    // Stack reconciler
	    var instance = instanceOrFiber;
	    return instance.getName();
	  }
	  if (typeof instanceOrFiber.tag === 'number') {
	    // Fiber reconciler
	    var fiber = instanceOrFiber;
	    var type = fiber.type;

	    if (typeof type === 'string') {
	      return type;
	    }
	    if (typeof type === 'function') {
	      return type.displayName || type.name;
	    }
	  }
	  return null;
	}

	var getComponentName_1 = getComponentName$2;

	var ReactInternals = react.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

	var ReactGlobalSharedState = {
	  ReactCurrentOwner: ReactInternals.ReactCurrentOwner
	};

	{
	  objectAssign$1(ReactGlobalSharedState, {
	    ReactComponentTreeHook: ReactInternals.ReactComponentTreeHook,
	    ReactDebugCurrentFrame: ReactInternals.ReactDebugCurrentFrame
	  });
	}

	var ReactGlobalSharedState_1 = ReactGlobalSharedState;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule ReactTypeOfWork
	 * 
	 */

	var ReactTypeOfWork = {
	  IndeterminateComponent: 0, // Before we know whether it is functional or class
	  FunctionalComponent: 1,
	  ClassComponent: 2,
	  HostRoot: 3, // Root of a host tree. Could be nested inside another node.
	  HostPortal: 4, // A subtree. Could be an entry point to a different renderer.
	  HostComponent: 5,
	  HostText: 6,
	  CoroutineComponent: 7,
	  CoroutineHandlerPhase: 8,
	  YieldComponent: 9,
	  Fragment: 10
	};

	/**
	 * Copyright (c) 2016-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 * @providesModule describeComponentFrame
	 */

	var describeComponentFrame$1 = function (name, source, ownerName) {
	  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
	};

	var IndeterminateComponent = ReactTypeOfWork.IndeterminateComponent;
	var FunctionalComponent = ReactTypeOfWork.FunctionalComponent;
	var ClassComponent = ReactTypeOfWork.ClassComponent;
	var HostComponent = ReactTypeOfWork.HostComponent;




	function describeFiber(fiber) {
	  switch (fiber.tag) {
	    case IndeterminateComponent:
	    case FunctionalComponent:
	    case ClassComponent:
	    case HostComponent:
	      var owner = fiber._debugOwner;
	      var source = fiber._debugSource;
	      var name = getComponentName_1(fiber);
	      var ownerName = null;
	      if (owner) {
	        ownerName = getComponentName_1(owner);
	      }
	      return describeComponentFrame$1(name, source, ownerName);
	    default:
	      return '';
	  }
	}

	// This function can only be called with a work-in-progress fiber and
	// only during begin or complete phase. Do not call it under any other
	// circumstances.
	function getStackAddendumByWorkInProgressFiber$1(workInProgress) {
	  var info = '';
	  var node = workInProgress;
	  do {
	    info += describeFiber(node);
	    // Otherwise this return pointer might point to the wrong tree:
	    node = node['return'];
	  } while (node);
	  return info;
	}

	var ReactFiberComponentTreeHook = {
	  getStackAddendumByWorkInProgressFiber: getStackAddendumByWorkInProgressFiber$1
	};

	var ReactDebugCurrentFrame$1 = ReactGlobalSharedState_1.ReactDebugCurrentFrame;

	{
	  var getComponentName$3 = getComponentName_1;

	  var _require2$1 = ReactFiberComponentTreeHook,
	      getStackAddendumByWorkInProgressFiber = _require2$1.getStackAddendumByWorkInProgressFiber;
	}

	function getCurrentFiberOwnerName$1() {
	  {
	    var fiber = ReactDebugCurrentFiber.current;
	    if (fiber === null) {
	      return null;
	    }
	    if (fiber._debugOwner != null) {
	      return getComponentName$3(fiber._debugOwner);
	    }
	  }
	  return null;
	}

	function getCurrentFiberStackAddendum() {
	  {
	    var fiber = ReactDebugCurrentFiber.current;
	    if (fiber === null) {
	      return null;
	    }
	    // Safe because if current fiber exists, we are reconciling,
	    // and it is guaranteed to be the work-in-progress version.
	    return getStackAddendumByWorkInProgressFiber(fiber);
	  }
	  return null;
	}

	function resetCurrentFiber() {
	  ReactDebugCurrentFrame$1.getCurrentStack = null;
	  ReactDebugCurrentFiber.current = null;
	  ReactDebugCurrentFiber.phase = null;
	}

	function setCurrentFiber(fiber, phase) {
	  ReactDebugCurrentFrame$1.getCurrentStack = getCurrentFiberStackAddendum;
	  ReactDebugCurrentFiber.current = fiber;
	  ReactDebugCurrentFiber.phase = phase;
	}

	var ReactDebugCurrentFiber = {
	  current: null,
	  phase: null,
	  resetCurrentFiber: resetCurrentFiber,
	  setCurrentFiber: setCurrentFiber,
	  getCurrentFiberOwnerName: getCurrentFiberOwnerName$1,
	  getCurrentFiberStackAddendum: getCurrentFiberStackAddendum
	};

	var ReactDebugCurrentFiber_1 = ReactDebugCurrentFiber;

	var warnValidStyle$1 = emptyFunction;

	{
	  var camelizeStyleName$1 = camelizeStyleName;
	  var getComponentName$1 = getComponentName_1;
	  var warning$4 = require$$0;

	  var _require = ReactDebugCurrentFiber_1,
	      getCurrentFiberOwnerName = _require.getCurrentFiberOwnerName;

	  // 'msTransform' is correct, but the other prefixes should be capitalized


	  var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;

	  // style values shouldn't contain a semicolon
	  var badStyleValueWithSemicolonPattern = /;\s*$/;

	  var warnedStyleNames = {};
	  var warnedStyleValues = {};
	  var warnedForNaNValue = false;
	  var warnedForInfinityValue = false;

	  var warnHyphenatedStyleName = function (name, owner) {
	    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
	      return;
	    }

	    warnedStyleNames[name] = true;
	    warning$4(false, 'Unsupported style property %s. Did you mean %s?%s', name, camelizeStyleName$1(name), checkRenderMessage(owner));
	  };

	  var warnBadVendoredStyleName = function (name, owner) {
	    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
	      return;
	    }

	    warnedStyleNames[name] = true;
	    warning$4(false, 'Unsupported vendor-prefixed style property %s. Did you mean %s?%s', name, name.charAt(0).toUpperCase() + name.slice(1), checkRenderMessage(owner));
	  };

	  var warnStyleValueWithSemicolon = function (name, value, owner) {
	    if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
	      return;
	    }

	    warnedStyleValues[value] = true;
	    warning$4(false, "Style property values shouldn't contain a semicolon.%s " + 'Try "%s: %s" instead.', checkRenderMessage(owner), name, value.replace(badStyleValueWithSemicolonPattern, ''));
	  };

	  var warnStyleValueIsNaN = function (name, value, owner) {
	    if (warnedForNaNValue) {
	      return;
	    }

	    warnedForNaNValue = true;
	    warning$4(false, '`NaN` is an invalid value for the `%s` css style property.%s', name, checkRenderMessage(owner));
	  };

	  var warnStyleValueIsInfinity = function (name, value, owner) {
	    if (warnedForInfinityValue) {
	      return;
	    }

	    warnedForInfinityValue = true;
	    warning$4(false, '`Infinity` is an invalid value for the `%s` css style property.%s', name, checkRenderMessage(owner));
	  };

	  var checkRenderMessage = function (owner) {
	    var ownerName;
	    if (owner != null) {
	      // Stack passes the owner manually all the way to CSSPropertyOperations.
	      ownerName = getComponentName$1(owner);
	    } else {
	      // Fiber doesn't pass it but uses ReactDebugCurrentFiber to track it.
	      // It is only enabled in development and tracks host components too.
	      ownerName = getCurrentFiberOwnerName();
	      // TODO: also report the stack.
	    }
	    if (ownerName) {
	      return '\n\nCheck the render method of `' + ownerName + '`.';
	    }
	    return '';
	  };

	  warnValidStyle$1 = function (name, value, component) {
	    var owner;
	    if (component) {
	      // TODO: this only works with Stack. Seems like we need to add unit tests?
	      owner = component._currentElement._owner;
	    }
	    if (name.indexOf('-') > -1) {
	      warnHyphenatedStyleName(name, owner);
	    } else if (badVendoredStyleNamePattern.test(name)) {
	      warnBadVendoredStyleName(name, owner);
	    } else if (badStyleValueWithSemicolonPattern.test(value)) {
	      warnStyleValueWithSemicolon(name, value, owner);
	    }

	    if (typeof value === 'number') {
	      if (isNaN(value)) {
	        warnStyleValueIsNaN(name, value, owner);
	      } else if (!isFinite(value)) {
	        warnStyleValueIsInfinity(name, value, owner);
	      }
	    }
	  };
	}

	var warnValidStyle_1 = warnValidStyle$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule validAriaProperties
	 */

	var ariaProperties = {
	  'aria-current': 0, // state
	  'aria-details': 0,
	  'aria-disabled': 0, // state
	  'aria-hidden': 0, // state
	  'aria-invalid': 0, // state
	  'aria-keyshortcuts': 0,
	  'aria-label': 0,
	  'aria-roledescription': 0,
	  // Widget Attributes
	  'aria-autocomplete': 0,
	  'aria-checked': 0,
	  'aria-expanded': 0,
	  'aria-haspopup': 0,
	  'aria-level': 0,
	  'aria-modal': 0,
	  'aria-multiline': 0,
	  'aria-multiselectable': 0,
	  'aria-orientation': 0,
	  'aria-placeholder': 0,
	  'aria-pressed': 0,
	  'aria-readonly': 0,
	  'aria-required': 0,
	  'aria-selected': 0,
	  'aria-sort': 0,
	  'aria-valuemax': 0,
	  'aria-valuemin': 0,
	  'aria-valuenow': 0,
	  'aria-valuetext': 0,
	  // Live Region Attributes
	  'aria-atomic': 0,
	  'aria-busy': 0,
	  'aria-live': 0,
	  'aria-relevant': 0,
	  // Drag-and-Drop Attributes
	  'aria-dropeffect': 0,
	  'aria-grabbed': 0,
	  // Relationship Attributes
	  'aria-activedescendant': 0,
	  'aria-colcount': 0,
	  'aria-colindex': 0,
	  'aria-colspan': 0,
	  'aria-controls': 0,
	  'aria-describedby': 0,
	  'aria-errormessage': 0,
	  'aria-flowto': 0,
	  'aria-labelledby': 0,
	  'aria-owns': 0,
	  'aria-posinset': 0,
	  'aria-rowcount': 0,
	  'aria-rowindex': 0,
	  'aria-rowspan': 0,
	  'aria-setsize': 0
	};

	var validAriaProperties$1 = ariaProperties;

	var warnedProperties = {};
	var rARIA = new RegExp('^(aria)-[' + DOMProperty_1.ATTRIBUTE_NAME_CHAR + ']*$');
	var rARIACamel = new RegExp('^(aria)[A-Z][' + DOMProperty_1.ATTRIBUTE_NAME_CHAR + ']*$');

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	{
	  var warning$5 = require$$0;

	  var _require$1 = ReactGlobalSharedState_1,
	      ReactComponentTreeHook = _require$1.ReactComponentTreeHook,
	      ReactDebugCurrentFrame$2 = _require$1.ReactDebugCurrentFrame;

	  var getStackAddendumByID = ReactComponentTreeHook.getStackAddendumByID;


	  var validAriaProperties = validAriaProperties$1;
	}

	function getStackAddendum$1(debugID) {
	  if (debugID != null) {
	    // This can only happen on Stack
	    return getStackAddendumByID(debugID);
	  } else {
	    // This can only happen on Fiber / Server
	    var stack = ReactDebugCurrentFrame$2.getStackAddendum();
	    return stack != null ? stack : '';
	  }
	}

	function validateProperty(tagName, name, debugID) {
	  if (hasOwnProperty.call(warnedProperties, name) && warnedProperties[name]) {
	    return true;
	  }

	  if (rARIACamel.test(name)) {
	    var ariaName = 'aria-' + name.slice(4).toLowerCase();
	    var correctName = validAriaProperties.hasOwnProperty(ariaName) ? ariaName : null;

	    // If this is an aria-* attribute, but is not listed in the known DOM
	    // DOM properties, then it is an invalid aria-* attribute.
	    if (correctName == null) {
	      warning$5(false, 'Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.%s', name, getStackAddendum$1(debugID));
	      warnedProperties[name] = true;
	      return true;
	    }
	    // aria-* attributes should be lowercase; suggest the lowercase version.
	    if (name !== correctName) {
	      warning$5(false, 'Invalid ARIA attribute `%s`. Did you mean `%s`?%s', name, correctName, getStackAddendum$1(debugID));
	      warnedProperties[name] = true;
	      return true;
	    }
	  }

	  if (rARIA.test(name)) {
	    var lowerCasedName = name.toLowerCase();
	    var standardName = validAriaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null;

	    // If this is an aria-* attribute, but is not listed in the known DOM
	    // DOM properties, then it is an invalid aria-* attribute.
	    if (standardName == null) {
	      warnedProperties[name] = true;
	      return false;
	    }
	    // aria-* attributes should be lowercase; suggest the lowercase version.
	    if (name !== standardName) {
	      warning$5(false, 'Unknown ARIA attribute `%s`. Did you mean `%s`?%s', name, standardName, getStackAddendum$1(debugID));
	      warnedProperties[name] = true;
	      return true;
	    }
	  }

	  return true;
	}

	function warnInvalidARIAProps(type, props, debugID) {
	  var invalidProps = [];

	  for (var key in props) {
	    var isValid = validateProperty(type, key, debugID);
	    if (!isValid) {
	      invalidProps.push(key);
	    }
	  }

	  var unknownPropString = invalidProps.map(function (prop) {
	    return '`' + prop + '`';
	  }).join(', ');

	  if (invalidProps.length === 1) {
	    warning$5(false, 'Invalid aria prop %s on <%s> tag. ' + 'For details, see https://fb.me/invalid-aria-prop%s', unknownPropString, type, getStackAddendum$1(debugID));
	  } else if (invalidProps.length > 1) {
	    warning$5(false, 'Invalid aria props %s on <%s> tag. ' + 'For details, see https://fb.me/invalid-aria-prop%s', unknownPropString, type, getStackAddendum$1(debugID));
	  }
	}

	function validateProperties(type, props, debugID /* Stack only */) {
	  if (isCustomComponent_1(type, props)) {
	    return;
	  }
	  warnInvalidARIAProps(type, props, debugID);
	}

	var ReactDOMInvalidARIAHook = {
	  // Fiber
	  validateProperties: validateProperties,
	  // Stack
	  onBeforeMountComponent: function (debugID, element) {
	    if (true && element != null && typeof element.type === 'string') {
	      validateProperties(element.type, element.props, debugID);
	    }
	  },
	  onBeforeUpdateComponent: function (debugID, element) {
	    if (true && element != null && typeof element.type === 'string') {
	      validateProperties(element.type, element.props, debugID);
	    }
	  }
	};

	var ReactDOMInvalidARIAHook_1 = ReactDOMInvalidARIAHook;

	{
	  var warning$6 = require$$0;

	  var _require$2 = ReactGlobalSharedState_1,
	      ReactComponentTreeHook$1 = _require$2.ReactComponentTreeHook,
	      ReactDebugCurrentFrame$3 = _require$2.ReactDebugCurrentFrame;

	  var getStackAddendumByID$1 = ReactComponentTreeHook$1.getStackAddendumByID;
	}

	var didWarnValueNull = false;

	function getStackAddendum$2(debugID) {
	  if (debugID != null) {
	    // This can only happen on Stack
	    return getStackAddendumByID$1(debugID);
	  } else {
	    // This can only happen on Fiber / Server
	    var stack = ReactDebugCurrentFrame$3.getStackAddendum();
	    return stack != null ? stack : '';
	  }
	}

	function validateProperties$1(type, props, debugID /* Stack only */) {
	  if (type !== 'input' && type !== 'textarea' && type !== 'select') {
	    return;
	  }
	  if (props != null && props.value === null && !didWarnValueNull) {
	    warning$6(false, '`value` prop on `%s` should not be null. ' + 'Consider using the empty string to clear the component or `undefined` ' + 'for uncontrolled components.%s', type, getStackAddendum$2(debugID));

	    didWarnValueNull = true;
	  }
	}

	var ReactDOMNullInputValuePropHook = {
	  // Fiber
	  validateProperties: validateProperties$1,
	  // Stack
	  onBeforeMountComponent: function (debugID, element) {
	    if (true && element != null && typeof element.type === 'string') {
	      validateProperties$1(element.type, element.props, debugID);
	    }
	  },
	  onBeforeUpdateComponent: function (debugID, element) {
	    if (true && element != null && typeof element.type === 'string') {
	      validateProperties$1(element.type, element.props, debugID);
	    }
	  }
	};

	var ReactDOMNullInputValuePropHook_1 = ReactDOMNullInputValuePropHook;

	/**
	 * Injectable ordering of event plugins.
	 */
	var eventPluginOrder = null;

	/**
	 * Injectable mapping from names to event plugin modules.
	 */
	var namesToPlugins = {};

	/**
	 * Recomputes the plugin list using the injected plugins and plugin ordering.
	 *
	 * @private
	 */
	function recomputePluginOrdering() {
	  if (!eventPluginOrder) {
	    // Wait until an `eventPluginOrder` is injected.
	    return;
	  }
	  for (var pluginName in namesToPlugins) {
	    var pluginModule = namesToPlugins[pluginName];
	    var pluginIndex = eventPluginOrder.indexOf(pluginName);
	    !(pluginIndex > -1) ? invariant(false, 'EventPluginRegistry: Cannot inject event plugins that do not exist in the plugin ordering, `%s`.', pluginName) : void 0;
	    if (EventPluginRegistry.plugins[pluginIndex]) {
	      continue;
	    }
	    !pluginModule.extractEvents ? invariant(false, 'EventPluginRegistry: Event plugins must implement an `extractEvents` method, but `%s` does not.', pluginName) : void 0;
	    EventPluginRegistry.plugins[pluginIndex] = pluginModule;
	    var publishedEvents = pluginModule.eventTypes;
	    for (var eventName in publishedEvents) {
	      !publishEventForPlugin(publishedEvents[eventName], pluginModule, eventName) ? invariant(false, 'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.', eventName, pluginName) : void 0;
	    }
	  }
	}

	/**
	 * Publishes an event so that it can be dispatched by the supplied plugin.
	 *
	 * @param {object} dispatchConfig Dispatch configuration for the event.
	 * @param {object} PluginModule Plugin publishing the event.
	 * @return {boolean} True if the event was successfully published.
	 * @private
	 */
	function publishEventForPlugin(dispatchConfig, pluginModule, eventName) {
	  !!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName) ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same event name, `%s`.', eventName) : void 0;
	  EventPluginRegistry.eventNameDispatchConfigs[eventName] = dispatchConfig;

	  var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
	  if (phasedRegistrationNames) {
	    for (var phaseName in phasedRegistrationNames) {
	      if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
	        var phasedRegistrationName = phasedRegistrationNames[phaseName];
	        publishRegistrationName(phasedRegistrationName, pluginModule, eventName);
	      }
	    }
	    return true;
	  } else if (dispatchConfig.registrationName) {
	    publishRegistrationName(dispatchConfig.registrationName, pluginModule, eventName);
	    return true;
	  }
	  return false;
	}

	/**
	 * Publishes a registration name that is used to identify dispatched events.
	 *
	 * @param {string} registrationName Registration name to add.
	 * @param {object} PluginModule Plugin publishing the event.
	 * @private
	 */
	function publishRegistrationName(registrationName, pluginModule, eventName) {
	  !!EventPluginRegistry.registrationNameModules[registrationName] ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same registration name, `%s`.', registrationName) : void 0;
	  EventPluginRegistry.registrationNameModules[registrationName] = pluginModule;
	  EventPluginRegistry.registrationNameDependencies[registrationName] = pluginModule.eventTypes[eventName].dependencies;

	  {
	    var lowerCasedName = registrationName.toLowerCase();
	    EventPluginRegistry.possibleRegistrationNames[lowerCasedName] = registrationName;

	    if (registrationName === 'onDoubleClick') {
	      EventPluginRegistry.possibleRegistrationNames.ondblclick = registrationName;
	    }
	  }
	}

	/**
	 * Registers plugins so that they can extract and dispatch events.
	 *
	 * @see {EventPluginHub}
	 */
	var EventPluginRegistry = {
	  /**
	   * Ordered list of injected plugins.
	   */
	  plugins: [],

	  /**
	   * Mapping from event name to dispatch config
	   */
	  eventNameDispatchConfigs: {},

	  /**
	   * Mapping from registration name to plugin module
	   */
	  registrationNameModules: {},

	  /**
	   * Mapping from registration name to event name
	   */
	  registrationNameDependencies: {},

	  /**
	   * Mapping from lowercase registration names to the properly cased version,
	   * used to warn in the case of missing event handlers. Available
	   * only in true.
	   * @type {Object}
	   */
	  possibleRegistrationNames: {},
	  // Trust the developer to only use possibleRegistrationNames in true

	  /**
	   * Injects an ordering of plugins (by plugin name). This allows the ordering
	   * to be decoupled from injection of the actual plugins so that ordering is
	   * always deterministic regardless of packaging, on-the-fly injection, etc.
	   *
	   * @param {array} InjectedEventPluginOrder
	   * @internal
	   * @see {EventPluginHub.injection.injectEventPluginOrder}
	   */
	  injectEventPluginOrder: function (injectedEventPluginOrder) {
	    !!eventPluginOrder ? invariant(false, 'EventPluginRegistry: Cannot inject event plugin ordering more than once. You are likely trying to load more than one copy of React.') : void 0;
	    // Clone the ordering so it cannot be dynamically mutated.
	    eventPluginOrder = Array.prototype.slice.call(injectedEventPluginOrder);
	    recomputePluginOrdering();
	  },

	  /**
	   * Injects plugins to be used by `EventPluginHub`. The plugin names must be
	   * in the ordering injected by `injectEventPluginOrder`.
	   *
	   * Plugins can be injected as part of page initialization or on-the-fly.
	   *
	   * @param {object} injectedNamesToPlugins Map from names to plugin modules.
	   * @internal
	   * @see {EventPluginHub.injection.injectEventPluginsByName}
	   */
	  injectEventPluginsByName: function (injectedNamesToPlugins) {
	    var isOrderingDirty = false;
	    for (var pluginName in injectedNamesToPlugins) {
	      if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
	        continue;
	      }
	      var pluginModule = injectedNamesToPlugins[pluginName];
	      if (!namesToPlugins.hasOwnProperty(pluginName) || namesToPlugins[pluginName] !== pluginModule) {
	        !!namesToPlugins[pluginName] ? invariant(false, 'EventPluginRegistry: Cannot inject two different event plugins using the same name, `%s`.', pluginName) : void 0;
	        namesToPlugins[pluginName] = pluginModule;
	        isOrderingDirty = true;
	      }
	    }
	    if (isOrderingDirty) {
	      recomputePluginOrdering();
	    }
	  }
	};

	var EventPluginRegistry_1 = EventPluginRegistry;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule possibleStandardNames
	 */

	// When adding attributes to the HTML or SVG whitelist, be sure to
	// also add them to this module to ensure casing and incorrect name
	// warnings.
	var possibleStandardNames$1 = {
	  // HTML
	  accept: 'accept',
	  acceptcharset: 'acceptCharset',
	  'accept-charset': 'acceptCharset',
	  accesskey: 'accessKey',
	  action: 'action',
	  allowfullscreen: 'allowFullScreen',
	  allowtransparency: 'allowTransparency',
	  alt: 'alt',
	  as: 'as',
	  async: 'async',
	  autocapitalize: 'autoCapitalize',
	  autocomplete: 'autoComplete',
	  autocorrect: 'autoCorrect',
	  autofocus: 'autoFocus',
	  autoplay: 'autoPlay',
	  autosave: 'autoSave',
	  capture: 'capture',
	  cellpadding: 'cellPadding',
	  cellspacing: 'cellSpacing',
	  challenge: 'challenge',
	  charset: 'charSet',
	  checked: 'checked',
	  children: 'children',
	  cite: 'cite',
	  'class': 'className',
	  classid: 'classID',
	  classname: 'className',
	  cols: 'cols',
	  colspan: 'colSpan',
	  content: 'content',
	  contenteditable: 'contentEditable',
	  contextmenu: 'contextMenu',
	  controls: 'controls',
	  controlslist: 'controlsList',
	  coords: 'coords',
	  crossorigin: 'crossOrigin',
	  dangerouslysetinnerhtml: 'dangerouslySetInnerHTML',
	  data: 'data',
	  datetime: 'dateTime',
	  'default': 'default',
	  defaultchecked: 'defaultChecked',
	  defaultvalue: 'defaultValue',
	  defer: 'defer',
	  dir: 'dir',
	  disabled: 'disabled',
	  download: 'download',
	  draggable: 'draggable',
	  enctype: 'encType',
	  'for': 'htmlFor',
	  form: 'form',
	  formmethod: 'formMethod',
	  formaction: 'formAction',
	  formenctype: 'formEncType',
	  formnovalidate: 'formNoValidate',
	  formtarget: 'formTarget',
	  frameborder: 'frameBorder',
	  headers: 'headers',
	  height: 'height',
	  hidden: 'hidden',
	  high: 'high',
	  href: 'href',
	  hreflang: 'hrefLang',
	  htmlfor: 'htmlFor',
	  httpequiv: 'httpEquiv',
	  'http-equiv': 'httpEquiv',
	  icon: 'icon',
	  id: 'id',
	  innerhtml: 'innerHTML',
	  inputmode: 'inputMode',
	  integrity: 'integrity',
	  is: 'is',
	  itemid: 'itemID',
	  itemprop: 'itemProp',
	  itemref: 'itemRef',
	  itemscope: 'itemScope',
	  itemtype: 'itemType',
	  keyparams: 'keyParams',
	  keytype: 'keyType',
	  kind: 'kind',
	  label: 'label',
	  lang: 'lang',
	  list: 'list',
	  loop: 'loop',
	  low: 'low',
	  manifest: 'manifest',
	  marginwidth: 'marginWidth',
	  marginheight: 'marginHeight',
	  max: 'max',
	  maxlength: 'maxLength',
	  media: 'media',
	  mediagroup: 'mediaGroup',
	  method: 'method',
	  min: 'min',
	  minlength: 'minLength',
	  multiple: 'multiple',
	  muted: 'muted',
	  name: 'name',
	  nonce: 'nonce',
	  novalidate: 'noValidate',
	  open: 'open',
	  optimum: 'optimum',
	  pattern: 'pattern',
	  placeholder: 'placeholder',
	  playsinline: 'playsInline',
	  poster: 'poster',
	  preload: 'preload',
	  profile: 'profile',
	  radiogroup: 'radioGroup',
	  readonly: 'readOnly',
	  referrerpolicy: 'referrerPolicy',
	  rel: 'rel',
	  required: 'required',
	  reversed: 'reversed',
	  role: 'role',
	  rows: 'rows',
	  rowspan: 'rowSpan',
	  sandbox: 'sandbox',
	  scope: 'scope',
	  scoped: 'scoped',
	  scrolling: 'scrolling',
	  seamless: 'seamless',
	  selected: 'selected',
	  shape: 'shape',
	  size: 'size',
	  sizes: 'sizes',
	  span: 'span',
	  spellcheck: 'spellCheck',
	  src: 'src',
	  srcdoc: 'srcDoc',
	  srclang: 'srcLang',
	  srcset: 'srcSet',
	  start: 'start',
	  step: 'step',
	  style: 'style',
	  summary: 'summary',
	  tabindex: 'tabIndex',
	  target: 'target',
	  title: 'title',
	  type: 'type',
	  usemap: 'useMap',
	  value: 'value',
	  width: 'width',
	  wmode: 'wmode',
	  wrap: 'wrap',

	  // SVG
	  about: 'about',
	  accentheight: 'accentHeight',
	  'accent-height': 'accentHeight',
	  accumulate: 'accumulate',
	  additive: 'additive',
	  alignmentbaseline: 'alignmentBaseline',
	  'alignment-baseline': 'alignmentBaseline',
	  allowreorder: 'allowReorder',
	  alphabetic: 'alphabetic',
	  amplitude: 'amplitude',
	  arabicform: 'arabicForm',
	  'arabic-form': 'arabicForm',
	  ascent: 'ascent',
	  attributename: 'attributeName',
	  attributetype: 'attributeType',
	  autoreverse: 'autoReverse',
	  azimuth: 'azimuth',
	  basefrequency: 'baseFrequency',
	  baselineshift: 'baselineShift',
	  'baseline-shift': 'baselineShift',
	  baseprofile: 'baseProfile',
	  bbox: 'bbox',
	  begin: 'begin',
	  bias: 'bias',
	  by: 'by',
	  calcmode: 'calcMode',
	  capheight: 'capHeight',
	  'cap-height': 'capHeight',
	  clip: 'clip',
	  clippath: 'clipPath',
	  'clip-path': 'clipPath',
	  clippathunits: 'clipPathUnits',
	  cliprule: 'clipRule',
	  'clip-rule': 'clipRule',
	  color: 'color',
	  colorinterpolation: 'colorInterpolation',
	  'color-interpolation': 'colorInterpolation',
	  colorinterpolationfilters: 'colorInterpolationFilters',
	  'color-interpolation-filters': 'colorInterpolationFilters',
	  colorprofile: 'colorProfile',
	  'color-profile': 'colorProfile',
	  colorrendering: 'colorRendering',
	  'color-rendering': 'colorRendering',
	  contentscripttype: 'contentScriptType',
	  contentstyletype: 'contentStyleType',
	  cursor: 'cursor',
	  cx: 'cx',
	  cy: 'cy',
	  d: 'd',
	  datatype: 'datatype',
	  decelerate: 'decelerate',
	  descent: 'descent',
	  diffuseconstant: 'diffuseConstant',
	  direction: 'direction',
	  display: 'display',
	  divisor: 'divisor',
	  dominantbaseline: 'dominantBaseline',
	  'dominant-baseline': 'dominantBaseline',
	  dur: 'dur',
	  dx: 'dx',
	  dy: 'dy',
	  edgemode: 'edgeMode',
	  elevation: 'elevation',
	  enablebackground: 'enableBackground',
	  'enable-background': 'enableBackground',
	  end: 'end',
	  exponent: 'exponent',
	  externalresourcesrequired: 'externalResourcesRequired',
	  fill: 'fill',
	  fillopacity: 'fillOpacity',
	  'fill-opacity': 'fillOpacity',
	  fillrule: 'fillRule',
	  'fill-rule': 'fillRule',
	  filter: 'filter',
	  filterres: 'filterRes',
	  filterunits: 'filterUnits',
	  floodopacity: 'floodOpacity',
	  'flood-opacity': 'floodOpacity',
	  floodcolor: 'floodColor',
	  'flood-color': 'floodColor',
	  focusable: 'focusable',
	  fontfamily: 'fontFamily',
	  'font-family': 'fontFamily',
	  fontsize: 'fontSize',
	  'font-size': 'fontSize',
	  fontsizeadjust: 'fontSizeAdjust',
	  'font-size-adjust': 'fontSizeAdjust',
	  fontstretch: 'fontStretch',
	  'font-stretch': 'fontStretch',
	  fontstyle: 'fontStyle',
	  'font-style': 'fontStyle',
	  fontvariant: 'fontVariant',
	  'font-variant': 'fontVariant',
	  fontweight: 'fontWeight',
	  'font-weight': 'fontWeight',
	  format: 'format',
	  from: 'from',
	  fx: 'fx',
	  fy: 'fy',
	  g1: 'g1',
	  g2: 'g2',
	  glyphname: 'glyphName',
	  'glyph-name': 'glyphName',
	  glyphorientationhorizontal: 'glyphOrientationHorizontal',
	  'glyph-orientation-horizontal': 'glyphOrientationHorizontal',
	  glyphorientationvertical: 'glyphOrientationVertical',
	  'glyph-orientation-vertical': 'glyphOrientationVertical',
	  glyphref: 'glyphRef',
	  gradienttransform: 'gradientTransform',
	  gradientunits: 'gradientUnits',
	  hanging: 'hanging',
	  horizadvx: 'horizAdvX',
	  'horiz-adv-x': 'horizAdvX',
	  horizoriginx: 'horizOriginX',
	  'horiz-origin-x': 'horizOriginX',
	  ideographic: 'ideographic',
	  imagerendering: 'imageRendering',
	  'image-rendering': 'imageRendering',
	  in2: 'in2',
	  'in': 'in',
	  inlist: 'inlist',
	  intercept: 'intercept',
	  k1: 'k1',
	  k2: 'k2',
	  k3: 'k3',
	  k4: 'k4',
	  k: 'k',
	  kernelmatrix: 'kernelMatrix',
	  kernelunitlength: 'kernelUnitLength',
	  kerning: 'kerning',
	  keypoints: 'keyPoints',
	  keysplines: 'keySplines',
	  keytimes: 'keyTimes',
	  lengthadjust: 'lengthAdjust',
	  letterspacing: 'letterSpacing',
	  'letter-spacing': 'letterSpacing',
	  lightingcolor: 'lightingColor',
	  'lighting-color': 'lightingColor',
	  limitingconeangle: 'limitingConeAngle',
	  local: 'local',
	  markerend: 'markerEnd',
	  'marker-end': 'markerEnd',
	  markerheight: 'markerHeight',
	  markermid: 'markerMid',
	  'marker-mid': 'markerMid',
	  markerstart: 'markerStart',
	  'marker-start': 'markerStart',
	  markerunits: 'markerUnits',
	  markerwidth: 'markerWidth',
	  mask: 'mask',
	  maskcontentunits: 'maskContentUnits',
	  maskunits: 'maskUnits',
	  mathematical: 'mathematical',
	  mode: 'mode',
	  numoctaves: 'numOctaves',
	  offset: 'offset',
	  opacity: 'opacity',
	  operator: 'operator',
	  order: 'order',
	  orient: 'orient',
	  orientation: 'orientation',
	  origin: 'origin',
	  overflow: 'overflow',
	  overlineposition: 'overlinePosition',
	  'overline-position': 'overlinePosition',
	  overlinethickness: 'overlineThickness',
	  'overline-thickness': 'overlineThickness',
	  paintorder: 'paintOrder',
	  'paint-order': 'paintOrder',
	  panose1: 'panose1',
	  'panose-1': 'panose1',
	  pathlength: 'pathLength',
	  patterncontentunits: 'patternContentUnits',
	  patterntransform: 'patternTransform',
	  patternunits: 'patternUnits',
	  pointerevents: 'pointerEvents',
	  'pointer-events': 'pointerEvents',
	  points: 'points',
	  pointsatx: 'pointsAtX',
	  pointsaty: 'pointsAtY',
	  pointsatz: 'pointsAtZ',
	  prefix: 'prefix',
	  preservealpha: 'preserveAlpha',
	  preserveaspectratio: 'preserveAspectRatio',
	  primitiveunits: 'primitiveUnits',
	  property: 'property',
	  r: 'r',
	  radius: 'radius',
	  refx: 'refX',
	  refy: 'refY',
	  renderingintent: 'renderingIntent',
	  'rendering-intent': 'renderingIntent',
	  repeatcount: 'repeatCount',
	  repeatdur: 'repeatDur',
	  requiredextensions: 'requiredExtensions',
	  requiredfeatures: 'requiredFeatures',
	  resource: 'resource',
	  restart: 'restart',
	  result: 'result',
	  results: 'results',
	  rotate: 'rotate',
	  rx: 'rx',
	  ry: 'ry',
	  scale: 'scale',
	  security: 'security',
	  seed: 'seed',
	  shaperendering: 'shapeRendering',
	  'shape-rendering': 'shapeRendering',
	  slope: 'slope',
	  spacing: 'spacing',
	  specularconstant: 'specularConstant',
	  specularexponent: 'specularExponent',
	  speed: 'speed',
	  spreadmethod: 'spreadMethod',
	  startoffset: 'startOffset',
	  stddeviation: 'stdDeviation',
	  stemh: 'stemh',
	  stemv: 'stemv',
	  stitchtiles: 'stitchTiles',
	  stopcolor: 'stopColor',
	  'stop-color': 'stopColor',
	  stopopacity: 'stopOpacity',
	  'stop-opacity': 'stopOpacity',
	  strikethroughposition: 'strikethroughPosition',
	  'strikethrough-position': 'strikethroughPosition',
	  strikethroughthickness: 'strikethroughThickness',
	  'strikethrough-thickness': 'strikethroughThickness',
	  string: 'string',
	  stroke: 'stroke',
	  strokedasharray: 'strokeDasharray',
	  'stroke-dasharray': 'strokeDasharray',
	  strokedashoffset: 'strokeDashoffset',
	  'stroke-dashoffset': 'strokeDashoffset',
	  strokelinecap: 'strokeLinecap',
	  'stroke-linecap': 'strokeLinecap',
	  strokelinejoin: 'strokeLinejoin',
	  'stroke-linejoin': 'strokeLinejoin',
	  strokemiterlimit: 'strokeMiterlimit',
	  'stroke-miterlimit': 'strokeMiterlimit',
	  strokewidth: 'strokeWidth',
	  'stroke-width': 'strokeWidth',
	  strokeopacity: 'strokeOpacity',
	  'stroke-opacity': 'strokeOpacity',
	  suppresscontenteditablewarning: 'suppressContentEditableWarning',
	  surfacescale: 'surfaceScale',
	  systemlanguage: 'systemLanguage',
	  tablevalues: 'tableValues',
	  targetx: 'targetX',
	  targety: 'targetY',
	  textanchor: 'textAnchor',
	  'text-anchor': 'textAnchor',
	  textdecoration: 'textDecoration',
	  'text-decoration': 'textDecoration',
	  textlength: 'textLength',
	  textrendering: 'textRendering',
	  'text-rendering': 'textRendering',
	  to: 'to',
	  transform: 'transform',
	  'typeof': 'typeof',
	  u1: 'u1',
	  u2: 'u2',
	  underlineposition: 'underlinePosition',
	  'underline-position': 'underlinePosition',
	  underlinethickness: 'underlineThickness',
	  'underline-thickness': 'underlineThickness',
	  unicode: 'unicode',
	  unicodebidi: 'unicodeBidi',
	  'unicode-bidi': 'unicodeBidi',
	  unicoderange: 'unicodeRange',
	  'unicode-range': 'unicodeRange',
	  unitsperem: 'unitsPerEm',
	  'units-per-em': 'unitsPerEm',
	  unselectable: 'unselectable',
	  valphabetic: 'vAlphabetic',
	  'v-alphabetic': 'vAlphabetic',
	  values: 'values',
	  vectoreffect: 'vectorEffect',
	  'vector-effect': 'vectorEffect',
	  version: 'version',
	  vertadvy: 'vertAdvY',
	  'vert-adv-y': 'vertAdvY',
	  vertoriginx: 'vertOriginX',
	  'vert-origin-x': 'vertOriginX',
	  vertoriginy: 'vertOriginY',
	  'vert-origin-y': 'vertOriginY',
	  vhanging: 'vHanging',
	  'v-hanging': 'vHanging',
	  videographic: 'vIdeographic',
	  'v-ideographic': 'vIdeographic',
	  viewbox: 'viewBox',
	  viewtarget: 'viewTarget',
	  visibility: 'visibility',
	  vmathematical: 'vMathematical',
	  'v-mathematical': 'vMathematical',
	  vocab: 'vocab',
	  widths: 'widths',
	  wordspacing: 'wordSpacing',
	  'word-spacing': 'wordSpacing',
	  writingmode: 'writingMode',
	  'writing-mode': 'writingMode',
	  x1: 'x1',
	  x2: 'x2',
	  x: 'x',
	  xchannelselector: 'xChannelSelector',
	  xheight: 'xHeight',
	  'x-height': 'xHeight',
	  xlinkactuate: 'xlinkActuate',
	  'xlink:actuate': 'xlinkActuate',
	  xlinkarcrole: 'xlinkArcrole',
	  'xlink:arcrole': 'xlinkArcrole',
	  xlinkhref: 'xlinkHref',
	  'xlink:href': 'xlinkHref',
	  xlinkrole: 'xlinkRole',
	  'xlink:role': 'xlinkRole',
	  xlinkshow: 'xlinkShow',
	  'xlink:show': 'xlinkShow',
	  xlinktitle: 'xlinkTitle',
	  'xlink:title': 'xlinkTitle',
	  xlinktype: 'xlinkType',
	  'xlink:type': 'xlinkType',
	  xmlbase: 'xmlBase',
	  'xml:base': 'xmlBase',
	  xmllang: 'xmlLang',
	  'xml:lang': 'xmlLang',
	  xmlns: 'xmlns',
	  'xml:space': 'xmlSpace',
	  xmlnsxlink: 'xmlnsXlink',
	  'xmlns:xlink': 'xmlnsXlink',
	  xmlspace: 'xmlSpace',
	  y1: 'y1',
	  y2: 'y2',
	  y: 'y',
	  ychannelselector: 'yChannelSelector',
	  z: 'z',
	  zoomandpan: 'zoomAndPan'
	};

	var possibleStandardNames_1 = possibleStandardNames$1;

	{
	  var warning$7 = require$$0;

	  var _require$3 = ReactGlobalSharedState_1,
	      ReactComponentTreeHook$2 = _require$3.ReactComponentTreeHook,
	      ReactDebugCurrentFrame$4 = _require$3.ReactDebugCurrentFrame;

	  var getStackAddendumByID$2 = ReactComponentTreeHook$2.getStackAddendumByID;
	}

	function getStackAddendum$3(debugID) {
	  if (debugID != null) {
	    // This can only happen on Stack
	    return getStackAddendumByID$2(debugID);
	  } else {
	    // This can only happen on Fiber / Server
	    var stack = ReactDebugCurrentFrame$4.getStackAddendum();
	    return stack != null ? stack : '';
	  }
	}

	{
	  var warnedProperties$1 = {};
	  var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
	  var EVENT_NAME_REGEX = /^on[A-Z]/;
	  var rARIA$1 = new RegExp('^(aria)-[' + DOMProperty_1.ATTRIBUTE_NAME_CHAR + ']*$');
	  var rARIACamel$1 = new RegExp('^(aria)[A-Z][' + DOMProperty_1.ATTRIBUTE_NAME_CHAR + ']*$');
	  var possibleStandardNames = possibleStandardNames_1;

	  var validateProperty$1 = function (tagName, name, value, debugID) {
	    if (hasOwnProperty$1.call(warnedProperties$1, name) && warnedProperties$1[name]) {
	      return true;
	    }

	    if (EventPluginRegistry_1.registrationNameModules.hasOwnProperty(name)) {
	      return true;
	    }

	    if (EventPluginRegistry_1.plugins.length === 0 && EVENT_NAME_REGEX.test(name)) {
	      // If no event plugins have been injected, we might be in a server environment.
	      // Don't check events in this case.
	      return true;
	    }

	    var lowerCasedName = name.toLowerCase();
	    var registrationName = EventPluginRegistry_1.possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? EventPluginRegistry_1.possibleRegistrationNames[lowerCasedName] : null;

	    if (registrationName != null) {
	      warning$7(false, 'Invalid event handler property `%s`. Did you mean `%s`?%s', name, registrationName, getStackAddendum$3(debugID));
	      warnedProperties$1[name] = true;
	      return true;
	    }

	    if (lowerCasedName.indexOf('on') === 0) {
	      warning$7(false, 'Unknown event handler property `%s`. It will be ignored.%s', name, getStackAddendum$3(debugID));
	      warnedProperties$1[name] = true;
	      return true;
	    }

	    // Let the ARIA attribute hook validate ARIA attributes
	    if (rARIA$1.test(name) || rARIACamel$1.test(name)) {
	      return true;
	    }

	    if (lowerCasedName === 'onfocusin' || lowerCasedName === 'onfocusout') {
	      warning$7(false, 'React uses onFocus and onBlur instead of onFocusIn and onFocusOut. ' + 'All React events are normalized to bubble, so onFocusIn and onFocusOut ' + 'are not needed/supported by React.');
	      warnedProperties$1[name] = true;
	      return true;
	    }

	    if (lowerCasedName === 'innerhtml') {
	      warning$7(false, 'Directly setting property `innerHTML` is not permitted. ' + 'For more information, lookup documentation on `dangerouslySetInnerHTML`.');
	      warnedProperties$1[name] = true;
	      return true;
	    }

	    if (lowerCasedName === 'aria') {
	      warning$7(false, 'The `aria` attribute is reserved for future use in React. ' + 'Pass individual `aria-` attributes instead.');
	      warnedProperties$1[name] = true;
	      return true;
	    }

	    if (lowerCasedName === 'is' && value !== null && value !== undefined && typeof value !== 'string') {
	      warning$7(false, 'Received a `%s` for string attribute `is`. If this is expected, cast ' + 'the value to a string.%s', typeof value, getStackAddendum$3(debugID));
	      warnedProperties$1[name] = true;
	      return true;
	    }

	    if (typeof value === 'number' && isNaN(value)) {
	      warning$7(false, 'Received NaN for numeric attribute `%s`. If this is expected, cast ' + 'the value to a string.%s', name, getStackAddendum$3(debugID));
	      warnedProperties$1[name] = true;
	      return true;
	    }

	    var isReserved = DOMProperty_1.isReservedProp(name);

	    // Known attributes should match the casing specified in the property config.
	    if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
	      var standardName = possibleStandardNames[lowerCasedName];
	      if (standardName !== name) {
	        warning$7(false, 'Invalid DOM property `%s`. Did you mean `%s`?%s', name, standardName, getStackAddendum$3(debugID));
	        warnedProperties$1[name] = true;
	        return true;
	      }
	    } else if (!isReserved && name !== lowerCasedName) {
	      // Unknown attributes should have lowercase casing since that's how they
	      // will be cased anyway with server rendering.
	      warning$7(false, 'React does not recognize the `%s` prop on a DOM element. If you ' + 'intentionally want it to appear in the DOM as a custom ' + 'attribute, spell it as lowercase `%s` instead. ' + 'If you accidentally passed it from a parent component, remove ' + 'it from the DOM element.%s', name, lowerCasedName, getStackAddendum$3(debugID));
	      warnedProperties$1[name] = true;
	      return true;
	    }

	    if (typeof value === 'boolean') {
	      warning$7(DOMProperty_1.shouldAttributeAcceptBooleanValue(name), 'Received `%s` for non-boolean attribute `%s`. If this is expected, cast ' + 'the value to a string.%s', value, name, getStackAddendum$3(debugID));
	      warnedProperties$1[name] = true;
	      return true;
	    }

	    // Now that we've validated casing, do not validate
	    // data types for reserved props
	    if (isReserved) {
	      return true;
	    }

	    // Warn when a known attribute is a bad type
	    if (!DOMProperty_1.shouldSetAttribute(name, value)) {
	      warnedProperties$1[name] = true;
	      return false;
	    }

	    return true;
	  };
	}

	var warnUnknownProperties = function (type, props, debugID) {
	  var unknownProps = [];
	  for (var key in props) {
	    var isValid = validateProperty$1(type, key, props[key], debugID);
	    if (!isValid) {
	      unknownProps.push(key);
	    }
	  }

	  var unknownPropString = unknownProps.map(function (prop) {
	    return '`' + prop + '`';
	  }).join(', ');
	  if (unknownProps.length === 1) {
	    warning$7(false, 'Invalid value for prop %s on <%s> tag. Either remove it from the element, ' + 'or pass a string or number value to keep it in the DOM. ' + 'For details, see https://fb.me/react-attribute-behavior%s', unknownPropString, type, getStackAddendum$3(debugID));
	  } else if (unknownProps.length > 1) {
	    warning$7(false, 'Invalid values for props %s on <%s> tag. Either remove them from the element, ' + 'or pass a string or number value to keep them in the DOM. ' + 'For details, see https://fb.me/react-attribute-behavior%s', unknownPropString, type, getStackAddendum$3(debugID));
	  }
	};

	function validateProperties$2(type, props, debugID /* Stack only */) {
	  if (isCustomComponent_1(type, props)) {
	    return;
	  }
	  warnUnknownProperties(type, props, debugID);
	}

	var ReactDOMUnknownPropertyHook = {
	  // Fiber
	  validateProperties: validateProperties$2,
	  // Stack
	  onBeforeMountComponent: function (debugID, element) {
	    if (true && element != null && typeof element.type === 'string') {
	      validateProperties$2(element.type, element.props, debugID);
	    }
	  },
	  onBeforeUpdateComponent: function (debugID, element) {
	    if (true && element != null && typeof element.type === 'string') {
	      validateProperties$2(element.type, element.props, debugID);
	    }
	  }
	};

	var ReactDOMUnknownPropertyHook_1 = ReactDOMUnknownPropertyHook;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Namespaces = DOMNamespaces.Namespaces;
	var getIntrinsicNamespace = DOMNamespaces.getIntrinsicNamespace;
	var getChildNamespace = DOMNamespaces.getChildNamespace;















	var toArray = react.Children.toArray;

	{
	  var warning = require$$0;
	  var checkPropTypes$1 = checkPropTypes;
	  var warnValidStyle = warnValidStyle_1;

	  var _require2 = ReactDOMInvalidARIAHook_1,
	      validateARIAProperties = _require2.validateProperties;

	  var _require3 = ReactDOMNullInputValuePropHook_1,
	      validateInputProperties = _require3.validateProperties;

	  var _require4 = ReactDOMUnknownPropertyHook_1,
	      validateUnknownProperties = _require4.validateProperties;

	  var validatePropertiesInDevelopment = function (type, props) {
	    validateARIAProperties(type, props);
	    validateInputProperties(type, props);
	    validateUnknownProperties(type, props);
	  };

	  var describeComponentFrame = describeComponentFrame$1;
	  var describeStackFrame = function (element) {
	    var source = element._source;
	    var type = element.type;
	    var name = getComponentName(type);
	    var ownerName = null;
	    return describeComponentFrame(name, source, ownerName);
	  };

	  var _require5 = ReactGlobalSharedState_1,
	      ReactDebugCurrentFrame = _require5.ReactDebugCurrentFrame;

	  var currentDebugStack = null;
	  var currentDebugElementStack = null;
	  var setCurrentDebugStack = function (stack) {
	    currentDebugElementStack = stack[stack.length - 1].debugElementStack;
	    // We are about to enter a new composite stack, reset the array.
	    currentDebugElementStack.length = 0;
	    currentDebugStack = stack;
	    ReactDebugCurrentFrame.getCurrentStack = getStackAddendum;
	  };
	  var pushElementToDebugStack = function (element) {
	    if (currentDebugElementStack !== null) {
	      currentDebugElementStack.push(element);
	    }
	  };
	  var resetCurrentDebugStack = function () {
	    currentDebugElementStack = null;
	    currentDebugStack = null;
	    ReactDebugCurrentFrame.getCurrentStack = null;
	  };
	  var getStackAddendum = function () {
	    if (currentDebugStack === null) {
	      return null;
	    }
	    var stack = '';
	    var debugStack = currentDebugStack;
	    for (var i = debugStack.length - 1; i >= 0; i--) {
	      var debugElementStack = debugStack[i].debugElementStack;
	      for (var ii = debugElementStack.length - 1; ii >= 0; ii--) {
	        stack += describeStackFrame(debugElementStack[ii]);
	      }
	    }
	    return stack;
	  };
	}

	var didWarnDefaultInputValue = false;
	var didWarnDefaultChecked = false;
	var didWarnDefaultSelectValue = false;
	var didWarnDefaultTextareaValue = false;
	var didWarnInvalidOptionChildren = false;
	var valuePropNames = ['value', 'defaultValue'];
	var newlineEatingTags = {
	  listing: true,
	  pre: true,
	  textarea: true
	};

	function getComponentName(type) {
	  return typeof type === 'string' ? type : typeof type === 'function' ? type.displayName || type.name : null;
	}

	// We accept any tag to be rendered but since this gets injected into arbitrary
	// HTML, we want to make sure that it's a safe tag.
	// http://www.w3.org/TR/REC-xml/#NT-Name
	var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/; // Simplified subset
	var validatedTagCache = {};
	function validateDangerousTag(tag) {
	  if (!validatedTagCache.hasOwnProperty(tag)) {
	    !VALID_TAG_REGEX.test(tag) ? invariant(false, 'Invalid tag: %s', tag) : void 0;
	    validatedTagCache[tag] = true;
	  }
	}

	var processStyleName = memoizeStringOnly(function (styleName) {
	  return hyphenateStyleName(styleName);
	});

	function createMarkupForStyles(styles, component) {
	  var serialized = '';
	  var delimiter = '';
	  for (var styleName in styles) {
	    if (!styles.hasOwnProperty(styleName)) {
	      continue;
	    }
	    var isCustomProperty = styleName.indexOf('--') === 0;
	    var styleValue = styles[styleName];
	    {
	      if (!isCustomProperty) {
	        warnValidStyle(styleName, styleValue, component);
	      }
	    }
	    if (styleValue != null) {
	      serialized += delimiter + processStyleName(styleName) + ':';
	      serialized += dangerousStyleValue_1(styleName, styleValue, isCustomProperty);

	      delimiter = ';';
	    }
	  }
	  return serialized || null;
	}

	function warnNoop(publicInstance, callerName) {
	  {
	    var constructor = publicInstance.constructor;
	    warning(false, '%s(...): Can only update a mounting component. ' + 'This usually means you called %s() outside componentWillMount() on the server. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, constructor && getComponentName(constructor) || 'ReactClass');
	  }
	}

	function shouldConstruct(Component) {
	  return Component.prototype && Component.prototype.isReactComponent;
	}

	function getNonChildrenInnerMarkup(props) {
	  var innerHTML = props.dangerouslySetInnerHTML;
	  if (innerHTML != null) {
	    if (innerHTML.__html != null) {
	      return innerHTML.__html;
	    }
	  } else {
	    var content = props.children;
	    if (typeof content === 'string' || typeof content === 'number') {
	      return escapeTextContentForBrowser_1(content);
	    }
	  }
	  return null;
	}

	function flattenOptionChildren(children) {
	  var content = '';
	  // Flatten children and warn if they aren't strings or numbers;
	  // invalid types are ignored.
	  react.Children.forEach(children, function (child) {
	    if (child == null) {
	      return;
	    }
	    if (typeof child === 'string' || typeof child === 'number') {
	      content += child;
	    } else {
	      {
	        if (!didWarnInvalidOptionChildren) {
	          didWarnInvalidOptionChildren = true;
	          warning(false, 'Only strings and numbers are supported as <option> children.');
	        }
	      }
	    }
	  });
	  return content;
	}

	function maskContext(type, context) {
	  var contextTypes = type.contextTypes;
	  if (!contextTypes) {
	    return emptyObject;
	  }
	  var maskedContext = {};
	  for (var contextName in contextTypes) {
	    maskedContext[contextName] = context[contextName];
	  }
	  return maskedContext;
	}

	function checkContextTypes(typeSpecs, values, location) {
	  {
	    checkPropTypes$1(typeSpecs, values, location, 'Component', getStackAddendum);
	  }
	}

	function processContext(type, context) {
	  var maskedContext = maskContext(type, context);
	  {
	    if (type.contextTypes) {
	      checkContextTypes(type.contextTypes, maskedContext, 'context');
	    }
	  }
	  return maskedContext;
	}

	var STYLE = 'style';
	var RESERVED_PROPS = {
	  children: null,
	  dangerouslySetInnerHTML: null,
	  suppressContentEditableWarning: null
	};

	function createOpenTagMarkup(tagVerbatim, tagLowercase, props, namespace, makeStaticMarkup, isRootElement, instForDebug) {
	  var ret = '<' + tagVerbatim;

	  for (var propKey in props) {
	    if (!props.hasOwnProperty(propKey)) {
	      continue;
	    }
	    var propValue = props[propKey];
	    if (propValue == null) {
	      continue;
	    }
	    if (propKey === STYLE) {
	      propValue = createMarkupForStyles(propValue, instForDebug);
	    }
	    var markup = null;
	    if (isCustomComponent_1(tagLowercase, props)) {
	      if (!RESERVED_PROPS.hasOwnProperty(propKey)) {
	        markup = DOMMarkupOperations_1.createMarkupForCustomAttribute(propKey, propValue);
	      }
	    } else {
	      markup = DOMMarkupOperations_1.createMarkupForProperty(propKey, propValue);
	    }
	    if (markup) {
	      ret += ' ' + markup;
	    }
	  }

	  // For static pages, no need to put React ID and checksum. Saves lots of
	  // bytes.
	  if (makeStaticMarkup) {
	    return ret;
	  }

	  if (isRootElement) {
	    ret += ' ' + DOMMarkupOperations_1.createMarkupForRoot();
	  }
	  return ret;
	}

	function validateRenderResult(child, type) {
	  if (child === undefined) {
	    invariant(false, '%s(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.', getComponentName(type) || 'Component');
	  }
	}

	function resolve(child, context) {
	  while (react.isValidElement(child)) {
	    {
	      pushElementToDebugStack(child);
	    }
	    var Component = child.type;
	    if (typeof Component !== 'function') {
	      break;
	    }
	    var publicContext = processContext(Component, context);
	    var inst;
	    var queue = [];
	    var replace = false;
	    var updater = {
	      isMounted: function (publicInstance) {
	        return false;
	      },
	      enqueueForceUpdate: function (publicInstance) {
	        if (queue === null) {
	          warnNoop(publicInstance, 'forceUpdate');
	          return null;
	        }
	      },
	      enqueueReplaceState: function (publicInstance, completeState) {
	        replace = true;
	        queue = [completeState];
	      },
	      enqueueSetState: function (publicInstance, partialState) {
	        if (queue === null) {
	          warnNoop(publicInstance, 'setState');
	          return null;
	        }
	        queue.push(partialState);
	      }
	    };

	    if (shouldConstruct(Component)) {
	      inst = new Component(child.props, publicContext, updater);
	    } else {
	      inst = Component(child.props, publicContext, updater);
	      if (inst == null || inst.render == null) {
	        child = inst;
	        validateRenderResult(child, Component);
	        continue;
	      }
	    }

	    inst.props = child.props;
	    inst.context = publicContext;
	    inst.updater = updater;

	    var initialState = inst.state;
	    if (initialState === undefined) {
	      inst.state = initialState = null;
	    }
	    if (inst.componentWillMount) {
	      inst.componentWillMount();
	      if (queue.length) {
	        var oldQueue = queue;
	        var oldReplace = replace;
	        queue = null;
	        replace = false;

	        if (oldReplace && oldQueue.length === 1) {
	          inst.state = oldQueue[0];
	        } else {
	          var nextState = oldReplace ? oldQueue[0] : inst.state;
	          var dontMutate = true;
	          for (var i = oldReplace ? 1 : 0; i < oldQueue.length; i++) {
	            var partial = oldQueue[i];
	            var partialState = typeof partial === 'function' ? partial.call(inst, nextState, child.props, publicContext) : partial;
	            if (partialState) {
	              if (dontMutate) {
	                dontMutate = false;
	                nextState = objectAssign$1({}, nextState, partialState);
	              } else {
	                objectAssign$1(nextState, partialState);
	              }
	            }
	          }
	          inst.state = nextState;
	        }
	      } else {
	        queue = null;
	      }
	    }
	    child = inst.render();

	    {
	      if (child === undefined && inst.render._isMockFunction) {
	        // This is probably bad practice. Consider warning here and
	        // deprecating this convenience.
	        child = null;
	      }
	    }
	    validateRenderResult(child, Component);

	    var childContext;
	    if (typeof inst.getChildContext === 'function') {
	      var childContextTypes = Component.childContextTypes;
	      !(typeof childContextTypes === 'object') ? invariant(false, '%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().', getComponentName(Component) || 'Unknown') : void 0;
	      childContext = inst.getChildContext();
	      for (var contextKey in childContext) {
	        !(contextKey in childContextTypes) ? invariant(false, '%s.getChildContext(): key "%s" is not defined in childContextTypes.', getComponentName(Component) || 'Unknown', contextKey) : void 0;
	      }
	    }
	    if (childContext) {
	      context = objectAssign$1({}, context, childContext);
	    }
	  }
	  return { child: child, context: context };
	}

	var ReactDOMServerRenderer = function () {
	  function ReactDOMServerRenderer(element, makeStaticMarkup) {
	    _classCallCheck(this, ReactDOMServerRenderer);

	    var children = react.isValidElement(element) ? [element] : toArray(element);
	    var topFrame = {
	      // Assume all trees start in the HTML namespace (not totally true, but
	      // this is what we did historically)
	      domNamespace: Namespaces.html,
	      children: children,
	      childIndex: 0,
	      context: emptyObject,
	      footer: ''
	    };
	    {
	      topFrame.debugElementStack = [];
	    }
	    this.stack = [topFrame];
	    this.exhausted = false;
	    this.currentSelectValue = null;
	    this.previousWasTextNode = false;
	    this.makeStaticMarkup = makeStaticMarkup;
	  }

	  ReactDOMServerRenderer.prototype.read = function read(bytes) {
	    if (this.exhausted) {
	      return null;
	    }

	    var out = '';
	    while (out.length < bytes) {
	      if (this.stack.length === 0) {
	        this.exhausted = true;
	        break;
	      }
	      var frame = this.stack[this.stack.length - 1];
	      if (frame.childIndex >= frame.children.length) {
	        out += frame.footer;
	        this.previousWasTextNode = false;
	        this.stack.pop();
	        if (frame.tag === 'select') {
	          this.currentSelectValue = null;
	        }
	        continue;
	      }
	      var child = frame.children[frame.childIndex++];
	      {
	        setCurrentDebugStack(this.stack);
	      }
	      out += this.render(child, frame.context, frame.domNamespace);
	      {
	        // TODO: Handle reentrant server render calls. This doesn't.
	        resetCurrentDebugStack();
	      }
	    }
	    return out;
	  };

	  ReactDOMServerRenderer.prototype.render = function render(child, context, parentNamespace) {
	    if (typeof child === 'string' || typeof child === 'number') {
	      var text = '' + child;
	      if (text === '') {
	        return '';
	      }
	      if (this.makeStaticMarkup) {
	        return escapeTextContentForBrowser_1(text);
	      }
	      if (this.previousWasTextNode) {
	        return '<!-- -->' + escapeTextContentForBrowser_1(text);
	      }
	      this.previousWasTextNode = true;
	      return escapeTextContentForBrowser_1(text);
	    } else {
	      var _resolve = resolve(child, context);

	      child = _resolve.child;
	      context = _resolve.context;

	      if (child === null || child === false) {
	        return '';
	      } else {
	        if (react.isValidElement(child)) {
	          return this.renderDOM(child, context, parentNamespace);
	        } else {
	          var children = toArray(child);
	          var frame = {
	            domNamespace: parentNamespace,
	            children: children,
	            childIndex: 0,
	            context: context,
	            footer: ''
	          };
	          {
	            frame.debugElementStack = [];
	          }
	          this.stack.push(frame);
	          return '';
	        }
	      }
	    }
	  };

	  ReactDOMServerRenderer.prototype.renderDOM = function renderDOM(element, context, parentNamespace) {
	    var tag = element.type.toLowerCase();

	    var namespace = parentNamespace;
	    if (parentNamespace === Namespaces.html) {
	      namespace = getIntrinsicNamespace(tag);
	    }

	    {
	      if (namespace === Namespaces.html) {
	        // Should this check be gated by parent namespace? Not sure we want to
	        // allow <SVG> or <mATH>.
	        warning(tag === element.type, '<%s /> is using uppercase HTML. Always use lowercase HTML tags ' + 'in React.', element.type);
	      }
	    }

	    validateDangerousTag(tag);

	    var props = element.props;
	    if (tag === 'input') {
	      {
	        ReactControlledValuePropTypes_1.checkPropTypes('input', props, function () {
	          return '';
	        });

	        if (props.checked !== undefined && props.defaultChecked !== undefined && !didWarnDefaultChecked) {
	          warning(false, '%s contains an input of type %s with both checked and defaultChecked props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the checked prop, or the defaultChecked prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components', 'A component', props.type);
	          didWarnDefaultChecked = true;
	        }
	        if (props.value !== undefined && props.defaultValue !== undefined && !didWarnDefaultInputValue) {
	          warning(false, '%s contains an input of type %s with both value and defaultValue props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components', 'A component', props.type);
	          didWarnDefaultInputValue = true;
	        }
	      }

	      props = objectAssign$1({
	        type: undefined
	      }, props, {
	        defaultChecked: undefined,
	        defaultValue: undefined,
	        value: props.value != null ? props.value : props.defaultValue,
	        checked: props.checked != null ? props.checked : props.defaultChecked
	      });
	    } else if (tag === 'textarea') {
	      {
	        ReactControlledValuePropTypes_1.checkPropTypes('textarea', props, function () {
	          return '';
	        });
	        if (props.value !== undefined && props.defaultValue !== undefined && !didWarnDefaultTextareaValue) {
	          warning(false, 'Textarea elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled textarea ' + 'and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components');
	          didWarnDefaultTextareaValue = true;
	        }
	      }

	      var initialValue = props.value;
	      if (initialValue == null) {
	        var defaultValue = props.defaultValue;
	        // TODO (yungsters): Remove support for children content in <textarea>.
	        var textareaChildren = props.children;
	        if (textareaChildren != null) {
	          {
	            warning(false, 'Use the `defaultValue` or `value` props instead of setting ' + 'children on <textarea>.');
	          }
	          !(defaultValue == null) ? invariant(false, 'If you supply `defaultValue` on a <textarea>, do not pass children.') : void 0;
	          if (Array.isArray(textareaChildren)) {
	            !(textareaChildren.length <= 1) ? invariant(false, '<textarea> can only have at most one child.') : void 0;
	            textareaChildren = textareaChildren[0];
	          }

	          defaultValue = '' + textareaChildren;
	        }
	        if (defaultValue == null) {
	          defaultValue = '';
	        }
	        initialValue = defaultValue;
	      }

	      props = objectAssign$1({}, props, {
	        value: undefined,
	        children: '' + initialValue
	      });
	    } else if (tag === 'select') {
	      {
	        ReactControlledValuePropTypes_1.checkPropTypes('select', props, function () {
	          return '';
	        });

	        for (var i = 0; i < valuePropNames.length; i++) {
	          var propName = valuePropNames[i];
	          if (props[propName] == null) {
	            continue;
	          }
	          var isArray = Array.isArray(props[propName]);
	          if (props.multiple && !isArray) {
	            warning(false, 'The `%s` prop supplied to <select> must be an array if ' + '`multiple` is true.%s', propName, '');
	          } else if (!props.multiple && isArray) {
	            warning(false, 'The `%s` prop supplied to <select> must be a scalar ' + 'value if `multiple` is false.%s', propName, '');
	          }
	        }

	        if (props.value !== undefined && props.defaultValue !== undefined && !didWarnDefaultSelectValue) {
	          warning(false, 'Select elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled select ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components');
	          didWarnDefaultSelectValue = true;
	        }
	      }
	      this.currentSelectValue = props.value != null ? props.value : props.defaultValue;
	      props = objectAssign$1({}, props, {
	        value: undefined
	      });
	    } else if (tag === 'option') {
	      var selected = null;
	      var selectValue = this.currentSelectValue;
	      var optionChildren = flattenOptionChildren(props.children);
	      if (selectValue != null) {
	        var value;
	        if (props.value != null) {
	          value = props.value + '';
	        } else {
	          value = optionChildren;
	        }
	        selected = false;
	        if (Array.isArray(selectValue)) {
	          // multiple
	          for (var j = 0; j < selectValue.length; j++) {
	            if ('' + selectValue[j] === value) {
	              selected = true;
	              break;
	            }
	          }
	        } else {
	          selected = '' + selectValue === value;
	        }

	        props = objectAssign$1({
	          selected: undefined,
	          children: undefined
	        }, props, {
	          selected: selected,
	          children: optionChildren
	        });
	      }
	    }

	    {
	      validatePropertiesInDevelopment(tag, props);
	    }

	    assertValidProps_1(tag, props);

	    var out = createOpenTagMarkup(element.type, tag, props, namespace, this.makeStaticMarkup, this.stack.length === 1, null);
	    var footer = '';
	    if (omittedCloseTags_1.hasOwnProperty(tag)) {
	      out += '/>';
	    } else {
	      out += '>';
	      footer = '</' + element.type + '>';
	    }
	    var children;
	    var innerMarkup = getNonChildrenInnerMarkup(props);
	    if (innerMarkup != null) {
	      children = [];
	      if (newlineEatingTags[tag] && innerMarkup.charAt(0) === '\n') {
	        // text/html ignores the first character in these tags if it's a newline
	        // Prefer to break application/xml over text/html (for now) by adding
	        // a newline specifically to get eaten by the parser. (Alternately for
	        // textareas, replacing "^\n" with "\r\n" doesn't get eaten, and the first
	        // \r is normalized out by HTMLTextAreaElement#value.)
	        // See: <http://www.w3.org/TR/html-polyglot/#newlines-in-textarea-and-pre>
	        // See: <http://www.w3.org/TR/html5/syntax.html#element-restrictions>
	        // See: <http://www.w3.org/TR/html5/syntax.html#newlines>
	        // See: Parsing of "textarea" "listing" and "pre" elements
	        //  from <http://www.w3.org/TR/html5/syntax.html#parsing-main-inbody>
	        out += '\n';
	      }
	      out += innerMarkup;
	    } else {
	      children = toArray(props.children);
	    }
	    var frame = {
	      domNamespace: getChildNamespace(parentNamespace, element.type),
	      tag: tag,
	      children: children,
	      childIndex: 0,
	      context: context,
	      footer: footer
	    };
	    {
	      frame.debugElementStack = [];
	    }
	    this.stack.push(frame);
	    return out;
	  };

	  return ReactDOMServerRenderer;
	}();

	var ReactPartialRenderer = ReactDOMServerRenderer;

	/**
	 * Render a ReactElement to its initial HTML. This should only be used on the
	 * server.
	 * See https://facebook.github.io/react/docs/react-dom-server.html#rendertostring
	 */
	function renderToString(element) {
	  var renderer = new ReactPartialRenderer(element, false);
	  var markup = renderer.read(Infinity);
	  return markup;
	}

	/**
	 * Similar to renderToString, except this doesn't create extra DOM attributes
	 * such as data-react-id that React uses internally.
	 * See https://facebook.github.io/react/docs/react-dom-server.html#rendertostaticmarkup
	 */
	function renderToStaticMarkup(element) {
	  var renderer = new ReactPartialRenderer(element, true);
	  var markup = renderer.read(Infinity);
	  return markup;
	}

	var ReactDOMStringRenderer = {
	  renderToString: renderToString,
	  renderToStaticMarkup: renderToStaticMarkup
	};

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule ReactVersion
	 */

	var ReactVersion = '16.0.0';

	var MUST_USE_PROPERTY = DOMProperty_1.injection.MUST_USE_PROPERTY;
	var HAS_BOOLEAN_VALUE = DOMProperty_1.injection.HAS_BOOLEAN_VALUE;
	var HAS_NUMERIC_VALUE = DOMProperty_1.injection.HAS_NUMERIC_VALUE;
	var HAS_POSITIVE_NUMERIC_VALUE = DOMProperty_1.injection.HAS_POSITIVE_NUMERIC_VALUE;
	var HAS_OVERLOADED_BOOLEAN_VALUE = DOMProperty_1.injection.HAS_OVERLOADED_BOOLEAN_VALUE;
	var HAS_STRING_BOOLEAN_VALUE = DOMProperty_1.injection.HAS_STRING_BOOLEAN_VALUE;

	var HTMLDOMPropertyConfig = {
	  // When adding attributes to this list, be sure to also add them to
	  // the `possibleStandardNames` module to ensure casing and incorrect
	  // name warnings.
	  Properties: {
	    allowFullScreen: HAS_BOOLEAN_VALUE,
	    // IE only true/false iFrame attribute
	    // https://msdn.microsoft.com/en-us/library/ms533072(v=vs.85).aspx
	    allowTransparency: HAS_STRING_BOOLEAN_VALUE,
	    // specifies target context for links with `preload` type
	    async: HAS_BOOLEAN_VALUE,
	    // autoFocus is polyfilled/normalized by AutoFocusUtils
	    // autoFocus: HAS_BOOLEAN_VALUE,
	    autoPlay: HAS_BOOLEAN_VALUE,
	    capture: HAS_BOOLEAN_VALUE,
	    checked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    cols: HAS_POSITIVE_NUMERIC_VALUE,
	    contentEditable: HAS_STRING_BOOLEAN_VALUE,
	    controls: HAS_BOOLEAN_VALUE,
	    'default': HAS_BOOLEAN_VALUE,
	    defer: HAS_BOOLEAN_VALUE,
	    disabled: HAS_BOOLEAN_VALUE,
	    download: HAS_OVERLOADED_BOOLEAN_VALUE,
	    draggable: HAS_STRING_BOOLEAN_VALUE,
	    formNoValidate: HAS_BOOLEAN_VALUE,
	    hidden: HAS_BOOLEAN_VALUE,
	    loop: HAS_BOOLEAN_VALUE,
	    // Caution; `option.selected` is not updated if `select.multiple` is
	    // disabled with `removeAttribute`.
	    multiple: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    muted: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    noValidate: HAS_BOOLEAN_VALUE,
	    open: HAS_BOOLEAN_VALUE,
	    playsInline: HAS_BOOLEAN_VALUE,
	    readOnly: HAS_BOOLEAN_VALUE,
	    required: HAS_BOOLEAN_VALUE,
	    reversed: HAS_BOOLEAN_VALUE,
	    rows: HAS_POSITIVE_NUMERIC_VALUE,
	    rowSpan: HAS_NUMERIC_VALUE,
	    scoped: HAS_BOOLEAN_VALUE,
	    seamless: HAS_BOOLEAN_VALUE,
	    selected: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    size: HAS_POSITIVE_NUMERIC_VALUE,
	    start: HAS_NUMERIC_VALUE,
	    // support for projecting regular DOM Elements via V1 named slots ( shadow dom )
	    span: HAS_POSITIVE_NUMERIC_VALUE,
	    spellCheck: HAS_STRING_BOOLEAN_VALUE,
	    // Style must be explicitly set in the attribute list. React components
	    // expect a style object
	    style: 0,
	    // itemScope is for for Microdata support.
	    // See http://schema.org/docs/gs.html
	    itemScope: HAS_BOOLEAN_VALUE,
	    // These attributes must stay in the white-list because they have
	    // different attribute names (see DOMAttributeNames below)
	    acceptCharset: 0,
	    className: 0,
	    htmlFor: 0,
	    httpEquiv: 0,
	    // Attributes with mutation methods must be specified in the whitelist
	    // Set the string boolean flag to allow the behavior
	    value: HAS_STRING_BOOLEAN_VALUE
	  },
	  DOMAttributeNames: {
	    acceptCharset: 'accept-charset',
	    className: 'class',
	    htmlFor: 'for',
	    httpEquiv: 'http-equiv'
	  },
	  DOMMutationMethods: {
	    value: function (node, value) {
	      if (value == null) {
	        return node.removeAttribute('value');
	      }

	      // Number inputs get special treatment due to some edge cases in
	      // Chrome. Let everything else assign the value attribute as normal.
	      // https://github.com/facebook/react/issues/7253#issuecomment-236074326
	      if (node.type !== 'number' || node.hasAttribute('value') === false) {
	        node.setAttribute('value', '' + value);
	      } else if (node.validity && !node.validity.badInput && node.ownerDocument.activeElement !== node) {
	        // Don't assign an attribute if validation reports bad
	        // input. Chrome will clear the value. Additionally, don't
	        // operate on inputs that have focus, otherwise Chrome might
	        // strip off trailing decimal places and cause the user's
	        // cursor position to jump to the beginning of the input.
	        //
	        // In ReactDOMInput, we have an onBlur event that will trigger
	        // this function again when focus is lost.
	        node.setAttribute('value', '' + value);
	      }
	    }
	  }
	};

	var HTMLDOMPropertyConfig_1 = HTMLDOMPropertyConfig;

	var HAS_STRING_BOOLEAN_VALUE$1 = DOMProperty_1.injection.HAS_STRING_BOOLEAN_VALUE;


	var NS = {
	  xlink: 'http://www.w3.org/1999/xlink',
	  xml: 'http://www.w3.org/XML/1998/namespace'
	};

	/**
	 * This is a list of all SVG attributes that need special casing,
	 * namespacing, or boolean value assignment.
	 *
	 * When adding attributes to this list, be sure to also add them to
	 * the `possibleStandardNames` module to ensure casing and incorrect
	 * name warnings.
	 *
	 * SVG Attributes List:
	 * https://www.w3.org/TR/SVG/attindex.html
	 * SMIL Spec:
	 * https://www.w3.org/TR/smil
	 */
	var ATTRS = ['accent-height', 'alignment-baseline', 'arabic-form', 'baseline-shift', 'cap-height', 'clip-path', 'clip-rule', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'dominant-baseline', 'enable-background', 'fill-opacity', 'fill-rule', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'glyph-name', 'glyph-orientation-horizontal', 'glyph-orientation-vertical', 'horiz-adv-x', 'horiz-origin-x', 'image-rendering', 'letter-spacing', 'lighting-color', 'marker-end', 'marker-mid', 'marker-start', 'overline-position', 'overline-thickness', 'paint-order', 'panose-1', 'pointer-events', 'rendering-intent', 'shape-rendering', 'stop-color', 'stop-opacity', 'strikethrough-position', 'strikethrough-thickness', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke-width', 'text-anchor', 'text-decoration', 'text-rendering', 'underline-position', 'underline-thickness', 'unicode-bidi', 'unicode-range', 'units-per-em', 'v-alphabetic', 'v-hanging', 'v-ideographic', 'v-mathematical', 'vector-effect', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'word-spacing', 'writing-mode', 'x-height', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xmlns:xlink', 'xml:lang', 'xml:space'];

	var SVGDOMPropertyConfig = {
	  Properties: {
	    autoReverse: HAS_STRING_BOOLEAN_VALUE$1,
	    externalResourcesRequired: HAS_STRING_BOOLEAN_VALUE$1,
	    preserveAlpha: HAS_STRING_BOOLEAN_VALUE$1
	  },
	  DOMAttributeNames: {
	    autoReverse: 'autoReverse',
	    externalResourcesRequired: 'externalResourcesRequired',
	    preserveAlpha: 'preserveAlpha'
	  },
	  DOMAttributeNamespaces: {
	    xlinkActuate: NS.xlink,
	    xlinkArcrole: NS.xlink,
	    xlinkHref: NS.xlink,
	    xlinkRole: NS.xlink,
	    xlinkShow: NS.xlink,
	    xlinkTitle: NS.xlink,
	    xlinkType: NS.xlink,
	    xmlBase: NS.xml,
	    xmlLang: NS.xml,
	    xmlSpace: NS.xml
	  }
	};

	var CAMELIZE = /[\-\:]([a-z])/g;
	var capitalize = function (token) {
	  return token[1].toUpperCase();
	};

	ATTRS.forEach(function (original) {
	  var reactName = original.replace(CAMELIZE, capitalize);

	  SVGDOMPropertyConfig.Properties[reactName] = 0;
	  SVGDOMPropertyConfig.DOMAttributeNames[reactName] = original;
	});

	var SVGDOMPropertyConfig_1 = SVGDOMPropertyConfig;

	DOMProperty_1.injection.injectDOMPropertyConfig(HTMLDOMPropertyConfig_1);
	DOMProperty_1.injection.injectDOMPropertyConfig(SVGDOMPropertyConfig_1);

	var ReactDOMServerBrowserEntry = {
	  renderToString: ReactDOMStringRenderer.renderToString,
	  renderToStaticMarkup: ReactDOMStringRenderer.renderToStaticMarkup,
	  renderToNodeStream: function () {
	    invariant(false, 'ReactDOMServer.renderToNodeStream(): The streaming API is not available in the browser. Use ReactDOMServer.renderToString() instead.');
	  },
	  renderToStaticNodeStream: function () {
	    invariant(false, 'ReactDOMServer.renderToStaticNodeStream(): The streaming API is not available in the browser. Use ReactDOMServer.renderToStaticMarkup() instead.');
	  },

	  version: ReactVersion
	};

	module.exports = ReactDOMServerBrowserEntry;

	})();
	}


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	if (false) {
	  module.exports = require('./cjs/react-dom-server.browser.production.min.js');
	} else {
	  module.exports = __webpack_require__(37);
	}


/***/ }),
/* 39 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_39__;

/***/ })
/******/ ])
});
;