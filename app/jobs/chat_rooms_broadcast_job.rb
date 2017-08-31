class ChatRoomsBroadcastJob < ApplicationJob

  queue_as :default

  def perform(user_id)
    data = {
        new_message: true
    }
    ActionCable.server.broadcast "chat_rooms_#{ user_id }_channel", message: data
  end
end