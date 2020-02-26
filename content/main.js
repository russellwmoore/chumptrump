console.log('&&&&&&&& Extension page is fully loaded');
console.log('***************** start *****************');
console.log('Location!!!', window.location);

theBusiness();

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
    console.log('this is current Chrome Storage: ', cStorageObj);
    if (
      cStorageObj.whiteList &&
      window.location.hostname in cStorageObj.whiteList
    ) {
      return;
    }
    // console.log('Begin collecting nodes');

    const nodes = createNodes(document.body);
    // console.log('here are nodes', nodes);
    // const dict = dictionaryMaker(dictionaryFromStorage);
    // console.log('here is dict', dict);
    nodes.forEach(node => {
      replacer(node, cStorageObj.chumpTrump.dictionary);
    });

    console.log('***************** end *****************');
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

function replacer(node, dictionary) {
  // console.log('node', node);
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
