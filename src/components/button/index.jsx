import React from "react";
import Classnames from "classnames";
import PropTypes from "prop-types";

import "./index.scss";

export default function Button({ className, disabled, href, icon, onClick, text, type }) {
	const classes = Classnames("button-component", className, type, icon, { "has-icon": !!icon });
	return href
		? (
			<a
				className={classes}
				href={href}
				target="_blank"
				rel="noreferrer"
				onClick={onClick}
			>{text}</a>
		)
		: <button className={classes} disabled={disabled} onClick={onClick}>{text}</button>;
}

Button.propTypes = {
	className: PropTypes.string,
	disabled: PropTypes.bool,
	href: PropTypes.string,
	icon: PropTypes.string,
	onClick: PropTypes.func,
	text: PropTypes.string,
	type: PropTypes.oneOf(["normal", "primary", "primary-gradient"])
};
Button.defaultProps = {
	className: "",
	disabled: false,
	href: "",
	icon: "",
	onClick: null,
	text: "按钮",
	type: "normal"
};