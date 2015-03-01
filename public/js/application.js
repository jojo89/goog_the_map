var app;
var app = angular.module('tweetFinder', ['ngResource', 'dep', 'ngRoute']);

app.controller('MapController', function($http, $scope, spotFactory, twitterSinatraApi, Query, $q, fetchAll, gMap, $interval, $timeout) {
    controller = this
    $scope.tweets = [];
    $scope.loading = "Loading"
    $scope.noTweetImage = null
    $scope.load = function() {
        $interval(function() {
            if ($scope.loading.length < 12) {
                $scope.loading = $scope.loading + "."
            } else {
                $scope.loading = "Loading"
            }
        }, 100, 10);

        $timeout(function() {
            $scope.loading = "Sorry No Tweets :("
            $scope.noTweetImage = "http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2008/03/28/400.276.jpg"
        }, 5000);
    }
    $scope.makeMap = function() {
        $scope.map = gMap(40.7127, -74)
    }
    $scope.changedFeatured = function(tweet) {
        if ($scope.featuredTweet != undefined) {
            $scope.featuredTweet.closeBox();
        }
        $scope.featuredTweet = tweet
        tweet.flashBox();
    }
    $scope.flush = function() {
        if ($scope.featuredTweet != undefined) {
            $scope.featuredTweet.closeBox();
            $scope.featuredTweet = null
        }
        for (var i = 0; i < $scope.tweets.length; i++) {
            $scope.tweets[i].marker.setMap(null);
        }
        $scope.tweets = [];
    }
    $scope.search = {
        place: "New York City",
        phrase: "anything"
    }
    $scope.codeAddress = function() {
        new google.maps.Geocoder().geocode({
            'address': $scope.search.place
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                $scope.map.setCenter(results[0].geometry.location);
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    }
    $scope.loadData = function() {
        $scope.codeAddress()
        $timeout(function() {
          $scope.noTweetImage = ""
          for (var i = 0; i < $scope.tweets.length; i++) {
              $scope.tweets[i].marker.setMap(null);
          }
          $scope.tweets = [];
          $scope.flush();
          $scope.load()
          fetchAll($scope)
        }, 200);
      };
    angular.element(document).ready(function() {
        $scope.makeMap()
        $scope.loadData()
    });
});