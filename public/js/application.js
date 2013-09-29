

var geocoder;
  var map;
  function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
      zoom: 8,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  }

  function codeAddress() {
    var address = document.getElementById('zip').value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        console.log(results)
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
        marker.setMap(map);
        var infoWindowOptions = {
          content:'moscov'
        };
        var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

        console.log(marker);

        google.maps.event.addListener(marker,'click', function(e){ 
          infoWindow.open(map,marker);  
        });
     fuction 


        
          
   
     



          


      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }














$(document).ready(function() {
  google.maps.event.addDomListener(window, 'load', initialize);

     console.log(geocoder)
  //   loadScript();
  $('#zip_srch').on('click', function(){

    codeAddress();
  })
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
});
