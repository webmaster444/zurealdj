json.bookings @bookings.each do |booking|
  json.id booking.id
  dj = Dj.find booking.dj_id
  json.dj do
    json.id dj.id
    json.name dj.user.name
    json.avatar paperclip_url(dj.user.avatar, :small)
  end
  event = Event.find booking.event_id
  json.event do
    json.id event.id
    json.title event.title
    json.image paperclip_url(event.image, :small)
  end
  org = Organizer.find event.organizer_id
  json.organizer do
    json.id org.id
    json.name org.user.name
    json.avatar paperclip_url(org.user.avatar, :small)
  end
  json.from_date booking.from_date.strftime("%d/%m/%Y %H:%M") if booking.from_date.present?
  json.to_date booking.to_date.strftime("%d/%m/%Y %H:%M") if booking.to_date.present?
  json.created_at booking.created_at.strftime("%d/%m/%Y %H:%M") if booking.created_at
  json.rate booking.rate
  json.status booking.status.capitalize if booking.status.present?
end
json.count @count