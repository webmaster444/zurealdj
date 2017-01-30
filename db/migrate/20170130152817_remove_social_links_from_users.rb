class RemoveSocialLinksFromUsers < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :instagram_link, :string
    remove_column :users, :facebook_link, :string
    remove_column :users, :soundcloud_link, :string
  end
end
