class CreateContactUsPages < ActiveRecord::Migration[5.0]
  def change
    create_table :contact_us_pages do |t|
      t.text :content
      t.timestamps
    end
  end
end
