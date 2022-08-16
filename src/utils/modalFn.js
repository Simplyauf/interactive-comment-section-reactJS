export const showModalWarningForDelete = (e) => {
	e.currentTarget.parentElement.nextSibling.classList.add("activemodal");
};

export const cancelModalWarning = (e) => {
	e.currentTarget.parentElement.parentElement.parentElement.classList.remove("activemodal");
};

export const ConfirmdeleteComment = (e, dispatch, selectedCommentSectionRef) => {
	e.currentTarget.parentElement.parentElement.parentElement.classList.remove("activemodal");

	let modalContainerId = e.currentTarget.parentElement.parentElement.parentElement.dataset.id;

	let checkIfSectionIsAReplyPage = e.currentTarget.parentElement.parentElement.parentElement.parentElement;

	dispatch({ type: "DELETE_A_COMMENT", payload: { selectedCommentSectionRef, checkIfSectionIsAReplyPage, modalContainerId } });
};
