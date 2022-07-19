import React, { FC, useState, useCallback, useEffect } from "react";

import {
	generateDatePickerColumns,
	convertNumberArrayToDate,
	convertDateToNumberArray,
	convertNumberArrayToWeek,
	convertWeekToNumberArray,
	Precision
} from "../../utils/date-picker-utils";
import Wheel from "./Wheel";

const pickerViewClassPrefix = "picker-view";

interface PickerViewProps {
	onClose?: () => Promise<void>
	onConfirm?: (value: Date) => Promise<void>
	precision: Precision
	value: Date
}
const PickerView: FC<PickerViewProps> = function({ onClose, onConfirm, precision, value }) {
	const [selected, setSelected] = useState<number[]>([]);
	useEffect(() => {
		if (value instanceof Date) {
			const date: number[] = precision.includes("week")
				? convertWeekToNumberArray(value)
				: convertDateToNumberArray(value);
			setSelected(date);
		}
		// eslint-disable-next-line
	}, [value]);
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
		onClose?.().catch((err) => { console.log(err); });
		// eslint-disable-next-line
	}, []);
	const onChange = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.preventDefault();
		const value = precision.includes("week")
			? convertNumberArrayToWeek(selected)
			: convertNumberArrayToDate(selected);
		onConfirm?.(value).catch((err) => { console.log(err); });
		// eslint-disable-next-line
	}, [selected]);
	return (
		<div className={pickerViewClassPrefix}>
			<div className={`${pickerViewClassPrefix}-header`}>
				<a href="#" className={`${pickerViewClassPrefix}-header-button`} onClick={onCancel}>取消</a>
				<h3 className={`${pickerViewClassPrefix}-header-title`}>时间选择</h3>
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

export default PickerView;