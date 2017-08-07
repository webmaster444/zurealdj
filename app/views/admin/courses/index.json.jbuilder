json.courses @courses.each do |course|
  json.id course.id
  json.title course.title
  json.detail course.detail
  json.icon course.icon.url
end
json.count @count