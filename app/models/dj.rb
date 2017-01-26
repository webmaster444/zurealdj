class Dj < ActiveRecord::Base
  has_many :bookings, dependent: :destroy
  belongs_to :user

  has_attached_file :sample

  validates :weekday_rate_from, presence: true, if: -> { user && User.dj_steps[user.step] >= User.dj_steps[:dj_cancelations]}
  validates :weekday_rate_to, presence: true,   if: -> { user && User.dj_steps[user.step] >= User.dj_steps[:dj_cancelations]}
  validates :weekend_rate_from, presence: true, if: -> { user && User.dj_steps[user.step] >= User.dj_steps[:dj_cancelations]}
  validates :weekend_rate_to, presence: true,   if: -> { user && User.dj_steps[user.step] >= User.dj_steps[:dj_cancelations]}
  validates_attachment_content_type :sample, :content_type => %w(audio/mpeg audio/x-mpeg audio/mp3 audio/x-mp3 audio/mpeg3 audio/x-mpeg3 audio/mpg audio/x-mpg audio/x-mpegaudio)

  def country_flag
    CountryFlag.find(country_flag_code)
  end

  def Dj.find_user id
    user = User.find_by_personal_url id
    if user.nil?
      dj = Dj.find id
    else
      dj = Dj.find_by_user_id user.id
    end
    dj
  end

end
