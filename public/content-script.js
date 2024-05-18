const getTweetContent = () => {
	return document.querySelector("[data-testid='tweetText']").textContent;
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
	const tweetContent = getTweetContent();
	console.log(tweetContent);

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
						post_content: tweetContent,
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
		insertAiGenerateBtn;
	}, 1000);
};
