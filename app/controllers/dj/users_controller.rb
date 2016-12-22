class Dj::UsersController < Dj::BaseController

  skip_before_filter :not_finished_profile

  def event_types
    allowed_params = params.permit(event_category_ids: []).merge({step: 'genres'})

    @user = current_user
    if @user.update_attributes allowed_params
      render json: {next_step: @user.step}
    else
      render json: {validation_errors: @user.errors}, status: :unprocessable_entity
    end
  end

  def genres
    allowed_params = params.permit(genre_ids: []).merge({step: 'equipments'})

    @user = current_user
    if @user.update_attributes allowed_params
      render json: {next_step: @user.step}
    else
      render json: {validation_errors: @user.errors}, status: :unprocessable_entity
    end
  end

  def step_back
    @user = current_user
    @user.update_attribute :step, User.steps.key(User.steps[@user.step] - 1)
    render json: { step: @user.step }
  end
end