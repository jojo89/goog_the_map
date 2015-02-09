  var app;
  var app = angular.module('tweetFinder', ['ngResource','dep', 'ngRoute']);

   app.controller('MapController', function($http, $scope, spotFactory, Twitter, momo, mapi, $q, fetchAll){
    controller = this
    controller.tweets = [];
    controller.mapOptions = {
      zoom: 8,
      center: new google.maps.LatLng(34.397, -118.644),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    controller.makeMap = function(){
      controller.map = new google.maps.Map(document.getElementById("map-canvas"), this.mapOptions);
      controller.latitude = this.map.getCenter().lat();
      controller.longitude = this.map.getCenter().lng();
    }
    controller.changedFeatured = function(tweet){
      if (controller.featuredTweet != undefined){
        controller.featuredTweet.closeBox();
      }
      controller.featuredTweet = tweet
      tweet.flashBox();
    }
    controller.flush = function(){
      if (controller.featuredTweet != undefined){
        controller.featuredTweet.closeBox();
        controller.featuredTweet = null
        $scope.data.style = {'background' : 'rgb(255, 120, 144)'}
      }
      for (var i = 0; i < controller.tweets.length; i++) {
        controller.tweets[i].marker.setMap(null);
      }
      controller.tweets = [];
    }

    controller.search = { place: "Los Angeles", phrase: "anything" }
    controller.codeAddress = function(){
      new google.maps.Geocoder().geocode( { 'address': controller.search.place }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          controller.map.setCenter(results[0].geometry.location);
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });
    }
    $scope.data = {}
    $scope.loadData = function () {
      for (var i = 0; i < controller.tweets.length; i++) {
        controller.tweets[i].marker.setMap(null);
      }
      controller.tweets = [];
      controller.flush();
      fetchAll(controller.search.phrase, controller.map, controller, $scope)
    };
    angular.element(document).ready(function () { 
      controller.makeMap()
      $scope.loadData()
    });
  });
