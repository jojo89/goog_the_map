var Spot = function (marker, infoBox, background) {
  this.marker = marker;
  this.infoBox = infoBox;
  this.background = background;
}

Spot.prototype.openBox = function() {
  this.infoBox.open(map, this.marker);
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
  }, 2000);
}