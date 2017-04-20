json.events @events.each do |event|
  json.id event.id
  json.created_at time_ago_in_words(event.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + event.created_at.strftime("%H:%M")
  json.title event.title
  json.city event.city
  json.venue_name event.venue_name
  json.country event.country_flag
  json.address event.address
  json.start_date event.start_date.strftime("%d/%m/%Y ") + timeformat(event.start_date) if event.start_date.present?
  json.end_date event.end_date.strftime("%d/%m/%Y ") + timeformat(event.end_date) if event.end_date.present?
  json.image paperclip_url(event.image, :small)
  json.dj_slots event.dj_slots
end
json.count @count