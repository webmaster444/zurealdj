class Admin::HelpCenterPagesController < ApplicationController

def update
    @article = HelpCenterPage.first_or_create

    if @article.update_attributes help_center_page_params
      render json: {message: 'Help Center page notice updated.'}
    else
      render json: {errors: @article.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def index
    @article = HelpCenterPage.first_or_create
  end

  # related models actions

  private 

    def help_center_page_params
      params.require(:help_center_page).permit!
    end

end