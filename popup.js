function toggleHighlight(e) {
    chrome.storage.local.set({'highlight': e.target.checked});
}

function deleteWords(e) {
    chrome.storage.local.remove(['words'], function () {});
    chrome.storage.local.remove(['searches'], function () {});
    document.querySelector('#savedWords').style.display = 'none';
    document.querySelector('#emptyWords').style.display = 'block';
    document.querySelector('#words').innerHTML = '';
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {mode: 'deleteWords'});
    });
}

document.addEventListener('DOMContentLoaded', function () {
    
    // Toggle Checkbox
    chrome.storage.local.get('highlight', function (result) {
        document.querySelector('#toggleHighlight').checked = result.highlight
    });
    document.querySelector('#toggleHighlight').addEventListener('change', toggleHighlight);
    document.querySelector('#deleteWords').addEventListener('click', deleteWords);

    // List of Words
    chrome.storage.local.get('words', function (result) {
        var words_list = document.querySelector('#words');
        for (var i = 0; i < result.words.length; i++) {
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(result.words[i]));
            words_list.appendChild(li);
        }
        if (result.words.length > 0) {
            document.querySelector('#savedWords').style.display = 'block';
            document.querySelector('#emptyWords').style.display = 'none';
        }
    });

    // List of Searches (copy-pasta detected!)
    chrome.storage.local.get('searches', function (result) {
        var words_list = document.querySelector('#searches');
        for (var i = 0; i < result.searches.length; i++) {
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(result.searches[i]));
            words_list.appendChild(li);
        }
        if (result.searches.length > 0) {
            document.querySelector('#savedWords').style.display = 'block';
            document.querySelector('#emptyWords').style.display = 'none';
        }
    });

});