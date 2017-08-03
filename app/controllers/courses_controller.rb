class CoursesController < ApplicationController
  before_action :set_default_response_format
  skip_before_action :authenticate_user

  def index
    @courses = Course.all
  end

  protected
  def set_default_response_format
    request.format = :json
  end

end
