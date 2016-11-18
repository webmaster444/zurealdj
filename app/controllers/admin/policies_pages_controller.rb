class PoliciesPagesController < ApplicationController

  load_and_authorize_resource :policies_page

  def index
    policies_pages = PoliciesPage.arel_table

    query = policies_pages
            .project(Arel.star)
            .group(policies_pages[:id])

    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
        query = query.order(policies_pages[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
        query = query.order(policies_pages[:id].desc)
    end

    count_query = query.clone.project('COUNT(*)')

    @policies_pages = PoliciesPage.find_by_sql(query.take(10).skip((params[:page].to_i - 1) * 10).to_sql)
    @count = PoliciesPage.find_by_sql(count_query.to_sql).count
  end

    def create
    @policies_page = PoliciesPage.new policies_page_params

    if @policies_page.save
      render json: { message: I18n.t('policies_page.messages.success_upsert') }
    else
      render json: {errors: @policies_page.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
    def update
    if @policies_page.update_attributes policies_page_params
      render json: { message: I18n.t('policies_page.messages.success_upsert') }
    else
      render json: { errors: @policies_page.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @policies_page.destroy
    render json: {ok: true}
  end

  def show

  end

  # related models actions

  private 

  def policies_page_params
    params.require(:policies_page).permit!
  end

end