class UserMailer  < ActionMailer::Base

  def password_reset(user_id)
    @user = User.find(user_id)
    mail(from: sender.user_name, to: @user.email, subject: 'ZurealDJ reset password instructions.') #,  template_path: @user.admin? ? 'admin/user_mailer': 'user_mailer')
  end

  private

  def sender
    @sender = EmailSender.first_or_create
  end
end
