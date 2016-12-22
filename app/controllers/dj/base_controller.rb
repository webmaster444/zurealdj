class Dj::BaseController < ApplicationController

  before_action :not_dj
  before_action :not_finished_profile

  private

  def not_dj
    render json: {errors: ['You are not dj.']}, status: 401 and return unless current_user.dj?
  end

  def not_finished_profile
    render json:{
        errors: ['Profile not finished.'],
        step: current_user.step
    }, status: 405 and return if current_user.step != 'completed'
  end
end