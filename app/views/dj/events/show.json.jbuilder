json.id @event.id
json.title @event.title
json.city @event.city
json.country @event.country_flag
json.start_date @event.start_date.strftime("%d/%m/%Y") if @event.start_date.present?
json.start_time  timeformat(@event.start_date) if @event.start_date.present?
json.end_date @event.end_date.strftime("%d/%m/%Y") if @event.end_date.present?
json.end_time timeformat(@event.end_date) if @event.end_date.present?
json.status @event.status
json.dj_slots @event.dj_slots
json.image do
  json.url paperclip_url(@event.image, :large)
  json.original paperclip_url(@event.image, :original)
end
json.booking_id @booking.id
json.booking_status @booking.status.capitalize
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
  json.booking_status booking.status.capitalize
end