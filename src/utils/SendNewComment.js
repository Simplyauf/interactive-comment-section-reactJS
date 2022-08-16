import { getPostedDate } from "./dateOfCommentPost";
import { data } from "../jsonDatas/data";

export const sendNewCommentFn = (e, dispatch) => {
	let newCommentContentTextarea = e.currentTarget.parentElement.firstElementChild;
	const { currentUser } = data;

	// PREVENT MULTI SPACE AT THE BEGINNING OF INPUT
	newCommentContentTextarea.addEventListener("input", () => {
		newCommentContentTextarea.value = newCommentContentTextarea.value ? newCommentContentTextarea.value.trimStart() : "";
	});

	if (newCommentContentTextarea.value) {
		let newComment = {
			content: newCommentContentTextarea.value,
			score: 0,
			createdAt: `recently `,
			timestamp: new Date(),
			user: {
				image: {
					png: currentUser.image.png,
					webp: currentUser.image.webp,
				},
				username: currentUser.username,
			},
			replies: [],
		};
		let commentAndPostDate = newComment.timestamp;
		setInterval(getPostedDate, 1000, commentAndPostDate, newComment);

		dispatch({ type: "ADD_NEW_COMMENT", payload: { newComment } });
	} else {
		alert("Comments cant be empty");
	}
};
