class CreateHowWeWorkPages < ActiveRecord::Migration[5.0]
  def change
    create_table :how_we_work_pages do |t|
      t.text :content
      t.datetime :created_at
      t.datetime :updated_at
    end
  end
end
