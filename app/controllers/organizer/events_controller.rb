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
    render json: {  }, status: :not_found if current_user.organizer.events.exclude?(@event)
  end

  def create
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
    params.require(:event).permit :image, :title, :country_flag_code, :city, :end_date, :start_date
  end

end