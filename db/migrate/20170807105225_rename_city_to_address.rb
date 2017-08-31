class RenameCityToAddress < ActiveRecord::Migration[5.0]
  def change
    rename_column :organizers, :city, :address
  end
end
