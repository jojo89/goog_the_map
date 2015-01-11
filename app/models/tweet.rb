class Tweet
  attr_accessor :latitude, :longitude

  def initialize(latitude, longitude, user, text, profile_image, background_image, favorite_count, retweet_count)
    @user = user
    @profile_image = profile_image
    @background_image = background_image
    @text = text
    @latitude = latitude
    @longitude = longitude
    @favorite_count = favorite_count
    @retweet_count = retweet_count
  end
  
  def text
    @text.gsub("&amp;", "&").gsub("&lt;", "<")
  end
  
  def to_json
    puts @text if @user == "Neverregrets_"
    {
      user: @user,
      profile_image: @profile_image,
      background_image: @background_image,
      text: text,
      latitude: @latitude,
      longitude: @longitude,
      retweet_count: @retweet_count,
      favorite_count: @favorite_count + @retweet_count
    }
  end
end
