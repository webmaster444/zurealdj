json.event_types @event_types.each do |event_type|
  json.title event_type.title
  json.id event_type.id
  json.selected current_user.event_categories.exists?(event_type.id)
end