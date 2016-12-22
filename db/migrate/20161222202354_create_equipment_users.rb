class CreateEquipmentUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :equipment_users do |t|
      t.references :equipment
      t.references :user
    end
  end
end
