class AddNotificationsFieldToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :notifications, :bool, default: true
  end
end
