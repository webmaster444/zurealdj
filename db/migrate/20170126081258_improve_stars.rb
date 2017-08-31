class ImproveStars < ActiveRecord::Migration[5.0]
  def change
    drop_table :dj_stars
    drop_table :organizer_stars
    create_table :stars do |t|
      t.references :from_user
      t.references :to_user
      t.integer :stars, default: 0
      t.datetime :created_at
    end
  end
end
