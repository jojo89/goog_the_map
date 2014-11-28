get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/twitter' do
  @location = Location.new(params[:lat], params[:lng])
  @search = Search.new(@location, params[:phrase]).query_twitter

  tocoor={}
  @search.each_with_index do |r,i|
    if r[:coordinates] || r[:geo]    
      tocoor[i] = {user: r[:user][:screen_name], status: r[:text],lat: r[:coordinates][:coordinates][1],lng: r[:coordinates][:coordinates][0],pic: r[:user][:profile_image_url], bg:r[:user][:profile_background_image_url]}
    end
  end  
    tocoor
  tojava = tocoor

  
content_type :json
tojava.to_json
end  


