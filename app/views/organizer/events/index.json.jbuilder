json.events @events.each do |event|
  json.id event.id
  json.created_at event.created_at.strftime("%d/%m/%Y")
  json.title event.title
  json.city event.city
  json.country event.country_flag
  json.address event.address
  json.start_date event.start_date
  json.end_date event.end_date
  json.image event.image.url
end
json.count @count