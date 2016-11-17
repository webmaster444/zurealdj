class Organization < ActiveRecord::Base

  def country_flag
    CountryFlag.find(country_flag_code)
  end


  private

end
