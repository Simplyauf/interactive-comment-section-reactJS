import { ReplyForm } from "./commentAndReply";
import { useContext, useRef } from "react";
import { commentPageContext } from "./EntireCommentSection/commentBoxes";
import "./EntireCommentSection/commentBoxes.css";
import { SingleReplySection } from "./singleReplySection";

import { data } from "./data";
import { ModifyBtns } from "./replyAndModifyBtns";
import { ReplyBtn } from "./replyAndModifyBtns";
import { getPostedDate } from "./dateOfCommentPost";

export const SingleCommentSection = (props) => {
	//gETTING PARAMETERS OF THE USEREDUCER FROM COMMENTBOXES.JS
	const { dispatch } = useContext(commentPageContext);

	const { id, content, score, createdAt, user, replies } = props.commentData;

	const { username, image } = user;

	// ACCESSING DOM OF THE COMMENT SECTION INVOKED
	const currentCommentSectionRef = useRef();

	const handleReplyBtnClick = (e) => {
		e.currentTarget.parentElement.nextSibling.firstElementChild.value = "";
		e.currentTarget.parentElement.nextSibling.classList.toggle("active-reply-form");
	};

	const handleSendReplyClick = (e) => {
		let replyFormValueTextarea = e.currentTarget.parentElement.previousElementSibling;

		//PREVENTING ENTRIES OF MULTIPLE WHITESPACE AT THE BEGINNING OF INPUT
		replyFormValueTextarea.addEventListener("input", () => {
			replyFormValueTextarea.value = replyFormValueTextarea.value ? replyFormValueTextarea.value.trimStart() : "";
		});

		if (replyFormValueTextarea.value) {
			let newReply = {
				replyingTo: e.currentTarget.parentElement.parentElement.id,
				content: replyFormValueTextarea.value,
				score: 0,
				timestamp: new Date(),
				user: {
					username: data.currentUser.username,
					image: {
						png: data.currentUser.image.png,
						webp: data.currentUser.image.webp,
					},
				},
				createdAt: "recently",
			};

			let commentAndPostDate = newReply.timestamp;
			setInterval(getPostedDate, 1000, commentAndPostDate, newReply);

			const action = {
				type: "ADD_NEW_REPLY",
				payload: { newReply, currentCommentSectionRef },
			};
			dispatch(action);

			e.currentTarget.parentElement.parentElement.classList.remove("active-reply-form");
		} else {
			alert("pls type in value");
		}
	};

	const handlePlusIcon = (e) => {
		let checkIfSectionIsAReplyPage = e.currentTarget.parentElement.parentElement;

		const action = {
			type: "INCREASE-SCORE-VALUE",
			payload: { currentCommentSectionRef, checkIfSectionIsAReplyPage },
		};
		dispatch(action);
	};

	const handleMinusIcon = (e) => {
		let checkIfSectionIsAReplyPage = e.currentTarget.parentElement.parentElement;
		const action = {
			type: "DECREASE-SCORE-VALUE",
			payload: { currentCommentSectionRef, checkIfSectionIsAReplyPage },
		};
		dispatch(action);
	};

	const editComment = (e) => {
		const contentToBeEdited = e.currentTarget.parentElement.previousSibling.previousSibling;

		let checkIfSectionIsAReplyPage = e.currentTarget.parentElement.parentElement;
		let htmlTemplateForEdit = document.createElement("div");

		htmlTemplateForEdit.setAttribute("class", "comment-text-container");
		dispatch({ type: "EDIT_A_COMMENT", payload: { currentCommentSectionRef, htmlTemplateForEdit, contentToBeEdited, checkIfSectionIsAReplyPage, updateEditedPost } });

		e.currentTarget.parentElement.classList.add("makeEdit-Delete-btn-unclickable");
	};

	const updateEditedPost = (e) => {
		let ContentToBeUpdated = e.currentTarget.previousElementSibling.value;

		let htmlElemToBeReplaced = e.currentTarget.parentElement;

		let checkIfSectionIsAReplyPage = e.currentTarget.parentElement.parentElement;
		dispatch({ type: "UPDATE_EDITED_COMMENT", payload: { currentCommentSectionRef, ContentToBeUpdated, checkIfSectionIsAReplyPage, htmlElemToBeReplaced } });

		e.currentTarget.parentElement.nextElementSibling.nextElementSibling.classList.remove("makeEdit-Delete-btn-unclickable");
	};

	const showModalWarningForDelete = (e) => {
		e.currentTarget.parentElement.nextSibling.classList.add("activemodal");
	};

	const cancelModalWarning = (e) => {
		e.currentTarget.parentElement.parentElement.parentElement.classList.remove("activemodal");
	};

	const ConfirmdeleteComment = (e) => {
		e.currentTarget.parentElement.parentElement.parentElement.classList.remove("activemodal");

		let modalContainerId = e.currentTarget.parentElement.parentElement.parentElement.dataset.id;

		let checkIfSectionIsAReplyPage = e.currentTarget.parentElement.parentElement.parentElement.parentElement;

		dispatch({ type: "DELETE_A_COMMENT", payload: { currentCommentSectionRef, checkIfSectionIsAReplyPage, modalContainerId } });
	};

	return (
		<article aria-roledescription="comment-box">
			<div className={`${username} comment-box comment-page`} data-id={id} ref={currentCommentSectionRef}>
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
					<p className="comment-text">{content}</p>
				</div>

				<button className="score-btn">
					<img onClick={handlePlusIcon} src="images/icon-plus.svg" alt="+" className="plus-icon" />
					<span className="score-value">{score}</span>

					<img onClick={handleMinusIcon} src="images/icon-minus.svg" alt="-" className="minus-icon" />
				</button>
				{username === data.currentUser.username ? <ModifyBtns id={id} {...{ editComment, showModalWarningForDelete }} /> : <ReplyBtn handleReplyBtnClick={handleReplyBtnClick} />}

				<div className="modal-container ">
					<div className="modal-content">
						<h3 className="modal-header">Delete comment</h3>

						<p className="modal-text">Are you sure you want to delete this comment?This will remove the comment amd cant be undone</p>
						<div className="cancelAndDelete-btn-container">
							<button className="cancel-modal-btn" onClick={cancelModalWarning}>
								NO,CANCEL
							</button>
							<button onClick={ConfirmdeleteComment} className="Delete-modal-btn">
								YES,DELETE
							</button>
						</div>
					</div>
				</div>
			</div>
			<ReplyForm username={username} handleSendReplyClick={handleSendReplyClick} />

			{replies.length === 0 || (
				<div className="reply-container">
					{replies.map((repliesData) => {
						return (
							<SingleReplySection currentRepliesData={repliesData} key={repliesData.id} {...{ handleMinusIcon, handleSendReplyClick, editComment, cancelModalWarning, ConfirmdeleteComment, handlePlusIcon }}>
								{repliesData.user.username === data.currentUser.username ? <ModifyBtns id={id} {...{ editComment, showModalWarningForDelete }} /> : <ReplyBtn handleReplyBtnClick={handleReplyBtnClick} />}
							</SingleReplySection>
						);
					})}
				</div>
			)}
		</article>
	);
};
