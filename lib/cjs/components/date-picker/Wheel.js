"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _web = require("@react-spring/web");

var _react2 = require("@use-gesture/react");

var _datePickerUtils = require("../../utils/date-picker-utils");

var _wheelUtils = require("../../utils/wheel-utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __read = void 0 && (void 0).__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

var pickerViewClassPrefix = "picker-view";

var Wheel = function (_a) {
  var colunm = _a.colunm,
      colunmIndex = _a.colunmIndex,
      onSelect = _a.onSelect,
      value = _a.value,
      type = _a.type;
  var rootRef = (0, _react.useRef)(null);
  var itemHeight = (0, _react.useRef)(34);
  var draggingRef = (0, _react.useRef)(false);
  (0, _react.useEffect)(function () {
    var fontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
    itemHeight.current = 0.68 * fontSize;
  }, []);
  (0, _react.useEffect)(function () {
    if (!colunm.some(function (item) {
      return item.value === value;
    })) {
      onSelect(colunm[0].value, colunmIndex);
    }
  }, [colunm, value]);
  (0, _react.useEffect)(function () {
    if (draggingRef.current) return;
    var targetIndex = colunm.findIndex(function (item) {
      return item.value === value;
    });
    if (targetIndex < 0) return;
    var finalPosition = -targetIndex * itemHeight.current;
    api.start({
      immediate: y.goal !== finalPosition,
      y: finalPosition
    });
  }, [value, colunm]);

  var _b = __read((0, _web.useSpring)(function () {
    return {
      config: {
        mass: 0.8,
        tension: 400
      },
      from: {
        y: 0
      }
    };
  }), 2),
      y = _b[0].y,
      api = _b[1];

  var scrollSelect = function (index) {
    var finalPosition = -index * itemHeight.current;
    api.start({
      y: finalPosition
    });
    var val = colunm[index];
    onSelect(val.value, colunmIndex);
  };

  var handleDrag = function (state) {
    var min = -((colunm.length - 1) * itemHeight.current);
    var max = 0;
    draggingRef.current = true;

    if (state.last) {
      draggingRef.current = false;
      var position = state.offset[1] + state.velocity[1] * 50 * state.direction[1];
      var targetIndex = -Math.round((0, _wheelUtils.bound)(min, max, position) / itemHeight.current);
      scrollSelect(targetIndex);
    } else {
      var position = state.offset[1];
      api.start({
        y: (0, _wheelUtils.rubberbandIfOutOfBounds)(0.2, itemHeight.current * 50, max, min, position)
      });
    }
  };

  (0, _react2.useDrag)(handleDrag, {
    axis: "y",
    filterTaps: true,
    from: function () {
      return [0, y.get()];
    },
    pointer: {
      touch: true
    },
    target: rootRef
  });
  return _react.default.createElement(_web.animated.div, {
    ref: rootRef,
    style: {
      y: y
    },
    className: "".concat(pickerViewClassPrefix, "-body-column-wheel")
  }, colunm.map(function (v) {
    return _react.default.createElement("div", {
      key: v.value,
      className: "".concat(pickerViewClassPrefix, "-body-column-item")
    }, (0, _datePickerUtils.defaultRenderLabel)(type, v.value));
  }));
};

var _default = Wheel;
exports.default = _default;