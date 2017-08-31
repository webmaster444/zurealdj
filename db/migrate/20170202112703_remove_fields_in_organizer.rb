class RemoveFieldsInOrganizer < ActiveRecord::Migration[5.0]
  def change
    remove_column :organizers, :first_name, :string
    remove_column :organizers, :last_name, :string
  end
end
