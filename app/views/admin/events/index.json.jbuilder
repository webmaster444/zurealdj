json.events @events.each do |event|
  json.id event.id
  json.created_at time_ago_in_words(event.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + event.created_at.strftime("%H:%M")
  json.title event.title
  json.city event.city
  json.country event.country_flag
  json.address event.address
  json.start_date event.start_date
  json.end_date event.end_date
  json.image event.image
end
json.count @count