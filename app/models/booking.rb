class Booking < ActiveRecord::Base

  validates :from_date, presence: true
  validates :to_date, presence: true
  validates :rate, presence: true
  validates :dj_id, presence: true
  validates :event_id, presence: true

  private

end
