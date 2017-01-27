class DropTableMigrations < ActiveRecord::Migration[5.0]
  def change
    drop_table :cancelations
    drop_table :cancelations_users
  end
end
