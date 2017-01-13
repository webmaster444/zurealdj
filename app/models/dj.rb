class Dj < ActiveRecord::Base

  has_many :dj_stars
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

  def stars
    votes_count == 0 ? 0 : stars_count / votes_count
  end

  def stars_count
    dj_stars.select("COALESCE(SUM(stars), 0) as sum").to_a.first[:sum]
  end

  def votes_count
    dj_stars.count
  end

end
