class ImproveBooking < ActiveRecord::Migration[5.0]
  def change
    drop_table :bookings
    create_table :bookings do |t|
      t.references :dj
      t.references :event
      t.datetime :from_date
      t.datetime :to_date
      t.integer :rate
    end
  end
end
