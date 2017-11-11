// Highlighing
document.addEventListener('mouseup', function (event) {
    chrome.storage.local.get('highlight', function (result) {
        if (!result.highlight) return; // not in highlight mode

        var sel = window.getSelection().toString();
        if (!sel.length) return; // empty selection

        // highlight with yellow on the page (based on https://stackoverflow.com/a/2139792/92396)
        var range = window.getSelection().getRangeAt(0);
        var selectionContents = range.extractContents();
        var span = document.createElement('span');
        span.className = 'highlightedWord';
        span.appendChild(selectionContents);
        range.insertNode(span);

        // save to local storage
        chrome.storage.local.get('words', function (result) {
            // append to the list of words
            if (result.words) {
                result.words.push(sel);
            }
            else {
                result.words = [sel];
            }
            chrome.storage.local.set({'words': result.words});

            // send browser notification throught background.js
            chrome.runtime.sendMessage({mode: 'sendNotification', message: sel});
        });
    });
});

// URL parsing for google searches (based on https://stackoverflow.com/a/6045609/92396)
function getUrlVars(href) {
    var vars = [], hash;
    var hashes = href.slice(href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

// Google searches
if (window.location.origin.indexOf('google') != -1) {
    chrome.storage.local.get('highlight', function (result) {
        if (!result.highlight) return; // not in highlight mode
        var url = window.location.toString();
        var v = getUrlVars(url);
        var q = decodeURIComponent(v.q.replace(/\+/g, '%20'));
        // save to localstorage
        chrome.storage.local.get('searches', function (result) {
                // append to the list of words
                if (result.searches) {
                    result.searches.push(q);
                }
                else {
                    result.searches = [q];
                }
                chrome.storage.local.set({'searches': result.searches});

                // send browser notification throught background.js
                chrome.runtime.sendMessage({mode: 'sendNotification', message: q});
            });
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.mode == 'deleteWords') {
        // un-highlight with yellow
        document.querySelectorAll('.highlightedWord').forEach((element, index, array) => {
            element.className = '';
        });
    }
});
