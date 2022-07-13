import React from "react";

import "./index.scss";
// import DatePicker from "../../components/date-picker";
import useActionSheet, { Action } from "../../components/action-sheet";

export default function Home(): JSX.Element {
	// const [visable, setVisable] = useState(false);
	const [ActionSheet, showActionSheet, hideActionSheet] = useActionSheet();
	const onClick = (): void => {
		console.log(1);
		showActionSheet();
	};
	const onClose = (): void => {
		hideActionSheet();
	};
	const onConfirm = (): void => {
		console.log(1);
	};
	const onAction = (action: Action): void => {
		console.log(action.text);
	};
	return (
		<div className="home-view">
			<button onClick={onClick}>点击</button>
			<button onClick={onClose}>取消</button>
			{/* <DatePicker visable={visable} precision="second" onClose={onClose} value={new Date()} ></DatePicker> */}
			<ActionSheet text="确定" onConfirm={onConfirm} showBtn={true} actions={[{ key: "copy", text: "复制" }, { key: "edit", text: "修改" }]} onAction={onAction}/>
		</div>
	);
}