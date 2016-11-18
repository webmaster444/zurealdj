json.terms_n_conditions_pages @terms_n_conditions_pages.each do |terms_n_conditions_page|
  json.id terms_n_conditions_page.id
  json.created_at time_ago_in_words(terms_n_conditions_page.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + terms_n_conditions_page.created_at.strftime("%H:%M")
  
  json.content terms_n_conditions_page.content
  
  
end
json.count @count