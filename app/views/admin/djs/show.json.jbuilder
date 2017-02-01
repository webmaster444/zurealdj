json.dj do
  json.id @dj.id
  json.first_name @dj.first_name
  json.last_name @dj.last_name
  json.city @dj.city
  json.country @dj.country_flag
  json.rate_per_hour @dj.rate_per_hour
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
  json.avatar do
    json.url paperclip_url(@user.avatar, :large)
  end
  json.personal_url @user.personal_url
end