require 'rubygems'
require 'bundler/setup'
require 'sequel'
require 'json'

DB = Sequel.sqlite('database.db')
