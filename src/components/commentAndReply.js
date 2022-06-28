import React from "react";

import { data } from "./data";
import "./EntireCommentSection/commentBoxes.css";

export const ReplyForm = (props) => {
	const { currentUser } = data;
	const { username } = props;

	const { handleSendReplyClick } = props;
	return (
		<div className="input-reply-box" id={username}>
			<textarea name="" id="" rows="7" placeholder="Add a comment..."></textarea>

			<div className="img-send-container">
				<div className="user-img-container-comment">
					<img src={currentUser.image.png} alt="" className="user-img" />
				</div>

				<button className="send-reply-btn" onClick={handleSendReplyClick}>
					REPLY
				</button>
			</div>
		</div>
	);
};

export const CommentForm = (props) => {
	const { currentUser } = data;
	const { sendNewComment } = props;

	return (
		<div className="input-comment-box">
			<textarea className="send-textarea" name="" id="" rows="7" placeholder="Add a comment..."></textarea>

			<div className="img-send-container">
				<div className="user-img-container-comment">
					<img src={currentUser.image.png} alt="" className="user-img" />
				</div>

				<button className="send-comment-btn" onClick={sendNewComment}>
					SEND
				</button>
			</div>
		</div>
	);
};

// export const htmlTemplateForEdit = (props) => {
// 	const { content } = props;
// 	return (

// 	);
// };
