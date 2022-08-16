import React from "react";
import { useReducer, useEffect, useState } from "react";
import { reducer } from "../Reducers/reducer";
import { data } from "../jsonDatas/data";
import { SingleCommentSection } from "./singleCommentSection";
import { CommentForm } from "./commentAndReplyForm";
import { getPostedDate } from "../utils/dateOfCommentPost";

export const commentPageContext = React.createContext();

const CommentPage = () => {
	const initialState = {
		CommentDatas: data.comments,
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	// A dummy state to force rerender of time of post creation at the start the app since deep mutation of objects dont cause rerender but a state change does
	const [commentTime, setCommentTime] = useState("");

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

	useEffect(() => {
		updateTimeStampsOfPosts(CommentDatas);
	}, [CommentDatas]);

	// SORTING THE COMMENTS BY SCORE
	state.CommentDatas.sort((x, y) => {
		return y.score - x.score;
	});

	// ADD NEW COMMENTS

	return (
		<commentPageContext.Provider value={{ state, dispatch }}>
			{state.CommentDatas.map((commentData) => {
				return <SingleCommentSection key={commentData.id} commentData={commentData} />;
			})}
			<CommentForm />
		</commentPageContext.Provider>
	);
};

export default CommentPage;
