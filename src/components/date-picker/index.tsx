import React, { FC, useCallback, useState } from "react";
import disableScroll from "disable-scroll";
import Classnames from "classnames";

import "./index.scss";
import { Precision } from "../../utils/date-picker-utils";
import PickerView from "./PickerView";

interface DatePickerProps {
	value: Date
	visable: boolean
	precision: Precision
	onConfirm?: (value: Date) => Promise<void>
	onClose: () => Promise<void>
	className: string
}

const datePickerClassPrefix = "date-picker-component";

const DatePicker: FC<DatePickerProps> = function({ visable, precision, onClose, onConfirm, className, value }) {
	const classes = Classnames(datePickerClassPrefix, className);
	return (
		<>
			{
				visable
					&& <div className={classes} >
						<div className={`${datePickerClassPrefix}-mask`} ></div>
						<div className={`${datePickerClassPrefix}-body`}>
							<PickerView
								precision={precision}
								onClose={onClose}
								onConfirm={onConfirm}
								value={value}
							/>
						</div>
					</div>
			}
		</>
	);
};
DatePicker.defaultProps = {
	precision: "day",
	visable: false
};

interface WrapperProps {
	precision: Precision
	onConfirm?: (value: Date) => void
	value: Date
}

function useDatePicker(): [FC<WrapperProps>, () => void, () => Promise<void>, boolean] {
	const [visable, setVisable] = useState(false);
	const [active, setActive] = useState(false);
	const onShow = useCallback(() => {
		setActive(true);
		disableScroll.on();
		setVisable(true);
	}, []);
	const onHide = useCallback(async() => {
		setActive(false);
		await new Promise((resolve) => {
			setTimeout(resolve, 300);
		});
		setVisable(false);
	}, []);
	const wrapper: FC<WrapperProps> = useCallback(({ precision, onConfirm, value }) => {
		const classes = Classnames({ hide: !active, show: active });
		console.log(1);
		const onYes = async(value: Date): Promise<void> => {
			await onHide();
			onConfirm?.(value);
		};
		return <DatePicker
			value={value}
			visable={visable}
			precision={precision}
			onClose={onHide}
			onConfirm={onYes}
			className={classes}
		/>;
		// eslint-disable-next-line
	}, [active, visable]);
	return [wrapper, onShow, onHide, visable];
}

export default useDatePicker;