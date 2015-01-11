var Map = {
  makeMap: function(){
    var mapOptions = {
      zoom: 8,
      center: new google.maps.LatLng(34.397, -118.644),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  },
  clearMap: function(latlng) {
    this.fetcher.killCollection();
    this.fetcher.killFeatureSpot();
  },
  codeAddress: function(address){
    var map = this.map 
    new google.maps.Geocoder().geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  },
  fetch: function(list) {
    var lng = this.map.getCenter().lng();
    var lat = this.map.getCenter().lat();
    var phrase = document.getElementById('phrase').value;
    googleMap = this.map
    if(typeof this.fetcher !== 'undefined'){
      this.clearMap()
    }
    this.fetcher = new Fetcher(lat, lng, phrase, list)
    this.fetcher.fetch();
  }
}
