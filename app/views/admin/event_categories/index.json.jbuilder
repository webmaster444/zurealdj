json.event_categories @event_categories.each do |event_category|
  json.id event_category.id
  json.created_at time_ago_in_words(event_category.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + event_category.created_at.strftime("%H:%M")
  
  json.title event_category.title
end
json.count @count