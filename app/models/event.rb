class Event < ActiveRecord::Base

  def country_flag
    CountryFlag.find(country_flag_code)
  end

  belongs_to :organizer
  has_attached_file :image, styles: { medium: '300x300>', thumb: '100x100>' }, default_url: '/images/img-event-photo.png'
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
  validates :image, presence: true

  validates :title, presence: true
  validates :country_flag_code, presence: true
  validates :city, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true
end
