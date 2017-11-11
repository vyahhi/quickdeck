function toggleHighlight(e) {
    chrome.storage.local.set({'highlight': e.target.checked});
}

function deleteWords(e) {
    chrome.storage.local.remove(['words'], function () {});
    document.querySelector('#savedWords').style.display = 'none';
    document.querySelector('#words').innerHTML = '';
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
            document.querySelector('#savedWords').style.display = 'inline-block';
        }
    });

});