function knowledgeGraph() {
  var service_url = 'https://kgsearch.googleapis.com/v1/entities:search';
  var params = {
    'query': 'Taylor Swift',
    'limit': 10,
    'indent': true,
    'key' : 'AIzaSyBzBhi_ssjCPq642p_0JgleROkgtPVTv5E',
  };

  $.getJSON(service_url + '?callback=?', params, function(response) {
    $.each(response.itemListElement, function(i, element) {
      $('<div>', {text:element['result']['name']}).appendTo(document.body);
    });
  });
}

console.log(knowledgeGraph())
  //
  // words = ["ribosome", "dna", "something"];
  // for(i = 0; i < words.length; i++ ) {
  //   button = document.createElement('button');
  //   button.innerHTML = words[i];
  //   document.getElementsByTagName('body')[0].appendChild(button);
  //   button.addEventListener ("click", knowledgeGraph);
  // };
