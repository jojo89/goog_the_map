get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/twitter' do 
  phrase = params[:phrase]
  latitude = params[:lat]
  longitude = params[:lng]
  post = latitude.to_s + ',' + longitude.to_s + ',80km' 

   
  @tweet = Twitter.search(phrase, :geocode => post, :result_type => "recent")

  @tweets =  @tweet.to_hash[:statuses]
    

  tolocation={}
  tocoor={}
  @tweets.each_with_index do |r,i|
    if r[:coordinates].nil? || r[:geo].nil?
      tolocation[i] = {user: r[:user][:screen_name], status: r[:text],location:r[:user][:location]}
    elsif
      tocoor[i] = {user: r[:user][:screen_name], status: r[:text],lat: r[:coordinates][:coordinates][1],long: r[:coordinates][:coordinates][0]}
    end
  end  
  p tolocation
  tojava = {location: tolocation, coordinates: tocoor} 

  
content_type :json
tojava.to_json
end  


