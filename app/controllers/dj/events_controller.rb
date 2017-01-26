class Dj::EventsController < Dj::BaseController

  def index

    @page = params[:page].to_i
    @page = 1 if @page < 1
    @per_page = params[:per_page].to_i
    @per_page = 10 if @per_page < 1

    events = Event.arel_table
    bookings = Booking.arel_table

    fields = [
        events[:id],
        events[:created_at],
        events[:title],
        events[:city],
        events[:country_flag_code],
        events[:address],
        events[:start_date],
        events[:end_date],
        events[:image_file_name],
        events[:image_content_type],
        events[:image_file_size],
        events[:image_updated_at],
        events[:image_updated_at],
        bookings[:event_id]
    ]

    query = events
                .project(fields)
                .join(bookings).on(bookings[:event_id].eq(events[:id]))
                .group(events[:id])
                .group(bookings[:id])
                .where(bookings[:dj_id].eq(current_user.dj.id))

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
    bookings = find_booking @event.bookings
    render json: {  }, status: :not_found and return if bookings.count == 0
    @booking = bookings.first
  end

  private

    def find_booking bookings
      current_user.dj.bookings && bookings
    end

end