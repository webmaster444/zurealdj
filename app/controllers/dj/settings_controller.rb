class Dj::SettingsController < Dj::BaseController

  def index
    @user = current_user
  end

  def update
    @user = current_user

    current_password_encrypted = Digest::SHA2.hexdigest("#{ params[:current_password] }--#{@user.salt}") if params[:current_password]

    if params[:current_password] && @user.encrypted_password != current_password_encrypted
      render json: { errors: [ I18n.t('settings.messages.wrong_current_password') ] }, status: :unprocessable_entity
    else

      @user.assign_attributes setting_params

      if @user.save
        render json: { message: I18n.t('settings.messages.settings_updated') }
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  def notifications
    @user = current_user

    @user.assign_attributes params.permit :notifications
    if @user.save
      render json: { message: I18n.t('settings.messages.settings_updated') }
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

    def setting_params
      params.permit :email, :personal_url, :password, :password_confirmation
    end
end