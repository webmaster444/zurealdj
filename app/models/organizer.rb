class Organizer < ActiveRecord::Base

  has_and_belongs_to_many :favorite_djs, join_table: :favorite_djs, class_name: Dj

  def country_flag
    CountryFlag.find(country_flag_code)
  end

  private

end
