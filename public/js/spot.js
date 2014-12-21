var Spot = function (latitude, longitude, profile_image, text, background) {
  this.marker = this.makeMarker(latitude, longitude, profile_image);
  this.infoBox = this.makeBox(text);
  this.background = background;
}

Spot.prototype.openBox = function() {
  this.infoBox.open(googleMap, this.marker);
};

Spot.prototype.flashBox = function() {
  this.openBox()
  this.changeBackground()
  this.popBox()
};

Spot.prototype.changeBackground = function() {
  $('body').css('background-image', 'url('+ this.background +')')
}

Spot.prototype.closeBox = function() {
  this.infoBox.close()
}

Spot.prototype.popBox = function() {
  var _this = this;
  window.setTimeout(function(){
    _this.closeBox()
  }, 10000);
}

Spot.prototype.makeMarker = function(latitude, longitude, profile_image){
  return new google.maps.Marker({
      map: googleMap,
      icon: profile_image,
      position: new google.maps.LatLng(latitude, longitude),
      visible: true
  });
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