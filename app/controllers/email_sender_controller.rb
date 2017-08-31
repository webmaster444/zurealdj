class EmailSenderController < ApplicationController

  def index
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
end