class ApplicationController < ActionController::Base

  include ApplicationHelper
  include SessionsHelper

  before_filter :set_locale
  before_filter :authenticate_user

  protect_from_forgery with: :exception

  rescue_from Exception, with: :catch_exceptions

  def authenticate_user
    if current_user
      if Time.now - current_session.updated_at > 3.hours
        current_session.destroy
        respond_with_errors
      else
        current_session.update_attribute :updated_at, Time.now
      end
    else
      respond_with_errors
    end
  end

  private

  def respond_with_errors
    render json: {error: 'Access Denied !' }, status: :unauthorized and return
  end

  def catch_exceptions(e)

    if e.kind_of? CanCan::AccessDenied
      authenticate_user
    end

    # ErrorMessage.create(
    #     class_name: e.class,
    #     message: e.message,
    #     trace: e.backtrace.join("\n"),
    #     params: params,
    #     headers: request.headers,
    #     cookies: cookies.to_json,
    #     user_agent: request.user_agent,
    #     request: request.inspect
    # )

    raise
  end

  def set_locale
    locale = params[:locale] || cookies[:locale ] || 'en'
    locale = 'en' unless ['en'].include?(locale)
    I18n.locale = locale
    cookies.permanent[:locale] = I18n.locale
  end

  def default_url_options(options={})
    { locale: I18n.locale }
  end
end
