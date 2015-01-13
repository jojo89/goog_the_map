function list(){
  return {
    html: $('#list ol'),
    replaceItem: function(index){
      $(this.listItems()[index]).replaceWith(this.blank())
    },
    addToList: function(spot, index){
      if (this.listItemAtIndex(index) != undefined){
        $(this.listItemAtIndex(index)).replaceWith(this.tweet(spot))
      }
    },
    clear: function(){
      for (i = 0; i < 10; i++) {
        this.replaceItem(i)
      }
    },
    tweet: function(spot){
      return "<li><a href='javascript:void(0)'>" + "<u><b>" + spot.user + "</b></u>" + "- " + spot.text.trunc(17) + "... " + spot.retweet_count + "</a></li>"
    },
    blank: function(){
      return "<li><a href='javascript:void(0)'></a></li>"
    },
    listItems: function(){
      return this.html.find('li')
    },
    listItemAtIndex: function(index){
     return this.listItems()[index]
    }
  }
}