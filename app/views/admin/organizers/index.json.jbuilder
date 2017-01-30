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
  json.avatar paperclip_url(organization.avatar, :large)
  json.name organization.name
end
json.count @count