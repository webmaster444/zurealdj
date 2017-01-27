class User < ActiveRecord::Base
  has_many :sessions, dependent: :destroy
  has_and_belongs_to_many :event_categories
  has_and_belongs_to_many :genres
  has_and_belongs_to_many :equipments
  has_one :dj, dependent: :destroy
  has_one :organizer, dependent: :destroy
  has_many :stars, foreign_key: :to_user_id

  accepts_nested_attributes_for :organizer
  accepts_nested_attributes_for :dj

  has_attached_file :avatar, styles: { small: "50x50>", large: "400x400>" }, processors: [:cropper], default_url: '/images/img-profile-photo.png'

  attr_accessor :password, :password_confirmation
  attr_accessor :agree
  validates :email, uniqueness: { case_sensitive: false, message: "This email address is already registered." },
                    format: { with: /.*\@.*\..*/, message: "is incorrect"},
                    presence: true

  before_save :encrypt_password
  before_validation :downcase_email
  after_create :send_confirmation_email
  after_create :create_dependent_record

  belongs_to :role

  validates :password, presence: true, confirmation: true, if: :validate_password?
  validates :password_confirmation, presence: true, if: :validate_password?
  validates :role_id, presence: true
  validates :name, presence: true
  validates :agree, inclusion: {in: [true], message: 'You should accept therms of Cancellation Policy to continue'}, if: -> { dj? && User.dj_steps[step] == User.dj_steps[:dj_cancelations]}
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/



  enum dj_step: {
      dj_just_created: 0,
      dj_event_types: 1,
      dj_genres: 2,
      dj_equipments: 3,
      dj_personal_url: 4,
      dj_cancelations: 5,
      dj_completed: 6
  }

  enum organizer_step: {
      organizer_just_created: 0,
      organizer_event_types: 1,
      organizer_genres: 2,
      organizer_company_name: 3,
      organizer_personal_url: 4,
      organizer_completed: 5
  }

  def rate
    stars.count == 0 ? 0 : stars_count / stars.count
  end

  def stars_count
    stars.select("COALESCE(SUM(stars), 0) as sum").to_a.first[:sum]
  end

  def country_flag
    CountryFlag.find(country_flag_code)
  end

  def step
    dj? ? dj_step : organizer_step
  end

  def next_step
    if dj?
      step_number = User.dj_steps[step] + 1
      step_number = 0 if step_number < 0
      step_number = 6 if step_number > 6
      User.dj_steps.key(step_number)
    elsif organizer?
      step_number = User.organizer_steps[step] + 1
      step_number = 0 if step_number < 0
      step_number = 6 if step_number > 5
      User.organizer_steps.key(step_number)
    end
  end

  def previous_step
    if dj?
      step_number = User.dj_steps[step] - 1
      step_number = 0 if step_number < 0
      step_number = 6 if step_number > 6
      User.dj_steps.key(step_number)
    elsif organizer?
      step_number = User.organizer_steps[step] - 1
      step_number = 0 if step_number < 0
      step_number = 6 if step_number > 5
      User.organizer_steps.key(step_number)
    end
  end

  validate :at_least_one_event_category,        if: -> { (dj? && User.dj_steps[step] >= User.dj_steps[:dj_event_types]) || (organizer? && User.organizer_steps[step] >= User.organizer_steps[:organizer_event_types])}
  validate :at_least_one_genre,                 if: -> { (dj? && User.dj_steps[step] >= User.dj_steps[:dj_genres]) || (organizer? && User.organizer_steps[step] >= User.organizer_steps[:organizer_genres])}
  validate :at_least_one_equipment,             if: -> { dj? && User.dj_steps[step] >= User.dj_steps[:dj_equipments]}

  Role::NAMES.each do |name_constant|
    define_method("#{name_constant}?") { self.role.try(:name) == name_constant.to_s }
  end

  def authenticate(password)
    self.encrypted_password == encrypt(password)
  end

  def destroy
    raise "Cannot destroy admin" if admin?
    super
  end

  def send_password_reset
    self.update_attribute :reset_password_token, encrypt(Time.now.to_s)
    UserMailer.password_reset(self.id).deliver_now
  end

  def avatar_from_url(url)
    self.avatar = open(url) if url
  end

  private

  def create_dependent_record
    if dj?
      create_dj
    elsif organizer?
      create_organizer
    end
  end

  def validate_password?
    !password.nil? || !password_confirmation.nil?
  end

  def send_confirmation_email
    return if self.confirmed
    self.update_attribute :confirmation_token, encrypt(self.email)
    UserMailer.email_confirmation(self.id).deliver_now
  end

  def downcase_email
    self.email = self.email.downcase if self.email
  end

  def encrypt_password
    self.salt = make_salt if salt.blank?
    self.encrypted_password = encrypt(self.password) if self.password
  end

  def encrypt(string)
    secure_hash("#{string}--#{self.salt}")
  end

  def make_salt
    secure_hash("#{Time.now.utc}--#{self.password}")
  end

  def secure_hash(string)
    Digest::SHA2.hexdigest(string)
  end

  def at_least_one_genre
    if genres.count == 0
      self.errors.add :genres, 'must be at least one'
    end
  end

  def at_least_one_event_category
    self.errors.add :event_categories, 'must be at least one' if event_categories.blank?
  end

  def at_least_one_equipment
    if equipments.count == 0
      self.errors.add :equipments, 'must be at least one'
    end
  end

end
