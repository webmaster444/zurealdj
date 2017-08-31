json.genres @genres.each do |event_type|
  json.title event_type.title
  json.id event_type.id
  json.selected current_user.genres.exists?(event_type.id)
end