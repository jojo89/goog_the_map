var app;
var app = angular.module('tweetFinder', ['ngResource', 'dep', 'ngRoute']);

app.controller('MapController', function($http, $scope, spotFactory, twitterSinatraApi, Query, $q, fetchAll, gMap, $interval, $timeout) {
    controller = this
    controller.tweets = [];
    controller.loading = "Loading"
    controller.noTweetImage = null
    controller.load = function() {
        $interval(function() {
            if (controller.loading.length < 12) {
                controller.loading = controller.loading + "."
            } else {
                controller.loading = "Loading"
            }
        }, 100, 10);

        $timeout(function() {
            controller.loading = "Sorry No Tweets :("
            controller.noTweetImage = "http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2008/03/28/400.276.jpg"

        }, 5000);
    }
    controller.makeMap = function() {
        controller.map = gMap(40.7127, -74)
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
        place: "New York City",
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
        controller.codeAddress()
        $timeout(function() {
          controller.noTweetImage = ""
          for (var i = 0; i < controller.tweets.length; i++) {
              controller.tweets[i].marker.setMap(null);
          }
          controller.tweets = [];
          controller.flush();
          controller.load()
          fetchAll(controller.search.phrase, controller.map, controller, $scope)
        }, 200);
      };
    angular.element(document).ready(function() {
        controller.makeMap()
        $scope.loadData()
    });
});