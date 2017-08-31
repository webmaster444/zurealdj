class AddCountryFlagCodeToCrewPages < ActiveRecord::Migration[5.0]
  def change
    add_column :crew_pages, :country_flag_code, :string
  end
end
