require_relative 'config'
require 'sinatra'


class Piece < Sequel::Model

  def to_json(*a)
    values.to_json(*a)
  end
end

post '/piece' do
  DB.transaction do
    piece = Piece.create(
      :text => params[:text],
      :x => params[:x],
      :y => params[:y]
    )

    redirect "piece/#{piece.id}", 301
  end
end

get '/pieces' do
  Piece.all.to_json
end

get '/piece/:id' do
  Piece[params[:id]].to_json
end

put '/piece/:id' do
  DB.transaction do
    piece = Piece[params[:id]]

    piece.set(
      :text => params[:text],
      :x => params[:x],
      :y => params[:y]
    )
    piece.save

    redirect "piece/#{params[:id]}", 301
  end
end

# vim: set sw=2 et :
