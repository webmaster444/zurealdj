class Admin::DjsController < Admin::BaseController

  load_and_authorize_resource :dj

  def index

    page = params[:page].to_i
    page = 1 if page < 1

    per_page = params[:per_page].to_i
    per_page = 10 if per_page < 1

    respond_to do |f|
      f.json do
        query = Dj.search_query(params)
        count_query = Dj.search_query(params.merge({count: true}))
        @djs = Dj.find_by_sql(query.take(per_page).skip((page - 1) * per_page).to_sql)
        @count = Dj.find_by_sql(count_query.to_sql).count
      end
      f.csv do
        headers["Content-Type"]        = "text/csv"
        headers["Content-disposition"] = "attachment; filename=djs.csv"
        headers["Last-Modified"]       = Time.now.ctime.to_s
        self.response_body = DjsStreamer.new(params)
        puts self.response_body
      end
    end
  end

    def create
    @dj = Dj.new dj_params

    if @dj.save
      render json: { message: I18n.t('dj.messages.success_upsert') }
    else
      render json: {errors: @dj.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
    def update
    if @dj.update_attributes dj_params
      render json: { message: I18n.t('dj.messages.success_upsert') }
    else
      render json: { errors: @dj.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @dj.destroy
    render json: {ok: true}
  end

  def show
    render json: {ok: true}
  end

  # related models actions

  private 

  def dj_params
    params.require(:dj).permit!
  end

end