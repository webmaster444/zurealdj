class CreateEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.string :title
      t.string :city
      t.string :country_flag_code
      t.string :address
      t.date :start_date
      t.date :end_date
      t.integer :image_id
      t.datetime :created_at
      t.datetime :updated_at
    end
    add_index :events, :image_id
  end
end
