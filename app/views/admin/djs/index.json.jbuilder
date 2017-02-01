json.djs @djs.each do |dj|
  json.id dj.id
  json.created_at dj.created_at.strftime("%d/%m/%Y")
  json.name dj.name
  json.email dj.email
  json.city dj.city
  json.country dj.country_flag
  json.about dj.about
  json.rate_per_hour dj.rate_per_hour
  json.avatar paperclip_url(dj.avatar, :large)
end
json.count @count