import React, { useState } from "react";

import "./index.scss";
import DatePicker from "../../components/date-picker";
import useActionSheet, { Action } from "../../components/action-sheet";

export default function Home(): JSX.Element {
	const [visable, setVisable] = useState(false);
	const [ActionSheet, showActionSheet, hideActionSheet] = useActionSheet();
	const onClick = (): void => {
		showActionSheet();
	};
	const onClose = (): void => {
		hideActionSheet();
	};
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
		console.log(value);
	};
	return (
		<div className="home-view">
			<button onClick={onClick}>点击</button>
			<button onClick={onClose}>取消</button>
			<button onClick={() => { setVisable(true); }}>选择时间</button>
			<DatePicker visable={visable} precision="hour" onClose={() => { setVisable(false); }} onConfirm={onConfirm}></DatePicker>
			<ActionSheet text="确定" onConfirm={onConfirm1} showBtn={true} actions={[{ key: "copy", text: "复制" }, { key: "edit", text: "修改" }, { key: "delete", text: "删除" }]} onAction={onAction}/>
		</div>
	);
}