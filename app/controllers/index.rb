require 'json'

get '/' do
  erb :index
end

get '/twitter/:lat/:lng/:phrase' do
  puts params
  @location = Location.new(params["lng"], params["lat"])
  puts "this"
  puts @location
  puts @location.twitter_location

  @tweets = Search.new(@location, params[:phrase]).tweets
  puts @tweets
  content_type :json
  @tweets.to_json
end  

