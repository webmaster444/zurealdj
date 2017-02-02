class Notification < ApplicationRecord
  belongs_to :from_user, class_name: User, foreign_key: :from_user_id
  belongs_to :to_user, class_name: User, foreign_key: :to_user_id
  belongs_to :event
  belongs_to :star

  after_save { BadgeBroadcastJob.perform_later(self.to_user_id) }

  enum notification_type: {
      booking_requested: 0,
      event_canceled: 1,
      rated: 3
  }
end