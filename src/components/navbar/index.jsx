import React from "react";
import { useHistory } from "react-router-dom";
import Classnames from "classnames";
import PropTypes from "prop-types";

import "./index.scss";

export default function Navbar({ className, onBack, onSubmit, showBack, text }) {
	const history = useHistory();
	const classes = Classnames("navbar-component ellipsis", className);
	const onCancel = () => {
		if (onBack) {
			const goback = history.goBack;
			onBack(goback);
		} else {
			history.goBack();
		}
	};
	return (
		<div className={classes}>
			{showBack && <i className="navbar-btn left" onClick={onCancel}></i>}
			{text}
			{!!onSubmit && <i className="navbar-btn right" onClick={onSubmit}></i>}
		</div>
	);
}

Navbar.propTypes = {
	className: PropTypes.string,
	onBack: PropTypes.func,
	onSubmit: PropTypes.func,
	showBack: PropTypes.bool,
	text: PropTypes.string
};
Navbar.defaultProps = {
	className: "",
	onBack: null,
	onSubmit: null,
	showBack: true,
	text: "导航栏"
};