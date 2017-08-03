class Admin::CoursePagesController < ApplicationController

  def update
    @article = CoursePage.first_or_create

    if @article.update_attributes course_page_params
      render json: {message: 'Courses page updated.'}
    else
      render json: {errors: @article.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def index
    @article = CoursePage.first_or_create
  end

  # related models actions

  private 

    def course_page_params
      params.require(:courses_page).permit!
    end

end