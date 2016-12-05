class Admin::CrewPagesController < ApplicationController

  load_and_authorize_resource :crew_page

  def index

  end

  def show
    @article = CrewPage.where(country_flag_code: params[:id]).first_or_create
  end

  def update
    @article = CrewPage.where(country_flag_code: params[:id]).first_or_create

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