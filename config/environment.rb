# Set up gems listed in the Gemfile.
# See: http://gembundler.com/bundler_setup.html
#      http://stackoverflow.com/questions/7243486/why-do-you-need-require-bundler-setup
ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../../Gemfile', __FILE__)

require 'bundler/setup' if File.exists?(ENV['BUNDLE_GEMFILE'])

# Require gems we care about
require 'rubygems'

require 'uri'
require 'pathname'
require 'yaml'
require 'active_record'
require 'logger'
require 'twitter'
require 'sinatra'
require "sinatra/reloader" if development?

require 'erb'

# Some helper constants for path-centric logic
APP_ROOT = Pathname.new(File.expand_path('../../', __FILE__))

APP_NAME = APP_ROOT.basename.to_s

env_config = YAML.load_file(APP_ROOT.join('config', 'tokens.yaml'))

env_config.each do |key, value|
  ENV[key] = value
end

CLIENT = Twitter::REST::Client.new do |config|
  config.consumer_key        = 'aZC0XJqFLPH6RxWjoCnXDQ'
  config.consumer_secret     = '4lOHesC12DG8zxpYWyqBaDLvgVC4hZziM7WVFt1crjw'
  config.access_token        = '1157570274-6B0gWeLkDXAyEOEE8LtdWaDP3v1i6mcpN1eUqW3'
  config.access_token_secret = 'gGFyPa0cvJhGTJK1kK6IaovswBY3Dd27QsujqpxLeE'
end


# Set up the controllers and helpers
Dir[APP_ROOT.join('app', 'controllers', '*.rb')].each { |file| require file }
Dir[APP_ROOT.join('app', 'models', '*.rb')].each { |file| require file }
Dir[APP_ROOT.join('app', 'helpers', '*.rb')].each { |file| require file }

# Set up the database and models
