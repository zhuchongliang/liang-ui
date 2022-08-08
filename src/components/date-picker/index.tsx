import React, { FC, useCallback, useState, useRef, forwardRef } from "react";
import disableScroll from "disable-scroll";
import Classnames from "classnames";

import "./index.scss";
import { Precision } from "../../utils/date-picker-utils";
import PickerView from "./PickerView";

interface DatePickerProps {
	value: Date
	visable: boolean
	precision: Precision
	onConfirm: (value: Date) => Promise<void>
	onClose?: () => Promise<void>
	ref: React.ForwardedRef<HTMLDivElement>
}

const datePickerClassPrefix = "date-picker-component";

const DatePicker: FC<DatePickerProps> = forwardRef<HTMLDivElement, DatePickerProps>(
	function({
		visable,
		precision,
		onClose,
		onConfirm,
		value
	}, ref
	) {
		const classes = Classnames(datePickerClassPrefix, "show");
		return (
			<>
				{
					visable
					&& <div className={classes} ref={ref}>
						<div className={`${datePickerClassPrefix}-mask`} onClick={onClose}></div>
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
	});
DatePicker.displayName = "DatePicker";

interface WrapperProps {
	precision?: Precision
	onConfirm?: (value: Date) => void
	value?: Date
}

function useDatePicker(): [FC<WrapperProps>, () => void, () => Promise<void>, boolean] {
	const [visable, setVisable] = useState(false);
	const divEle = useRef<HTMLDivElement>(null);
	const onShow = useCallback(() => {
		disableScroll.on();
		setVisable(true);
		// eslint-disable-next-line
	}, [visable]);
	const onHide = useCallback(async() => {
		divEle.current?.classList.replace("show", "hide");
		await new Promise((resolve) => {
			setTimeout(resolve, 300);
		});
		setVisable(false);
		// eslint-disable-next-line
	}, [visable]);
	const wrapper: FC<WrapperProps> = useCallback(({ precision = "day", onConfirm, value = new Date() } = {}) => {
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
			ref={divEle}
		/>;
		// eslint-disable-next-line
	}, [onHide, visable]);
	return [wrapper, onShow, onHide, visable];
}

export default useDatePicker;