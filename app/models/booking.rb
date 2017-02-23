class Booking < ActiveRecord::Base

  belongs_to :dj
  belongs_to :event
  has_one :star

  validates :from_date, presence: true
  validates :to_date, presence: true
  validates :rate, presence: true, numericality: { only_integer: true, less_than_or_equal_to: 1e6 - 1 }
  validates :dj_id, presence: true, uniqueness: {scope: :event_id}
  validates :event_id, presence: true
  validates :status, presence: true
  validate :dj_can_confirm_booking
  validate :org_can_book_dj

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

  def dj_can_confirm_booking
    if status_changed? && !dj.user.subscription.try(:dj_can_confirm_booking)
      self.errors.add :status, 'Only subscribed users can confirm booking. Please subscribe.'
    end
  end

  def org_can_book_dj
    if new_record?
      unless !event.nil? && event.organizer.try(:user).try(:subscription).try(:org_can_book_dj)
        self.errors.add :status, 'Only subscribed users can book djs. Please subscribe.'
      end
    end
  end

end
