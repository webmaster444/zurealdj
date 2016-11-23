class Admin::EmailSenderController  < ApplicationController

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
    @email_sender = EmailSender.first_or_create
    render json: {"email_sender":@email_sender}
  end

  private 

  def email_sender_params
    params.require(:email_sender).permit :address, :port, :domain, :authentication, :user_name, :password, :enable_starttls_auto
  end

end