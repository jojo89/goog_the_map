(function() {

  var app = angular.module('dep', []);

  app.directive('footer', function(){
    return {
      restrict: 'E',
      templateUrl: 'partials/headline.html'
    }
  })


  app.directive("formage", function() {
    return {
      restrict: "E",
      templateUrl: "partials/formage.html",
      controller: ['$http', function($http){
        this.object = {stars: 4, text: "j", person: "rich keef"};
        var form = this;
        this.reviews = [];
        $http.get('fixtures/reviews.json').success(function(data){
          form.reviews = data;
        });
        this.addReview = function(review){
          this.object.createdAt = Date.now()
          this.reviews.push(this.object)
          this.object = {};
        }
      }],
      controllerAs: "form"
    };
  });
})();