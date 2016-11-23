ActionMailer::Base.perform_deliveries = true
ActionMailer::Base.raise_delivery_errors = true
ActionMailer::Base.default :charset => "utf-8"
ActionMailer::Base.default_url_options = { :host => "localhost:3000" }

begin
  @settings = EmailSender.first_or_create

  # ActionMailer::Base.smtp_settings = {
  #     :address => "smtp.gmail.com",
  #     :port => 587,
  #     :domain => "example.com",
  #     :authentication => "plain",
  #     :user_name =>  ENV['GMAIL_USERNAME'],
  #     :password => ENV['GMAIL_PASSWORD'],
  #     :enable_starttls_auto => true
  # }

  ActionMailer::Base.smtp_settings = {
    :address => @settings.address,
    :port => @settings.port,
    :domain => @settings.domain,
    :authentication => @settings.authentication,
    :user_name => @settings.user_name,
    :password => @settings.password,
    :enable_starttls_auto => @settings.enable_starttls_auto
  }
rescue
end
