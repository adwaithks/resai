/* eslint-disable no-undef */

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
	// Check if the URL has changed and the tab has completed loading
	if (changeInfo.url) {
		// Inject content script into the updated tab
		chrome.tabs.executeScript(tabId, { file: "content-script.js" });
	}
});

chrome.sidePanel
	.setPanelBehavior({ openPanelOnActionClick: true })
	.catch((error) => console.error(error));
