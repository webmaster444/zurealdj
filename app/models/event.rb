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
  has_attached_file :image,  styles: { large: "400x400>", small: "50x50>" }, processors: [:cropper], default_url: '/images/img-event-photo.png'
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
  validates :image, presence: true

  validates :title, presence: true, length: { in: 6..60 }
  validates :country_flag_code, presence: true
  validates :city, presence: true, length: { in: 3..30 }, format: { with: /\A[a-zA-Z-\s]+\z/, message: "is incorrect, use symbols a-z, A-Z, - and space"}
  validates :start_date, presence: true
  validates :end_date, presence: true
  validates :event_category_id, presence: true
  validates :dj_slots, presence: true

  validates :crop_x, presence: true
  validates :crop_y, presence: true
  validates :crop_w, presence: true
  validates :crop_h, presence: true
  validates :crop_rotate, presence: true
  validates :crop_scale_x, presence: true
  validates :crop_scale_y, presence: true

  validate :date_validation

  def unread_messages_count_for(user, from_user = nil)
    if from_user
      Message.where(event_id: self.id, to_user_id: user.id, from_user_id: from_user.id, read: false).count
    else
      Message.where(event_id: self.id, to_user_id: user.id, read: false).count
    end
  end

  def last_message dj_id, org_id
    messages = Message.arel_table

    query = messages
                .project(Arel.star)
                .group(messages[:id])
                .where(messages[:event_id].eq(self.id))
                .where(
                    messages[:from_user_id].in([org_id, dj_id])
                        .and(messages[:to_user_id].in([org_id, dj_id]))
                )

    Message.find_by_sql(query.to_sql).last
  end

  def booking_for(dj)
    Booking.find_by(event_id: self.id, dj_id: dj.id)
  end

  def status
    current_date = DateTime.now
    status = "Upcoming"
    if end_date < current_date
      status = "Finished"
    elsif end_date >= current_date && start_date <= current_date
      status = "Active"
    end
    status
  end

  def date_validation
    self.errors.add :end_date, "End Date must be greater than start date." if end_date && start_date && end_date < start_date
  end
end
