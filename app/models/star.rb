class Star < ApplicationRecord
  belongs_to :from_user, class_name: User
  belongs_to :to_user, class_name: User
  belongs_to :booking

  validates :stars, :numericality => { greater_than_or_equal_to: 0, less_than_or_equal_to: 5 }
  validates :to_user_id, uniqueness: {scope: :booking_id, message: 'Already rated.'}
  validates :comment, presence: true

  after_create :notify

  private

  def notify
    Notification.create to_user: to_user,
                        from_user: from_user,
                        notification_type: :rated,
                        star_id: self.id
  end

end