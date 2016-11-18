json.organizer do
  json.id @organizer.id
  json.created_at @organizer.created_at.strftime("%d/%m/%Y")
  json.first_name @organizer.first_name
  json.last_name @organizer.last_name
  json.city @organizer.city
  json.country_flag_code @organizer.country_flag_code
  json.address @organizer.address
  json.about @organizer.about
  json.instagram_link @organizer.instagram_link
  json.facebook_link @organizer.facebook_link
  json.soundcloud_link @organizer.soundcloud_link
  json.created_at @organizer.created_at
  json.updated_at @organizer.updated_at
end