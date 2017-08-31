class Admin::ContactUsPagesController < ApplicationController

def update
    @article = ContactUsPage.first_or_create

    if @article.update_attributes contact_us_page_params
      render json: {message: 'Contact us page updated.'}
    else
      render json: {errors: @article.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def index
    @article = ContactUsPage.first_or_create
  end

  # related models actions

  private 

    def contact_us_page_params
      params.require(:contact_us_page).permit!
    end

end