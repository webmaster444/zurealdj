class Booking < ActiveRecord::Base

  belongs_to :dj
  belongs_to :event

  validates :from_date, presence: true
  validates :to_date, presence: true
  validates :rate, presence: true
  validates :dj_id, presence: true
  validates :event_id, presence: true

  private

end
