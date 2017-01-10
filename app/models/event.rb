class Event < ActiveRecord::Base

  def country_flag
    CountryFlag.find(country_flag_code)
  end

  has_attached_file :image, styles: { medium: '300x300>', thumb: '100x100>' }, default_url: '/images/missing_picture.png'
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
  validates :image, presence: true

  validates :title, presence: true
  validates :country_flag_code, presence: true
  validates :city, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true
end
