import React, { ReactNode, FC } from "react";
import "./index.scss";
interface ModalProps {
    children: ReactNode;
    className: string;
    handler: ReactNode[];
    height?: number;
    onClose: (() => void) | null;
    root?: HTMLElement;
    showCloseBtn?: boolean;
    title: string;
    visible: boolean;
    width?: number;
}
export declare const Modal: FC<ModalProps>;
interface DefaultWrapperProps {
    showCloseBtn: boolean;
    children: ReactNode;
    className: string;
    height: number;
    width: number;
    title: string;
}
interface AlertWrapperProps extends DefaultWrapperProps {
    btnConfirmText: string;
    onConfirm: () => void;
}
declare type useAlertReturnType = [FC<AlertWrapperProps>, () => void, () => Promise<void>, boolean];
declare function useAlert(): useAlertReturnType;
interface DialogWrapperProps extends DefaultWrapperProps {
    btnCancelText: string;
    btnConfirmText: string;
    onCancel: () => void;
    onConfirm: () => void;
}
declare type UseDialogReturnType = [FC<DialogWrapperProps>, () => void, () => Promise<void>, boolean];
declare function useDialog(): UseDialogReturnType;
interface ModalWrapperProps extends DefaultWrapperProps {
    handler: ReactNode[];
}
declare type UseModalReturnType = [FC<ModalWrapperProps>, () => void, () => Promise<void>, boolean];
declare function useModal(): UseModalReturnType;
declare function actionAlert({ btnConfirmText, content, onConfirm, title }: Partial<{
    btnConfirmText: string;
    content: React.ReactNode;
    onConfirm: (() => void) | null;
    title: string;
}>): Promise<void>;
declare function actionDialog({ btnCancelText, btnConfirmText, content, onCancel, onConfirm, title }: {
    btnCancelText?: string;
    btnConfirmText?: string;
    content: React.ReactElement | React.ReactNode | string;
    onCancel?: (() => void) | null;
    onConfirm: (() => void) | (() => Promise<void>) | null;
    title?: string;
}): Promise<void>;
declare function actionToast(text?: string): Promise<unknown>;
export { actionAlert, actionDialog, actionToast, useAlert, useDialog, useModal };
