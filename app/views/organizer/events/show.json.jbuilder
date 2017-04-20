json.id @event.id
json.title @event.title
json.city @event.city
json.venue_name @event.venue_name
json.country @event.country_flag
json.dj_slots @event.dj_slots
json.start_date @event.start_date.strftime("%d/%m/%Y") if @event.start_date.present?
json.start_time  timeformat(@event.start_date) if @event.start_date.present?
json.end_date @event.end_date.strftime("%d/%m/%Y") if @event.end_date.present?
json.end_time timeformat(@event.end_date) if @event.end_date.present?
json.status @event.status
json.image do
  json.url paperclip_url(@event.image, :large)
  json.original paperclip_url(@event.image, :original)
end

json.genres @event.genres.each do |genre|
  json.id genre.id
  json.title genre.title
  json.checked true
end

json.event_category do
  event_category = EventCategory.find @event.event_category_id
  json.id event_category.id
  json.title event_category.title
end if @event.event_category_id.present?

json.event_type EventCategory.find(@event.event_category_id).title

json.created_at @event.created_at.strftime("%d/%m/%Y")
json.updated_at @event.created_at.strftime("%d/%m/%Y")

json.djs @event.djs.each do |dj|
  user = dj.user
  booking = Booking.where(dj_id: dj.id, event_id: @event.id).first
  json.name user.name
  json.dj_or_venue_name user.dj_or_venue_name
  json.avatar paperclip_url(user.avatar, :large)
  json.id user.id
  json.dj_id dj.id
  json.personal_url user.personal_url
  json.city dj.city
  json.country dj.country
  json.genres user.genres.map{|g| g['title']}.join(' | ')
  json.rating user.rate
  json.booking_id booking.id
  json.booking_status booking.status.capitalize
  json.rated booking.star.present?
  json.rating_item booking.star.stars if booking.star.present?
end