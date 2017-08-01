class Admin::EventsController < ApplicationController

  load_and_authorize_resource :event

  def index
    @page = params[:page].to_i
    @page = 1 if @page < 1
    @per_page = params[:per_page].to_i
    @per_page = 10 if @per_page < 1

    events = Event.arel_table

    query = events
            .project(Arel.star)
            .group(events[:id])

    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
        query = query.order(events[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
        query = query.order(events[:id].desc)
    end

    countries = CountryFlag.find_by_country_name(params[:country])              if params[:country].present?
    query.where(events[:title].matches("%#{ params[:title] }%"))                if params[:title].present?
    query.where(events[:country_flag_code].in(countries))                       if params[:country].present?
    query.where(events[:city].matches("%#{ params[:city] }%"))                  if params[:city].present?
    query.where(events[:created_at].gteq(params[:date_from].to_date))           if params[:date_from].present?
    query.where(events[:created_at].lteq(params[:date_to].to_date))             if params[:date_to].present?
    query.where(events[:start_date].gteq(params[:start_date_from].to_date))     if params[:start_date_from].present?
    query.where(events[:start_date].lteq(params[:start_date_to].to_date))       if params[:start_date_to].present?
    query.where(events[:end_date].gteq(params[:end_date_from].to_date))         if params[:end_date_from].present?
    query.where(events[:end_date].lteq(params[:end_date_to].to_date))           if params[:end_date_to].present?

    count_query = query.clone.project('COUNT(*)')

    respond_to do |f|
      f.json do
        @events = Event.find_by_sql(query.take(@per_page).skip((@page - 1) * @per_page).to_sql)
        @count = Event.find_by_sql(count_query.to_sql).count
      end

      f.csv do
        headers["Content-Type"]        = "text/csv"
        headers["Content-disposition"] = "attachment; filename=events.csv"
        headers['Last-Modified']       = Time.now.ctime.to_s
        # headers['X-Accel-Buffering'] = 'no'
        # headers["Cache-Control"] ||= "no-cache"
        # headers["Content-Transfer-Encoding"] = "binary"

        self.response_body = EventsStreamer.new(query)
      end
    end
  end
  
  def destroy
    @event.destroy
    render json: {ok: true}
  end

  def show

  end

end