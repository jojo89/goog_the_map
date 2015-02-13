var app;
var app = angular.module('tweetFinder', ['ngResource', 'dep', 'ngRoute']);

app.controller('MapController', function($http, $scope, spotFactory, twitterSinatraApi, Query, $q, fetchAll, gMap, $interval) {
    controller = this
    controller.tweets = [];
    controller.loading = "Loading"
    controller.load = function(){
      $interval(function(){
        console.log(controller.loading)
        if(controller.loading.length < 12){
          controller.loading = controller.loading + "."
        }else{
          controller.loading = "Loading"
        }
      }, 100, 10);
      
    }
    controller.makeMap = function() {
        controller.map = gMap(34.397, -118.644)
    }
    controller.changedFeatured = function(tweet) {
        if (controller.featuredTweet != undefined) {
            controller.featuredTweet.closeBox();
        }
        controller.featuredTweet = tweet
        tweet.flashBox();
    }
    controller.flush = function() {
        if (controller.featuredTweet != undefined) {
            controller.featuredTweet.closeBox();
            controller.featuredTweet = null
        }
        for (var i = 0; i < controller.tweets.length; i++) {
            controller.tweets[i].marker.setMap(null);
        }
        controller.tweets = [];
    }
    controller.search = {
        place: "Los Angeles",
        phrase: "anything"
    }
    controller.codeAddress = function() {
        new google.maps.Geocoder().geocode({
            'address': controller.search.place
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                controller.map.setCenter(results[0].geometry.location);
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    }
    $scope.loadData = function() {
        for (var i = 0; i < controller.tweets.length; i++) {
            controller.tweets[i].marker.setMap(null);
        }
        controller.tweets = [];
        controller.flush();
        controller.load()
        fetchAll(controller.search.phrase, controller.map, controller, $scope)
    };
    angular.element(document).ready(function() {
        controller.makeMap()
        $scope.loadData()
    });
});