import React from "react";
import { useContext } from "react";
import { commentPageContext } from "./wholeCommentPage";
import { handleReplyBtnClick } from "../utils/handleReplyBtnClick";
import { showModalWarningForDelete } from "../utils/modalFn";
import { editComment } from "../utils/editComment";

export const ReplyBtn = () => {
	return (
		<div className="reply-btn" onClick={handleReplyBtnClick}>
			<img src="images/icon-reply.svg" alt="reply" className="reply-icon" />
			<span className="reply-text">Reply</span>
		</div>
	);
};

export const ModifyBtns = (props) => {
	const { selectedCommentSectionRef } = props;

	const { dispatch } = useContext(commentPageContext);
	return (
		<div className="modify-btns">
			<div className="delete-btn" onClick={showModalWarningForDelete}>
				<img src="images/icon-delete.svg" alt="delete" className="delete-icon" />
				<span> Delete</span>
			</div>

			<div onClick={(e) => editComment(e, dispatch, selectedCommentSectionRef)} className="edit-btn">
				<img src="images/icon-edit.svg" alt="" className="edit-icon" />
				<span> Edit</span>
			</div>
		</div>
	);
};
