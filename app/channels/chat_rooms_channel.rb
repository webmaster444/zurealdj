class ChatRoomsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_rooms_#{ params['booking_id'] }_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_message(data)
    Message.create body:         data['message'],
                   booking_id:   data['booking_id'],
                   event_id:     data['event_id'],
                   from_user_id: current_user.id,
                   to_user_id:   data['to_user_id']
  end
end