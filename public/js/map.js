var Map = function (startingLatitude, startingLongitude) {
  this.geocoder = new google.maps.Geocoder();
  this.map = this.makeMap(new google.maps.LatLng(startingLatitude, startingLongitude))
}

Map.prototype.makeMap = function(latlng) {
  var mapOptions = {
    zoom: 8,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  return new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
};

Map.prototype.setMap = function(latlng) {
  return this;
};

Map.prototype.clearMap = function(latlng) {
  this.fetcher.killCollection();
  this.fetcher.killFeatureSpot();
};

Map.prototype.fetch = function() {
  var lng = this.map.getCenter().lng();
  var lat = this.map.getCenter().lat();
  var phrase = document.getElementById('phrase').value;
  googleMap = this.map
  if(typeof this.fetcher !== 'undefined'){
    this.clearMap()
  }
  this.fetcher = new Fetcher(lat, lng, phrase)
  this.fetcher.fetch();
};
