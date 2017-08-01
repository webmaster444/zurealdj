json.admins @admins.each do |admin|
    json.id admin.id
    json.name admin.name
    json.email admin.email
end
json.count @count