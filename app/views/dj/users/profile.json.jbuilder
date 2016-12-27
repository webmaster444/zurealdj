json.personal_url @user.personal_url
json.weekday_rate_from @user.weekday_rate_from
json.weekday_rate_to @user.weekday_rate_to
json.weekend_rate_from @user.weekend_rate_from
json.weekend_rate_to @user.weekend_rate_to
json.name @user.name
json.avatar do
  json.url @user.avatar.url
end
json.city @user.dj.city
json.country @user.dj.country_flag
json.stars @user.dj.stars
json.about @user.about
json.facebook_link @user.facebook_link
json.instagram_link @user.instagram_link
json.soundcloud_link @user.soundcloud_link
json.genres_string @user.genres.map(&:title).join(', ')
json.cancelations_string @user.cancelations.map(&:title).join(', ')
json.sample_url @user.dj.sample.url if @user.dj.sample.exists?

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

json.cancelations Cancelation.all.each do |cancelation|
  json.title cancelation.title
  json.id cancelation.id
  json.selected @user.cancelations.exists?(cancelation.id)
end