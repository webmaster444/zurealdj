json.personal_url @user.personal_url
json.company_name @user.company_name
json.name @user.name
json.avatar do
  json.url paperclip_url(@user.avatar, :large)
  json.small paperclip_url(@user.avatar, :small)
  json.original paperclip_url(@user.avatar, :original)
end
json.avatar_present true if @user.avatar_file_name
json.city @user.organizer.city
json.country @user.organizer.country_flag
json.stars @user.rate
json.about @user.about
json.genres_string @user.genres.map(&:title).join(', ')
json.event_types_string @user.event_categories.map(&:title).join(', ')

json.event_types EventCategory.all.each do |event_type|
  json.title event_type.title
  json.id event_type.id
  json.selected @user.event_categories.exists?(event_type.id)
end

json.genres Genre.all.each do |genre|
  json.title genre.title
  json.id genre.id
  json.selected @user.genres.exists?(genre.id)
end

json.unread_notifications_count Notification.where(to_user_id: current_user.id, read: [false, nil]).count