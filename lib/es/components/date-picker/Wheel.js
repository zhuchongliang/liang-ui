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

import React, { useEffect, useRef } from "react";
import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { defaultRenderLabel } from "../../utils/date-picker-utils";
import { rubberbandIfOutOfBounds, bound } from "../../utils/wheel-utils";
var pickerViewClassPrefix = "picker-view";

var Wheel = function (_a) {
  var colunm = _a.colunm,
      colunmIndex = _a.colunmIndex,
      onSelect = _a.onSelect,
      value = _a.value,
      type = _a.type;
  var rootRef = useRef(null);
  var itemHeight = useRef(34);
  var draggingRef = useRef(false);
  useEffect(function () {
    var fontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
    itemHeight.current = 0.68 * fontSize;
  }, []);
  useEffect(function () {
    if (!colunm.some(function (item) {
      return item.value === value;
    })) {
      onSelect(colunm[0].value, colunmIndex);
    }
  }, [colunm, value]);
  useEffect(function () {
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

  var _b = __read(useSpring(function () {
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
      var targetIndex = -Math.round(bound(min, max, position) / itemHeight.current);
      scrollSelect(targetIndex);
    } else {
      var position = state.offset[1];
      api.start({
        y: rubberbandIfOutOfBounds(0.2, itemHeight.current * 50, max, min, position)
      });
    }
  };

  useDrag(handleDrag, {
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
  return React.createElement(animated.div, {
    ref: rootRef,
    style: {
      y: y
    },
    className: "".concat(pickerViewClassPrefix, "-body-column-wheel")
  }, colunm.map(function (v) {
    return React.createElement("div", {
      key: v.value,
      className: "".concat(pickerViewClassPrefix, "-body-column-item")
    }, defaultRenderLabel(type, v.value));
  }));
};

export default Wheel;