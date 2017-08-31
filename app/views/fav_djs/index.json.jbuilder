json.fav_djs @fav_djs.each do |fav_dj|
  json.dj_name fav_dj.user.name
  json.detail fav_dj.detail
  json.image fav_dj.image.url

end