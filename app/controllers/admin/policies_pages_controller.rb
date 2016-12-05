class Admin::PoliciesPagesController < Admin::BaseController

  load_and_authorize_resource :policies_page

  def index

  end

  def show
    @article = PoliciesPage.where(country_flag_code: params[:id]).first_or_create
  end

  def update
    @article = PoliciesPage.where(country_flag_code: params[:id]).first_or_create

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