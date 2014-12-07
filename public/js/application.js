


google.maps.event.addDomListener(window, 'load', initialize);


  // // working code!
  var geocoder;
 
  var map;

  function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(37.397, -122.644);
    var mapOptions = {
      zoom: 8,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
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
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }




    function fetch(){
        var lng = map.getCenter().lng()
        var lat = map.getCenter().lat()
        var phrase = document.getElementById('phrase').value;
     
        $.post('/twitter',{lng:lng,lat:lat,phrase:phrase},function(response){
          jQuery.each(response,function(i,val){
            var spot = new Spot(val.latitude, val.longitude, val.profile_image, val.text, val.background_image)
            google.maps.event.addListener(spot.marker,'click', function(e){
              spot.openBox()
            });      
          }); 
        })
    }





$(document).ready(function() {
  
  $('#zip_srch').on('click',function(){
    var address = document.getElementById('zip').value;
    codeAddress(adress);
  });
    $('#find_tweets').on('click',function(){
     fetch(); 
  });
});

