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
        step: current_user.next_step.gsub('dj_', '')
    }, status: 405 and return unless current_user.dj_completed?
  end
end