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
                .order(events[:created_at].desc)
                .take(10)

    @events = @current_organizer.events.find_by_sql(query.to_sql)
  end
end