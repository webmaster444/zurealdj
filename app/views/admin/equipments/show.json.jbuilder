json.equipment do
  json.id @equipment.id
  json.created_at time_ago_in_words(@equipment.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @equipment.created_at.strftime("%H:%M")
  json.icon do
    json.url @equipment.icon.url
  end
  json.title @equipment.title
  json.created_at @equipment.created_at
  json.updated_at @equipment.updated_at
end