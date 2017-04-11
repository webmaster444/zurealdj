class Organizer < ActiveRecord::Base

  has_and_belongs_to_many :favorite_djs, join_table: :favorite_djs, class_name: Dj
  has_many :organizer_stars
  has_many :events, dependent: :destroy
  belongs_to :user

  attr_accessor :step
  # old validation if user url return to steps
  # validates :city, length: { in: 3..30 }, presence: true, format: { with: /\A[[:alpha:]]+[\s-]?[[:alpha:]]+[\s-]?[[:alpha:]]+\z/, message: "City name is incorrect, use symbols a-z, A-Z, - and space"} , if: -> {  User.organizer_steps[step || user.step] >= User.organizer_steps[:organizer_personal_url] }
  validates :city, length: { in: 3..30 }, presence: true, format: { with: /\A[[:alpha:]]+[\s-]?[[:alpha:]]+[\s-]?[[:alpha:]]+\z/, message: "City name is incorrect, use symbols a-z, A-Z, - and space"} , if: -> {  User.organizer_steps[step || user.step] >= User.organizer_steps[:organizer_company_name] }
  def country_flag
    CountryFlag.find(country_flag_code)
  end

  def country
    country_flag.try :[], :title
  end

  def stars
    votes_count == 0 ? 0 : stars_count / votes_count
  end

  def stars_count
    organizer_stars.select("COALESCE(SUM(stars), 0) as sum").to_a.first[:sum]
  end

  def votes_count
    organizer_stars.count
  end

  def self.query(options={})
    users = User.arel_table
    organizers = Organizer.arel_table
    subscription = Subscription.arel_table

    fields = [
        users[:id],
        users[:name],
        users[:email],
        users[:about],
        users[:personal_url],
        users[:avatar_file_name],
        users[:avatar_content_type],
        users[:avatar_file_size],
        users[:avatar_updated_at],
        users[:subscription_id],
        organizers[:created_at],
        organizers[:id].as('dj_id'),
        organizers[:city],
        organizers[:country_flag_code],
        subscription[:free],
        subscription[:id].as('subs_id')
    ]

    q = users
            .group(organizers[:id],users[:id],subscription[:id])
            .join(organizers).on(organizers[:user_id].eq(users[:id]))
            .join(subscription, Arel::Nodes::OuterJoin).on(subscription[:id].eq(users[:subscription_id]))

    q.where(users[:name].matches("%#{ options[:name] }%")) if options[:name].present?

    model = Organizer.column_names.include?(options[:sort_column.to_s])? organizers: users

    if options[:sort_column].present? && %w(asc desc).include?(options[:sort_type])
      q = q.order(model[options[:sort_column.to_sym]].send(options[:sort_type].to_sym))
    else
      q = q.order(model[:id].desc)
    end
    countries = CountryFlag.find_by_country_name(options[:country])       if options[:country].present?
    q.where(users[:name].matches("%#{options[:name]}%"))                  if options[:name].present?
    q.where(organizers[:city].matches("%#{ options[:city] }%"))           if options[:city].present?
    q.where(organizers[:country_flag_code].in(countries))                 if options[:country].present?
    q.where(organizers[:created_at].gteq(options[:date_from].to_date))    if options[:date_from].present?
    q.where(organizers[:created_at].lteq(options[:date_to].to_date))      if options[:date_to].present?

    if options[:count]
      q.project("COUNT(*)")
    else
      q.project(fields)
    end
  end

end
