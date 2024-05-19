const getTweetContent = () => {
	const user = document.querySelector("article").textContent;
	const tweet = document.querySelector(
		"[data-testid='tweetText']"
	).textContent;

	const tweetSlice = tweet.slice(0, 5);
	const [userPortion, tweetPortion] = user.split(tweetSlice);
	const [username, handle] = userPortion.split("@");

	console.log({ username, handle });
	console.log({ userPortion, tweetPortion });

	const allTweets = document.querySelectorAll("article");
	let completeTweet = "";
	let replies = "";
	Array.from(allTweets).forEach((tweet) => {
		if (
			tweet.textContent.includes(username) &&
			tweet.textContent.includes(`@${handle}`)
		) {
			completeTweet += tweet.querySelector(
				"[data-testid='tweetText']"
			).textContent;
		} else {
			replies +=
				tweet.querySelector("[data-testid='tweetText']").textContent +
				"\n-----\n";
		}
	});
	console.log({ completeTweet });
	return { replies, completeTweet };
};

// const getReplyBtn = () => {
// 	return document.querySelector("[data-testid='tweetButtonInline']");
// };

// const getAiGenerateBtn = () => {
// 	const tweetContent = getTweetContent();

// 	const aiGenerateButton = document.createElement("button");
// 	aiGenerateButton.textContent = "generate";
// 	aiGenerateButton.onclick = async () => {
// 		const res = await fetch(
// 			"http://localhost:5000/api/v1/services/generate",
// 			{
// 				post_content: tweetContent,
// 				platform: "twitter",
// 			}
// 		);
// 		const data = await res.json();
// 		console.log(data);
// 	};

// 	return aiGenerateButton;
// };
const insertAiGenerateBtn = async () => {
	console.log("inside");
	const { completeTweet, replies } = getTweetContent();
	console.log({ completeTweet, replies });

	const aiGenerateButton = document.createElement("button");
	aiGenerateButton.textContent = "generate";
	aiGenerateButton.onclick = async () => {
		try {
			const res = await fetch(
				"http://localhost:5000/api/v1/services/generate",
				{
					method: "POST", // Specify method as POST
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						post_content: completeTweet,
						replies: replies,
						platform: "twitter",
					}),
				}
			);
			const data = await res.json();
			console.log(data);
		} catch (error) {
			console.error("Error:", error);
		}
	};
	console.log("test2");

	const tweetButton = document.querySelector(
		"[data-testid='tweetButtonInline']"
	);
	if (tweetButton) {
		tweetButton.parentElement.append(aiGenerateButton);
	} else {
		console.error("Tweet button not found.");
	}
};

window.onload = () => {
	setTimeout(() => {
		insertAiGenerateBtn();
	}, 3000);
};
