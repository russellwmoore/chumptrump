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
