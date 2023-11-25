'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var ReactDOM = require('react-dom');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  };
  return __assign.apply(this, arguments);
};

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var lodash_throttle = throttle;

var selectionCheck = function (elementPosition, framePosition, tolerance) {
    var aLeftOfB = elementPosition.right - tolerance < framePosition.left;
    var aRightOfB = elementPosition.left + tolerance > framePosition.right;
    var aAboveB = elementPosition.top + tolerance > framePosition.bottom;
    var aBelowB = elementPosition.bottom - tolerance < framePosition.top;
    return !(aLeftOfB || aRightOfB || aAboveB || aBelowB);
};

var handleSelection = lodash_throttle(function (elements, currPositions, options) {
    var position = {
        top: currPositions.y,
        bottom: currPositions.y + currPositions.height,
        left: currPositions.x,
        right: currPositions.x + currPositions.width,
    };
    for (var i = 0; i < elements.length; i++) {
        var item = elements[i];
        if (!options.isOpenRef.current) {
            if (!options.saveSelectAfterFinish) {
                item.classList.remove(options.selectedItemClassName);
            }
            continue;
        }
        var itemPosition = item.getBoundingClientRect();
        var alreadySelected = item.classList.contains(options.selectedItemClassName);
        var elementPosition = {
            top: itemPosition.top + window.scrollY,
            bottom: itemPosition.bottom + window.scrollY,
            left: itemPosition.left,
            right: itemPosition.right,
        };
        var isSelected = selectionCheck(elementPosition, position, options.tolerance);
        if (isSelected && !alreadySelected)
            item.classList.add(options.selectedItemClassName);
        if (!isSelected && alreadySelected)
            item.classList.remove(options.selectedItemClassName);
    }
}, 100);

var mouseMoveCheckToStart = function (position, pageX, pageY, sensitivity) {
    return position.startX > pageX + sensitivity
        || position.startX + sensitivity < pageX
        || position.startY > pageY + sensitivity
        || position.startY + sensitivity < pageY;
};

// Adjust the window scroll based on the user's mouse position. Returns True
// or False depending on whether or not the window scroll was changed.
var adjustWindowScroll = function (data) {
    // Get the current scroll position of the document.
    var currentScrollX = window.pageXOffset;
    var currentScrollY = window.pageYOffset;
    // Determine if the window can be scrolled in any particular direction.
    var canScrollUp = (currentScrollY > 0);
    var canScrollDown = (currentScrollY < data.maxScrollY);
    var canScrollLeft = (currentScrollX > 0);
    var canScrollRight = (currentScrollX < data.maxScrollX);
    // Since we can potentially scroll in two directions at the same time,
    // let's keep track of the next scroll, starting with the current scroll.
    var nextScrollX = currentScrollX;
    var nextScrollY = currentScrollY;
    // As we examine the mouse position within the edge, we want to make the
    // incremental scroll changes more "intense" the closer that the user
    // gets the viewport edge. As such, we'll calculate the percentage that
    // the user has made it "through the edge" when calculating the delta.
    // Then, that use that percentage to back-off from the "max" step value.
    var maxStep = 30;
    // Should we scroll left or right?
    if (data.isInLeftEdge && canScrollLeft) {
        var intensity = ((data.edgeLeft - data.viewportX) / data.edgeSize);
        nextScrollX = (nextScrollX - (maxStep * intensity));
    }
    else if (data.isInRightEdge && canScrollRight) {
        var intensity = ((data.viewportX - data.edgeRight) / data.edgeSize);
        nextScrollX = (nextScrollX + (maxStep * intensity));
    }
    // Should we scroll up or down?
    if (data.isInTopEdge && canScrollUp) {
        var intensity = ((data.edgeTop - data.viewportY) / data.edgeSize);
        nextScrollY = (nextScrollY - (maxStep * intensity));
    }
    else if (data.isInBottomEdge && canScrollDown) {
        var intensity = ((data.viewportY - data.edgeBottom) / data.edgeSize);
        nextScrollY = (nextScrollY + (maxStep * intensity));
    }
    // Sanitize invalid maximums. An invalid scroll offset won't break the
    // subsequent .scrollTo() call; however, it will make it harder to
    // determine if the .scrollTo() method should have been called in the
    // first place.
    nextScrollX = Math.max(0, Math.min(data.maxScrollX, nextScrollX));
    nextScrollY = Math.max(0, Math.min(data.maxScrollY, nextScrollY));
    if (nextScrollX !== currentScrollX || nextScrollY !== currentScrollY) {
        window.scrollTo(nextScrollX, nextScrollY);
        return true;
    }
    else {
        return false;
    }
};

// As we examine the mousemove event, we want to adjust the window scroll in
// immediate response to the event; but, we also want to continue adjusting
// the window scroll if the user rests their mouse in the edge boundary. To
// do this, we'll invoke the adjustment logic immediately. Then, we'll setup
// a timer that continues to invoke the adjustment logic while the window can
// still be scrolled in a particular direction.
// --
// NOTE: There are probably better ways to handle the ongoing animation
// check.
var _timer$1 = null;
var checkForWindowScroll = function (coordinatesAndDimensions) {
    (function _check() {
        clearTimeout(_timer$1);
        if (adjustWindowScroll(coordinatesAndDimensions)) {
            _timer$1 = setTimeout(_check, 50);
        }
    })();
};
var clearTimer = function () { return clearTimeout(_timer$1); };

var _timer = null;
var initScroll = function (e, edgeSize) {
    // Read More: https://javascript.info/size-and-scroll-window
    // --
    // The viewport and document dimensions can all be CACHED and then
    // recalculated on window-resize events (for the most part).
    // Get the viewport-relative coordinates of the mousemove event.
    var viewportX = e.clientX;
    var viewportY = e.clientY;
    // Get the viewport dimensions.
    var viewportWidth = document.documentElement.clientWidth;
    var viewportHeight = document.documentElement.clientHeight;
    // to determine if the mouse is within the "edge" of the viewport,
    // which may require scrolling the window. To do this, we need to
    // calculate the boundaries of the edge in the viewport
    var edgeTop = edgeSize;
    var edgeLeft = edgeSize;
    var edgeBottom = (viewportHeight - edgeSize);
    var edgeRight = (viewportWidth - edgeSize);
    var isInLeftEdge = (viewportX < edgeLeft);
    var isInRightEdge = (viewportX > edgeRight);
    var isInTopEdge = (viewportY < edgeTop);
    var isInBottomEdge = (viewportY > edgeBottom);
    // If the mouse is not in the viewport edge, there's no need to calculate
    // anything else.
    if (!(isInLeftEdge || isInRightEdge || isInTopEdge || isInBottomEdge)) {
        clearTimeout(_timer);
        return;
    }
    // If we made it this far, the user's mouse is located within the edge of the
    // viewport. As such, we need to check to see if scrolling needs to be done.
    // Get the document dimensions.
    // --
    // NOTE: The various property reads here are for cross-browser compatibility
    // as outlined in the JavaScript.info site (link provided above).
    var documentWidth = Math.max(document.body.scrollWidth, document.body.offsetWidth, document.body.clientWidth, document.documentElement.scrollWidth, document.documentElement.offsetWidth, document.documentElement.clientWidth);
    var documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.body.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight, document.documentElement.clientHeight);
    // Calculate the maximum scroll offset in each direction. Since you can only
    // scroll the overflow portion of the document, the maximum represents the
    // length of the document that is NOT in the viewport.
    var maxScrollX = (documentWidth - viewportWidth);
    var maxScrollY = (documentHeight - viewportHeight);
    checkForWindowScroll({
        maxScrollY: maxScrollY,
        maxScrollX: maxScrollX,
        isInLeftEdge: isInLeftEdge,
        isInRightEdge: isInRightEdge,
        isInTopEdge: isInTopEdge,
        isInBottomEdge: isInBottomEdge,
        edgeLeft: edgeLeft,
        edgeRight: edgeRight,
        edgeTop: edgeTop,
        edgeBottom: edgeBottom,
        viewportX: viewportX,
        viewportY: viewportY,
        edgeSize: edgeSize,
    });
};

var elements;
var defaultPositionState = {
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
};
var ReactMouseSelect = function (_a) {
    var containerRef = _a.containerRef, _b = _a.sensitivity, sensitivity = _b === void 0 ? 10 : _b, _c = _a.tolerance, tolerance = _c === void 0 ? 0 : _c, _d = _a.portalContainer, portalContainer = _d === void 0 ? document.body : _d, _e = _a.edgeSize, edgeSize = _e === void 0 ? 100 : _e, _f = _a.onClickPreventDefault, onClickPreventDefault = _f === void 0 ? false : _f, _g = _a.notStartWithSelectableElements, notStartWithSelectableElements = _g === void 0 ? false : _g, _h = _a.saveSelectAfterFinish, saveSelectAfterFinish = _h === void 0 ? false : _h, _j = _a.itemClassName, itemClassName = _j === void 0 ? 'mouse-select__selectable' : _j, _k = _a.selectedItemClassName, selectedItemClassName = _k === void 0 ? 'selected' : _k, _l = _a.frameClassName, frameClassName = _l === void 0 ? 'mouse-select__frame' : _l, _m = _a.openFrameClassName, openFrameClassName = _m === void 0 ? 'open' : _m, startSelectionCallback = _a.startSelectionCallback, finishSelectionCallback = _a.finishSelectionCallback;
    var _o = react.useState(false), isOpen = _o[0], setIsOpen = _o[1];
    var _p = react.useState(defaultPositionState), positions = _p[0], setPositions = _p[1];
    var borderRef = react.useRef(null);
    var myPositionRef = react.useRef(positions);
    var isOpenRef = react.useRef(isOpen);
    var handleClick = function (e) { return e.stopPropagation(); };
    var handleMoueMove = function (e) {
        var pageX = e.pageX, pageY = e.pageY;
        var newState = {};
        if (!isOpenRef.current && mouseMoveCheckToStart(myPositionRef.current, pageX, pageY, sensitivity)) {
            if (onClickPreventDefault) {
                window.addEventListener('click', handleClick, { capture: true, once: true });
            }
            if (startSelectionCallback)
                startSelectionCallback(e);
            setIsOpen(true);
        }
        if (pageX >= myPositionRef.current.startX) {
            newState.width = pageX - myPositionRef.current.startX;
        }
        else if (pageX < myPositionRef.current.startX) {
            newState.width = myPositionRef.current.startX - pageX;
            newState.x = pageX;
        }
        if (pageY >= myPositionRef.current.startY) {
            newState.height = pageY - myPositionRef.current.startY;
        }
        else if (pageY < myPositionRef.current.startY) {
            newState.height = myPositionRef.current.startY - pageY;
            newState.y = pageY;
        }
        handleSelection(elements, __assign(__assign({}, myPositionRef.current), newState), { tolerance: tolerance, selectedItemClassName: selectedItemClassName, isOpenRef: isOpenRef, saveSelectAfterFinish: saveSelectAfterFinish });
        setPositions(function (state) { return (__assign(__assign({}, state), newState)); });
        // scroll when approaching the edge
        if (edgeSize > 0)
            initScroll(e, edgeSize);
    };
    var handleMouseUp = function (e) {
        setPositions(defaultPositionState);
        if (containerRef && (containerRef === null || containerRef === void 0 ? void 0 : containerRef.current))
            containerRef.current.removeEventListener('mousemove', handleMoueMove);
        else
            document.removeEventListener('mousemove', handleMoueMove);
        window.removeEventListener('mouseup', handleMouseUp);
        if (borderRef.current)
            borderRef.current.removeEventListener('mousemove', handleMoueMove);
        var selectedElement = [];
        for (var i = 0; i < elements.length; i++) {
            var item = elements[i];
            if (item.classList.contains(selectedItemClassName)) {
                selectedElement.push(item);
                if (!saveSelectAfterFinish)
                    item.classList.remove(selectedItemClassName);
            }
        }
        if (finishSelectionCallback)
            finishSelectionCallback(selectedElement, e);
        setIsOpen(false);
        clearTimer();
    };
    var handleMouseDown = function (e) {
        //  check that only the left mouse button is pressed
        if (e.button !== 0)
            return null;
        var startSelection = true;
        if (notStartWithSelectableElements) {
            // @ts-ignore
            var elementInitiator = e.composedPath().find(function (element) { var _a; return (_a = element === null || element === void 0 ? void 0 : element.classList) === null || _a === void 0 ? void 0 : _a.contains(itemClassName); });
            if (elementInitiator)
                startSelection = false;
        }
        if (startSelection) {
            elements = document.getElementsByClassName(itemClassName);
            setPositions(function (state) { return (__assign(__assign({}, state), { startX: e.pageX, startY: e.pageY, x: e.pageX, y: e.pageY })); });
            if (containerRef && containerRef.current)
                containerRef.current.addEventListener('mousemove', handleMoueMove);
            else
                document.addEventListener('mousemove', handleMoueMove);
            if (borderRef.current)
                borderRef.current.addEventListener('mousemove', handleMoueMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
    };
    react.useEffect(function () {
        var element = containerRef === null || containerRef === void 0 ? void 0 : containerRef.current;
        if (element)
            element.addEventListener('mousedown', handleMouseDown);
    }, []);
    react.useEffect(function () {
        myPositionRef.current = positions;
        isOpenRef.current = isOpen;
    }, [positions, isOpen]);
    var renderEl = function () {
        return (jsxRuntime.jsx("div", { className: "".concat(frameClassName, " ").concat(isOpen ? " ".concat(openFrameClassName) : ''), style: {
                position: 'absolute',
                display: "".concat(isOpen ? 'block' : 'none'),
                top: "".concat(positions.y, "px"),
                left: "".concat(positions.x, "px"),
                width: "".concat(positions.width, "px"),
                height: "".concat(positions.height, "px"),
            }, ref: borderRef }));
    };
    return ReactDOM__default["default"].createPortal(renderEl(), portalContainer);
};

exports.ReactMouseSelect = ReactMouseSelect;
