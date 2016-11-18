json.policies_page do
  json.id @policies_page.id
  json.created_at time_ago_in_words(@policies_page.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @policies_page.created_at.strftime("%H:%M")
  json.content @policies_page.content
  json.created_at @policies_page.created_at
  json.updated_at @policies_page.updated_at
end