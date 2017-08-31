class CreateCourses < ActiveRecord::Migration[5.0]
  def change
    create_table :courses do |t|
      t.integer :icon_id
      t.string :title
      t.string :icon_file_name
      t.string :icon_content_type
      t.integer :icon_file_size
      t.timestamp :icon_updated_at
      t.text :detail

      t.timestamps
    end
  end
end
