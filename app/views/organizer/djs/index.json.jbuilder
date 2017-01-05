json.djs @djs.each do |dj|
  json.name dj.name
  json.avatar dj.avatar.url
  json.dj_id dj.id
  json.id dj.id
  json.dj_id dj['dj_id']
  json.city dj['city']
  json.country CountryFlag.find(dj['country_flag_code']).try(:[], :title)
  json.genres dj['genres'].map{|g| g['title']}.join(' | ')
  json.rating dj['votes_count'] == 0 ? 0 : dj['stars_count']/dj['votes_count']
  json.in_favorites current_user.organizer.favorite_djs.include?(dj.dj)
end
json.count @count