class Dj < ActiveRecord::Base

  has_many :dj_stars

  has_attached_file :sample

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

  private

  def self.search_query(params)
    djs = Dj.arel_table
    fields = Dj.column_names.map { |name| djs[name] }
    query = djs.project(Arel.star).group(djs[:id])

    if params[:sort_column].present? && %w(asc desc).include?(params[:sort_type])
      query = query.order(djs[params[:sort_column.to_sym]].send(params[:sort_type].to_sym))
    else
      query = query.order(djs[:id].desc)
    end
    countries = CountryFlag.find_by_country_name(params[:country])           if params[:country].present?
    query.where(djs[:first_name].matches("%#{params[:first_name]}%"))        if params[:first_name].present?
    query.where(djs[:last_name].matches("%#{ params[:last_name] }%"))        if params[:last_name].present?
    query.where(djs[:city].matches("%#{ params[:city] }%"))                  if params[:city].present?
    query.where(djs[:country_flag_code].in(countries))                       if params[:country].present?
    query.where(djs[:weekday_price_from].gteq(params[:weekday_price_from]))  if params[:weekday_price_from].present?
    query.where(djs[:weekday_price_to].lteq(params[:weekday_price_to]))      if params[:weekday_price_to].present?
    query.where(djs[:weekend_price_from].gteq(params[:weekend_price_from]))  if params[:weekend_price_from].present?
    query.where(djs[:weekend_price_to].lteq(params[:weekend_price_to]))      if params[:weekend_price_to].present?
    query.where(djs[:created_at].gteq(params[:date_from].to_date))           if params[:date_from].present?
    query.where(djs[:created_at].lteq(params[:date_to].to_date))             if params[:date_to].present?

    if params[:count].present?
      query.project("COUNT(*)")
    else
      query.project(fields)
    end

    query
  end
end
