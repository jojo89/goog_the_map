$(document).ready(function() {  
  var list = new List($('#list ol'));
  Map.makeMap();
  $('#zip_srch').on('click',function(){
    var address = document.getElementById('zip').value;
    Map.codeAddress(address);
  });
  $('#find_tweets').on('click',function(){
    Map.fetch(list); 
  });
  $('#clear-tweet').on('click',function(){
     list.clear()
     Map.clearMap()
  });
});
