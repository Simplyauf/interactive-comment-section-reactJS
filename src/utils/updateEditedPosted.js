export const updateEditedPost = (e, dispatch, selectedCommentSectionRef) => {
	let ContentToBeUpdated = e.currentTarget.previousElementSibling.value;

	let htmlElemToBeReplaced = e.currentTarget.parentElement;

	let checkIfSectionIsAReplyPage = e.currentTarget.parentElement.parentElement;
	dispatch({ type: "UPDATE_EDITED_COMMENT", payload: { selectedCommentSectionRef, ContentToBeUpdated, checkIfSectionIsAReplyPage, htmlElemToBeReplaced } });

	e.currentTarget.parentElement.nextElementSibling.nextElementSibling.classList.remove("makeEdit-Delete-btn-unclickable");
};
