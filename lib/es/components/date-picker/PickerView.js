var __read = this && this.__read || function (o, n) {
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

var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};

import React, { useState, useCallback, useEffect } from "react";
import { generateDatePickerColumns, convertNumberArrayToDate, convertDateToNumberArray, convertNumberArrayToWeek, convertWeekToNumberArray } from "../../utils/date-picker-utils";
import Wheel from "./Wheel";
var pickerViewClassPrefix = "picker-view";

var PickerView = function (_a) {
  var onClose = _a.onClose,
      onConfirm = _a.onConfirm,
      precision = _a.precision,
      value = _a.value;

  var _b = __read(useState([]), 2),
      selected = _b[0],
      setSelected = _b[1];

  useEffect(function () {
    if (value instanceof Date) {
      var date = precision.includes("week") ? convertWeekToNumberArray(value) : convertDateToNumberArray(value);
      setSelected(date);
    }
  }, [value]);
  var columns = generateDatePickerColumns(selected, precision);
  var onSelect = useCallback(function (val, colunmIndex) {
    setSelected(function (prev) {
      var next = __spreadArray([], __read(prev), false);

      next[colunmIndex] = val;
      return next;
    });
  }, []);
  var onCancel = useCallback(function (e) {
    e.preventDefault();
    onClose === null || onClose === void 0 ? void 0 : onClose().catch(function (err) {
      console.log(err);
    });
  }, []);
  var onChange = useCallback(function (e) {
    e.preventDefault();
    var value = precision.includes("week") ? convertNumberArrayToWeek(selected) : convertNumberArrayToDate(selected);
    onConfirm === null || onConfirm === void 0 ? void 0 : onConfirm(value).catch(function (err) {
      console.log(err);
    });
  }, [selected]);
  return React.createElement("div", {
    className: pickerViewClassPrefix
  }, React.createElement("div", {
    className: "".concat(pickerViewClassPrefix, "-header")
  }, React.createElement("a", {
    href: "#",
    className: "".concat(pickerViewClassPrefix, "-header-button"),
    onClick: onCancel
  }, "\u53D6\u6D88"), React.createElement("h3", {
    className: "".concat(pickerViewClassPrefix, "-header-title")
  }, "\u65F6\u95F4\u9009\u62E9"), React.createElement("a", {
    href: "#",
    className: "".concat(pickerViewClassPrefix, "-header-button"),
    onClick: onChange
  }, "\u786E\u5B9A")), React.createElement("div", {
    className: "".concat(pickerViewClassPrefix, "-body")
  }, columns === null || columns === void 0 ? void 0 : columns.map(function (v, i) {
    return React.createElement("div", {
      className: "".concat(pickerViewClassPrefix, "-body-column"),
      key: v.type
    }, React.createElement(Wheel, {
      colunm: v.column,
      onSelect: onSelect,
      colunmIndex: i,
      value: selected[i],
      type: v.type
    }));
  }), React.createElement("div", {
    className: "".concat(pickerViewClassPrefix, "-body-mask")
  }, React.createElement("div", {
    className: "".concat(pickerViewClassPrefix, "-body-mask-top")
  }), React.createElement("div", {
    className: "".concat(pickerViewClassPrefix, "-body-mask-middle")
  }), React.createElement("div", {
    className: "".concat(pickerViewClassPrefix, "-body-mask-bottom")
  }))));
};

export default PickerView;