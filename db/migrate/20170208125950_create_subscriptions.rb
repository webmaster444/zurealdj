class CreateSubscriptions < ActiveRecord::Migration[5.0]
  def change
    create_table :subscriptions do |t|
      t.string :title
      t.text :description
      t.integer :price
      t.string :period
      t.integer :period_count
      t.integer :subscription_for

      t.boolean :org_can_book_dj, default: false
      t.boolean :org_can_create_event, default: false
      t.boolean :org_can_add_dj_to_favorites, default: false

      t.boolean :dj_can_be_visible_for_browsing, default: false
      t.boolean :dj_can_confirm_booking, default: false
    end

    add_column :users, :subscribed_at, :datetime
  end
end
