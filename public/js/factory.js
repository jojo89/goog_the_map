app.factory('gMap', function() {
    return function(latitude, longitude) {
        var mapOptions = {
            zoom: 8,
            center: new google.maps.LatLng(latitude, longitude),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        return new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    }
});

app.factory('spotFactory', function() {
    return function(data, $scope) {
        return new Spot.build(data, $scope.map)
    }
});

app.provider('twitterSinatraApi', function() {
    this.$get = ['$resource', function($resource) {
        var Tweets = $resource('/twitter/:lat/:lng/:phrase', {});
        return Tweets
    }];
});

app.factory('Query', ['$resource', 'spotFactory', 'twitterSinatraApi', '$q', function($resource, spotFactory, twitterSinatraApi, $q) {
    var Query = {
        fetch: function(lat, lng, phrased) {
            query = $q.defer();
            t = new twitterSinatraApi.query({
                lat: lat,
                lng: lng,
                phrase: phrased
            }, function(tweets) {
                query.resolve(tweets)
            })
            return query.promise
        }
    }
    return Query
}]);

app.factory('fetchAll', ['$resource', 'spotFactory', 'Query', 'setupSpots', function($resource, spotFactory, Query, setupSpots) {
    return function($scope) {
        Query.fetch($scope.map.getCenter().lng(), $scope.map.getCenter().lat(), $scope.search.phrase).then(function(result) {
            setupSpots(result, $scope)
            $scope.featuredTweet = $scope.tweets[0];
        })
    }
}]);

app.factory('setupSpots', ['$resource', 'spotFactory', function($resource, spotFactory) {
    return function(data, $scope) {
        return data.map(function(tweetData) {
            var spot = spotFactory(tweetData, $scope)
            $scope.tweets.push(spot)
            google.maps.event.addListener(spot.marker, 'click', function(e) {
                if ($scope.featuredTweet != undefined) {
                    $scope.featuredTweet.closeBox()
                }
                spot.flashBox();
                $scope.featuredTweet = spot;
                $scope.$apply()
            });
        })
    }
}]);
