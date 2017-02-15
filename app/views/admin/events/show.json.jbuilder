json.event do
  json.id @event.id
  json.created_at time_ago_in_words(@event.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @event.created_at.strftime("%H:%M")
  json.updated_at time_ago_in_words(@event.updated_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @event.updated_at.strftime("%H:%M")
  json.title @event.title
  json.city @event.city
  json.country @event.country_flag
  json.address @event.address
  json.start_date @event.start_date.strftime("%d/%m/%Y ") + timeformat(@event.start_date) if @event.start_date.present?
  json.end_date @event.end_date.strftime("%d/%m/%Y ") + timeformat(@event.end_date) if @event.end_date.present?
  json.image do
    json.url paperclip_url(@event.image, :large)
  end
  json.dj_slots @event.dj_slots

  organizer = Organizer.find @event.organizer_id
  user = User.find organizer.user_id
  json.organizer do
    json.avatar paperclip_url(user.avatar, :small)
    json.name user.name
    json.id user.id
  end
end