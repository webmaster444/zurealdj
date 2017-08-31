class CreateNotifications < ActiveRecord::Migration[5.0]
  def change
    create_table :notifications do |t|
      t.references :to_user
      t.references :from_user
      t.integer :notification_type
      t.boolean :read
      t.timestamps
    end
  end
end
