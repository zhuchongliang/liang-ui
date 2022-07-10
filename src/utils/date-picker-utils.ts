import dayjs from "dayjs";

export interface columnItem {
	value: number
}
interface wheel{
	type: DatePrecision
	column: columnItem[]
}
type columns = wheel[];

export type DatePrecision =
| "year"
| "month"
| "day"
| "hour"
| "minute"
| "second";

const precisionRankRecord: Record<DatePrecision, number> = {
	day: 2,
	hour: 3,
	minute: 4,
	month: 1,
	second: 5,
	year: 0
};
export function defaultRenderLabel(type: DatePrecision, data: number): string {
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

export function generateDatePickerColumns(selected: number[], precision: DatePrecision): columns {
	const year = dayjs().year() - 10;
	const month = selected[1] ? selected[1] : 1;
	const rank = precisionRankRecord[precision];
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
	const res = [];
	const maxDay = dayjs(`${year}-${month}-1`).daysInMonth();
	res.push(generateColumns(year - 10, year + 10, "year"));
	if (rank >= precisionRankRecord.month) {
		res.push(generateColumns(1, 12, "month"));
	}
	if (rank >= precisionRankRecord.day) {
		res.push(generateColumns(1, maxDay, "day"));
	}
	if (rank >= precisionRankRecord.hour) {
		res.push(generateColumns(0, 23, "hour"));
	}
	if (rank >= precisionRankRecord.minute) {
		res.push(generateColumns(0, 59, "minute"));
	}
	if (rank >= precisionRankRecord.second) {
		res.push(generateColumns(0, 59, "second"));
	}

	return res;
}