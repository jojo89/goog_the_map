class Location
  attr_accessor :latitude, :longitude

  def initialize(latitude, longitude)
    @latitude = latitude
    @longitude = longitude
  end
  
  def twitter_location
    latitude.to_s + ',' + longitude.to_s + ',23km'
  end
end