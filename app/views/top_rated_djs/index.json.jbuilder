json.top_djs @users.each do |user|
  json.name user.name
  json.dj_or_venue_name user.dj_or_venue_name
  json.about user.about
  json.avatar paperclip_url(user.avatar, :large)

end