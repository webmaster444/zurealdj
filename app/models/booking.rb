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
  validate :booking_changes

  after_create :notify
  after_update :notify_update
  validate :date_validation

  enum status: {
    pending: 0,
    confirmed: 1,
    cancelled: 2
  }

  private

  def notify
    Notification.create to_user: dj.user,
                        from_user: self.event.organizer.user,
                        notification_type: :booking_requested,
                        event_id: self.event_id,
                        message: "Booking request for '#{ self.event.title }' event"
  end

  def notify_update

    if self.confirmed?
     Notification.create to_user: self.event.organizer.user,
                         from_user: dj.user,
                          notification_type: :booking_confirmed,
                          event_id: self.event_id,
                          message: "Dj confirmed participation in: '#{ self.event.title }' "

    elsif self.cancelled?
     Notification.create to_user: self.event.organizer.user,
                         from_user: dj.user,
                          notification_type: :booking_cancelled,
                          event_id: self.event_id,
                          message: "Dj cancelled his participation in: '#{ self.event.title }' "
    end

  end

  def date_validation
    if to_date && from_date
      event = Event.find event_id
      if event && from_date < event.start_date
        if event && from_date.beginning_of_day + 24.hours > event.start_date
          self.errors.add :from_date, "From Time must be greater than in event."
        else
          self.errors.add :from_date, "From date must be greater or equal than Event start date."
        end

      end
      if event && to_date > event.end_date
        if event && to_date < event.end_date.end_of_day
          self.errors.add :to_date, "To Time must be less than in event."
          else
            self.errors.add :to_date, "To date must be less or equal than Event end date."
        end
      end
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

  def booking_changes
    if self.event.end_date < Time.now
      if status_changed?
        self.errors.add :status, "Event finished. You can't change Your participation status"
      else
        self.errors.add :status, "Event finished. You can't change bookings"
      end
    end
  end

end
