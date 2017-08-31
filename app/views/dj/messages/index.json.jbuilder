current_user_id = current_user.id
lastMsgTime = Date.current
name = ''
json.messages @messages.each do |m|
  json.body m.body
  json.avatar m.user_avatar
  json.name m.sender.name
  json.date time_ago_in_words(m.created_at) + ' ago'
  json.id m.id
  json.read m.read
  json.incoming m.to_user_id == current_user_id
  if lastMsgTime < m.created_at - 15.minutes || name != m.sender.name
    json.longAgo true
  else
    json.longAgo false
  end
  lastMsgTime = m.created_at
  name = m.sender.name
end
json.count @count