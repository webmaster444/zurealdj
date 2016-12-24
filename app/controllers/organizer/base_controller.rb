class Organizer::BaseController < ApplicationController

  before_action :not_organizer
  before_action :not_finished_profile

  private

  def not_organizer
    render json: {errors: ['You are not organizer.']}, status: 401 and return unless current_user.organizer?
  end

  def not_finished_profile
    render json:{
        errors: ['Profile not finished.'],
        step: current_user.next_step.gsub('organizer_', '')
    }, status: 405 and return unless current_user.organizer_completed?
  end
end