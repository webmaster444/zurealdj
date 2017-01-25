class Dj::EventsController < Dj::BaseController

  def index
    #@events = current_user.events
    #@count = @events.count

    @page = params[:page].to_i
    @page = 1 if @page < 1
    @per_page = params[:per_page].to_i
    @per_page = 10 if @per_page < 1

    events = Event.arel_table

    query = events
                .project(Arel.star)
                .group(events[:id])

    query.where(events[:title].matches("%#{ params[:title] }%")) if params[:title].present?

    if params[:sort_column].present? && %w(asc desc).include?(params[:sort_type])
      query = query.order(events[params[:sort_column.to_sym]].send(params[:sort_type].to_sym))
    else
      query = query.order(events[:created_at].desc)
    end

    count_query = query.clone.project('COUNT(*)')

    @events = Event.find_by_sql(query.take(@per_page).skip((@page - 1) * @per_page).to_sql)
    @count = Event.find_by_sql(count_query.to_sql).count
  end

  def show
    @event = Event.find params[:id]
  end

end