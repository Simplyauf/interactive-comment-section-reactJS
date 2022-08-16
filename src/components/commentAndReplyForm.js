import React from "react";
import "./wholeCommentPage.css";
import { data } from "../jsonDatas/data";
import { useContext } from "react";
import { commentPageContext } from "./wholeCommentPage";

import { handleSendReplyClick } from "../utils/handleSendReplyClick";
import { sendNewCommentFn } from "../utils/SendNewComment";

export const ReplyForm = (props) => {
	const { dispatch } = useContext(commentPageContext);

	const { currentUser } = data;
	const { username } = props;

	const { selectedCommentSectionRef } = props;
	return (
		<div className="input-reply-box" id={username}>
			<textarea name="" rows="7" placeholder="Add a comment..."></textarea>

			<div className="user-img-container-comment">
				<img src={currentUser.image.png} alt="" className="user-img" />
			</div>

			<button className="send-reply-btn" onClick={(e) => handleSendReplyClick(e, dispatch, selectedCommentSectionRef)}>
				REPLY
			</button>
		</div>
	);
};

export const CommentForm = (props) => {
	const { dispatch } = useContext(commentPageContext);

	const { currentUser } = data;

	return (
		<div className="input-comment-box">
			<textarea className="send-textarea" name="" rows="7" placeholder="Add a comment..."></textarea>

			<div className="user-img-container-comment">
				<img src={currentUser.image.png} alt="" className="user-img" />
			</div>

			<button className="send-comment-btn" onClick={(e) => sendNewCommentFn(e, dispatch)}>
				SEND
			</button>
		</div>
	);
};
