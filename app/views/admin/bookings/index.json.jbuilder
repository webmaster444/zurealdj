json.bookings @bookings.each do |booking|
  json.id booking.id
  json.created_at booking.created_at.strftime("%d/%m/%Y %H:%M") if booking.created_at
  json.event booking.event
end
json.count @count