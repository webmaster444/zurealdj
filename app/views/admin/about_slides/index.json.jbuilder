json.slides @slides.each do |slide|
    json.id slide.id
    json.content slide.content
    json.created_at slide.created_at.strftime("%d/%m/%Y")
end
json.count @count