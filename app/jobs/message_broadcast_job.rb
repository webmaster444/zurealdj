class MessageBroadcastJob < ApplicationJob
  include ActionView::Helpers::DateHelper

  queue_as :default

  def perform(message)
    data = {
        body: message.body,
        avatar: message.user_avatar,
        name: message.sender.name,
        date: time_ago_in_words(message.created_at) + ' ago',
        id: message.id,
        to_user_id: message.to_user_id
    }
    ActionCable.server.broadcast "messages_#{ message.booking_id }_channel", message: data
  end
end