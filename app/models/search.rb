class Search
  attr_accessor :location, :phrase

  def initialize(location, phrase)
    @location = location
    @phrase = phrase
  end
  
  def query_twitter
    Twitter.search(phrase, :count => 100, :geocode => location.twitter_location,  :result_type => "recent")
  end
end
