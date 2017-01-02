class Admin::GenresController < ApplicationController

  load_and_authorize_resource :genre

  def index
    page = params[:page].to_i
    page = 1 if page < 1

    per_page = params[:per_page].to_i
    per_page = 10 if per_page < 1

    respond_to do |f|
      f.json do
        query = Genre.search_query(params)
        count_query = query.clone.project('COUNT(*)')

        @genres = Genre.find_by_sql(query.take(per_page).skip((page - 1) * per_page).to_sql)
        @count = Genre.find_by_sql(count_query.to_sql).count
      end

      f.csv do
        headers["Content-Type"]        = "text/csv"
        headers["Content-disposition"] = "attachment; filename=genres.csv"
        headers['Last-Modified']       = Time.now.ctime.to_s
        # headers['X-Accel-Buffering'] = 'no'
        # headers["Cache-Control"] ||= "no-cache"
        # headers["Content-Transfer-Encoding"] = "binary"

        self.response_body = GenresStreamer.new(params)
      end
    end
  end

    def create
    @genre = Genre.new genre_params

    if @genre.save
      render json: { message: I18n.t('genre.messages.success_upsert') }
    else
      render json: {errors: @genre.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
    def update
    if @genre.update_attributes genre_params
      render json: { message: I18n.t('genre.messages.success_upsert') }
    else
      render json: { errors: @genre.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @genre.destroy
    render json: {ok: true}
  end

  def show

  end

  # related models actions

  private 

  def genre_params
    params.require(:genre).permit!
  end

end