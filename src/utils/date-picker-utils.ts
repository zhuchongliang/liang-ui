import dayjs from "dayjs";

export interface columnItem {
	value: number
}

interface wheel{
	type: string
	column: columnItem[]
}
type columns = wheel[];

export default function generateDatePickerColumns(selected: number[], precision: string): columns {
	function generateColumns(min: number, max: number, type: string): wheel {
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
	const year = dayjs().year();
	const maxDay = dayjs(`${selected[0]}-${selected[1]}-${selected[2]}`).daysInMonth();
	res.push(generateColumns(year - 10, year + 10, "year"));
	res.push(generateColumns(1, 12, "month"));
	res.push(generateColumns(1, maxDay, "day"));
	return res;
}