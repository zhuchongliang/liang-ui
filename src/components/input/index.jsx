import React, { useEffect, useState } from "react";
import Classnames from "classnames";
import PropTypes from "prop-types";

import "./index.scss";

export default function Input({ className, countable, countableText, disabled, maxLength, minLength, onBlur, onChange, onFocus, onSubmit, pattern, placeholder, type, value }) {
	const _value = (value ?? "").toString();
	const [val, setVal] = useState(_value);
	const classes = Classnames("input-component", className, { disabled });
	const onInput = e => {
		let text = e.target.value;
		type === "number" && (text = text.replace(/[^\d]/g, ""));
		setVal(text);
		onChange?.(text);
	};
	const onEntry = e => e.keyCode === 13 && onSubmit?.(val);
	useEffect(() => setVal(_value), [_value]);
	return (
		<div className={classes}>
			{type === "search" && <i className="input-icon"></i>}
			<input
				className="input-keyword"
				type="text"
				placeholder={placeholder}
				pattern={pattern}
				minLength={minLength}
				maxLength={maxLength}
				value={val}
				disabled={disabled}
				onFocus={onFocus}
				onBlur={onBlur}
				onChange={onInput}
				onKeyUp={onEntry} />
			{countable && !disabled && <span className="input-counter">{countableText ?? `${val ? val.toString().length : 0}/${maxLength}`}</span>}
		</div>
	);
}

Input.propTypes = {
	className: PropTypes.string,
	countable: PropTypes.bool,
	countableText: PropTypes.string,
	disabled: PropTypes.bool,
	maxLength: PropTypes.number,
	minLength: PropTypes.number,
	onBlur: PropTypes.func,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onSubmit: PropTypes.func,
	pattern: PropTypes.string,
	placeholder: PropTypes.string,
	type: PropTypes.oneOf(["text", "number", "search"]),
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
Input.defaultProps = {
	className: "",
	countable: false,
	countableText: "",
	disabled: false,
	maxLength: 20,
	minLength: 0,
	onBlur: null,
	onChange: null,
	onFocus: null,
	onSubmit: null,
	pattern: "",
	placeholder: "请输入内容",
	type: "text",
	value: ""
};