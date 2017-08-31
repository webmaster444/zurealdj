class AddVenueNameFieldToEvents < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :venue_name, :string
  end
end
