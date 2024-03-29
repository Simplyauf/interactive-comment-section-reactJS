export const reducer = (state, action) => {
	const { CommentDatas } = state;

	if (action.type === "ADD_NEW_REPLY") {
		const { newReply, selectedCommentSectionRef } = action.payload;
		let currentObjOfTheCommentBeingInvoked = state.CommentDatas.filter((elem) => {
			return elem.id === parseInt(selectedCommentSectionRef.current.dataset.id);
		});

		newReply.id = currentObjOfTheCommentBeingInvoked[0].replies.length + 1;

		currentObjOfTheCommentBeingInvoked[0].replies.push(newReply);

		return { ...state, CommentDatas: state.CommentDatas };
	}

	if (action.type === "INCREASE-SCORE-VALUE") {
		const { selectedCommentSectionRef, checkIfSectionIsAReplyPage } = action.payload;
		let currentObjOfTheCommentBeingInvoked = state.CommentDatas.filter((elem) => {
			return elem.id === parseInt(selectedCommentSectionRef.current.dataset.id);
		});
		if (checkIfSectionIsAReplyPage.classList.contains("reply-page")) {
			let currentObjOfTheReplyBeingInvoked = currentObjOfTheCommentBeingInvoked[0].replies.find((elem) => {
				return elem.id === parseInt(checkIfSectionIsAReplyPage.dataset.id);
			});

			currentObjOfTheReplyBeingInvoked.score += 1;
		} else {
			currentObjOfTheCommentBeingInvoked[0].score += 1;
		}

		return { ...state };
	}

	if (action.type === "DECREASE-SCORE-VALUE") {
		const { selectedCommentSectionRef, checkIfSectionIsAReplyPage } = action.payload;
		let currentObjOfTheCommentBeingInvoked = state.CommentDatas.filter((elem) => {
			return elem.id === parseInt(selectedCommentSectionRef.current.dataset.id);
		});
		if (checkIfSectionIsAReplyPage.classList.contains("reply-page")) {
			let currentObjOfTheReplyBeingInvoked = currentObjOfTheCommentBeingInvoked[0].replies.find((elem) => {
				return elem.id === parseInt(checkIfSectionIsAReplyPage.dataset.id);
			});

			currentObjOfTheReplyBeingInvoked.score -= 1;
		} else {
			currentObjOfTheCommentBeingInvoked[0].score -= 1;
		}

		return { ...state };
	}

	if (action.type === "ADD_NEW_COMMENT") {
		const { newComment } = action.payload;
		newComment.id = CommentDatas.length + 1;

		return { ...state, CommentDatas: [...CommentDatas, newComment] };
	}

	if (action.type === "DELETE_A_COMMENT") {
		const { selectedCommentSectionRef, checkIfSectionIsAReplyPage } = action.payload;
		let currentObjOfTheCommentBeingInvoked = state.CommentDatas.filter((elem) => {
			return elem.id === parseInt(selectedCommentSectionRef.current.dataset.id);
		});
		if (checkIfSectionIsAReplyPage.classList.contains("reply-page")) {
			let newReplies = currentObjOfTheCommentBeingInvoked[0].replies.filter((elem) => {
				return elem.id !== parseInt(checkIfSectionIsAReplyPage.dataset.id);
			});
			currentObjOfTheCommentBeingInvoked[0].replies = [...newReplies];
		} else {
			let newComments = state.CommentDatas.filter((elem) => {
				return elem.id !== parseInt(selectedCommentSectionRef.current.dataset.id);
			});
			state.CommentDatas = [...newComments];
		}

		return { ...state };
	}

	if (action.type === "EDIT_A_COMMENT") {
		const { selectedCommentSectionRef, dispatch, htmlTemplateForEdit, contentToBeEdited, checkIfSectionIsAReplyPage, updateEditedPost } = action.payload;
		let currentObjOfTheCommentBeingInvoked = state.CommentDatas.filter((elem) => {
			return elem.id === parseInt(selectedCommentSectionRef.current.dataset.id);
		});

		if (checkIfSectionIsAReplyPage.classList.contains("reply-page")) {
			let currentObjOfTheReplyBeingInvoked = currentObjOfTheCommentBeingInvoked[0].replies.find((elem) => {
				return elem.id === parseInt(checkIfSectionIsAReplyPage.dataset.id);
			});

			htmlTemplateForEdit.innerHTML = `
	   
			<textarea class="edit-textarea" name="edit-area"  rows="7"  >@${currentObjOfTheReplyBeingInvoked.replyingTo}, ${currentObjOfTheReplyBeingInvoked.content} </textarea>
			<button class="update-content-btn" >UPDATE</button>
		
	`;
			contentToBeEdited.replaceWith(htmlTemplateForEdit);
		} else {
			htmlTemplateForEdit.innerHTML = `
	   
			<textarea class="edit-textarea" name="edit-area"  rows="7"  > ${currentObjOfTheCommentBeingInvoked[0].content} </textarea>
			<button class="update-content-btn"  >UPDATE</button>
		
	`;
			contentToBeEdited.replaceWith(htmlTemplateForEdit);
		}

		htmlTemplateForEdit.lastElementChild.addEventListener("click", (e) => {
			updateEditedPost(e, dispatch, selectedCommentSectionRef);
		});

		return { ...state };
	}

	if (action.type === "UPDATE_EDITED_COMMENT") {
		const { selectedCommentSectionRef, ContentToBeUpdated, checkIfSectionIsAReplyPage, htmlElemToBeReplaced } = action.payload;

		let currentObjOfTheCommentBeingInvoked = state.CommentDatas.filter((elem) => {
			return elem.id === parseInt(selectedCommentSectionRef.current.dataset.id);
		});
		let htmlTemplateForUpdate = document.createElement("div");
		htmlTemplateForUpdate.setAttribute("class", "comment-text-container");

		if (checkIfSectionIsAReplyPage.classList.contains("reply-page")) {
			let currentObjOfTheReplyBeingInvoked = currentObjOfTheCommentBeingInvoked[0].replies.find((elem) => {
				return elem.id === parseInt(checkIfSectionIsAReplyPage.dataset.id);
			});

			currentObjOfTheReplyBeingInvoked.content = ContentToBeUpdated.replace(`@${currentObjOfTheReplyBeingInvoked.replyingTo},`, "");

			htmlTemplateForUpdate.innerHTML = `
		
			<p class="comment-text">
				<b class="link-to-repliedUser">@${currentObjOfTheReplyBeingInvoked.replyingTo}
						</b>
			
			${currentObjOfTheReplyBeingInvoked.content}</p>	   `;
			htmlElemToBeReplaced.replaceWith(htmlTemplateForUpdate);
		} else {
			currentObjOfTheCommentBeingInvoked[0].content = ContentToBeUpdated;
			htmlTemplateForUpdate.innerHTML = ` <p class="comment-text">${currentObjOfTheCommentBeingInvoked[0].content}</p>
					   `;
		}

		htmlElemToBeReplaced.replaceWith(htmlTemplateForUpdate);

		return { ...state };
	}
};
