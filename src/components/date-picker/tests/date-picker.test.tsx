import useDatePicker from "..";
import React, { useState, FC, useEffect } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";

afterEach(cleanup);

describe("DatePicker", () => {
	const App: FC = function() {
		const [DatePicker, onShow] = useDatePicker();
		const [precision] = useState<"day">("day");
		const [value] = useState<Date>(new Date());
		useEffect(() => {
			onShow();
			// eslint-disable-next-line
		}, []);
		return <DatePicker value={value} precision={precision}/>;
	};
	// test("render DatePicker component", () => {
	// 	const { asFragment } = render(<App />);
	// 	expect(asFragment()).toMatchSnapshot();
	// });
	test("cancel button click", async() => {
		const user = userEvent.setup();
		render(<App />);

		expect(screen.getByText("取消")).toBeInTheDocument();

		await user.click(screen.getByText("取消"));

		expect(screen.getByText("取消")).not.toBeInTheDocument();
	});
});