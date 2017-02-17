json.messages @messages.each do |m|
  json.body m.body
  json.avatar m.user_avatar
  json.name m.sender.name
  json.date time_ago_in_words(m.created_at) + ' ago'
  json.id m.id
end
json.count @count