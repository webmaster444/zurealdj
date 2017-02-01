class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    data = {
        body: message.body,
        avatar: message.user_avatar,
        name: message.sender.name
    }
    ActionCable.server.broadcast "chat_rooms_#{ message.booking_id }_channel", message: data
  end
end