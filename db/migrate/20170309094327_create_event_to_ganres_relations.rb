class CreateEventToGanresRelations < ActiveRecord::Migration[5.0]
  def change
    create_table :events_genres do |t|
      t.references :genre
      t.references :event
    end
  end
end
