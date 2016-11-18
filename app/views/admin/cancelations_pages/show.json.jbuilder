json.cancelations_page do
  json.id @cancelations_page.id
  json.created_at time_ago_in_words(@cancelations_page.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @cancelations_page.created_at.strftime("%H:%M")
  json.content @cancelations_page.content
  json.created_at @cancelations_page.created_at
  json.updated_at @cancelations_page.updated_at
end