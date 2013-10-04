


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
        // var marker = new google.maps.Marker({
        //     map: map,
        //     position: results[0].geometry.location
        // });
        // var infoWindowOptions = {
        //   content:'moscov'
        // };
        // var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
        // google.maps.event.addListener(marker,'click', function(e){ 
        //   infoWindow.open(map,marker);  
        // });
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
            console.log(val.user)
            console.log(val.lat)
            console.log(val.lng)
            var marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(val.lat, val.lng),
            });
            var infoWindowOptions = {
              content: '<img src='+ val.pic+ '><br>' + val.status
            };
            var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
            google.maps.event.addListener(marker,'click', function(e){ 
              infoWindow.open(map,marker);  
              $('body').css('background-image', 'url('+ val.bg +')')
            });            
          
          }); 
         



        })
    }



// $(document).ready(function() {
//   google.maps.event.addDomListener(window, 'load', initialize);


//   console.log(map);

//   $('#zip_srch').on('click', function(){
//     codeAddress();
//   })


// });



  // ///////////////////////////////////////////////////////////////////////////////

// broke ass code





  // var acOptions = {
  //   types: ['establishment']
  // }

  // var autocomplete = new google.maps.places.Autocomplete(document.getElementById('zip'), acOptions);
  // autocomplete.bindTo('bounds',map);

  // google.maps.event.addListener(autocomplete,'places_changed', function(){
  //   infoWindow.close();
  //   var place = autocomplete.getPlace();
  //   if (place.geometry.viewport){
  //     map.fitBounds(place.geometry.viewport);
  //   }else{
  //     map.setCenter(place.geometry.location);
  //     map.setZoom(17);
  //   }
  // });  


  //   marker.setPosition(place.geometry.location);
  //   infoWindow.setContent('<div><strong>+ place.name +</strong><br>');
  //   infoWindow.open(map,marker);
  //   google.maps.event.addListener(marker,click)  
  //   }
  // })




$(document).ready(function() {
  // var latlng = new google.maps.LatLng(-34.397, 150.644);

  // var mapOptions = {
  //   zoom: 8,
  //   center: latlng,
  //   mapTypeId: google.maps.MapTypeId.ROADMAP
  // }

  // var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  // var geocoder = new google.maps.Geocoder();

  $('#zip_srch').on('click',function(){
    codeAddress()
    fetch(); 
  })

  
  // var marker = new google.maps.Marker({
  //   map: map,
  //   position: latlng
  // })
  // marker.setMap(map)
  
  // var infoWindow = new google.maps.InfoWindow({
  //   content:'moscov'
  // });

  // google.maps.event.addListener(marker,'click', function(e){ 
  //   infoWindow.open(map, marker);  
  // });

  // var acOptions = {
  //   types: ['establishment']
  // }
  // var autocomplete = new google.maps.places.Autocomplete(document.getElementById('zip'), acOptions);
  // autocomplete.bindTo('bounds',map);
  
  // var infoWindow = new google.maps.InfoWindow();
  // var marker = new google.maps.Marker({
  //   map: map
  // });

  
  // google.maps.event.addListener(autocomplete,'place_changed', function(){
  //   infoWindow.close();
  //   var place = autocomplete.getPlace();
  //   console.log(place.geometry.location)
  //   console.log(place)
  //   if (place.geometry.viewport){
  //     map.fitBounds(place.geometry.viewport);
  //   }else{
  //     map.setCenter(place.geometry.location);
  //     map.setZoom(17);
  //   }
  //   marker.setPosition(place.geometry.location);
  //   infoWindow.setContent('<div><strong>+ place.name +</strong><br>');
    
  //   google.maps.event.addListener(marker,'click',function(e){
  //     infoWindow.open(map, marker);  

  //   });  
  // });    
});

















