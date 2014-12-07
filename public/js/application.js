


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


  function codeAddress() {
    var address = document.getElementById('zip').value;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        console.log(results[0].geometry.viewport)
        map.setCenter(results[0].geometry.location);
        console.log(map.getCenter().lng());
        console.log(map.getCenter().lat());
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
          console.log(response)
          jQuery.each(response,function(i,val){
            var marker = makeMarker(val)
            var infoBox = makeBox(val)
            var spot = new Spot(marker, infoBox, val.background_image)
            google.maps.event.addListener(marker,'click', function(e){
              spot.openBox()
            });      
          }); 
        })
    }

    function makeMarker(tweetInfo){
    	return new google.maps.Marker({
    	    map: map,
          icon:  tweetInfo.profile_image,
          position: new google.maps.LatLng(tweetInfo.latitude, tweetInfo.longitude),
    	    visible: true
    	});
    }
    
    function makeBox(tweetInfo){
    	return new InfoBox({
        content: '<div style="background-repeat:no-repeat;background:white; padding: 10px 30px; color:blue; border-radius:150px; ">'+tweetInfo.text+'</div>'
    		,disableAutoPan: false
    		,maxWidth: 0
    		,pixelOffset: new google.maps.Size(-140, 0)
    		,zIndex: null
    		,boxStyle: { 
    		 }
    		,closeBoxMargin: "10px 2px 2px 2px"
    		,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
    		,infoBoxClearance: new google.maps.Size(1, 1)
    		,isHidden: false
    		,pane: "floatPane"
    		,enableEventPropagation: false
    	});
    }



$(document).ready(function() {
  $('#zip_srch').on('click',function(){
    codeAddress();
  });
    $('#find_tweets').on('click',function(){
     fetch(); 
  });
});

