chrome.runtime.onInstalled.addListener(function() {
  console.log('installed!');
  chrome.storage.sync.set({
    chumpTrumpDictionary: {
      Trump: 'Chump',
      TRUMP: 'CHUMP',
      trump: 'chump',
      mcconnell: 'mcturtle',
      McConnell: 'McTurtle',
      MCCONNELL: 'MCTURTLE',
      Conway: '"Miss Misinformation" Conway',
      CONWAY: '"Miss Misinformation" CONWAY',
      conway: '"miss misinformation" conway',
      Pence: '"Def not Gay" Pence',
      PENCE: '"DEF NOT GAY" PENCE',
      pence: 'def not gay" pence',
    },
    chumpTrumpWhiteList: {
      'mail.google.com': true,
    },
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(
    'background/index.js',
    sender.tab
      ? 'from a content script:' + sender.tab.url
      : 'from the extension'
  );

  const loc = window.location.host;
  sendResponse({ farewell: 'goodbye', location: loc });
});
