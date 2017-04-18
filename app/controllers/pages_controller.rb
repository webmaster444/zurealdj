class PagesController < ApplicationController
  skip_before_action :authenticate_user

  def index
    render layout: 'landing'
  end

  def admin
    render layout: 'admin'
  end

  def dj
    render layout: 'dj'
  end

  def organizer
    render layout: 'organizer'
  end

  def url
    if !current_user.nil?
      if current_user.organizer?
        redirect_to "/organizer#/djs/#{params[:url]}"
      else
        redirect_to action: "dj"
      end
    else
      redirect_to action: "index"
    end
  end
end