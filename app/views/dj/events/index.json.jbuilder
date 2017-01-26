json.events @events.each do |event|
  json.id event.id
  json.created_at event.created_at.try(:strftime, "%d/%m/%Y")
  json.title event.title
  json.city event.city
  json.country CountryFlag.find(event['country_flag_code']).try(:[], :title)
  json.address event.address
  json.start_date event.start_date.try(:strftime, "%d/%m/%Y")
  json.end_date event.end_date.try(:strftime, "%d/%m/%Y")
  json.image event.image.url
end
json.count @count