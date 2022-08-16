export const handleMinusIcon = (e, dispatch, selectedCommentSectionRef) => {
	let checkIfSectionIsAReplyPage = e.currentTarget.parentElement.parentElement;
	const action = {
		type: "DECREASE-SCORE-VALUE",
		payload: { selectedCommentSectionRef, checkIfSectionIsAReplyPage },
	};
	dispatch(action);
};
