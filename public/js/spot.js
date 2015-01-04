var Spot = function (latitude, longitude, profile_image, text, retweet_count) {
  this.marker = this.makeMarker(latitude, longitude, profile_image, retweet_count);
  this.infoBox = this.makeBox(text);
}

Spot.prototype.openBox = function() {
  this.infoBox.open(googleMap, this.marker);
};

Spot.prototype.flashBox = function() {
  this.openBox()
  this.popBox()
};

Spot.prototype.closeBox = function() {
  this.infoBox.close()
}

Spot.prototype.popBox = function() {
  var _this = this;
  window.setTimeout(function(){
    _this.closeBox()
  }, 10000);
}

Spot.prototype.makeMarker = function(latitude, longitude, profile_image, retweet_count){
  return new google.maps.Marker({
      map: googleMap,
    title: 'Map Icons',
    zIndex: 9,
      icon: this.isHot(profile_image, retweet_count),
      position: new google.maps.LatLng(latitude, longitude),
      visible: true
  });
}

Spot.prototype.hot = function(){
  return "/images/1420351727_132117.ico"
}

Spot.prototype.isHot = function(profile_image, retweetCount){
  if(retweetCount > 2){
    return this.hot()
  }else{
    return profile_image;
  }
}

Spot.prototype.makeBox = function(text){
  return new InfoBox({
    content: '<div style="background-repeat:no-repeat;background:white; padding: 10px 30px; color:blue; border-radius:150px; ">'+text+'</div>'
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