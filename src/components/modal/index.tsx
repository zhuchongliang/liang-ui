import React, { cloneElement, ReactNode, useCallback, useState, FC } from "react";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";
import { AsyncTo, WaitFor } from "@yangzw/bruce-us";
import Classnames from "classnames";
import DisableScroll from "disable-scroll";

import "./index.scss";

interface ModalProps {
	children: ReactNode
	className: string
	handler: ReactNode[]
	height?: number
	onClose: (() => void) | null
	root?: HTMLElement
	showCloseBtn?: boolean
	title: string
	visible: boolean
	width?: number
}

export const Modal: FC<ModalProps> = function({ children, className, handler, height, onClose, root, showCloseBtn, title, visible, width }) {
	if (!visible) return null;
	const classes = Classnames("modal-component", className);
	height = height ?? 0;
	width = width ?? 0;
	const style = {
		height: height >= 3.2 && height <= 10 ? `${height}rem` : "auto",
		width: width >= 5.6 && width <= 7 ? `${width}rem` : "auto"
	};
	const onStop = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => e.stopPropagation();
	return createPortal(
		<div className={classes} data-title={title}>
			<div className="modal-wrapper" style={style} onClick={onStop}>
				{showCloseBtn && <i className="modal-closebtn" onClick={() => { onClose?.(); }}></i>}
				{!!title && <h3 className="modal-title">{title}</h3>}
				<div className="modal-body">{children}</div>
				{!!handler?.length && <div className="modal-handler">{handler}</div>}
			</div>
		</div>,
		root as HTMLElement
	);
};

Modal.defaultProps = {
	children: null,
	className: "",
	handler: [],
	height: 0,
	onClose: null,
	root: document.body,
	showCloseBtn: false,
	title: "模态",
	visible: false,
	width: 0
};

interface ToastProps {
	className: string
	text: string
}

const Toast: FC<ToastProps> = function({ className, text }) {
	const classes = Classnames("modal-component action-toast", className);
	return (
		<div className={classes}>
			<div className="modal-toast">{text}</div>
		</div>
	);
};
Toast.defaultProps = {
	className: "",
	text: "提示"
};

interface DefaultWrapperProps {
	showCloseBtn: boolean
	children: ReactNode
	className: string
	height: number
	width: number
	title: string
}

interface AlertWrapperProps extends DefaultWrapperProps{
	btnConfirmText: string
	onConfirm: () => void
}

type useAlertReturnType = [FC<AlertWrapperProps>, () => void, () => Promise<void>, boolean ];

function useAlert(): useAlertReturnType {
	const [visible, setVisible] = useState(false);
	const [active, setActive] = useState(false);
	const onShow = useCallback(() => {
		setActive(true);
		setVisible(true);
		DisableScroll.on();
	}, [visible]); // eslint-disable-line
	const onHide = useCallback(async() => {
		DisableScroll.off();
		setActive(false);
		await WaitFor(300);
		setVisible(false);
	}, [visible, active]); // eslint-disable-line
	const wrapper: FC<AlertWrapperProps> = useCallback(({ btnConfirmText = "确定", children, className, height, onConfirm, showCloseBtn, title = "警告", width }) => {
		const classes = Classnames(className, { hide: !active, show: active });
		const onYes = async(): Promise<void> => {
			await onHide();
			onConfirm?.();
		};
		const btnsDom = [<button key="confirm" className="modal-btn" onClick={() => { onYes().catch(err => console.log(err)); }}>{btnConfirmText}</button>];
		return (
			<Modal
				className={classes}
				visible={visible}
				width={width}
				height={height}
				title={title}
				handler={btnsDom}
				showCloseBtn={showCloseBtn}
				onClose={() => { onHide().catch(err => console.log(err)); }}
			>{children}</Modal>
		);
	}, [visible, onHide]); // eslint-disable-line
	return [wrapper, onShow, onHide, visible];
}

interface DialogWrapperProps extends DefaultWrapperProps{
	btnCancelText: string
	btnConfirmText: string
	onCancel: () => void
	onConfirm: () => void
}

type UseDialogReturnType = [FC<DialogWrapperProps>, () => void, () => Promise<void>, boolean];

function useDialog(): UseDialogReturnType {
	const [visible, setVisible] = useState(false);
	const [active, setActive] = useState(false);
	const onShow = useCallback(() => {
		setActive(true);
		setVisible(true);
		DisableScroll.on();
	}, [visible]); // eslint-disable-line
	const onHide = useCallback(async() => {
		DisableScroll.off();
		setActive(false);
		await WaitFor(300);
		setVisible(false);
	}, [visible, active]); // eslint-disable-line
	const wrapper: FC<DialogWrapperProps> = useCallback(({
		btnCancelText = "取消",
		btnConfirmText = "确定",
		children,
		className,
		height,
		showCloseBtn,
		onCancel,
		onConfirm,
		title = "对话",
		width
	}) => {
		const classes = Classnames(className, { hide: !active, show: active });
		const onYes = async(): Promise<void> => {
			await onHide();
			onConfirm?.();
		};
		const onNo = async(): Promise<void> => {
			await onHide();
			onCancel?.();
		};
		const btnsDom = [
			<button key="cancel" className="modal-btn" onClick={() => { onNo().catch(err => console.log(err)); } }>{btnCancelText}</button>,
			<button key="confirm" className="modal-btn" onClick={() => { onYes().catch(err => console.log(err)); }}>{btnConfirmText}</button>
		];
		return (
			<Modal
				className={classes}
				visible={visible}
				width={width}
				height={height}
				title={title}
				handler={btnsDom}
				showCloseBtn={showCloseBtn}
				onClose={() => { onHide().catch(err => console.log(err)); }}
			>{children}</Modal>
		);
	}, [visible, onHide]); // eslint-disable-line
	return [wrapper, onShow, onHide, visible];
}

interface ModalWrapperProps extends DefaultWrapperProps{
	handler: ReactNode[]
}

type UseModalReturnType = [FC<ModalWrapperProps>, () => void, () => Promise<void>, boolean];

function useModal(): UseModalReturnType {
	const [visible, setVisible] = useState(false);
	const [active, setActive] = useState(false);
	const onShow = useCallback(() => {
		setActive(true);
		setVisible(true);
		DisableScroll.on();
	}, [visible]); // eslint-disable-line
	const onHide = useCallback(async() => {
		DisableScroll.off();
		setActive(false);
		await WaitFor(300);
		setVisible(false);
	}, [visible, active]); // eslint-disable-line
	const wrapper: FC<ModalWrapperProps> = useCallback(({ children, className, handler, height, showCloseBtn, title = "模态", width }) => {
		const classes = Classnames(className, { hide: !active, show: active });
		return (
			<Modal
				className={classes}
				visible={visible}
				width={width}
				height={height}
				title={title}
				handler={handler}
				showCloseBtn={showCloseBtn}
				onClose={() => { onHide().catch(err => console.log(err)); }}
			>{children}</Modal>
		);
	}, [visible, onHide]); // eslint-disable-line
	return [wrapper, onShow, onHide, visible];
}

async function actionAlert({ btnConfirmText = "确定", content = "警告", onConfirm = null, title = "警告" }: Partial<{
	btnConfirmText: string
	content: React.ReactNode
	onConfirm: (() => void) | null
	title: string
}>): Promise<void> {
	const onHide = async(): Promise<void> => {
		DisableScroll.off();
		root.unmount();
		const _root = createRoot(alert);
		_root.render(cloneElement(modal, { className: "action-alert hide" }));
		await WaitFor(300);
		_root.unmount();
		alert.remove();
	};
	const onYes = async(): Promise<void> => {
		await onHide();
		onConfirm?.();
	};
	const alert = document.createElement("div");
	alert.setAttribute("id", "alert");
	const btnsDom = [<button key="confirm" className="modal-btn" onClick={() => { onYes().catch(err => console.log(err)); }}>{btnConfirmText}</button>];
	const modal = (
		<Modal
			className="action-alert show"
			root={alert}
			title={title}
			handler={btnsDom}
			visible
			onClose={() => { onHide().catch(err => console.log(err)); }}
		>{content}</Modal>
	);
	document.body.append(alert);
	const root = createRoot(alert);
	root.render(modal);
	DisableScroll.on();
}

async function actionDialog({ btnCancelText = "取消", btnConfirmText = "确定", content = "对话", onCancel = null, onConfirm = null, title = "对话" }: {
	btnCancelText?: string
	btnConfirmText?: string
	content: React.ReactElement | React.ReactNode | string
	onCancel?: (() => void) | null
	onConfirm: (() => void) | (() => Promise<void>) | null
	title?: string
}): Promise<void> {
	const onHide = async(): Promise<void> => {
		DisableScroll.off();
		root.unmount();
		const _root = createRoot(dialog);
		_root.render(cloneElement(modal, { className: "action-dialog hide" }));
		await WaitFor(300);
		_root.unmount();
		dialog.remove();
	};
	const onYes = async(): Promise<void> => {
		await onHide();
		onConfirm?.()?.catch(err => console.log(err));
	};
	const onNo = async(): Promise<void> => {
		await onHide();
		onCancel?.();
	};
	const dialog = document.createElement("div");
	dialog.setAttribute("id", "dialog");
	const btnsDom = [
		<button key="cancel" className="modal-btn" onClick={() => { onNo().catch(err => console.log(err)); }}>{btnCancelText}</button>,
		<button key="confirm" className="modal-btn" onClick={() => { onYes().catch(err => console.log(err)); }}>{btnConfirmText}</button>
	];
	const modal = (
		<Modal
			className="action-dialog show"
			root={dialog}
			title={title}
			handler={btnsDom}
			visible
			onClose={() => { onHide().catch(err => console.log(err)); }}
		>{content}</Modal>
	);
	document.body.append(dialog);
	const root = createRoot(dialog);
	root.render(modal);
	DisableScroll.on();
}

async function actionToast(text = "提示"): Promise<unknown> {
	const promise = new Promise((resolve) => {
		(async() => {
			if (document.getElementById("toast")) return;
			const toast = document.createElement("div");
			toast.setAttribute("id", "toast");
			const modal = <Toast className="show" text={text} />;
			document.body.append(toast);
			const root = createRoot(toast);
			root.render(modal);
			await WaitFor(2000);
			root.unmount();
			const _root = createRoot(toast);
			_root.render(cloneElement(modal, { className: "hide" }));
			await WaitFor(300);
			_root.unmount();
			toast.remove();
			resolve(true);
		})().catch(err => console.log(err));
	});
	const [err, res] = await AsyncTo(promise);
	return !err && res;
}

export {
	actionAlert,
	actionDialog,
	actionToast,
	useAlert,
	useDialog,
	useModal
};