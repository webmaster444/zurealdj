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
    if to_date && from_date
      event = Event.find event_id
      self.errors.add :from_date, "From date must be greater or equal than Event start date." if event && from_date < event.start_date
      self.errors.add :to_date, "To date must be less or equal than Event end date." if event && to_date > event.end_date
      self.errors.add :to_date, "To Date must be greater than from date." if to_date < from_date
    end
  end

end
