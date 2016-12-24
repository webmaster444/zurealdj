class Dj::BaseController < ApplicationController

  before_action :not_dj
  before_action :not_finished_profile

  private

  def not_dj
    render json: {errors: ['You are not dj.']}, status: 401 and return unless current_user.dj?
  end

  def not_finished_profile
    puts "==========="
    puts current_user.step
    puts "==========="
    render json:{
        errors: ['Profile not finished.'],
        step: User.steps.key(User.steps[current_user.step] + 1)
    }, status: 405 and return unless current_user.completed?
  end
end