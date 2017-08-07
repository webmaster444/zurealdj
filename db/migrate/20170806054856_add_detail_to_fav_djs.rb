class AddDetailToFavDjs < ActiveRecord::Migration[5.0]
  def change
    add_column :fav_djs, :detail, :text
  end
end
