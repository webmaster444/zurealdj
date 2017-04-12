class UserMailer  < ActionMailer::Base

  def password_reset(user_id)
    @user = User.find(user_id)
    mail(from: sender.user_name, to: @user.email, subject: 'ZurealDJ reset password instructions.')
  end

  def email_confirmation(user_id)
    @user = User.find(user_id)
    @hostname = ENV['HOST_NAME']
    puts("------------------------------")
    puts(@hostname.inspect)
    mail(to: @user.email, from: sender.user_name, subject: 'Email confirmation instructions.')
  end

  def user_notify(data)

    @user = User.find(data.to_user)
    @message = case data.notification_type
                 when  "whenbooking_requested"
                   "New booking request"
                 when  "event_canceled"
                   "Event was cancelled"
                 when  "rated"
                   "You was rated"
                 when  "booking_confirmed"
                   "Dj confirmed participaton"
                 when  "booking_cancelled"
                   "Dj rejected participation"
                 when  "event_modified"
                   "Changes in event"
                 when  "event_deleted"
                   "Event '#{data.message}' was cancelled"
              else
                   "You have new notification on ZuRealDj"
               end

    @path = "#{root_url}#{@user.role.name}#/notifications"
    mail(to: @user.email, from: sender.user_name, subject: 'New notification from ZuRealDj')

  end

  private

  def sender
    @sender ||= EmailSender.first_or_create
  end
end
