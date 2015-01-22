$(document).ready(function() {
  var List = list()
  Map.makeMap();
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
  var app = angular.module('tweetFinder', []);
  var initTweet = [
    { 
      name: 'Jodeza',
      tweet: "Can't believe my cat right now. hashtag whatabitch lol.", 
      canShow: true, 
      price: 45, 
      image: "https://pbs.twimg.com/profile_images/3221004065/743ee2b5082dc27ac647e8f3ee18a0f0_400x400.gif" 
    }, 
    { 
      name: 'lint', 
      tweet: "My Mom be trippin. She ain't even aight.", 
      canShow: true, 
      price: 34,
      image: "https://pbs.twimg.com/profile_images/3221004065/743ee2b5082dc27ac647e8f3ee18a0f0_400x400.gif" 
    }
  ];

  app.controller('ListController', function(){
    this.tweets = initTweet;
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
  
  app.controller('FormController', function(){
    this.object = {stars: 4, text: "j", person: "rich keef"};
    this.reviews = [{stars: 5, text: "ferret", person: "chief joseph"}, {stars: 4, text: "annual", person: "chief keef"}];
    this.addReview = function(review){
      this.object.createdAt = Date.now()
      this.reviews.push(this.object)
      this.object = {};
    }
  
  })
