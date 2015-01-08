var List = function (html) {
  this.html = html;
}

List.prototype.replaceItem = function(index) {
  $(this.listItems()[index]).replaceWith(this.blank())
}

List.prototype.addToList = function(spot, index) {
  if (this.listItemAtIndex(index) != undefined){
    $(this.listItemAtIndex(index)).replaceWith(this.tweet(spot))
  }
}

List.prototype.clear = function() {
  for (i = 0; i < 10; i++) {
    this.replaceItem(i)
  }
}

List.prototype.tweet = function(spot){
  return "<li><a href='javascript:void(0)'>" + spot.user + "- " + spot.text.trunc(17) + "... " + spot.retweet_count + "</a></li>"
}

List.prototype.blank = function(){
  return "<li><a href='javascript:void(0)'></a></li>"
}

List.prototype.listItems = function(){
  return this.html.find('li')
}

List.prototype.listItemAtIndex = function(index){
  return this.listItems()[index]
}
