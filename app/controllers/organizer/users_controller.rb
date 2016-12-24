class Organizer::UsersController < Organizer::BaseController

  skip_before_filter :not_finished_profile

  def step
    @user = current_user
    allowed_params = step_params.merge({organizer_step: @user.next_step})

    if @user.update_attributes allowed_params
      render json: {next_step: @user.next_step.try(:gsub, 'organizer_', '')}
    else
      render json: {validation_errors: @user.errors}, status: :unprocessable_entity
    end
  end

  def step_back
    @user = current_user
    @user.update_attribute :organizer_step, @user.previous_step
    render json: { step: @user.next_step.gsub('organizer_', '') }
  end

  def profile
    @user = current_user
  end

  private

  def step_params
    params.permit :personal_url, :company_name, cancelation_ids: [], event_category_ids: [], genre_ids: [], equipment_ids: []
  end
end