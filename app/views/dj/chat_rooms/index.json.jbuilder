json.events @events.each do |event|
  next unless event.booking_for(@current_dj)
  json.id event.id
  json.title event.title
  json.image paperclip_url(event.image, :original)
  json.booking_id event.booking_for(@current_dj).id
  json.dj_id current_user.id
end
json.count @count