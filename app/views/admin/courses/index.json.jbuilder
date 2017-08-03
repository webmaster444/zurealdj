json.courses @courses.each do |course|
  json.id course.id
  json.created_at time_ago_in_words(course.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + course.created_at.strftime("%H:%M")

  json.title course.title
  json.icon course.icon.url
end
json.count @count