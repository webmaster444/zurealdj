class CreateGenresUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :genres_users do |t|
      t.references :user
      t.references :genre
    end
  end
end
