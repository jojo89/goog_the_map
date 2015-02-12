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
    return function(data, map) {
        return new Spot.build(data, map)
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
    return function(keywords, map, list, $scope) {
        Query.fetch(map.getCenter().lng(), map.getCenter().lat(), keywords).then(function(result) {
            setupSpots(result, map, list, $scope)
            list.featuredTweet = list.tweets[0];
        })
    }
}]);

app.factory('setupSpots', ['$resource', 'spotFactory', function($resource, spotFactory) {
    return function(data, map, controller, $scope) {
        return data.map(function(tweetData) {
            var spot = spotFactory(tweetData, map)
            controller.tweets.push(spot)
            google.maps.event.addListener(spot.marker, 'click', function(e) {
                if (controller.featuredTweet != undefined) {
                    controller.featuredTweet.closeBox()
                }
                spot.flashBox();
                controller.featuredTweet = spot;
                $scope.$apply()
            });
        })
    }
}]);