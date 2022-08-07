"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _disableScroll = _interopRequireDefault(require("disable-scroll"));

var _classnames = _interopRequireDefault(require("classnames"));

require("./index.css");

var _PickerView = _interopRequireDefault(require("./PickerView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
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

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
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

var datePickerClassPrefix = "date-picker-component";
var DatePicker = (0, _react.forwardRef)(function (_a, ref) {
  var visable = _a.visable,
      precision = _a.precision,
      onClose = _a.onClose,
      onConfirm = _a.onConfirm,
      value = _a.value;
  var classes = (0, _classnames.default)(datePickerClassPrefix, "show");
  return _react.default.createElement(_react.default.Fragment, null, visable && _react.default.createElement("div", {
    className: classes,
    ref: ref
  }, _react.default.createElement("div", {
    className: "".concat(datePickerClassPrefix, "-mask"),
    onClick: onClose
  }), _react.default.createElement("div", {
    className: "".concat(datePickerClassPrefix, "-body")
  }, _react.default.createElement(_PickerView.default, {
    precision: precision,
    onClose: onClose,
    onConfirm: onConfirm,
    value: value
  }))));
});
DatePicker.displayName = "DatePicker";
DatePicker.defaultProps = {
  precision: "day",
  visable: false
};

function useDatePicker() {
  var _this = this;

  var _a = __read((0, _react.useState)(false), 2),
      visable = _a[0],
      setVisable = _a[1];

  var divEle = (0, _react.useRef)(null);
  var onShow = (0, _react.useCallback)(function () {
    _disableScroll.default.on();

    setVisable(true);
  }, [visable]);
  var onHide = (0, _react.useCallback)(function () {
    return __awaiter(_this, void 0, void 0, function () {
      var _a;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            (_a = divEle.current) === null || _a === void 0 ? void 0 : _a.classList.replace("show", "hide");
            return [4, new Promise(function (resolve) {
              setTimeout(resolve, 300);
            })];

          case 1:
            _b.sent();

            setVisable(false);
            return [2];
        }
      });
    });
  }, [visable]);
  var wrapper = (0, _react.useCallback)(function (_a) {
    var precision = _a.precision,
        onConfirm = _a.onConfirm,
        value = _a.value;

    var onYes = function (value) {
      return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4, onHide()];

            case 1:
              _a.sent();

              onConfirm === null || onConfirm === void 0 ? void 0 : onConfirm(value);
              return [2];
          }
        });
      });
    };

    return _react.default.createElement(DatePicker, {
      value: value,
      visable: visable,
      precision: precision,
      onClose: onHide,
      onConfirm: onYes,
      ref: divEle
    });
  }, [onHide, visable]);
  return [wrapper, onShow, onHide, visable];
}

var _default = useDatePicker;
exports.default = _default;