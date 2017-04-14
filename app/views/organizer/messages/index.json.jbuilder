current_user_id = current_user.id
lastMsgTime = Date.current
name = ''
json.messages @messages.each_with_index do |m|

  json.body m.body
  json.avatar m.user_avatar
  json.name m.sender.name
  json.date time_ago_in_words(m.created_at) + ' ago'
  json.id m.id
  json.incoming m.to_user_id == current_user_id
  json.read m.read
  json.time m.created_at
    if lastMsgTime < m.created_at - 15.minutes || name != m.sender.name
      json.longAgo true
    else
      json.longAgo false
    end
  lastMsgTime = m.created_at
  name = m.sender.name

end
json.count @count