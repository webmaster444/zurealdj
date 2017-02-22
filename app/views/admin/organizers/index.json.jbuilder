json.organizers @organizers.each do |organizer|
  json.id                organizer.id
  json.created_at        organizer.created_at.try(:strftime, "%d/%m/%Y")
  json.city              organizer.city
  json.country           organizer.country_flag
  json.country_flag_code organizer.country_flag_code
  json.about             organizer.about
  json.avatar            paperclip_url(organizer.avatar, :large)
  json.name              organizer.name
  json.email             organizer.email
  json.personal_url      organizer.personal_url
  json.subscription_id   organizer.subscription_id
end
json.count @count