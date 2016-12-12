class Admin::PasswordResetsController < ApplicationController

  skip_before_filter :authenticate_user
  layout 'admin'

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
      if @user.update_attributes password: params[:password], password_confirmation: params[:password_confirmation]
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
      path = @user.admin? ? edit_admin_password_reset_path: edit_password_reset_path
      redirect_to path + '#restore_password', id: params[:id]
    else
      flash[:error] = 'User with given token not found.'
      redirect_to root_path
    end
  end

  def edit
    @user = User.find_by_reset_password_token params[:id]

    if @user

    else
      flash[:error] = 'User with given token not found.'
      redirect_to root_path
    end
  end
end