json.events @events.each do |event|
  json.id event.id
  json.created_at event.created_at.try(:strftime, "%d/%m/%Y")
  json.title event.title
  json.city event.city
  json.venue_name event.venue_name
  json.country CountryFlag.find(event['country_flag_code']).try(:[], :title)
  json.start_date event.start_date.try(:strftime, "%d/%m/%Y") if event.start_date.present?
  json.start_time  timeformat(event.start_date) if event.start_date.present?
  json.end_date event.end_date.try(:strftime, "%d/%m/%Y") if event.end_date.present?
  json.end_time timeformat(event.end_date) if event.end_date.present?
  json.image paperclip_url(event.image, :large)
  json.status event.status
  json.djs event.djs.each do |dj|
    json.avatar dj.user.avatar.try(:url, :small)
  end
end
json.count @count

json.genres @genres do |genre|
  json.id genre.id
  json.title genre.title
end
json.event_types @event_types do |event_type|
  json.id event_type.id
  json.title event_type.title
end

json.min_rate @rate_minmax.min
json.max_rate @rate_minmax.max