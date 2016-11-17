json.crew_pages @crew_pages.each do |crew_page|
  json.id crew_page.id
  json.created_at time_ago_in_words(crew_page.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + crew_page.created_at.strftime("%H:%M")
  
  json.content crew_page.content
  
  
end
json.count @count