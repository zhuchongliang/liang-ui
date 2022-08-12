import { FC } from "react";
import "./index.scss";
import { Precision } from "../../utils/date-picker-utils";
interface WrapperProps {
    precision?: Precision;
    onConfirm?: (value: Date) => void;
    value?: Date;
}
declare function useDatePicker(): [FC<WrapperProps>, () => void, () => Promise<void>, boolean];
export default useDatePicker;
