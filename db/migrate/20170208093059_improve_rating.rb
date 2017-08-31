class ImproveRating < ActiveRecord::Migration[5.0]
  def change
    add_column :stars, :comment, :text
    remove_column :bookings, :comment, :text
  end
end
