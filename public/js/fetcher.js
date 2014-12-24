var Fetcher = function (latitude, longitude, phrase) {
  this.latitude = latitude;
  this.longitude = longitude;
  this.phrase = phrase;
}

Fetcher.prototype.fetch = function() {
  $.post('/twitter', {lng: this.longitude, lat: this.latitude, phrase: this.phrase}, function(response){
    jQuery.each(response,function(i,val){
      var spot = new Spot(val.latitude, val.longitude, val.profile_image, val.text)
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
