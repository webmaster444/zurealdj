class SubscriptionWorker
  include Sidekiq::Worker
  sidekiq_options queue: "subscription"
  # sidekiq_options retry: false

  def perform()
    User.where("subscription_id IS NOT NULL AND subscription_expires_at < ?", Time.now).find_each do |person|

      if person.dj?
        @subscription = Subscription.free_for_dj
      else
        @subscription = Subscription.free_for_organizer
      end
      person.subscribed_at = Time.now
      person.subscription_expires_at = Time.now + @subscription.period_count.send(@subscription.period)
      person.subscription_id = @subscription.id
      person.save

    end
  end
end