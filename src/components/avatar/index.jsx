import React, { useEffect, useState } from "react";
import ReactCropper from "react-cropper";
import Classnames from "classnames";
import PropTypes from "prop-types";

import "./index.scss";
import "cropperjs/dist/cropper.css";
import ImgAvatar from "../../assets/img/avatar.png";
import { UploadImg } from "../../apis/static";
import { Base64ToFile } from "../../utils/setting";
import { actionToast, useModal } from "../modal";

export default function Avatar({ className, disabled, onChange, src }) {
	const [img, setImg] = useState(src);
	const [cropper, setCropper] = useState(null);
	const [Modal, showModal, hideModal] = useModal();
	const classes = Classnames("avatar-component", className, { disabled });
	const onSubmit = e => {
		const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
		const reader = new FileReader();
		reader.readAsDataURL(files[0]);
		reader.addEventListener("load", f => {
			const data = f.target.result;
			const img = new Image();
			// const file = files[0];
			// const isJPG = file.type === "image/jpeg";
			// const isPNG = file.type === "image/png";
			// const isLt10M = file.size / 1024 / 1024 < 10;
			img.setAttribute("src", data);
			img.addEventListener("load", () => {
				// if (!(isJPG || isPNG)) {
				// 	return actionAlert({ content: <p>仅支持JPG/PNG格式的图片</p>, title: "" });
				// }
				// if (!isLt10M) {
				// 	return actionAlert({ content: <p>图片体积最大支持10MB</p>, title: "" });
				// }
				// if (img.width > 1920 || img.height > 1080) {
				// 	return actionAlert({ content: <p>图片尺寸最大支持1920x1080</p>, title: "" });
				// }
				setImg(reader.result);
			});
		});
	};
	const onDraw = res => setCropper(res);
	const onSave = async() => {
		if (cropper?.getCroppedCanvas()?.toDataURL) {
			const file = Base64ToFile(cropper.getCroppedCanvas().toDataURL());
			const res = await UploadImg({ files: [file] });
			if (res.flag) {
				const { url } = res.data[0];
				setImg("");
				setCropper(null);
				await hideModal();
				onChange?.(url);
			}
			actionToast(res.msg);
		} else {
			actionToast("请上传头像");
		}
	};
	const btns = [
		<input
			key="change"
			className="avatar-filebtn"
			type="file"
			accept="image/jpeg,image/png"
			onChange={onSubmit}
		/>,
		<button key="upload" className="modal-btn">上传头像</button>,
		<button key="save" className="modal-btn" disabled={!cropper} onClick={onSave}>保存头像</button>
	];
	useEffect(() => setImg(src), [src]);
	return (
		<div className={classes}>
			<img className="avatar-cover" src={src || ImgAvatar} onClick={showModal} />
			<Modal title="更换头像" handler={btns} showCloseBtn>
				<div className="avatar-cropper">
					<ReactCropper
						style={{ backgroundColor: "#1b222f", height: "7rem", width: "7rem" }}
						src={img}
						initialAspectRatio={1}
						aspectRatio={1}
						autoCropArea={1}
						viewMode={1}
						zoomable={false}
						background={true}
						responsive={true}
						checkOrientation={false}
						onInitialized={onDraw}
					/>
				</div>
			</Modal>
		</div>
	);
}

Avatar.propTypes = {
	className: PropTypes.string,
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
	src: PropTypes.string
};
Avatar.defaultProps = {
	className: "",
	disabled: false,
	onChange: null,
	src: ""
};