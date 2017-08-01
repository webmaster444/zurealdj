class EventsChangeTypeFields < ActiveRecord::Migration[5.0]
  def change
    remove_column :events, :start_date, :date
    remove_column :events, :end_date, :date
    add_column :events, :start_date, :datetime
    add_column :events, :end_date, :datetime
  end
end
