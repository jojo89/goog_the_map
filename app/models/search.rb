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
    tweet_hash = {}
    twitter_tweets.each_with_index do |r,i|
      if r[:coordinates] || r[:geo]    
        tweet_hash[i] = Tweet.new(
          r[:coordinates][:coordinates][1], 
          r[:coordinates][:coordinates][0], 
          r[:user][:screen_name], 
          r[:text], 
          r[:user][:profile_image_url], 
          r[:user][:profile_background_image_url]          
        ).to_json
        
      end
    end
    tweet_hash
  end 
end
