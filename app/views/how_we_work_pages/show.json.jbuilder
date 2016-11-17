json.how_we_work_page do
  json.id @how_we_work_page.id
  json.created_at time_ago_in_words(@how_we_work_page.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @how_we_work_page.created_at.strftime("%H:%M")
  json.content @how_we_work_page.content
  json.created_at @how_we_work_page.created_at
  json.updated_at @how_we_work_page.updated_at
end