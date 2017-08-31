class Dj::EventsController < Dj::BaseController

  def index

    @page = params[:page].to_i
    @page = 1 if @page < 1
    @per_page = params[:per_page].to_i
    @per_page = 10 if @per_page < 1

    price_from = params[:price_from].to_i
    if price_from < 0
      price_from = 0
    end

    price_to = params[:price_to].to_i
    if price_to < 0
      price_to = 0
    end

    events = Event.arel_table
    booking = Booking.arel_table

    rate = Arel::Nodes::NamedFunction.new('COALESCE', [booking[:rate], 0])

    min = Arel::Nodes::NamedFunction.new('MIN', [rate], 'min')
    max = Arel::Nodes::NamedFunction.new('MAX', [rate], 'max')

    query = events
                .project(events[Arel.star])
                .join(booking, Arel::Nodes::OuterJoin)
                .on(events[:id].eq booking[:event_id])
                .group(events[:id])
                .where(booking[:dj_id].eq Arel::Nodes::Quoted.new(current_user.dj[:id]))
                .where(rate.gteq(price_from))
                .where(rate.lteq(price_to))

    query.where(events[:title].matches("%#{ params[:title] }%")) if params[:title].present?

    if params[:tid].present?

      type_ids = params[:tid]
      if type_ids.count > 0
        type_ids.map!{ |s| Arel::Nodes::Quoted.new(s.to_i) }
        query.where(events[:event_category_id].in(type_ids))
      end
    end

    if params[:gid].present?

      genres_ids = params[:gid]
      if genres_ids.count > 0
        genres_ids.map!{ |s| Arel::Nodes::Quoted.new(s.to_i) }

        events_genre = Arel::Table.new(:events_genres)

        query.join(events_genre, Arel::Nodes::OuterJoin)
        query.on(events[:id].eq events_genre[:event_id])
        query.where(events_genre[:genre_id].in(genres_ids))

      end
    end

    if params[:sort_column].present? && %w(asc desc).include?(params[:sort_type])
      query = query.order(events[params[:sort_column.to_sym]].send(params[:sort_type].to_sym))
    else
      query = query.order(events[:created_at].desc)
    end

    count_query = query.clone.project('COUNT(*)')


    @events = Event.find_by_sql(query.take(@per_page).skip((@page - 1) * @per_page).to_sql)
    @count = Event.find_by_sql(count_query.to_sql).count

    @genres = Genre.all
    @event_types = EventCategory.all

    query_rate_min_max = events
                             .project(min)
                             .project(max)
                             .join(booking, Arel::Nodes::OuterJoin)
                             .on(events[:id].eq booking[:event_id])
                             .where(booking[:dj_id].eq(current_user.dj[:id]))

    @rate_minmax = Booking.find_by_sql(query_rate_min_max.to_sql).first;

  end

  def show
    @event = Event.find params[:id]
    booking = Booking.where(dj_id: current_user.dj[:id], event_id: params[:id])
    render json: { }, status: :not_found and return if booking.count == 0
    @booking = booking.first
  end

end