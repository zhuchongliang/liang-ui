import { FC, ReactNode } from "react";
import "./index.scss";
export interface Action {
    key: string | number;
    text: ReactNode;
}
interface wrapperProps {
    onConfirm: () => void;
    showBtn: boolean;
    actions: Action[];
    text: string;
    className: string;
    onAction: (action: Action) => void;
}
declare function useActionSheet(): [FC<wrapperProps>, () => void, () => void, boolean];
export default useActionSheet;
