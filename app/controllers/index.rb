get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/twitter' do 
  phrase = params[:phrase]
  latitude = params[:lat]
  longitude = params[:lng]
  post = latitude.to_s + ',' + longitude.to_s + ',23km' 

   
  @tweet = Twitter.search(phrase, :count => 100, :geocode => post,  :result_type => "recent")
  
  @tweets =  @tweet.to_hash[:statuses]

  p @tweets.length  


  tocoor={}
  @tweets.each_with_index do |r,i|
    if r[:coordinates] || r[:geo]    
      tocoor[i] = {user: r[:user][:screen_name], status: r[:text],lat: r[:coordinates][:coordinates][1],lng: r[:coordinates][:coordinates][0],pic: r[:user][:profile_image_url]}
    end
  end  
    tocoor
  tojava = tocoor

  
content_type :json
tojava.to_json
end  


