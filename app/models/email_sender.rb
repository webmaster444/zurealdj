class EmailSender < ActiveRecord::Base
  after_save :update_system_settings

  private

  def update_system_settings
    ActionMailer::Base.smtp_settings = {
        :address => self.address,
        :port => self.port,
        :domain => self.domain,
        :authentication => self.authentication,
        :user_name => self.user_name,
        :password => self.password,
        :enable_starttls_auto => self.enable_starttls_auto
    }
  end
end