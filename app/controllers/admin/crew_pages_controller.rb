class Admin::CrewPagesController < ApplicationController

  def show
    @article = CrewPage.first_or_create
  end

  def update
    @article = CrewPage.first_or_create

    if @article.update_attributes crew_page_params
      render json: {message: 'Crew page notice updated.'}
    else
      render json: {errors: @article.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private

  def crew_page_params
    params.require(:crew_page).permit :content
  end

end