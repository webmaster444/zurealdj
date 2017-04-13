class AddDjOrVenueNameToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :dj_or_venue_name, :string
  end
end
