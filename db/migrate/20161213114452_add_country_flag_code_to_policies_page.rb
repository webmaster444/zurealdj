class AddCountryFlagCodeToPoliciesPage < ActiveRecord::Migration[5.0]
  def change
    add_column :policies_pages, :country_flag_code, :string
  end
end
