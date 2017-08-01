class CreatePoliciesPages < ActiveRecord::Migration[5.0]
  def change
    create_table :policies_pages do |t|
      t.text :content
      t.datetime :created_at
      t.datetime :updated_at
    end
  end
end
