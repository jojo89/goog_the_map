google.maps.event.addDomListener(window, 'load', initialize);

function initialize() {
  map = new Map(34.397, -118.644).setMap();
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
      map.map.setCenter(results[0].geometry.location);
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

$(document).ready(function() {  
  $('#zip_srch').on('click',function(){
    var address = document.getElementById('zip').value;
    codeAddress(address);
  });
  $('#find_tweets').on('click',function(){
    var list = new List($('#list ol'));
    map.fetch(list); 
  });
  $('#clear-tweet').on('click',function(){
     map.clearMap()
  });
});

String.prototype.trunc = String.prototype.trunc ||
      function(n){
          return this.length>n ? this.substr(0,n-1) : this.substr(0,this.length-1);
      };

