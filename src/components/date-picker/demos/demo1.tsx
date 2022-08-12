import useDatePicker from "../index";
import React, { FC } from "react";

const Basic: FC = () => {
	const [DatePicker, onShow] = useDatePicker();
	return (
		<>
			<button onClick={onShow}>123</button>
			<DatePicker />
		</>
	);
};

export default Basic;