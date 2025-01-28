// @ts-ignore
function toggleDebugCSS(tab) {
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		func: () => {
			if (document.getElementById("debugCSS") && document.getElementById("debugJS")) {
				// @ts-ignore
				document.getElementsByTagName("head")[0]?.removeChild(document?.getElementById("debugCSS"));
				// @ts-ignore
				document.getElementsByTagName("head")[0]?.removeChild(document?.getElementById("debugJS"));
				// @ts-ignore
				document.getElementsByTagName("body")[0]?.removeChild(document?.getElementById("debugCSSInfoBar"));
			} else {
				const debugCSS = document.createElement("link");
				debugCSS.rel = "stylesheet";
				debugCSS.type = "text/css";
				debugCSS.href = chrome.runtime.getURL("/debugCSS.min.css");
				debugCSS.id = "debugCSS";
				document.getElementsByTagName("head")[0]?.appendChild(debugCSS);

				const debugJS = document.createElement("script");
				debugJS.type = "text/javascript";
				debugJS.src = chrome.runtime.getURL("/debugCSS.js");
				debugJS.id = "debugJS";
				document.getElementsByTagName("head")[0]?.appendChild(debugJS);

				const debugCSSInfoBar = document.createElement("div");
				debugCSSInfoBar.id = "debugCSSInfoBar";
				document.getElementsByTagName("body")[0]?.appendChild(debugCSSInfoBar);
			}
		},
	});
}

// Listen for shift+ alt+ c
// chrome.commands.onCommand.addListener((command) => {
// 	console.log("command", command);
// 	if (command === "toggle-pin") {
// 		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
// 			toggleDebugCSS(tabs[0]);
// 		});
// 	}
// });

// Listen for toolbar icon clicks
chrome.action.onClicked.addListener((tab) => {
	console.log("toolbar icon clicked");
	toggleDebugCSS(tab);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.command === "toggle-pin") {
		toggleDebugCSS(sender.tab);
	}
});
