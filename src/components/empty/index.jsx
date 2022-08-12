import React from "react";
import Classnames from "classnames";
import PropTypes from "prop-types";

import "./index.scss";

export default function Empty({ className, height, text, type }) {
	const classes = Classnames("empty-component", className);
	const iconClasses = Classnames("empty-icon", type);
	return (
		<figure className={classes} style={{ minHeight: `${height < 4 ? 4 : height}rem` }}>
			<i className={iconClasses}></i>
			{!!text && <figcaption className="empty-text">{text}</figcaption>}
		</figure>
	);
}

Empty.propTypes = {
	className: PropTypes.string,
	height: PropTypes.number,
	text: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.node,
		PropTypes.string
	]),
	type: PropTypes.oneOf(["resoure", "match", "joiner"])
};
Empty.defaultProps = {
	className: "",
	height: 4,
	text: "空载",
	type: "resoure"
};