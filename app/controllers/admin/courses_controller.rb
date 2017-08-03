class Admin::CoursesController < ApplicationController

  load_and_authorize_resource :course

  def index
    page = params[:page].to_i
    page = 1 if page < 1

    per_page = params[:per_page].to_i
    per_page = 10 if per_page < 1

    respond_to do |f|
      f.json do
        query = Course.search_query(params)
        count_query = query.clone.project('COUNT(*)')

        @courses = Course.find_by_sql(query.take(per_page).skip((page - 1) * per_page).to_sql)
        @count = Course.find_by_sql(count_query.to_sql).count
      end

      f.csv do
        headers["Content-Type"]        = "text/csv"
        headers["Content-disposition"] = "attachment; filename=courses.csv"
        headers['Last-Modified']       = Time.now.ctime.to_s

        self.response_body = CoursesStreamer.new(params)
      end
    end
  end

  def create
    @course = Course.new course_params

    if @course.save
      render json: { message: I18n.t('course.messages.success_upsert') }
    else
      render json: {errors: @course.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def update
    if @course.update_attributes course_params
      render json: { message: I18n.t('course.messages.success_upsert') }
    else
      render json: { errors: @course.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @course.destroy
    render json: {ok: true}
  end

  def show

  end

  # related models actions

  private 

  def course_params
    params.require(:course).permit!
  end

end