class Organizer::GenresController < Organizer::BaseController

  skip_before_action :not_finished_profile

  def index
    @genres = Genre.all.order('title asc')
  end
end