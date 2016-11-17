class EventCategoriesController < ApplicationController

  load_and_authorize_resource :event_category

  def index
    event_categories = EventCategory.arel_table

    query = event_categories
            .project(Arel.star)
            .group(event_categories[:id])

    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
        query = query.order(event_categories[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
        query = query.order(event_categories[:id].desc)
    end

    count_query = query.clone.project('COUNT(*)')

    @event_categories = EventCategory.find_by_sql(query.take(10).skip((params[:page].to_i - 1) * 10).to_sql)
    @count = EventCategory.find_by_sql(count_query.to_sql).count
  end

    def create
    @event_category = EventCategory.new event_category_params

    if @event_category.save
      render json: { message: I18n.t('event_category.messages.success_upsert') }
    else
      render json: {errors: @event_category.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
    def update
    if @event_category.update_attributes event_category_params
      render json: { message: I18n.t('event_category.messages.success_upsert') }
    else
      render json: { errors: @event_category.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @event_category.destroy
    render json: {ok: true}
  end

  def show

  end

  # related models actions

  private 

  def event_category_params
    params.require(:event_category).permit!
  end

end