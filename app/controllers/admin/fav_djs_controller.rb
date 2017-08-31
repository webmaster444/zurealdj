class Admin::FavDjsController < ApplicationController

  load_and_authorize_resource :fav_dj

  def index
    page = params[:page].to_i
    page = 1 if page < 1

    per_page = params[:per_page].to_i
    per_page = 10 if per_page < 1

    respond_to do |f|
      f.json do
        query = FavDj.search_query(params)
        count_query = query.clone.project('COUNT(*)')

        @count = FavDj.find_by_sql(count_query.to_sql).count

        @fav_djs = FavDj.joins(:user).order('users.name asc')
                        .find_by_sql(query.take(per_page).skip((page - 1) * per_page))

      end

      f.csv do
        headers["Content-Type"]        = "text/csv"
        headers["Content-disposition"] = "attachment; filename=fav_djs.csv"
        headers['Last-Modified']       = Time.now.ctime.to_s

        self.response_body = FavDjsStreamer.new(params)
      end
    end
  end

  def create
    @fav_dj = FavDj.new fav_dj_params

    if @fav_dj.save
      render json: { message: I18n.t('fav_dj.messages.success_upsert') }
    else
      render json: {errors: @fav_dj.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def update
    if @fav_dj.update_attributes fav_dj_params
      render json: { message: I18n.t('fav_dj.messages.success_upsert') }
    else
      render json: { errors: @fav_dj.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @fav_dj.destroy
    render json: {ok: true}
  end

  def show
    
  end

  # related models actions

  private 

  def fav_dj_params
    params.require(:fav_dj).permit!
  end

end