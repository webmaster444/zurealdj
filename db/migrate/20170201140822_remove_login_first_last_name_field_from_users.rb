class RemoveLoginFirstLastNameFieldFromUsers < ActiveRecord::Migration[5.0]
  def change
    remove_column :djs,   :first_name, :varchar
    remove_column :djs,   :last_name,  :varchar
    remove_column :users, :login,      :varchar
  end
end
