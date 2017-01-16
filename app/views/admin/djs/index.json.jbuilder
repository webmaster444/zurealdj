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
  json.weekday_rate_from dj.weekday_rate_from
  json.weekday_rate_to dj.weekday_rate_to
  json.weekend_rate_from dj.weekend_rate_from
  json.weekend_rate_to dj.weekend_rate_to
  json.avatar paperclip_url(dj.avatar, :large)
end
json.count @count