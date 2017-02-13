class Dj::SubscriptionsController < Dj::BaseController

  def index
    @subscriptions = Subscription.where(subscription_for: 'dj').order(:position)
  end

  def create
    @subscription = Subscription.find(params[:subscription_id])

    unless @subscription.free
      customer = Stripe::Customer.create(
          :email => current_user.email,
          :source  => params[:stripe_token]
      )

      charge = Stripe::Charge.create(
          :customer    => customer.id,
          :amount      => @subscription.price,
          :description => 'Dj customer',
          :currency    => 'usd'
      )
    end

    current_user.update_attribute :subscription_id, @subscription.id

    render json: {message: "Subscription purchased."}

  rescue Exception => e
    render json: {errors: [e.message]}, status: :unprocessable_entity
  end
end