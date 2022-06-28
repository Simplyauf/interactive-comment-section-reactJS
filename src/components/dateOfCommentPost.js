// FUNCTIONS THAT GET THE TIME  DIFFS BETWEEN THE DATE OF POST AND CURRENT TIME

export function getPostedDate(dateOfPost, newReply = {}) {
	let currentDate = new Date();
	const t = currentDate.getTime() - dateOfPost.getTime();

	const onemonth = 30 * 24 * 60 * 60 * 1000;
	const oneweek = 7 * 24 * 60 * 60 * 1000;
	const oneDay = 24 * 60 * 60 * 1000;
	const oneHour = 60 * 60 * 1000;
	const onemin = 60 * 1000;
	const oneSec = 1000;

	let month = Math.floor(t / onemonth);
	let week = Math.floor(t / oneweek);
	let day = Math.floor(t / oneDay);

	let hour = Math.floor(t / oneHour);
	let min = Math.floor(t / onemin);
	let sec = Math.floor(t / oneSec);

	let datePosted;
	if (sec <= 60) {
		// console.log(sec);
		sec <= 1 ? (datePosted = `${sec}second`) : (datePosted = `${sec}seconds`);
	} else if (sec > 60 && min < 60) {
		min <= 1 ? (datePosted = `${min}minute`) : (datePosted = `${min}minutes`);
	} else if (min > 60 && hour <= 24) {
		hour <= 1 ? (datePosted = `${hour}hour`) : (datePosted = `${hour}hours`);
	} else if (hour > 24 && day <= 7) {
		day <= 1 ? (datePosted = `${day}day`) : (datePosted = `${day}days`);
	} else if (day > 7 && day <= 30) {
		// console.log(week);
		week <= 1 ? (datePosted = `${week}week`) : (datePosted = `${week}weeks`);
	} else if (day > 30 && month <= 12) {
		month <= 1 ? (datePosted = `${month}month`) : (datePosted = `${month}months`);
	} else {
		console.log("no");
	}

	newReply.createdAt = `${datePosted} ago`;
}
