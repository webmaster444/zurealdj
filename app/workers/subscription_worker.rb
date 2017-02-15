class SubscriptionWorker
  include Sidekiq::Worker
  sidekiq_options queue: "subscription"
  # sidekiq_options retry: false

  def perform()
    User.where("subscription_id IS NOT NULL").find_each do |person|


      if person.subscription_expires_at < Time.now
          person.subscription_id = nil
          person.subscription_expires_at = nil
          person.subscribed_at = nil
        person.save
      end

    end
  end
end