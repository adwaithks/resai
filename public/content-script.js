/* eslint-disable no-undef */
var completeTweet = "";
var replies = "";

var getTweetContent = () => {
	const user = document.querySelector("article").textContent || "";
	const tweet =
		document.querySelector("[data-testid='tweetText']").textContent || "";

	const tweetSlice = tweet.slice(0, 5);
	const [userPortion] = user.split(tweetSlice);
	const [username, handle] = userPortion.split("@");

	const allTweets = document.querySelectorAll("article");
	let completeTweet = "";
	let replies = "";
	Array.from(allTweets).forEach((tweet) => {
		if (
			tweet.textContent.includes(username) &&
			tweet.textContent.includes(`@${handle}`)
		) {
			completeTweet +=
				tweet.querySelector("[data-testid='tweetText']")?.textContent ||
				"";
		} else {
			replies +=
				tweet.querySelector("[data-testid='tweetText']")?.textContent ||
				"" + "\n-----\n";
		}
	});

	return { replies, completeTweet };
};

const loader = () => {
	// Create the loader container
	const loaderContainer = document.createElement("div");
	loaderContainer.style.display = "flex";
	loaderContainer.style.justifyContent = "center";
	loaderContainer.style.alignItems = "center";
	loaderContainer.style.gap = "4px";

	// CSS for the dots
	const dotStyle = `
        display: inline-block;
        width: 8px;
        height: 8px;
        background-color: white;
        border-radius: 50%;
        animation: dotBounce 1s infinite ease-in-out;
    `;

	// Create the dots
	for (let i = 0; i < 3; i++) {
		const dot = document.createElement("div");
		dot.style.cssText = dotStyle;
		dot.style.animationDelay = `${i * 0.2}s`;
		loaderContainer.appendChild(dot);
	}

	// Add keyframes for the dot bounce animation
	const styleSheet = document.createElement("style");
	styleSheet.type = "text/css";
	styleSheet.innerText = `
        @keyframes dotBounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-10px);
            }
            60% {
                transform: translateY(-5px);
            }
        }
    `;
	document.head.appendChild(styleSheet);

	return loaderContainer;
};

const getAiGenerateBtn = () => {
	const aiGenerateButton = document.createElement("button");
	aiGenerateButton.setAttribute("data-testid", "resai");
	aiGenerateButton.style.border = "none";
	aiGenerateButton.style.outline = "none";
	aiGenerateButton.style.borderRadius = "20px";
	aiGenerateButton.style.padding = "10px";
	aiGenerateButton.style.paddingLeft = "15px";
	aiGenerateButton.style.height = "35px";
	aiGenerateButton.style.display = "flex";
	aiGenerateButton.style.alignItems = "center";
	aiGenerateButton.style.justifyContent = "center";
	aiGenerateButton.style.paddingRight = "15px";

	aiGenerateButton.style.marginLeft = "10px";
	aiGenerateButton.style.cursor = "pointer";
	aiGenerateButton.style.fontFamily = "TwitterChirp";
	aiGenerateButton.style.fontWeight = "500";
	aiGenerateButton.style.color = "white";
	aiGenerateButton.style.background =
		"linear-gradient(45deg, #018224, #00a651)";

	aiGenerateButton.textContent = "Ask AI";
	return aiGenerateButton;
};

var insertAiGenerateBtn = async () => {
	let aiGenerateButton = getAiGenerateBtn();

	if (document.querySelector("[data-testid='resai']")) {
		const res = getTweetContent();
		completeTweet = res.completeTweet;
		replies = res.replies;
		return;
	}

	const res = getTweetContent();
	completeTweet = res.completeTweet;
	replies = res.replies;

	aiGenerateButton.onclick = async (e) => {
		const loaderEl = loader();

		try {
			e.stopPropagation();
			aiGenerateButton.textContent = "";
			aiGenerateButton.append(loaderEl);
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

			await navigator.clipboard.writeText(data.data);

			console.log(data);
		} catch (error) {
			console.error("Error:", error);
		} finally {
			loaderEl.remove();
			aiGenerateButton.textContent = "Copied to clipboard!";
			setTimeout(() => {
				aiGenerateButton.textContent = "Ask AI";
			}, 1500);
		}
	};

	const toolBar = document.querySelector("[data-testid='toolBar']");
	toolBar.style.display = "flex";
	toolBar.style.alignItems = "flex-end";
	toolBar.style.justifyContent = "center";

	if (toolBar) {
		toolBar.append(aiGenerateButton);
	} else {
		console.error("Tweet button not found.");
	}
};

function checkTwitterPath(path) {
	const regex = /^https:\/\/x\.com\/[^/]+\/status\/[^/]+$/;
	return regex.test(path);
}

window.onload = () => {
	setTimeout(() => {
		insertAiGenerateBtn();
	}, 2000);

	let timeoutId;

	document.addEventListener("mousemove", () => {
		if (timeoutId) return;

		const location = window.location.href;
		console.log({ location, check: checkTwitterPath(location) });
		if (checkTwitterPath(location)) {
			insertAiGenerateBtn();
		}

		timeoutId = setTimeout(() => {
			timeoutId = null; //
		}, 100);
	});
};
