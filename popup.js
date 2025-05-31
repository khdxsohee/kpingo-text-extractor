const output = document.getElementById("output");
const wordCount = document.getElementById("wordCount");

document.getElementById("extractBtn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => document.body.innerText
    }, (results) => {
      const extractedText = results[0].result;
      output.value = extractedText;
      updateWordCount(extractedText);
    });
  });
});

document.getElementById("copyBtn").addEventListener("click", () => {
  navigator.clipboard.writeText(output.value)
    .then(() => alert("Copied to clipboard!"))
    .catch(err => alert("Failed to copy"));
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  const blob = new Blob([output.value], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "extracted-text.txt";
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById("toggleDark").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

function updateWordCount(text) {
  const count = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  wordCount.textContent = `Words: ${count}`;
}
