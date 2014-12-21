var Fetcher = function (latitude, longitude, phrase) {
  this.latitude = latitude;
  this.longitude = longitude;
  this.phrase = phrase;
}

Fetcher.prototype.fetch = function() {
  $.post('/twitter', {lng: this.longitude, lat: this.latitude, phrase: this.phrase}, function(response){
    jQuery.each(response,function(i,val){
      var spot = new Spot(val.latitude, val.longitude, val.profile_image, val.text, val.background_image)
      google.maps.event.addListener(spot.marker,'click', function(e){
        spot.flashBox();
      });      
    }); 
  })
}
