import React, { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { WaitFor } from "@yangzw/bruce-us";
import Classnames from "classnames";
import DisableScroll from "disable-scroll";
import PropTypes from "prop-types";

import "./index.scss";

function Loader({ className, text, visible }) {
	if (!visible) return null;
	const classes = Classnames("loader-component", className);
	const onStop = e => e.stopPropagation();
	return createPortal(
		<div className={classes} onClick={onStop}>
			<div className="loader-wrapper">
				<i className="loader-icon"></i>
				{!!text && <p className="loader-text">{text}</p>}
			</div>
		</div>,
		document.body
	);
}

Loader.propTypes = {
	className: PropTypes.string,
	text: PropTypes.string,
	visible: PropTypes.bool
};
Loader.defaultProps = {
	className: "",
	text: "加载",
	visible: false
};

export function useLoading() {
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
	const wrapper = useCallback(({ children, className, text }) => {
		const classes = Classnames(className, { hide: !active, show: active });
		return <Loader className={classes} visible={visible} text={text}>{children}</Loader>;
	}, [visible, onHide]); // eslint-disable-line
	return [wrapper, onShow, onHide, visible];
}

export default function Loading({ className, height, text }) {
	const classes = Classnames("loading-component", className);
	return (
		<div className={classes} style={{ minHeight: `${height < 4 ? 4 : height}rem` }}>
			<i className="loading-icon"></i>
			{!!text && <p className="loading-text">{text}</p>}
		</div>
	);
}

Loading.propTypes = {
	className: PropTypes.string,
	height: PropTypes.number,
	text: PropTypes.string
};
Loading.defaultProps = {
	className: "",
	height: 4,
	text: "加载中..."
};