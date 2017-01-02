class Admin::CancelationsPagesController < ApplicationController
  
  def update
    @article = CancelationsPage.first_or_create

    if @article.update_attributes cancelations_page_params
      render json: {message: 'Cancelation page notice updated.'}
    else
      render json: {errors: @article.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def show
    @article = CancelationsPage.first_or_create
  end

  # related models actions

  private 

    def cancelations_page_params
      params.require(:cancelations_page).permit!
    end

end