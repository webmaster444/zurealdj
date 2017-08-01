class DifferentStepsForDjAndOrganizer < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :step, :integer
    add_column :users, :dj_step, :integer, default: 0
    add_column :users, :organizer_step, :integer, default: 0
  end
end
