import { FC } from "react";
import { Precision, columnItem } from "../../utils/date-picker-utils";
interface WheelProps {
    type: Precision;
    value: number;
    colunm: columnItem[];
    colunmIndex: number;
    onSelect: (selected: number, colunmIndex: number) => void;
}
declare const Wheel: FC<WheelProps>;
export default Wheel;
