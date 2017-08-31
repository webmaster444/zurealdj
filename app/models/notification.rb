class Notification < ApplicationRecord
  belongs_to :from_user, class_name: User, foreign_key: :from_user_id
  belongs_to :to_user, class_name: User, foreign_key: :to_user_id
  belongs_to :event
  belongs_to :star

  after_save :make_notification

  enum notification_type: {
      booking_requested: 0,
      event_canceled: 1,
      rated: 3,
      booking_confirmed: 4,
      booking_cancelled: 5,
      event_modified: 6,
      event_deleted: 7
  }
  def link
    case self.notification_type
        when "booking_requested","event_canceled","booking_confirmed","booking_cancelled","event_modified","event_deleted"
           if self.event != nil

             "#{self.to_user.role.name}#/events/#{self.event.id}"
           end

        when "rated"
          "#{self.to_user.role.name}#/profile"

      end
  end

  private

  def make_notification
        BadgeBroadcastJob.perform_later(self.to_user_id)
        UserMailer.user_notify(self).deliver_later
  end
end