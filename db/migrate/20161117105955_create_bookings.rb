class CreateBookings < ActiveRecord::Migration[5.0]
  def change
    create_table :bookings do |t|
      t.integer :user_id
      t.integer :event_id
      t.datetime :created_at
      t.datetime :updated_at
    end
    add_index :bookings, :user_id
    add_index :bookings, :event_id
  end
end
