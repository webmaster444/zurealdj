json.policies_pages @policies_pages.each do |policies_page|
  json.id policies_page.id
  json.created_at time_ago_in_words(policies_page.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + policies_page.created_at.strftime("%H:%M")
  
  json.content policies_page.content
  
  
end
json.count @count