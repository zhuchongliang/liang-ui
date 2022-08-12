import React, { useEffect, useState } from "react";
import Classnames from "classnames";
import PropTypes from "prop-types";

import "./index.scss";
import JsonArea from "../../assets/json/area.json";
import Input from "../../components/input";
import Select from "../../components/select";

export default function Area({ className, disabled, onChange, value }) {
	const [p = null, c = null, a = ""] = value.split("-");
	const provItem = JsonArea.find(v => v.val === p);
	const provId = provItem?.id ?? null;
	const provList = provItem?.children ?? [];
	const cityItem = provList.find(v => v.val === c);
	const cityId = cityItem?.id ?? null;
	const [prov, setProv] = useState(provId);
	const [city, setCity] = useState();
	const [address, setAdress] = useState(a);
	const classes = Classnames("area-component", className);
	const onChangeProv = item => {
		setProv(item.id);
		setCity(null);
		setAdress("");
		onChange?.(item.val);
	};
	const onChangeCity = item => {
		setCity(item.id);
		setAdress("");
		onChange?.(`${provItem.val}-${item.val}`);
	};
	const onChangeAdress = val => {
		setAdress(val);
		provItem && cityItem && onChange?.(`${provItem.val}-${cityItem.val}-${val}`);
	};
	useEffect(() => {
		setProv(provId);
		setCity(cityId);
		setAdress(a);
	}, [value]); // eslint-disable-line
	return (
		<div className={classes}>
			<div className="area-pc">
				<Select
					className="area-prov"
					placeholder="请选择省份"
					list={JsonArea}
					initId={prov}
					disabled={disabled}
					onChange={onChangeProv}
				/>
				<Select
					className="area-city"
					placeholder="请选择城市"
					list={provList}
					initId={city}
					disabled={disabled}
					onChange={onChangeCity}
				/>
			</div>
			<Input
				className="area-address"
				placeholder="详细地址"
				maxLength={30}
				value={address}
				disabled={!prov || !city || disabled}
				countable
				onChange={onChangeAdress}
			/>
		</div>
	);
}

Area.propTypes = {
	className: PropTypes.string,
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
	value: PropTypes.string
};
Area.defaultProps = {
	className: "",
	disabled: false,
	onChange: null,
	value: ""
};