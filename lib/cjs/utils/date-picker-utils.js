"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertDateToNumberArray = convertDateToNumberArray;
exports.convertNumberArrayToDate = convertNumberArrayToDate;
exports.convertNumberArrayToWeek = convertNumberArrayToWeek;
exports.convertWeekToNumberArray = convertWeekToNumberArray;
exports.defaultRenderLabel = defaultRenderLabel;
exports.generateDatePickerColumns = generateDatePickerColumns;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _isoWeek = _interopRequireDefault(require("dayjs/plugin/isoWeek"));

var _isLeapYear = _interopRequireDefault(require("dayjs/plugin/isLeapYear"));

var _isoWeeksInYear = _interopRequireDefault(require("dayjs/plugin/isoWeeksInYear"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dayjs.default.extend(_isoWeek.default);

_dayjs.default.extend(_isLeapYear.default);

_dayjs.default.extend(_isoWeeksInYear.default);

var precisionDateLengthRecord = {
  day: 2,
  hour: 3,
  minute: 4,
  month: 1,
  second: 5,
  year: 0
};
var precisionWeekLengthRecord = {
  week: 1,
  "week-day": 2,
  year: 0
};

function defaultRenderLabel(type, data) {
  switch (type) {
    case "hour":
    case "minute":
    case "second":
      return ("0" + data.toString()).slice(-2);

    default:
      return data.toString();
  }
}

var generateWeekColumns = function (selected, precision) {
  var _a;

  var year = (_a = selected[0]) !== null && _a !== void 0 ? _a : (0, _dayjs.default)().year() - 10;
  var currentYear = (0, _dayjs.default)().year();
  var rank = precisionWeekLengthRecord[precision];
  var selectedYearWeek = (0, _dayjs.default)("".concat(year, "-01-01")).isoWeeksInYear();
  var res = [];

  function generateColumns(min, max, type) {
    var column = [];

    for (var i = min; i <= max; i++) {
      column.push({
        value: i
      });
    }

    return {
      column: column,
      type: type
    };
  }

  res.push(generateColumns(currentYear - 10, currentYear + 10, "year"));

  if (rank >= precisionWeekLengthRecord.week) {
    res.push(generateColumns(1, selectedYearWeek, "week"));
  }

  if (rank >= precisionWeekLengthRecord["week-day"]) {
    res.push(generateColumns(1, 7, "week-day"));
  }

  return res;
};

var generateDateColumns = function (selected, precision) {
  var _a, _b;

  var year = (_a = selected[0]) !== null && _a !== void 0 ? _a : (0, _dayjs.default)().year() - 10;
  var currentYear = (0, _dayjs.default)().year();
  var month = (_b = selected[1]) !== null && _b !== void 0 ? _b : 1;
  var rank = precisionDateLengthRecord[precision];
  var res = [];
  var maxDay = (0, _dayjs.default)("".concat(year, "-").concat(month, "-1")).daysInMonth();

  function generateColumns(min, max, type) {
    var column = [];

    for (var i = min; i <= max; i++) {
      column.push({
        value: i
      });
    }

    return {
      column: column,
      type: type
    };
  }

  res.push(generateColumns(currentYear - 10, currentYear + 10, "year"));

  if (rank >= precisionDateLengthRecord.month) {
    res.push(generateColumns(1, 12, "month"));
  }

  if (rank >= precisionDateLengthRecord.day) {
    res.push(generateColumns(1, maxDay, "day"));
  }

  if (rank >= precisionDateLengthRecord.hour) {
    res.push(generateColumns(0, 23, "hour"));
  }

  if (rank >= precisionDateLengthRecord.minute) {
    res.push(generateColumns(0, 59, "minute"));
  }

  if (rank >= precisionDateLengthRecord.second) {
    res.push(generateColumns(0, 59, "second"));
  }

  return res;
};

function generateDatePickerColumns(selected, precision) {
  if (precision.startsWith("week")) {
    return generateWeekColumns(selected, precision);
  } else {
    return generateDateColumns(selected, precision);
  }
}

function convertNumberArrayToDate(value) {
  var _a, _b, _c, _d, _e, _f;

  var year = (_a = value[0]) !== null && _a !== void 0 ? _a : (0, _dayjs.default)().year() - 20;
  var month = (_b = value[1]) !== null && _b !== void 0 ? _b : 1;
  var date = (_c = value[2]) !== null && _c !== void 0 ? _c : 1;
  var hour = (_d = value[3]) !== null && _d !== void 0 ? _d : 0;
  var minute = (_e = value[4]) !== null && _e !== void 0 ? _e : 0;
  var second = (_f = value[5]) !== null && _f !== void 0 ? _f : 0;
  return new Date(year, month - 1, date, hour, minute, second);
}

function convertDateToNumberArray(date) {
  if (!date) return [];
  return [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
}

function convertNumberArrayToWeek(value) {
  var _a, _b, _c;

  var year = (_a = value[0]) !== null && _a !== void 0 ? _a : (0, _dayjs.default)().year() - 20;
  var week = (_b = value[1]) !== null && _b !== void 0 ? _b : 1;
  var weekday = (_c = value[2]) !== null && _c !== void 0 ? _c : 1;
  var day = (0, _dayjs.default)().year(year).isoWeek(week).isoWeekday(weekday).hour(0).minute(0).second(0);
  return day.toDate();
}

function convertWeekToNumberArray(date) {
  if (!date) return [];
  var day = (0, _dayjs.default)(date);
  return [day.isoWeekYear(), day.isoWeek(), day.isoWeekday()];
}