json.organizers @organizers.each do |organization|
  json.id organization.id
  json.created_at organization.created_at.strftime("%d/%m/%Y")
  json.first_name organization.first_name
  json.last_name organization.last_name
  json.city organization.city
  json.country organization.country_flag
  json.country_flag_code organization.country_flag_code
  json.address organization.address
  json.about organization.about
  json.instagram_link organization.instagram_link
  json.facebook_link organization.facebook_link
  json.soundcloud_link organization.soundcloud_link
  json.avatar organization.avatar.url
  json.name organization.name
end
json.count @count