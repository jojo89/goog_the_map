  var app;
  var app = angular.module('tweetFinder', ['ngResource','dep', 'ngRoute']);

   app.controller('MapController', function($http, $scope, spot, Twitter, momo, mapi, $q, trio){
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
    var nav = this;
    this.changedFeatured = function(tweet){
      if (list.featuredTweet != undefined){
        this.featuredTweet.closeBox();
      }
      this.featuredTweet = tweet
      tweet.flashBox();
    }

    this.flush = function(){
      if (list.featuredTweet != undefined){
        list.featuredTweet.closeBox();
      }
      for (var i = 0; i < list.tweets.length; i++) {
        list.tweets[i].marker.setMap(null);
      }
      this.tweets = [];
    }

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
    $scope.data = {}
    $scope.loadData = function () {
      for (var i = 0; i < list.tweets.length; i++) {
        list.tweets[i].marker.setMap(null);
      }
      list.tweets = [];
      // var map = mapi(34.397, -118.644)
      var geo = trio(-118.644, 34, map.map, list, $scope)
      // $http.get("/twitter/" + map.map.getCenter().lng() +"/" +map.map.getCenter().lat()+"/" + map.search.phrase).success(function(data){
      //   $scope.data = {}
      //   for (var i = 0; i < list.tweets.length; i++) {
      //     list.tweets[i].marker.setMap(null);
      //   }
      //   list.tweets = [];
      //   jQuery.each(data,function(i,val){
      //     var spt = spot(val, map.map)
      //     list.tweets.push(spt)
      //     google.maps.event.addListener(spt.marker,'click', function(e){
      //       if (list.featuredTweet != undefined){
      //         list.featuredTweet.closeBox()
      //       }
      //       spt.flashBox();
      //       list.featuredTweet = spt;
      //       $scope.$apply();
      //     });
      //   });
        // list.featuredTweet = list.tweets[0];
        // $scope.data.style = {'background-image' : 'url('+ list.featuredTweet.background_image +')'}
      // });
    };
    angular.element(document).ready(function () { 
      map.makeMap()
      $scope.loadData()
    });
  });
