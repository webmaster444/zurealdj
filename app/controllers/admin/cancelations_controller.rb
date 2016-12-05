class Admin::CancelationsController < ApplicationController

  load_and_authorize_resource :cancelation

  def index
    cancelations = Cancelation.arel_table

    query = cancelations
            .project(Arel.star)
            .group(cancelations[:id])

    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
        query = query.order(cancelations[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
        query = query.order(cancelations[:id].desc)
    end

    count_query = query.clone.project('COUNT(*)')

    @cancelations = Cancelation.find_by_sql(query.take(10).skip((params[:page].to_i - 1) * 10).to_sql)
    @count = Cancelation.find_by_sql(count_query.to_sql).count
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