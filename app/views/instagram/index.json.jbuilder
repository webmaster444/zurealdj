json.last_images @images.each do |item|
  json.img_low_url item.images.low_resolution.url
  # json.img_standart_url item.images.standard_resolution.url
end