json.cancelation do
  json.id @cancelation.id
  json.created_at time_ago_in_words(@cancelation.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @cancelation.created_at.strftime("%H:%M")
  json.title @cancelation.title
  json.created_at @cancelation.created_at
  json.updated_at @cancelation.updated_at
end