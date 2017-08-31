class AddCountryFlagCodeToSingletonPages < ActiveRecord::Migration[5.0]
  def change
    add_column :how_we_work_pages, :country_flag_code, :string
    add_column :who_we_are_pages, :country_flag_code, :string
  end
end
