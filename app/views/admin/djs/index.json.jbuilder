json.djs @djs.each do |dj|
  json.id dj.id
  json.created_at time_ago_in_words(dj.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + dj.created_at.strftime("%H:%M")
  json.name dj.name
  json.email dj.email
  json.city dj.city
  json.country dj.country_flag
  json.about dj.about
  json.avatar paperclip_url(dj.avatar, :large)
end
json.count @count