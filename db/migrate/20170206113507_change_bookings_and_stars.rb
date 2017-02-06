class ChangeBookingsAndStars < ActiveRecord::Migration[5.0]
  def change
    add_reference :stars, :booking
    remove_column :bookings, :status, :bool
    add_column :bookings, :status, :integer, default: 0
    add_column :bookings, :comment, :text
  end
end
