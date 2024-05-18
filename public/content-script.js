const getTweetContent = () => {
	return document.querySelector("[data-testid='tweetText']").textContent;
};

const insertAiGenerateBtn = () => {
	const aiGenerateButton = document.createElement("button");
	aiGenerateButton.textContent = "generate";
	const parent = document.querySelector(
		'[data-testid="tweetButtonInline"]'
	).parentNode;
	parent.append(aiGenerateButton);
};

document.onload = () => {
	insertAiGenerateBtn();
	console.log(getTweetContent());
};
