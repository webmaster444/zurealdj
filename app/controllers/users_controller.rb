class UsersController < ApplicationController

  skip_before_action :authenticate_user

  def create
    @user = User.new create_params

    if @user.save
      render json: { message: "Thank you for joining, we are excited to be part of your musical journey! Check your email to confirm your account." }
    else
      render json: { validation_errors: @user.errors }, status: :unprocessable_entity
    end
  end

  def update
    @user = current_user

    if @user.authenticate(params[:current_password])
      @user.assign_attributes update_params

      if @user.save
        render json: { message: I18n.t('profile.messages.profile_updated') }
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { errors: [I18n.t('profile.messages.wrong_current_password')] }, status: :unprocessable_entity
    end
  end

  def email_available
    if User.where(email: params[:email].downcase).count > 0
      render nothing: true, status: :unprocessable_entity
    else
      render nothing: true
    end
  end

  def confirm_email
    @user = User.find_by_confirmation_token params[:t]

    if @user
      if @user.new_email.nil?
        @user.update_attributes confirmation_token: nil, confirmed: true
        sign_in @user
        flash[:message] = 'Email confirmed successfully !'
        redirect_to self.send("#{ @user.role.name }_path", anchor: "/event_types_step")
      else
        @user.update_attributes confirmation_token: nil, email: @user.new_email, new_email: nil
        sign_in @user
        flash[:message] = 'New email confirmed successfully !'
        redirect_to self.send("#{ @user.role.name }_path")
      end
    else
      flash[:error] = 'Wrong confirmation token !'
      redirect_to root_path
    end
  end

  def facebook
    begin
      fb_user = FbGraph2::User.me(params[:access_token]).fetch(fields: [:name, :email])
    rescue Exception => e
      render json: {errors: [e.message]}, status: 422 and return
    end

    if @user = User.find_by_email(fb_user.email)
      @user.facebook_id = fb_user.id
      @user.confirmed = true
      @user.save
      sign_in @user
      render json: { session_token: current_session.token, redirect_url: current_user.role.name } and return
    end

    @user = User.find_by_facebook_id fb_user.id
    if @user
      sign_in @user
      render json: { session_token: current_session.token, redirect_url: current_user.role.name } and return
    else
      @user = User.new email: fb_user.email,
                       name: fb_user.name,
                       facebook_id: fb_user.id

      @user.avatar_from_url "https://graph.facebook.com/v2.7/#{fb_user.id}/picture?width=1000"
      @user.role_id = Role.send(params[:user_type]).id if params[:user_type].present? && %(dj organizer).include?(params[:user_type])

      @user.confirmed = true
      if @user.save
        sign_in @user
        render json: { session_token: current_session.token, redirect_url: current_user.role.name }
      else
        render json: { validation_errors: @user.errors }, status: 422
      end
    end
  end

  private

  def create_params
    allowed_params = params.permit(:name, :email, :password, :password_confirmation)
    allowed_params[:password_confirmation] = params[:password] if params[:password].present?
    allowed_params[:role_id] = Role.send(params[:user_type]).id if params[:user_type].present? && %(dj organizer).include?(params[:user_type])
    allowed_params
  end

  def update_params
    params.require(:user).permit(:password, :password_confirmation, :login, :current_password)
  end
end