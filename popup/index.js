const sender = document.getElementById('sender');
const sparkler = document.getElementById('sparkle');
const message = document.getElementById('message');

sparkler.addEventListener('click', sparkle);
sender.addEventListener('click', refresh);

function refresh() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, { command: 'refresh' });
  });
}

function sparkle() {
  console.log('*****sparkle');
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, { command: 'sparkle' });
  });
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(
    sender.tab
      ? 'from a content script:' + sender.tab.url
      : 'from the extension'
  );
  message.innerText = request;
});
