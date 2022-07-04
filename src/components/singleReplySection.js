import React from "react";
import { data } from "./data";
import "./EntireCommentSection/commentBoxes.css";
import { ReplyForm } from "./commentAndReply";

export const SingleReplySection = (props) => {
	const { id, content, replyingTo, createdAt, score, user } = props.currentRepliesData;
	const { handleSendReplyClick, handlePlusIcon, handleMinusIcon, ConfirmdeleteComment, cancelModalWarning } = props;
	const { username, image } = user;

	//SCROLLING TO REPLIED USERS BOX WHEN HIS TAG IS CLICKED
	const scrollToRepliedUser = (e) => {
		// getting the replied users name from the comment box classnames
		const usersHtmlElemClassName = document.querySelectorAll(".comment-box");

		//getting the users name from the link to be clicked
		let usersUsername = e.currentTarget.textContent.substring(1);

		usersHtmlElemClassName.forEach((userHtmlElemClassName) => {
			if (userHtmlElemClassName.classList.contains(usersUsername)) {
				userHtmlElemClassName.scrollIntoView(true);
			}
		});
	};
	return (
		<article>
			<div className={`${username} comment-box reply-page`} aria-roledescription="reply-box" data-id={id}>
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
				<div className="comment-text-container">
					<p className="comment-text">
						<b className="link-to-repliedUser" onClick={scrollToRepliedUser}>
							@{replyingTo}
						</b>
						&nbsp; &nbsp;
						{content}
					</p>
				</div>

				<button className="score-btn">
					<img src="images/icon-plus.svg" alt="+" onClick={handlePlusIcon} className="plus-icon" />
					<span className="score-value">{score}</span>

					<img onClick={handleMinusIcon} src="images/icon-minus.svg" alt="-" className="minus-icon" />
				</button>

				{props.children}

				<div className="modal-container" data-id={id} role="alert">
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
