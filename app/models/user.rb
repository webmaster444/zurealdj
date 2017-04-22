class User < ActiveRecord::Base
  has_many :sessions, dependent: :destroy
  has_and_belongs_to_many :event_categories
  has_and_belongs_to_many :genres
  has_and_belongs_to_many :equipments
  has_one :dj, dependent: :destroy
  has_one :organizer, dependent: :destroy
  has_many :stars, foreign_key: :to_user_id
  has_many :messages_to_me, foreign_key: :from_user_id, class_name: Message, dependent: :destroy
  has_many :messages_from_me, foreign_key: :to_user_id, class_name: Message, dependent: :destroy
  belongs_to :subscription
  accepts_nested_attributes_for :organizer
  accepts_nested_attributes_for :dj

  has_attached_file :avatar, styles: { small: "50x50>", large: "400x400>" }, processors: [:cropper], default_url: '/images/img-profile-photo.png'

  attr_accessor :password, :password_confirmation
  attr_accessor :agree
  validates :email, uniqueness: { case_sensitive: false, message: "This email address is already registered." },
                    format: { with: /\A[a-zA-Z0-9]+[a-zA-Z0-9\._-]*[a-zA-Z0-9]+@[a-zA-Z0-9]+[-_]*[a-zA-Z0-9\.]+[a-zA-Z0-9]+\.[a-zA-Z]{2,}\z/, message: "Email address is incorrect"},
                    presence: true
  validates :new_email, format: { with: /\A[a-zA-Z0-9]+[a-zA-Z0-9\._-]*[a-zA-Z0-9]+@[a-zA-Z0-9]+[-_]*[a-zA-Z0-9\.]+[a-zA-Z0-9]+\.[a-zA-Z]{2,}\z/, message: "Email address is incorrect"}, allow_blank: true
  validate :new_email_in_email_scope
  validates :personal_url, uniqueness: { case_sensitive: false, message: "This url is already in use." },
            format: { with: /\A[a-zA-Z0-9_-]+\z/, message: 'Can only contain letters, numbers, symbols (-_) '}, allow_blank: true,
            length: {minimum: 3}
  validates :personal_url, uniqueness: { case_sensitive: false, message: "This personal url is already registered."}, allow_blank: true
  validates :company_name, length: { in: 2..30 }, uniqueness: { case_sensitive: false, message: "This company name is already registered."}, if: :validate_company_name?

  before_create :subscribe_user
  before_save :encrypt_password
  before_validation :downcase_email
  after_create :create_dependent_record
  after_create :send_confirmation_email
  before_destroy :validate_destroy
  before_update :check_new_email
  scope :admins, -> { where(role_id: Role.admin.id ) }
  belongs_to :role

  validates :password, presence: true, length: { in: 8..60 }, confirmation: true, if: :validate_password?
  validates :password_confirmation, presence: true, if: :validate_password?
  validates :role_id, presence: true
  validates :about, length: { maximum: 400 }
  validates :name, presence: true, length: { in: 6..30 }
  validates :agree, inclusion: {in: [true], message: 'You should accept therms of Cancellation Policy to continue'}, if: -> { dj? && User.dj_steps[step] == User.dj_steps[:dj_cancelations]}
  validate :rate_per_hour_set, if: -> { dj? && User.dj_steps[step] == User.dj_steps[:dj_cancelations]}
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  validates :crop_x, presence: true, if: :validate_crop_data?
  validates :crop_y, presence: true, if: :validate_crop_data?
  validates :crop_w, presence: true, if: :validate_crop_data?
  validates :crop_h, presence: true, if: :validate_crop_data?
  validates :crop_rotate, presence: true, if: :validate_crop_data?
  validates :crop_scale_x, presence: true, if: :validate_crop_data?
  validates :crop_scale_y, presence: true, if: :validate_crop_data?

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



  def send_password_reset
    self.update_attribute :reset_password_token, encrypt(Time.now.to_s)
    UserMailer.password_reset(self.id).deliver_now
  end

  def avatar_from_url(url)
    self.avatar = open(url) if url
  end

  def online
    isOnline = self.sessions.order(updated_at: :desc).first
    true if isOnline && isOnline.updated_at > Time.now - 15.minutes
  end

  private

  def validate_destroy
    if User.count == 1
      self.errors.add :base, 'Can not remove last user.'
      false
    elsif self.admin? && User.admins.count == 1
      self.errors.add :base, 'Can not remove last admin.'
      false
    else
      true
    end
  end

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

  def validate_personal_url?
    !personal_url.nil?
  end

  def validate_crop_data?
    dj_step == 6 || organizer_step == 5
  end

  def validate_company_name?
    !company_name.nil? && company_name != ""
  end

  def send_confirmation_email
    return if self.confirmed
    self.update_attribute :confirmation_token, encrypt(self.email)
    UserMailer.email_confirmation(self.id).deliver_later
  end

  def send_confirmation_of_new_email
    self.confirmation_token = encrypt(self.new_email)
    UserMailer.email_confirmation(self.id).deliver_later
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
      self.errors.add :genres, 'Please select at least 1 genre'
    end
  end

  def at_least_one_event_category
    self.errors.add :event_categories, 'Please select at least 1 event type' if event_categories.blank?
  end

  def at_least_one_equipment
    if equipments.count == 0
      self.errors.add :equipments, 'Please select at least 1 equipment'
    end
  end

  def rate_per_hour_set
    if self.dj.free_to_hire
    else
      if !self.dj.rate_per_hour? || self.dj.rate_per_hour<0
        self.errors.add :rate_per_hour, 'Please enter Your rate per hour or mark as free to hire'
      end
    end
  end

  def subscribe_user
    if self.dj?

      @subscription = Subscription.free_for_dj
      self.subscribed_at = Time.now
      self.subscription_expires_at = Time.now + @subscription.period_count.send(@subscription.period)
      self.subscription_id = @subscription.id

    elsif self.organizer?

      @subscription = Subscription.free_for_organizer
      self.subscription_id = @subscription.id
      self.subscribed_at = Time.now
      self.subscription_expires_at = Time.now + @subscription.period_count.send(@subscription.period)

    end
  end

  def new_email_in_email_scope
    self.errors.add :base, 'Such email is already registered.' if User.all.map(&:email).include? self.new_email
  end

  def check_new_email
    if self.new_email_changed? && !self.new_email.nil?
        if self.new_email != ''
         send_confirmation_of_new_email
        else
          self.new_email = nil
          self.confirmation_token = nil
        end
    end
  end
end
