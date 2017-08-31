class AddStatusToBooking < ActiveRecord::Migration[5.0]
  def change
    add_column :bookings, :status, :bool, default: false
  end
end
