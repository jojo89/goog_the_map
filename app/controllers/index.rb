get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/twitter' do 
  p params

end  
