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
end