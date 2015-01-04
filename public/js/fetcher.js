var Fetcher = function (latitude, longitude, phrase) {
  this.latitude = latitude;
  this.longitude = longitude;
  this.phrase = phrase;
  this.collection = []
}

Fetcher.prototype.fetch = function() {
  var collection = this.collection
  $.post('/twitter', {lng: this.longitude, lat: this.latitude, phrase: this.phrase}, function(response){
    jQuery.each(response,function(i,val){
      var spot = new Spot(val.latitude, val.longitude, val.profile_image, val.text, val.retweet_count, val.user, val.background_image)
      collection.push(spot.marker)
      spot.featureProfile()
      spot.addToList(i)
    }); 
  })
}

Fetcher.prototype.killCollection = function() {
  for (var i = 0; i < this.collection.length; i++) {
    this.collection[i].setMap(null);
  }
}
