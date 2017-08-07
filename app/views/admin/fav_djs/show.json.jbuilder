json.fav_dj do
  json.id @fav_dj.id
  json.image do
    json.url @fav_dj.image.url
  end
  json.dj_id @fav_dj.dj_id
  json.detail @fav_dj.detail
end