json.events @events.each do |event|
  json.id event.id
  json.created_at event.created_at.try(:strftime, "%d/%m/%Y")
  json.title event.title
  json.city event.city
  json.country CountryFlag.find(event['country_flag_code']).try(:[], :title)
  json.start_date event.start_date.try(:strftime, "%d/%m/%Y") if event.start_date.present?
  json.start_time  timeformat(event.start_date) if event.start_date.present?
  json.end_date event.end_date.try(:strftime, "%d/%m/%Y") if event.end_date.present?
  json.end_time timeformat(event.end_date) if event.end_date.present?
  json.image paperclip_url(event.image, :large)
  json.status event.status
end
json.count @count