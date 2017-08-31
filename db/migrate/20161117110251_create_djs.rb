class CreateDjs < ActiveRecord::Migration[5.0]
  def change
    create_table :djs do |t|
      t.string :first_name
      t.string :last_name
      t.string :city
      t.string :country_flag_code
      t.text :about
      t.integer :sample_id
      t.string :instagram_link
      t.string :facebook_link
      t.string :soundcloud_link
      t.integer :weekday_price_from
      t.integer :weekday_price_to
      t.integer :weekend_price_from
      t.integer :weekend_price_to
      t.integer :photo_id
      t.datetime :created_at
      t.datetime :updated_at
    end
    add_index :djs, :sample_id
    add_index :djs, :photo_id
  end
end
