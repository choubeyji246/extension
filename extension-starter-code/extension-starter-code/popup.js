let selectedText;

// Get the selected text from the content script
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {type: "GET_SELECTED_TEXT"}, function(response) {
    selectedText = response.selectedText;
    document.getElementById("selected-text").innerText = selectedText;
    document.getElementById("text-input").value = selectedText;
  });
});

// Handle button clicks
// document.getElementById("copy-button").addEventListener("click", function() {
//   const textInput = document.getElementById("text-input");
//   textInput.select();
//   document.execCommand("copy");
// });
const copyButton = document.getElementById("copy-button");
copyButton.addEventListener("click", async () => {
  const textInput = document.getElementById("text-input");
  const textToCopy = textInput.value;
  try {
    await navigator.clipboard.writeText(textToCopy);
    console.log("Text copied to clipboard successfully");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
});


document.getElementById("share-button").addEventListener("click", function() {
  const textInput = document.getElementById("text-input");
  const shareUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(textInput.value);
  window.open(shareUrl, "_blank");
});

document.getElementById("edit-button").addEventListener("click", function() {
  const textInput = document.getElementById("text-input");
  textInput.disabled = false;
  textInput.focus();
});

document.getElementById("save-button").addEventListener("click", function() {
  const textInput = document.getElementById("text-input");
  textInput.disabled = true;
  selectedText = textInput.value;
  document.getElementById("selected-text").innerText = selectedText;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: "UPDATE_SELECTED_TEXT", selectedText: selectedText});
  });
});

document.addEventListener("DOMContentLoaded", function() {
  // Send a message to the background script
  chrome.runtime.sendMessage({ type: "CONTENT_SCRIPT_LOADED" });
});

