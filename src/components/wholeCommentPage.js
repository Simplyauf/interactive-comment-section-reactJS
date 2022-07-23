import React from "react";
import { useReducer, useEffect, useState } from "react";
import { reducer } from "./reducer";
import { data } from "./data";
import { SingleCommentSection } from "./singleCommentSection";
import { CommentForm } from "./commentAndReplyForm";
import { getPostedDate } from "./dateOfCommentPost";

export const commentPageContext = React.createContext();

const CommentPage = () => {
	const initialState = {
		CommentDatas: data.comments,
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	// A dummy state to force rerender of time of post creation at the start the app since deep mutation of objects dont cause rerender but a state change does
	const [commentTime, setCommentTime] = useState("");

	const { currentUser } = data;
	const { CommentDatas } = state;

	// updating date of the posts onLaunch using the function from ../dateofcommentPost
	async function updateTimeStampsOfPosts(CommentDatas) {
		for (let commentKeys of CommentDatas) {
			let commentAndPostDate = commentKeys.timestamp;
			setInterval(getPostedDate, 1000, commentAndPostDate, commentKeys);
			await getPostedDate(commentAndPostDate, commentKeys);

			for (let repliesKeys of commentKeys.replies) {
				let commentAndPostDate = repliesKeys.timestamp;
				setInterval(getPostedDate, 1000, commentAndPostDate, repliesKeys);
				await getPostedDate(commentAndPostDate, repliesKeys);
				setCommentTime(commentAndPostDate);
			}
		}
	}

	console.log(CommentDatas);
	useEffect(() => {
		updateTimeStampsOfPosts(CommentDatas);
	}, [CommentDatas]);

	// SORTING THE COMMENTS BY SCORE
	state.CommentDatas.sort((x, y) => {
		return y.score - x.score;
	});

	// ADD NEW COMMENTS
	const sendNewComment = (e) => {
		let newCommentContentTextarea = e.currentTarget.parentElement.firstElementChild;

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

	return (
		<commentPageContext.Provider value={{ state, dispatch }}>
			{state.CommentDatas.map((commentData) => {
				return <SingleCommentSection key={commentData.id} commentData={commentData} />;
			})}
			<CommentForm sendNewComment={sendNewComment} />
		</commentPageContext.Provider>
	);
};

export default CommentPage;
