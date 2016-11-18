json.cancelations_pages @cancelations_pages.each do |cancelations_page|
  json.id cancelations_page.id
  json.created_at time_ago_in_words(cancelations_page.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + cancelations_page.created_at.strftime("%H:%M")
  
  json.content cancelations_page.content
  
  
end
json.count @count