class BadgeBroadcastJob < ApplicationJob
  include ActionView::Helpers::DateHelper

  queue_as :default

  def perform(message)
    user_id = message.to_user_id
    data = {
        unread_notifications_count: Notification.where(to_user_id: user_id, read: [false, nil]).count,
        unread_messages_count: Message.where(to_user_id: user_id, read: [false, nil]).count,
        last_message: {
            body: message.body,
            avatar: message.user_avatar,
            name: message.sender.name,
            date: time_ago_in_words(message.created_at) + ' ago'
        }
    }
    ActionCable.server.broadcast "badges_#{ user_id }_channel", message: data
  end
end