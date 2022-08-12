import React, { useState } from "react";
import Classnames from "classnames";
import PropTypes from "prop-types";

import "./index.scss";
import { UploadImg } from "../../apis/static";
import { useFlow } from "../flow";
import { actionAlert, actionToast } from "../modal";

const fileType = {
	audio: "audio/*",
	img: "image/*",
	video: "video/*"
};

export default function File({ accept, className, disabled, onChange, src }) {
	const [data, setData] = useState(null);
	const [cover, setCover] = useState(src);
	const [progress, setProgress] = useState(0);
	const [Flow, showFlow, hideFlow] = useFlow();
	const loading = progress > 0 && progress < 100;
	const classes = Classnames("file-component", className, { disabled, empty: !data && !cover, loading });
	const onSubmit = e => {
		e.stopPropagation();
		const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
		const reader = new FileReader();
		reader.readAsDataURL(files[0]);
		reader.addEventListener("load", async() => {
			const file = files[0];
			setData(null);
			if (accept === "img") {
				const isJPG = file.type === "image/jpeg";
				const isPNG = file.type === "image/png";
				const isLt10M = file.size / 1024 / 1024 < 10;
				if (!(isJPG || isPNG)) {
					return actionAlert({ content: <p>仅支持JPG/PNG格式的图片</p>, title: "" });
				}
				if (!isLt10M) {
					return actionAlert({ content: <p>图片体积最大支持10MB</p>, title: "" });
				}
				setData(reader.result);
				setCover("");
				const res = await UploadImg({
					files: [file],
					progress: p => setProgress(p.loaded / p.total * 100)
				});
				if (res.flag) {
					const { url } = res.data[0];
					setCover(url);
					onChange?.(url);
				} else {
					setCover(src);
					actionToast(res.msg);
				}
			}
		});
	};
	const onDelete = async() => {
		setData(null);
		setCover("");
		await hideFlow();
		onChange?.("");
	};
	const inputDom = !data
		? (
			<input
				className="file-btn"
				type="file"
				accept={fileType[accept]}
				disabled={disabled}
				onChange={onSubmit}
			/>
		)
		: <a className="file-btn" onClick={showFlow}></a>;
	return (
		<div className={classes} style={{ backgroundImage: `url(${cover})` }}>
			{progress < 100 && <em className="file-progress" style={{ width: `${progress}%` }}></em>}
			{inputDom}
			<Flow className="file-flow" title="1/1" onSubmit={onDelete}>
				<img className="file-flow-img" src={cover} />
			</Flow>
		</div>
	);
}

File.propTypes = {
	accept: PropTypes.oneOf(["img", "audio", "video"]),
	className: PropTypes.string,
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
	src: PropTypes.string
};
File.defaultProps = {
	accept: "img",
	className: "",
	disabled: false,
	onChange: null,
	src: ""
};