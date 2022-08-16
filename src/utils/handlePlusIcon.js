export const handlePlusIcon = (e, dispatch, selectedCommentSectionRef) => {
	let checkIfSectionIsAReplyPage = e.currentTarget.parentElement.parentElement;

	const action = {
		type: "INCREASE-SCORE-VALUE",
		payload: { selectedCommentSectionRef, checkIfSectionIsAReplyPage },
	};
	dispatch(action);
};
