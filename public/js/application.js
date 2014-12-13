google.maps.event.addDomListener(window, 'load', initialize);

function initialize() {
  map = new Map(37.397, -122.644).setMap();
}

function setMarker(lat, lon, details) {
  var latLng = new google.maps.LatLng(lat, lon);
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    data: html
  });

  google.maps.event.addListener(marker, 'click', function() { 
    map.setCenter(new google.maps.LatLng(marker.position.lat(), marker.position.lng())); 
    map.setZoom(16); 
    onItemClick(event, marker); 
  }); 
}

function codeAddress(address) {
  map.geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

function fetch(map){
  var lng = map.getCenter().lng();
  var lat = map.getCenter().lat();
  var phrase = document.getElementById('phrase').value;
  new Fetcher(lat, lng, phrase).fetch();
}

$(document).ready(function() {  
  $('#zip_srch').on('click',function(){
    var address = document.getElementById('zip').value;
    codeAddress(address);
  });
  $('#find_tweets').on('click',function(){
     fetch(map); 
  });
});

