

// var geocoder;
// var map;

function initialize() {
  var geocoder = new google.maps.Geocoder();
  var mapOptions = {
    center: new google.maps.LatLng(34.397, -122.644),
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    infowindow = new google.maps.InfoWindow({ maxWidth: 320 
  }); 
  var markerOptions = {
    position: new google.maps.LatLng(37.7831, -122.4039)
  };
  var marker = new google.maps.Marker(markerOptions);
  marker.setMap(map);
  
    var infoWindowOptions ={
   content: "hey"
  }
    


  }







      google.maps.event.addDomListener(window, 'load', initialize);

function codeAddress() {
  var address = document.getElementById('zip').value;
  console.log(address)
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
    console.log(results[0].geometry.location);
    console.log(map);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}






$(document).ready(function() {
     
  //   loadScript();
  $('#zip_srch').on('click', function(){
    codeAddress();
  })
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
});
