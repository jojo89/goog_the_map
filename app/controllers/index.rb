require 'json'

get '/' do
  erb :index
end

post '/twitter' do
  params.merge! JSON.parse(request.env["rack.input"].read)
  @location = Location.new(params[:lat], params[:lng])
  @tweets = Search.new(@location, params[:phrase]).tweets
  content_type :json
  @tweets.to_json
end  

