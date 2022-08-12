import React, { useEffect, useState } from "react";
import Classnames from "classnames";
import PropTypes from "prop-types";

import "./index.scss";

export default function Select({ className, initId, disabled, list, onChange, placeholder }) {
	const _index_ = list.findIndex(v => v.id === initId);
	const _index = initId === null ? null : _index_ === -1 ? null : _index_;
	const [index, setIndex] = useState(_index);
	const [visible, setVisible] = useState(false);
	const vaild = !!list.length;
	const onShow = () => vaild && setVisible(true);
	const onHide = () => vaild && setVisible(false);
	const onSelect = (i, e) => {
		if (i === index || i === null) return;
		e.stopPropagation();
		setIndex(i);
		onHide();
		onChange?.({ ...list[i], _index_: i });
	};
	const classes = Classnames("select-component", className, { active: visible, disabled });
	const targetClasses = Classnames("select-target ellipsis", { active: index > -1 });
	const items = list.map((v, i) => (
		<li
			key={v.id}
			className={Classnames("select-item", { active: i === index })}
			onClick={e => onSelect(i, e)}
		>{v.val}</li>
	));
	useEffect(() => {
		setIndex(_index > -1 ? _index : null);
		onChange?.(_index > -1 ? { ...list[_index], _index_: _index } : { id: null, val: "" });
	}, [initId]); // eslint-disable-line
	return (
		<div className={classes} onClick={onShow} onMouseLeave={onHide}>
			<p className={targetClasses}>{list?.[index]?.val ?? placeholder}</p>
			{vaild && <i className="select-icon"></i>}
			{vaild && <ul className="select-list">{items}</ul>}
		</div>
	);
}

Select.propTypes = {
	className: PropTypes.string,
	disabled: PropTypes.bool,
	initId: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	list: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),
		val: PropTypes.string
	})),
	onChange: PropTypes.func,
	placeholder: PropTypes.string
};
Select.defaultProps = {
	className: "",
	disabled: false,
	initId: null,
	list: [],
	onChange: null,
	placeholder: "请选择"
};