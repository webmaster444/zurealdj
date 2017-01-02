class Cancelation < ActiveRecord::Base

  def self.search_query(params)
    params[:per_page] ||= 10
    cancelations = Cancelation.arel_table

    fields = [
        cancelations[:id],
        cancelations[:title],
        cancelations[:created_at]
    ]

    query = cancelations
                .project(Arel.star)
                .group(fields)

    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
      query = query.order(cancelations[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
      query = query.order(cancelations[:id].desc)
    end

    query.where(cancelations[:title].matches("%#{ params[:title] }%"))                                if params[:title].present?
    query.where(cancelations[:created_at].gteq(Date.parse(params[:date_from]).beginning_of_day))      if params[:date_from].present?
    query.where(cancelations[:created_at].lteq(Date.parse(params[:date_to]).end_of_day))              if params[:date_to].present?

    query
  end

  private

end
