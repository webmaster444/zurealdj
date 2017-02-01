class Organizer::ChatRoomsController < Organizer::BaseController
  def index
    # @page = params[:page].to_i
    # @page = 1 if @page < 1
    # @per_page = params[:per_page].to_i
    # @per_page = 10 if @per_page < 1
    #
    # events = Event.arel_table
    #
    # query = events
    #         .project(Arel.star)
    #         .group(events[:id])
    #         .where(events[:organizer_id].eq current_user.organizer[:id])
    #
    # query.where(events[:title].matches("%#{ params[:title] }%")) if params[:title].present?
    #
    # if params[:sort_column].present? && %w(asc desc).include?(params[:sort_type])
    #   query = query.order(events[params[:sort_column.to_sym]].send(params[:sort_type].to_sym))
    # else
    #   query = query.order(events[:created_at].desc)
    # end
    #
    # count_query = query.clone.project('COUNT(*)')

    @events = @current_organizer.events
  end
end