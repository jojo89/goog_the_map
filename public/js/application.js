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
  app.controller('MapController', function($http, $scope){
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
        list.tweets = data;
        list.featuredTweet = list.tweets[0];
        $scope.data = {}
        $scope.data.style = {'background-image' : 'url('+ list.featuredTweet.background_image +')'}
        jQuery.each(data,function(i,val){
          return new google.maps.Marker({
              map: map.map,
              title: 'Map Icons',
              zIndex: 9,
              icon: val.profile_image,
              position: new google.maps.LatLng(val.latitude, val.longitude),
              visible: true
          });
         });
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
