
$(document).ready(function() {
  // var List = list()
  // Map.makeMap();
  $('#zip_srch').on('click',function(){
    var address = document.getElementById('zip').value;
    Map.codeAddress(address);
  });
  $('#find_tweets').on('click',function(){
    Map.fetch(List); 
  });
  $('#clear-tweet').on('click',function(){
     List.clear()
     Map.clearMap()
  });
});


  var app;
 
  var app = angular.module('tweetFinder', ['dep']);
  
  app.factory('spot', function () {

    function Spot(latitude, longitude, profile_image, text, retweet_count, user, background_image, map) {
      this.latitude = latitude;
      this.longitude = longitude;
      this.profile_image = profile_image;
      this.text = text;
      this.retweet_count = retweet_count;
      this.user = user;
      this.background_image = background_image;
      this.map = map
      this.marker = this.makeMarker(latitude, longitude, profile_image, retweet_count);
      this.infoBox = this.makeBox(text);
    }
 
    /**
     * Public method, assigned to prototype
     */
    Spot.prototype.openBox = function() {
      this.infoBox.open(this.map, this.marker);
    };

    /**
     * Private property
     */
    Spot.prototype.flashBox = function() {
      this.openBox()
      this.popBox()
    };

    Spot.prototype.closeBox = function() {
      this.infoBox.close()
    }
    /**
     * Private function
     */
    Spot.prototype.displayProfile = function(i) {
      this.flashBox()
    }

    Spot.prototype.popBox = function() {
      var _this = this;
      window.setTimeout(function(){
        _this.closeBox()
      }, 10000);
    }

    Spot.prototype.makeMarker = function(){
      return new google.maps.Marker({
          map: this.map,
          title: 'Map Icons',
          zIndex: 9,
          icon: this.isHot(this.profile_image, this.retweet_count),
          position: new google.maps.LatLng(this.latitude, this.longitude),
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

    Spot.build = function (data, map) {
      return new Spot(
        data.latitude, data.longitude, data.profile_image, data.text, data.retweet_count, data.user, data.background_image, map
      );
    };

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
    return Spot;
  })

   app.controller('MapController', function($http, $scope, spot){
    map = this
    this.tweets = [];
    this.mapOptions = {
      zoom: 8,
      center: new google.maps.LatLng(34.397, -118.644),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.makeMap = function(){
      this.map = new google.maps.Map(document.getElementById("map-canvas"), this.mapOptions);
      this.latitude = this.map.getCenter().lat();
      this.longitude = this.map.getCenter().lng();
      
    }
    var list = this;
    var nav = this
    this.search = { place: "Los Angeles", phrase: "anything" }
    this.codeAddress = function(){
      new google.maps.Geocoder().geocode( { 'address': this.search.place }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.map.setCenter(results[0].geometry.location);
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });
    }
    $scope.loadData = function () {
      $http.post("/twitter", { lng: map.map.getCenter().lng(), lat: map.map.getCenter().lat(), phrase: map.search.phrase }).success(function(data){
        $scope.data = {}
        list.tweets = [];
        jQuery.each(data,function(i,val){
          var spt = spot.build(val, map.map)
          list.tweets.push(spt)
          google.maps.event.addListener(spt.marker,'click', function(e){
            if (list.featured != undefined){
              list.featured.closeBox()
            }
            spt.flashBox();
            list.featuredTweet = spt;
            $scope.$apply();
            list.featured = spt
          });
        });
        
        list.featuredTweet = list.tweets[0];
        $scope.data.style = {'background-image' : 'url('+ list.featuredTweet.background_image +')'}
      });
    };
    angular.element(document).ready(function () { 
      map.makeMap()
      $scope.loadData()
    });
  });








































































  app.controller('ItemController', function(){
    this.item = 1;

    this.setItem = function(item){
     this.item = item;
    };
     
    this.isSet = function(item){
      return this.item === item
    };
  });
