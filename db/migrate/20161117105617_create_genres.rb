class CreateGenres < ActiveRecord::Migration[5.0]
  def change
    create_table :genres do |t|
      t.string :title
      t.datetime :created_at
      t.datetime :updated_at
    end
  end
end
