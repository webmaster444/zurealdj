class MessageBroadcastJob < ApplicationJob
  include ActionView::Helpers::DateHelper

  queue_as :default

  def perform(message)
    data = {
        body: message.body,
        avatar: message.user_avatar,
        name: message.sender.name,
        date: time_ago_in_words(message.created_at) + ' ago'
    }
    ActionCable.server.broadcast "chat_rooms_#{ message.booking_id }_channel", message: data
  end
end