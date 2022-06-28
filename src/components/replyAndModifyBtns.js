import React from "react";

export const ReplyBtn = (props) => {
	return (
		<div className="reply-btn" onClick={props.handleReplyBtnClick}>
			<img src="images/icon-reply.svg" alt="reply" id="reply-icon" />

			<span className="reply-text">Reply</span>
		</div>
	);
};

export const ModifyBtns = (props) => {
	const { id, showModalWarningForDelete, editComment } = props;

	return (
		<div className="modify-btns" id={id}>
			<div className="delete-btn" onClick={showModalWarningForDelete}>
				<img src="images/icon-delete.svg" alt="delete" id="delete-icon" />
				<span> Delete</span>
			</div>

			<div onClick={editComment} className="edit-btn">
				<img src="images/icon-edit.svg" alt="" id="edit-icon" />
				<span> Edit</span>
			</div>
		</div>
	);
};
