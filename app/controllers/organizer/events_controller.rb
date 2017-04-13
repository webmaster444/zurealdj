class Organizer::EventsController < ApplicationController

  load_and_authorize_resource :event

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
                .where(events[:organizer_id].eq Arel::Nodes::Quoted.new(current_user.organizer[:id]))
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
                             .where(events[:organizer_id].eq current_user.organizer[:id])

    @rate_minmax = Booking.find_by_sql(query_rate_min_max.to_sql).first;

  end

  def event_booking_list

    events = Event.arel_table

    query = events
                .project(events[Arel.star])
                .group(events[:id])
                .where(events[:organizer_id].eq Arel::Nodes::Quoted.new(current_user.organizer[:id]))
                .where(events[:end_date].gt(Time.now))

    query.where(events[:title].matches("%#{ params[:title] }%")) if params[:title].present?

    count_query = query.clone.project('COUNT(*)')

    @events = Event.find_by_sql(query.to_sql)
    @count = Event.find_by_sql(count_query.to_sql).count

  end
  def show
    render json: {  }, status: :not_found and return if current_user.organizer.events.exclude?(@event)
  end

  def create
    unless current_user.subscription.try(:org_can_create_event)
      render json: {errors: ['Only subscribed users can create events. Please subscribe.']}, status: :unprocessable_entity and return
    end

    @event = Event.new organizer_id: current_user.organizer[:id]
    @event.assign_attributes event_params

    if @event.save
      render json: { message: I18n.t('event.messages.success_upsert') }
    else
      render json: { validation_errors: @event.errors }, status: :unprocessable_entity
    end
  end

  def update
    @event.assign_attributes event_params

    if @event.save
      render json: { message: I18n.t('event.messages.success_upsert') }
    else
      render json: { validation_errors: @event.errors, errors: @event.errors[:error] }, status: :unprocessable_entity
    end
  end

  def destroy
    if current_user.organizer.events.include?(@event)
      @event.destroy
      render json: {message: 'Event successfully removed.'}
    else
      render json: {  }, status: :not_found
    end
  end

  private 

  def event_params
    allowed_params = params.permit :width, :height, :crop_x, :crop_y, :crop_w, :crop_h, :crop_rotate, :crop_scale_x,
                                  :crop_scale_y, :image, :title, :country_flag_code, :city, :event_category_id, :dj_slots

    start_date = nil

    if params[:start_date].present? && params[:start_time].present?
      start_date = Date.parse(params[:start_date])

      /^(?<hour>.*):(?<minute>.*)\s(?<meridiem>.*)/i =~ params[:start_time]

      start_date = DateTime.new  start_date.year, start_date.month, start_date.day, hour.to_i + (meridiem == 'AM' ? 0 : 12), minute.to_i
    end

    allowed_params[:start_date] = start_date

    end_date = nil
    if params[:end_date].present? && params[:end_time].present?
      end_date = Date.parse(params[:end_date])

      /^(?<hour>.*):(?<minute>.*)\s(?<meridiem>.*)/i =~ params[:end_time]

      end_date = DateTime.new  end_date.year, end_date.month, end_date.day, hour.to_i + (meridiem == 'AM'? 0 : 12), minute.to_i
    end

    allowed_params[:end_date] = end_date

    genres = Array.new
    if params[:genres].present?

      arr = params[:genres]
      arr.map!{ |s| s.to_i }

      genres = Genre.find(arr);

    end

    allowed_params[:genres] = genres

    allowed_params
  end
end