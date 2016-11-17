json.events @events.each do |event|
  json.id event.id
  json.created_at time_ago_in_words(event.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + event.created_at.strftime("%H:%M")
  
  json.title events.title
  
  
  json.city events.city
  
  
  json.country events.country_flag

  
  json.address events.address
  
  
  json.start_date events.start_date
  
  
  json.end_date events.end_date
  
  
  json.image events.image
  
  
end
json.count @count