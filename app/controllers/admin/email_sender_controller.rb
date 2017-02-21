class Admin::EmailSenderController  < ApplicationController

  skip_before_action :authenticate_user
  load_and_authorize_resource :email_sender

  def update
    @email_sender = EmailSender.first_or_create
    if @email_sender.update_attributes email_sender_params
      render json: { message: "Settings updated." }
    else
      render json: { validation_errors: @email_sender.errors }, status: :unprocessable_entity
    end
  end

  def show
    @sender = EmailSender.first_or_create
  end

  def create
    @sender = EmailSender.first_or_create
    @sender.update_attributes sender_params

    render json: {message: 'Email sender successfully updated.'}
  end

  private

  def sender_params
    params.permit(:address, :port, :domain, :authentication, :user_name, :password, :enable_starttls_auto)
  end

  def email_sender_params
    params.require(:email_sender).permit :address, :port, :domain, :authentication, :user_name, :password, :enable_starttls_auto
  end

end