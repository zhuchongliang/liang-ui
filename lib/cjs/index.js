"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "actionAlert", {
  enumerable: true,
  get: function () {
    return _modal.actionAlert;
  }
});
Object.defineProperty(exports, "actionDialog", {
  enumerable: true,
  get: function () {
    return _modal.actionDialog;
  }
});
Object.defineProperty(exports, "actionToast", {
  enumerable: true,
  get: function () {
    return _modal.actionToast;
  }
});
Object.defineProperty(exports, "useActionSheet", {
  enumerable: true,
  get: function () {
    return _actionSheet.default;
  }
});
Object.defineProperty(exports, "useAlert", {
  enumerable: true,
  get: function () {
    return _modal.useAlert;
  }
});
Object.defineProperty(exports, "useDatePicker", {
  enumerable: true,
  get: function () {
    return _datePicker.default;
  }
});
Object.defineProperty(exports, "useDialog", {
  enumerable: true,
  get: function () {
    return _modal.useDialog;
  }
});
Object.defineProperty(exports, "useModal", {
  enumerable: true,
  get: function () {
    return _modal.useModal;
  }
});

require("./assets/css/reset.css");

require("./index.css");

var _datePicker = _interopRequireDefault(require("./components/date-picker"));

var _actionSheet = _interopRequireDefault(require("./components/action-sheet"));

var _modal = require("./components/modal");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }