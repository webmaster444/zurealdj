class Message < ApplicationRecord
  belongs_to :sender, class_name: User, foreign_key: :from_user_id
  belongs_to :receiver, class_name: User, foreign_key: :to_user_id

  after_create_commit { MessageBroadcastJob.perform_later(self) }
  after_save :after_save_message

  def user_avatar
    if sender.avatar_file_name
      sender.avatar.url :small
    else
      "/images/icons/img-profile-photo-mini.png"
    end
  end

  def after_save_message
    event = Event.find(self.event_id)
    event.assign_attributes({ last_message_date: self.created_at })
    event.save
    ChatRoomsBroadcastJob.perform_later(self.to_user_id)
    BadgeBroadcastJob.perform_later(self)
  end
end