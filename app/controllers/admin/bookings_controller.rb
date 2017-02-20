class Admin::BookingsController < ApplicationController

  load_and_authorize_resource :booking

  def index
    @page = params[:page].to_i
    @page = 1 if @page < 1
    @per_page = params[:per_page].to_i
    @per_page = 10 if @per_page < 1

    bookings = Booking.arel_table
    events = Event.arel_table

    query = bookings
            .project(Arel.star)
            .group(bookings[:id])
            .group(events[:id])
            .join(events).on(events[:id].eq(bookings[:event_id]))


    query.where(events[:title].matches("%#{ params[:title] }%"))                 if params[:title].present?
    query.where(bookings[:rate].eq(params[:rate]))                               if params[:rate].present?
    query.where(bookings[:created_at].gteq(params[:date_from].to_date))          if params[:date_from].present?
    query.where(bookings[:created_at].lteq(params[:date_to].to_date))            if params[:date_to].present?
    query.where(bookings[:from_date].gteq(params[:start_date_from].to_date))     if params[:start_date_from].present?
    query.where(bookings[:from_date].lteq(params[:start_date_to].to_date))       if params[:start_date_to].present?
    query.where(bookings[:to_date].gteq(params[:end_date_from].to_date))         if params[:end_date_from].present?
    query.where(bookings[:to_date].lteq(params[:end_date_to].to_date))           if params[:end_date_to].present?


    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
      query = query.order(bookings[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
      query = query.order(bookings[:id].desc)
    end

    count_query = query.clone.project('COUNT(*)')

    respond_to do |f|
      f.json do
        @bookings = Booking.find_by_sql(query.take(@per_page).skip((@page - 1) * @per_page).to_sql)
        @count = Booking.find_by_sql(count_query.to_sql).count
      end

      f.csv do
        headers["Content-Type"]        = "text/csv"
        headers["Content-disposition"] = "attachment; filename=bookings.csv"
        headers['Last-Modified']       = Time.now.ctime.to_s
        # headers['X-Accel-Buffering'] = 'no'
        # headers["Cache-Control"] ||= "no-cache"
        # headers["Content-Transfer-Encoding"] = "binary"

        self.response_body = BookingsStreamer.new(query)
      end
    end
  end

  def destroy
    @booking.destroy
    render json: {ok: true}
  end

  def show

  end
end