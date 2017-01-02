class Genre < ActiveRecord::Base

  has_and_belongs_to_many :users

  def self.search_query(params)
    params[:per_page] ||= 10
    genres = Genre.arel_table

    fields = [
        genres[:id],
        genres[:title],
        genres[:created_at]
    ]

    query = genres
                .project(Arel.star)
                .group(fields)

    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
      query = query.order(genres[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
      query = query.order(genres[:id].desc)
    end

    query.where(genres[:title].matches("%#{ params[:title] }%"))                                if params[:title].present?
    query.where(genres[:created_at].gteq(Date.parse(params[:date_from]).beginning_of_day))      if params[:date_from].present?
    query.where(genres[:created_at].lteq(Date.parse(params[:date_to]).end_of_day))              if params[:date_to].present?

    query
  end

end
