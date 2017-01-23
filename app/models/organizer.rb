class Organizer < ActiveRecord::Base

  has_and_belongs_to_many :favorite_djs, join_table: :favorite_djs, class_name: Dj
  has_many :organizer_stars
  has_many :events, dependent: :destroy

  def country_flag
    CountryFlag.find(country_flag_code)
  end

  def country
    country_flag.try :[], :title
  end

  def stars
    votes_count == 0 ? 0 : stars_count / votes_count
  end

  def stars_count
    organizer_stars.select("COALESCE(SUM(stars), 0) as sum").to_a.first[:sum]
  end

  def votes_count
    organizer_stars.count
  end

  private

end
