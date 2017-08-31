json.subscriptions @subscriptions.each do |s|
  json.id                             s.id
  json.title                          s.title
  json.description                    s.description
  json.price                          s.free ? 'Free' : number_to_currency(s.price.to_i/100.0)
  json.period                         s.period
  json.period_count                   s.period_count
  json.subscription_for               s.subscription_for
  json.full_access                    s.full_access
  json.dj_can_be_visible_for_browsing s.dj_can_be_visible_for_browsing
  json.dj_can_confirm_booking         s.dj_can_confirm_booking
  json.org_can_add_dj_to_favorites    s.org_can_add_dj_to_favorites
  json.org_can_book_dj                s.org_can_book_dj
  json.org_can_create_event           s.org_can_create_event
end