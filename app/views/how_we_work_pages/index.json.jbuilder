json.how_we_work_pages @how_we_work_pages.each do |how_we_work_page|
  json.id how_we_work_page.id
  json.created_at time_ago_in_words(how_we_work_page.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + how_we_work_page.created_at.strftime("%H:%M")
  
  json.content how_we_work_page.content
  
  
end
json.count @count