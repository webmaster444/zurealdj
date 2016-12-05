class Admin::WhoWeArePagesController < ApplicationController

  load_and_authorize_resource :who_we_are_page

  def index
    who_we_are_pages = WhoWeArePage.arel_table

    query = who_we_are_pages
            .project(Arel.star)
            .group(who_we_are_pages[:id])

    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
        query = query.order(who_we_are_pages[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
        query = query.order(who_we_are_pages[:id].desc)
    end

    count_query = query.clone.project('COUNT(*)')

    @who_we_are_pages = WhoWeArePage.find_by_sql(query.take(10).skip((params[:page].to_i - 1) * 10).to_sql)
    @count = WhoWeArePage.find_by_sql(count_query.to_sql).count
  end

    def create
    @who_we_are_page = WhoWeArePage.new who_we_are_page_params

    if @who_we_are_page.save
      render json: { message: I18n.t('who_we_are_page.messages.success_upsert') }
    else
      render json: {errors: @who_we_are_page.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
    def update
    if @who_we_are_page.update_attributes who_we_are_page_params
      render json: { message: I18n.t('who_we_are_page.messages.success_upsert') }
    else
      render json: { errors: @who_we_are_page.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @who_we_are_page.destroy
    render json: {ok: true}
  end

  def show

  end

  # related models actions

  private 

  def who_we_are_page_params
    params.require(:who_we_are_page).permit!
  end

end