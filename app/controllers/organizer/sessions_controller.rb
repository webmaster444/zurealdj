class Organizer::SessionsController < Organizer::BaseController

  def check
    render json: current_user.to_json
  end
end