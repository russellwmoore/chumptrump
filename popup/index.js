const sender = document.getElementById('refresh');
const sparkler = document.getElementById('sparkle');
const message = document.getElementById('message');
const options = document.getElementById('options');
const add = document.getElementById('add');
const remove = document.getElementById('remove');

sparkler.addEventListener('click', sparkle);
sender.addEventListener('click', refresh);
options.addEventListener('click', gotoOptions);
add.addEventListener('click', addWhiteList);
remove.addEventListener('click', removeWhiteList);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(
    'popup/index.js',
    sender.tab
      ? 'from a content script:' + sender.tab.url
      : 'from the extension'
  );
});

function addWhiteList() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, { command: 'whiteList' }, function(
      response
    ) {
      // console.log('res', response);
      if (response) {
        updateMessage(response.location, 'added to');
      }
    });
  });
}
function removeWhiteList() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, { command: 'remove-whiteList' }, function(
      response
    ) {
      console.log('res', response);
      updateMessage(response.location, 'removed from');
    });
  });
}

function updateMessage(host, action) {
  message.innerHTML = `<p>${host} ${action} whitelist! Click refresh to see changes.</p>`;
  setTimeout(() => {
    message.innerText = '';
  }, 5000);
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
