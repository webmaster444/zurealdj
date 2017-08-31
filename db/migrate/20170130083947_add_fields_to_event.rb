class AddFieldsToEvent < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :crop_x, :float
    add_column :events, :crop_y, :float
    add_column :events, :crop_w, :float
    add_column :events, :crop_h, :float
    add_column :events, :crop_rotate, :float
    add_column :events, :crop_scale_x, :float
    add_column :events, :crop_scale_y, :float
    add_column :events, :dj_slots, :integer
    add_reference :events, :event_category
  end
end
