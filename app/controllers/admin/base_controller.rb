class Admin::BaseController < ApplicationController
  before_action :not_admin

  private

  def not_admin
    render json: {errors: ['You are not admin.']}, status: 401 and return unless current_user.admin?
  end
end