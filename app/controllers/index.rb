require 'json'

get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/twitter' do
  @location = Location.new(params[:lat], params[:lng])
  @tweets = Search.new(@location, params[:phrase]).tweets
  content_type :json
  @tweets.to_json
end  


