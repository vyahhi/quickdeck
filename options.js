

words = ["ribosome", "dna", "something"];
for(i = 0; i < words.length+1; i++ ) {
  button = document.createElement('button');
  button.innerHTML = words[i];
  document.getElementsByTagName('body')[0].appendChild(button);
  button.addEventListener ("click", function() {
           alert("button is clicked") });
  };
