class Tweet
  attr_accessor :latitude, :longitude

  def initialize(latitude, longitude, phrase)
    @latitude = latitude
    @longitude = longitude
    @phrase = phrase
  end
end