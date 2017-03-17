json.events @events.each do |event|
  json.id event.id
  json.title event.title
  json.image paperclip_url(event.image, :original)
  json.booking_id event.booking_for(@current_dj).id
  json.organizer_id Organizer.find(event.organizer_id).user_id
  json.unread_messages_count event.unread_messages_count_for(current_user)
  last_message = event.last_message( Organizer.find(event.organizer_id).user_id, current_user.id)
  json.org_name event.organizer.user.name
  json.org_avatar event.organizer.user.avatar
  json.org_online event.organizer.user.online
  json.djs_count event.djs.length
  json.last_message do
    json.user_avatar last_message.user_avatar
    json.body last_message.body
    json.date time_ago_in_words(last_message.created_at) + ' ago'
  end if last_message
end
json.count @count