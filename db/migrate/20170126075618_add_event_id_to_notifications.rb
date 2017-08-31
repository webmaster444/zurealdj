class AddEventIdToNotifications < ActiveRecord::Migration[5.0]
  def change
    add_reference :notifications, :event
    add_reference :notifications, :star
  end
end
