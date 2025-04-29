import { keyMapping } from './keyMapping.js';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "convertThaiEnglish",
    title: "Switch Thai ⇄ English (Input Fields)",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab.url.startsWith("http")) {
    console.warn("Cannot run script on this page:", tab.url);
    return;
  }

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: convertSelectedText,
    args: [keyMapping]  // 🔥 Pass mapping as argument
  });
});

// Now accept keyMapping as argument
function convertSelectedText(keyMapping) {
  function convertText(text) {
    return text.split('').map(char => keyMapping[char] || char).join('');
  }

  const activeElement = document.activeElement;
  if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
    const selectedText = activeElement.value.substring(activeElement.selectionStart, activeElement.selectionEnd);
    if (!selectedText) {
      alert("No text selected in input field!");
      return;
    }

    const convertedText = convertText(selectedText);
    const start = activeElement.selectionStart;
    activeElement.setRangeText(convertedText);
    activeElement.selectionStart = activeElement.selectionEnd = start + convertedText.length;
  } else {
    alert("Please select text inside an input field or textarea.");
  }
}
