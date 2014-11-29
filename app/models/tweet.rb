class Tweet
  attr_accessor :latitude, :longitude

  def initialize(latitude, longitude, user, text, profile_image, background_image)
    @user = user
    @profile_image = profile_image
    @background_image = background_image
    @text = text
    @latitude = latitude
    @longitude = longitude
  end
  
  def to_json
    {user: @user, profile_image: @profile_image, background_image: @background_image, text: @text, latitude: @latitude, longitude: @longitude }
  end
end
