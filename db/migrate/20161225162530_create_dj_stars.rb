class CreateDjStars < ActiveRecord::Migration[5.0]
  def change
    create_table :dj_stars do |t|
      t.references :dj
      t.references :organizer
      t.integer :stars, default: 0
    end
  end
end
