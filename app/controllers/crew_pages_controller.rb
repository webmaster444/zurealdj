class CrewPagesController < ApplicationController

  load_and_authorize_resource :crew_page

  def index
    crew_pages = CrewPage.arel_table

    query = crew_pages
            .project(Arel.star)
            .group(crew_pages[:id])

    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
        query = query.order(crew_pages[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
        query = query.order(crew_pages[:id].desc)
    end

    count_query = query.clone.project('COUNT(*)')

    @crew_pages = CrewPage.find_by_sql(query.take(10).skip((params[:page].to_i - 1) * 10).to_sql)
    @count = CrewPage.find_by_sql(count_query.to_sql).count
  end

    def create
    @crew_page = CrewPage.new crew_page_params

    if @crew_page.save
      render json: { message: I18n.t('crew_page.messages.success_upsert') }
    else
      render json: {errors: @crew_page.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
    def update
    if @crew_page.update_attributes crew_page_params
      render json: { message: I18n.t('crew_page.messages.success_upsert') }
    else
      render json: { errors: @crew_page.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @crew_page.destroy
    render json: {ok: true}
  end

  def show

  end

  # related models actions

  private 

  def crew_page_params
    params.require(:crew_page).permit!
  end

end