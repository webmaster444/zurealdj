require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Zurealdj
  class Application < Rails::Application
      Rails.application.config.assets.precompile += %w( icheck/square/blue.png )
      Rails.application.config.assets.precompile += %w( icheck/square/blue@2x.png )
      Rails.application.config.assets.precompile += %w( icheck/square/green.png )
      Rails.application.config.assets.precompile += %w( icheck/square/green@2x.png )

      config.i18n.enforce_available_locales = false
      config.i18n.available_locales = [:en, :ua]
      config.i18n.default_locale = :ua
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
  end
end
