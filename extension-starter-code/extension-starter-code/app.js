import React, { useState } from "react";
import FloatingWindow from "./components/FloatingWindow";

function App() {
  const [showFloatingWindow, setShowFloatingWindow] = useState(false);
  const [selectedText, setSelectedText] = useState("");

  function handleAskKursor() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { type: "ASK_KURSOR" },
        function (response) {
          if (response && response.selectedText) {
            setSelectedText(response.selectedText);
            setShowFloatingWindow(true);
          }
        }
      );
    });
  }

  return (
    <div>
      <h1>Ask Kursor Extension</h1>
      <button onClick={handleAskKursor}>Ask Kursor</button>
      {showFloatingWindow && <FloatingWindow selectedText={selectedText} onClose={() => setShowFloatingWindow(false)} />}
    </div>
  );
}

export default App;
