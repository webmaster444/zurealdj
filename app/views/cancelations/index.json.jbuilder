json.cancelations @cancelations.each do |cancelation|
  json.id cancelation.id
  json.created_at time_ago_in_words(cancelation.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + cancelation.created_at.strftime("%H:%M")
  
  json.title cancelations.title
  
  
end
json.count @count