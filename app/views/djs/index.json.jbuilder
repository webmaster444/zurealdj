json.djs @djs.each do |dj|
  json.id dj.id
  json.created_at time_ago_in_words(dj.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + dj.created_at.strftime("%H:%M")
  
  json.first_name djs.first_name
  
  
  json.last_name djs.last_name
  
  
  json.city djs.city
  
  
  json.country djs.country_flag

  
  json.about djs.about
  
  
  json.sample djs.sample
  
  
  json.instagram_link djs.instagram_link
  
  
  json.facebook_link djs.facebook_link
  
  
  json.soundcloud_link djs.soundcloud_link
  
  
  json.weekday_price_from djs.weekday_price_from
  
  
  json.weekday_price_to djs.weekday_price_to
  
  
  json.weekend_price_from djs.weekend_price_from
  
  
  json.weekend_price_to djs.weekend_price_to
  
  
  json.photo djs.photo
  
  
end
json.count @count