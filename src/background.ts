// Listen for extension icon clicks
chrome.action.onClicked.addListener((tab) => {
  // Inject the CSS and JS files
  chrome.scripting.insertCSS({
    target: { tabId: tab.id! },
    files: ['debugCSS.min.css']
  });
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id! },
    files: ['debugCSS.js']
  });
});

// Listen for keyboard shortcut
chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle-pin") {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const tab = tabs[0];
      if (!tab) {
        console.error("No active tab found");
        return;
      }
      chrome.scripting.insertCSS({
        target: { tabId: tab.id! },
        files: ['debugCSS.min.css']
      });
      
      chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        files: ['debugCSS.js']
      });
    });
  }
}); 