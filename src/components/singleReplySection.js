import React from "react";
import { data } from "./data";
import "./EntireCommentSection/commentBoxes.css";

import { ReplyForm } from "./commentAndReply";

export const SingleReplySection = (props) => {
	const { id, content, replyingTo, createdAt, score, user } = props.currentRepliesData;
	const { handleSendReplyClick, handlePlusIcon, handleMinusIcon, ConfirmdeleteComment, cancelModalWarning } = props;
	const { username, image } = user;
	let linkToThePersonBeingRepliedTo = `#${replyingTo}`;

	return (
		<article>
			<div className="comment-box reply-page" id={username} data-id={id}>
				<div className="user-info">
					<img src={image.png} alt="" className="user-img" />

					<span className="name">{username}</span>
					{username === data.currentUser.username && (
						<div className="current-user-container">
							<span className="current-user">you</span>
						</div>
					)}
					<span className="time">{createdAt}</span>
				</div>
				<div className="comment-text-container" id={username}>
					<p className="comment-text">
						<b>
							<a href={linkToThePersonBeingRepliedTo}>@{replyingTo}</a>
						</b>
						&nbsp; &nbsp;
						{content}
					</p>
				</div>

				<button className="score-btn" id={username}>
					<img src="images/icon-plus.svg" alt="+" onClick={handlePlusIcon} className="plus-icon" />
					<span className="score-value">{score}</span>

					<img onClick={handleMinusIcon} src="images/icon-minus.svg" alt="-" className="minus-icon" />
				</button>

				{props.children}

				<div className="modal-container" id={username} data-id={id}>
					<div className="modal-content">
						<h3 className="modal-header">Delete comment</h3>

						<p className="modal-text">Are you sure you want to delete this comment?This will remove the comment amd cant be undone</p>
						<div className="cancelAndDelete-btn-container">
							<button className="cancel-modal-btn" onClick={cancelModalWarning}>
								NO,CANCEL
							</button>

							<button className="Delete-modal-btn" onClick={ConfirmdeleteComment}>
								YES,DELETE
							</button>
						</div>
					</div>
				</div>
			</div>
			<ReplyForm username={username} handleSendReplyClick={handleSendReplyClick} />
		</article>
	);
};
