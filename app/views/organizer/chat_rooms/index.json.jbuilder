json.events @events.each do |event|
  next if event.confirmed_bookings_count == 0
  json.id event.id
  json.created_at event.created_at.strftime("%d/%m/%Y")
  json.title event.title
  json.city event.city
  json.country CountryFlag.find(event['country_flag_code']).try(:[], :title)
  json.address event.address
  json.start_date event.start_date.try(:strftime, "%d/%m/%Y")
  json.end_date event.end_date.try(:strftime, "%d/%m/%Y")
  json.image event.image.url
  json.djs event.djs.each do |dj|
    next unless event.booking_for(dj).confirmed?
    json.id dj.user.id
    json.booking_id event.booking_for(dj).id
    json.avatar dj.user.avatar.try(:url, :small) if dj.user.avatar_file_name.present?
    json.avatar "/images/icons/img-profile-photo-mini.png" unless dj.user.avatar_file_name.present?
    json.name dj.user.name
    json.online dj.user.online

    json.unread_messages_count event.unread_messages_count_for(current_user, dj.user)
    last_message = event.last_message(dj.user.id, current_user.id)
    json.last_message do
      json.user_avatar last_message.user_avatar
      json.body last_message.body
      json.date time_ago_in_words(last_message.created_at) + ' ago'
    end if last_message
  end
  json.unread_messages_count event.unread_messages_count_for(current_user)
end
json.count @count