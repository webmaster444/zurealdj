# config/initializers/paperclip.rb
Paperclip::Attachment.default_options.merge!(
  url:                  ':s3_domain_url',
  path:                 ':class/:attachment/:id/:style/:filename',
  storage:              :s3,
  s3_credentials:       Rails.configuration.aws,
  #s3_permissions:       :private,
  # s3_protocol:          'https',
  s3_region:            'ap-southeast-2',
  s3_host_name:         's3-ap-southeast-2.amazonaws.com'
)