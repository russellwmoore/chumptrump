window.onload = () => {
  console.log('&&&&&&&& Extension page is fully loaded');
  console.log('***************** start *****************');
  theBusiness();
};
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('Received message in Main.js: ', request);
  console.log('Sender of message in Main.js: ', sender);

  if (request.command === 'refresh') {
    console.log('in the business of refresh');
    theBusiness();
  }
  if (request.command === 'sparkle') {
    console.log('in sparkle func');
    sparkle();
  }
  return true;
});

function theBusiness() {
  // console.log('Start theBusiness');
  chrome.storage.sync.get(cStorageObj => {
    // console.log('this is current Chrome Storage: ', cStorageObj);
    // console.log('Begin collecting nodes');
    const nodes = createNodes(document.body);
    // console.log('here are nodes', nodes);
    const dict = dictionaryMaker(cStorageObj);
    // console.log('here is dict', dict);
    nodes.forEach(node => {
      replacer(node, dict);
    });

    //start Observer
    // const targetNode = document.getElementsByTagName('body')[0];

    // // Options for the observer (which mutations to observe)
    // const config = { attributes: true, childList: true, subtree: true };

    // // Callback function to execute when mutations are observed
    // const observerCallback = function(mutationsList) {
    //   for (let mutation of mutationsList) {
    //     if (mutation.type === 'childList') {
    //       console.log('A child node has been added or removed.', mutation);
    //       mutation.addedNodes.forEach(replacer, dict);
    //     }
    //   }
    // };

    // // Create an observer instance linked to the callback function
    // const obs = new MutationObserver(observerCallback);

    // obs.observe(targetNode, config);
    // document.body.classList.toggle('in-trump-process');
    console.log('***************** end *****************');

    chrome.storage.sync.set(dict, () => {
      console.log('Set storage with with ' + JSON.stringify(dict));
    });
  });
}

function createNodes(startingNode) {
  const walker = document.createTreeWalker(
    startingNode,
    NodeFilter.SHOW_TEXT,
    function(node) {
      let trump = node.textContent.match(/Trump\b/gi);
      let mccon = node.textContent.match(/McConnell\b/gi);
      let conway = node.textContent.match(/Conway\b/gi);
      let pence = node.textContent.match(/Pence\b/gi);
      if (trump || mccon || conway || pence) {
        return NodeFilter.FILTER_ACCEPT;
      } else {
        return NodeFilter.FILTER_SKIP;
      }
    },
    false
  );
  const nodes = [];
  while (walker.nextNode()) {
    // console.log('working');
    nodes.push(walker.currentNode);
  }
  return nodes;
}

function sparkle() {
  let nodes = document.querySelectorAll('.initAnimate');
  console.log('nodes1', nodes);
  nodes.forEach(n => n.classList.toggle('chumpTrump'));
  console.log('nodes2', nodes);
  void nodes[0].offsetWidth;
  nodes.forEach(n => n.classList.toggle('chumpTrump'));
  console.log('nodes3', nodes);
}
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

function replacer(node, dictionary) {
  console.log('node', node);
  if (node.parentElement !== null) {
    node.parentElement.innerHTML = node.parentElement.innerHTML.replace(
      /Trump|McConnell|Conway|Pence/gi,
      function(matched) {
        return (
          "<span class='chumpTrump initAnimate' title='Formerly " +
          matched +
          "'>" +
          dictionary[matched] +
          '</span>'
        );
      }
    );
  }
}
