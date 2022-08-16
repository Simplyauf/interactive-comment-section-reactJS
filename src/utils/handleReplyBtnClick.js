export const handleReplyBtnClick = (e) => {
	e.currentTarget.parentElement.nextSibling.firstElementChild.value = "";
	e.currentTarget.parentElement.nextSibling.classList.toggle("active-reply-form");
};
