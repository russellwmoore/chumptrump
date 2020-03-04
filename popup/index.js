const sender = document.getElementById('sender');
const sparkler = document.getElementById('sparkle');
const message = document.getElementById('message');
const options = document.getElementById('options');
const add = document.getElementById('add');

sparkler.addEventListener('click', sparkle);
sender.addEventListener('click', refresh);
options.addEventListener('click', gotoOptions);
add.addEventListener('click', addWhiteList);

function addWhiteList() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, { command: 'whiteList' });
  });
}

function gotoOptions() {
  chrome.tabs.create({ url: '/options/index.html' });
}

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
