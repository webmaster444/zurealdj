json.dj_id @dj.id
json.id @user.id
json.personal_url @user.personal_url
json.rate_per_hour @dj.rate_per_hour
json.free_to_hire @dj.free_to_hire
json.name @user.name
json.dj_or_venue_name @user.dj_or_venue_name
json.avatar do
  json.url paperclip_url(@user.avatar, :large)
  json.small paperclip_url(@user.avatar, :small)
  json.original paperclip_url(@user.avatar, :original)
end
json.avatar_present true if @user.avatar_file_name
json.city @dj.city
json.country @dj.country_flag
json.rating @user.rate
json.about @user.about
json.genres_string @user.genres.map(&:title).join(', ')
json.event_types_string @user.event_categories.map(&:title).join(', ')

json.sample do
  json.url @dj.sample.url
  json.name @dj.sample_title
end if @dj.sample.exists?

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


json.in_favorites current_user.organizer.favorite_djs.include?(@dj)