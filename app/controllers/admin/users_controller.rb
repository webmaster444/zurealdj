class Admin::UsersController < Admin::BaseController

  def profile
    @user = current_user
  end

  def update
    @user = current_user

    if @user.authenticate(params[:current_password])
      @user.assign_attributes update_params

      if @user.save
        render json: { message: I18n.t('profile.messages.profile_updated') }
      else
        render json: { validation_errors: @user.errors }, status: :unprocessable_entity
      end
    else
      render json: { validation_errors: { current_password: [I18n.t('profile.messages.wrong_current_password')] } }, status: :unprocessable_entity
    end
  end

  private

  def update_params
    params.require(:user).permit(:password, :password_confirmation)
  end
end