class Dj::EquipmentsController < Dj::BaseController

  skip_before_action :not_finished_profile

  def index
    @equipments = Equipment.all
  end
end