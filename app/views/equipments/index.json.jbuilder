json.equipments @equipments.each do |equipment|
  json.id equipment.id
  json.created_at time_ago_in_words(equipment.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + equipment.created_at.strftime("%H:%M")
  json.icon equipment.icon
  json.title equipment.title
end
json.count @count