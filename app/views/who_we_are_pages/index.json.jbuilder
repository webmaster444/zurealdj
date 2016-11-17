json.who_we_are_pages @who_we_are_pages.each do |who_we_are_page|
  json.id who_we_are_page.id
  json.created_at time_ago_in_words(who_we_are_page.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + who_we_are_page.created_at.strftime("%H:%M")
  
  json.content who_we_are_page.content
  
  
end
json.count @count