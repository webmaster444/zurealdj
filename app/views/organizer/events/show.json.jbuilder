json.id @event.id
json.title @event.title
json.city @event.city
json.country @event.country_flag
json.start_date @event.start_date.strftime("%d/%m/%Y")
json.end_date @event.end_date.strftime("%d/%m/%Y")
json.image do
  json.url @event.image.url
end
json.created_at @event.created_at.strftime("%d/%m/%Y")
json.updated_at @event.created_at.strftime("%d/%m/%Y")

json.djs @event.djs.each do |dj|
  user = dj.user
  booking = Booking.where(dj_id: dj.id, event_id: @event.id).first
  json.name user.name
  json.avatar paperclip_url(user.avatar, :large)
  json.id user.id
  json.dj_id dj.id
  json.personal_url user.personal_url
  json.city dj.city
  json.country dj.country
  json.genres user.genres.map{|g| g['title']}.join(' | ')
  json.rating user.rate
  json.booking_id booking.id
end