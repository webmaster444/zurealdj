json.cancelations @cancelations.each do |cancelation|
  json.title cancelation.title
  json.id cancelation.id
  json.selected current_user.cancelations.exists?(cancelation.id)
end