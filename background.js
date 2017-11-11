chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.mode != 'sendNotification') return;
    // Send a simple text notification from content.js
    var options = {
        type: "basic",
        title: "Saved to QuickDeck",
        message: request.message,
        iconUrl: "images/icon.png"
    };
    var id = (Math.floor(Math.random() * 9007199254740992) + 1).toString();
    chrome.notifications.create(id, options);
});
