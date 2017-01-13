json.dj do
  json.id @dj.id
  json.first_name @dj.first_name
  json.last_name @dj.last_name
  json.city @dj.city
  json.country @dj.country_flag
  json.weekday_rate_from @dj.weekday_rate_from
  json.weekday_rate_to @dj.weekday_rate_to
  json.weekend_rate_from @dj.weekend_rate_from
  json.weekend_rate_to @dj.weekend_rate_to
  json.created_at time_ago_in_words(@dj.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @dj.created_at.strftime("%H:%M")
  json.updated_at time_ago_in_words(@dj.updated_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @dj.updated_at.strftime("%H:%M")
  json.sample do
    json.url @dj.sample.try(:file).try(:url)
    json.id @dj.sample.try(:id)
  end
  json.sample_url @dj.sample.url if @dj.sample.exists?

  json.email @user.email
  json.name @user.name
  json.about @user.about
  json.instagram_link @user.instagram_link
  json.facebook_link @user.facebook_link
  json.soundcloud_link @user.soundcloud_link
  json.avatar do
    json.url @user.avatar.url
  end
  json.personal_url @user.personal_url
end