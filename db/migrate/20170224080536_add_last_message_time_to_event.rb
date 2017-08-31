class AddLastMessageTimeToEvent < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :last_message_date, :datetime
  end
end
