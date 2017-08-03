json.course do
  json.id @course.id
  json.created_at time_ago_in_words(@course.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @course.created_at.strftime("%H:%M")
  json.icon do
    json.url @course.icon.url
  end
  json.title @course.title
  json.detail @course.detail
  json.created_at @course.created_at
  json.updated_at @course.updated_at
end