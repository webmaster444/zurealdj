class CreateEquipments < ActiveRecord::Migration[5.0]
  def change
    create_table :equipments do |t|
      t.integer :icon_id
      t.string :title
      t.datetime :created_at
      t.datetime :updated_at
    end
    add_index :equipments, :icon_id
  end
end
