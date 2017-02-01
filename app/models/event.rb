class Event < ActiveRecord::Base

  has_many :bookings, dependent: :destroy
  has_and_belongs_to_many :djs, join_table: :bookings

  def country_flag
    CountryFlag.find(country_flag_code)
  end

  def country
    country_flag[:title]
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

  def unread_messages_count_for(user, from_user = nil)
    if from_user
      Message.where(event_id: self.id, to_user_id: user.id, from_user_id: from_user.id, read: false).count
    else
      Message.where(event_id: self.id, to_user_id: user.id, read: false).count
    end
  end

  def last_message
    Message.where(event_id: self.id).last
  end

  def booking_for(dj)
    Booking.find_by(event_id: self.id, dj_id: dj.id)
  end
end
