import React from "react";
import {  useReducer } from "react";
import { reducer } from "../reducer";
import { data } from "../data";
import { SingleCommentSection } from "../singleCommentSection";
import { CommentForm } from "../commentAndReply";
import { getPostedDate } from "../dateOfCommentPost";

export const commentPageContext = React.createContext();

const CommentPage = () => {
	const initialState = {
		CommentDatas: data.comments,
	};
	const [state, dispatch] = useReducer(reducer, initialState);
	const { currentUser } = data;

	// updating date of the posts using the function from ../dateofcommentPost
	for (let commentKeys of state.CommentDatas) {
		let commentAndPostDate = commentKeys.timestamp;
		setInterval(getPostedDate, 1000, commentAndPostDate, commentKeys);

		for (let repliesKeys of commentKeys.replies) {
			let commentAndPostDate = repliesKeys.timestamp;
			setInterval(getPostedDate, 1000, commentAndPostDate, repliesKeys);
		}
	}

	// SORTING THE COMMENTS BY SCORE
	state.CommentDatas.sort((x, y) => {
		return y.score - x.score;
	});

	// ADD NEW COMMENTS
	const sendNewComment = (e) => {
		let newCommentContent = e.currentTarget.parentElement.previousSibling;

		if (newCommentContent.value != 0) {
			let newComment = {
				content: newCommentContent.value,
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
