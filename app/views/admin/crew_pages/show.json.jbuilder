json.crew_page do
  json.id @crew_page.id
  json.created_at time_ago_in_words(@crew_page.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @crew_page.created_at.strftime("%H:%M")
  json.content @crew_page.content
  json.created_at @crew_page.created_at
  json.updated_at @crew_page.updated_at
end