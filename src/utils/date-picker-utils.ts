import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import isLeapYear from "dayjs/plugin/isLeapYear";
import isoWeeksInYear from "dayjs/plugin/isoWeeksInYear";

dayjs.extend(isoWeek);
dayjs.extend(isLeapYear);
dayjs.extend(isoWeeksInYear);

export interface columnItem {
	value: number
}
interface wheel{
	type: Precision
	column: columnItem[]
}
type columns = wheel[];

type WeeKPrecision =
| "year"
| "week"
| "week-day";
type DatePrecision =
| "year"
| "month"
| "day"
| "hour"
| "minute"
| "second";
export type Precision = DatePrecision | WeeKPrecision;

const precisionDateLengthRecord: Record<DatePrecision, number> = {
	day: 2,
	hour: 3,
	minute: 4,
	month: 1,
	second: 5,
	year: 0
};

const precisionWeekLengthRecord: Record<WeeKPrecision, number> = {
	week: 1,
	"week-day": 2,
	year: 0
};

export function defaultRenderLabel(type: Precision, data: number): string {
	/* eslint-disable */
  switch (type) {
	  case "hour":
	  case "minute":
	  case "second":
		  return ("0" + data.toString()).slice(-2);
	  default:
		  return data.toString();
	}
}

const generateWeekColumns = (selected: number[], precision: WeeKPrecision) => {
	const year = selected[0] ?? dayjs().year() - 10;
	const currentYear = dayjs().year();
	const rank = precisionWeekLengthRecord[precision];
	const selectedYearWeek = dayjs(`${year}-01-01`).isoWeeksInYear();
	const res = [];	
	function generateColumns(min: number, max: number, type: WeeKPrecision): wheel {
		const column: columnItem[] = [];
		for (let i = min; i <= max; i++) {
			column.push({
				value: i
			});
		}
		return {
			column,
			type
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
}

const generateDateColumns = (selected: number[], precision: DatePrecision) => {
	const year = selected[0] ?? dayjs().year() - 10;
	const currentYear = dayjs().year();
	const month = selected[1] ?? 1;
	const rank = precisionDateLengthRecord[precision];
	const res = [];
	const maxDay = dayjs(`${year}-${month}-1`).daysInMonth();
	function generateColumns(min: number, max: number, type: DatePrecision): wheel {
		const column: columnItem[] = [];
		for (let i = min; i <= max; i++) {
			column.push({
				value: i
			});
		}
		return {
			column,
			type
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
}

export function generateDatePickerColumns(selected: number[], precision: Precision): columns {
	if (precision.startsWith("week")) {
		return generateWeekColumns(selected, precision as WeeKPrecision);
	} else {
		return generateDateColumns(selected, precision as DatePrecision);
	}
}

export function convertNumberArrayToDate(value: number[]): Date {
	const year = value[0] ?? dayjs().year() - 20 ;
	const month = value[1] ?? 1
	const date = value[2] ?? 1
	const hour = value[3] ?? 0
	const minute = value[4] ?? 0
	const second = value[5] ?? 0
	return new Date(
	  year,
	  month - 1,
	  date,
	  hour,
	  minute,
	  second
	)
}

export function convertDateToNumberArray(date: Date): number[] {
	if (!date) return []
  return [
    date.getFullYear(),
    (date.getMonth() + 1),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ]
}

export function convertNumberArrayToWeek(value: number[]): Date {
	const year = value[0] ?? dayjs().year() - 20
  	const week = value[1] ?? 1
 	const weekday = value[2] ?? 1
  	const day = dayjs()
		.year(year)
		.isoWeek(week)
		.isoWeekday(weekday)
		.hour(0)
		.minute(0)
		.second(0)
  	return day.toDate()
}

export function convertWeekToNumberArray(date: Date): number[] {
	if (!date) return []
	const day = dayjs(date);
	return [
		day.isoWeekYear(),
		day.isoWeek(),
		day.isoWeekday(),
	]
}