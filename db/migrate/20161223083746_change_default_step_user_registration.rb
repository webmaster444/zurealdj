class ChangeDefaultStepUserRegistration < ActiveRecord::Migration[5.0]
  def change
    change_column :users, :step, :integer, default: 0
  end
end
