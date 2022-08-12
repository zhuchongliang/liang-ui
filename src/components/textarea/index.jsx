import React, { useEffect, useState } from "react";
import Classnames from "classnames";
import PropTypes from "prop-types";

import "./index.scss";

export default function Textarea({ className, countable, disabled, maxLength, minLength, msg, onChange, pattern, placeholder, value }) {
	const _value = (value || "").toString();
	const [val, setVal] = useState(_value);
	const [invalid, setInvalid] = useState(false);
	const classes = Classnames("textarea-component", className, { disabled });
	const onInput = e => {
		const text = e.target.value;
		setVal(text);
		onChange?.(text);
		setInvalid(!!pattern && !!msg && !!text && !pattern.test(text));
	};
	useEffect(() => setVal(_value), [_value]);
	return (
		<div className={classes}>
			<textarea
				className="textarea-desc"
				placeholder={placeholder}
				minLength={minLength}
				maxLength={maxLength}
				value={val}
				disabled={disabled}
				onChange={onInput}
			></textarea>
			{countable && !disabled && <span className="textarea-counter">{val ? val.length : 0}/{maxLength}</span>}
			{invalid && <p className="textarea-msg">{msg}</p>}
		</div>
	);
}

Textarea.propTypes = {
	className: PropTypes.string,
	countable: PropTypes.bool,
	disabled: PropTypes.bool,
	maxLength: PropTypes.number,
	minLength: PropTypes.number,
	msg: PropTypes.string,
	onChange: PropTypes.func,
	pattern: PropTypes.any,
	placeholder: PropTypes.string,
	value: PropTypes.string
};
Textarea.defaultProps = {
	className: "",
	countable: false,
	disabled: false,
	maxLength: 50,
	minLength: 0,
	msg: "",
	onChange: null,
	pattern: "",
	placeholder: "请输入内容",
	value: ""
};