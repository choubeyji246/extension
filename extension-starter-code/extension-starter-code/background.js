
chrome.runtime.onConnect.addListener(function(port) {
  if (port.name === "contentScript") {
    console.log("first");
    port.onMessage.addListener(function(msg) {
      if (msg.type === "backgroundReady") {
        console.log("second");
        // Send a message to the background script
        chrome.runtime.sendMessage({ type: "ASK_KURSOR" });
      }
    });
    port.postMessage({ type: "contentScriptReady" });
  }
 
});

// Background script
chrome.runtime.onConnect.addListener(function(port) {
  if (port.name === "contentScript") {
    port.postMessage({ type: "backgroundReady" });
  }
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type === "SELECTED_TEXT") {
    const selectedText = message.text;
    // Use an API or other method to get the translation result
    const translationResult = "This is a translation result.";
    // Send the translation result back to the content script
    chrome.tabs.sendMessage(sender.tab.id, { type: "TRANSLATION_RESULT", selectedText, translationResult });
  }
});

// Create a context menu item
chrome.contextMenus.create({
  id: "ask-kursor",
  title: "Ask Kursor",
  contexts: ["all"],
});

// Listen for when the user clicks on the context menu item
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "ask-kursor") {
    // Send a message to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { type: "ASK_KURSOR" });
    });
  }
});
