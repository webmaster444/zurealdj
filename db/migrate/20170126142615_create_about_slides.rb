class CreateAboutSlides < ActiveRecord::Migration[5.0]
  def change
    create_table :about_slides do |t|
      t.text :content
      t.timestamps
    end
  end
end
