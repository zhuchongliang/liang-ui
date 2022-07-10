import React, { useState } from "react";

import "./index.scss";
import DatePicker from "../../components/date-picker";

export default function Home(): JSX.Element {
	const [visable, setVisable] = useState(false);
	const onClick = (): void => {
		setVisable(!visable);
	};
	const onClose = (): void => {
		setVisable(false);
	};
	return (
		<div className="home-view">
			<button onClick={onClick}>点击</button>
			<DatePicker visable={visable} precision="second" onClose={onClose} ></DatePicker>
		</div>
	);
}