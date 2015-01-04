var Spot = function (latitude, longitude, profile_image, text, retweet_count, user, background_image) {
  this.latitude = latitude
  this.longitude = longitude
  this.profile_image = profile_image
  this.text = text
  this.retweet_count = retweet_count
  this.user = user
  this.background_image = background_image
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

Spot.prototype.addToList = function(i) {
  var spot = this
  if ($('#list ol li')[i] != undefined){
    $('#list ol li')[i].innerHTML = this.user + "- " + this.text.trunc(17) + "... " + this.retweet_count
    $($('#list ol li')[i]).click(function() {
      spot.flashBox()
    });
  }
}

Spot.prototype.featureProfile = function() {
  var spot = this
  google.maps.event.addListener(this.marker,'click', function(e){
    $('#tweeter-page')[0].setAttribute("href", "https://twitter.com/" + spot.user)
    $('#profile').css('background-image', 'url('+ spot.background_image +')')
    $('.profile-pic')[0].setAttribute("src", spot.profile_image.replace("_normal", ""))
    $('body').find('.screenname').text(spot.user)
    $('body').find('.tweet p').text(spot.text)
    spot.flashBox();
  });      
  
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