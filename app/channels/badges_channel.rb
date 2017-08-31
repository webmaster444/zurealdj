class BadgesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "badges_#{ current_user.id }_channel"
  end
end