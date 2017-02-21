class Organizer::UsersController < Organizer::BaseController

  skip_before_action :not_finished_profile

  def step
    @user = current_user
    allowed_params = step_params.merge({organizer_step: @user.next_step})

    if @user.update_attributes allowed_params
      if @user.next_step == 'organizer_completed'
        @user.update_attribute :organizer_step, 'organizer_completed'
      end
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

  def update_profile
    @user = current_user
    if @user.update_attributes profile_params
      render json: {message: 'Profile updated.'}
    else
      render json: {validation_errors: @user.errors}, status: :unprocessable_entity
    end
  end

  private

  def profile_params
    allowed_params = params.permit(:name, :width, :height, :crop_x, :crop_y, :crop_w, :crop_h, :crop_rotate,
                  :crop_scale_x, :crop_scale_y, :avatar, :company_name, :about,
                  organizer_attributes: [:city, :country_flag_code], event_category_ids: [], genre_ids: [])
    allowed_params[:organizer_attributes][:id] = current_user.organizer.id
    allowed_params
  end

  def step_params
    params.permit :personal_url, :company_name,  event_category_ids: [], genre_ids: [], equipment_ids: []
  end
end