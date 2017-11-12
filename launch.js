function knowledgeGraph(word, div1, div2, div3) {

  word = word.replace(/[^A-Za-z0-9\s]/g,"").replace(/\s{2,}/g, " ")

  // ==========================================
  // Query for Google Knowledge Graph API
  var service_url = 'https://kgsearch.googleapis.com/v1/entities:search';
  var params = {
    'query': word,
    'limit': 1,
    'key': 'AIzaSyBzBhi_ssjCPq642p_0JgleROkgtPVTv5E'
  };
  $.getJSON(service_url, params, function(response) {
  	console.log(response);
  	var message = '';
  	if (response.itemListElement.length == 0) {
  		message += '<center><h3>' + word + ' (by Google)</h3></center>';
  		message += 'Not found <tt>¯\\_(ツ)_/¯</tt>';
  	}
  	else {
  		var value = response.itemListElement[0]['result'];
		var name = value['name'];
  		message += '<center><h3>' + name + ' (by Google)</h3></center>';
		var description = value['description'];
		if (description) {
		 message += '<b>Description:</b> ' + description + '<br><br>';
		}
	  	if (value['detailedDescription']) {
	  		var detailedDescription = value['detailedDescription']['articleBody']; 
	  		message += '<b>Detailed description:</b> ' + detailedDescription + '<br><br>';
	  		var detailedDescriptionUrl = value['detailedDescription']['url']; 
	  		message += '<b>See more:</b> <a target="_blank" href="' + detailedDescriptionUrl + '">' + detailedDescriptionUrl + '</a><br><br>';
  		}
		var url = value['url'];
	  	if (url) {
			message += '<b>Webpage:</b> <a target="_blank" href="' + url + '">' + url + '</a><br><br>';
	  	}
	  	if (value['image']) {
	  		var image = value['image']['contentUrl'];
	  		message += '<img src="' + image + '">';
	  	}
	}
  	$('<div>' + message + '</div>').appendTo(div1);
  });

  // ==========================================
  // Query for Wikidata API
  var service_url = 'https://www.wikidata.org/w/api.php';
  var params = {
  	'action': 'wbgetentities',
  	'sites': 'enwiki',
    'titles': word,
    'format': 'json'
  };
  $.getJSON(service_url, params, function(response) {
  	console.log(response);
  	var message = '';
  	if (response['entities']['-1']) {
	  	message += '<center><h3>' + word + ' (by Wikidata)</h3></center>';
  		message += 'Not found <tt>¯\\_(ツ)_/¯</tt>';
  	}
  	else {
  		var key = [Object.keys(response.entities)[0]];
  		var value = response.entities[key];
		var name = value['labels']['en']['value'];
	  	message += '<center><h3>' + name + ' (by Wikidata)</h3></center>';
		if (value['descriptions']['en']) {
			var description = value['descriptions']['en']['value'];
			if (description) {
			  message += '<b>Description:</b> ' + description + '<br><br>';
			}
		}
        // var url = 'https://www.wikidata.org/wiki/' + key;
        // message += '<b>Wikidata Link:</b> <a target="_blank" href="' + url + '">' + url + '</a><br><br>';
        var wikipedia_name = value['sitelinks']['enwiki']['title'];
        var url = 'https://en.wikipedia.org/wiki/' + wikipedia_name;
        message += '<b>See more:</b> <a target="_blank" href="' + url + '">' + url + '</a><br><br>';
	}
  	$('<div>' + message + '</div>').appendTo(div2);
  });

  // ==========================================
  // Query for Wolfram Alpha
  return; // TODO: how to visualize these pods?
  var service_url = 'http://api.wolframalpha.com/v2/query';
  var params = {
    'appid': 'AH23YY-UE55VV3TLY',
    'input': word,
    'output': 'json'
  };
  $.getJSON(service_url, params, function(response) {
  	console.log(response);
  	var message = '';
  	if (!response.queryresult.pods.length) {
	  	message += '<center><h3>' + word + ' (by Wolfram Alpha)</h3></center>';
  		message += 'Not found <tt>¯\\_(ツ)_/¯</tt>';
  	}
  	else {
  		var value = response.queryresult.pods[0];
		var name = value.definitions.word;
	  	message += '<center><h3>' + name + ' (by Wolfram Alpha)</h3></center>';
		var description = value.definitions.desc;
        message += '<b>Description:</b> ' + description + '<br><br>';
	}
	console.log(message);
  	$('<div>' + message + '</div>').appendTo(div3);
  });


}

document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get('words', function (result) {
        var words_list = document.querySelector('#words');
        for (var i = 0; i < result.words.length; i++) {
            var li = document.createElement('li');
            var button = document.createElement('button');
            button.appendChild(document.createTextNode(result.words[i]));

            button.addEventListener('click', function() {
            	var word = this.innerHTML;
            	console.log(word);
            	var card1 = document.querySelector('#card1');
            	card1.innerHTML = '';
            	var card2 = document.querySelector('#card2');
            	card2.innerHTML = '';
            	var card3 = document.querySelector('#card3');
            	card3.innerHTML = '';
            	knowledgeGraph(word, card1, card2, card3);
            });
            li.appendChild(button);
            words_list.appendChild(li);
        }
    });

    // copy-pasta!
    chrome.storage.local.get('searches', function (result) {
        var words_list = document.querySelector('#searches');
        for (var i = 0; i < result.searches.length; i++) {
            var li = document.createElement('li');
            var button = document.createElement('button');
            button.appendChild(document.createTextNode(result.searches[i]));

            button.addEventListener('click', function() {
            	var word = this.innerHTML;
            	console.log(word);
            	var card1 = document.querySelector('#card1');
            	card1.innerHTML = '';
            	var card2 = document.querySelector('#card2');
            	card2.innerHTML = '';
            	var card3 = document.querySelector('#card3');
            	card3.innerHTML = '';
            	knowledgeGraph(word, card1, card2, card3);
            });
            li.appendChild(button);
            words_list.appendChild(li);
        }
    });

});