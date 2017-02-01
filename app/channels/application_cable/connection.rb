module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      reject_unauthorized_connection unless current_user
      logger.add_tags 'ActionCable', current_user.email
    end

    protected

    def find_verified_user
      self.event = 'derevo'
      if current_user
        current_user
      else
        reject_unauthorized_connection
      end
    end

    private

    def current_user
      @current_user ||= current_session.user if current_session
      @current_user = nil unless @current_user.try(:confirmed?)
      @current_user
    end

    def current_session
      @current_session ||= Session.find_by_token([cookies[:session_token]].compact)
    end
  end
end
