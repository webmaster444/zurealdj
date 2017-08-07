class FavDjsController < ApplicationController
  before_action :set_default_response_format
  skip_before_action :authenticate_user
  def index
    respond_to do |f|
      f.json do
        @fav_djs = FavDj.joins(:user).order('users.name asc')
      end

      f.csv do
        headers["Content-Type"]        = "text/csv"
        headers["Content-disposition"] = "attachment; filename=fav_djs.csv"
        headers['Last-Modified']       = Time.now.ctime.to_s

        self.response_body = FavDjsStreamer.new(params)
      end
    end
  end

  protected
    def set_default_response_format
      request.format = :json
    end

end