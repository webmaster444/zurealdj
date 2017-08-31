json.email_sender do
  json.address @sender.address
  json.port @sender.port
  json.domain @sender.domain
  json.authentication @sender.authentication
  json.user_name @sender.user_name
  json.enable_starttls_auto @sender.enable_starttls_auto
end