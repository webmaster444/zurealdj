json.organizations @organizations.each do |organization|
  json.id organization.id
  json.created_at time_ago_in_words(organization.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + organization.created_at.strftime("%H:%M")
  json.first_name organization.first_name
  json.last_name organization.last_name
  json.city organization.city
  json.country organization.country_flag
  json.address organization.address
  json.about organization.about
  json.instagram_link organization.instagram_link
  json.facebook_link organization.facebook_link
  json.soundcloud_link organization.soundcloud_link
end
json.count @count