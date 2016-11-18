class HowWeWorkPagesController < ApplicationController

  load_and_authorize_resource :how_we_work_page

  def index
    how_we_work_pages = HowWeWorkPage.arel_table

    query = how_we_work_pages
            .project(Arel.star)
            .group(how_we_work_pages[:id])

    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
        query = query.order(how_we_work_pages[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
        query = query.order(how_we_work_pages[:id].desc)
    end

    count_query = query.clone.project('COUNT(*)')

    @how_we_work_pages = HowWeWorkPage.find_by_sql(query.take(10).skip((params[:page].to_i - 1) * 10).to_sql)
    @count = HowWeWorkPage.find_by_sql(count_query.to_sql).count
  end

    def create
    @how_we_work_page = HowWeWorkPage.new how_we_work_page_params

    if @how_we_work_page.save
      render json: { message: I18n.t('how_we_work_page.messages.success_upsert') }
    else
      render json: {errors: @how_we_work_page.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
    def update
    if @how_we_work_page.update_attributes how_we_work_page_params
      render json: { message: I18n.t('how_we_work_page.messages.success_upsert') }
    else
      render json: { errors: @how_we_work_page.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @how_we_work_page.destroy
    render json: {ok: true}
  end

  def show

  end

  # related models actions

  private 

  def how_we_work_page_params
    params.require(:how_we_work_page).permit!
  end

end