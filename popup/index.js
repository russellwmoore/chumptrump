const sender = document.getElementById('sender');
const message = document.getElementById('message');

sender.addEventListener('click', testMessage);

function testMessage() {
  message.innerText = 'Trying';
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, { messageFromPopup: 'From Popup. Hi!' });
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
