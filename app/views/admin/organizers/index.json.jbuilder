json.organizers @organizers.each do |organization|
  json.id organization.id
  json.created_at time_ago_in_words(organization.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + organization.created_at.strftime("%H:%M")
  json.first_name organization.first_name
  json.last_name organization.last_name
  json.city organization.city
  json.country organization.country_flag
  json.country_flag_code organization.country_flag_code
  json.about organization.about
  json.avatar paperclip_url(organization.avatar, :large)
  json.name organization.name
  json.email organization.email
end
json.count @count