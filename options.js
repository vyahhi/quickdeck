function knowledgeGraph(word, div) {
  var service_url = 'https://kgsearch.googleapis.com/v1/entities:search';
  var params = {
    'query': word,
    'limit': 1,
    'key': 'AIzaSyBzBhi_ssjCPq642p_0JgleROkgtPVTv5E',
  };

  $.getJSON(service_url, params, function(response) {
  	console.log(response);
  	var message = '';
  	if (response.itemListElement.length == 0) {
  		message = '<h3>' + word + '</h3> Not found <tt>¯\\_(ツ)_/¯</tt>';
  	}
  	else {
		var name = response.itemListElement[0]['result']['name'];
		message += '<center><h3>' + name + '</h3></center>';
		var description = response.itemListElement[0]['result']['description'];
	  	message += '<b>Description:</b> ' + description + '<br><br>';
	  	if (response.itemListElement[0]['result']['detailedDescription']) {
	  		var detailedDescription = response.itemListElement[0]['result']['detailedDescription']['articleBody']; 
	  		message += '<b>Detailed description:</b> ' + detailedDescription + '<br><br>';
	  		var detailedDescriptionUrl = response.itemListElement[0]['result']['detailedDescription']['url']; 
	  		message += '<b>See more:</b> <a href="' + detailedDescriptionUrl + '">' + detailedDescriptionUrl + '</a><br><br>';
  		}
		var url = response.itemListElement[0]['result']['url'];
	  	if (url) {
			message += '<b>Webpage:</b> <a taget="_blank" href="' + url + '">' + url + '</a><br><br>';
	  	}
	  	if (response.itemListElement[0]['result']['image']) {
	  		var image = response.itemListElement[0]['result']['image']['contentUrl'];
	  		message += '<img src="' + image + '">';
	  	}
	}
  	$('<div>' + message + '</div>').appendTo(div);
  });
}

function showCard(word) {
    var div = document.createElement('div');
    div.style.border = '1px solid black';
    div.style.padding = '1em';
    div.style.margin = '1em';
    knowledgeGraph(word, div);
    document.body.appendChild(div);
}


chrome.storage.local.get('words', function (result) {
	$('<h1>Saved words:</h1>').appendTo(document.body);
    for (var i = 0; i < result.words.length; i++) {
		var word = result.words[i];
		showCard(word);
    }
});

chrome.storage.local.get('searches', function (result) {
	$('<h1>Google searches:</h1>').appendTo(document.body);
    for (var i = 0; i < result.searches.length; i++) {
		var word = result.searches[i];
		showCard(word);
    }
});
