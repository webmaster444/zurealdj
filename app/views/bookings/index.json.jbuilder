json.bookings @bookings.each do |booking|
  json.id booking.id
  json.created_at time_ago_in_words(booking.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + booking.created_at.strftime("%H:%M")
  
  json.user bookings.user
  
  
  json.event bookings.event
  
  
end
json.count @count