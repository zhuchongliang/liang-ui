import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import disableScroll from "disable-scroll";
import { useDrag, EventTypes, FullGestureState } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";
import Classnames from "classnames";

import "./index.scss";
import { generateDatePickerColumns, columnItem, defaultRenderLabel, DatePrecision, convertNumberArrayToDate } from "../../utils/date-picker-utils";
import { rubberbandIfOutOfBounds, bound } from "../../utils/wheel-utils";

const pickerViewClassPrefix = "picker-view";

interface WheelProps {
	type: DatePrecision
	value: number
	colunm: columnItem[]
	colunmIndex: number
	onSelect: (selected: number, colunmIndex: number) => void
}
const Wheel: FC<WheelProps> = ({ colunm, colunmIndex, onSelect, value, type }) => {
	const draggingRef = useRef(false);
	useEffect(() => {
		if (!colunm.some(item => item.value === value)) {
			onSelect(colunm[0].value, colunmIndex);
		}
		// eslint-disable-next-line
	}, [colunm, value]);
	useEffect(() => {
		if (draggingRef.current) return;
		const targetIndex = colunm.findIndex(item => item.value === value);
		if (targetIndex < 0) return;
		const finalPosition = -targetIndex * 34;
		api.start({
			immediate: y.goal !== finalPosition, y: finalPosition
		});
		// eslint-disable-next-line
	}, [value, colunm]);
	const rootRef = useRef<HTMLDivElement>(null);
	const [{ y }, api] = useSpring(() => ({
		config: {
			mass: 0.8,
			tension: 400
		},
		from: { y: 0 }
	}));
	const scrollSelect = (index: number): void => {
		const finalPosition = -index * 34;
		api.start({
			y: finalPosition
		});
		const val = colunm[index];
		onSelect(val.value, colunmIndex);
	};
	const handleDrag = (
		state:
		(Omit<FullGestureState<"drag">, "event"> & {
			event: EventTypes["drag"]
		})
	): void => {
		const min = -((colunm.length - 1) * 34);
		const max = 0;
		draggingRef.current = true;
		if (state.last) {
			draggingRef.current = false;
			const position = state.offset[1] + state.velocity[1] * 50 * state.direction[1];
			const targetIndex = -Math.round(bound(min, max, position) / 34);
			scrollSelect(targetIndex);
		} else {
			const position = state.offset[1];
			api.start({
				y: rubberbandIfOutOfBounds(0.2, 34 * 50, max, min, position)
			});
		}
	};
	useDrag(handleDrag, {
		axis: "y",
		filterTaps: true,
		from: () => [0, y.get()],
		pointer: { touch: true },
		target: rootRef
	});
	return (
		<animated.div ref={rootRef} style={{ y }} className={`${pickerViewClassPrefix}-body-column-wheel`}>
			{colunm.map(v => <div key={v.value} className={`${pickerViewClassPrefix}-body-column-item`}>{defaultRenderLabel(type, v.value)}</div>)}
		</animated.div>
	);
};

interface PickerViewProps {
	onClose?: () => void
	onConfirm?: (value: Date) => void
	title?: string
	precision: DatePrecision
}
const PickerView: FC<PickerViewProps> = function({ onClose, onConfirm, title, precision }) {
	const [selected, setSelected] = useState<number[]>([]);
	const columns = generateDatePickerColumns(selected, precision);
	const onSelect = useCallback((val: number, colunmIndex: number): void => {
		setSelected((prev) => {
			const next = [...prev];
			next[colunmIndex] = val;
			return next;
		});
	}, []);
	const onCancel = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.preventDefault();
		disableScroll.off();
		onClose?.();
		// eslint-disable-next-line
	}, []);
	const onChange = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.preventDefault();
		const value = convertNumberArrayToDate(selected);
		onConfirm?.(value);
		disableScroll.off();
		onClose?.();
		// eslint-disable-next-line
	}, [selected]);
	return (
		<div className={pickerViewClassPrefix}>
			<div className={`${pickerViewClassPrefix}-header`}>
				<a href="#" className={`${pickerViewClassPrefix}-header-button`} onClick={onCancel}>取消</a>
				<h3 className={`${pickerViewClassPrefix}-header-title`}>{title}</h3>
				<a href="#" className={`${pickerViewClassPrefix}-header-button`} onClick={onChange}>确定</a>
			</div>
			<div className={`${pickerViewClassPrefix}-body`}>
				{
					columns?.map((v, i) => {
						return (
							<div className={`${pickerViewClassPrefix}-body-column`} key={v.type}>
								<Wheel colunm={v.column} onSelect={onSelect} colunmIndex={i} value={selected[i]} type={v.type}></Wheel>
							</div>
						);
					})
				}
				<div className={`${pickerViewClassPrefix}-body-mask`}>
					<div className={`${pickerViewClassPrefix}-body-mask-top`}></div>
					<div className={`${pickerViewClassPrefix}-body-mask-middle`}></div>
					<div className={`${pickerViewClassPrefix}-body-mask-bottom`}></div>
				</div>
			</div>
		</div>
	);
};
PickerView.defaultProps = {
	title: "时间选择"
};

export interface DatePickerProps {
	visable?: boolean
	precision: DatePrecision
	onClose?: () => void
	onConfirm?: (value: Date) => void
	onShow?: () => void
	title?: string
}

const datePickerClassPrefix = "date-picker-component";

const DatePicker: FC<DatePickerProps> = function({ visable, precision, onClose, onConfirm, onShow, title }) {
	const [isShow, setIsShow] = useState(visable);
	const [active, setActive] = useState(visable);
	const classes = Classnames(datePickerClassPrefix, { hide: !active, show: active });
	useEffect(() => {
		if (!visable) {
			setActive(false);
			const timer = setTimeout(() => {
				setIsShow(false);
			}, 300);
			return () => { clearTimeout(timer); };
		} else {
			setActive(true);
			setIsShow(true);
			disableScroll.on();
			onShow?.();
		}
		// eslint-disable-next-line
	}, [visable]);
	const handleClick = useCallback(() => {
		disableScroll.off();
		onClose?.();
		// eslint-disable-next-line
	}, []);
	return (
		<>
			{
				isShow
					&& <div className={classes} >
						<div className={`${datePickerClassPrefix}-mask`} onClick={handleClick}></div>
						<div className={`${datePickerClassPrefix}-body`}>
							<PickerView precision={precision} onClose={onClose} onConfirm={onConfirm}></PickerView>
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

export default DatePicker;