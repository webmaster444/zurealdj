json.dj do
  json.id @dj.id
  json.created_at time_ago_in_words(@dj.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @dj.created_at.strftime("%H:%M")
  json.first_name @dj.first_name
  json.last_name @dj.last_name
  json.city @dj.city
  json.country @dj.country_flag
  json.about @dj.about
  json.sample do
    json.url @dj.sample_attachments.first.try(:file).try(:url)
    json.id @dj.sample_attachments.first.try(:id)
  end
  json.instagram_link @dj.instagram_link
  json.facebook_link @dj.facebook_link
  json.soundcloud_link @dj.soundcloud_link
  json.weekday_price_from @dj.weekday_price_from
  json.weekday_price_to @dj.weekday_price_to
  json.weekend_price_from @dj.weekend_price_from
  json.weekend_price_to @dj.weekend_price_to
  json.photo do
    json.url @dj.photo_attachments.first.try(:file).try(:url)
    json.id @dj.photo_attachments.first.try(:id)
  end
  json.created_at @dj.created_at
  json.updated_at @dj.updated_at
end