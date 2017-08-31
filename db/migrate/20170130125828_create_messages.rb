class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.references :event
      t.references :booking
      t.references :from_user
      t.references :to_user
      t.text :body
      t.boolean :read, default: false
      t.timestamps
    end
  end
end
