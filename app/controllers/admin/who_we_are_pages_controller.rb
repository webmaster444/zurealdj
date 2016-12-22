class Admin::WhoWeArePagesController < ApplicationController

  def index

  end

  def show
    @article = WhoWeArePage.where(country_flag_code: params[:id]).first_or_create
  end

  def update
    @article = WhoWeArePage.where(country_flag_code: params[:id]).first_or_create

    if @article.update_attributes who_we_are_page_params
      render json: {message: 'Who We Are page notice updated.'}
    else
      render json: {errors: @article.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private

  def who_we_are_page_params
    params.require(:who_we_are_page).permit :content
  end

end