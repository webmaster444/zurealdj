class Admin::HowWeWorkPagesController < ApplicationController

  def show
    @article = HowWeWorkPage.first_or_create
  end

  def update
    @article = HowWeWorkPage.first_or_create

    if @article.update_attributes how_we_work_page_params
      render json: {message: 'How We Work page notice updated.'}
    else
      render json: {errors: @article.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private

  def how_we_work_page_params
    params.require(:how_we_work_page).permit :content
  end

end