json.genres @genres.each do |genre|
  json.id genre.id
  json.created_at time_ago_in_words(genre.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + genre.created_at.strftime("%H:%M")
  
  json.title genre.title
end
json.count @count