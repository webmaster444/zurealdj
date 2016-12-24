class User < ActiveRecord::Base
  has_many :sessions, dependent: :destroy
  has_and_belongs_to_many :event_categories
  has_and_belongs_to_many :genres
  has_and_belongs_to_many :equipments
  has_and_belongs_to_many :cancelations

  has_attached_file :avatar, styles: { medium: '300x300>', thumb: '100x100>' }, default_url: '/images/missing_picture.png'

  attr_accessor :password, :password_confirmation
  validates :email, uniqueness: { case_sensitive: false, message: "This email address is already registered." },
                    format: { with: /.*\@.*\..*/, message: "is incorrect"},
                    presence: true

  before_save :encrypt_password
  before_validation :downcase_email
  after_create :send_confirmation_email

  belongs_to :role

  validates :password, presence: true, confirmation: true, if: :validate_password?
  validates :password_confirmation, presence: true, if: :validate_password?
  validates :role_id, presence: true

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

  def step
    dj? ? dj_step : organizer_step
  end

  def next_step
    dj? ? User.dj_steps.key(User.dj_steps[step].to_i + 1) : User.organizer_steps.key(User.organizer_steps[step].to_i + 1)
  end

  def previous_step
    dj? ? User.dj_steps.key(User.dj_steps[step] - 1) : User.organizer_steps.key(User.organizer_steps[step] - 1)
  end

  validate :at_least_one_event_category,        if: -> { dj? && User.dj_steps[step] >= User.dj_steps[:dj_event_types]}
  validate :at_least_one_genre,                 if: -> { dj? && User.dj_steps[step] >= User.dj_steps[:dj_genres]}
  validate :at_least_one_equipment,             if: -> { dj? && User.dj_steps[step] >= User.dj_steps[:dj_equipments]}
  validate :at_least_one_cancelation,           if: -> { dj? && User.dj_steps[step] >= User.dj_steps[:dj_cancelations]}
  validates :weekday_rate_from, presence: true, if: -> { dj? && User.dj_steps[step] >= User.dj_steps[:dj_cancelations]}
  validates :weekday_rate_to, presence: true,   if: -> { dj? && User.dj_steps[step] >= User.dj_steps[:dj_cancelations]}
  validates :weekend_rate_from, presence: true, if: -> { dj? && User.dj_steps[step] >= User.dj_steps[:dj_cancelations]}
  validates :weekend_rate_to, presence: true,   if: -> { dj? && User.dj_steps[step] >= User.dj_steps[:dj_cancelations]}

  validate :at_least_one_event_category,        if: -> { organizer? && User.organizer_steps[step] >= User.organizer_steps[:organizer_event_types]}
  validate :at_least_one_genre,                 if: -> { organizer? && User.organizer_steps[step] >= User.organizer_steps[:organizer_genres]}

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
    if event_categories.count == 0
      self.errors.add :event_categories, 'must be at least one'
    end
  end

  def at_least_one_equipment
    if equipments.count == 0
      self.errors.add :equipments, 'must be at least one'
    end
  end

  def at_least_one_cancelation
    if cancelations.count == 0
      self.errors.add :cancelations, 'must be at least one'
    end
  end
end
