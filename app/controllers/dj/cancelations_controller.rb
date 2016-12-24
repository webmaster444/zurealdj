class Dj::CancelationsController < Dj::BaseController

  skip_before_action :not_finished_profile

  def index
    @cancelations = Cancelation.all
  end
end