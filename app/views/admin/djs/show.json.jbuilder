json.dj do
  json.id @dj.id
  json.city @dj.city
  json.country @dj.country_flag
  json.rate_per_hour @dj.rate_per_hour
  json.free_to_hire @dj.free_to_hire
  json.created_at time_ago_in_words(@dj.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @dj.created_at.strftime("%H:%M")
  json.updated_at time_ago_in_words(@dj.updated_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @dj.updated_at.strftime("%H:%M")
  json.genres_string @user.genres.map(&:title).join(', ')
  json.event_types_string @user.event_categories.map(&:title).join(', ')
  json.equipments_string @user.equipments.map(&:title).join(', ')
  json.sample do
    json.url @dj.sample.try(:file).try(:url)
    json.id @dj.sample.try(:id)
  end
  json.sample_url @dj.sample.url if @dj.sample.exists?

  json.email @user.email
  json.name @user.name
  json.about @user.about
  json.avatar do
    json.url paperclip_url(@user.avatar, :large)
  end
  json.personal_url @user.personal_url


json.event_types EventCategory.all.each do |event_type|
  json.title event_type.title
  json.id event_type.id
  json.selected @user.event_categories.exists?(event_type.id)
end

json.genres Genre.all.each do |genre|
  json.title genre.title
  json.id genre.id
  json.selected @user.genres.exists?(genre.id)
end

json.equipments Equipment.all.each do |equipment|
  json.title equipment.title
  json.id equipment.id
  json.selected @user.equipments.exists?(equipment.id)
  json.icon equipment.icon.url
end

end