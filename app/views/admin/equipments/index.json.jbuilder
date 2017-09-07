json.equipments @equipments.each do |equipment|
  json.id equipment.id
  json.created_at time_ago_in_words(equipment.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + equipment.created_at.strftime("%H:%M")

  json.title equipment.title
  json.icon paperclip_url(equipment.icon, :medium)
end
json.count @count