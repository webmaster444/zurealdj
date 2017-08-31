class SubscriptionsController < ApplicationController

  skip_before_action :authenticate_user

  def index
    @subscriptions = Subscription.all.order(:position)
  end
end