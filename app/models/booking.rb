class Booking < ActiveRecord::Base

  belongs_to :dj
  belongs_to :event
  has_one :star

  validates :from_date, presence: true
  validates :to_date, presence: true
  validates :rate, presence: true
  validates :dj_id, presence: true, uniqueness: {scope: :event_id}
  validates :event_id, presence: true
  validates :status, presence: true

  after_create :notify

  validate :date_validation

  enum status: {
    pending: 0,
    confirmed: 1,
    cancelled: 2
  }

  private

  def notify
    Notification.create to_user: dj.user,
                        notification_type: :booking_requested,
                        event_id: self.event_id
  end


  def date_validation
    errors[:to_date] << "To Date must be greater than from date." if to_date < from_date
    to_date < from_date
  end

end
