class AddIconToEquipments < ActiveRecord::Migration[5.0]
  def change
    add_attachment :equipment, :icon
  end
end
