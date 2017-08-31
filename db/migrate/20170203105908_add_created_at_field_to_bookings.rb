class AddCreatedAtFieldToBookings < ActiveRecord::Migration[5.0]
  def change
    add_column :bookings, :created_at, :datetime
  end
end
