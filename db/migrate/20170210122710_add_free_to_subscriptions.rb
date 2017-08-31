class AddFreeToSubscriptions < ActiveRecord::Migration[5.0]
  def change
    add_column :subscriptions, :free, :boolean, default: false
    add_column :subscriptions, :position, :integer
  end
end
