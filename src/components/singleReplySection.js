import React from "react";
import { data } from "../jsonDatas/data";
import { useContext } from "react";
import "./wholeCommentPage.css";
import { ReplyForm } from "./commentAndReplyForm";
import { commentPageContext } from "./wholeCommentPage";

import { handlePlusIcon } from "../utils/handlePlusIcon";
import { handleMinusIcon } from "../utils/handleMinusIcon";
import { cancelModalWarning } from "../utils/modalFn";
import { ConfirmdeleteComment } from "../utils/modalFn";

export const SingleReplySection = (props) => {
	const { dispatch } = useContext(commentPageContext);

	const { id, content, replyingTo, createdAt, score, user } = props.currentRepliesData;
	const { selectedCommentSectionRef } = props;

	const { username, image } = user;

	//SCROLLING TO REPLIED USERS BOX WHEN HIS/HER TAG IS CLICKED
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
					<img src="images/icon-plus.svg" alt="+" onClick={(e) => handlePlusIcon(e, dispatch, selectedCommentSectionRef)} className="plus-icon" />
					<span className="score-value">{score}</span>

					<img onClick={(e) => handleMinusIcon(e, dispatch, selectedCommentSectionRef)} src="images/icon-minus.svg" alt="-" className="minus-icon" />
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

							<button className="Delete-modal-btn" onClick={(e) => ConfirmdeleteComment(e, dispatch, selectedCommentSectionRef)}>
								YES,DELETE
							</button>
						</div>
					</div>
				</div>
			</div>
			<ReplyForm username={username} {...{ selectedCommentSectionRef }} />
		</article>
	);
};
