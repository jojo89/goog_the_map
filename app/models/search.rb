class Search
  attr_accessor :location, :phrase

  def initialize(location, phrase)
    @location = location
    @phrase = phrase
    
  end
  
  def query_twitter
    CLIENT.search(phrase, :count => 100, :geocode => location.twitter_location,  :result_type => "recent")
  end
  
  def twitter_tweets
    query_twitter.to_hash[:statuses]
  end
  
  def tweets
    tweets = twitter_tweets.map.with_index do |tweet, index|
      if tweet[:coordinates] || tweet[:geo]    
        Tweet.new( tweet[:coordinates][:coordinates][1], tweet[:coordinates][:coordinates][0], tweet[:user][:screen_name], 
          tweet[:text], tweet[:user][:profile_image_url], tweet[:user][:profile_background_image_url], tweet[:retweet_count],
          tweet[:favorite_count]
        ).to_json
      end
    end
    tweets.sort_by{|x| x[:retweet_count]}.reverse
  end 
end
