class Admin::EventCategoriesController < ApplicationController

  load_and_authorize_resource :event_category

  def index
    page = params[:page].to_i
    page = 1 if page < 1

    per_page = params[:per_page].to_i
    per_page = 10 if per_page < 1

    respond_to do |f|
      f.json do
        query = EventCategory.search_query(params)
        count_query = query.clone.project('COUNT(*)')

        @event_categories = EventCategory.find_by_sql(query.take(per_page).skip((page - 1) * per_page).to_sql)
        @count = EventCategory.find_by_sql(count_query.to_sql).count
      end

      f.csv do
        headers["Content-Type"]        = "text/csv"
        headers["Content-disposition"] = "attachment; filename=event_categories.csv"
        headers['Last-Modified']       = Time.now.ctime.to_s
        # headers['X-Accel-Buffering'] = 'no'
        # headers["Cache-Control"] ||= "no-cache"
        # headers["Content-Transfer-Encoding"] = "binary"

        self.response_body = EventCategoriesStreamer.new(params)
      end
    end
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