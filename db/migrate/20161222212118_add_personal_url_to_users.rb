class AddPersonalUrlToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :personal_url, :string
  end
end
