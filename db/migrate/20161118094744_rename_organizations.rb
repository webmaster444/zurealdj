class RenameOrganizations < ActiveRecord::Migration[5.0]
  def change
    rename_table :organizations, :organizers
  end
end