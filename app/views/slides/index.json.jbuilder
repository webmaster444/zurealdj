json.slides @slides.each do |s|
  json.content s.content
  json.id s.id
end