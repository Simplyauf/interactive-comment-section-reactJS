import { ReplyForm } from "./commentAndReplyForm";
import { useContext, useRef } from "react";
import { commentPageContext } from "./wholeCommentPage";
import "./wholeCommentPage.css";
import { SingleReplySection } from "./singleReplySection";
import { data } from "../jsonDatas/data";
import { ModifyBtns } from "./replyAndModifyBtns";
import { ReplyBtn } from "./replyAndModifyBtns";

// utils RESUSEABLE FUNCTIONS
import { handlePlusIcon } from "../utils/handlePlusIcon";
import { handleMinusIcon } from "../utils/handleMinusIcon";
import { cancelModalWarning } from "../utils/modalFn";
import { ConfirmdeleteComment } from "../utils/modalFn";

export const SingleCommentSection = (props) => {
	//gETTING PARAMETERS OF THE USEREDUCER FROM COMMENTBOXES.JS
	const { dispatch } = useContext(commentPageContext);

	const { id, content, score, createdAt, user, replies } = props.commentData;

	const { username, image } = user;

	// ACCESSING DOM OF THE COMMENT SECTION INVOKED
	const selectedCommentSectionRef = useRef();

	return (
		<article aria-roledescription="comment-box">
			<div className={`${username} comment-box comment-page`} data-id={id} ref={selectedCommentSectionRef}>
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
					<img onClick={(e) => handlePlusIcon(e, dispatch, selectedCommentSectionRef)} src="images/icon-plus.svg" alt="+" className="plus-icon" />
					<span className="score-value">{score}</span>
					<img onClick={(e) => handleMinusIcon(e, dispatch, selectedCommentSectionRef)} src="images/icon-minus.svg" alt="-" className="minus-icon" />
				</button>
				{username === data.currentUser.username ? <ModifyBtns id={id} {...{ selectedCommentSectionRef }} /> : <ReplyBtn />}

				<div className="modal-container ">
					<div className="modal-content">
						<h3 className="modal-header">Delete comment</h3>

						<p className="modal-text">Are you sure you want to delete this comment?This will remove the comment amd cant be undone</p>
						<div className="cancelAndDelete-btn-container">
							<button className="cancel-modal-btn" onClick={cancelModalWarning}>
								NO,CANCEL
							</button>
							<button onClick={(e) => ConfirmdeleteComment(e, dispatch, selectedCommentSectionRef)} className="Delete-modal-btn">
								YES,DELETE
							</button>
						</div>
					</div>
				</div>
			</div>
			<ReplyForm username={username} {...{ selectedCommentSectionRef }} />

			{replies.length === 0 || (
				<div className="reply-container">
					{replies.map((repliesData) => {
						return (
							<SingleReplySection currentRepliesData={repliesData} key={repliesData.id} {...{ selectedCommentSectionRef }}>
								{repliesData.user.username === data.currentUser.username ? <ModifyBtns id={id} {...{ selectedCommentSectionRef }} /> : <ReplyBtn />}
							</SingleReplySection>
						);
					})}
				</div>
			)}
		</article>
	);
};
