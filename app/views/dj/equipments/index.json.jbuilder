json.equipments @equipments.each do |equipment|
  json.title equipment.title
  json.id equipment.id
  json.selected current_user.equipments.exists?(equipment.id)
  json.icon equipment.icon.url
end