var Fetcher = function (latitude, longitude, phrase, map) {
  this.latitude = latitude;
  this.longitude = longitude;
  this.phrase = phrase;
  this.map = map;
}

Fetcher.prototype.fetch = function() {
  $.post('/twitter', {lng: this.longitude, lat: this.latitude, phrase: this.phrase}, function(response){
    jQuery.each(response,function(i,val){
      var spot = new Spot(val.latitude, val.longitude, val.profile_image, val.text, val.background_image, map)
      google.maps.event.addListener(spot.marker,'click', function(e){
        spot.flashBox();
      });      
    }); 
  })
}
