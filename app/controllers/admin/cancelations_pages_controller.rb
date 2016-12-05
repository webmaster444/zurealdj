class Admin::CancelationsPagesController < ApplicationController

  load_and_authorize_resource :cancelations_page

  def index
    cancelations_pages = CancelationsPage.arel_table

    query = cancelations_pages
            .project(Arel.star)
            .group(cancelations_pages[:id])

    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
        query = query.order(cancelations_pages[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
        query = query.order(cancelations_pages[:id].desc)
    end

    count_query = query.clone.project('COUNT(*)')

    @cancelations_pages = CancelationsPage.find_by_sql(query.take(10).skip((params[:page].to_i - 1) * 10).to_sql)
    @count = CancelationsPage.find_by_sql(count_query.to_sql).count
  end

    def create
    @cancelations_page = CancelationsPage.new cancelations_page_params

    if @cancelations_page.save
      render json: { message: I18n.t('cancelations_page.messages.success_upsert') }
    else
      render json: {errors: @cancelations_page.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
    def update
    if @cancelations_page.update_attributes cancelations_page_params
      render json: { message: I18n.t('cancelations_page.messages.success_upsert') }
    else
      render json: { errors: @cancelations_page.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @cancelations_page.destroy
    render json: {ok: true}
  end

  def show

  end

  # related models actions

  private 

  def cancelations_page_params
    params.require(:cancelations_page).permit!
  end

end