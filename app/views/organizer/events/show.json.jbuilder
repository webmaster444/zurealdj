json.id @event.id
json.title @event.title
json.city @event.city
json.country @event.country_flag
json.start_date @event.start_date.strftime("%d/%m/%Y")
json.end_date @event.end_date.strftime("%d/%m/%Y")
json.image do
  json.url @event.image.url
end
json.created_at @event.created_at.strftime("%d/%m/%Y")
json.updated_at @event.created_at.strftime("%d/%m/%Y")