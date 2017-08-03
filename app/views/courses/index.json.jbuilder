json.courses @courses.each do |course|
  json.icon course.icon.url
  json.title course.title
  json.detail course.detail
end