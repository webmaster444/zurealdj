class AddNegotiationToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :negotiation, :boolean
  end
end
