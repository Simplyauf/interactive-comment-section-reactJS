import { updateEditedPost } from "./updateEditedPosted";

export const editComment = (e, dispatch, selectedCommentSectionRef) => {
	const contentToBeEdited = e.currentTarget.parentElement.previousSibling.previousSibling;

	let checkIfSectionIsAReplyPage = e.currentTarget.parentElement.parentElement;
	let htmlTemplateForEdit = document.createElement("div");

	htmlTemplateForEdit.setAttribute("class", "comment-text-container");
	dispatch({ type: "EDIT_A_COMMENT", payload: { selectedCommentSectionRef, htmlTemplateForEdit, contentToBeEdited, dispatch, checkIfSectionIsAReplyPage, updateEditedPost } });

	e.currentTarget.parentElement.classList.add("makeEdit-Delete-btn-unclickable");
};
