class PasswordResetsController < ApplicationController

  skip_before_action :authenticate_user
  layout 'landing'

  def create
    @user = User.find_by_email params[:email]
    if @user
      @user.send_password_reset
      render json: {message: 'Password reset instructions sent!'}
    else
      render json: {errors: ['User with given email not found!']}, status: :unprocessable_entity
    end
  end

  def update
    @user = User.find_by_reset_password_token params[:id]

    if @user
      if @user.update_attributes password: params[:password], password_confirmation: params[:password_confirmation], reset_password_token: nil
        render json: {message: 'Password successfully restored!'}
      else
        render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
      end
    else
      render json: {errors: ['User with given token not found.']}, status: :unprocessable_entity
    end
  end

  def show
    @user = User.find_by_reset_password_token params[:id]

    if @user
      redirect_to root_path + '#/restore_password/' + params[:id]
    else
      flash[:error] = 'User with given token not found.'
      redirect_to root_path
    end
  end
end