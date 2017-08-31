class Dj::EventCategoriesController < Dj::BaseController

  skip_before_action :not_finished_profile

  def index
    @event_types = EventCategory.all
  end
end