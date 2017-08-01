class InstagramController < ApplicationController
  before_action :set_default_response_format
  skip_before_action :authenticate_user

  def index
    @images = Instagram.user_recent_media(:count => 8)
  end

  protected
  def set_default_response_format
    request.format = :json
  end

end
