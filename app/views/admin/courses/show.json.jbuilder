json.course do
  json.id @course.id
  json.icon do
    json.url @course.icon.url
  end
  json.title @course.title
  json.detail @course.detail
end