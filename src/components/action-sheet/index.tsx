import React, { FC, ReactNode, useState } from "react";
import { createPortal } from "react-dom";

import "./index.scss";
import disableScroll from "disable-scroll";
import ClassNames from "classnames";

export interface Action {
	key: string | number
	text: ReactNode
}

interface ActionSheetProps {
	className: string
	visable: boolean
	actions: Action[]
	text: string
	onClose?: () => void
	onConfirm?: () => void
	showBtn: boolean
	onAction: (action: Action) => void
}

const classPrefix = "action-sheet-component";

const ActionSheet: FC<ActionSheetProps> = ({ visable, actions, onClose, onConfirm, showBtn, text, onAction, className }) => {
	if (!visable) return null;
	return createPortal(
		<div className={ClassNames(classPrefix, className)} >
			<div className={`${classPrefix}-body`}>
				<div className={`${classPrefix}-button-list`}>
					{
						actions.map(v => (
							<a className={`${classPrefix}-button-list-item`} key={v.key} onClick={() => { onAction(v); }}>
								<div className={`${classPrefix}-button-list-item-name`}>{v.text}</div>
							</a>
						))
					}
					{
						showBtn
							&& <div className={`${classPrefix}-confirm-button`}>
								<a className={`${classPrefix}-confirm-button-item`} onClick={onConfirm}>
									<div className={`${classPrefix}-confirm-button-item-name`}>{text}</div>
								</a>
							</div>
					}
				</div>
			</div>
			<div className={`${classPrefix}-mask`} onClick={onClose}></div>
		</div>,
		document.body
	);
};

ActionSheet.defaultProps = {
	showBtn: true,
	visable: false
};

interface wrapperProps {
	onConfirm: () => void
	showBtn: boolean
	actions: Action[]
	text: string
	className: string
	onAction: (action: Action) => void
}

function useActionSheet(): [FC<wrapperProps>, () => void, () => void, boolean] {
	const [visable, setVisable] = useState<boolean>(false);
	const [active, setActive] = useState<boolean>(false);
	const onHide = async(): Promise => {
		setActive(false);
		await new Promise((resolve) => {
			setTimeout(resolve, 300);
		});
		setVisable(false);
		disableScroll.off();
	};
	const onShow = (): void => {
		setActive(true);
		setVisable(true);
		disableScroll.on();
	};
	const wrapper: FC<wrapperProps> = ({ actions, showBtn, text, onConfirm, onAction, className }) => {
		const classes = ClassNames({ hide: !active, show: active }, className);
		const onYes = (): void => {
			onHide();
			onConfirm?.();
		};
		return <ActionSheet
			className={classes}
			text={text}
			visable={visable}
			onClose={onHide}
			onConfirm={onYes}
			showBtn={showBtn}
			actions={actions}
			onAction={onAction}
		/>;
	};
	return [wrapper, onShow, onHide, visable];
}

export default useActionSheet;