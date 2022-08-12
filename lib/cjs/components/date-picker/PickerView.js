"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _datePickerUtils = require("../../utils/date-picker-utils");

var _Wheel = _interopRequireDefault(require("./Wheel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var __spreadArray = void 0 && (void 0).__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};

var pickerViewClassPrefix = "picker-view";

var PickerView = function (_a) {
  var onClose = _a.onClose,
      onConfirm = _a.onConfirm,
      precision = _a.precision,
      value = _a.value;

  var _b = __read((0, _react.useState)([]), 2),
      selected = _b[0],
      setSelected = _b[1];

  (0, _react.useEffect)(function () {
    if (value instanceof Date) {
      var date = precision.includes("week") ? (0, _datePickerUtils.convertWeekToNumberArray)(value) : (0, _datePickerUtils.convertDateToNumberArray)(value);
      setSelected(date);
    }
  }, [value]);
  var columns = (0, _datePickerUtils.generateDatePickerColumns)(selected, precision);
  var onSelect = (0, _react.useCallback)(function (val, colunmIndex) {
    setSelected(function (prev) {
      var next = __spreadArray([], __read(prev), false);

      next[colunmIndex] = val;
      return next;
    });
  }, []);
  var onCancel = (0, _react.useCallback)(function (e) {
    e.preventDefault();
    onClose === null || onClose === void 0 ? void 0 : onClose().catch(function (err) {
      console.log(err);
    });
  }, []);
  var onChange = (0, _react.useCallback)(function (e) {
    e.preventDefault();
    var value = precision.includes("week") ? (0, _datePickerUtils.convertNumberArrayToWeek)(selected) : (0, _datePickerUtils.convertNumberArrayToDate)(selected);
    onConfirm === null || onConfirm === void 0 ? void 0 : onConfirm(value).catch(function (err) {
      console.log(err);
    });
  }, [selected]);
  return _react.default.createElement("div", {
    className: pickerViewClassPrefix
  }, _react.default.createElement("div", {
    className: "".concat(pickerViewClassPrefix, "-header")
  }, _react.default.createElement("a", {
    href: "#",
    className: "".concat(pickerViewClassPrefix, "-header-button"),
    onClick: onCancel
  }, "\u53D6\u6D88"), _react.default.createElement("h3", {
    className: "".concat(pickerViewClassPrefix, "-header-title")
  }, "\u65F6\u95F4\u9009\u62E9"), _react.default.createElement("a", {
    href: "#",
    className: "".concat(pickerViewClassPrefix, "-header-button"),
    onClick: onChange
  }, "\u786E\u5B9A")), _react.default.createElement("div", {
    className: "".concat(pickerViewClassPrefix, "-body")
  }, columns === null || columns === void 0 ? void 0 : columns.map(function (v, i) {
    return _react.default.createElement("div", {
      className: "".concat(pickerViewClassPrefix, "-body-column"),
      key: v.type
    }, _react.default.createElement(_Wheel.default, {
      colunm: v.column,
      onSelect: onSelect,
      colunmIndex: i,
      value: selected[i],
      type: v.type
    }));
  }), _react.default.createElement("div", {
    className: "".concat(pickerViewClassPrefix, "-body-mask")
  }, _react.default.createElement("div", {
    className: "".concat(pickerViewClassPrefix, "-body-mask-top")
  }), _react.default.createElement("div", {
    className: "".concat(pickerViewClassPrefix, "-body-mask-middle")
  }), _react.default.createElement("div", {
    className: "".concat(pickerViewClassPrefix, "-body-mask-bottom")
  }))));
};

var _default = PickerView;
exports.default = _default;