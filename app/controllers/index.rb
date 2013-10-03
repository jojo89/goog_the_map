get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/twitter' do 
   latitude = params[:lat]
   longitude = params[:lng]
   p post = latitude.to_s + ',' + longitude.to_s + ',6mi'

   p @tweets = Twitter.search(post)
   
end  
