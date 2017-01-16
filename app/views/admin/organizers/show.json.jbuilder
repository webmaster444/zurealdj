json.organizer do
  json.id @organizer.id
  json.created_at @organizer.created_at.strftime("%d/%m/%Y")
  json.first_name @organizer.first_name
  json.last_name @organizer.last_name
  json.city @organizer.city
  json.country @organizer.country_flag
  json.address @organizer.address
  json.created_at time_ago_in_words(@organizer.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' +  @organizer.created_at.strftime("%H:%M")
  json.updated_at time_ago_in_words(@organizer.updated_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @organizer.updated_at.strftime("%H:%M")

  json.email @user.email
  json.name @user.name
  json.about @user.about
  json.instagram_link @user.instagram_link
  json.facebook_link @user.facebook_link
  json.soundcloud_link @user.soundcloud_link
  json.avatar do
    json.url paperclip_url(@user.avatar, :large)
  end
  json.personal_url @user.personal_url
end