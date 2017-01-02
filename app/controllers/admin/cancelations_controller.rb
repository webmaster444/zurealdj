class Admin::CancelationsController < ApplicationController

  load_and_authorize_resource :cancelation

  def index
    page = params[:page].to_i
    page = 1 if page < 1

    per_page = params[:per_page].to_i
    per_page = 10 if per_page < 1

    respond_to do |f|
      f.json do
        query = Cancelation.search_query(params)
        count_query = query.clone.project('COUNT(*)')

        @cancelations = Cancelation.find_by_sql(query.take(per_page).skip((page - 1) * per_page).to_sql)
        @count = Cancelation.find_by_sql(count_query.to_sql).count
      end

      f.csv do
        headers["Content-Type"]        = "text/csv"
        headers["Content-disposition"] = "attachment; filename=cancelations.csv"
        headers['Last-Modified']       = Time.now.ctime.to_s
        # headers['X-Accel-Buffering'] = 'no'
        # headers["Cache-Control"] ||= "no-cache"
        # headers["Content-Transfer-Encoding"] = "binary"

        self.response_body = CancelationsStreamer.new(params)
      end
    end
  end

    def create
    @cancelation = Cancelation.new cancelation_params

    if @cancelation.save
      render json: { message: I18n.t('cancelation.messages.success_upsert') }
    else
      render json: {errors: @cancelation.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
    def update
    if @cancelation.update_attributes cancelation_params
      render json: { message: I18n.t('cancelation.messages.success_upsert') }
    else
      render json: { errors: @cancelation.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @cancelation.destroy
    render json: {ok: true}
  end

  def show

  end

  # related models actions

  private 

  def cancelation_params
    params.require(:cancelation).permit!
  end

end