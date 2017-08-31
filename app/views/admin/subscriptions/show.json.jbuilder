json.subscription do
  json.id                             @subscription.id
  json.title                          @subscription.title
  json.description                    @subscription.description
  json.price                          @subscription.price.to_i/100.0
  json.period                         @subscription.period
  json.period_count                   @subscription.period_count
  json.subscription_for               @subscription.subscription_for
  json.free                           @subscription.free

  json.dj_can_be_visible_for_browsing @subscription.dj_can_be_visible_for_browsing
  json.dj_can_confirm_booking         @subscription.dj_can_confirm_booking
  json.org_can_add_dj_to_favorites    @subscription.org_can_add_dj_to_favorites
  json.org_can_book_dj                @subscription.org_can_book_dj
  json.org_can_create_event           @subscription.org_can_create_event
end