$(document).ready(function() {  
  Map.makeMap();
  $('#zip_srch').on('click',function(){
    var address = document.getElementById('zip').value;
    map.codeAddress(address);
  });
  $('#find_tweets').on('click',function(){
    var list = new List($('#list ol'));
    Map.fetch(list); 
  });
  $('#clear-tweet').on('click',function(){
     Map.clearMap()
  });
});
