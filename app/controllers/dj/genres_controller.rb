class Dj::GenresController < Dj::BaseController

  skip_before_action :not_finished_profile

  def index
    @genres = Genre.all
  end
end