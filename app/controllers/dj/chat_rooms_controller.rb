class Dj::ChatRoomsController < Dj::BaseController
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
        events[:image_file_name],
        events[:image_content_type],
        events[:image_file_size],
        events[:image_updated_at],
        events[:organizer_id]
    ]

    query = bookings
                .group(bookings[:id])
                .where(bookings[:dj_id].eq(@current_dj.id))
                .group(events[:id])
                .join(events).on(bookings[:event_id].eq(events[:id]))
                .where(events[:title].matches("%#{ params[:q]}%"))
                .project(fields)
                .order(events[:last_message_date].desc && events[:created_at].desc)

    count_query = query.clone.project('COUNT(*)')

    @events = Event.find_by_sql(query.take(@per_page).skip((@page - 1) * @per_page).to_sql)
    @count = Event.find_by_sql(count_query.to_sql).count
  end
end