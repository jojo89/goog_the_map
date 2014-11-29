require 'json'

get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/twitter' do
  @location = Location.new(params[:lat], params[:lng])
  @tweets = Search.new(@location, params[:phrase]).tweets
  tocoor={}
  @tweets.each_with_index do |r,i|
    if r[:coordinates] || r[:geo]    
      tocoor[i] = Tweet.new(
        r[:coordinates][:coordinates][1], 
        r[:coordinates][:coordinates][0], 
        r[:user][:screen_name], 
        r[:text], 
        r[:user][:profile_image_url], 
        r[:user][:profile_background_image_url]
      ).to_json
    end
  end  
  
content_type :json
tocoor.to_json
end  


