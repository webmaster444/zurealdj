json.who_we_are_page do
  json.id @who_we_are_page.id
  json.created_at time_ago_in_words(@who_we_are_page.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @who_we_are_page.created_at.strftime("%H:%M")
  json.content @who_we_are_page.content
  json.created_at @who_we_are_page.created_at
  json.updated_at @who_we_are_page.updated_at
end