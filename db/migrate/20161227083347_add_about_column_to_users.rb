class AddAboutColumnToUsers < ActiveRecord::Migration[5.0]
  def change
    remove_column :djs, :about, :text
    remove_column :organizers, :about, :text
    add_column :users, :about, :text

    remove_column :djs, :instagram_link, :string
    remove_column :organizers, :instagram_link, :string
    add_column :users, :instagram_link, :string

    remove_column :djs, :facebook_link, :string
    remove_column :organizers, :facebook_link, :string
    add_column :users, :facebook_link, :string

    remove_column :djs, :soundcloud_link, :string
    remove_column :organizers, :soundcloud_link, :string
    add_column :users, :soundcloud_link, :string
  end
end
