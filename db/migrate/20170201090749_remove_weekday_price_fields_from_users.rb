class RemoveWeekdayPriceFieldsFromUsers < ActiveRecord::Migration[5.0]
  def change
    remove_column :djs, :weekday_rate_from, :integer
    remove_column :djs, :weekday_rate_to,   :integer
    remove_column :djs, :weekend_rate_from, :integer
    remove_column :djs, :weekend_rate_to,   :integer
    add_column    :djs, :rate_per_hour,     :integer
  end
end
