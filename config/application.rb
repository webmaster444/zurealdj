require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Zurealdj
  class Application < Rails::Application
      config.i18n.enforce_available_locales = false
      config.i18n.available_locales = [:en]
      config.i18n.default_locale = :en
      config.autoload_paths += %W( #{config.root}/app/workers )
      config.assets.paths << Rails.root.join("node_modules")

      config.action_cable.allowed_request_origins = [/.*/]
  end
end
