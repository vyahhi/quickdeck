chrome.contextMenus.removeAll();
chrome.contextMenus.create({
  title: "Add to QuickDeck",
  contexts: ["selection"],
  onclick: function() {
    alert('Added! (or not, need to build it first)');
  }
});