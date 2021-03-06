json.notifications @notifications.each do |n|
  json.id n.id
  json.notification_type n.notification_type
  json.created_at n.created_at.try(:strftime, "%d/%m/%Y")
  json.read n.read
  json.message n.message
  json.link n.link

  if n.from_user
    json.from_user do
      json.avatar n.from_user.avatar.try(:url, :small)
      json.name n.from_user.name
    end
  end

  if n.star
    json.star do
      json.stars n.star.stars
    end
  end

  if n.event
    json.event do
      json.title n.event.title
      json.image paperclip_url(n.event.image, :small)
      json.city n.event.city
      json.country n.event.country
    end
  end
end
json.count @count