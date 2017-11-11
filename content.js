document.addEventListener('mouseup', function (event) {
    chrome.storage.local.get('highlight', function (result) {
        if (!result.highlight) return; // not in highlight mode

        var sel = window.getSelection().toString();
        if (!sel.length) return; // empty selection

        // highlight with yellow on the page (based on https://stackoverflow.com/a/2139792/92396)
        var range = window.getSelection().getRangeAt(0);
        var selectionContents = range.extractContents();
        var span = document.createElement('span');
        span.style.background = 'yellow';
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
            chrome.runtime.sendMessage({message: sel}, function () {
            });
        });
    });
})