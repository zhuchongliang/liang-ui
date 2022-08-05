import React, { FC, useEffect } from "react";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import dayjs from "dayjs";

import useDatePicker from "..";
import { Precision } from "../../../utils/date-picker-utils";

interface AppProps {
	onConfirm?: (val: Date) => void
	value?: Date
	precision?: Precision
}
const App: FC<AppProps> = function({ onConfirm, value, precision }) {
	const [DatePicker, onShow] = useDatePicker();
	useEffect(() => {
		onShow();
		// eslint-disable-next-line
	}, []);
	return <DatePicker
		precision={precision}
		onConfirm={onConfirm}
		value={value}
	/>;
};
const now = new Date();

describe("DatePicker", () => {
	test("renders basic", async() => {
		const fn = jest.fn();

		const { getByText } = render(
			<App
				value={new Date(1659683582503)}
				onConfirm={ val => {
					fn(val.toDateString());
				}}
			/>
		);
		await userEvent.click(getByText("确定"));
		await waitForElementToBeRemoved(document.querySelector(".date-picker-component"));

		expect(fn).toBeCalled();

		expect(fn.mock.calls[0][0]).toContain("Fri Aug 05 2022");
	});

	test("shoudle pick now without value", async() => {
		const fn = jest.fn();

		const dateString = now.toDateString();
		const { getByText } = render(
			<App
				onConfirm={ val => {
					fn(val.toDateString());
				}}
			/>
		);
		await userEvent.click(getByText("确定"));
		await waitForElementToBeRemoved(document.querySelector(".date-picker-component"));

		expect(fn.mock.calls[0][0]).toBe(dateString);
	});

	test("precision minute", async() => {
		const fn = jest.fn();

		const { getByText } = render(
			<App
				value={now}
				precision="minute"
				onConfirm={ val => {
					fn(val);
				}}
			/>
		);

		expect(document.querySelectorAll(".picker-view-body-column").length).toBe(5);

		await userEvent.click(getByText("确定"));
		await waitForElementToBeRemoved(document.querySelector(".date-picker-component"));

		const confirmedDay = dayjs(fn.mock.calls[0][0]);
		const formatTemplate = "YYYY-MM-DD HH:mm";
		expect(confirmedDay.format(formatTemplate)).toBe(
			dayjs(now).format(formatTemplate)
		);
	});

	test("precision week", async() => {
		const fn = jest.fn();

		const { getByText } = render(
			<App
				precision="week-day"
				onConfirm={ val => {
					fn(val.toDateString());
				}}
			/>
		);

		expect(document.querySelectorAll(".picker-view-body-column").length).toBe(3);

		await userEvent.click(getByText("确定"));
		await waitForElementToBeRemoved(document.querySelector(".date-picker-component"));

		expect(fn.mock.calls[0][0]).toBe(now.toDateString());
	});
});