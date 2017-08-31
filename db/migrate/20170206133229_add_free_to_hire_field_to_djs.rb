class AddFreeToHireFieldToDjs < ActiveRecord::Migration[5.0]
  def change
    add_column :djs, :free_to_hire, :boolean
  end
end
