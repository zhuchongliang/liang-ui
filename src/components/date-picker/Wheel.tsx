import React, { FC, useEffect, useRef } from "react";
import { animated, useSpring } from "@react-spring/web";
import { useDrag, EventTypes, FullGestureState } from "@use-gesture/react";

import { Precision, columnItem, defaultRenderLabel } from "../../utils/date-picker-utils";
import { rubberbandIfOutOfBounds, bound } from "../../utils/wheel-utils";

const pickerViewClassPrefix = "picker-view";

interface WheelProps {
	type: Precision
	value: number
	colunm: columnItem[]
	colunmIndex: number
	onSelect: (selected: number, colunmIndex: number) => void
}
const Wheel: FC<WheelProps> = ({ colunm, colunmIndex, onSelect, value, type }) => {
	// const itemHeight = useRef<number>(itemHeight.current);
	const rootRef = useRef<HTMLDivElement>(null);
	const itemHeight = useRef<number>(34);
	const draggingRef = useRef(false);
	useEffect(() => {
		const fontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
		itemHeight.current = 0.68 * fontSize;
	}, []);
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
		const finalPosition = -targetIndex * itemHeight.current;
		api.start({
			immediate: y.goal !== finalPosition, y: finalPosition
		});
		// eslint-disable-next-line
	}, [value, colunm]);
	const [{ y }, api] = useSpring(() => ({
		config: {
			mass: 0.8,
			tension: 400
		},
		from: { y: 0 }
	}));
	const scrollSelect = (index: number): void => {
		const finalPosition = -index * itemHeight.current;
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
		const min = -((colunm.length - 1) * itemHeight.current);
		const max = 0;
		draggingRef.current = true;
		if (state.last) {
			draggingRef.current = false;
			const position = state.offset[1] + state.velocity[1] * 50 * state.direction[1];
			const targetIndex = -Math.round(bound(min, max, position) / itemHeight.current);
			scrollSelect(targetIndex);
		} else {
			const position = state.offset[1];
			api.start({
				y: rubberbandIfOutOfBounds(0.2, itemHeight.current * 50, max, min, position)
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

export default Wheel;