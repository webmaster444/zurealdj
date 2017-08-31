class CreateUsersEventTypes < ActiveRecord::Migration[5.0]
  def change
    create_table :event_categories_users do |t|
      t.references :user
      t.references :event_category
    end
  end
end
