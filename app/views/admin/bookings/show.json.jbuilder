json.booking do
  json.id @booking.id
  json.created_at time_ago_in_words(@booking.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @booking.created_at.strftime("%H:%M")
  json.user @booking.user
  json.event @booking.event
  json.created_at @booking.created_at
  json.updated_at @booking.updated_at
end