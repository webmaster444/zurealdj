class TermsNConditionsPagesController < ApplicationController

  load_and_authorize_resource :terms_n_conditions_page

  def index
    terms_n_conditions_pages = TermsNConditionsPage.arel_table

    query = terms_n_conditions_pages
            .project(Arel.star)
            .group(terms_n_conditions_pages[:id])

    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
        query = query.order(terms_n_conditions_pages[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
        query = query.order(terms_n_conditions_pages[:id].desc)
    end

    count_query = query.clone.project('COUNT(*)')

    @terms_n_conditions_pages = TermsNConditionsPage.find_by_sql(query.take(10).skip((params[:page].to_i - 1) * 10).to_sql)
    @count = TermsNConditionsPage.find_by_sql(count_query.to_sql).count
  end

    def create
    @terms_n_conditions_page = TermsNConditionsPage.new terms_n_conditions_page_params

    if @terms_n_conditions_page.save
      render json: { message: I18n.t('terms_n_conditions_page.messages.success_upsert') }
    else
      render json: {errors: @terms_n_conditions_page.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
    def update
    if @terms_n_conditions_page.update_attributes terms_n_conditions_page_params
      render json: { message: I18n.t('terms_n_conditions_page.messages.success_upsert') }
    else
      render json: { errors: @terms_n_conditions_page.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @terms_n_conditions_page.destroy
    render json: {ok: true}
  end

  def show

  end

  # related models actions

  private 

  def terms_n_conditions_page_params
    params.require(:terms_n_conditions_page).permit!
  end

end