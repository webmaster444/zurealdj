class CreateFavDjs < ActiveRecord::Migration[5.0]
  def change
    create_table :fav_djs do |t|
      t.integer :dj_id
      t.integer :organizer_id
      t.string :image_file_name
      t.string :image_content_type
      t.integer :image_file_size
      t.timestamp :image_update_at
      t.float :crop_x
      t.float :crop_y
      t.float :crop_w
      t.float :crop_h
      t.float :crop_rotate
      t.float :crop_scale_x
      t.float :crop_scale_y

      t.timestamps
    end
  end
end
