import React, { FC, useCallback, useLayoutEffect, useState } from "react";
import disableScroll from "disable-scroll";
import dayjs from "dayjs";
import { useDrag, EventTypes, FullGestureState } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";

import "./index.scss";
import generateDatePicerColumns, { columnItem } from "../../utils/date-picker-utils";

const pickerViewClassPrefix = "picker-view";

interface WheelProps {
	colunm: columnItem[]
}
const Wheel: FC<WheelProps> = ({ colunm }) => {
	const handleDrag = (
		state:
		(Omit<FullGestureState<"drag">, "event"> & {
			event: EventTypes["drag"]
		})
	): void => {
		if (state.last) {
			const position = state.offset[1];
			const currentIndex = Math.round(position / 34);
		} else {

		}
	};
	const [{ y }, api] = useSpring(() => ({ y: 0 }));
	const bind = useDrag(({ down, movement: [mx, my], stopPropagation }) => {
		stopPropagation();
		api.start({ immediate: down, y: down ? my : 0 });
	});
	return (
		<animated.div {...bind()} style={{ y }} className={`${pickerViewClassPrefix}-body-column-wheel`}>
			{colunm.map(v => <div key={v.value} className={`${pickerViewClassPrefix}-body-column-item`}>{String(v.value)}</div>)}
		</animated.div>
	);
};

interface PickerViewProps {
	onClose?: () => void
	onConfirm?: () => void
	title?: string
}
const PickerView: FC<PickerViewProps> = function({ onClose, onConfirm, title }) {
	const day = dayjs().date();
	const month = dayjs().month();
	const year = dayjs().year();
	const [selected] = useState([year, month, day]);
	const columns = generateDatePicerColumns(selected, "day");
	const onCancel = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.preventDefault();
		disableScroll.off();
		onClose?.();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const onChange = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.preventDefault();
		onConfirm?.();
		disableScroll.off();
		onClose?.();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className={pickerViewClassPrefix}>
			<div className={`${pickerViewClassPrefix}-header`}>
				<a href="#" className={`${pickerViewClassPrefix}-header-button`} onClick={onCancel}>取消</a>
				<h3 className={`${pickerViewClassPrefix}-header-title`}>{title}</h3>
				<a href="#" className={`${pickerViewClassPrefix}-header-button`} onClick={onChange}>确定</a>
			</div>
			<div className={`${pickerViewClassPrefix}-body`}>
				{
					columns?.map(v => {
						return (
							<div className={`${pickerViewClassPrefix}-body-column`} key={v.type}>
								<Wheel colunm={v.column}></Wheel>
							</div>
						);
					})
				}
			</div>
		</div>
	);
};
PickerView.defaultProps = {
	title: "时间选择"
};

export interface DatePickerProps {
	visable?: boolean
	precision?: string
	onClose?: () => void
	onConfirm?: () => void
	onShow?: () => void
	title?: string
}

const datePickerClassPrefix = "date-picker-component";

const DatePicker: FC<DatePickerProps> = function({ visable, precision, onClose, onConfirm, onShow, title }) {
	useLayoutEffect(() => {
		if (!visable) {
			disableScroll.on();
			onShow?.();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [visable]);
	return (
		<div className={datePickerClassPrefix} style={{ display: visable ? "block" : "none" }}>
			<div className={`${datePickerClassPrefix}-mask`}></div>
			<div className={`${datePickerClassPrefix}-body`}>
				<PickerView></PickerView>
			</div>
		</div>
	);
};
DatePicker.defaultProps = {
	precision: "day",
	visable: false
};

export default DatePicker;