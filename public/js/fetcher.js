var Fetcher = function (latitude, longitude, phrase) {
  this.latitude = latitude;
  this.longitude = longitude;
  this.phrase = phrase;
  this.collection = []
}

Fetcher.prototype.fetch = function() {
  var fetcher = this
  var collection = this.collection
  $.post('/twitter', {lng: this.longitude, lat: this.latitude, phrase: this.phrase}, function(response){
    jQuery.each(response,function(i,val){
      var spot = new Spot(val.latitude, val.longitude, val.profile_image, val.text, val.retweet_count, val.user, val.background_image)
      collection.push(spot.marker)
      google.maps.event.addListener(spot.marker,'click', function(e){
        if (fetcher.featureSpot != undefined){
          fetcher.featureSpot.closeBox()
        }
        fetcher.featureSpot = spot
        spot.displayProfile(i);
      });
      spot.addToList(i)
      $($('#list ol li')[i]).click(function() {
        if (fetcher.featureSpot != undefined){
          fetcher.featureSpot.closeBox()
        }
        fetcher.featureSpot = spot
        spot.displayProfile(i);
      });
    });
    if(response.length < 10){
      for (i = response.length; i < 10; i++) {
        $($('#list ol li')[i]).replaceWith("<li><a href='javascript:void(0)'></a></li>")
      }
    }
  })
}

Fetcher.prototype.killCollection = function() {
  for (var i = 0; i < this.collection.length; i++) {
    this.collection[i].setMap(null);
  }
}

Fetcher.prototype.killFeatureSpot = function() {
  if (this.featureSpot != undefined){
    this.featureSpot.closeBox()
  }
}
