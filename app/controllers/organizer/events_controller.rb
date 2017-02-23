class Organizer::EventsController < ApplicationController

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
            .where(events[:organizer_id].eq current_user.organizer[:id])

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
      render json: { validation_errors: @event.errors }, status: :unprocessable_entity
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

    allowed_params
  end
end