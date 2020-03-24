function save_options() {
  let trumpSub = document.getElementById('trumpSub').value;
  let mcConnellSub = document.getElementById('mcConnellSub').value;
  let penceSub = document.getElementById('penceSub').value;
  let conwaySub = document.getElementById('conwaySub').value;

  chrome.storage.sync.set(
    {
      chumpTrumpDictionary: dictionaryMaker({
        Trump: sanitize(trumpSub),
        McConnell: sanitize(mcConnellSub),
        Pence: sanitize(penceSub),
        Conway: sanitize(conwaySub),
      }),
    },
    function() {
      // Update status to let user know options were saved.
      let status = document.getElementById('status');
      status.textContent = 'Options saved. Refresh to see new names.';

      // helper();
      setTimeout(function() {
        status.textContent = '';
      }, 1750);
    }
  );
}

const defaultDictionary = {
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
};
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get(cStorageObj => {
    const items = cStorageObj.chumpTrumpDictionary;
    document.getElementById('trumpSub').value = parse(items.Trump);
    document.getElementById('mcConnellSub').value = parse(items.McConnell);
    document.getElementById('penceSub').value = parse(items.Pence);
    document.getElementById('conwaySub').value = parse(items.Conway);

    // let whiteList = document.getElementById('white-list');
    const keys = Object.keys(cStorageObj.chumpTrumpWhiteList);
    keys.forEach(addListItemsToWhitelist);
  });
}

function addListItemsToWhitelist(host) {
  let whiteList = document.getElementById('white-list');

  let li = document.createElement('li');
  let text = document.createElement('div');
  let x = document.createElement('img');
  x.src = '../128.png';
  x.title = 'Remove from whitelist';
  text.innerText = host;
  li.classList.add('white-list-item');
  li.appendChild(x);
  li.appendChild(text);
  x.addEventListener('click', e => {
    // remove from storage whitelist
    removeFromWhiteList(e.target.nextSibling.innerText);
    e.target.parentNode.remove();
    // remove listitem from list
  });
  whiteList.appendChild(li);
}

// function helper() {
//   chrome.storage.sync.get(res => {
//     console.log('this is current chrome storage', res);
//   });
// }

function resetDefaults() {
  chrome.storage.sync.set(
    {
      chumpTrumpDictionary: defaultDictionary,
      chumpTrumpWhiteList: { 'mail.google.com': true },
    },
    () => {
      chrome.storage.sync.get(cStorageObj => {
        let items = cStorageObj.chumpTrumpDictionary;
        document.getElementById('trumpSub').value = parse(items.Trump);
        document.getElementById('mcConnellSub').value = parse(items.McConnell);
        document.getElementById('penceSub').value = parse(items.Pence);
        document.getElementById('conwaySub').value = parse(items.Conway);
      });
    }
  );
  // helper();
}
document.addEventListener('DOMContentLoaded', restore_options);
// document.addEventListener('DOMContentLoaded', helper);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('reset').addEventListener('click', resetDefaults);

// eslint-disable-next-line complexity
function dictionaryMaker(storageObj) {
  return {
    Trump:
      storageObj.Trump.slice(0, 1).toUpperCase() +
        storageObj.Trump.slice(1).toLowerCase() || 'Chump',
    TRUMP: storageObj.Trump.toUpperCase() || 'CHUMP',
    trump: storageObj.Trump.toLowerCase() || 'chump',
    mcconnell:
      storageObj.McConnell.slice(0, 1).toUpperCase() +
      storageObj.McConnell.slice(1).toLowerCase(),
    McConnell: storageObj.McConnell || 'McTurtle',
    MCCONNELL: storageObj.McConnell.toUpperCase() || 'MCTURTLE',
    Conway: storageObj.Conway || '"Miss Misinformation" Conway',
    CONWAY: storageObj.Conway.toUpperCase() || '"Miss Misinformation" CONWAY',
    conway:
      storageObj.Conway.slice(0, 1).toUpperCase() +
      storageObj.Conway.slice(1).toLowerCase(),
    Pence: storageObj.Pence || '"Def not Gay" Pence',
    PENCE: storageObj.Pence.toUpperCase() || '"Def not Gay" PENCE',
    pence:
      storageObj.Pence.slice(0, 1).toUpperCase() +
      storageObj.Pence.slice(1).toLowerCase(),
  };
}

function sanitize(str) {
  let temp = document.createElement('div');
  temp.innerText = str;
  return temp.innerHTML;
}

function parse(str) {
  let temp = document.createElement('div');
  temp.innerHTML = str;
  return temp.innerText;
}

function removeFromWhiteList(str) {
  chrome.storage.sync.get(cStorageObj => {
    let oldList = cStorageObj.chumpTrumpWhiteList;
    delete oldList[str];
    chrome.storage.sync.set({ chumpTrumpWhiteList: oldList });
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(
    'options/index.js',
    sender.tab
      ? 'from a content script:' + sender.tab.url
      : 'from the extension',
    'request',
    request,
    console.log('location to take off from dom')
  );
});
