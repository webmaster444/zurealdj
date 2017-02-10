json.subscriptions @subscriptions.each do |s|
  json.id s.id
  json.title s.title
end
json.total @total