class RemoveOrganizerIdFromFavDjs < ActiveRecord::Migration[5.0]
  def change
    remove_column :fav_djs, :organizer_id, :integer
  end
end
