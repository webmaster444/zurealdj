json.who_we_are_pages Language.all.each do |flag|
  article = WhoWeArePage.where(country_flag_code: flag[:code]).first_or_create
  json.country_code article.country_flag_code
  json.country_title article.country_flag[:title]
  json.content article.content
end