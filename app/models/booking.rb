class Booking < ActiveRecord::Base

  belongs_to :dj
  belongs_to :event

  validates :from_date, presence: true
  validates :to_date, presence: true
  validates :rate, presence: true
  validates :dj_id, presence: true
  validates :event_id, presence: true
  validates :dj_id, uniqueness: {scope: :event_id}

  after_create :notify

  private


  def notify
    Notification.create to_user: dj.user,
                        notification_type: :booking_requested,
                        event_id: self.event_id
  end

end
