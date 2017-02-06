json.djs @djs.each do |dj|
  json.name dj.name
  json.avatar paperclip_url(dj.avatar, :large)
  json.id dj.id
  json.dj_id dj['dj_id']
  json.personal_url dj.personal_url
  json.city dj['city']
  json.country CountryFlag.find(dj.dj['country_flag_code']).try(:[], :title)
  json.genres dj['genres'].map{|g| g['title']}.join(' | ')
  json.rating dj.rate
  json.in_favorites current_user.organizer.favorite_djs.include?(dj.dj)
end
json.min_rate Dj.minimum(:rate_per_hour)
json.max_rate Dj.maximum(:rate_per_hour)
json.count @count