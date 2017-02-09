json.top_djs @users.each do |user|
  json.name user.name
  json.about user.about
  json.avatar paperclip_url(user.avatar, :large)

end