class AddNegotiationToDjs < ActiveRecord::Migration[5.0]
  def change
    add_column :djs, :negotiation, :boolean
  end
end
