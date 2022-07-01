export const reducer = (state, action) => {
	const { CommentDatas } = state;

	if (action.type === "ADD_NEW_REPLY") {
		const { newReply, currentCommentSectionRef } = action.payload;
		let currentObjOfTheCommentBeingInvoked = state.CommentDatas.filter((elem) => {
			return elem.id === parseInt(currentCommentSectionRef.current.dataset.id);
		});

		newReply.id = currentObjOfTheCommentBeingInvoked[0].replies.length + 1;

		currentObjOfTheCommentBeingInvoked[0].replies.push(newReply);

		return { ...state, CommentDatas: state.CommentDatas };
	}

	if (action.type === "INCREASE-SCORE-VALUE") {
		const { currentCommentSectionRef, checkIfSectionIsAReplyPage } = action.payload;
		let currentObjOfTheCommentBeingInvoked = state.CommentDatas.filter((elem) => {
			return elem.id === parseInt(currentCommentSectionRef.current.dataset.id);
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
		const { currentCommentSectionRef, checkIfSectionIsAReplyPage } = action.payload;
		let currentObjOfTheCommentBeingInvoked = state.CommentDatas.filter((elem) => {
			return elem.id === parseInt(currentCommentSectionRef.current.dataset.id);
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
		const { currentCommentSectionRef, checkIfSectionIsAReplyPage } = action.payload;
		let currentObjOfTheCommentBeingInvoked = state.CommentDatas.filter((elem) => {
			return elem.id === parseInt(currentCommentSectionRef.current.dataset.id);
		});
		if (checkIfSectionIsAReplyPage.classList.contains("reply-page")) {
			console.log(currentObjOfTheCommentBeingInvoked[0].replies);
			let newReplies = currentObjOfTheCommentBeingInvoked[0].replies.filter((elem) => {
				console.log(typeof checkIfSectionIsAReplyPage.dataset.id, typeof elem.id);
				return elem.id !== parseInt(checkIfSectionIsAReplyPage.dataset.id);
			});
			console.log(newReplies);
			currentObjOfTheCommentBeingInvoked[0].replies = [...newReplies];
		} else {
			let newComments = state.CommentDatas.filter((elem) => {
				return elem.id !== parseInt(currentCommentSectionRef.current.dataset.id);
			});
			state.CommentDatas = [...newComments];
		}

		return { ...state };
	}

	if (action.type === "EDIT_A_COMMENT") {
		const { currentCommentSectionRef, htmlTemplateForEdit, contentToBeEdited, checkIfSectionIsAReplyPage, updateEditedPost } = action.payload;
		let currentObjOfTheCommentBeingInvoked = state.CommentDatas.filter((elem) => {
			return elem.id === parseInt(currentCommentSectionRef.current.dataset.id);
		});

		if (checkIfSectionIsAReplyPage.classList.contains("reply-page")) {
			let currentObjOfTheReplyBeingInvoked = currentObjOfTheCommentBeingInvoked[0].replies.find((elem) => {
				return elem.id === parseInt(checkIfSectionIsAReplyPage.dataset.id);
			});

			htmlTemplateForEdit.innerHTML = `
	   
			<textarea class="edit-textarea" name="edit-area" id="" rows="7"  >@${currentObjOfTheReplyBeingInvoked.replyingTo}, ${currentObjOfTheReplyBeingInvoked.content} </textarea>
			<button class="update-content-btn" >UPDATE</button>
		
	`;
			contentToBeEdited.replaceWith(htmlTemplateForEdit);
		} else {
			htmlTemplateForEdit.innerHTML = `
	   
			<textarea class="edit-textarea" name="edit-area" id="" rows="7"  > ${currentObjOfTheCommentBeingInvoked[0].content} </textarea>
			<button class="update-content-btn"  >UPDATE</button>
		
	`;
			contentToBeEdited.replaceWith(htmlTemplateForEdit);
		}

		htmlTemplateForEdit.lastElementChild.addEventListener("click", (e) => {
			updateEditedPost(e);
		});

		return { ...state };
	}

	if (action.type === "UPDATE_EDITED_COMMENT") {
		const { currentCommentSectionRef, ContentToBeUpdated, checkIfSectionIsAReplyPage, htmlElemToBeReplaced } = action.payload;
		console.log(ContentToBeUpdated);
		let currentObjOfTheCommentBeingInvoked = state.CommentDatas.filter((elem) => {
			return elem.id === parseInt(currentCommentSectionRef.current.dataset.id);
		});
		let htmlTemplateForUpdate = document.createElement("div");
		htmlTemplateForUpdate.setAttribute("class", "comment-text-container");

		if (checkIfSectionIsAReplyPage.classList.contains("reply-page")) {
			let currentObjOfTheReplyBeingInvoked = currentObjOfTheCommentBeingInvoked[0].replies.find((elem) => {
				return elem.id === parseInt(checkIfSectionIsAReplyPage.dataset.id);
			});
			console.log(currentObjOfTheReplyBeingInvoked);
			currentObjOfTheReplyBeingInvoked.content = ContentToBeUpdated.replace(`@${currentObjOfTheReplyBeingInvoked.replyingTo},`, "");
			console.log(currentObjOfTheReplyBeingInvoked);
			console.log(ContentToBeUpdated);

			htmlTemplateForUpdate.id = `${currentObjOfTheReplyBeingInvoked.user.username}`;

			htmlTemplateForUpdate.innerHTML = `
		
			<p className="comment-text">
				<b>		<a href='#${currentObjOfTheReplyBeingInvoked.replyingTo}'>@${currentObjOfTheReplyBeingInvoked.replyingTo}</a>
						</b>
			
			${currentObjOfTheReplyBeingInvoked.content}</p>	   `;
			htmlElemToBeReplaced.replaceWith(htmlTemplateForUpdate);
		} else {
			currentObjOfTheCommentBeingInvoked[0].content = ContentToBeUpdated;
			htmlTemplateForUpdate.innerHTML = ` <p className="comment-text">${currentObjOfTheCommentBeingInvoked[0].content}</p>
					   `;
		}

		htmlElemToBeReplaced.replaceWith(htmlTemplateForUpdate);

		return { ...state };
	}
};
