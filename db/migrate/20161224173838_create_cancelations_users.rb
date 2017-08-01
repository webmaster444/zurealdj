class CreateCancelationsUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :cancelations_users do |t|
      t.references :user
      t.references :cancelation
    end
  end
end
