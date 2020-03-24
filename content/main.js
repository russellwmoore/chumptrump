console.group('Chump Trump Extension!');
console.log('Extension is locked and loaded');
console.log(`
  _|_|_|  _|                                                _|_|_|_|_|                                                
_|        _|_|_|    _|    _|  _|_|_|  _|_|    _|_|_|            _|      _|  _|_|  _|    _|  _|_|_|  _|_|    _|_|_|    
_|        _|    _|  _|    _|  _|    _|    _|  _|    _|          _|      _|_|      _|    _|  _|    _|    _|  _|    _|  
_|        _|    _|  _|    _|  _|    _|    _|  _|    _|          _|      _|        _|    _|  _|    _|    _|  _|    _|  
  _|_|_|  _|    _|    _|_|_|  _|    _|    _|  _|_|_|            _|      _|          _|_|_|  _|    _|    _|  _|_|_|    
                                              _|                                                            _|        
                                              _|                                                            _|  
`);
console.log(`Hi! I'm Russell. http://www.russellwmoore.com. Hire me?`);
console.groupEnd();

theBusiness();

chrome.runtime.onMessage.addListener(function(request, sender, reply) {
  if (request.command === 'refresh') {
    theBusiness();
  }
  if (request.command === 'sparkle') {
    sparkle();
  }
  if (request.command === 'whiteList') {
    addWhiteList();
    reply({ location: window.location.host });
  }
  if (request.command === 'remove-whiteList') {
    removeFromWhiteList(window.location.host);
    reply({ location: window.location.host });
  }

  return true;
});

function theBusiness() {
  chrome.storage.sync.get(cStorageObj => {
    if (window.location.hostname in cStorageObj.chumpTrumpWhiteList) {
      return;
    }

    const nodes = createNodes(document.body);
    nodes.forEach(node => {
      replacer(node, cStorageObj.chumpTrumpDictionary);
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
    nodes.push(walker.currentNode);
  }
  return nodes;
}

function sparkle() {
  let nodes = document.querySelectorAll('.initAnimate');
  nodes.forEach(n => n.classList.toggle('chumpTrump'));
  void nodes[0].offsetWidth;
  nodes.forEach(n => n.classList.toggle('chumpTrump'));
}

function replacer(node, dictionary) {
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

function addWhiteList() {
  chrome.storage.sync.get(cStorageObject => {
    let list = cStorageObject.chumpTrumpWhiteList;
    list[window.location.host] = true;
    chrome.storage.sync.set({ chumpTrumpWhiteList: list });
  });
}

function removeFromWhiteList(str) {
  chrome.storage.sync.get(cStorageObj => {
    let list = cStorageObj.chumpTrumpWhiteList;
    delete list[str];
    chrome.storage.sync.set({ chumpTrumpWhiteList: list });
  });
}
