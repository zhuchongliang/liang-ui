var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

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

import React, { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import "./index.css";
import disableScroll from "disable-scroll";
import ClassNames from "classnames";
var classPrefix = "action-sheet-component";

var ActionSheet = function (_a) {
  var visable = _a.visable,
      actions = _a.actions,
      onClose = _a.onClose,
      onConfirm = _a.onConfirm,
      showBtn = _a.showBtn,
      text = _a.text,
      onAction = _a.onAction,
      className = _a.className;
  if (!visable) return null;
  return createPortal(React.createElement("div", {
    className: ClassNames(classPrefix, className)
  }, React.createElement("div", {
    className: "".concat(classPrefix, "-body")
  }, React.createElement("div", {
    className: "".concat(classPrefix, "-button-list")
  }, actions.map(function (v) {
    return React.createElement("a", {
      className: "".concat(classPrefix, "-button-list-item"),
      key: v.key,
      onClick: function () {
        onAction(v);
      }
    }, React.createElement("div", {
      className: "".concat(classPrefix, "-button-list-item-name")
    }, v.text));
  }), showBtn && React.createElement("div", {
    className: "".concat(classPrefix, "-confirm-button")
  }, React.createElement("a", {
    className: "".concat(classPrefix, "-confirm-button-item"),
    onClick: onConfirm
  }, React.createElement("div", {
    className: "".concat(classPrefix, "-confirm-button-item-name")
  }, text))))), React.createElement("div", {
    className: "".concat(classPrefix, "-mask"),
    onClick: onClose
  })), document.body);
};

ActionSheet.defaultProps = {
  showBtn: true,
  visable: false
};

function useActionSheet() {
  var _this = this;

  var _a = __read(useState(false), 2),
      visable = _a[0],
      setVisable = _a[1];

  var _b = __read(useState(false), 2),
      active = _b[0],
      setActive = _b[1];

  var onHide = useCallback(function () {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setActive(false);
            return [4, new Promise(function (resolve) {
              setTimeout(resolve, 300);
            })];

          case 1:
            _a.sent();

            setVisable(false);
            disableScroll.off();
            return [2];
        }
      });
    });
  }, [visable, active]);
  var onShow = useCallback(function () {
    setActive(true);
    setVisable(true);
    disableScroll.on();
  }, [visable]);
  var wrapper = useCallback(function (_a) {
    var actions = _a.actions,
        showBtn = _a.showBtn,
        text = _a.text,
        onConfirm = _a.onConfirm,
        onAction = _a.onAction,
        className = _a.className;
    var classes = ClassNames({
      hide: !active,
      show: active
    }, className);

    var onYes = function () {
      return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4, onHide()];

            case 1:
              _a.sent();

              onConfirm === null || onConfirm === void 0 ? void 0 : onConfirm();
              return [2];
          }
        });
      });
    };

    return React.createElement(ActionSheet, {
      className: classes,
      text: text,
      visable: visable,
      onClose: onHide,
      onConfirm: onYes,
      showBtn: showBtn,
      actions: actions,
      onAction: onAction
    });
  }, [visable, onHide]);
  return [wrapper, onShow, onHide, visable];
}

export default useActionSheet;