class Admin::TermsNConditionsPagesController < ApplicationController

  def update
    @article = TermsNConditionsPage.first_or_create

    if @article.update_attributes terms_n_conditions_page_params
      render json: {message: 'Terms n conditions page notice updated.'}
    else
      render json: {errors: @article.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def show
    @article = TermsNConditionsPage.first_or_create
  end

  # related models actions

  private 

    def terms_n_conditions_page_params
      params.require(:terms_n_conditions_page).permit!
    end

end