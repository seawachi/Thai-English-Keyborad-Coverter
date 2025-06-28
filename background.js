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
// function convertSelectedText(keyMapping) {
//   function convertText(text) {
//     return text.split('').map(char => keyMapping[char] || char).join('');
//   }

//   const activeElement = document.activeElement;
//   if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
//     const selectedText = activeElement.value.substring(activeElement.selectionStart, activeElement.selectionEnd);
//     if (!selectedText) {
//       alert("No text selected in input field!");
//       return;
//     }

//     const convertedText = convertText(selectedText);
//     const start = activeElement.selectionStart;
//     activeElement.setRangeText(convertedText);
//     activeElement.selectionStart = activeElement.selectionEnd = start + convertedText.length;
//   } else {
//     alert("Please select text inside an input field or textarea.");
//   }
// }

function convertSelectedText(keyMapping) {
  function convertText(text) {
    return text.split('').map(char => keyMapping[char] || char).join('');
  }

  const active = document.activeElement;

  // Case 1: inside <input> or <textarea>
  if (
    active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA") &&
    typeof active.selectionStart === "number"
  ) {
    const start = active.selectionStart;
    const end = active.selectionEnd;

    if (start === end) {
      alert("Please highlight some text inside the input field.");
      return;
    }

    const selected = active.value.slice(start, end);
    const converted = convertText(selected);

    active.setRangeText(converted);
    active.selectionStart = active.selectionEnd = start + converted.length;
    return;
  }

  // Case 2: contenteditable or general page text
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0 || sel.toString().length === 0) {
    alert("Please highlight some text to convert.");
    return;
  }

  const range = sel.getRangeAt(0);
  const selectedText = range.toString();
  const converted = convertText(selectedText);

  range.deleteContents();
  range.insertNode(document.createTextNode(converted));

  // Move cursor to end
  sel.removeAllRanges();
  const newRange = document.createRange();
  newRange.setStartAfter(range.endContainer);
  sel.addRange(newRange);
}