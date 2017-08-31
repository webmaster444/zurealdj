class RemoveColumn < ActiveRecord::Migration[5.0]
  def change
    remove_column :organizers, :address, :string
  end
end
