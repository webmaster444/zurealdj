class SessionsController < ApplicationController

  skip_before_action :authenticate_user, only: [:create, :check, :facebook, :destroy]

  def destroy
    sign_out
    render nothing: true
  end

  def create
    sleep 1
    @user = User.find_by_email params[:email]

    if @user && !@user.confirmed?
      render json: { errors: ['You are not confirm your email.'] }, status: :unprocessable_entity and return
    end

    if @user && @user.authenticate(params[:password])
      sign_in @user
      render json: { session_token: current_session.token, redirect_url: current_user.role.name }
    else
      render json: { errors: ['Wrong email/password combination.'] }, status: :unprocessable_entity
    end
  end

  def check
    if current_user
      render json: { current_user: { email: current_user.email, role: current_user.role.name }}
    else
      render nothing: true, status: :unauthorized
    end
  end

  def facebook
    begin
      fb_user = FbGraph2::User.me(params[:access_token]).fetch(fields: [:name, :email, :first_name, :last_name, :picture])
    rescue Exception => e
      render json: {errors: [e.message]}, status: 422 and return
    end

    @user = User.find_by_facebook_id fb_user.id
    if @user
      sign_in @user
      render json: { session_token: current_session.token, redirect_url: current_user.role.name }
    else
      render json: {errors: ['You need to register first.']}, status: :unprocessable_entity
    end
  end
end