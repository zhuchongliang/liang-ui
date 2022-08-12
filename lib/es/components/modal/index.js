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

import React, { cloneElement, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";
import { AsyncTo, WaitFor } from "@yangzw/bruce-us";
import Classnames from "classnames";
import DisableScroll from "disable-scroll";
import "./index.css";
export var Modal = function (_a) {
  var children = _a.children,
      className = _a.className,
      handler = _a.handler,
      height = _a.height,
      onClose = _a.onClose,
      root = _a.root,
      showCloseBtn = _a.showCloseBtn,
      title = _a.title,
      visible = _a.visible,
      width = _a.width;
  if (!visible) return null;
  var classes = Classnames("modal-component", className);
  height = height !== null && height !== void 0 ? height : 0;
  width = width !== null && width !== void 0 ? width : 0;
  var style = {
    height: height >= 3.2 && height <= 10 ? "".concat(height, "rem") : "auto",
    width: width >= 5.6 && width <= 7 ? "".concat(width, "rem") : "auto"
  };

  var onStop = function (e) {
    return e.stopPropagation();
  };

  return createPortal(React.createElement("div", {
    className: classes,
    "data-title": title
  }, React.createElement("div", {
    className: "modal-wrapper",
    style: style,
    onClick: onStop
  }, showCloseBtn && React.createElement("i", {
    className: "modal-closebtn",
    onClick: function () {
      onClose === null || onClose === void 0 ? void 0 : onClose();
    }
  }), !!title && React.createElement("h3", {
    className: "modal-title"
  }, title), React.createElement("div", {
    className: "modal-body"
  }, children), !!(handler === null || handler === void 0 ? void 0 : handler.length) && React.createElement("div", {
    className: "modal-handler"
  }, handler))), root);
};
Modal.defaultProps = {
  children: null,
  className: "",
  handler: [],
  height: 0,
  onClose: null,
  root: document.body,
  showCloseBtn: false,
  title: "模态",
  visible: false,
  width: 0
};

var Toast = function (_a) {
  var className = _a.className,
      text = _a.text;
  var classes = Classnames("modal-component action-toast", className);
  return React.createElement("div", {
    className: classes
  }, React.createElement("div", {
    className: "modal-toast"
  }, text));
};

Toast.defaultProps = {
  className: "",
  text: "提示"
};

function useAlert() {
  var _this = this;

  var _a = __read(useState(false), 2),
      visible = _a[0],
      setVisible = _a[1];

  var _b = __read(useState(false), 2),
      active = _b[0],
      setActive = _b[1];

  var onShow = useCallback(function () {
    setActive(true);
    setVisible(true);
    DisableScroll.on();
  }, [visible]);
  var onHide = useCallback(function () {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            DisableScroll.off();
            setActive(false);
            return [4, WaitFor(300)];

          case 1:
            _a.sent();

            setVisible(false);
            return [2];
        }
      });
    });
  }, [visible, active]);
  var wrapper = useCallback(function (_a) {
    var _b = _a.btnConfirmText,
        btnConfirmText = _b === void 0 ? "确定" : _b,
        children = _a.children,
        className = _a.className,
        height = _a.height,
        onConfirm = _a.onConfirm,
        showCloseBtn = _a.showCloseBtn,
        _c = _a.title,
        title = _c === void 0 ? "警告" : _c,
        width = _a.width;
    var classes = Classnames(className, {
      hide: !active,
      show: active
    });

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

    var btnsDom = [React.createElement("button", {
      key: "confirm",
      className: "modal-btn",
      onClick: function () {
        onYes().catch(function (err) {
          return console.log(err);
        });
      }
    }, btnConfirmText)];
    return React.createElement(Modal, {
      className: classes,
      visible: visible,
      width: width,
      height: height,
      title: title,
      handler: btnsDom,
      showCloseBtn: showCloseBtn,
      onClose: function () {
        onHide().catch(function (err) {
          return console.log(err);
        });
      }
    }, children);
  }, [visible, onHide]);
  return [wrapper, onShow, onHide, visible];
}

function useDialog() {
  var _this = this;

  var _a = __read(useState(false), 2),
      visible = _a[0],
      setVisible = _a[1];

  var _b = __read(useState(false), 2),
      active = _b[0],
      setActive = _b[1];

  var onShow = useCallback(function () {
    setActive(true);
    setVisible(true);
    DisableScroll.on();
  }, [visible]);
  var onHide = useCallback(function () {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            DisableScroll.off();
            setActive(false);
            return [4, WaitFor(300)];

          case 1:
            _a.sent();

            setVisible(false);
            return [2];
        }
      });
    });
  }, [visible, active]);
  var wrapper = useCallback(function (_a) {
    var _b = _a.btnCancelText,
        btnCancelText = _b === void 0 ? "取消" : _b,
        _c = _a.btnConfirmText,
        btnConfirmText = _c === void 0 ? "确定" : _c,
        children = _a.children,
        className = _a.className,
        height = _a.height,
        showCloseBtn = _a.showCloseBtn,
        onCancel = _a.onCancel,
        onConfirm = _a.onConfirm,
        _d = _a.title,
        title = _d === void 0 ? "对话" : _d,
        width = _a.width;
    var classes = Classnames(className, {
      hide: !active,
      show: active
    });

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

    var onNo = function () {
      return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4, onHide()];

            case 1:
              _a.sent();

              onCancel === null || onCancel === void 0 ? void 0 : onCancel();
              return [2];
          }
        });
      });
    };

    var btnsDom = [React.createElement("button", {
      key: "cancel",
      className: "modal-btn",
      onClick: function () {
        onNo().catch(function (err) {
          return console.log(err);
        });
      }
    }, btnCancelText), React.createElement("button", {
      key: "confirm",
      className: "modal-btn",
      onClick: function () {
        onYes().catch(function (err) {
          return console.log(err);
        });
      }
    }, btnConfirmText)];
    return React.createElement(Modal, {
      className: classes,
      visible: visible,
      width: width,
      height: height,
      title: title,
      handler: btnsDom,
      showCloseBtn: showCloseBtn,
      onClose: function () {
        onHide().catch(function (err) {
          return console.log(err);
        });
      }
    }, children);
  }, [visible, onHide]);
  return [wrapper, onShow, onHide, visible];
}

function useModal() {
  var _this = this;

  var _a = __read(useState(false), 2),
      visible = _a[0],
      setVisible = _a[1];

  var _b = __read(useState(false), 2),
      active = _b[0],
      setActive = _b[1];

  var onShow = useCallback(function () {
    setActive(true);
    setVisible(true);
    DisableScroll.on();
  }, [visible]);
  var onHide = useCallback(function () {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            DisableScroll.off();
            setActive(false);
            return [4, WaitFor(300)];

          case 1:
            _a.sent();

            setVisible(false);
            return [2];
        }
      });
    });
  }, [visible, active]);
  var wrapper = useCallback(function (_a) {
    var children = _a.children,
        className = _a.className,
        handler = _a.handler,
        height = _a.height,
        showCloseBtn = _a.showCloseBtn,
        _b = _a.title,
        title = _b === void 0 ? "模态" : _b,
        width = _a.width;
    var classes = Classnames(className, {
      hide: !active,
      show: active
    });
    return React.createElement(Modal, {
      className: classes,
      visible: visible,
      width: width,
      height: height,
      title: title,
      handler: handler,
      showCloseBtn: showCloseBtn,
      onClose: function () {
        onHide().catch(function (err) {
          return console.log(err);
        });
      }
    }, children);
  }, [visible, onHide]);
  return [wrapper, onShow, onHide, visible];
}

function actionAlert(_a) {
  var _b = _a.btnConfirmText,
      btnConfirmText = _b === void 0 ? "确定" : _b,
      _c = _a.content,
      content = _c === void 0 ? "警告" : _c,
      _d = _a.onConfirm,
      onConfirm = _d === void 0 ? null : _d,
      _e = _a.title,
      title = _e === void 0 ? "警告" : _e;
  return __awaiter(this, void 0, void 0, function () {
    var onHide, onYes, alert, btnsDom, modal, root;

    var _this = this;

    return __generator(this, function (_f) {
      onHide = function () {
        return __awaiter(_this, void 0, void 0, function () {
          var _root;

          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                DisableScroll.off();
                root.unmount();
                _root = createRoot(alert);

                _root.render(cloneElement(modal, {
                  className: "action-alert hide"
                }));

                return [4, WaitFor(300)];

              case 1:
                _a.sent();

                _root.unmount();

                alert.remove();
                return [2];
            }
          });
        });
      };

      onYes = function () {
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

      alert = document.createElement("div");
      alert.setAttribute("id", "alert");
      btnsDom = [React.createElement("button", {
        key: "confirm",
        className: "modal-btn",
        onClick: function () {
          onYes().catch(function (err) {
            return console.log(err);
          });
        }
      }, btnConfirmText)];
      modal = React.createElement(Modal, {
        className: "action-alert show",
        root: alert,
        title: title,
        handler: btnsDom,
        visible: true,
        onClose: function () {
          onHide().catch(function (err) {
            return console.log(err);
          });
        }
      }, content);
      document.body.append(alert);
      root = createRoot(alert);
      root.render(modal);
      DisableScroll.on();
      return [2];
    });
  });
}

function actionDialog(_a) {
  var _b = _a.btnCancelText,
      btnCancelText = _b === void 0 ? "取消" : _b,
      _c = _a.btnConfirmText,
      btnConfirmText = _c === void 0 ? "确定" : _c,
      _d = _a.content,
      content = _d === void 0 ? "对话" : _d,
      _e = _a.onCancel,
      onCancel = _e === void 0 ? null : _e,
      _f = _a.onConfirm,
      onConfirm = _f === void 0 ? null : _f,
      _g = _a.title,
      title = _g === void 0 ? "对话" : _g;
  return __awaiter(this, void 0, void 0, function () {
    var onHide, onYes, onNo, dialog, btnsDom, modal, root;

    var _this = this;

    return __generator(this, function (_h) {
      onHide = function () {
        return __awaiter(_this, void 0, void 0, function () {
          var _root;

          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                DisableScroll.off();
                root.unmount();
                _root = createRoot(dialog);

                _root.render(cloneElement(modal, {
                  className: "action-dialog hide"
                }));

                return [4, WaitFor(300)];

              case 1:
                _a.sent();

                _root.unmount();

                dialog.remove();
                return [2];
            }
          });
        });
      };

      onYes = function () {
        return __awaiter(_this, void 0, void 0, function () {
          var _a;

          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                return [4, onHide()];

              case 1:
                _b.sent();

                (_a = onConfirm === null || onConfirm === void 0 ? void 0 : onConfirm()) === null || _a === void 0 ? void 0 : _a.catch(function (err) {
                  return console.log(err);
                });
                return [2];
            }
          });
        });
      };

      onNo = function () {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [4, onHide()];

              case 1:
                _a.sent();

                onCancel === null || onCancel === void 0 ? void 0 : onCancel();
                return [2];
            }
          });
        });
      };

      dialog = document.createElement("div");
      dialog.setAttribute("id", "dialog");
      btnsDom = [React.createElement("button", {
        key: "cancel",
        className: "modal-btn",
        onClick: function () {
          onNo().catch(function (err) {
            return console.log(err);
          });
        }
      }, btnCancelText), React.createElement("button", {
        key: "confirm",
        className: "modal-btn",
        onClick: function () {
          onYes().catch(function (err) {
            return console.log(err);
          });
        }
      }, btnConfirmText)];
      modal = React.createElement(Modal, {
        className: "action-dialog show",
        root: dialog,
        title: title,
        handler: btnsDom,
        visible: true,
        onClose: function () {
          onHide().catch(function (err) {
            return console.log(err);
          });
        }
      }, content);
      document.body.append(dialog);
      root = createRoot(dialog);
      root.render(modal);
      DisableScroll.on();
      return [2];
    });
  });
}

function actionToast(text) {
  if (text === void 0) {
    text = "提示";
  }

  return __awaiter(this, void 0, void 0, function () {
    var promise, _a, err, res;

    var _this = this;

    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          promise = new Promise(function (resolve) {
            (function () {
              return __awaiter(_this, void 0, void 0, function () {
                var toast, modal, root, _root;

                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      if (document.getElementById("toast")) return [2];
                      toast = document.createElement("div");
                      toast.setAttribute("id", "toast");
                      modal = React.createElement(Toast, {
                        className: "show",
                        text: text
                      });
                      document.body.append(toast);
                      root = createRoot(toast);
                      root.render(modal);
                      return [4, WaitFor(2000)];

                    case 1:
                      _a.sent();

                      root.unmount();
                      _root = createRoot(toast);

                      _root.render(cloneElement(modal, {
                        className: "hide"
                      }));

                      return [4, WaitFor(300)];

                    case 2:
                      _a.sent();

                      _root.unmount();

                      toast.remove();
                      resolve(true);
                      return [2];
                  }
                });
              });
            })().catch(function (err) {
              return console.log(err);
            });
          });
          return [4, AsyncTo(promise)];

        case 1:
          _a = __read.apply(void 0, [_b.sent(), 2]), err = _a[0], res = _a[1];
          return [2, !err && res];
      }
    });
  });
}

export { actionAlert, actionDialog, actionToast, useAlert, useDialog, useModal };