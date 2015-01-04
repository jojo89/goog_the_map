require 'json'

get '/' do
  # Look in app/views/index.erb
  @hot = settings.mongo_db['prod'].find.sort(:retweet_count => :desc).to_a.first(10)
  erb :index
end

post '/twitter' do
  @location = Location.new(params[:lat], params[:lng])
  @tweets = Search.new(@location, params[:phrase]).tweets.sort_by{|x| x[:favorite_count]}
  @tweets.each do |tweet|
    settings.mongo_db['prod'].insert(tweet)
  end
  content_type :json
  @tweets.to_json
end  

