import { FC } from "react";
import { Precision } from "../../utils/date-picker-utils";
interface PickerViewProps {
    onClose?: () => Promise<void>;
    onConfirm?: (value: Date) => Promise<void>;
    precision: Precision;
    value: Date;
}
declare const PickerView: FC<PickerViewProps>;
export default PickerView;
