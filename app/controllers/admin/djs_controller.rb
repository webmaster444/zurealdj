class DjsController < ApplicationController

  load_and_authorize_resource :dj

  def index
    djs = Dj.arel_table

    query = djs
            .project(Arel.star)
            .group(djs[:id])

    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
        query = query.order(djs[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
        query = query.order(djs[:id].desc)
    end

    count_query = query.clone.project('COUNT(*)')

    @djs = Dj.find_by_sql(query.take(10).skip((params[:page].to_i - 1) * 10).to_sql)
    @count = Dj.find_by_sql(count_query.to_sql).count
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

  end

  # related models actions

  private 

  def dj_params
    params.require(:dj).permit!
  end

end