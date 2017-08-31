class CreateFavoriteDjs < ActiveRecord::Migration[5.0]
  def change
    create_table :favorite_djs do |t|
      t.references :dj
      t.references :organizer
    end
  end
end
