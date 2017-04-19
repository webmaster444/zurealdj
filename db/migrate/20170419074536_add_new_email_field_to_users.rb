class AddNewEmailFieldToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :new_email, :string
  end
end
