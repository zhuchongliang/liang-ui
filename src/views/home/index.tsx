import React, { useState } from "react";
import dayjs from "dayjs";

import "./index.scss";
import useDatePicker from "../../components/date-picker";
import useActionSheet, { Action } from "../../components/action-sheet";

export default function Home(): JSX.Element {
	const [setVisable] = useState(false);
	const [ActionSheet, hideActionSheet] = useActionSheet();
	const [DatePicker, showDatePicker, hideDatePicker] = useDatePicker();
	const [date, setDate] = useState<Date>(new Date());

	const onConfirm1 = (): void => {
		console.log(1);
	};
	const onAction = (action: Action): void => {
		if (action.key === "edit") {
			console.log("文本编辑了");
			hideActionSheet();
		}
	};
	const onConfirm = (value: Date): void => {
		setDate(value);
	};
	const filter = (date: Date | null): string => {
		return `${dayjs(date).year()}年${dayjs(date).month() + 1}月${dayjs(date).date()}日${dayjs(date).hour()}时${dayjs(date).minute()}分`;
	};
	return (
		<div className="home-view">
			<button onClick={() => { showDatePicker(); }}>点击</button>
			<button onClick={() => { hideDatePicker().catch((err) => { console.log(err); }); }}>取消</button>
			<button onClick={() => { setVisable(true); }}>选择时间</button>
			<DatePicker precision="week-day" onConfirm={onConfirm} value={date}></DatePicker>
			<ActionSheet text="确定" onConfirm={onConfirm1} showBtn={true} actions={[{ key: "copy", text: "复制" }, { key: "edit", text: "修改" }, { key: "delete", text: "删除" }]} onAction={onAction}/>
			<h1>{date && filter(date)}</h1>
		</div>
	);
}