class StaticPagesController < ApplicationController

  skip_before_action :authenticate_user

  def terms_n_conditions
    @page = TermsNConditionsPage.first_or_create
    render json: {page: @page.content}
  end
end