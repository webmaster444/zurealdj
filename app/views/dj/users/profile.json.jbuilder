json.personal_url @user.personal_url
json.rate_per_hour @user.dj.rate_per_hour
json.free_to_hire @user.dj.free_to_hire
json.id @user.id
json.name @user.name
json.avatar do
  json.url paperclip_url(@user.avatar, :large)
  json.small paperclip_url(@user.avatar, :small)
  json.original paperclip_url(@user.avatar, :original)
end
json.avatar_present true if @user.avatar_file_name
json.city @user.dj.city
json.country @user.dj.country_flag
json.rating @user.rate
json.about @user.about
json.genres_string @user.genres.map(&:title).join(', ')
json.event_types_string @user.event_categories.map(&:title).join(', ')

json.sample do
  json.url  @user.dj.sample.url if @user.dj.sample.exists?
  json.name @user.dj.sample_title if @user.dj.sample.exists?
end

subscription = Subscription.find @user.subscription_id if @user.subscription_id

json.subscription do
  json.title subscription.title
end if subscription

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

json.equipments Equipment.all.each do |equipment|
  json.title equipment.title
  json.id equipment.id
  json.selected @user.equipments.exists?(equipment.id)
  json.icon equipment.icon.url
end

json.unread_notifications_count Notification.where(to_user_id: current_user.id, read: [false, nil]).count
json.unread_messages_count Message.where(to_user_id: current_user.id, read: [false, nil]).count
