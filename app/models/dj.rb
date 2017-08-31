class Dj < ActiveRecord::Base
  has_many :bookings, dependent: :destroy
  has_many :events, through: :bookings
  belongs_to :user

  has_attached_file :sample

  attr_accessor :step
  validates :rate_per_hour, presence: true, numericality: { greater_than_or_equal_to: 0 ,less_than_or_equal_to: 3000 }, if: -> {  User.dj_steps[step || user.step] >= User.dj_steps[:dj_cancelations] }
  validates :city, length: { in: 3..30 },presence: true, format: { with: /\A[[:alpha:]]+[\s-]?[[:alpha:]]+[\s-]?[[:alpha:]]+\z/, message: "City name is incorrect, use symbols a-z, A-Z, - and space"} , if: -> {  User.dj_steps[step || user.step] >= User.dj_steps[:dj_cancelations] }
  validates_attachment_content_type :sample, :content_type => %w(audio/mpeg audio/x-mpeg audio/mp3 audio/x-mp3 audio/mpeg3 audio/x-mpeg3 audio/mpg audio/x-mpg audio/x-mpegaudio)

  def country_flag
    CountryFlag.find(country_flag_code)
  end

  def country
    country_flag.try :[], :title
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
