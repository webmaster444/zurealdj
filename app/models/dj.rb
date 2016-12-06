class Dj < ActiveRecord::Base

  def country_flag
    CountryFlag.find(country_flag_code)
  end
  attr_accessor :sample

  def sample_attachments
    Attachment.where entity_id: self.id, entity_type: 'dj_sample'
  end
  attr_accessor :photo

  def photo_attachments
    Attachment.where entity_id: self.id, entity_type: 'dj_photo'
  end

  after_destroy :destroy_attachments
  after_save :update_attachments

  private


  def destroy_attachments
    sample_attachments.destroy_all
    photo_attachments.destroy_all
  end

  def update_attachments
    update_sample_attachments
    update_photo_attachments
  end


  def update_sample_attachments
    self.sample ||= {}
    if self.sample[:id]
      Attachment.find_by_id_and_entity_type(self.sample[:id], 'dj_sample').destroy if self.sample[:removed] == true || self.sample[:removed] == 'true'
    elsif self.sample[:file]
      Attachment.create file: self.sample[:file], entity_type: 'dj_sample', entity_id: self.id
    end
    end

  def update_photo_attachments
    self.photo ||= {}
    if self.photo[:id]
      Attachment.find_by_id_and_entity_type(self.photo[:id], 'dj_photo').destroy if self.photo[:removed] == true || self.photo[:removed] == 'true'
    elsif self.photo[:file]
      Attachment.create file: self.photo[:file], entity_type: 'dj_photo', entity_id: self.id
    end
    end

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
