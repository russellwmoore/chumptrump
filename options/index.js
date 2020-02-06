function save_options() {
  const trumpSub = document.getElementById('trumpSub').value;
  const mcConnellSub = document.getElementById('mcConnellSub').value;
  const penceSub = document.getElementById('penceSub').value;
  const conwaySub = document.getElementById('conwaySub').value;

  chrome.storage.sync.set(
    dictionaryMaker({
      Trump: trumpSub,
      McConnell: mcConnellSub,
      Pence: penceSub,
      Conway: conwaySub,
    }),
    function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved. Refresh to see new names.';
      console.log('inside callback on save_options');
      helper();
      setTimeout(function() {
        status.textContent = '';
      }, 1750);
    }
  );
}

const defaults = {
  Trump: 'Chump',
  Pence: '"Def not Gay" Pence',
  McConnell: 'McTurtle',
  Conway: '"Miss Misinformation" Conway',
};
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // this provides default values if none are present
  chrome.storage.sync.get(defaults, function(items) {
    document.getElementById('trumpSub').value = items.Trump;
    document.getElementById('mcConnellSub').value = items.McConnell;
    document.getElementById('penceSub').value = items.Pence;
    document.getElementById('conwaySub').value = items.Conway;
  });
}

function helper() {
  const helperDiv = document.getElementById('storageHelper');
  chrome.storage.sync.get(res => {
    helperDiv.innerHTML = JSON.stringify(res);
  });
}

function resetDefaults() {
  chrome.storage.sync.set(defaults, () => {
    chrome.storage.sync.get(items => {
      console.log('itesm in reset defaults', items);
      document.getElementById('trumpSub').value = items.Trump;
      document.getElementById('mcConnellSub').value = items.McConnell;
      document.getElementById('penceSub').value = items.Pence;
      document.getElementById('conwaySub').value = items.Conway;
    });
  });
  helper();
}
document.addEventListener('DOMContentLoaded', restore_options);
document.addEventListener('DOMContentLoaded', helper);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('reset').addEventListener('click', resetDefaults);

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
