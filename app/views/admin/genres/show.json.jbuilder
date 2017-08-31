json.genre do
  json.id @genre.id
  json.created_at time_ago_in_words(@genre.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @genre.created_at.strftime("%H:%M")
  json.title @genre.title
  json.created_at @genre.created_at
  json.updated_at @genre.updated_at
end