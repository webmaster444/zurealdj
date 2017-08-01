class Organizer::ChatRoomsController < Organizer::BaseController
  def index
    @page = params[:page].to_i
    @page = 1 if @page < 1
    @per_page = params[:per_page].to_i
    @per_page = 10 if @per_page < 1

    events = Event.arel_table

    query = events
                .project(Arel.star)
                .group(events[:id])
                .where(events[:title].matches("%#{ params[:q]}%"))
                .where(events[:organizer_id].eq(@current_organizer[:id]))
                .order(events[:last_message_date].desc && events[:created_at].desc)

    count_query = query.clone.project('COUNT(*)')

    @events = Event.find_by_sql(query.take(@per_page).skip((@page - 1) * @per_page).to_sql)
    @count = 0
    @events.each do |event|
      @count += 1 if event.confirmed_bookings_count > 0
    end
  end
end