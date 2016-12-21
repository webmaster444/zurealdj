class UserMailer  < ActionMailer::Base

  def password_reset(user_id)
    @user = User.find(user_id)
    mail(from: sender.user_name, to: @user.email, subject: 'ZurealDJ reset password instructions.')
  end

  def email_confirmation(user_id)
    @user = User.find(user_id)
    mail(to: @user.email, from: sender.user_name, subject: 'Email confirmation instructions.')
  end

  private

  def sender
    @sender ||= EmailSender.first_or_create
  end
end
