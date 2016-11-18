class GenresController < ApplicationController

  load_and_authorize_resource :genre

  def index
    genres = Genre.arel_table

    query = genres
            .project(Arel.star)
            .group(genres[:id])

    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
        query = query.order(genres[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
        query = query.order(genres[:id].desc)
    end

    count_query = query.clone.project('COUNT(*)')

    @genres = Genre.find_by_sql(query.take(10).skip((params[:page].to_i - 1) * 10).to_sql)
    @count = Genre.find_by_sql(count_query.to_sql).count
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