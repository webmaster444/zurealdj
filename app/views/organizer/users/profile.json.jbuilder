json.personal_url @user.personal_url
json.company_name @user.company_name
json.name @user.name
json.avatar do
  json.url @user.avatar.url
end
json.city @user.organizer.city
json.country @user.organizer.country_flag
json.stars @user.organizer.stars
json.about @user.about
json.facebook_link @user.facebook_link
json.instagram_link @user.instagram_link
json.soundcloud_link @user.soundcloud_link
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