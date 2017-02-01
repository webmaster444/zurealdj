class Message < ApplicationRecord
  belongs_to :sender, class_name: User, foreign_key: :from_user_id
  belongs_to :receiver, class_name: User, foreign_key: :to_user_id

  after_create_commit { MessageBroadcastJob.perform_later(self) }

  def user_avatar
    sender.avatar.url :small
  end
end