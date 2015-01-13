$(document).ready(function() {
  var List = list()
  Map.makeMap();
  $('#zip_srch').on('click',function(){
    var address = document.getElementById('zip').value;
    Map.codeAddress(address);
  });
  $('#find_tweets').on('click',function(){
    Map.fetch(List); 
  });
  $('#clear-tweet').on('click',function(){
     List.clear()
     Map.clearMap()
  });
});
