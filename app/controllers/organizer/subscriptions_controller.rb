class Organizer::SubscriptionsController < Organizer::BaseController

  def index
    Subscription.free_for_organizer
    @subscriptions = Subscription.where(subscription_for: 'organizer').order( :position, free: :desc)
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
          :description => 'Organizer customer',
          :currency    => 'usd'
      )
    end

    current_user.subscription_id = @subscription.id
    current_user.subscribed_at = Time.now
    current_user.subscription_expires_at = Time.now + @subscription.period_count.send(@subscription.period)
    current_user.save

    render json: {message: "Subscription purchased."}

  rescue Exception => e
    render json: {errors: [e.message]}, status: :unprocessable_entity
  end
end