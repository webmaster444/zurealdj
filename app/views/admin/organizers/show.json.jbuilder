json.organizer do
  json.id @organizer.id
  json.created_at @organizer.created_at.strftime("%d/%m/%Y")
  json.address @organizer.address
  json.country @organizer.country_flag
  json.created_at time_ago_in_words(@organizer.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' +  @organizer.created_at.strftime("%H:%M")
  json.updated_at time_ago_in_words(@organizer.updated_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @organizer.updated_at.strftime("%H:%M")

  json.email @user.email
  json.name @user.name
  json.company_name @user.company_name
  json.about @user.about
  json.event
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
end