json.djs @djs.each do |dj|
  json.id dj.id
  json.created_at dj.created_at.strftime("%d/%m/%Y")
  json.name dj.name
  json.city dj.city
  json.country dj.country_flag
  json.about dj.about
  json.instagram_link dj.instagram_link
  json.facebook_link dj.facebook_link
  json.soundcloud_link dj.soundcloud_link
  json.weekday_price_from dj.weekday_price_from
  json.weekday_price_to dj.weekday_price_to
  json.weekend_price_from dj.weekend_price_from
  json.weekend_price_to dj.weekend_price_to
  json.avatar dj.avatar.url
end
json.count @count