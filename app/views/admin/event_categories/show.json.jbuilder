json.event_category do
  json.id @event_category.id
  json.created_at time_ago_in_words(@event_category.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @event_category.created_at.strftime("%H:%M")
  json.title @event_category.title
  json.created_at @event_category.created_at
  json.updated_at @event_category.updated_at
end