class Organizer::EventsController < ApplicationController

  load_and_authorize_resource :event

  def index
    events = Event.arel_table

    query = events
            .project(Arel.star)
            .group(events[:id])

    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
        query = query.order(events[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
        query = query.order(events[:id].desc)
    end

    count_query = query.clone.project('COUNT(*)')

    @events = Event.find_by_sql(query.take(10).skip((params[:page].to_i - 1) * 10).to_sql)
    @count = Event.find_by_sql(count_query.to_sql).count
  end

  def show

  end

  def create
    @event = Event.new event_params

    if @event.save
      render json: { message: I18n.t('event.messages.success_upsert') }
    else
      render json: { validation_errors: @event.errors }, status: :unprocessable_entity
    end
  end

  private 

  def event_params
    params.require(:event).permit :image, :title, :country_flag_code, :city, :end_date, :start_date
  end

end