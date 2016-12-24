class Dj::UsersController < Dj::BaseController

  skip_before_filter :not_finished_profile

  def step
    @user = current_user
    allowed_params = step_params.merge({step: User.steps.key(User.steps[@user.step] + 1)})

    if @user.update_attributes allowed_params
      render json: {next_step: User.steps.key(User.steps[@user.step] + 1)}
    else
      render json: {validation_errors: @user.errors}, status: :unprocessable_entity
    end
  end

  def step_back
    @user = current_user
    @user.update_attribute :step, User.steps.key(User.steps[@user.step] - 1)
    render json: { step: User.steps.key(User.steps[@user.step] + 1) }
  end

  def profile
    @user = current_user
  end

  private

  def step_params
    params.permit :personal_url, :weekday_rate_from, :weekday_rate_to, :weekend_rate_from, :weekend_rate_to,
                  cancelation_ids: [], event_category_ids: [], genre_ids: [], equipment_ids: []
  end
end