class EventCategory < ActiveRecord::Base

  has_and_belongs_to_many :users

  def self.search_query(params)
    params[:per_page] ||= 10
    event_categories = EventCategory.arel_table

    fields = [
        event_categories[:id],
        event_categories[:title],
        event_categories[:created_at]
    ]

    query = event_categories
                .project(Arel.star)
                .group(fields)

    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
      query = query.order(event_categories[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
      query = query.order(event_categories[:id].desc)
    end

    query.where(event_categories[:title].matches("%#{ params[:title] }%"))                                if params[:title].present?
    query.where(event_categories[:created_at].gteq(Date.parse(params[:date_from]).beginning_of_day))      if params[:date_from].present?
    query.where(event_categories[:created_at].lteq(Date.parse(params[:date_to]).end_of_day))              if params[:date_to].present?

    query
  end

  private

end
