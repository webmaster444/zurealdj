require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Zurealdj
  class Application < Rails::Application
      config.i18n.enforce_available_locales = false
      config.i18n.available_locales = [:en, :ua]
      config.i18n.default_locale = :ua

      config.assets.paths << Rails.root.join("node_modules")
  end
end
