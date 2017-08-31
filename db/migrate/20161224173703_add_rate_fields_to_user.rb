class AddRateFieldsToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :weekday_rate_from, :integer
    add_column :users, :weekday_rate_to, :integer
    add_column :users, :weekend_rate_from, :integer
    add_column :users, :weekend_rate_to, :integer
  end
end
