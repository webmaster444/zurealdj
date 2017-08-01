class CreateOrganizations < ActiveRecord::Migration[5.0]
  def change
    create_table :organizers do |t|
      t.string :first_name
      t.string :last_name
      t.string :city
      t.string :country_flag_code
      t.string :address
      t.text :about
      t.string :instagram_link
      t.string :facebook_link
      t.string :soundcloud_link
      t.datetime :created_at
      t.datetime :updated_at
    end
  end
end
