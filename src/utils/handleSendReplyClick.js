import { data } from "../jsonDatas/data";
import { getPostedDate } from "./dateOfCommentPost";

export const handleSendReplyClick = (e, dispatch, selectedCommentSectionRef) => {
	
	let replyFormValueTextarea = e.currentTarget.parentElement.firstElementChild;

	//PREVENTING ENTRIES OF MULTIPLE WHITESPACE AT THE BEGINNING OF INPUT
	replyFormValueTextarea.addEventListener("input", () => {
		replyFormValueTextarea.value = replyFormValueTextarea.value ? replyFormValueTextarea.value.trimStart() : "";
	});

	if (replyFormValueTextarea.value) {
		let newReply = {
			replyingTo: e.currentTarget.parentElement.id,
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
			payload: { newReply, selectedCommentSectionRef },
		};
		dispatch(action);

		e.currentTarget.parentElement.classList.remove("active-reply-form");
	} else {
		alert("pls type in value");
	}
};
