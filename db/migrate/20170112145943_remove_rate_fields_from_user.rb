class RemoveRateFieldsFromUser < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :weekday_rate_from, :integer
    remove_column :users, :weekday_rate_to, :integer
    remove_column :users, :weekend_rate_from, :integer
    remove_column :users, :weekend_rate_to, :integer
    remove_column :djs, :weekday_price_from, :integer
    remove_column :djs, :weekday_price_to, :integer
    remove_column :djs, :weekend_price_from, :integer
    remove_column :djs, :weekend_price_to, :integer
    add_column :djs, :weekday_rate_from, :integer
    add_column :djs, :weekday_rate_to, :integer
    add_column :djs, :weekend_rate_from, :integer
    add_column :djs, :weekend_rate_to, :integer
  end
end
