import React, { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { WaitFor } from "@yangzw/bruce-us";
import Classnames from "classnames";
import PropTypes from "prop-types";

import "./index.scss";
import Navbar from "./../navbar/index";

export default function Flow({ children, className, onClose, onSubmit, title, visible }) {
	if (!visible) return null;
	const classes = Classnames("flow-component", className);
	return createPortal(
		<div className={classes}>
			<Navbar className="flow-navbar" text={title} onBack={onClose} onSubmit={onSubmit} />
			<div className="flow-body">
				<div className="flow-body-wrapper">{children}</div>
			</div>
		</div>,
		document.body
	);
}

Flow.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.node,
		PropTypes.string
	]),
	className: PropTypes.string,
	onClose: PropTypes.func,
	onSubmit: PropTypes.func,
	title: PropTypes.string,
	visible: PropTypes.bool
};
Flow.defaultProps = {
	children: null,
	className: "",
	onClose: null,
	onSubmit: null,
	title: "流程",
	visible: false
};

export function useFlow() {
	const [visible, setVisible] = useState(false);
	const [active, setActive] = useState(false);
	const onShow = useCallback(() => {
		setActive(true);
		setVisible(true);
	}, [visible]); // eslint-disable-line
	const onHide = useCallback(async() => {
		setActive(false);
		await WaitFor(300);
		setVisible(false);
	}, [visible, active]); // eslint-disable-line
	const wrapper = useCallback(({ children, className, onClose, onSubmit, title = "流程" }) => {
		const classes = Classnames(className, { hide: !active, show: active });
		const onCloseX = () => onClose ? onClose(onHide) : onHide();
		return (
			<Flow
				className={classes}
				visible={visible}
				title={title}
				onClose={onCloseX}
				onSubmit={onSubmit}
			>{children}</Flow>
		);
	}, [visible, onHide]); // eslint-disable-line
	return [wrapper, onShow, onHide, visible];
}