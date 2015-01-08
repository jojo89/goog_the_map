var Fetcher = function (latitude, longitude, phrase, list) {
  this.latitude = latitude;
  this.longitude = longitude;
  this.phrase = phrase;
  this.collection = []
  this.list = list
}

Fetcher.prototype.fetch = function() {
  var fetcher = this
  var collection = this.collection
  fetcher.clearList()
  $.post('/twitter', {lng: this.longitude, lat: this.latitude, phrase: this.phrase}, function(response){
    jQuery.each(response,function(i,val){
      var spot = new Spot(val.latitude, val.longitude, val.profile_image, val.text, val.retweet_count, val.user, val.background_image)
      collection.push(spot.marker)
      fetcher.bindMarker(spot, i)
      fetcher.appendToList(spot, i)
      fetcher.bindList(spot, i)
    });
  })
}

Fetcher.prototype.clearList = function() {
  this.list.clear()
}

Fetcher.prototype.appendToList = function(spot, index) {
  this.list.addToList(spot, index)
}

Fetcher.prototype.bindMarker = function(spot, i) {
  var fetcher = this
  google.maps.event.addListener(spot.marker,'click', function(e){
    if (fetcher.featureSpot != undefined){
      fetcher.featureSpot.closeBox()
    }
    fetcher.featureSpot = spot
      spot.displayProfile(i);
  });
}

Fetcher.prototype.bindList = function(spot, index) {
  var fetcher = this
  $(fetcher.list.listItemAtIndex(index)).click(function(){
    if (fetcher.featureSpot != undefined){
      fetcher.featureSpot.closeBox()
    }
    fetcher.featureSpot = spot
    spot.displayProfile(index);
  });
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
