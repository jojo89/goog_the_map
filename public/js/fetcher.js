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
      var spot = new Spot(val.latitude, val.longitude, val.profile_image, val.text, val.retweet_count)
      collection.push(spot.marker)
      google.maps.event.addListener(spot.marker,'click', function(e){
        $('#profile').css('background-image', 'url('+ val.background_image +')')
        $('.profile-pic')[0].setAttribute("src", val.profile_image.replace("_normal", ""))
        $('body').find('.screenname').text(val.user)
        $('body').find('.tweet p').text(val.text)
        spot.flashBox();
      });      
    }); 
  })
}

Fetcher.prototype.killCollection = function() {
  for (var i = 0; i < this.collection.length; i++) {
    this.collection[i].setMap(null);
  }
}
