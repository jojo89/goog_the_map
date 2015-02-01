(function() {

  var app = angular.module('dep', []);

  app.directive('footer', function(){
    return {
      restrict: 'E',
      templateUrl: 'partials/headline.html'
    }
  })

  app.directive('instructions', function(){
    return {
      restrict: 'E',
      templateUrl: 'partials/instructions.html',
      controller:  function(){
        this.item = 1;
        this.setItem = function(item){
          this.item = item;
        };
        this.isSet = function(item){
          return this.item === item
        };
      },
      controllerAs: "item"
    }
  })
})();
