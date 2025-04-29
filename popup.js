import { keyMapping } from './keyMapping.js';

function convertText(text) {
  return text.split('').map(char => keyMapping[char] || char).join('');
}

document.getElementById('convertBtn').addEventListener('click', () => {
  const input = document.getElementById('inputText').value;
  const output = convertText(input);
  document.getElementById('output').textContent = output;

  // Auto copy
  navigator.clipboard.writeText(output).then(() => {
    console.log("Copied to clipboard");
  });
});
