chrome.storage.local.get('words', function (result) {
  words = result.words;
  words = ["ribosome", "dna", "something"];
  for(i = 0; i < words.length; i++ ) {
    button = document.createElement('button');
    button.innerHTML = words[i];
    document.getElementsByTagName('body')[0].appendChild(button);
    button.addEventListener ("click", function() {
           alert("button is clicked") });
    };
});
