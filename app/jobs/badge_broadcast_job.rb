class BadgeBroadcastJob < ApplicationJob
  include ActionView::Helpers::DateHelper

  queue_as :default

  def perform(user_id)
    data = {
        unread_notifications_count: Notification.where(to_user_id: user_id, read: [false, nil]).count
    }
    ActionCable.server.broadcast "badges_#{ user_id }_channel", message: data
  end
end