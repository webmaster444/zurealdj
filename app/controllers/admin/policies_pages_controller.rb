class Admin::PoliciesPagesController < Admin::BaseController

  def index

  end

  def show
    @article = PoliciesPage.find_by_country_flag_code params[:id]
  end

  def update
    @article = PoliciesPage.find_by_country_flag_code params[:id]

    if @article.update_attributes policies_page_params
      render json: {message: 'Policies page notice updated.'}
    else
      render json: {errors: @article.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private

  def policies_page_params
    params.require(:policies_page).permit :content
  end

end