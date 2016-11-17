json.organizations @organizations.each do |organization|
  json.id organization.id
  json.created_at time_ago_in_words(organization.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + organization.created_at.strftime("%H:%M")
  
  json.first_name organizations.first_name
  
  
  json.last_name organizations.last_name
  
  
  json.city organizations.city
  
  
  json.country organizations.country_flag

  
  json.address organizations.address
  
  
  json.about organizations.about
  
  
  json.instagram_link organizations.instagram_link
  
  
  json.facebook_link organizations.facebook_link
  
  
  json.soundcloud_link organizations.soundcloud_link
  
  
end
json.count @count