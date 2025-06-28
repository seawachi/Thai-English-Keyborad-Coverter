// import { keyMapping } from './keyMapping.js';

document.addEventListener('DOMContentLoaded', () => {
  const keyMapping = {
      // Lowercase: Thai → English
      "ๅ": "1", "/": "2", "-": "3", "ภ": "4", "ถ": "5", "ุ": "6", "ึ": "7", "ค": "8", "ต": "9", "จ": "0",
      "ข": "-", "ช": "=", "ๆ": "q", "ไ": "w", "ำ": "e", "พ": "r", "ะ": "t", "ั": "y", "ี": "u", "ร": "i",
      "น": "o", "ย": "p", "บ": "[", "ล": "]", "ฃ": "\\", "ฟ": "a", "ห": "s", "ก": "d", "ด": "f", "เ": "g",
      "้": "h", "่": "j", "า": "k", "ส": "l", "ว": ";", "ง": "'", "ผ": "z", "ป": "x", "แ": "c", "อ": "v",
      "ิ": "b", "ื": "n", "ท": "m", "ม": ",", "ใ": ".", "ฝ": "/", 
      
      // Uppercase: Thai → English
      "+": "!", "/": "@", "-": "#", "ภ": "$", "ภ": "%", "ู": "^", "฿": "&", "ค": "*", "ต": "(", "จ": ")",
      "๘": "_", "๙": "+", "๐": "Q", "\"": "W", "ฎ": "E", "ฑ": "R", "ธ": "T", "ํ": "Y", "๊": "U", "ณ": "I",
      "ฯ": "O", "ญ": "P", "ฐ": "{", ",": "}", "ฅ": "|", "ฤ": "A", "ฆ": "S", "ฏ": "D", "โ": "F", "ฌ": "G",
      "็": "H", "๋": "J", "ษ": "K", "ศ": "L", "ซ": ":", ".": "\"", "(": "Z", ")": "X", "ฉ": "C", "ฮ": "V",
      "ฺ": "B", "์": "N", "?": "M", "ฒ": "<", "ฬ": ">", "ฦ": "?",
    
      // Lowercase: English → Thai
      "1": "ๅ", "2": "/", "3": "-", "4": "ภ", "5": "ถ", "6": "ุ", "7": "ึ", "8": "ค", "9": "ต", "0": "จ",
      "-": "ข", "=": "ช", "q": "ๆ", "w": "ไ", "e": "ำ", "r": "พ", "t": "ะ", "y": "ั", "u": "ี", "i": "ร",
      "o": "น", "p": "ย", "[": "บ", "]": "ล", "\\": "ฃ", "a": "ฟ", "s": "ห", "d": "ก", "f": "ด", "g": "เ",
      "h": "้", "j": "่", "k": "า", "l": "ส", ";": "ว", "'": "ง", "z": "ผ", "x": "ป", "c": "แ", "v": "อ",
      "b": "ิ", "n": "ื", "m": "ท", ",": "ม", ".": "ใ", "/": "ฝ",
    
      // Uppercase: English → Thai
      "!": "+", "@": "/", "#": "-", "$": "ภ", "%": "ถ", "^": "ู", "&": "฿", "*": "ค", "(": "ต", ")": "จ",
      "_": "๘", "+": "๙", "Q": "๐", "W": "\"", "E": "ฎ", "R": "ฑ", "T": "ธ", "Y": "ํ", "U": "๊", "I": "ณ",
      "O": "ฯ", "P": "ญ", "{": "ฐ", "}": ",", "|": "ฅ", "A": "ฤ", "S": "ฆ", "D": "ฏ", "F": "โ", "G": "ฌ",
      "H": "็", "J": "๋", "K": "ษ", "L": "ศ", ":": "ซ", "\"": ".", "Z": "(", "X": ")", "C": "ฉ", "V": "ฮ",
      "B": "ฺ", "N": "์", "M": "?", "<": "ฒ", ">": "ฬ", "?": "ฦ"
    };
  const input = document.getElementById('inputText');
  const btn = document.getElementById('convertBtn');
  const output = document.getElementById('output');

  function convertText(text) {
    return text.split('').map(c => keyMapping[c] || c).join('');
  }

  btn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) {
      output.textContent = '⚠️ Please enter some text.';
      return;
    }

    const result = convertText(text);
    output.textContent = result;

    navigator.clipboard.writeText(result).then(() => {
      btn.textContent = '✔ Copied!';
      setTimeout(() => (btn.textContent = 'Convert & Copy'), 1500);
    });
  });
});
