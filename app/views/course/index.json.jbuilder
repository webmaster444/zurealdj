json.courses @courses.each do |item|
  json.icon_url item.icon_url
  json.headline item.headline
  json.detail item.detail
end