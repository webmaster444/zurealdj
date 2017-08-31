class AddCropperFieldsToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :crop_x, :float
    add_column :users, :crop_y, :float
    add_column :users, :crop_w, :float
    add_column :users, :crop_h, :float
    add_column :users, :crop_rotate, :float
    add_column :users, :crop_scale_x, :float
    add_column :users, :crop_scale_y, :float
  end
end
